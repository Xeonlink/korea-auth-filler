import type { Handler, IProfile } from "@/utils/type";
import { q, qAll, triggerEvent, waitForElement } from "@/utils/utils";

/**
 * 테스트 사이트
 *
 * - 대한민국 국회 회원가입 : https://member.assembly.go.kr/member/join/joinSelectPage.do
 */
export const 넥스원소프트: Handler = {
  isMatch: (_) => {
    return q(`#dsh-root form.ns-step1`) !== null;
  },
  fill: async (_, profile) => {
    await ready인증주체View(profile);
  },
};

async function ready인증주체View(profile: IProfile) {
  const 인증주체Anchor = qAll<HTMLAnchorElement>("#dsh-root .ns-provider a");

  for (const anchor of 인증주체Anchor) {
    anchor.addEventListener("click", async () => {
      await waitForElement(`#dsh-root form.ns-step2`);
      const 인증요청View = q<HTMLFormElement>(`#dsh-root form.ns-step2`);
      if (인증요청View) {
        await fill인증요청View(profile);
      }
    });
  }
}

async function fill인증요청View(profile: IProfile) {
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

  // ---------------------------------
  const 이전Button = q<HTMLButtonElement>(`#dsh-root button.ns-pre`);
  if (이전Button) {
    이전Button.addEventListener("click", async () => {
      await waitForElement(`#dsh-root form.ns-step1`);
      await ready인증주체View(profile);
    });
  }
}
