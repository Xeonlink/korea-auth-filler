import { carrier, way } from "@/utils/constants";
import { test } from ".";
import { RawProfile } from "@/utils/type";

test.describe("from 디지털원패스", () => {
  test("SMS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
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

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect전화번호filled();
  });

  test("QR", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.QR,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.openOKname();
    await page.expectQrAuthPage();
  });
});
