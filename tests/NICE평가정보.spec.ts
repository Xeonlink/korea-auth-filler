import { test } from ".";
import { carrier, way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";

test.describe("from 서울시", () => {
  test("SMS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.서울시Login.goto();
    const page = await gate.서울시Login.openNICE평가정보();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
    await page.expect보안문자Focuced();
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

    await gate.서울시Login.goto();
    const page = await gate.서울시Login.openNICE평가정보();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect전화번호filled();
    await page.expect보안문자Focuced();
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

    await gate.서울시Login.goto();
    const page = await gate.서울시Login.openNICE평가정보();
    await page.expectQrAuthPage();
  });
});
