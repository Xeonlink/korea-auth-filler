import { carrier, way } from "@/utils/constants";
import { test } from ".";
import { RawProfile } from "@/utils/type";

test.describe("from goldenbrown", () => {
  test("SMS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.goldenBrownTest.goto();
    const page = await gate.goldenBrownTest.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectSmsAuthPage();
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
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

    await gate.goldenBrownTest.goto();
    const page = await gate.goldenBrownTest.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectPassAuthPage();
    await page.expect이름Filled();
    await page.expect전화번호Filled();
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

    await gate.goldenBrownTest.goto();

    const page = await gate.goldenBrownTest.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});

test.describe("from cafe24", () => {
  test("SMS", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.cafe24SignUp.goto();
    const page = await gate.cafe24SignUp.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectSmsAuthPage();
    await page.expect이름Filled();
    await page.expect주민번호앞자리Filled();
    await page.expect주민번호성별Filled();
    await page.expect전화번호Filled();
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

    await gate.cafe24SignUp.goto();
    const page = await gate.cafe24SignUp.openNHN_KCP();

    await page.prepare(rawProfile);
    await page.expectPassAuthPage();
    await page.expect이름Filled();
    await page.expect전화번호Filled();
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

    await gate.cafe24SignUp.goto();

    const page = await gate.cafe24SignUp.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});
