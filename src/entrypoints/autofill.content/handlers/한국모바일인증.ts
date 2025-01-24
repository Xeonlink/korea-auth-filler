import type { Handler } from "@/utils/type";
import { q, way } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v4/kmcisHp00.jsp");
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const test = q<HTMLButtonElement>(".step1header");
      if (!test) {
        return;
      }

      const 통신사Input = q<HTMLInputElement>('input[name="reqCommIdStated"]');
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGU", "SKM", "KTM", "LGM"]);
      }

      const 통신사Input2 = q<HTMLInputElement>('input[name="CommId"]');
      if (통신사Input2) {
        통신사Input2.value = profile.map.통신사(["", "SKT", "KTF", "LGU", "SKM", "KTM", "LGM"]);
      }

      const 폼 = q<HTMLFormElement>("#cplogn");
      if (폼) {
        let actionHref = "";
        if (profile.인증방식 === way.SMS) {
          actionHref = "https://www.kmcert.com/kmcis/web_v4/kmcisSms01.jsp";
        } else {
          actionHref = "https://www.kmcert.com/kmcis/simpleCert_web_v3/kmcisApp01.jsp";
        }

        폼.setAttribute("action", actionHref);
        폼.submit();
      }
    }, 500);
  },
};

// 한국모바일인증 - SMS 인증
export const 한국모바일인증2: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v4/kmcisSms01.jsp");
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#userName");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 주민번호앞Input = q<HTMLInputElement>("#Birth");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒤Input = q<HTMLInputElement>("#Sex");
      if (주민번호뒤Input) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      }

      const 전화번호Input = q<HTMLInputElement>("#No");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.전체;
      }
    }, 500);
  },
};

// 한국모바일인증 - PASS 인증
export const 한국모바일인증3: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/simpleCert_web_v3/kmcisApp01.jsp");
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#userName");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 전화번호Input = q<HTMLInputElement>("#No");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.전체;
      }
    }, 500);
  },
};
