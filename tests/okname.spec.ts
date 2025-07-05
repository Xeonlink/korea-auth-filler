import { carrier, way } from "@/utils/constants";
import { test } from ".";
import { RawProfile } from "@/utils/type";

test.describe("from 디지털원패스", () => {
  test("SMS", async ({ popupPage, _디지털원패스FindIdPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _디지털원패스FindIdPage.goto();
    const page = await _디지털원패스FindIdPage.open_okname();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
  });

  test("PASS", async ({ popupPage, _디지털원패스FindIdPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.PASS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _디지털원패스FindIdPage.goto();
    const page = await _디지털원패스FindIdPage.open_okname();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름Filled();
    await page.expect전화번호Filled();
  });

  test("QR", async ({ popupPage, _디지털원패스FindIdPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.QR,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _디지털원패스FindIdPage.goto();
    const page = await _디지털원패스FindIdPage.open_okname();
    await page.expectQrAuthPage();
  });
});
