import type { RawProfile } from "@/utils/type";
import type { Page } from "@playwright/test";

async function addProfile(page: Page, profile: Omit<RawProfile, "id">) {
  await page.locator(`input[name="name"]`).fill(profile.name);
  await page.locator(`select[name="carrier"]`).selectOption(profile.carrier);
  await page.locator(`input[name="phone_number"]`).fill(profile.phone_number);
  await page.locator(`input[name="birth"]`).fill(profile.birth);
  await page.locator(`select[name="foreigner"]`).selectOption(profile.foreigner);
  await page.locator(`select[name="gender"]`).selectOption(profile.gender);
  await page.locator(`select[name="way"]`).selectOption(profile.way);
  await page.locator(`button[type="submit"]`).click();
}

async function selectProfile(page: Page, index: number) {
  const ul = page.locator("main ul");
  const li = ul.nth(index);
  const button = li.getByRole("button").nth(0);
  await button.click();
}

async function removeProfile(page: Page, index: number) {
  const ul = page.locator("main ul");
  const li = ul.nth(index);
  const button = li.getByRole("button").nth(1);
  await button.click();
}

export async function usePopup(page: Page, extensionId: string) {
  if (!page.url().includes("popup.html")) {
    await page.goto(`chrome-extension://${extensionId}/popup.html`, {
      waitUntil: "domcontentloaded",
    });
  }

  return {
    addProfile: addProfile.bind(null, page),
    selectProfile: selectProfile.bind(null, page),
    removeProfile: removeProfile.bind(null, page),
  };
}
