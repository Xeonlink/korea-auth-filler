import type { Handler, IProfile } from "@/utils/type";
import type { Page } from "@/utils/Page";
import { triggerEvent } from "@/utils/utils";

/**
 * 테스트 주소
 * - 야놀자 회원가입 : https://accounts.yanolja.com/?service=yanolja
 */

export const KG모빌리언스: Handler = {
  isMatch: (url) => {
    return url.includes("https://auth.mobilians.co.kr/goCashMain.mcash");
  },
  fill: async (page, profile) => {
    await fillStartView(page, profile);

    if (profile.인증방식.PASS) {
      const PASS로인증Button = await page.q<HTMLButtonElement>("button.btnSubmit");
      if (PASS로인증Button) {
        PASS로인증Button.click();
      }
      await fillPASSView(page, profile);
    }
    if (profile.인증방식.SMS || profile.인증방식.QR) {
      const SMS로인증Button = await page.q<HTMLButtonElement>("button.btnSms");
      if (SMS로인증Button) {
        SMS로인증Button.click();
      }
      await fillSMSView(page, profile);
    }

    const PASS로인증Anchor = await page.q<HTMLAnchorElement>(`#qr_auth`);
    if (PASS로인증Anchor) {
      PASS로인증Anchor.addEventListener("click", async () => {
        await fillPASSView(page, profile);
      });
    }

    const SMS로인증Anchor = await page.q<HTMLAnchorElement>(`#sms_auth`);
    if (SMS로인증Anchor) {
      SMS로인증Anchor.addEventListener("click", async () => {
        await fillSMSView(page, profile);
      });
    }
  },
};

/**
 * 시작 화면
 * @param page
 * @param profile
 */
async function fillStartView(page: Page, profile: IProfile) {
  if (!profile.통신3사) {
    const MVNOLabel = await page.q<HTMLLabelElement>(`label[for="agency-and"]`);
    if (MVNOLabel) {
      MVNOLabel.click();
    }
  }

  const 통신사Label = await page.q<HTMLLabelElement>(
    `label[for="agency-${profile.통신3사 ? "" : "popup-"}${profile.map.통신사("sk", "kt", "lgu", "sk", "kt", "lgu")}"]`,
  );
  if (통신사Label) {
    통신사Label.click();
  }

  if (!profile.통신3사) {
    const MVNO통신사선택Button = await page.q<HTMLButtonElement>(`#mvnoConfirmBtn`);
    if (MVNO통신사선택Button) {
      MVNO통신사선택Button.click();
    }
  }

  const 전체동의Checkbox = await page.q<HTMLInputElement>(`#agree_all`);
  if (전체동의Checkbox && !전체동의Checkbox.checked) {
    전체동의Checkbox.click();
  }
}

async function fillPASSView(page: Page, profile: IProfile) {
  const 이름Input = await page.q<HTMLInputElement>(`#pushName`);
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 전화번호Input = await page.q<HTMLInputElement>(`#pushPhone`);
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Input = await page.q<HTMLInputElement>(`#pushCaptchaCfm`);
  if (보안문자Input) {
    보안문자Input.focus();
  }
}

async function fillSMSView(page: Page, profile: IProfile) {
  const 이름Input = await page.q<HTMLInputElement>(`#smsName`);
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 주민번호앞자리Input = await page.q<HTMLInputElement>(`#birthYMD`);
  if (주민번호앞자리Input) {
    주민번호앞자리Input.value = profile.주민번호.앞자리;
    triggerEvent(주민번호앞자리Input);
  }

  const 주민번호뒷자리Input = await page.q<HTMLInputElement>(`#birthSF`);
  if (주민번호뒷자리Input) {
    주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
    triggerEvent(주민번호뒷자리Input);
  }

  const 전화번호Input = await page.q<HTMLInputElement>(`#smsPhone`);
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Input = await page.q<HTMLInputElement>(`#smsCaptchaCfm`);
  if (보안문자Input) {
    보안문자Input.focus();
  }
}
