import { carrier, way } from "@/utils/constants";
import { expect } from "@playwright/test";
import { test } from ".";
import { setProfileToUse } from ".";
import { Profile } from "@/utils/Profile";

test("normal iframe", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  await page.goto(
    "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3",
  );
  await page.getByRole("link", { name: "간편인증", exact: true }).click();
  const frameLocator = page.frameLocator(`iframe[name="simple_iframeView"]`);
  const profile = new Profile(rawProfile);

  // 드림인증
  {
    await frameLocator.getByText("드림인증").click();
    const 이름Input = frameLocator.locator(`input[data-id="oacx_name"]`);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    }
    const 생년원일Input = frameLocator.locator(`input[data-id="oacx_birth"]`);
    {
      await expect(생년원일Input).toBeVisible();
      await expect(생년원일Input).toHaveValue(profile.생년월일);
    }
    const 전화번호앞자리Select = frameLocator.locator(`select[data-id="oacx_phone1"]`);
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const 전화번호뒷자리Input = frameLocator.locator(`input[data-id="oacx_phone2"]`);
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const 동의Inputs = await frameLocator.locator(`.agree input`).all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }

  // 통신사PASS
  {
    await frameLocator.getByText("통신사PASS").click();
    const 이름Input = frameLocator.locator(`input[data-id="oacx_name"]`);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    }
    const 생년원일Input = frameLocator.locator(`input[data-id="oacx_birth"]`);
    {
      await expect(생년원일Input).toBeVisible();
      await expect(생년원일Input).toHaveValue(profile.생년월일);
    }
    const 통신사Select = frameLocator.locator(`select[data-id="oacx_phone0"]`);
    {
      await expect(통신사Select).toBeVisible();
      await expect(통신사Select).toHaveValue(
        profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]),
      );
    }
    const 전화번호앞자리Select = frameLocator.locator(`select[data-id="oacx_phone1"]`);
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    }
    const 전화번호뒷자리Input = frameLocator.locator(`input[data-id="oacx_phone2"]`);
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    }
    const 동의Inputs = await frameLocator.locator(`.agree input`).all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }
});

test("old embeded", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  await page.goto("https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do");
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

test("raon", async ({ page, extensionId }) => {
  const rawProfile = await setProfileToUse(page, extensionId, {
    carrier: carrier.KT,
    way: way.SMS,
  });

  await page.goto("https://www.seoul.go.kr/member/userlogin/loginCheck.do");
  await page.getByRole("link", { name: "본인확인 로그인" }).click();
  const pagePromise = page.context().waitForEvent("page");
  await page.locator(`button[onclick="getCardMin('CARDMIN','');"]`).click();
  page = await pagePromise;

  await page.waitForTimeout(1000 * 3);
  const profile = new Profile(rawProfile);

  {
    const 이름Input = page.locator(`input[data-id="oacx_name"]`);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    }
    const 생년원일Input = page.locator(`input[data-id="oacx_birth"]`);
    {
      await expect(생년원일Input).toBeVisible();
      await expect(생년원일Input).toHaveValue(profile.생년월일);
    }
    const 전화번호Input = page.locator(`input[data-id="oacx_phone2"]`);
    {
      const 전화번호 = `${profile.전화번호.앞3자리}-${profile.전화번호.뒷8자리.substring(0, 4)}-${profile.전화번호.뒷8자리.substring(4)}`;
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(전화번호);
    }
    const 동의Inputs = await page.locator(`.agree li:not(.hidden) input`).all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeChecked();
    }
  }
});
