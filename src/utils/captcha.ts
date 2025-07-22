import ort from "onnxruntime-web";
import { browser, PublicPath } from "wxt/browser";

const NUM_CLASSES = 11;
const BLANK_CLASS = 10;

export async function solveCaptch(modelPath: PublicPath, image: HTMLImageElement) {
  ort.env.wasm.wasmPaths = {
    wasm: browser.runtime.getURL("/ort-wasm-simd-threaded.wasm"),
    mjs: browser.runtime.getURL("/ort-wasm-simd-threaded.mjs"),
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, image.width, image.height);
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const tensor = await ort.Tensor.fromImage(imageData);
  const session = await ort.InferenceSession.create(modelPath);
  const result = await session.run({ x: tensor });

  const y = Array.from(result.y.data as Float32Array);
  const seq = Array.from({ length: y.length / NUM_CLASSES })
    .map(() => y.splice(0, NUM_CLASSES))
    .map((row) => row.indexOf(Math.max(...row)));

  let out = "";
  let prev = -1;
  for (const p of seq) {
    if (p !== prev && p !== BLANK_CLASS) {
      out += p.toString();
    }
    prev = p;
  }

  result.y.dispose();
  session.release();
  tensor.dispose();

  return out;
}
