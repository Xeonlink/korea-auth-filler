import type { Handler } from "@/utils/type";

/**
 * 금융인증서
 *
 * 테스트 사이트
 * - 강원도 금융인증서 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */
export const yeskey: Handler = {
  isMatch: (page) => {
    return page.url.href.startsWith("yeskey.or.kr") && page.q("#__fincert_root__").element !== null;
  },
  fill: async (page, profile) => {
    await page.input("#CLOUD_ID_1").visible().fill(profile.이름);
    await page.input("#CLOUD_ID_2").visible().fill(profile.전화번호.전체);
    await page.input("#CLOUD_ID_3").visible().fill(profile.생년월일);
  },
};
