import { test } from ".";
import { carrier, way } from "@/utils/constants";

test.describe("from 서울시", () => {
  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.서울시Login.goto();
    const root = await gate.서울시Login.openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView();
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.전화번호filled();
    });
  });

  test("PASS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier: carrier.KT, way: way.PASS });
    await popupPage.prepare(profile);

    await gate.서울시Login.goto();
    const root = await gate.서울시Login.openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });

  test("QR", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier: carrier.KT, way: way.QR });
    await popupPage.prepare(profile);

    await gate.서울시Login.goto();
    const root = await gate.서울시Login.openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("QR인증View", async (expect) => {
      await expect.qrAuthView();
    });
  });
});
