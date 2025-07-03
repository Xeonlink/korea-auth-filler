import { test, setProfileToUse, expect } from ".";
import { Page } from "@playwright/test";
import { carrier } from "@/utils/constants";
import { way } from "@/utils/constants";
import { Profile } from "@/utils/Profile";

const goto_toss = async (page: Page) => {
  await page.goto("https://www.onepass.go.kr/membership/find/id", {
    waitUntil: "networkidle",
  });
  const pagePromise = page.context().waitForEvent("page");
  await page.getByRole("link", { name: "토스인증" }).click();
  const newPage = await pagePromise;
  return newPage;
};

test("-", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  page = await goto_toss(page);
  await expect(page).toHaveURL("https://auth.cert.toss.im/type-info");

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("#text-field-line-1");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator("#text-field-line-2");
  {
    await expect(전화번호Input).toBeVisible();
    const 전화번호 = `${profile.전화번호.앞3자리} ${profile.전화번호.뒷8자리.slice(0, 4)} ${profile.전화번호.뒷8자리.slice(4)}`;
    await expect(전화번호Input).toHaveValue(전화번호);
  }
  const 생년월일Input = page.locator("#text-field-line-3");
  {
    await expect(생년월일Input).toBeVisible();
    await expect(생년월일Input).toHaveValue(profile.생년월일.substring(2));
  }
});
