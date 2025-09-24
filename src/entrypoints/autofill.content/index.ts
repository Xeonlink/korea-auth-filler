import type { StorageData } from "@/utils/type";
import { log, wait } from "@/utils/utils";
import { browser } from "wxt/browser";
import type { ContentScriptContext } from "wxt/client";
import { defineContentScript } from "wxt/sandbox";
import { handlers } from "./handlers";
import { Profile } from "@/utils/Profile";
import { Page } from "@/utils/Page";

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

  const url = new URL(window.location.href);
  const page = new Page(ctx, url);

  while (true) {
    for (const handler of handlers) {
      try {
        if (handler.isMatch(page)) {
          await handler.fill(page, new Profile(rawProfile));
          return;
        }
      } catch (error) {
        log(error as string);
      }
    }
    await wait(data.delay ?? 1000);
  }
}
