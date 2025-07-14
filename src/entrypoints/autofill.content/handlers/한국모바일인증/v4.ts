import type { Handler } from "@/utils/type";
import { q } from "@/utils/utils";

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v4_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v4/kmcisHp00.jsp");
  },
  fill: async (ctx, profile) => {
    ctx.setInterval(() => {
      const test = q<HTMLButtonElement>(".step1header");
      if (!test) {
        return;
      }

      const 통신사Input = q<HTMLInputElement>('input[name="reqCommIdStated"]');
      const 통신사 = profile.map.통신사(["", "SKT", "KTF", "LGU", "SKM", "KTM", "LGM"]);
      if (통신사Input) {
        통신사Input.value = 통신사;
      }

      const 통신사Input2 = q<HTMLInputElement>('input[name="CommId"]');
      if (통신사Input2) {
        통신사Input2.value = 통신사;
      }

      const 폼 = q<HTMLFormElement>("#cplogn");
      if (폼) {
        const actionHref = profile.map.인증방식([
          "",
          "/kmcis/web_v4/kmcisSms01.jsp",
          "/kmcis/simpleCert_web_v3/kmcisApp01.jsp",
          "/kmcis/qr_web/kmcisQr01.jsp", // QR을 지원하지 않는 버전이므로, 대신 QR 인증 페이지로 이동 - 사실 지원하는거 같은데 확인할만한 사이트를 못찾았음
        ]);

        폼.setAttribute("action", actionHref);
        폼.submit();
      }
    }, 500);
  },
};

// 한국모바일인증 - SMS 인증
export const 한국모바일인증_v4_2: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v4/kmcisSms01.jsp");
  },
  fill: async (ctx, profile) => {
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
export const 한국모바일인증_v4_3: Handler = {
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
