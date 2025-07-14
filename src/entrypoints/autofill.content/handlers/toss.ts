import type { Handler, IProfile } from "@/utils/type";
import { triggerEvent, q, qAll, qById, waitUntilDomIdle } from "@/utils/utils";

/**
 * 테스트 주소
 * - 디지털원패스 : https://www.onepass.go.kr/membership/find/id
 */

export const toss: Handler = {
  isMatch: (url) => {
    return url.includes("https://auth.cert.toss.im/type-info");
  },
  fill: async (_, profile) => {
    const 탭Items = qAll<HTMLLIElement>(".tab__item");

    for (const 탭Item of 탭Items) {
      탭Item.addEventListener("click", () => {
        waitUntilDomIdle(() => fill(profile), 50);
      });
    }

    fill(profile);
  },
};

function fill(profile: IProfile) {
  const 이름Input = q<HTMLInputElement>("#text-field-line-1");
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 전화번호Input = q<HTMLInputElement>("#text-field-line-2");
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 생년월일Input = q<HTMLInputElement>("#text-field-line-3");
  if (생년월일Input) {
    생년월일Input.value = profile.생년월일.substring(2);
    triggerEvent(생년월일Input);
  }

  const 개인정보동의Input = qById<HTMLInputElement>("checkbox-circle-:r9:");
  if (개인정보동의Input) {
    개인정보동의Input.click();
  }
}
