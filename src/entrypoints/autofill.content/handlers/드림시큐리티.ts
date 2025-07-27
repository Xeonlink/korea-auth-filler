import type { Handler, IProfile } from "@/utils/type";
import type { Page } from "@/utils/Page";
import { getDataUrl, triggerEvent, waitForDataUrlChange } from "@/utils/utils";
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
  fill: async (page, profile) => {
    await fill통신사선택View(page, profile);
    await fill인증방식선택View(page, profile);

    if (profile.인증방식.SMS) {
      await fillSMSView(page, profile);
      return;
    }
    if (profile.인증방식.PASS) {
      await fillPASSView(page, profile);
      return;
    }
  },
};

/**
 * 통신사 선택
 * @param _
 * @param profile
 */
async function fill통신사선택View(page: Page, profile: IProfile) {
  const 통신사Button = await page.q<HTMLButtonElement>(
    `button[data-telco="${profile.map.통신사("skt", "kt", "lgu", "skt", "kt", "lgu")}"][data-mvno="${!profile.통신3사}"]`,
  );
  if (통신사Button) {
    통신사Button.click();
  }
}

/**
 * 인증방식 선택
 * @param _
 * @param profile
 */
async function fill인증방식선택View(page: Page, profile: IProfile) {
  const 인증방식Button = await page.q<HTMLButtonElement>(
    `li[data-sign="${profile.map.인증방식(["", "sms", "pass", "qr"])}"] > button`,
  );
  if (인증방식Button) {
    인증방식Button.click();
  }

  const 이용동의Checkbox = await page.q<HTMLInputElement>(`#user_agree_checkbox`);
  if (이용동의Checkbox) {
    이용동의Checkbox.click();
  }

  const 인증다음Button = await page.q<HTMLButtonElement>(`button.btn_selsign`);
  if (인증다음Button) {
    인증다음Button.click();
  }
}

/**
 * SMS 인증 화면 채우기
 * @param _
 * @param profile
 */
async function fillSMSView(page: Page, profile: IProfile) {
  const 이름Input = await page.q<HTMLInputElement>(`#userName_sms`);
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 이름다음Button = await page.q<HTMLButtonElement>(`button.btnUserName_sms`);
  if (이름다음Button) {
    이름다음Button.click();
  }

  const 주민번호앞자리Input = await page.q<HTMLInputElement>(`#myNum1`);
  if (주민번호앞자리Input) {
    주민번호앞자리Input.value = profile.주민번호.앞자리;
    triggerEvent(주민번호앞자리Input);
  }

  const 주민번호뒷자리Input = await page.q<HTMLInputElement>(`#myNum2`);
  if (주민번호뒷자리Input) {
    주민번호뒷자리Input.value = profile.주민번호.성별숫자 ?? "";
    triggerEvent(주민번호뒷자리Input);
  }

  const 전화번호Input = await page.q<HTMLInputElement>(`#mobileNo_sms`);
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Image = await page.q<HTMLImageElement>(`#sms_01 #simpleCaptchaImg`);
  const 보안문자ReloadButton = await page.q<HTMLButtonElement>(`#sms_01 #btnSimpleCaptchaReload`);
  if (보안문자Image && 보안문자ReloadButton) {
    const old_b64 = getDataUrl(보안문자Image);
    보안문자ReloadButton.click();
    await waitForDataUrlChange(보안문자Image, old_b64);

    const captchaText = await solveCaptch("/captcha/dream.onnx", 보안문자Image);
    const 보안문자Input = await page.q<HTMLInputElement>(`#secureNo_sms`);
    if (captchaText && 보안문자Input) {
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = await page.q<HTMLButtonElement>(`#sms_01 button.btnSubmit`);
  if (확인Button) {
    확인Button.click();
  }
}

/**
 * PASS 인증 화면 채우기
 * @param _
 * @param profile
 */
async function fillPASSView(page: Page, profile: IProfile) {
  const 이름Input = await page.q<HTMLInputElement>(`#userName_pass`);
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 이름다음Button = await page.q<HTMLButtonElement>(`button.btnUserName_pass`);
  if (이름다음Button) {
    이름다음Button.click();
  }

  const 전화번호Input = await page.q<HTMLInputElement>(`#mobileNo_pass`);
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 보안문자Image = await page.q<HTMLImageElement>(`#pass_01 #simpleCaptchaImg`);
  const 보안문자ReloadButton = await page.q<HTMLButtonElement>(`#pass_01 #btnSimpleCaptchaReload`);
  if (보안문자Image && 보안문자ReloadButton) {
    const old_b64 = getDataUrl(보안문자Image);
    보안문자ReloadButton.click();
    await waitForDataUrlChange(보안문자Image, old_b64);

    const captchaText = await solveCaptch("/captcha/dream.onnx", 보안문자Image);
    const 보안문자Input = await page.q<HTMLInputElement>(`#secureNo_pass`);
    if (captchaText && 보안문자Input) {
      보안문자Input.value = captchaText;
      triggerEvent(보안문자Input);
    }
  }

  const 확인Button = await page.q<HTMLButtonElement>(`#pass_01 button.btnSubmit`);
  if (확인Button) {
    확인Button.click();
  }
}
