import type { StorageData } from "@/utils/type";
import { carrier, gender, way } from "@/utils/constants";
import { browser, type Runtime, type Tabs } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

export default defineBackground({
  type: "module",
  main: main,
});

const defaultStorageData: StorageData = {
  profiles: import.meta.env.DEV
    ? [
        {
          id: "a-a-a-a-b",
          name: "오지민",
          carrier: carrier.KT,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.SMS,
        },
        {
          id: "a-a-a-a-c",
          name: "오지민",
          carrier: carrier.KT_MVNO,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.PASS,
        },
        {
          id: "a-a-a-a-d",
          name: "오지민",
          carrier: carrier.SKT,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.QR,
        },
        {
          id: "a-a-a-a-e",
          name: "오지민",
          carrier: carrier.SKT_MVNO,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.SMS,
        },
        {
          id: "a-a-a-a-f",
          name: "오지민",
          carrier: carrier.LGU,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.SMS,
        },
        {
          id: "a-a-a-a-g",
          name: "오지민",
          carrier: carrier.LGU_MVNO,
          phone_number: "01012345678",
          birth: "19900101",
          gender: gender.FEMALE,
          foreigner: "0",
          way: way.PASS,
        },
      ]
    : [],
  selectedProfile: 0,
  on: true,
  isSideMenuOpen: false,
  delay: 1000,
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
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      initStorage();
    }
    createContextMenu();
  });

  browser.contextMenus.onClicked.addListener((_, tab) => {
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

  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    const messageData = message as Action;
    if (messageData.type === "get-storage-data") {
      browser.runtime.openOptionsPage();
      sendResponse(defaultStorageData);
    }

    if (messageData.type === "open-options-page") {
      browser.runtime.openOptionsPage();
    }

    if (messageData.type === "open-link") {
      browser.tabs.create({ url: messageData.data });
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

type OptionsOpenAction = {
  type: "open-options-page";
};

type LinkOpenAction = {
  type: "open-link";
  data: string;
};

type OpenAction = OptionsOpenAction | LinkOpenAction;

type Action = StorageAction | OpenAction;
