import { resolve } from "node:path";
import { defineWxtModule } from "wxt/modules";

declare module "wxt/browser" {
  export type ExtraPublicPath = "/ort-wasm-simd-threaded.wasm" | "/ort-wasm-simd-threaded.mjs";
  export interface WxtRuntime {
    getURL(path: ExtraPublicPath): string;
  }
}

export default defineWxtModule((wxt) => {
  wxt.hook("build:publicAssets", (_, assets) => {
    const wasmDistPath = ["node_modules", "onnxruntime-web", "dist"];
    assets.push({
      absoluteSrc: resolve(...wasmDistPath, "ort-wasm-simd-threaded.wasm"),
      relativeDest: "ort-wasm-simd-threaded.wasm",
    });
    assets.push({
      absoluteSrc: resolve(...wasmDistPath, "ort-wasm-simd-threaded.mjs"),
      relativeDest: "ort-wasm-simd-threaded.mjs",
    });
  });
});
