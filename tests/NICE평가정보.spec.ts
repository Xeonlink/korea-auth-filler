import { test } from ".";
import { carrier, way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";

test.describe("from 서울시", () => {
  test("SMS", async ({ popupPage, _서울시LoginPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _서울시LoginPage.goto();
    const page = await _서울시LoginPage.openNICE평가정보();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
  });

  test("PASS", async ({ popupPage, _서울시LoginPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.PASS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _서울시LoginPage.goto();
    const page = await _서울시LoginPage.openNICE평가정보();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름Filled();
    await page.expect전화번호Filled();
  });

  test("QR", async ({ popupPage, _서울시LoginPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.QR,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _서울시LoginPage.goto();
    const page = await _서울시LoginPage.openNICE평가정보();
    await page.expectQrAuthPage();
  });
});
