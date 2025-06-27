import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v3_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v3/kmcisHp00.jsp");
  },
  fill: (_, profile) => {
    const 폼 = q<HTMLFormElement>("form[name='cplogn']");
    if (폼) {
      const 통신사Input = q<HTMLInputElement>("#reqCommIdStated");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
        triggerEvent(통신사Input);
      }

      const actionHref = profile.map.인증방식([
        "",
        "/kmcis/web_v3/kmcisSms01.jsp",
        "/kmcis/simpleCert_web/kmcisApp01.jsp",
        "/kmcis/qr_web/kmcisQr01.jsp",
      ]);

      폼.setAttribute("action", actionHref);
      폼.submit();
    }
  },
};

// 한국모바일인증 - SMS 인증 & PASS 인증
export const 한국모바일인증_v3_3: Handler = {
  isMatch: (url) => {
    return [
      "https://www.kmcert.com/kmcis/web_v3/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web_v2/kmcisApp01.jsp",
    ].some((l) => url.includes(l));
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>(`input[name="userName"]`);
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 주민번호앞Input = q<HTMLInputElement>(`input[name="Birth"]`);
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>(`input[name="Sex"]`);
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒤Input);
    }

    const 전화번호Input = q<HTMLInputElement>(`input[name="No"]`);
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 보안문자Input = q<HTMLInputElement>(`input[name="securityNum"]`);
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
