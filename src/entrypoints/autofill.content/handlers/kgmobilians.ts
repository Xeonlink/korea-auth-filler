import type { Handler, IProfile } from "@/utils/type";
import { solveCaptcha } from "@/utils/captcha";
import { Page } from "@/utils/Page";

/**
 * 테스트 주소
 * - 야놀자 회원가입 : https://accounts.yanolja.com/?service=yanolja
 */

export const kgmobilians: Handler = {
  isMatch: (url) => {
    return url.includes("https://auth.mobilians.co.kr/goCashMain.mcash");
  },
  fill: async (page, profile) => {
    await fillStartView(page, profile);

    if (profile.인증방식.PASS) {
      await page.button("button.btnSubmit").visible().click();
      await fillPASSView(page, profile);
    }
    if (profile.인증방식.SMS || profile.인증방식.QR) {
      await page.button("button.btnSms").visible().click();
      await fillSMSView(page, profile);
    }

    const PASS로인증Anchor = page.q(`#qr_auth`).visible();
    await PASS로인증Anchor.on("click", () => fillPASSView(page, profile));

    const SMS로인증Anchor = page.q(`#sms_auth`).visible();
    await SMS로인증Anchor.on("click", () => fillSMSView(page, profile));
  },
};

async function fillStartView(page: Page, profile: IProfile) {
  if (!profile.통신3사) {
    await page.q(`label[for="agency-and"]`).visible().click();
  }

  const 통신사 = profile.map.통신사("sk", "kt", "lgu", "sk", "kt", "lgu");
  await page
    .q(`label[for="agency-${profile.통신3사 ? "" : "popup-"}${통신사}"]`)
    .visible()
    .click();

  if (!profile.통신3사) {
    await page.button(`#mvnoConfirmBtn`).visible().click();
  }

  await page.input(`#agree_all`).visible().check();
}

async function fillPASSView(page: Page, profile: IProfile) {
  await page.input(`#pushName`).visible().fill(profile.이름);
  await page.input(`#pushPhone`).visible().fill(profile.전화번호.전체);

  const 보안문자Image = await page.image(`#captcha_number img`).loaded().run();
  const captchaText = await solveCaptcha("/captcha/kgmobilians.onnx", 보안문자Image.element!);
  await page.input(`#pushCaptchaCfm`).fill(captchaText);

  await page.button(`#pushBtn`).focus();
}

async function fillSMSView(page: Page, profile: IProfile) {
  await page.input(`#smsName`).visible().fill(profile.이름);
  await page.input(`#birthYMD`).visible().fill(profile.주민번호.앞자리);
  await page.input(`#birthSF`).visible().fill(profile.주민번호.성별숫자);
  await page.input(`#smsPhone`).visible().fill(profile.전화번호.전체);

  const 보안문자Image = await page.image(`#captcha_number2 img`).loaded().run();
  const captchaText = await solveCaptcha("/captcha/kgmobilians.onnx", 보안문자Image.element!);
  await page.input(`#smsCaptchaCfm`).fill(captchaText);

  await page.button(`#smsBtn`).focus();
}
