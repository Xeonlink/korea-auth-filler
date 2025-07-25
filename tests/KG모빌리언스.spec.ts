import { carrier, way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";
import { test } from ".";

test.describe("from 야놀자 회원가입", () => {
  test("SMS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.야놀자SignUp.goto();
    const page = await gate.야놀자SignUp.openKG모빌리언스();

    await page.prepare(rawProfile);
    await page.expectSMS인증View();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect전화번호filled();
  });

  test("PASS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.PASS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.야놀자SignUp.goto();
    const page = await gate.야놀자SignUp.openKG모빌리언스();

    await page.prepare(rawProfile);
    await page.expectPASS인증View();
    await page.expect이름filled();
    await page.expect전화번호filled();
  });
});
