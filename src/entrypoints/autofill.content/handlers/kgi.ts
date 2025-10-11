import { defineHandler } from ".";

defineHandler("kgi", {
  isMatch: (page) =>
    ["https://kssa.inicis.com/request", "https://fcsa.inicis.com/request"].some((v) =>
      page.url.href.startsWith(v),
    ),
  fill: async (page, profile, _options) => {
    await page.input("#name").visible().fill(profile.이름);
    await page.input("#birth").visible().fill(profile.생년월일);
    await page.input("#phone").visible().fill(profile.전화번호.전체);
    await page.input("#all_check").visible().check();
    await page.button("#JAuthBtn").visible().focus();
  },
});
