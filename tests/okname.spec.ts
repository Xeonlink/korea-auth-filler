import { carrier, way } from "@/utils/constants";
import { test } from ".";

test.describe("from 디지털원패스", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectSmsAuthPage();

    await page.prepare(profile);
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectPassAuthPage();

    await page.prepare(profile);
    await page.expect이름filled();
    await page.expect전화번호filled();
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectQrAuthPage();
  });
});
