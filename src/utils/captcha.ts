import ort from "onnxruntime-web";
import { PublicPath, browser } from "wxt/browser";
import { DECODABLE_CHARSETS } from "./constants";

function decodeDigitSequence(seq: number[], charsetChars: string) {
  const blankClass = charsetChars.length;
  let out = "",
    prev = -1;
  for (const p of seq) {
    if (p !== prev && p !== blankClass) {
      out += charsetChars[p];
    }
    prev = p;
  }
  return out;
}

class SessionFactory {
  private static cache = new Map<string, ort.InferenceSession>();

  public static async create(url: string, options?: ort.InferenceSession.SessionOptions) {
    const session = SessionFactory.cache.get(url);
    if (session) {
      return session;
    }
    const newSession = await ort.InferenceSession.create(url, options);
    SessionFactory.cache.set(url, newSession);

    document.addEventListener("close", () => {
      SessionFactory.cache.delete(url);
      newSession.release();
    });

    return newSession;
  }
}

export async function solveCaptcha(
  modelPath: PublicPath,
  image: HTMLImageElement,
  charset: keyof typeof DECODABLE_CHARSETS = "DIGIT",
) {
  ort.env.wasm.wasmPaths = {
    wasm: browser.runtime.getURL("/ort-wasm-simd-threaded.wasm"),
    mjs: browser.runtime.getURL("/ort-wasm-simd-threaded.mjs"),
  };
  const { naturalWidth, naturalHeight } = image,
    canvas = document.createElement("canvas");
  canvas.width = naturalWidth;
  canvas.height = naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, naturalWidth, naturalHeight);
  ctx.drawImage(image, 0, 0);

  const charsetChars = DECODABLE_CHARSETS[charset];
  const numClasses = charsetChars.length + 1;

  const base64 = canvas.toDataURL();
  const tensor = await ort.Tensor.fromImage(base64);
  const url = browser.runtime.getURL(modelPath);
  const session = await SessionFactory.create(url);
  const result = await session.run({ x: tensor });
  const y = Array.from(result.y.data as Float32Array);
  const seq = Array.from({ length: y.length / numClasses })
    .map(() => y.splice(0, numClasses))
    .map((row) => row.indexOf(Math.max(...row)));
  const out = decodeDigitSequence(seq, charsetChars);

  result.y.dispose();
  tensor.dispose();

  return out;
}
