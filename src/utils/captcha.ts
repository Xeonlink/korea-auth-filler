import ort from "onnxruntime-web";
import { PublicPath, browser } from "wxt/browser";

const BLANK_CLASS = 10,
 NUM_CLASSES = 11;

function decodeDigitSequence(seq: number[]) {
  let out = "",
   prev = -1;
  for (const p of seq) {
    if (p !== prev && p !== BLANK_CLASS) {
      out += p.toString();
    }
    prev = p;
  }
  return out;
}

class SessionFactory {
  private static cache = new Map<string, ort.InferenceSession>();

  public static async create(url: string, options?: ort.InferenceSession.SessionOptions) {
    const session = SessionFactory.cache.get(url);
    if (session) {return session;}
    const newSession = await ort.InferenceSession.create(url, options);
    SessionFactory.cache.set(url, newSession);

    document.addEventListener("close", () => {
      SessionFactory.cache.delete(url);
      newSession.release();
    });

    return newSession;
  }
}

export async function solveCaptcha(modelPath: PublicPath, image: HTMLImageElement) {
  ort.env.wasm.wasmPaths = {
    wasm: browser.runtime.getURL("/ort-wasm-simd-threaded.wasm"),
    mjs: browser.runtime.getURL("/ort-wasm-simd-threaded.mjs"),
  };
  const { naturalWidth, naturalHeight } = image,

   canvas = document.createElement("canvas");
  canvas.width = naturalWidth;
  canvas.height = naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {throw new Error("Failed to get canvas context");}
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, naturalWidth, naturalHeight);
  ctx.drawImage(image, 0, 0);

  const base64 = canvas.toDataURL(),
   tensor = await ort.Tensor.fromImage(base64),
   url = browser.runtime.getURL(modelPath),
   session = await SessionFactory.create(url),
   result = await session.run({ x: tensor }),

   y = Array.from(result.y.data as Float32Array),
   seq = Array.from({ length: y.length / NUM_CLASSES })
    .map(() => y.splice(0, NUM_CLASSES))
    .map((row) => row.indexOf(Math.max(...row))),
   out = decodeDigitSequence(seq);

  result.y.dispose();
  tensor.dispose();

  return out;
}
