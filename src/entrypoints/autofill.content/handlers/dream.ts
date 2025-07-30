import type { Handler, IProfile } from "@/utils/type";
import { Page } from "@/utils/Page";

/**
 * 테스트 주소
 * 1. mock : https://cert.mobile-ok.com/ptb_mokauth.html
 * 2. h.point 회원가입 : https://www.h-point.co.kr/cu/join/start.nhd
 * 3. make# 회원가입 : https://www.makeshop.co.kr/newmakeshop/home/create_shop.html
 */

// 드림시큐리티
export const dream: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://cert.mobile-ok.com/ptb_mokauth.html");
  },
  fill: async (page, profile) => {
    await fill통신사선택View(page, profile);
    await fill인증방식선택View(page, profile);

    if (profile.인증방식.SMS) {
      await fillSMSView(page, profile);
      return;
    }
    if (profile.인증방식.PASS) {
      await fillPASSView(page, profile);
      return;
    }
  },
};

async function fill통신사선택View(page: Page, profile: IProfile) {
  const 통신사 = profile.map.통신사("skt", "kt", "lgu", "skt", "kt", "lgu");
  await page
    .button(`button[data-telco="${통신사}"][data-mvno="${!profile.통신3사}"]`)
    .visible()
    .click();
}

async function fill인증방식선택View(page: Page, profile: IProfile) {
  await page
    .q(`li[data-sign="${profile.map.인증방식(["", "sms", "pass", "qr"])}"] > button`)
    .visible()
    .click();

  await page.input("#user_agree_checkbox").click();
  await page.button("button.btn_selsign").click();
}

async function fillSMSView(page: Page, profile: IProfile) {
  await page.input("#userName_sms").visible().fill(profile.이름);
  await page.button("button.btnUserName_sms").visible().click();
  await page.input("#myNum1").visible().fill(profile.주민번호.앞자리);
  await page.input("#myNum2").visible().fill(profile.주민번호.성별숫자);
  await page.input("#mobileNo_sms").visible().fill(profile.전화번호.전체);

  const captchaText = await page
    .image("#sms_01 #simpleCaptchaImg")
    .loaded()
    .waitNew(page.button("#sms_01 #simpleCaptchaReBtn"))
    .solveCaptcha("/captcha/dream.onnx");
  await page.input("#secureNo_sms").visible().fill(captchaText);
  await page.button("#sms_01 button.btnSubmit").focus();
}

async function fillPASSView(page: Page, profile: IProfile) {
  await page.input("#userName_pass").visible().fill(profile.이름);
  await page.button("button.btnUserName_pass").visible().click();
  await page.input("#mobileNo_pass").visible().fill(profile.전화번호.전체);

  const captchaText = await page
    .image("#pass_01 #simpleCaptchaImg")
    .loaded()
    .waitNew(page.button("#pass_01 #btnSimpleCaptchaReload"))
    .solveCaptcha("/captcha/dream.onnx");
  await page.input("#secureNo_pass").visible().fill(captchaText);
  await page.button("#pass_01 button.btnSubmit").focus();
}
