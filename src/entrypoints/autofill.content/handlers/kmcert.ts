import { solveCaptcha } from "@/utils/captcha";
import type { Handler } from "@/utils/type";

// 통신사 선택 & 약관동의 & 인증방식 선택
export const kmcert_v2_1: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://www.kmcert.com/kmcis/web_v2/kmcisHp00.jsp");
  },
  fill: async (page, profile) => {
    await page
      .input("#reqCommIdStated")
      .fill(profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM"));

    const form = page.form("form[name='cplogn']");
    const actionHref = profile.map.인증방식([
      "",
      "/kmcis/web_v2/kmcisSms01.jsp",
      "/kmcis/simpleCert_web/kmcisApp01.jsp",
      "/kmcis/web_v2/kmcisSms01.jsp", // QR을 지원하지 않는 버전이므로, 대신 SMS 인증 페이지로 이동
    ]);

    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

// SMS 인증 & PASS 인증
export const kmcert_v2_2: Handler = {
  isMatch: (page) => {
    const isHostnameValid = page.url.hostname === "www.kmcert.com";
    const isPathnameValid = [
      "/kmcis/web_v2/kmcisSms01.jsp",
      "/kmcis/simpleCert_web/kmcisApp01.jsp",
    ].some((l) => page.url.pathname.includes(l));
    return isHostnameValid && isPathnameValid;
  },
  fill: async (page, profile) => {
    await page.input(`input[name="userName"]`).fill(profile.이름);
    await page.input(`select[name="nation"]`).fill(profile.내국인 ? "0" : "1");
    await page.input(`input[name="Birth"]`).fill(profile.생년월일);

    const 성별Input = page.input(`input[name="sex"]`);
    const 남자A = page.q("#man");
    const 여자A = page.q("#woman");
    const 성별 = profile.map.성별("남자", "여자");
    if (성별 === "남자") {
      남자A.element?.classList.add("active");
      여자A.element?.classList.remove("active");
    }
    if (성별 === "여자") {
      여자A.element?.classList.add("active");
      남자A.element?.classList.remove("active");
    }
    await 성별Input.fill(profile.map.성별("0", "1"));

    await page.input(`input[name="No"]`).fill(profile.전화번호.전체);
    await page.input(`input[name="togglecheck"]`).check();
    await page.input(`input[name="agree_list01"]`).check();
    await page.input(`input[name="agree_list02"]`).check();
    await page.input(`input[name="agree_list03"]`).check();
    await page.input(`input[name="agree_list04"]`).check();
    await page.input(`input[name="securityNum"]`).focus();
  },
};

// 통신사 선택 & 약관동의 & 인증방식 선택
export const kmcert_v3_1: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://www.kmcert.com/kmcis/web_v3/kmcisHp00.jsp");
  },
  fill: async (page, profile) => {
    await page
      .input("#reqCommIdStated")
      .fill(profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM"));

    const form = page.form("form[name='cplogn']");
    const actionHref = profile.map.인증방식([
      "",
      "/kmcis/web_v2/kmcisSms01.jsp",
      "/kmcis/simpleCert_web/kmcisApp01.jsp",
      "/kmcis/web_v2/kmcisSms01.jsp", // QR을 지원하지 않는 버전이므로, 대신 SMS 인증 페이지로 이동
    ]);
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

// SMS 인증 & PASS 인증
export const kmcert_v3_3: Handler = {
  isMatch: (page) => {
    return [
      "https://www.kmcert.com/kmcis/web_v3/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web_v2/kmcisApp01.jsp",
    ].some((l) => page.url.href.includes(l));
  },
  fill: async (page, profile) => {
    await page.input(`input[name="userName"]`).fill(profile.이름);
    await page.input(`input[name="Birth"]`).fill(profile.주민번호.앞자리);
    await page.input(`input[name="Sex"]`).fill(profile.주민번호.성별숫자);
    await page.input(`input[name="No"]`).fill(profile.전화번호.전체);
    await page.input(`input[name="securityNum"]`).focus();
  },
};

// 통신사 선택 & 약관동의 & 인증방식 선택
export const kmcert_v4_1: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://www.kmcert.com/kmcis/web_v4/kmcisHp00.jsp");
  },
  fill: async (page, profile) => {
    await page.q(".step1header").visible().click();
    const 통신사 = profile.map.통신사("SKT", "KTF", "LGU", "SKM", "KTM", "LGM");
    await page.input('input[name="reqCommIdStated"]').fill(통신사);
    await page.input('input[name="CommId"]').fill(통신사);

    const form = page.form("#cplogn");
    const actionHref = profile.map.인증방식([
      "",
      "/kmcis/web_v4/kmcisSms01.jsp",
      "/kmcis/simpleCert_web_v3/kmcisApp01.jsp",
      "/kmcis/qr_web/kmcisQr01.jsp", // QR을 지원하지 않는 버전이므로, 대신 QR 인증 페이지로 이동 - 사실 지원하는거 같은데 확인할만한 사이트를 못찾았음
    ]);
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

// SMS 인증
export const kmcert_v4_2: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://www.kmcert.com/kmcis/web_v4/kmcisSms01.jsp");
  },
  fill: async (page, profile) => {
    await page.input("#userName").visible().fill(profile.이름);
    await page.input("#Birth").visible().fill(profile.주민번호.앞자리);
    await page.input("#Sex").visible().fill(profile.주민번호.성별숫자);
    await page.input("#No").visible().fill(profile.전화번호.전체);
  },
};

// PASS 인증
export const kmcert_v4_3: Handler = {
  isMatch: (page) => {
    return page.url.href.includes("https://www.kmcert.com/kmcis/simpleCert_web_v3/kmcisApp01.jsp");
  },
  fill: async (page, profile) => {
    await page.input("#userName").visible().fill(profile.이름);
    await page.input("#No").visible().fill(profile.전화번호.전체);
  },
};

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * 2. kt 회원가입 : https://idmng.kt.com/identify/personal
 * 3. 인터파크 이켓 - 계정로그인 - 아이디 찾기 : https://accounts.interpark.com/login/form/interpark?clientId=ticket-pc&postProc=FULLSCREEN
 */

// 통신사 선택 & 약관동의 & 인증방식 선택
export const kmcert_v5_1: Handler = {
  isMatch: (page) => {
    return [
      "https://www.kmcert.com/kmcis/web_v5/kmcisHp00.jsp",
      "https://evt.kmcert.com/kmcis/web_v5/kmcisHp00.jsp",
    ].some((l) => page.url.href.includes(l));
  },
  fill: async (page, profile) => {
    await page
      .input("#reqCommIdStated")
      .fill(profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM"));

    const actionHref = profile.map.인증방식([
      "",
      "/kmcis/web_v5/kmcisSms01.jsp",
      "/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
      "/kmcis/qr_web_v5/kmcisQr01.jsp",
    ]);
    const form = page.form("form[name='cplogn']");
    await form.setAttribute("action", actionHref);
    await form.submit();
  },
};

// SMS 인증 & PASS 인증
export const kmcert_v5_2: Handler = {
  isMatch: (page) => {
    return [
      "https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
      "https://evt.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
      "https://evt.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
    ].some((l) => page.url.href.includes(l));
  },
  fill: async (page, profile) => {
    await page.input(".userName").fill(profile.이름);
    await page.button(".btnUserName").click();
    await page.input(".myNum1").fill(profile.주민번호.앞자리);
    await page.input(".myNum2").fill(profile.주민번호.성별숫자);
    await page.input(".mobileNo").fill(profile.전화번호.전체);

    const image = await page.image("#simpleCaptchaImg").loaded().run();
    const captchaText = await solveCaptcha("/captcha/kmcert.onnx", image.element!);
    await page.input(".captchaAnswer").fill(captchaText);

    await page.button(".btn_confirm").focus();
  },
};
