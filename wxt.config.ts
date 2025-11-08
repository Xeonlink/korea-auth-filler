import tailwindcss from "@tailwindcss/vite";
import type { WxtViteConfig } from "wxt";
import { defineConfig } from "wxt";
import { readdirSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/auto-icons"],
  vite: async (_) => {
    return {
      plugins: [tailwindcss()],
    } as WxtViteConfig;
  },
  manifest: async (_) => {
    const captchaDir = resolve(import.meta.dirname, "src", "public", "captcha");
    const onnxPaths = readdirSync(captchaDir)
      .filter((file) => statSync(resolve(captchaDir, file)).isFile())
      .filter((file) => extname(file) === ".onnx")
      .map((file) => `captcha${sep}${file}`);

    return {
      name: "__MSG_extension_name__",
      description: "__MSG_extension_description__",
      default_locale: "ko",
      permissions: ["storage", "contextMenus", "scripting", "activeTab", "tabs"],
      web_accessible_resources: [
        {
          resources: [...onnxPaths, "ort-wasm-simd-threaded.wasm", "ort-wasm-simd-threaded.mjs"],
          matches: ["<all_urls>"],
        },
      ],
    };
  },
  imports: false,
  zip: {
    excludeSources: ["tests/**", "docs/**"],
  },

  // Auto-icons
  autoIcons: {
    sizes: [128, 48, 32, 16],
  },
});
