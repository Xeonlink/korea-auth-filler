import type { Handler, IProfile } from "@/utils/type";
import { Page } from "@/utils/Page";

const captchaMap = [
  ["55", "54", "57", "56", "51", "50", "53", "52", "5d", "5c"],
  ["5d", "5c", "5f", "5e", "59", "58", "5b", "5a", "55", "54"],
  ["55", "54", "57", "56", "51", "50", "53", "52", "5d", "5c"],
  ["49", "48", "4b", "4a", "4d", "4c", "4f", "4e", "41", "40"],
  ["5b", "5a", "59", "58", "5f", "5e", "5d", "5c", "53", "52"],
];

/**
 * 테스트 사이트
 * - YMB어학 본인인증으로 ID찾기 (새로고침하면 확률적으로 나옴) : https://member.ybmnet.co.kr/join/find_userid2.jsp
 * - 접속 코드 : danal.spec.ts 참고
 */

export const danal: Handler = {
  isMatch: (page) => {
    return page.url.href.startsWith("https://wauth.teledit.com/Danal/WebAuth/Web/Start.php");
  },
  fill: async (page, profile) => {
    await fillStartView(page, profile);

    if (profile.인증방식.PASS) {
      await page.button("#btnPass").visible().click();
      await fillPASSView(page, profile);
    }
    if (profile.인증방식.SMS || profile.인증방식.QR) {
      await page.button("#btnSms").visible().click();
      await fillSMSView(page, profile);
    }

    const PASS로인증Anchor = page.q(`#authTabPass`).visible();
    await PASS로인증Anchor.on("click", () => fillPASSView(page, profile));

    const SMS로인증Anchor = page.q(`#authTabSms`).visible();
    await SMS로인증Anchor.on("click", () => fillSMSView(page, profile));
  },
};

async function fillStartView(page: Page, profile: IProfile) {
  if (profile.통신3사) {
    const 통신사 = profile.map.통신사("sk", "kt", "lgu", "", "", "");
    await page.q(`label[for="agency-${통신사}"]`).exists().click();
  } else {
    await page.button("#agency-and").click();
    const 통신사 = profile.map.통신사("", "", "", "MVNO_SK", "MVNO_KTF", "MVNO_LGT");
    await page.q(`label[for="${통신사}"]`).exists().click();
    await page.button("#btnSelectMvno").click();
  }

  await page.input(`#agree_all`).visible().check();
}

async function fillPASSView(page: Page, profile: IProfile) {
  await page.input(`#push_username`).visible().fill(profile.이름);
  await page.input(`#push_mobileno`).visible().fill(profile.전화번호.전체);

  const captchaImage = await page.image(`#captcha`).loaded().run();
  const captchaText =
    new URL(captchaImage.element!.src).searchParams
      .get("data")
      ?.match(/^\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})$/)
      ?.slice(1)
      .map((v, i) => `${captchaMap[i].indexOf(v)}`)
      .join("") ?? "";
  await page.input(`#inputCaptcha`).fill(captchaText);

  await page.button(`#btnPushDeliver`).focus();
}

async function fillSMSView(page: Page, profile: IProfile) {
  await page.input(`#sms_username`).visible().fill(profile.이름);
  await page.input(`#sms_mynum1`).visible().fill(profile.주민번호.앞자리);
  await page.input(`#sms_mynum2`).visible().fill(profile.주민번호.성별숫자);
  await page.input(`#sms_mobileno`).visible().fill(profile.전화번호.전체);

  const captchaImage = await page.image(`#captcha`).loaded().run();
  const captchaText =
    new URL(captchaImage.element!.src).searchParams
      .get("data")
      ?.match(/^\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})\w{4}(\w{2})$/)
      ?.slice(1)
      .map((v, i) => `${captchaMap[i].indexOf(v)}`)
      .join("") ?? "";
  await page.input(`#inputCaptcha`).fill(captchaText);

  await page.button(`#btnSmsDeliver`).focus();
}
