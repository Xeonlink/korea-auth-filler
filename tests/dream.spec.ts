import { way } from "@/utils/constants";
import { test } from ".";

const callback = (gateKey: "hPointSignUp") => {
  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open드림시큐리티();
    const pom = poms.dream(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView();
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.휴대폰번호filled();
    });
  });

  test("PASS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.PASS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open드림시큐리티();
    const pom = poms.dream(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.휴대폰번호filled();
    });
  });

  test("QR", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.QR });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open드림시큐리티();
    const pom = poms.dream(root, profile);

    await pom.step("QR인증View", async (expect) => {
      await expect.qrAuthView();
    });
  });
};

test.describe("normal", () => callback("hPointSignUp"));
