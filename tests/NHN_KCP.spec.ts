import { carrier, way } from "@/utils/constants";
import { test } from ".";

test.describe("from goldenbrown", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.goldenBrownTest.goto();
    const page = await gate.goldenBrownTest.openNHN_KCP();

    await page.prepare(profile);
    await page.expectSmsAuthPage();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.goldenBrownTest.goto();
    const page = await gate.goldenBrownTest.openNHN_KCP();

    await page.prepare(profile);
    await page.expectPassAuthPage();
    await page.expect이름filled();
    await page.expect전화번호filled();
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.goldenBrownTest.goto();

    const page = await gate.goldenBrownTest.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});

test.describe("from cafe24", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.cafe24SignUp.goto();
    const page = await gate.cafe24SignUp.openNHN_KCP();

    await page.prepare(profile);
    await page.expectSmsAuthPage();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.cafe24SignUp.goto();
    const page = await gate.cafe24SignUp.openNHN_KCP();

    await page.prepare(profile);
    await page.expectPassAuthPage();
    await page.expect이름filled();
    await page.expect전화번호filled();
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.cafe24SignUp.goto();

    const page = await gate.cafe24SignUp.openNHN_KCP();
    await page.expectQrAuthPage();
  });
});
