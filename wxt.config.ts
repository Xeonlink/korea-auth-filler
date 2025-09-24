import tailwindcss from "@tailwindcss/vite";
import type { WxtViteConfig } from "wxt";
import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/auto-icons"],
  vite: async (_) => ({
      plugins: [tailwindcss()],
    } as WxtViteConfig),
  manifest: async (_) => ({
      name: "__MSG_extension_name__",
      description: "__MSG_extension_description__",
      default_locale: "ko",
      permissions: ["storage", "contextMenus", "scripting", "activeTab", "tabs"],
      web_accessible_resources: [
        {
          resources: [
            "captcha/kmcert.onnx",
            "captcha/nhnkcp.onnx",
            "captcha/sci.onnx",
            "captcha/nice.onnx",
            "captcha/dream.onnx",
            "captcha/kcb.onnx",
            "captcha/kgmobilians.onnx",
            "ort-wasm-simd-threaded.wasm",
            "ort-wasm-simd-threaded.mjs",
          ],
          matches: ["<all_urls>"],
        },
      ],
    }),
  imports: false,
  zip: {
    excludeSources: ["tests/**", "docs/**"],
  },

  // Auto-icons
  autoIcons: {
    sizes: [128, 48, 32, 16],
  },
});
