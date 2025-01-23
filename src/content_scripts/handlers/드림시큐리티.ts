import { Handler } from "../../type";
import { q, way } from "../../utils";

export const 드림시큐리티: Handler = {
  isMatch: (url) => {
    return url.includes("https://cert.mobile-ok.com/ptb_mokauth.html?");
  },
  fill: (profile) => {
    setInterval(() => {
      const 통신사Button = q<HTMLButtonElement>(
        "#agency-" + profile.map.통신사(["", "sk", "kt", "lgu", "skmvno", "ktmvno", "lgumvno"]),
      );
      if (통신사Button) {
        통신사Button.click();
      }

      if (!profile.통신3사) {
        const 통신사Check = q<HTMLInputElement>("#checkMvno");
        if (통신사Check) {
          통신사Check.click();
        }
      }

      const 전체동의Check = q<HTMLInputElement>("#allchk");
      if (전체동의Check) {
        전체동의Check.click();
      }

      if (profile.인증방식 === way.SMS) {
        const 인증하기Button = q<HTMLButtonElement>("#smsstart");
        if (인증하기Button) {
          인증하기Button.click();
        }
      }

      if (profile.인증방식 === way.PASS) {
        const 인증하기Button = q<HTMLButtonElement>("#start");
        if (인증하기Button) {
          인증하기Button.click();
        }
      }

      const 이름Input = q<HTMLInputElement>("#common_step2 #name");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 전화번호Input = q<HTMLInputElement>("#common_step2 #phone");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.뒷8자리;
      }

      const 주민번호앞Input = q<HTMLInputElement>("#common_step3 #mynum1");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒤Input = q<HTMLInputElement>("#common_step3 #mynum2");
      if (주민번호뒤Input) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      }

      const 인증번호Input = q<HTMLInputElement>("#common_step3 #phone");
      if (인증번호Input) {
        인증번호Input.value = profile.전화번호.전체;
      }
    }, 500);
  },
};
