import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v5_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v5/kmcisHp00.jsp");
  },
  fill: (ctx, profile) => {
    const 통신사Button = q<HTMLButtonElement>(
      "#agency-" + profile.map.통신사(["", "sk", "kt", "lgu", "skm", "ktm", "lgm"]),
    );
    if (통신사Button) {
      통신사Button.click();
    }

    const 폼 = q<HTMLFormElement>("form[name='cplogn']");
    if (폼) {
      const actionHref = profile.map.인증방식([
        "",
        "https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
        "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
        "https://www.kmcert.com/kmcis/qr_web_v5/kmcisQr01.jsp",
      ]);

      폼.setAttribute("action", actionHref);
      폼.submit();
    }
  },
};

// 한국모바일인증 - SMS 인증 & PASS 인증
export const 한국모바일인증_v5_2: Handler = {
  isMatch: (url) => {
    return [
      "https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
    ].some((l) => url.includes(l));
  },
  fill: (ctx, profile) => {
    const 이름Input = q<HTMLInputElement>(".userName");
    if (!이름Input) return;
    이름Input.value = profile.이름;
    dispatchEvent(이름Input);

    const 이름다음Button = q<HTMLButtonElement>(".btnUserName");
    if (이름다음Button) {
      이름다음Button.click();
    }

    const 주민번호앞Input = q<HTMLInputElement>(".myNum1");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      dispatchEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>(".myNum2");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      dispatchEvent(주민번호뒤Input);
    }

    const 전화번호Input = q<HTMLInputElement>(".mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      dispatchEvent(전화번호Input);
    }

    const 보안문자Input = q<HTMLInputElement>(".captchaAnswer");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
