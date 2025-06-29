import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * 2. 홈택스 모바일 신분증
 * 3. 고용24 : https://www.work24.go.kr/mobileid/web/pcView
 */
export const 모바일신분증: Handler = {
  isMatch: (_) => {
    return q(".mid-crtfc #contents") !== null;
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>("input[name='name']");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 전화번호Input = q<HTMLInputElement>("input[name='telno']");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 전체동의Input = q<HTMLInputElement>("#allAgree");
    if (전체동의Input) {
      전체동의Input.checked = true;
      triggerEvent(전체동의Input);
    }
  },
};
