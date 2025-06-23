import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * - 스마일패드 회원가입 : http://www.smilepad.co.kr/
 * - 골든브라운 본인인증 샘플페이지 : https://www.goldenbrown.co.kr/_api/_nhnkcp/kcpcert_api/index.html
 */
export const NHN_KCP1: Handler = {
  isMatch: (url) => {
    return url.includes("https://cert.kcp.co.kr/cert/pc/telcomSelect.jsp");
  },
  fill: (_, profile) => {
    const 통신사Input = q<HTMLInputElement>("input[name='comm_id']");
    if (통신사Input) {
      통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGU", "SKM", "KTM", "LGM"]);
      dispatchEvent(통신사Input);
    }

    const 인증방법Input = q<HTMLInputElement>("input[name='cert_method']");
    if (인증방법Input) {
      인증방법Input.value = profile.map.인증방식(["", "01", "00", "00"]);
      dispatchEvent(인증방법Input);
    }

    const 폼Form = q<HTMLFormElement>("#form_auth");
    if (폼Form) {
      const 인증방법 = profile.map.인증방식(["", "smsForm", "pushQRForm"]);
      const actionHref = `https://cert.kcp.co.kr/cert/pc/${인증방법}.jsp`;
      폼Form.setAttribute("action", actionHref);
      폼Form.submit();
    }
  },
};

export const NHN_KCP2: Handler = {
  isMatch: (url) => {
    return [
      "https://cert.kcp.co.kr/cert/pc/smsForm.jsp",
      "https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp",
      "https://cert.kcp.co.kr/cert/mo/smsForm.jsp",
      "https://cert.kcp.co.kr/cert/mo/pushQRForm.jsp",
    ].some((l) => url.includes(l));
  },
  fill: (ctx, profile) => {
    const 이름Input = q<HTMLInputElement>("#user_name");
    if (이름Input) {
      이름Input.value = profile.이름;
      dispatchEvent(이름Input);
    }

    const 주민번호Input1 = q<HTMLInputElement>("#mynum1");
    if (주민번호Input1) {
      주민번호Input1.value = profile.주민번호.앞자리;
      dispatchEvent(주민번호Input1);
    }

    const 주민번호Input2 = q<HTMLInputElement>("#mynum2");
    if (주민번호Input2) {
      주민번호Input2.value = profile.주민번호.성별숫자 ?? "";
      dispatchEvent(주민번호Input2);
    }

    const isPc = !window.location.pathname.includes("/mo");
    const 전화번호Input = q<HTMLInputElement>(isPc ? "#phone_no_rKey" : "#phone_no");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      dispatchEvent(전화번호Input);
    }

    const 보안문자Input = q<HTMLInputElement>("#captcha_no");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
