import { carrier, way } from "@/utils/constants";
import { test } from "./index";
import { RawProfile } from "@/utils/type";

test.describe("from ktSignUp", () => {
  test("SMS", async ({ gate, popupPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.ktSignUp.goto();

    const page = await gate.ktSignUp.open한국모바일인증();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
    // await page.expect보안문자Focuced();
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

    await gate.ktSignUp.goto();

    const page = await gate.ktSignUp.open한국모바일인증();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect전화번호filled();
    // await page.expect보안문자Focuced();
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

    await gate.ktSignUp.goto();

    const page = await gate.ktSignUp.open한국모바일인증();
    await page.expectQrAuthPage();
  });
});

test.describe("from 인터파크 티켓 본인인증", () => {
  test("SMS", async ({ gate, popupPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };
    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.인터파크티켓_본인인증.goto();

    const page = await gate.인터파크티켓_본인인증.open한국모바일인증();
    await page.expectSmsAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호성별filled();
    await page.expect전화번호filled();
    // await page.expect보안문자Focuced();
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

    await gate.인터파크티켓_본인인증.goto();

    const page = await gate.인터파크티켓_본인인증.open한국모바일인증();
    await page.expectPassAuthPage();

    await page.prepare(rawProfile);
    await page.expect이름filled();
    await page.expect전화번호filled();
    // await page.expect보안문자Focuced();
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

    await gate.인터파크티켓_본인인증.goto();

    const page = await gate.인터파크티켓_본인인증.open한국모바일인증();
    await page.expectQrAuthPage();
  });
});
