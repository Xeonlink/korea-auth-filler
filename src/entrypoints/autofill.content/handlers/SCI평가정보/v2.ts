import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

export const SCI평가정보_v2_1: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV2\/pcc_V\d_j10\.jsp$/g.test(url);
  },
  fill: async (page, profile) => {
    page.setInterval(() => {
      const 통신사Input = q<HTMLInputElement>("input[name='cellCorp']");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사("SKT", "KTF", "LGT", "SKM", "KTM", "LGM");
        triggerEvent(통신사Input);
      }

      const 폼 = q<HTMLFormElement>("form[name='cplogn']");
      if (폼) {
        const 통신3사 = profile.통신3사 ? "" : "Mvno";
        const 인증방식 = profile.map.인증방식(["", "", "App", ""]);
        const actionHref = `https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHp${통신3사}Ti${인증방식}01.jsp`;

        폼.setAttribute("action", actionHref);
        폼.submit();
      }
    }, 500);
  },
};

export const SCI평가정보_v2_3: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV2\/pcc_V\d_j30_certHp(Mvno)?Ti(App)?01\.jsp$/g.test(
      url,
    );
  },
  fill: async (_, profile) => {
    const 이름Input = q<HTMLInputElement>("#userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 전화번호Input = q<HTMLInputElement>("#No");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 주민번호앞Input = q<HTMLInputElement>("#birthDay1");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>("#birthDay2");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒤Input);
    }

    const 보안문자Input = q<HTMLInputElement>("#secur");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
