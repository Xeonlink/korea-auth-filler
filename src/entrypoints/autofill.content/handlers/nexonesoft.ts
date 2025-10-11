import { defineHandler } from ".";
import type { IProfile } from "@/utils/type";
import { debounce } from "@/utils/utils";
import { Page } from "@/utils/Page";

/**
 * 테스트 사이트
 * - 대한민국 국회 회원가입 민간인증서 : https://member.assembly.go.kr/member/join/joinSelectPage.do
 */
defineHandler("nexonesoft", {
  isMatch: (page) => {
    return page.q(`#dsh-root form.ns-step2`).element !== null;
  },
  fill: async (page, profile, _options) => {
    const dshRoot = page.q("#dsh-root").element;
    if (!dshRoot) return;

    const observer = new MutationObserver(
      debounce((_) => {
        if (page.q("#dsh-root form.ns-step2").element != null) {
          fill인증요청View(page, profile);
        }
      }, 100),
    );

    observer.observe(dshRoot, {
      childList: true,
      subtree: true,
    });

    await fill인증요청View(page, profile);
  },
});

async function fill인증요청View(page: Page, profile: IProfile) {
  await page.input("#name").fill(profile.이름);
  await page.input("#birthday").fill(profile.생년월일);
  await page.input("#phone").fill(profile.전화번호.전체);
  await page.input("#allPolicy").check();
}
