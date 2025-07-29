import ort from "onnxruntime-web";
import { browser, PublicPath } from "wxt/browser";

const NUM_CLASSES = 11;
const BLANK_CLASS = 10;

function decodeDigitSequence(seq: number[]) {
  let out = "";
  let prev = -1;
  for (const p of seq) {
    if (p !== prev && p !== BLANK_CLASS) {
      out += p.toString();
    }
    prev = p;
  }
  return out;
}

export async function solveCaptcha(modelPath: PublicPath, image: HTMLImageElement) {
  ort.env.wasm.wasmPaths = {
    wasm: browser.runtime.getURL("/ort-wasm-simd-threaded.wasm"),
    mjs: browser.runtime.getURL("/ort-wasm-simd-threaded.mjs"),
  };
  const { naturalWidth: width, naturalHeight: height } = image;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0);

  const base64 = canvas.toDataURL();
  const tensor = await ort.Tensor.fromImage(base64);
  const url = browser.runtime.getURL(modelPath);
  const session = await ort.InferenceSession.create(url);
  const result = await session.run({ x: tensor });

  const y = Array.from(result.y.data as Float32Array);
  const seq = Array.from({ length: y.length / NUM_CLASSES })
    .map(() => y.splice(0, NUM_CLASSES))
    .map((row) => row.indexOf(Math.max(...row)));
  const out = decodeDigitSequence(seq);

  result.y.dispose();
  session.release();
  tensor.dispose();

  return out;
}
