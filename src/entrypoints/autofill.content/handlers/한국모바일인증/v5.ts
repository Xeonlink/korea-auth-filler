import { solveCaptch } from "@/utils/captcha";
import type { Handler } from "@/utils/type";
import { triggerEvent, q, waitForImageLoad } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v5_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v5/kmcisHp00.jsp");
  },
  fill: async (_, profile) => {
    const 폼 = q<HTMLFormElement>("form[name='cplogn']");
    if (폼) {
      const 통신사Input = q<HTMLInputElement>("#reqCommIdStated");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM");
        triggerEvent(통신사Input);
      }

      const actionHref = profile.map.인증방식([
        "",
        "/kmcis/web_v5/kmcisSms01.jsp",
        "/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
        "/kmcis/qr_web_v5/kmcisQr01.jsp",
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
  fill: async (_, profile) => {
    const 이름Input = q<HTMLInputElement>(".userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 이름다음Button = q<HTMLButtonElement>(".btnUserName");
    if (이름다음Button) {
      이름다음Button.click();
    }

    const 주민번호앞Input = q<HTMLInputElement>(".myNum1");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>(".myNum2");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒤Input);
    }

    const 전화번호Input = q<HTMLInputElement>(".mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 보안문자Image = q<HTMLImageElement>("#simpleCaptchaImg");
    const 보안문자Input = q<HTMLInputElement>(".captchaAnswer");
    if (보안문자Image && 보안문자Input) {
      await waitForImageLoad(보안문자Image);
      const captchaText = await solveCaptch("/captcha/kmcert.onnx", 보안문자Image);
      if (captchaText) {
        보안문자Input.value = captchaText;
        triggerEvent(보안문자Input);
      }
    }

    const 확인Button = q<HTMLButtonElement>(".btn_confirm");
    if (확인Button) {
      확인Button.focus();
    }
  },
};
