import type { Handler, IProfile } from "@/utils/type";
import { qAll } from "@/utils/utils";
import { Page } from "@/utils/Page";

/**
 * 테스트 사이트
 * - 대한민국 국회 회원가입 : https://member.assembly.go.kr/member/join/joinSelectPage.do
 */
export const nexonesoft: Handler = {
  isMatch: (page) => {
    return page.q(`#dsh-root form.ns-step1`).element !== null;
  },
  fill: async (page, profile) => {
    await ready인증주체View(page, profile);
  },
};

async function ready인증주체View(page: Page, profile: IProfile) {
  const 인증주체Anchor = qAll<HTMLAnchorElement>("#dsh-root .ns-provider a");

  for (const anchor of 인증주체Anchor) {
    anchor.addEventListener("click", async () => {
      await page.q(`#dsh-root form.ns-step2`).exists().run();
      await fill인증요청View(page, profile);
    });
  }
}

async function fill인증요청View(page: Page, profile: IProfile) {
  await page.input("#name").fill(profile.이름);
  await page.input("#birthday").fill(profile.생년월일);
  await page.input("#phone").fill(profile.전화번호.전체);
  await page.input("#allPolicy").check();

  // ---------------------------------
  await page.q(`#dsh-root button.ns-pre`).on("click", async () => {
    await page.q(`#dsh-root form.ns-step1`).exists().run();
    await ready인증주체View(page, profile);
  });
}
