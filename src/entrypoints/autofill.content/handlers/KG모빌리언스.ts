import type { Handler, IProfile } from "@/utils/type";
import { triggerEvent, q, waitForVisible, waitForImageLoad, waitFor } from "@/utils/utils";
import { solveCaptch } from "@/utils/captcha";

/**
 * 테스트 주소
 * - 야놀자 회원가입 : https://accounts.yanolja.com/?service=yanolja
 */

export const KG모빌리언스: Handler = {
  isMatch: (url) => {
    return url.includes("https://auth.mobilians.co.kr/goCashMain.mcash");
  },
  fill: async (_, profile) => {
    await fillStartView(profile);

    if (profile.인증방식.PASS) {
      const PASS로인증Button = q<HTMLButtonElement>("button.btnSubmit");
      if (PASS로인증Button) {
        await waitForVisible(PASS로인증Button);
        PASS로인증Button.click();
      }
      await fillPASSView(profile);
    }
    if (profile.인증방식.SMS || profile.인증방식.QR) {
      const SMS로인증Button = q<HTMLButtonElement>("button.btnSms");
      if (SMS로인증Button) {
        await waitForVisible(SMS로인증Button);
        SMS로인증Button.click();
      }
      await fillSMSView(profile);
    }

    const PASS로인증Anchor = q<HTMLAnchorElement>(`#qr_auth`);
    if (PASS로인증Anchor) {
      await waitForVisible(PASS로인증Anchor);
      PASS로인증Anchor.addEventListener("click", async () => {
        await fillPASSView(profile);
      });
    }

    const SMS로인증Anchor = q<HTMLAnchorElement>(`#sms_auth`);
    if (SMS로인증Anchor) {
      await waitForVisible(SMS로인증Anchor);
      SMS로인증Anchor.addEventListener("click", async () => {
        await fillSMSView(profile);
      });
    }
  },
};

async function fillStartView(profile: IProfile) {
  if (!profile.통신3사) {
    const MVNOLabel = q<HTMLLabelElement>(`label[for="agency-and"]`);
    if (MVNOLabel) {
      await waitForVisible(MVNOLabel);
      MVNOLabel.click();
    }
  }

  const 통신사Label = q<HTMLLabelElement>(
    `label[for="agency-${profile.통신3사 ? "" : "popup-"}${profile.map.통신사("sk", "kt", "lgu", "sk", "kt", "lgu")}"]`,
  );
  if (통신사Label) {
    await waitForVisible(통신사Label);
    통신사Label.click();
  }

  if (!profile.통신3사) {
    const MVNO통신사선택Button = q<HTMLButtonElement>(`#mvnoConfirmBtn`);
    if (MVNO통신사선택Button) {
      await waitForVisible(MVNO통신사선택Button);
      MVNO통신사선택Button.click();
    }
  }

  const 전체동의Checkbox = q<HTMLInputElement>(`#agree_all`);
  if (전체동의Checkbox && !전체동의Checkbox.checked) {
    await waitForVisible(전체동의Checkbox);
    전체동의Checkbox.click();
  }
}

async function fillPASSView(profile: IProfile) {
  const 이름Input = q<HTMLInputElement>(`#pushName`);
  if (이름Input) {
    이름Input.value = profile.이름;
    await waitForVisible(이름Input);
    triggerEvent(이름Input);
  }

  const 전화번호Input = q<HTMLInputElement>(`#pushPhone`);
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    await waitForVisible(전화번호Input);
    triggerEvent(전화번호Input);
  }

  await waitFor(() => q<HTMLImageElement>(`#captcha_number img`) !== null);
  const 보안문자Image = q<HTMLImageElement>(`#captcha_number img`);
  if (보안문자Image) {
    await waitForImageLoad(보안문자Image);

    const captchaText = await solveCaptch("/captcha/kgmobilians.onnx", 보안문자Image);
    const 보안문자Input = q<HTMLInputElement>(`#pushCaptchaCfm`);
    if (captchaText && 보안문자Input) {
      await waitForVisible(보안문자Input);
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = q<HTMLButtonElement>(`#pushBtn`);
  if (확인Button) {
    확인Button.focus();
  }
}

async function fillSMSView(profile: IProfile) {
  const 이름Input = q<HTMLInputElement>(`#smsName`);
  if (이름Input) {
    await waitForVisible(이름Input);
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 주민번호앞자리Input = q<HTMLInputElement>(`#birthYMD`);
  if (주민번호앞자리Input) {
    await waitForVisible(주민번호앞자리Input);
    주민번호앞자리Input.value = profile.주민번호.앞자리;
    triggerEvent(주민번호앞자리Input);
  }

  const 주민번호뒷자리Input = q<HTMLInputElement>(`#birthSF`);
  if (주민번호뒷자리Input) {
    await waitForVisible(주민번호뒷자리Input);
    주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
    triggerEvent(주민번호뒷자리Input);
  }

  const 전화번호Input = q<HTMLInputElement>(`#smsPhone`);
  if (전화번호Input) {
    await waitForVisible(전화번호Input);
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  await waitFor(() => q<HTMLImageElement>(`#captcha_number2 img`) !== null);
  const 보안문자Image = q<HTMLImageElement>(`#captcha_number2 img`);
  if (보안문자Image) {
    await waitForImageLoad(보안문자Image);

    const captchaText = await solveCaptch("/captcha/kgmobilians.onnx", 보안문자Image);
    const 보안문자Input = q<HTMLInputElement>(`#smsCaptchaCfm`);
    if (captchaText && 보안문자Input) {
      await waitForVisible(보안문자Input);
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = q<HTMLButtonElement>(`#smsBtn`);
  if (확인Button) {
    확인Button.focus();
  }
}
