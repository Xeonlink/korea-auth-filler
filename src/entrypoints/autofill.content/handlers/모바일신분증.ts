import type { Handler } from "@/utils/type";
import { q } from "@/utils/utils";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * 2. 홈택스 모바일 신분증
 */
export const 모바일신분증1: Handler = {
  isMatch: (_) => {
    return q(".mid-crtfc #contents") !== null;
  },
  fill: async (page, profile) => {
    await page.input("input[name='name']").fill(profile.이름);
    await page.input("input[name='telno']").fill(profile.전화번호.전체);
    await page.input("#allAgree").check();
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
  fill: async (page, profile) => {
    await page.input(`input[data-id="name"]`).fill(profile.이름);
    await page
      .input(`select[data-id="phone0"]`)
      .fill(profile.map.통신사("S", "K", "L", "S", "K", "L"));

    await page.input(`select[data-id="phone1"]`).fill(profile.전화번호.앞3자리);
    await page.input(`input[data-id="phone2"]`).fill(profile.전화번호.뒷8자리);
    await page.input("#totalAgree").check();
  },
};
