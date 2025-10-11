import type { IProfile } from "@/utils/type";
import { debounce, qAll, triggerEvent, waitUntilDomIdle } from "@/utils/utils";
import { defineHandler } from ".";

/**
 * **일반 테스트 주소**
 * - 홈택스 간편인증
 * - 한전ON : https://online.kepco.co.kr/
 * - 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * - 1365자원봉사포털 : https://www.1365.go.kr/vols/cmmn/oacx/popup.do
 * - 숲나들e : https://www.foresttrip.go.kr/com/login.do
 * - 서울특별시 평생교육원 : https://www.lllcard.kr/reg/seoul/main/crtfctPage.do
 *
 * **legacy 테스트 주소**
 * - 예비군 : https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do
 * - 특허로 : https://www.patent.go.kr/smart/LoginForm.do
 *
 * **Raon 테스트 주소** \
 * Raon에서 제공하는 oacx는 어떤 걸로 인증할지 선택하지 않으면, 각종 약관동의를 눌렀을 때, 인증서를 먼저 선택하라는 팝업이 뜸.
 * - 서울시 민간인증서 : https://www.seoul.go.kr/member/userlogin/loginCheck.do
 * - 삼성서울병원 민간인증서 : https://www.samsunghospital.com/home/member/login.do
 */
defineHandler("oacx", {
  isMatch: (page) => {
    return page.q("#oacxDiv #oacxEmbededContents").element !== null;
  },
  fill: async (page, profile, options) => {
    const oacxDiv = page.q("#oacxDiv").element;
    if (!oacxDiv) return;

    const preferredProviders = options?.preferences || [];

    const observer = new MutationObserver(
      debounce((_) => {
        console.log("debounced");
        if (page.q("#oacxDiv #oacxEmbededContents").element != null) {
          beforeFill(profile, preferredProviders);
        }
      }, 100),
    );

    observer.observe(oacxDiv, {
      childList: true,
      subtree: true,
    });

    beforeFill(profile, preferredProviders);
  },
});

function beforeFill(profile: IProfile, preferredProviders: string[]) {
  let 인증주체Lis: HTMLLIElement[] = [];

  // 대부분의 경우 .provider-list 를 사용함
  if (인증주체Lis.length === 0) {
    인증주체Lis = qAll<HTMLLIElement>("#oacxDiv .provider-list li");
  }
  // 예비군, 숲나들e 홈페이지에서는 ul.oacx_providerList 를 사용함
  if (인증주체Lis.length === 0) {
    인증주체Lis = qAll<HTMLLIElement>("#oacxDiv .oacx_providerList li");
  }

  for (const 인증주체Li of 인증주체Lis) {
    인증주체Li.addEventListener("click", () => {
      waitUntilDomIdle(() => fill(profile), 100);
    });
  }

  // Try to find and click preferred provider
  if (preferredProviders.length > 0) {
    for (const preferredProvider of preferredProviders) {
      const normalizedPreference = preferredProvider.toLowerCase().trim();

      for (const 인증주체Li of 인증주체Lis) {
        const providerText = 인증주체Li.textContent?.toLowerCase().trim() || "";
        const providerTitle = 인증주체Li.title?.toLowerCase().trim() || "";

        if (
          providerText.includes(normalizedPreference) ||
          providerTitle.includes(normalizedPreference)
        ) {
          인증주체Li.click();
          return;
        }
      }
    }
  }

  // Fallback to first available provider if no preferred provider matched
  for (const 인증주체Li of 인증주체Lis) {
    if (인증주체Li.click) {
      인증주체Li.click();
      return;
    }
  }
}

