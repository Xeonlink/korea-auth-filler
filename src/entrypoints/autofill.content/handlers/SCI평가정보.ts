import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 사이트
 * 1. https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j10.jsp
 * 2. 대전광역시 : https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=
 */

export const SCI평가정보1: Handler = {
  isMatch: (url) => {
    return ["https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j10.jsp"].some((t) => url.includes(t));
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const 통신사Input = q<HTMLInputElement>("input[name='cellCorp']");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
        dispatchEvent(통신사Input);
      }

      const 폼 = q<HTMLFormElement>("form[name='cplogn']");
      if (폼) {
        const 통신3사 = profile.통신3사 ? "" : "Mvno";
        const 인증방식 = profile.map.인증방식(["", "App", "", ""]);
        const actionHref = `https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHp${통신3사}Ti${인증방식}01.jsp`;

        폼.setAttribute("action", actionHref);
        폼.submit();
      }
    }, 500);
  },
};

export const SCI평가정보2: Handler = {
  isMatch: (url) => {
    return [
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTiApp01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTi01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTiApp01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTi01.jsp",
    ].some((t) => url.includes(t));
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>("#userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      dispatchEvent(이름Input);
    }

    const 전화번호Input = q<HTMLInputElement>("#No");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.뒷8자리;
      dispatchEvent(전화번호Input);
    }

    const 주민번호앞Input = q<HTMLInputElement>("#birthDay1");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      dispatchEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>("#birthDay2");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      dispatchEvent(주민번호뒤Input);
    }

    const 보안문자Input = q<HTMLInputElement>("#secur");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
