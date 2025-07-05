import { carrier, way } from "@/utils/constants";
import { expect } from "@playwright/test";
import { test } from ".";
import { Profile } from "@/utils/Profile";
import { RawProfile } from "@/utils/type";

/**
 * 홈택스 간편인증
 */
test("normal iframe", async ({ popupPage, _홈택스LoginPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await _홈택스LoginPage.goto();
  const page = await _홈택스LoginPage.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("드림인증", async () => {
    await root.locator(".provider-list li", { hasText: "드림인증" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사PASS", async () => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect통신사filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });
});

/**
 * 예비군
 */
test("old embeded", async ({ page, popupPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await page.goto("https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "간편인증" }).click();
  await page.waitForSelector("#oacxEmbededContents");
  await page.waitForTimeout(1000 * 3);

  const profile = new Profile(rawProfile);

  // 네이버
  {
    await page.getByText("네이버").first().click();
    const 이름Input = page.locator(`.pcView #oacx_name`);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    }
    const mobile이름Input = page.locator(`.mobileView input[data-id="oacx_name"]`);
    {
      await expect(mobile이름Input).toHaveValue(profile.이름);
    }
    const 주민번호앞자리Input = page.locator(`.pcView #oacx_num1`);
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    }
    const mobile주민번호앞자리Input = page.locator(`.mobileView input[data-id="oacx_num1"]`);
    {
      await expect(mobile주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    }
    const 주민번호뒷자리Input = page.locator(`.pcView #oacx_num2`);
    {
      await expect(주민번호뒷자리Input).toBeVisible();
      await expect(주민번호뒷자리Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
    }
    const mobile주민번호뒷자리Input = page.locator(`.mobileView input[data-id="oacx_num2"]`);
    {
      await expect(mobile주민번호뒷자리Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
    }
    const 전화번호앞자리Select = page.locator(`.pcView #oacx_phone1`);
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const mobile전화번호앞자리Select = page.locator(
      `.mobileView .none-telecom select[data-id="oacx_phone1"]`,
    );
    {
      await expect(mobile전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const 전화번호뒷자리Input = page.locator(`.pcView #oacx_phone2`);
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const mobile전화번호뒷자리Input = page.locator(`.mobileView input[data-id="oacx_phone2"]`);
    {
      await expect(mobile전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const 동의Inputs = await page.locator(`.agree input`).all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }

  // 통신사패스
  {
    await page.getByText("통신사패스").first().click();
    const 이름Input = page.locator(`.pcView #oacx_name`);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    }
    const mobile이름Input = page.locator(`.mobileView input[data-id="oacx_name"]`);
    {
      await expect(mobile이름Input).toHaveValue(profile.이름);
    }
    const 주민번호앞자리Input = page.locator(`.pcView #oacx_num1`);
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    }
    const mobile주민번호앞자리Input = page.locator(`.mobileView input[data-id="oacx_num1"]`);
    {
      await expect(mobile주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    }
    const 주민번호뒷자리Input = page.locator(`.pcView #oacx_num2`);
    {
      await expect(주민번호뒷자리Input).toBeVisible();
      await expect(주민번호뒷자리Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
    }
    const mobile주민번호뒷자리Input = page.locator(`.mobileView input[data-id="oacx_num2"]`);
    {
      await expect(mobile주민번호뒷자리Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
    }
    const 통신사Select = page.locator(`.pcView select[data-id="oacx_phone0"]`);
    {
      await expect(통신사Select).toBeVisible();
      await expect(통신사Select).toHaveValue(
        profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]),
      );
    }
    const 전화번호앞자리Select = page.locator(`.pcView .telecom select[data-id="oacx_phone1"]`);
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const mobile전화번호앞자리Select = page.locator(
      `.mobileView .telecom select[data-id="oacx_phone1"]`,
    );
    {
      await expect(mobile전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const 전화번호뒷자리Input = page.locator(`.pcView #oacx_phone3`);
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const mobile전화번호뒷자리Input = page.locator(`.mobileView input[data-id="oacx_phone3"]`);
    {
      await expect(mobile전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const 동의Inputs = await page.locator(`.agree input`).all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }
});

/**
 * 서울특별시 평생교육원
 * - https://www.lllcard.kr/reg/seoul/main/crtfctPage.do
 */
// test("new embeded", async ({ page, extensionId }) => {
//   const rawProfile = await setProfileToUse(page, extensionId, {
//     carrier: carrier.KT,
//     way: way.SMS,
//   });

// });

/**
 * 서울시 민간인증서
 */
test("raon", async ({ popupPage, _서울시LoginPage, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = {
    ...mockRawProfile,
    carrier: carrier.KT,
    way: way.SMS,
  };
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await _서울시LoginPage.goto();
  const page = await _서울시LoginPage.openOACX();
  await page.prepare(rawProfile);

  await page.expect이름filled();
  await page.expect생년원일filled();
  await page.expect전화번호filled();
  await page.expect모든동의Checked();
});
