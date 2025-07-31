import { carrier, way } from "@/utils/constants";
import { test } from ".";

test("normal", async ({ popupPage, gate, profile }) => {
  profile.mod({ carrier: carrier.KT, way: way.SMS });
  await popupPage.prepare(profile);

  await gate.국회SignUp.goto();
  const page = await gate.국회SignUp.open넥스원소프트();
  await page.expectProviderView();
  await page.selectProvider("신한인증서");
  await page.expect채우기View();

  await page.prepare(profile);
  await page.expect이름filled();
  await page.expect생년월일filled();
  await page.expect전화번호filled();
});
