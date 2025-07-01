import { carrier, way } from "@/utils/constants";
import { Profile } from "@/utils/Profile";
import { Page } from "@playwright/test";
import { expect, setProfileToUse, test } from ".";

const goto_NHN_KCP = async (page: Page) => {
  await page.goto("https://www.goldenbrown.co.kr/_api/_nhnkcp/kcpcert_api/sample/make_hash.php");
  await page.getByRole("link", { name: "hash 생성요청" }).click();
  const pagePromise = page.context().waitForEvent("page");
  await page.locator(`input[value="인증요청"]`).click();
  const newPage = await pagePromise;
  return newPage;
};

test("SMS", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  page = await goto_NHN_KCP(page);
  await expect(page).toHaveURL("https://cert.kcp.co.kr/cert/pc/smsForm.jsp");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#user_name");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 주민번호앞자리Input = page.locator("#mynum1");
  {
    await expect(주민번호앞자리Input).toBeVisible();
    await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
  }
  const 주민번호성별Input = page.locator("#mynum2");
  {
    await expect(주민번호성별Input).toBeVisible();
    await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
  }
  const 전화번호Input = page.locator("#phone_no_rKey");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("PASS", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.PASS,
  });

  page = await goto_NHN_KCP(page);
  await expect(page).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#user_name");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator("#phone_no_rKey");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("QR", async ({ page, extensionId }) => {
  const _ = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.QR,
  });

  page = await goto_NHN_KCP(page);
  await expect(page).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");
});
