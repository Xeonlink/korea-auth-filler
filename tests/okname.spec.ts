import { carrier, way } from "@/utils/constants";
import { Page } from "@playwright/test";
import { expect, setProfileToUse, test } from ".";
import { Profile } from "@/utils/Profile";

const goto_okname = async (page: Page) => {
  await page.goto("https://www.onepass.go.kr/membership/find/id");
  const pagePromise = page.context().waitForEvent("page");
  await page.getByRole("link", { name: "휴대폰 인증" }).click();
  const newPage = await pagePromise;
  return newPage;
};

test("SMS", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  page = await goto_okname(page);
  await expect(page).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#nm");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 주민번호Input = page.locator("#ssn6");
  {
    await expect(주민번호Input).toBeVisible();
    await expect(주민번호Input).toHaveValue(profile.주민번호.앞자리);
  }
  const 주민번호성별Input = page.locator("#ssn1");
  {
    await expect(주민번호성별Input).toBeVisible();
    await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
  }
  const 전화번호Input = page.locator("#mbphn_no");
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

  page = await goto_okname(page);
  await expect(page).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#nm");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator("#mbphn_no");
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

  page = await goto_okname(page);
  await expect(page).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");
});
