import { carrier, way } from "@/utils/constants";
import { test } from ".";

test.describe("from h.point signup", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.hPointSignUp.goto();
    const page = await gate.hPointSignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectSMS인증View();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect휴대폰번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.hPointSignUp.goto();
    const page = await gate.hPointSignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectPASS인증View();
    await page.expect이름filled();
    await page.expect휴대폰번호filled();
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.hPointSignUp.goto();
    const page = await gate.hPointSignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectQR인증View();
  });
});

test.describe("from make# signup", () => {
  test("SMS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.make샵SignUp.goto({ waitUntil: "load" });
    const page = await gate.make샵SignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectSMS인증View();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect휴대폰번호filled();
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.make샵SignUp.goto({ waitUntil: "load" });
    const page = await gate.make샵SignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectPASS인증View();
    await page.expect이름filled();
    await page.expect휴대폰번호filled();
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.make샵SignUp.goto({ waitUntil: "load" });
    const page = await gate.make샵SignUp.open드림시큐리티();

    await page.prepare(profile);
    await page.expectQR인증View();
  });
});
