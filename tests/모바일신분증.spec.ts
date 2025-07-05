import { carrier, way } from "@/utils/constants";
import { test } from "./index";
import { RawProfile } from "@/utils/type";

test("새 창에 열기", async ({ popupPage, _강원도LoginPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await _강원도LoginPage.goto();

  const page = await _강원도LoginPage.open모바일신분증();
  page.prepare(rawProfile);
  await page.expect이름Filled();
  await page.expect전화번호Filled();
  await page.expect모든동의Checked();
});

test("iframe", async ({ popupPage, _홈택스LoginPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await _홈택스LoginPage.goto();
  const page = await _홈택스LoginPage.open모바일신분증();
  page.prepare(rawProfile);
  await page.expect이름Filled();
  await page.expect전화번호Filled();
  await page.expect모든동의Checked();
});

test("embedded", async ({ popupPage, _고용24LoginPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await _고용24LoginPage.goto();
  const page = await _고용24LoginPage.open모바일신분증();
  page.prepare(rawProfile);
  await page.expect이름Filled();
  await page.expect전화번호앞자리Filled();
  await page.expect전화번호뒷자리Filled();
  await page.expect모든동의Checked();
});
