import type { Handler } from "@/utils/type";
import { q, triggerEvent } from "@/utils/utils";

/**
 * 금융인증서
 *
 * 테스트 사이트
 * - 강원도 금융인증서 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */
export const YESKEY: Handler = {
  isMatch: (url) => {
    return url.includes("yeskey.or.kr") && q("#__fincert_root__") !== null;
  },
  fill: async (_, profile) => {
    const 이름Input = q<HTMLInputElement>("#CLOUD_ID_1");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 전화번호Input = q<HTMLInputElement>("#CLOUD_ID_2");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 생년월일Input = q<HTMLInputElement>("#CLOUD_ID_3");
    if (생년월일Input) {
      생년월일Input.value = profile.생년월일;
      triggerEvent(생년월일Input);
    }
  },
};
