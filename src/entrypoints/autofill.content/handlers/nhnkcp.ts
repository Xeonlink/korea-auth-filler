import { solveCaptcha } from "@/utils/captcha";
import type { Handler } from "@/utils/type";

/**
 * 테스트 주소
 * - 골든브라운 본인인증 샘플페이지 : https://www.goldenbrown.co.kr/_api/_nhnkcp/kcpcert_api/sample/make_hash.php
 * - 카페24 회원가입 : https://user.cafe24.com/join/hosting/general/?page=step1&landTime=1751035289
 */
export const nhnkcp1: Handler = {
  isMatch: (page) => {
    return page.url.href.startsWith("https://cert.kcp.co.kr/cert/pc/telcomSelect.jsp");
  },
  fill: async (page, profile) => {
    await page
      .input("input[name='comm_id']")
      .fill(profile.map.통신사("SKT", "KTF", "LGU", "SKM", "KTM", "LGM"));

    await page
      .input("input[name='cert_method']")
      .fill(profile.map.인증방식(["", "01", "00", "00"]));

    const 인증방법 = profile.map.인증방식(["", "smsForm", "pushQRForm", "pushQRForm"]);
    const actionHref = `https://cert.kcp.co.kr/cert/pc/${인증방법}.jsp`;
    const form = page.form(`#form_auth`);
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

export const nhnkcp2: Handler = {
  isMatch: (page) => {
    const isHostnameValid = page.url.hostname === "cert.kcp.co.kr";
    const isPathnameValid = /\/cert\/(pc|mo)\/(sms|pushQR)Form\.jsp/.test(page.url.pathname);
    return isHostnameValid && isPathnameValid;
  },
  fill: async (page, profile) => {
    /**
     * 인증방식 PASS | SMS 일 때
     */
    await page.input("#user_name").fill(profile.이름);
    await page.input("#mynum1").fill(profile.주민번호.앞자리);
    await page.input("#mynum2").fill(profile.주민번호.성별숫자);

    const isPc = !window.location.pathname.includes("/mo");
    await page.input(isPc ? "#phone_no_rKey" : "#phone_no").fill(profile.전화번호.전체);

    const 보안문자Image = await page.image("#CAPTCHA_CaptchaImage").loaded().run();
    const captchaText = await solveCaptcha("/captcha/nhnkcp.onnx", 보안문자Image.element!);
    await page.input("#captcha_no").fill(captchaText);

    /**
     * 인증방식 QR 일 때
     *
     * 문제
     * 1. 너무 빠르게 눌러버려서 QR이 제대로 뜨지 않는 문제가 있음
     * 2. a 태그라서 보안에러가 계속 발생함.
     */
    if (profile.인증방식.QR) {
      // await page.q(".qrCodeLink").exists().visible().click();
    }
  },
};
