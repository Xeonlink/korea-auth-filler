import type { StorageData } from "../type";
import { browser, log, Profile } from "../utils";
import { handlers } from "./handlers";

browser.storage.sync.get((data: StorageData) => {
  if (!data.on) return log("OFF");
  if (!data.profiles) return log("No profiles");

  const profiles = data.profiles;
  const rawProfile = profiles[data.selectedProfile];
  if (!rawProfile) return log("No selected profile");

  log("Auth Autofill (본인인증 자동완성)");
  log("한국 휴대전화 본인인증 서비스 자동완성 브라우저 확장 프로그램");

  for (const handler of handlers) {
    if (handler.isMatch(window.location.href)) {
      handler.fill(new Profile(rawProfile));
    }
  }
});
