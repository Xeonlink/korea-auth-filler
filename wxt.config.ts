import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/auto-icons"],
  manifest: async (_) => {
    return {
      name: "__MSG_extension_name__",
      description: "__MSG_extension_description__",
      default_locale: "ko",
      permissions: ["storage", "contextMenus", "scripting", "activeTab", "tabs"],
    };
  },
  imports: false,
  zip: {
    excludeSources: ["tests/**", "test-results/**", "playwright-report/**", "publish/**"],
  },

  // auto-icons
  autoIcons: {
    sizes: [128, 48, 32, 16],
  },
});
