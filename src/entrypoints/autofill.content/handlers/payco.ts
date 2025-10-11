import { defineHandler } from ".";
import { Page } from "@/utils/Page";
import type { IProfile } from "@/utils/type";

/**
 * 테스트 주소
 * - 고속도로 통행료 : https://www.hipass.co.kr/comm/lginpg.do#
 * - 페이코 아이디 찾기 : https://www.payco.com/
 * - 페이코 회원가입 : https://www.payco.com/
 */

defineHandler("payco", {
  isMatch: (page) => {
    return page.url.href.startsWith("https://id.payco.com/certificate/mobile/certify.nhn");
  },
  fill: async (page, profile, _options) => {
    const { searchParams } = page.url;
    const provisionAgreeYn = searchParams.get("provisionAgreeYn");
    if (provisionAgreeYn === null) {
      await page.input("#terms_all").visible().click();
      await page.button("#provisionAgreeConfirmBtn").visible().click();
    }

    const certifyType = searchParams.get("certifyType");
    switch (certifyType) {
      case "SMS":
        await fillSMSView(page, profile);
        break;
      case "APP":
        await fillAppView(page, profile);
        break;
      case null:
        await fillSMSView(page, profile);
        break;
      default:
        throw new Error(`Unknown certifyType: ${certifyType}`);
    }
  },
});

async function fillSMSView(page: Page, profile: IProfile) {
  await page.input("#name").visible().fill(profile.이름);
  await page.input("#ssn1").visible().fill(profile.주민번호.앞자리);
  await page.input("#ssn2").visible().fill(profile.주민번호.성별숫자);
  const 통신사 = profile.map.통신사("Skt", "Ktf", "Lgt", "Skr", "Ktr", "Lgr");
  await page.input(`#telecomChoiceButton${통신사}`).visible().click();
  await page.input("#mobileno").visible().fill(profile.전화번호.전체);
  await page.button("#requestBtn").focus();
}

async function fillAppView(page: Page, profile: IProfile) {
  await page.input("#name").visible().fill(profile.이름);
  const 통신사 = profile.map.통신사("Skt", "Ktf", "Lgt", "Skr", "Ktr", "Lgr");
  await page.input(`#telecomChoiceButton${통신사}`).visible().click();
  await page.input("#mobileno").visible().fill(profile.전화번호.전체);
  await page.button("#requestBtn").focus();
}
