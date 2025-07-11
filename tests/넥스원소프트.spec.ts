import type { RawProfile } from "@/utils/type";
import { test } from ".";

test("normal", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.국회Signup.goto();
  const page = await gate.국회Signup.open넥스원소프트();
  await page.expectProviderView();
  await page.selectProvider("신한인증서");
  await page.expect채우기View();

  await page.prepare(rawProfile);
  await page.expect이름filled();
  await page.expect생년월일filled();
  await page.expect전화번호filled();
});
