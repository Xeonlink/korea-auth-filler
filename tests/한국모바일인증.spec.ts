import { test, expect, mockRawProfile } from "./index";
import { usePopup } from "./usePopup";
import { way } from "@/utils/constants";
import { Profile } from "@/utils/Profile";
import { Page } from "@playwright/test";

async function goto한국모바일인증(page: Page) {
  await page.goto("https://state.gwd.go.kr/portal/minwon/epeople/counsel", {
    waitUntil: "networkidle",
  });
  const pagePromise = page.context().waitForEvent("page");
  await page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_03").click();
  const newPage = await pagePromise;
  return newPage;
}

test("SMS", async ({ page, extensionId }) => {
  // 프로필 선택
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile, way: way.SMS };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);

  // 채우기 확인
  page = await goto한국모바일인증(page);
  await expect(page).toHaveURL("https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp");
  const profile = new Profile(rawProfile);
  const 이름Input = page.locator(`input[name="userName"]`);
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 주민번호Input = page.locator(`input[name="myNum1"]`);
  {
    await expect(주민번호Input).toBeVisible();
    await expect(주민번호Input).toHaveValue(profile.주민번호.앞자리);
  }
  const 성별Input = page.locator(`input[name="myNum2"]`);
  {
    await expect(성별Input).toBeVisible();
    await expect(성별Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
  }
  const 전화번호Input = page.locator(`input[name="mobileNo"]`);
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("PASS", async ({ page, extensionId }) => {
  // 프로필 선택
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile, way: way.PASS };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);

  // 채우기 확인
  page = await goto한국모바일인증(page);
  await expect(page).toHaveURL("https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp");
  const profile = new Profile(rawProfile);
  const 이름Input = page.locator(`input[name="userName"]`);
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator(`input[name="mobileNo"]`);
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
});

test("QR", async ({ page, extensionId }) => {
  // 프로필 선택
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile, way: way.QR };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);

  // 채우기 확인
  page = await goto한국모바일인증(page);
  await expect(page).toHaveURL("https://www.kmcert.com/kmcis/qr_web_v5/kmcisQr01.jsp");
});
