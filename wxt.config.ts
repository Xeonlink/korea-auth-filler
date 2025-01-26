import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: async (_) => {
    return {
      name: "__MSG_extension_name__",
      description: "__MSG_extension_description__",
      default_locale: "ko",
      permissions: ["storage", "contextMenus", "scripting", "activeTab", "tabs"],
    };
  },
  imports: false,
});
