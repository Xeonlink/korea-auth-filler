import { carrier, way } from "@/utils/constants";
import { test } from "./index";
import { RawProfile } from "@/utils/type";

test("SMS", async ({ gate, popupPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.강원도Login.goto();

  const page = await gate.강원도Login.open한국모바일인증();
  await page.expectSmsAuthPage();

  await page.prepare(rawProfile);
  await page.expect이름Filled();
  await page.expect주민번호앞자리Filled();
  await page.expect주민번호성별Filled();
  await page.expect전화번호Filled();
});

test("PASS", async ({ gate, popupPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.PASS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.강원도Login.goto();

  const page = await gate.강원도Login.open한국모바일인증();
  await page.expectPassAuthPage();

  await page.prepare(rawProfile);
  await page.expect이름Filled();
  await page.expect전화번호Filled();
});

test("QR", async ({ gate, popupPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.QR,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.강원도Login.goto();

  const page = await gate.강원도Login.open한국모바일인증();
  await page.expectQrAuthPage();
});
