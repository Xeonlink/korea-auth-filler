import { StorageData } from "@/utils/type";
import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

export default defineBackground({
  type: "module",
  main: main,
});

function main() {
  browser.runtime.onInstalled.addListener((_) => {
    browser.contextMenus.create({
      id: "autofill",
      title: "Autofill",
      contexts: ["all"],
    });

    browser.storage.sync.get(null).then((data) => {
      if (Object.keys(data).length !== 0) {
        return;
      }

      browser.storage.sync.set({
        profiles: [],
        selectedProfile: 0,
        on: false,
      } satisfies StorageData);
    });
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    const tabId = tab?.id;
    if (!tabId) {
      return;
    }

    browser.scripting.executeScript({
      target: { tabId },
      files: ["content-scripts/autofill.js"],
    });
  });
}
