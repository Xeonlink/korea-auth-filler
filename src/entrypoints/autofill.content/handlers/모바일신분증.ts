import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * 2. 홈택스 모바일 신분증
 */
export const 모바일신분증1: Handler = {
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

/**
 * 테스트 주소
 * 1. 고용24 -> 정부통합 로그인 -> 모바일신분증
 */
export const 모바일신분증2: Handler = {
  isMatch: (_) => {
    return q("#mipEmbededContents") !== null;
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>(`input[data-id="name"]`);
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 통신사Select = q<HTMLSelectElement>(`select[data-id="phone0"]`);
    if (통신사Select) {
      통신사Select.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
      triggerEvent(통신사Select);
    }

    const 전화번호앞자리Select = q<HTMLSelectElement>(`select[data-id="phone1"]`);
    if (전화번호앞자리Select) {
      전화번호앞자리Select.value = profile.전화번호.앞3자리;
      triggerEvent(전화번호앞자리Select);
    }

    const 전화번호뒷자리Input = q<HTMLInputElement>(`input[data-id="phone2"]`);
    if (전화번호뒷자리Input) {
      전화번호뒷자리Input.value = profile.전화번호.뒷8자리;
      triggerEvent(전화번호뒷자리Input);
    }

    const 전체동의Input = q<HTMLInputElement>("#totalAgree");
    if (전체동의Input) {
      전체동의Input.checked = true;
      triggerEvent(전체동의Input);
    }
  },
};
