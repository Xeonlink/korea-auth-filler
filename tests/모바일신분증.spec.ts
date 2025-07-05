import { carrier, way } from "@/utils/constants";
import { test } from "./index";
import { RawProfile } from "@/utils/type";

test("새 창에 열기", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.강원도Login.goto();

  const page = await gate.강원도Login.open모바일신분증();
  await page.prepare(rawProfile);
  await page.expect이름filled();
  await page.expect전화번호filled();
  await page.expect모든동의Checked();
});

test("iframe", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.홈택스Login.goto();

  const page = await gate.홈택스Login.open모바일신분증();
  await page.prepare(rawProfile);
  await page.expect이름filled();
  await page.expect전화번호filled();
  await page.expect모든동의Checked();
});

test("embedded", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.고용24Login.goto();

  const page = await gate.고용24Login.open모바일신분증();
  await page.prepare(rawProfile);
  await page.expect이름filled();
  await page.expect전화번호앞자리filled();
  await page.expect전화번호뒷자리filled();
  await page.expect모든동의Checked();
});