function fill(profile: IProfile) {
  /**
   * 중간중간 qAll인 이유는, 예비군 홈페이지처럼 오래된 oacx 페이지에서는 디바이스 사이즈에 따라 여러개의 인풋이 있을 수 있음.
   * 따라서 모든 인풋에 대해 처리하기 위해 qAll을 사용함.
   */

  const 이름Inputs = qAll<HTMLInputElement>("input[data-id='oacx_name']");
  for (const 이름Input of 이름Inputs) {
    if (!이름Input.readOnly) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }
  }

  const 생년월일Inputs = qAll<HTMLInputElement>("input[data-id='oacx_birth']");
  for (const 생년월일Input of 생년월일Inputs) {
    if (!생년월일Input.readOnly) {
      생년월일Input.value = profile.생년월일;
      triggerEvent(생년월일Input);
    }
  }

  const 주민번호앞Inputs = qAll<HTMLInputElement>("input[data-id='oacx_num1']");
  for (const 주민번호앞Input of 주민번호앞Inputs) {
    if (!주민번호앞Input.readOnly) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }
  }

  const 주민번호뒤Inputs = qAll<HTMLInputElement>("input[data-id='oacx_num2']");
  for (const 주민번호뒤Input of 주민번호뒤Inputs) {
    if (!주민번호뒤Input.readOnly) {
      주민번호뒤Input.value = profile.주민번호.성별숫자;
      triggerEvent(주민번호뒤Input);
    }
  }

  const 통신사Selects = qAll<HTMLSelectElement>("select[data-id='oacx_phone0']");
  for (const 통신사Select of 통신사Selects) {
    통신사Select.value = profile.map.통신사("S", "K", "L", "S", "K", "L");
    triggerEvent(통신사Select);
  }

  const 전화번호앞Inputs = qAll<HTMLInputElement>("input[data-id='oacx_phone1']");
  for (const 전화번호앞Input of 전화번호앞Inputs) {
    전화번호앞Input.value = profile.전화번호.앞3자리;
    triggerEvent(전화번호앞Input);
  }

  const 전화번호Inputs = qAll<HTMLInputElement>("input[data-id='oacx_phone2']");
  for (const 전화번호Input of 전화번호Inputs) {
    /**
     * MaxLength Attribute가 없거나 0보다 작을 경우, placeholder의 길이를 사용
     * ** 테스트 주소 **
     * - 예비군 : https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do
     */
    if (전화번호Input.maxLength < 0) {
      전화번호Input.setAttribute("maxlength", 전화번호Input.placeholder.length.toString());
    }
    const start = profile.전화번호.전체.length - 전화번호Input.maxLength;
    전화번호Input.value = profile.전화번호.전체.slice(start < 0 ? 0 : start);
    triggerEvent(전화번호Input);
  }

  const 전화번호2Inputs = qAll<HTMLInputElement>("input[data-id='oacx_phone3']");
  for (const 전화번호Input of 전화번호2Inputs) {
    /**
     * MaxLength Attribute가 없거나 0보다 작을 경우, placeholder의 길이를 사용
     * ** 테스트 주소 **
     * - 예비군 : https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do
     */
    if (전화번호Input.maxLength < 0) {
      전화번호Input.setAttribute("maxlength", 전화번호Input.placeholder.length.toString());
    }

    const start = profile.전화번호.전체.length - 전화번호Input.maxLength;
    전화번호Input.value = profile.전화번호.전체.slice(start < 0 ? 0 : start);
    triggerEvent(전화번호Input);
  }

  const 통신사Inputs = qAll<HTMLInputElement>("input[data-id='oacx_phone']");
  for (const 통신사Input of 통신사Inputs) {
    통신사Input.value = profile.map.통신사("S", "K", "L", "S", "K", "L");
    triggerEvent(통신사Input);
  }

  const 인증방법Inputs = qAll<HTMLInputElement>("input[data-id='oacx_auth']");
  for (const 인증방법Input of 인증방법Inputs) {
    인증방법Input.value = profile.map.인증방식(["", "SMS", "EMAIL"]);
    triggerEvent(인증방법Input);
  }

  const 서비스동의Inputs = qAll<HTMLInputElement>(`:is(.agree, .pcAgree) input[type="checkbox"]`);
  for (const 서비스동의Input of 서비스동의Inputs) {
    서비스동의Input.checked = true;
    triggerEvent(서비스동의Input);
  }
}
