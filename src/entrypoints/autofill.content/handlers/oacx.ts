import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 홈택스 로그인
 * 2. 한전ON : https://online.kepco.co.kr/
 * 3. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * 4. 예비군 : https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do
 */
export const oacx: Handler = {
  isMatch: (_) => {
    return q("#oacxDiv") !== null;
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const 이름Input = q<HTMLInputElement>("input[data-id='oacx_name']");
      if (이름Input) {
        이름Input.value = profile.이름;
        dispatchEvent(이름Input);
      }

      const 생년월일Input = q<HTMLInputElement>("input[data-id='oacx_birth']");
      if (생년월일Input) {
        생년월일Input.value = profile.생년월일;
        dispatchEvent(생년월일Input);
      }

      const 주민번호앞Input = q<HTMLInputElement>("input[data-id='oacx_num1']");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
        dispatchEvent(주민번호앞Input);
      }

      const 주민번호뒤Input = q<HTMLInputElement>("input[data-id='oacx_num2']");
      if (주민번호뒤Input && 주민번호뒤Input.maxLength < 1) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
        dispatchEvent(주민번호뒤Input);
      }

      const 통신사Select = q<HTMLSelectElement>("select[data-id='oacx_phone0']");
      if (통신사Select) {
        통신사Select.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
        dispatchEvent(통신사Select);
      }

      const 전화번호앞Input = q<HTMLInputElement>("input[data-id='oacx_phone1']");
      if (전화번호앞Input) {
        전화번호앞Input.value = profile.전화번호.앞3자리;
        dispatchEvent(전화번호앞Input);
      }

      const 전화번호Input = q<HTMLInputElement>("input[data-id='oacx_phone2']");
      if (전화번호Input) {
        const start = profile.전화번호.전체.length - 전화번호Input.maxLength;
        전화번호Input.value = profile.전화번호.전체.slice(start < 0 ? 0 : start);
        dispatchEvent(전화번호Input);
      }

      const 통신사Input = q<HTMLInputElement>("input[data-id='oacx_phone']");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
        dispatchEvent(통신사Input);
      }

      const 인증방법Input = q<HTMLInputElement>("input[data-id='oacx_auth']");
      if (인증방법Input) {
        인증방법Input.value = profile.map.인증방식(["", "SMS", "EMAIL"]);
        dispatchEvent(인증방법Input);
      }

      const 전체동의Input = q<HTMLInputElement>("#totalAgree");
      if (전체동의Input) {
        전체동의Input.checked = true;
        dispatchEvent(전체동의Input);
      }

      const 약관동의Input = q<HTMLInputElement>("#oacx_total");
      if (약관동의Input) {
        약관동의Input.checked = true;
        dispatchEvent(약관동의Input);
      }

      const 개인정보동의Input = q<HTMLInputElement>("#privacy");
      if (개인정보동의Input) {
        개인정보동의Input.checked = true;
        dispatchEvent(개인정보동의Input);
      }

      const 정책3동의Input = q<HTMLInputElement>("#policy3");
      if (정책3동의Input) {
        정책3동의Input.checked = true;
        dispatchEvent(정책3동의Input);
      }

      const 정책4동의Input = q<HTMLInputElement>("#policy4");
      if (정책4동의Input) {
        정책4동의Input.checked = true;
        dispatchEvent(정책4동의Input);
      }

      const oacxPolicy1Input = q<HTMLInputElement>("#oacx_policy1");
      if (oacxPolicy1Input) {
        oacxPolicy1Input.checked = true;
        dispatchEvent(oacxPolicy1Input);
      }

      const oacxPolicy2Input = q<HTMLInputElement>("#oacx_policy2");
      if (oacxPolicy2Input) {
        oacxPolicy2Input.checked = true;
        dispatchEvent(oacxPolicy2Input);
      }

      const oacxPolicy3Input = q<HTMLInputElement>("#oacx_policy3");
      if (oacxPolicy3Input) {
        oacxPolicy3Input.checked = true;
        dispatchEvent(oacxPolicy3Input);
      }

      const oacxPolicy4Input = q<HTMLInputElement>("#oacx_policy4");
      if (oacxPolicy4Input) {
        oacxPolicy4Input.checked = true;
        dispatchEvent(oacxPolicy4Input);
      }
    }, 500);
  },
};
