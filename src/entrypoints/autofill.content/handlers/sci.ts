import { solveCaptcha } from "@/utils/captcha";
import type { Handler } from "@/utils/type";

export const sci_v2_1: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV2\/pcc_V\d_j10\.jsp$/g.test(url);
  },
  fill: async (page, profile) => {
    await page
      .input("input[name='cellCorp']")
      .visible()
      .fill(profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM"));

    const 폼 = page.form("form[name='cplogn']");
    const 통신3사 = profile.통신3사 ? "" : "Mvno";
    const 인증방식 = profile.map.인증방식(["", "", "App", ""]);
    const actionHref = `https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHp${통신3사}Ti${인증방식}01.jsp`;
    await 폼.setAttribute("action", actionHref);
    await 폼.submit();
  },
};

export const sci_v2_3: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV2\/pcc_V\d_j30_certHp(Mvno)?Ti(App)?01\.jsp$/g.test(
      url,
    );
  },
  fill: async (page, profile) => {
    await page.input("#userName").fill(profile.이름);
    await page.input("#No").fill(profile.전화번호.전체);
    await page.input("#birthDay1").fill(profile.주민번호.앞자리);
    await page.input("#birthDay2").fill(profile.주민번호.성별숫자);
    await page.input("#secur").focus();
  },
};

/**
 * 테스트 사이트
 * 1. 대전광역시 : https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=
 * 2. 롯데홈쇼핑 회원가입 : https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte
 */

export const sci_v3_1: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/pcc_V\d_j10\.jsp$/g.test(url);
  },
  fill: async (page, profile) => {
    const 통신사 = profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM");
    await page.button(`button[onclick="submitForm('${통신사}')"]`).click();
  },
};

export const sci_v3_2: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/bokdo(Mv)?\.jsp$/g.test(url);
  },
  fill: async (page, profile) => {
    const 인증방식 = profile.map.인증방식(["", "문자(SMS) 인증", "pass 인증", "QR코드 인증"]);
    await page.q(`li[aria-label="${인증방식}"] > button`).visible().click();
    await page.input("#check_txt").visible().check();
    await page.button(`button[data-action="next"]`).visible().click();
  },
};

export const sci_v3_3: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/pcc_V\d_j30_certHp(Mvno)?Ti(App)?01\.jsp$/g.test(
      url,
    );
  },
  fill: async (page, profile) => {
    await page.input(".userName").fill(profile.이름);
    await page.button(".btnUserName").click();
    await page.input(".myNum1").fill(profile.주민번호.앞자리);
    await page.input(".myNum2").fill(profile.주민번호.성별숫자);
    await page.input(".mobileNo").fill(profile.전화번호.전체);

    const 보안문자Image = await page.image("#simpleCaptchaImg").loaded().run();
    const captchaText = await solveCaptcha("/captcha/sci.onnx", 보안문자Image.element!);
    await page.input(".captchaAnswer").fill(captchaText);

    await page.button(".btn_confirm").focus();
  },
};
