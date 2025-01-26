import type { StorageData } from "@/utils/type";
import { browser, type Runtime, type Tabs } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

export default defineBackground({
  type: "module",
  main: main,
});

const defaultStorageData: StorageData = {
  profiles: [],
  selectedProfile: 0,
  on: false,
};

async function initStorage() {
  const storageData = await browser.storage.sync.get(null);
  if (Object.keys(storageData).length !== 0) {
    return;
  }

  await browser.storage.sync.set(defaultStorageData);
}

function createContextMenu() {
  browser.contextMenus.create({
    id: "autofill",
    title: "Autofill",
    contexts: ["all"],
  });
}

async function injectAutofillScript(tab?: Tabs.Tab | undefined) {
  const tabId = tab?.id;
  if (!tabId) {
    return;
  }

  await browser.scripting.executeScript({
    target: {
      tabId,
      allFrames: true,
    },
    files: ["content-scripts/autofill.js"],
  });
}

const cache = new Map<string, (data: StorageData) => void>();

function main() {
  browser.runtime.onInstalled.addListener((_) => {
    createContextMenu();
    initStorage();
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    injectAutofillScript(tab);
  });

  browser.runtime.onConnect.addListener((port) => {
    if (!port.sender?.id) {
      return;
    }

    cache.set(port.sender.id, (storageData) => {
      port.postMessage(storageData);
    });

    port.onMessage.addListener((message) => {
      const action = message as StorageAction;
      if (action.type === "update-storage") {
        updateStorage(action.data);
      }
      if (action.type === "get-storage-data") {
        sendStorageData(port);
      }
    });

    port.onDisconnect.addListener((_port) => {
      if (!_port.sender?.id) {
        return;
      }

      cache.delete(_port.sender.id);
    });
  });

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const messageData = message as { type: string };
    if (messageData.type === "get-storage-data") {
      browser.runtime.openOptionsPage();
      sendResponse(defaultStorageData);
    }

    return true;
  });
}

async function sendStorageData(port: Runtime.Port) {
  const storageData = (await browser.storage.sync.get(null)) as StorageData;
  port.postMessage(storageData);
}

async function updateStorage(data: Partial<StorageData>) {
  await browser.storage.sync.set(data);
  const storageData = (await browser.storage.sync.get(null)) as StorageData;
  cache.forEach((callback) => callback(storageData));
}

type GetStorageAction = {
  type: "get-storage-data";
};

type UpdateStorageAction = {
  type: "update-storage";
  data: Partial<StorageData>;
};

type StorageAction = UpdateStorageAction | GetStorageAction;

// type Action = StorageAction;
