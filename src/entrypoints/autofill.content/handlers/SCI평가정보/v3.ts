import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 사이트
 * 1. 대전광역시 : https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=
 */

export const SCI평가정보_v3_1: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V3\/passWebV3\/pcc_V\d_j10\.jsp$/g.test(url);
  },
  fill: (_, profile) => {
    const 통신사 = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
    const 통신사Button = q<HTMLButtonElement>(`button[onclick="submitForm('${통신사}')"]`);
    if (통신사Button) {
      통신사Button.click();
    }
  },
};

export const SCI평가정보_v3_2: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V3\/passWebV\d\/bokdo(Mv)?\.jsp$/g.test(url);
  },
  fill: (_, profile) => {
    const 인증방식 = profile.map.인증방식(["", "문자(SMS) 인증", "pass 인증", "QR코드 인증"]);
    const 인증방식Button = q<HTMLButtonElement>(`li[aria-label="${인증방식}"] > button`);
    if (!인증방식Button) return;
    인증방식Button.click();

    const 본인확인Check = q<HTMLInputElement>("#check_txt");
    if (!본인확인Check) return;
    if (!본인확인Check.checked) {
      본인확인Check.click();
    }

    const 다음Button = q<HTMLButtonElement>(`button[data-action="next"]`);
    if (!다음Button) return;
    다음Button.click();
  },
};

export const SCI평가정보_v3_3: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V3\/passWebV\d\/pcc_V\d_j30_certHp(Mvno)?Ti(App)?01\.jsp$/g.test(
      url,
    );
  },
  fill: (_, profile) => {
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
