import { Handler } from "@/utils/type";
import { q, triggerEvent } from "@/utils/utils";

/**
 * 테스트 사이트
 *
 * - 대한민국 국회 회원가입 : https://member.assembly.go.kr/member/join/joinSelectPage.do
 */
export const 넥스원소프트: Handler = {
  isMatch: (_) => {
    return q(`#dsh-root form.ns-step2`) !== null;
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>(`#name`);
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 생년월일Input = q<HTMLInputElement>(`#birthday`);
    if (생년월일Input) {
      생년월일Input.value = profile.생년월일;
      triggerEvent(생년월일Input);
    }

    const 전화번호Input = q<HTMLInputElement>(`#phone`);
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 전체동의Input = q<HTMLInputElement>(`#allPolicy`);
    if (전체동의Input && !전체동의Input.checked) {
      전체동의Input.click();
    }
  },
};
