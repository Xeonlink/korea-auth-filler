import packageJson from "../package.json" assert { type: "json" };

export const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "__MSG_extension_name__",
  version: packageJson.version,
  default_locale: "en",
  description: "__MSG_extension_description__",
  author: {
    email: "jimin7020@gmail.com",
  },
  icons: {
    "128": "icon_128.png",
  },
  action: {
    default_title: "__MSG_extension_name__",
    default_popup: "popup/index.html",
    default_icon: "icon_128.png",
  },
  permissions: ["storage"],
  content_scripts: [
    {
      js: ["content_scripts/autofill.js"],
      matches: ["https://*/*"],
      run_at: "document_idle",
      all_frames: true,
    },
  ],
};
