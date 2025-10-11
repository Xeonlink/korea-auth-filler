import { defineHandler } from ".";
import type { IProfile } from "@/utils/type";
import { Page } from "@/utils/Page";

defineHandler("dream", {
  isMatch: (page) => {
    return page.url.href.startsWith("https://cert.mobile-ok.com/ptb_mokauth.html");
  },
  fill: async (page, profile, _options) => {
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
});

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
  await page.button(".btn_pass.btn_selsign.show").click();
}

async function fillSMSView(page: Page, profile: IProfile) {
  await page.input("#userName_sms").visible().fill(profile.이름);
  await page.button("#sms_01 button.btnUserName_sms").visible().click();
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
  await page.button("#pass_01 button.btnUserName_pass").visible().click();
  await page.input("#mobileNo_pass").visible().fill(profile.전화번호.전체);

  const captchaText = await page
    .image("#pass_01 #simpleCaptchaImg")
    .loaded()
    .waitNew(page.button("#pass_01 #btnSimpleCaptchaReload"))
    .solveCaptcha("/captcha/dream.onnx");
  await page.input("#secureNo_pass").visible().fill(captchaText);
  await page.button("#pass_01 button.btnSubmit").focus();
}
