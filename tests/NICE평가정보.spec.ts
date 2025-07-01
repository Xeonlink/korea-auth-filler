import { Page } from "@playwright/test";
import { expect, setProfileToUse, test } from ".";
import { carrier, way } from "@/utils/constants";
import { Profile } from "@/utils/Profile";

const goto_NICE평가정보 = async (page: Page) => {
  await page.goto("https://www.seoul.go.kr/member/userlogin/loginCheck.do");
  await page.getByRole("link", { name: "본인확인 로그인" }).click();
  const pagePromise = page.context().waitForEvent("page");
  await page.locator(`button[onclick="setPhoneBase('PHONE','');"]`).click();
  const newPage = await pagePromise;
  return newPage;
};

test("SMS", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  page = await goto_NICE평가정보(page);
  await expect(page).toHaveURL("https://nice.checkplus.co.kr/cert/mobileCert/sms/certification");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#userName");
  {
    // await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 주민번호앞자리Input = page.locator("#myNum1");
  {
    // await expect(주민번호앞자리Input).toBeVisible();
    await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
  }
  const 주민번호성별Input = page.locator("#myNum2");
  {
    // await expect(주민번호성별Input).toBeVisible();
    await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
  }
  const 전화번호Input = page.locator("#mobileNo");
  {
    // await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("PASS", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.PASS,
  });

  page = await goto_NICE평가정보(page);
  await expect(page).toHaveURL("https://nice.checkplus.co.kr/cert/mobileCert/push/certification");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#userName");
  {
    // await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator("#mobileNo");
  {
    // await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("QR", async ({ page, extensionId }) => {
  const _ = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.QR,
  });

  page = await goto_NICE평가정보(page);
  await expect(page).toHaveURL("https://nice.checkplus.co.kr/cert/mobileCert/qr/certification");
});
