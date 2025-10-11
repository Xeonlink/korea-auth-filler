import { solveCaptcha } from "@/utils/captcha";
import { defineHandler } from ".";

defineHandler("nhnkcp", {
  isMatch: (page) => {
    return page.url.href.startsWith("https://cert.kcp.co.kr/telcomSelect.do");
  },
  fill: async (page, profile, _options) => {
    await page
      .input("input[name='commId']")
      .fill(profile.map.통신사("SKT", "KTF", "LGU", "SKM", "KTM", "LGM"));

    const 인증방법 = profile.map.인증방식(["", "smsForm", "pushForm", "qrAuthForm"]);
    const actionHref = `https://cert.kcp.co.kr/${인증방법}.do`;
    const form = page.form(`#obj_form`);
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
});

defineHandler("nhnkcp", {
  isMatch: (page) => {
    const isHostnameValid = page.url.hostname === "cert.kcp.co.kr";
    const isPathnameValid = /\/(sms|push)Form\.do/.test(page.url.pathname);
    return isHostnameValid && isPathnameValid;
  },
  fill: async (page, profile, _options) => {
    await page.input("#userName").fill(profile.이름);
    await page.button("button.btnUserName").click();
    // 인증방식 SMS 일 때
    if (page.url.pathname.includes("smsForm.do")) {
      await page.input("#myNum1").fill(profile.주민번호.앞자리);
      await page.input("#myNum2").fill(profile.주민번호.성별숫자);
    }
    await page.input("#userPhone").fill(profile.전화번호.전체);

    const 보안문자Image = await page.image("#simpleCaptchaImg").loaded().run();
    const captchaText = await solveCaptcha("/captcha/nhnkcp.onnx", 보안문자Image.element!);
    await page.input("#inputCaptcha").fill(captchaText);
  },
});
