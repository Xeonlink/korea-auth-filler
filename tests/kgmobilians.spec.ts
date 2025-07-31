import { carrier, way } from "@/utils/constants";
import { test } from ".";

test.describe("from 야놀자 회원가입", () => {
  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.야놀자SignUp.goto();
    const root = await gate.야놀자SignUp.openKG모빌리언스();
    const pom = poms.kgmobilians(root, profile);

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

    await gate.야놀자SignUp.goto();
    const root = await gate.야놀자SignUp.openKG모빌리언스();
    const pom = poms.kgmobilians(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });
});
