import type { Handler } from "@/utils/type";
import { solveCaptcha } from "@/utils/captcha";

// NICE평가정보
export const nice1: Handler = {
  isMatch: (page) => {
    const isHostnameValid = page.url.hostname === "nice.checkplus.co.kr";
    const isPathnameValid = /\/cert\/(main\/menu|mobileCert\/main)/.test(page.url.pathname);
    return isHostnameValid && isPathnameValid;
  },
  fill: async (page, profile) => {
    await page
      .input("input[name='selectMobileCo']")
      .fill(profile.map.통신사("SK", "KT", "LG", "SM", "KM", "LM"));

    const form = page.form("#frm");
    await form.setAttribute("action", "/cert/mobileCert/method");
    await form.submit();
  },
};

// 인증방식
export const nice2: Handler = {
  isMatch: ({ url }) => {
    return url.href.startsWith("https://nice.checkplus.co.kr/cert/mobileCert/method");
  },
  fill: async (page, profile) => {
    await page.input("input[name='mobileCertAgree']").check();

    const actionHref = `/cert/mobileCert/${profile.map.인증방식(["", "sms", "push", "qr"])}/certification`;
    const form = page.form("#frm");
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

// SMS인증
export const nice3: Handler = {
  isMatch: ({ url }) => {
    return url.href.startsWith("https://nice.checkplus.co.kr/cert/mobileCert/sms/certification");
  },
  fill: async (page, profile) => {
    await page.input("#userName").fill(profile.이름);
    await page.button("#btnSubmit").click();
    await page.input("#myNum1").fill(profile.주민번호.앞자리);
    await page.input("#myNum2").fill(profile.주민번호.성별숫자);
    await page.input("#mobileNo").fill(profile.전화번호.전체);

    const 보안문자Image = await page.image("#simpleCaptchaImg").loaded().run();
    const captchaText = await solveCaptcha("/captcha/nice.onnx", 보안문자Image.element!);
    await page.input("#captchaAnswer").fill(captchaText);

    await page.button(".btn_confirm").focus();
  },
};

// PASS 인증
export const nice4: Handler = {
  isMatch: ({ url }) => {
    return url.href.startsWith("https://nice.checkplus.co.kr/cert/mobileCert/push/certification");
  },
  fill: async (page, profile) => {
    await page.input("#userName").fill(profile.이름);
    await page.button(".btn_pass.btnUserName").click();
    await page.input("#mobileNo").fill(profile.전화번호.전체);
    await page.input("#myNum1").fill(profile.주민번호.앞자리);
    await page.input("#myNum2").fill(profile.주민번호.성별숫자);

    const 보안문자Image = await page.image("#simpleCaptchaImg").loaded().run();
    const captchaText = await solveCaptcha("/captcha/nice.onnx", 보안문자Image.element!);
    await page.input("#captchaAnswer").fill(captchaText);

    await page.button(".btn_confirm").focus();
  },
};
