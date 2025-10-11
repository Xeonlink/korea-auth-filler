import { Page } from "@/utils/Page";
import { Profile } from "@/utils/Profile";
import type { StorageData } from "@/utils/type";
import { log, wait } from "@/utils/utils";
import { browser } from "wxt/browser";
import type { ContentScriptContext } from "wxt/client";
import { defineContentScript } from "wxt/sandbox";
import { importHandlers } from "./handlers";

export default defineContentScript({
  matches: ["https://*/*"],
  runAt: "document_idle",
  allFrames: true,
  main,
});

async function main(ctx: ContentScriptContext) {
  const data = (await browser.storage.sync.get(null)) as StorageData;
  if (!data.on) {
    log("OFF");
    return;
  }
  if (!data.profiles) {
    log("No profiles array");
    return;
  }

  const { profiles } = data;
  if (profiles.length === 0) {
    log("No profiles");
    return;
  }
  if (profiles.length <= data.selectedProfile) {
    log("Selected profile is out of range");
    return;
  }

  const rawProfile = profiles[data.selectedProfile];
  if (!rawProfile) {
    log("No selected profile");
    return;
  }

  log("Korea Auth Filler");

  const handlers = await importHandlers();
  const url = new URL(window.location.href);
  const page = new Page(ctx, url);

  while (true) {
    for (const handler of handlers) {
      try {
        if (handler.isMatch(page)) {
          const vendorOptions = data.vendorOptions[handler.name as keyof typeof data.vendorOptions];
          const globalOptions = data.globalOptoins;
          const options = {
            ...globalOptions,
            ...vendorOptions,
          };

          await handler.fill(page, new Profile(rawProfile), options);
          return;
        }
      } catch (error) {
        log(error as string);
      }
    }
    await wait(data.delay ?? 1000);
  }
}
