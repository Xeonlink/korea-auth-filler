import { carrier, way } from "@/utils/constants";
import { test } from ".";

test.describe("from 야놀자 회원가입", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.야놀자SignUp.goto();
    const page = await gate.야놀자SignUp.openKG모빌리언스();

    await page.prepare(profile);
    await page.expectSMS인증View();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect전화번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.야놀자SignUp.goto();
    const page = await gate.야놀자SignUp.openKG모빌리언스();

    await page.prepare(profile);
    await page.expectPASS인증View();
    await page.expect이름filled();
    await page.expect전화번호filled();
  });
});
