import type { Handler, IProfile } from "../../type";
import { q } from "../../utils";

export const oacx: Handler = {
  isMatch: (_) => {
    return q("#oacxDiv") !== null;
  },
  fill: (profile) => {
    setInterval(() => {
      const 이름Input = q<HTMLInputElement>("input[data-id='oacx_name']");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 생년월일Input = q<HTMLInputElement>("input[data-id='oacx_birth']");
      if (생년월일Input) {
        생년월일Input.value = profile.생년월일;
      }

      const 주민번호앞Input = q<HTMLInputElement>("input[data-id='oacx_num1']");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
      }

      const 주민번호뒤Input = q<HTMLInputElement>("input[data-id='oacx_num2']");
      if (주민번호뒤Input) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      }

      const 전화번호앞Input = q<HTMLInputElement>("input[data-id='oacx_phone1']");
      if (전화번호앞Input) {
        전화번호앞Input.value = profile.전화번호.앞3자리;
      }

      const 전화번호뒤Input = q<HTMLInputElement>("input[data-id='oacx_phone2']");
      if (전화번호뒤Input) {
        전화번호뒤Input.value = profile.전화번호.뒷8자리;
      }

      const 통신사Input = q<HTMLInputElement>("input[data-id='oacx_phone']");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
      }

      const 인증방법Input = q<HTMLInputElement>("input[data-id='oacx_auth']");
      if (인증방법Input) {
        인증방법Input.value = profile.map.인증방식(["", "SMS", "EMAIL"]);
      }

      const 전체동의Input = q<HTMLInputElement>("#totalAgree");
      if (전체동의Input) {
        전체동의Input.checked = true;
      }

      const 약관동의Input = q<HTMLInputElement>("#oacx_total");
      if (약관동의Input && !약관동의Input.checked) {
        약관동의Input.click();
      }

      const 정책동의Input = q<HTMLInputElement>("#policy4");
      if (정책동의Input && !정책동의Input.checked) {
        정책동의Input.click();
      }
    }, 500);
  },
};
