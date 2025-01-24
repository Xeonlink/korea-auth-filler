import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */

export const 모바일신분증: Handler = {
  isMatch: (url) => {
    return url.includes("https://sp.epeople.go.kr/web/pcView");
  },
  fill: (ctx, profile) => {
    const 이름Input = q<HTMLInputElement>("input[name='name']");
    if (이름Input) {
      이름Input.value = profile.이름;
      dispatchEvent(이름Input);
    }

    const 전화번호Input = q<HTMLInputElement>("input[name='telno']");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      dispatchEvent(전화번호Input);
    }

    const 전체동의Input = q<HTMLInputElement>("#allAgree");
    if (전체동의Input) {
      전체동의Input.checked = true;
      dispatchEvent(전체동의Input);
    }

    const policy0Input = q<HTMLInputElement>("#svcUseStplatChk");
    if (policy0Input) {
      policy0Input.checked = true;
      dispatchEvent(policy0Input);
    }

    const policy1Input = q<HTMLInputElement>("#lndvdlInfoColctUseAgreChk");
    if (policy1Input) {
      policy1Input.checked = true;
      dispatchEvent(policy1Input);
    }

    const policy2Input = q<HTMLInputElement>("#lndvdlInfoThptyProvdAgreChk");
    if (policy2Input) {
      policy2Input.checked = true;
      dispatchEvent(policy2Input);
    }
  },
};
