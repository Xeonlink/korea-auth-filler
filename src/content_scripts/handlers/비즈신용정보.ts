import { Handler } from "../../type";
import { q, way } from "../../utils";

export const 비즈신용정보1: Handler = {
  isMatch: (url) => {
    return ["https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j10.jsp"].some((t) => url.includes(t));
  },
  fill: (profile) => {
    setInterval(() => {
      const 통신사Input = q<HTMLInputElement>("#cellCorp");
      if (통신사Input) {
        통신사Input.value = profile.통신사.매핑(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
      }

      const 폼 = q<HTMLFormElement>("#cplogn");
      if (폼) {
        let actionHref = "";
        if (profile.통신사.is3사 && profile.인증방식.raw === way.PASS) {
          actionHref = "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTiApp01.jsp";
        }
        if (profile.통신사.is3사 && profile.인증방식.raw === way.SMS) {
          actionHref = "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTi01.jsp";
        }
        if (!profile.통신사.is3사 && profile.인증방식.raw === way.PASS) {
          actionHref = "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTiApp01.jsp";
        }
        if (!profile.통신사.is3사 && profile.인증방식.raw === way.SMS) {
          actionHref = "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTi01.jsp";
        }

        폼.setAttribute("action", actionHref);
        폼.submit();
      }
    }, 500);
  },
};

export const 비즈신용정보2: Handler = {
  isMatch: (url) => {
    return [
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTiApp01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpTi01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTiApp01.jsp",
      "https://pcc.siren24.com/pcc_V3/passWebV2/pcc_V3_j30_certHpMvnoTi01.jsp",
    ].some((t) => url.includes(t));
  },
  fill: (profile) => {
    setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#userName");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 전화번호Input = q<HTMLInputElement>("#No");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.뒷8자리;
      }

      const 주민번호앞Input = q<HTMLInputElement>("#birthDay1");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒤Input = q<HTMLInputElement>("#birthDay2");
      if (주민번호뒤Input) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      }
    }, 500);
  },
};
