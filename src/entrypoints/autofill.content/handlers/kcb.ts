import type { Handler, IProfile } from "@/utils/type";

function getTcValue(profile: IProfile) {
  let tcValue = "";
  if (profile.통신3사 && (profile.인증방식.PASS || profile.인증방식.QR)) {
    tcValue = "kcb.oknm.online.pass.popup.push.cmd.mno.PS02_PushMno011Cmd";
  }
  if (!profile.통신3사 && (profile.인증방식.PASS || profile.인증방식.QR)) {
    tcValue = "kcb.oknm.online.pass.popup.push.cmd.mvno.PS02_PushMvno011Cmd";
  }
  if (profile.통신3사 && profile.인증방식.SMS) {
    tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mno.PS02_SmsMno011Cmd";
  }
  if (!profile.통신3사 && profile.인증방식.SMS) {
    tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mvno.PS02_SmsMvno011Cmd";
  }
  return tcValue;
}

/**
 * 테스트 주소
 * - 디지털원패스 : https://www.onepass.go.kr/membership/find/id
 */

export const kcb1: Handler = {
  isMatch: (page) => {
    const isUrlMatch = page.url.href.includes("https://safe.ok-name.co.kr/CommonSvl");
    const isStep1 = !!page.q<HTMLElement>(".step1header").element;
    return isUrlMatch && isStep1;
  },
  fill: async (page, profile) => {
    await page.input("input[name='tc']").fill(getTcValue(profile));
    await page
      .input("input[name='mbl_tel_cmm_cd']")
      .fill(profile.map.통신사("01", "02", "03", "04", "05", "06"));

    await page.form("#ct > form").submit();
  },
};

export const kcb2: Handler = {
  isMatch: (page) => {
    const isUrlMatch = page.url.href.includes("https://safe.ok-name.co.kr/CommonSvl");
    const isStep2 = !!page.q<HTMLElement>("section.certifyWrap").element;
    return isUrlMatch && isStep2;
  },
  fill: async (page, profile) => {
    /**
     * 인증방식 PASS | SMS 일 때
     */
    await page.input("#nm").visible().fill(profile.이름);
    await page.input("#ssn6").fill(profile.주민번호.앞자리);
    await page.input("#ssn1").fill(profile.주민번호.성별숫자);
    await page.input("#mbphn_no").fill(profile.전화번호.전체);

    const reloadButton = page.button("#botDetectCaptcha_ReloadLink");
    await reloadButton.on("click", async () => {
      const captchaText = await page
        .image("#botDetectCaptcha_CaptchaImage")
        .loaded()
        .solveCaptcha("/captcha/kcb.onnx");
      await page.input("#captchaCode").fill(captchaText);
      if (/^[02345689]{6}$/.test(captchaText)) return;
      await reloadButton.click();
    });
    await reloadButton.click();

    await page.button("#btnSubmit").focus();

    /**
     * 인증방식 QR 일 때
     *
     * QR인증 창을 닫으면 refresh 되어서 다시 QR인증 창이 떠버리는 문제가 있음.
     */
    if (profile.인증방식.QR) {
      // await page.button("#qr_auth").visible().click();
    }
  },
};
