import { poms } from "./pom/PomPage";
import { test } from "./index";

test("from kfc", async ({ popupPage, gate, profile }) => {
  await popupPage.prepare(profile);

  await gate.kfcSignUp.goto();
  const root = await gate.kfcSignUp.openKG이니시스();
  const pom = poms.kgi(root, profile);

  await pom.step("인증View", async (expect) => {
    await expect.gotoAuthView("네이버 인증");
    await expect.이름filled();
    await expect.생년월일filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });
});
