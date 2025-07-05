import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

/**
 * 테스트 사이트
 * 1. 서울시 로그인 : https://www.seoul.go.kr/member/userlogin/loginCheck.do
 */

// NICE평가정보
export const NICE평가정보1: Handler = {
  isMatch: (url) => {
    return [
      "https://nice.checkplus.co.kr/cert/main/menu",
      "https://nice.checkplus.co.kr/cert/mobileCert/main",
    ].some((t) => url.includes(t));
  },
  fill: (_, profile) => {
    const 통신사Input = q<HTMLInputElement>("input[name='selectMobileCo']");
    if (통신사Input) {
      통신사Input.value = profile.map.통신사(["", "SK", "KT", "LG", "SM", "KM", "LM"]);
      triggerEvent(통신사Input);
    }
    const 폼Form = q<HTMLFormElement>("#frm");
    if (폼Form) {
      폼Form.setAttribute("action", "/cert/mobileCert/method");
      폼Form.submit();
    }
  },
};

// NICE평가정보 - 인증방식
export const NICE평가정보2: Handler = {
  isMatch: (url) => {
    return url.includes("https://nice.checkplus.co.kr/cert/mobileCert/method");
  },
  fill: (_, profile) => {
    const 동의Input = q<HTMLInputElement>("input[name='mobileCertAgree']");
    if (동의Input) {
      동의Input.checked = true;
      triggerEvent(동의Input);
    }

    const 폼Form = q<HTMLFormElement>("#frm");
    if (폼Form) {
      폼Form.setAttribute(
        "action",
        `/cert/mobileCert/${profile.map.인증방식(["", "sms", "push", "qr"])}/certification`,
      );
      폼Form.submit();
    }
  },
};

// NICE평가정보 - SMS인증
export const NICE평가정보3: Handler = {
  isMatch: (url) => {
    return ["https://nice.checkplus.co.kr/cert/mobileCert/sms/certification"].some((t) =>
      url.includes(t),
    );
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>("#userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 제출버튼 = q<HTMLButtonElement>("#btnSubmit");
    if (제출버튼) {
      제출버튼.click();
    }

    const 주민번호앞자리Input = q<HTMLInputElement>("#myNum1");
    if (주민번호앞자리Input) {
      주민번호앞자리Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞자리Input);
    }

    const 주민번호뒷자리Input = q<HTMLInputElement>("#myNum2");
    if (주민번호뒷자리Input) {
      주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒷자리Input);
    }

    const 전화번호Input = q<HTMLInputElement>("#mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 보안문자Input = q<HTMLInputElement>("#captchaAnswer");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};

// NICE평가정보 - PASS 인증
export const NICE평가정보4: Handler = {
  isMatch: (url) => {
    return ["https://nice.checkplus.co.kr/cert/mobileCert/push/certification"].some((t) =>
      url.includes(t),
    );
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>("#userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 제출버튼 = q<HTMLButtonElement>(".btn_pass.btnUserName");
    if (제출버튼) {
      제출버튼.click();
    }

    const 전화번호Input = q<HTMLInputElement>("#mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 주민번호앞자리Input = q<HTMLInputElement>("#myNum1");
    if (주민번호앞자리Input) {
      주민번호앞자리Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞자리Input);
    }

    const 주민번호뒷자리Input = q<HTMLInputElement>("#myNum2");
    if (주민번호뒷자리Input) {
      주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒷자리Input);
    }

    const 보안문자Input = q<HTMLInputElement>("#captchaAnswer");
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
