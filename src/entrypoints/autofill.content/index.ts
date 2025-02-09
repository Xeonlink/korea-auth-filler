import type { StorageData } from "@/utils/type";
import { log, wait } from "@/utils/utils";
import { browser } from "wxt/browser";
import type { ContentScriptContext } from "wxt/client";
import { defineContentScript } from "wxt/sandbox";
import { handlers } from "./handlers";
import { Profile } from "@/utils/Profile";

export default defineContentScript({
  matches: ["https://*/*"],
  runAt: "document_idle",
  allFrames: true,
  main: main,
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

  const profiles = data.profiles;
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

  while (true) {
    for (const handler of handlers) {
      if (handler.isMatch(window.location.href)) {
        handler.fill(ctx, new Profile(rawProfile));
        return;
      }
    }
    await wait(data.delay ?? 1000);
  }
}
