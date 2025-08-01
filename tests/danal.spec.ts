import { way } from "@/utils/constants";
import { test } from "./index";

test.describe("from about:blank", () => {
  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate.blank.goto();
    const root = await gate.blank.open다날();
    const pom = poms.danal(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView();
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.전화번호filled();
    });
  });

  test("PASS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.PASS });
    await popupPage.prepare(profile);

    await gate.blank.goto();
    const root = await gate.blank.open다날();
    const pom = poms.danal(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });
});
