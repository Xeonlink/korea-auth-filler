import { carrier, way } from "@/utils/constants";
import { test } from "./index";

test("새 창에 열기", async ({ popupPage, gate, profile }) => {
  profile.mod({ carrier: carrier.KT, way: way.SMS });
  await popupPage.prepare(profile);

  await gate.강원도Login.goto();

  const page = await gate.강원도Login.open모바일신분증();
  await page.prepare(profile);
  await page.expect이름filled();
  await page.expect전화번호filled();
  await page.expect모든동의Checked();
});

test("iframe", async ({ popupPage, gate, profile }) => {
  profile.mod({ carrier: carrier.KT, way: way.SMS });
  await popupPage.prepare(profile);

  await gate.홈택스Login.goto();

  const page = await gate.홈택스Login.open모바일신분증();
  await page.prepare(profile);
  await page.expect이름filled();
  await page.expect전화번호filled();
  await page.expect모든동의Checked();
});

test("embedded", async ({ popupPage, gate, profile }) => {
  profile.mod({ carrier: carrier.KT, way: way.SMS });
  await popupPage.prepare(profile);

  await gate.고용24Login.goto();

  const page = await gate.고용24Login.open모바일신분증();
  await page.prepare(profile);
  await page.expect이름filled();
  await page.expect전화번호앞자리filled();
  await page.expect전화번호뒷자리filled();
  await page.expect모든동의Checked();
});
