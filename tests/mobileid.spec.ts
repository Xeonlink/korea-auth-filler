import { way } from "@/utils/constants";
import { test } from "./index";

test("새 창에 열기", async ({ popupPage, gate, profile, poms }) => {
  profile.mod({ way: way.SMS });
  await popupPage.prepare(profile);

  await gate.강원도Login.goto();

  const root = await gate.강원도Login.open모바일신분증();
  const pom = poms.mobileid(root, profile);

  await pom.step("인증View", async (expect) => {
    await expect.이름filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });
});

test("iframe", async ({ popupPage, gate, profile, poms }) => {
  profile.mod({ way: way.SMS });
  await popupPage.prepare(profile);

  await gate.홈택스Login.goto();

  const root = await gate.홈택스Login.open모바일신분증();
  const pom = poms.mobileid(root, profile);

  await pom.step("인증View", async (expect) => {
    await expect.이름filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });
});

test("embedded", async ({ popupPage, gate, profile, poms }) => {
  profile.mod({ way: way.SMS });
  await popupPage.prepare(profile);

  await gate.고용24Login.goto();

  const root = await gate.고용24Login.open모바일신분증();
  const pom = poms.mobileid(root, profile);

  await pom.step("인증View", async (expect) => {
    await expect.이름filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });
});
