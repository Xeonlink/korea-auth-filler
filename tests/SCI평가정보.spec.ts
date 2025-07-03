import { test, expect, setProfileToUse } from "./index";
import { carrier, way } from "@/utils/constants";
import { Profile } from "@/utils/Profile";
import { RawProfile } from "@/utils/type";
import { Page } from "@playwright/test";

const goto대전시_SCI평가정보 = async (page: Page) => {
  await page.goto("https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=", {
    waitUntil: "networkidle",
  });
  const pagePromise = page.context().waitForEvent("page");
  await page.getByRole("link", { name: "인증하기" }).first().click();
  const newPage = await pagePromise;
  return newPage;
};

const _goto롯데홈쇼핑_회원가입 = async (page: Page) => {
  await page.goto("https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte", {
    waitUntil: "networkidle",
  });
  const pagePromise = page.context().waitForEvent("page");
  await page.locator("#info_chk").check();
  await page.locator(`button[onclick="fn_cert('auth');"]`).click();
  const newPage = await pagePromise;
  return newPage;
};

const testSMS = async (page: Page, rawProfile: Omit<RawProfile, "id">) => {
  const profile = new Profile(rawProfile);
  const 이름Input = page.locator(".userName");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 주민번호Input = page.locator(".myNum1");
  {
    await expect(주민번호Input).toBeVisible();
    await expect(주민번호Input).toHaveValue(profile.주민번호.앞자리);
  }
  const 성별Input = page.locator(".myNum2");
  {
    await expect(성별Input).toBeVisible();
    await expect(성별Input).toHaveValue(profile.주민번호.성별숫자 ?? "");
  }
  const 전화번호Input = page.locator(".mobileNo");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
};

const testPASS = async (page: Page, rawProfile: Omit<RawProfile, "id">) => {
  const profile = new Profile(rawProfile);
  const 이름Input = page.locator(".userName");
  {
    await expect(이름Input).toBeVisible();
    await expect(이름Input).toHaveValue(profile.이름);
  }
  const 전화번호Input = page.locator(".mobileNo");
  {
    await expect(전화번호Input).toBeVisible();
    await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
  }
};

test.describe("대전시", () => {
  test.describe("MNO", () => {
    test("SMS", async ({ page, extensionId }) => {
      // 프로필 설정
      const rawProfile = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT,
        way: way.SMS,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL(
        "https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHpTi01.jsp",
      );

      await testSMS(page, rawProfile);
    });
    test("PASS", async ({ page, extensionId }) => {
      // 프로필 설정
      const rawProfile = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT,
        way: way.PASS,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL(
        "https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHpTiApp01.jsp",
      );

      await testPASS(page, rawProfile);
    });
    test("QR", async ({ page, extensionId }) => {
      const _ = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT,
        way: way.QR,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL("https://pcc.siren24.com/pcc_V3/passWebV3/testqr.jsp");
    });
  });

  test.describe("MVNO", () => {
    test("SMS", async ({ page, extensionId }) => {
      // 프로필 설정
      const rawProfile = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT_MVNO,
        way: way.SMS,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL(
        "https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHpMvnoTi01.jsp",
      );

      await testSMS(page, rawProfile);
    });
    test("PASS", async ({ page, extensionId }) => {
      // 프로필 설정
      const rawProfile = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT_MVNO,
        way: way.PASS,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL(
        "https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHpMvnoTiApp01.jsp",
      );

      await testPASS(page, rawProfile);
    });
    test("QR", async ({ page, extensionId }) => {
      const _ = await setProfileToUse(page, extensionId, {
        carrier: carrier.KT_MVNO,
        way: way.QR,
      });

      // 페이지 확인
      page = await goto대전시_SCI평가정보(page);
      await expect(page).toHaveURL("https://pcc.siren24.com/pcc_V3/passWebV3/mvnoTestQr.jsp");
    });
  });
});
