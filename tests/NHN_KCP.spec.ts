import { carrier, way } from "@/utils/constants";
import { test } from ".";
import { RawProfile } from "@/utils/type";

test.describe("from goldenbrown", () => {
  test("SMS", async ({ popupPage, _GoldenBrownTestPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _GoldenBrownTestPage.goto();
    const page = await _GoldenBrownTestPage.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectSmsAuthPage();
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
  });

  test("PASS", async ({ popupPage, _GoldenBrownTestPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.PASS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _GoldenBrownTestPage.goto();
    const page = await _GoldenBrownTestPage.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectPassAuthPage();
    await page.expect이름Filled();
    await page.expect전화번호Filled();
  });

  test("QR", async ({ popupPage, _GoldenBrownTestPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.QR,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _GoldenBrownTestPage.goto();

    const page = await _GoldenBrownTestPage.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});

test.describe("from cafe24", () => {
  test("SMS", async ({ popupPage, _Cafe24SignUpPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _Cafe24SignUpPage.goto();
    const page = await _Cafe24SignUpPage.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectSmsAuthPage();
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
  });

  test("PASS", async ({ popupPage, _Cafe24SignUpPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.PASS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _Cafe24SignUpPage.goto();
    const page = await _Cafe24SignUpPage.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectPassAuthPage();
    await page.expect이름Filled();
    await page.expect전화번호Filled();
  });

  test("QR", async ({ popupPage, _Cafe24SignUpPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.QR,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _Cafe24SignUpPage.goto();

    const page = await _Cafe24SignUpPage.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});
