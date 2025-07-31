import { test } from ".";
import { carrier } from "@/utils/constants";
import { way } from "@/utils/constants";

test.describe("from 디지털원패스", () => {
  test("-", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.디지털원패스FindId.goto();
    const root = await gate.디지털원패스FindId.open토스인증();
    const pom = poms.toss(root, profile);

    await pom.step("인증View", async (expect) => {
      await expect.authView();
      await expect.이름filled();
      await expect.전화번호filled();
      await expect.생년월일filled();
      await expect.개인정보동의checked();
      await expect.인증하기active();
    });
  });
});
