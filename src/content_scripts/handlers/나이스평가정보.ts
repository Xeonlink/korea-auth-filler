import { Handler } from "../../type";
import { q } from "../../utils";

// 나이스 평가정보
export const 나이스평가정보1: Handler = {
  isMatch: (url) => {
    return [
      "https://nice.checkplus.co.kr/cert/main/menu",
      "https://nice.checkplus.co.kr/cert/mobileCert/main",
    ].some((t) => url.includes(t));
  },
  fill: (profile) => {
    setInterval(() => {
      const 통신사Button = q<HTMLButtonElement>(
        profile.map.통신사([
          "",
          "#telcomSK",
          "#telcomKT",
          "#telcomLG",
          "#telcomSM",
          "#telcomKM",
          "#telcomLM",
        ]),
      );
      if (통신사Button) {
        통신사Button.click();
      }
    }, 500);
  },
};

// 나이스 평가정보 - 인증방식
export const 나이스평가정보2: Handler = {
  isMatch: (url) => {
    return url.includes("https://nice.checkplus.co.kr/cert/mobileCert/method");
  },
  fill: (profile) => {
    setInterval(() => {
      const 인증방식Button = q<HTMLButtonElement>(
        profile.map.인증방식(["", "button[value=SMS]", "button[value=APP_PUSH]"]),
      );
      if (인증방식Button) {
        인증방식Button.click();
      }

      const 동의Checkbox = q<HTMLInputElement>("#mobileCertAgree");
      if (동의Checkbox && !동의Checkbox.checked) {
        동의Checkbox.click();
      }

      const 다음Button = q<HTMLButtonElement>("#btnMobileCertStart");
      if (다음Button) {
        다음Button.click();
      }
    }, 500);
  },
};

// 나이스 평가정보 - SMS인증
export const 나이스평가정보3: Handler = {
  isMatch: (url) => {
    return ["https://nice.checkplus.co.kr/cert/mobileCert/sms/certification"].some((t) =>
      url.includes(t),
    );
  },
  fill: (profile) => {
    setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#userName");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 제출버튼 = q<HTMLButtonElement>("#btnSubmit");
      if (제출버튼) {
        제출버튼.click();
      }

      const 전화번호Input = q<HTMLInputElement>("#mobileNo");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.전체;
      }

      const 주민번호앞자리Input = q<HTMLInputElement>("#myNum1");
      if (주민번호앞자리Input) {
        주민번호앞자리Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒷자리Input = q<HTMLInputElement>("#myNum2");
      if (주민번호뒷자리Input) {
        주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
      }
    }, 500);
  },
};

// 나이스 평가정보 - PASS 인증
export const 나이스평가정보4: Handler = {
  isMatch: (url) => {
    return ["https://nice.checkplus.co.kr/cert/mobileCert/push/certification"].some((t) =>
      url.includes(t),
    );
  },
  fill: (profile) => {
    setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#userName");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 제출버튼 = q<HTMLButtonElement>("#btnSubmit");
      if (제출버튼) {
        제출버튼.click();
      }

      const 전화번호Input = q<HTMLInputElement>("#mobileNo");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.전체;
      }

      const 주민번호앞자리Input = q<HTMLInputElement>("#myNum1");
      if (주민번호앞자리Input) {
        주민번호앞자리Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒷자리Input = q<HTMLInputElement>("#myNum2");
      if (주민번호뒷자리Input) {
        주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
      }
    }, 500);
  },
};
