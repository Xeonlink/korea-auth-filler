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

// test("old embeded", async ({ page, extensionId }) => {
//   const rawProfile = await setProfileToUse(page, extensionId, {
//     carrier: carrier.KT,
//     way: way.SMS,
//   });

//   await page.goto("https://www.foresttrip.go.kr/com/login.do");
//   const pagePromise = page.context().waitForEvent("page");
//   await page.locator("#simpleDemo").click();
//   page = await pagePromise;

//   const profile = new Profile(rawProfile);

//   // 네이버
//   {
//     await page.getByText("네이버").click();
//     const 이름Input = page.locator(`input[data-id="oacx_name"]`);
//     {
//       await expect(이름Input).toBeVisible();
//       await expect(이름Input).toHaveValue(profile.이름);
//     }
//     const 생년원일Input = page.locator(`input[data-id="oacx_birth"]`);
//     {
//       await expect(생년원일Input).toBeVisible();
//       await expect(생년원일Input).toHaveValue(profile.생년월일);
//     }
//     const 전화번호앞자리Select = page.locator(`select[data-id="oacx_phone1"]`);
//     {
//       await expect(전화번호앞자리Select).toBeVisible();
//       await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
//     }
//     const 전화번호뒷자리Input = page.locator(`input[data-id="oacx_phone2"]`);
//     {
//       await expect(전화번호뒷자리Input).toBeVisible();
//       await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
//     }
//     const 동의Inputs = await page.locator(`.agree input`).all();
//     for (const 동의Input of 동의Inputs) {
//       await expect(동의Input).toBeVisible();
//       await expect(동의Input).toBeChecked();
//     }
//   }
// });
