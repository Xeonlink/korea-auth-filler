import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: async (_) => {
    return {
      default_locale: "ko",
      permissions: ["storage", "contextMenus", "scripting", "activeTab"],
    };
  },
  imports: false,
});
