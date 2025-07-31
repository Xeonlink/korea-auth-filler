import { way } from "@/utils/constants";
import { test } from ".";

test.describe("from 강원도Login", () => {
  test("-", async ({ popupPage, profile, gate, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate.강원도Login.goto();
    const root = await gate.강원도Login.openYESKEY();
    const pom = poms.yeskey(root, profile);

    await pom.step("채우기", async (expect) => {
      await expect.certViewByUrl();
      await expect.이름filled();
      await expect.전화번호filled();
      await expect.생년월일filled();
    });
  });
});
