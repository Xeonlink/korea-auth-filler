import { test, expect, mockRawProfile } from "./index";
import { usePopup } from "./usePopup";
import { Profile } from "@/utils/Profile";

test("새 창에 열기", async ({ page, context, extensionId }) => {
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);

  await page.goto("https://state.gwd.go.kr/portal/minwon/epeople/counsel");
  const pagePromise = context.waitForEvent("page");
  await page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_06").click();
  page = await pagePromise;

  const profile = new Profile(rawProfile);
  const 이름Input = page.locator("input[name='name']");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator("input[name='telno']");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
  const 동의Inputs = await page.locator(".agree-list input").all();
  for (const 동의Input of 동의Inputs) {
    await expect(동의Input).toBeVisible();
    await expect(동의Input).toBeChecked();
  }
});

test("iframe", async ({ page, extensionId }) => {
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);

  await page.goto(
    "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&initPage=agitxLogin",
  );
  await page.getByRole("button", { name: "모바일신분증" }).first().click();
  await page.getByRole("button", { name: "모바일신분증" }).last().click();
  const frameLocator = page.frameLocator("iframe[title='모바일신분증 인증']");
  const profile = new Profile(rawProfile);
  const 이름Input = frameLocator.locator("input[name='name']");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = frameLocator.locator("input[name='telno']");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
  const 동의Inputs = await frameLocator.locator(".agree-list input").all();
  for (const 동의Input of 동의Inputs) {
    await expect(동의Input).toBeVisible();
    await expect(동의Input).toBeChecked();
  }
});
