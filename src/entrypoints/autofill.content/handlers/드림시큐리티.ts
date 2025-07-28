import type { Handler, IProfile } from "@/utils/type";
import { getDataUrl, triggerEvent, waitForDataUrlChange, q, waitForVisible } from "@/utils/utils";
import { solveCaptch } from "@/utils/captcha";

/**
 * 테스트 주소
 * 1. mock : https://cert.mobile-ok.com/ptb_mokauth.html
 * 2. h.point 회원가입 : https://www.h-point.co.kr/cu/join/start.nhd
 * 3. make# 회원가입 : https://www.makeshop.co.kr/newmakeshop/home/create_shop.html
 */

// 드림시큐리티
export const 드림시큐리티: Handler = {
  isMatch: (url) => {
    return url.includes("https://cert.mobile-ok.com/ptb_mokauth.html");
  },
  fill: async (_, profile) => {
    await fill통신사선택View(profile);
    await fill인증방식선택View(profile);

    if (profile.인증방식.SMS) {
      await fillSMSView(profile);
      return;
    }
    if (profile.인증방식.PASS) {
      await fillPASSView(profile);
      return;
    }
  },
};

/**
 * 통신사 선택
 * @param _
 * @param profile
 */
async function fill통신사선택View(profile: IProfile) {
  const 통신사Button = q<HTMLButtonElement>(
    `button[data-telco="${profile.map.통신사("skt", "kt", "lgu", "skt", "kt", "lgu")}"][data-mvno="${!profile.통신3사}"]`,
  );
  if (통신사Button) {
    await waitForVisible(통신사Button);
    통신사Button.click();
  }
}

/**
 * 인증방식 선택
 * @param _
 * @param profile
 */
async function fill인증방식선택View(profile: IProfile) {
  const 인증방식Button = q<HTMLButtonElement>(
    `li[data-sign="${profile.map.인증방식(["", "sms", "pass", "qr"])}"] > button`,
  );
  if (인증방식Button) {
    await waitForVisible(인증방식Button);
    인증방식Button.click();
  }

  const 이용동의Checkbox = q<HTMLInputElement>(`#user_agree_checkbox`);
  if (이용동의Checkbox) {
    await waitForVisible(이용동의Checkbox);
    이용동의Checkbox.click();
  }

  const 인증다음Button = q<HTMLButtonElement>(`button.btn_selsign`);
  if (인증다음Button) {
    await waitForVisible(인증다음Button);
    인증다음Button.click();
  }
}

/**
 * SMS 인증 화면 채우기
 * @param _
 * @param profile
 */
async function fillSMSView(profile: IProfile) {
  const 이름Input = q<HTMLInputElement>(`#userName_sms`);
  if (이름Input) {
    await waitForVisible(이름Input);
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 이름다음Button = q<HTMLButtonElement>(`button.btnUserName_sms`);
  if (이름다음Button) {
    await waitForVisible(이름다음Button);
    이름다음Button.click();
  }

  const 주민번호앞자리Input = q<HTMLInputElement>(`#myNum1`);
  if (주민번호앞자리Input) {
    await waitForVisible(주민번호앞자리Input);
    주민번호앞자리Input.value = profile.주민번호.앞자리;
    triggerEvent(주민번호앞자리Input);
  }

  const 주민번호뒷자리Input = q<HTMLInputElement>(`#myNum2`);
  if (주민번호뒷자리Input) {
    await waitForVisible(주민번호뒷자리Input);
    주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
    triggerEvent(주민번호뒷자리Input);
  }

  const 전화번호Input = q<HTMLInputElement>(`#mobileNo_sms`);
  if (전화번호Input) {
    await waitForVisible(전화번호Input);
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Image = q<HTMLImageElement>(`#sms_01 #simpleCaptchaImg`);
  const 보안문자ReloadButton = q<HTMLButtonElement>(`#sms_01 #btnSimpleCaptchaReload`);
  if (보안문자Image && 보안문자ReloadButton) {
    const old_b64 = getDataUrl(보안문자Image);
    await waitForVisible(보안문자ReloadButton);
    보안문자ReloadButton.click();
    await waitForDataUrlChange(보안문자Image, old_b64);

    const captchaText = await solveCaptch("/captcha/dream.onnx", 보안문자Image);
    const 보안문자Input = q<HTMLInputElement>(`#secureNo_sms`);
    if (captchaText && 보안문자Input) {
      await waitForVisible(보안문자Input);
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = q<HTMLButtonElement>(`#sms_01 button.btnSubmit`);
  if (확인Button) {
    확인Button.click();
  }
}

/**
 * PASS 인증 화면 채우기
 * @param _
 * @param profile
 */
async function fillPASSView(profile: IProfile) {
  const 이름Input = q<HTMLInputElement>(`#userName_pass`);
  if (이름Input) {
    await waitForVisible(이름Input);
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 이름다음Button = q<HTMLButtonElement>(`button.btnUserName_pass`);
  if (이름다음Button) {
    await waitForVisible(이름다음Button);
    이름다음Button.click();
  }

  const 전화번호Input = q<HTMLInputElement>(`#mobileNo_pass`);
  if (전화번호Input) {
    await waitForVisible(전화번호Input);
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Image = q<HTMLImageElement>(`#pass_01 #simpleCaptchaImg`);
  const 보안문자ReloadButton = q<HTMLButtonElement>(`#pass_01 #btnSimpleCaptchaReload`);
  if (보안문자Image && 보안문자ReloadButton) {
    const old_b64 = getDataUrl(보안문자Image);
    await waitForVisible(보안문자ReloadButton);
    보안문자ReloadButton.click();
    await waitForDataUrlChange(보안문자Image, old_b64);

    const captchaText = await solveCaptch("/captcha/dream.onnx", 보안문자Image);
    const 보안문자Input = q<HTMLInputElement>(`#secureNo_pass`);
    if (captchaText && 보안문자Input) {
      await waitForVisible(보안문자Input);
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = q<HTMLButtonElement>(`#pass_01 button.btnSubmit`);
  if (확인Button) {
    확인Button.click();
  }
}
