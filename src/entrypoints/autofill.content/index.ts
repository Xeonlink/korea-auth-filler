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
  if (!data.on) return log("OFF");
  if (!data.profiles) return log("No profiles");

  const profiles = data.profiles;
  const rawProfile = profiles[data.selectedProfile];
  if (!rawProfile) return log("No selected profile");

  log("Korea Auth Filler");

  while (true) {
    for (const handler of handlers) {
      if (handler.isMatch(window.location.href)) {
        handler.fill(ctx, new Profile(rawProfile));
        return;
      }
    }
    await wait(1000);
  }
}
