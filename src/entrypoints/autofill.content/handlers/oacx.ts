import type { Handler, IProfile } from "@/utils/type";
import { waitUntilDomIdle, triggerEvent, q, qAll } from "@/utils/utils";

/**
 * **일반 테스트 주소**
 * - 홈택스 간편인증
 * - 한전ON : https://online.kepco.co.kr/
 * - 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 * - 예비군 : https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do
 * - 국가평생교육진흥원 : https://oacx.cb.or.kr:8089/oacx/oacx.jsp
 * - 특허로 : https://www.patent.go.kr/smart/oacx.jsp
 * - 1365자원봉사포털 : https://www.1365.go.kr/vols/cmmn/oacx/popup.do
 * - 숲나들e : https://www.foresttrip.go.kr/com/login.do
 *
 * **Raon 테스트 주소** \
 * Raon에서 제공하는 oacx는 어떤 걸로 인증할지 선택하지 않으면, 각종 약관동의를 눌렀을 때, 인증서를 먼저 선택하라는 팝업이 뜸.
 * - 서울시 민간인증서 : https://www.seoul.go.kr/member/userlogin/loginCheck.do
 * - 삼성서울병원 민간인증서 : https://www.samsunghospital.com/home/member/login.do
 */
export const oacx: Handler = {
  isMatch: (_) => {
    return q("#oacxDiv #oacxEmbededContents") !== null;
  },
  fill: (_, profile) => {
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
        waitUntilDomIdle(() => fill(profile), 50);
      });
    }

    for (const 인증주체Li of 인증주체Lis) {
      if (인증주체Li.click) {
        인증주체Li.click();
        return;
      }
    }
  },
};

/**
 * 인증주체 선택 후 자동으로 호출되는 함수
 * @param profile 프로필 정보
 */
function fill(profile: IProfile) {
  /**
   * 중간중간 qAll인 이유는, 예비군 홈페이지처럼 오래된 oacx 페이지에서는 디바이스 사이즈에 따라 여러개의 인풋이 있을 수 있음.
   * 따라서 모든 인풋에 대해 처리하기 위해 qAll을 사용함.
   */

  const 이름Inputs = qAll<HTMLInputElement>("input[data-id='oacx_name']");
  for (const 이름Input of 이름Inputs) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 생년월일Inputs = qAll<HTMLInputElement>("input[data-id='oacx_birth']");
  for (const 생년월일Input of 생년월일Inputs) {
    생년월일Input.value = profile.생년월일;
    triggerEvent(생년월일Input);
  }

  const 주민번호앞Inputs = qAll<HTMLInputElement>("input[data-id='oacx_num1']");
  for (const 주민번호앞Input of 주민번호앞Inputs) {
    주민번호앞Input.value = profile.주민번호.앞자리;
    triggerEvent(주민번호앞Input);
  }

  const 주민번호뒤Inputs = qAll<HTMLInputElement>("input[data-id='oacx_num2']");
  for (const 주민번호뒤Input of 주민번호뒤Inputs) {
    주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
    triggerEvent(주민번호뒤Input);
  }

  const 통신사Selects = qAll<HTMLSelectElement>("select[data-id='oacx_phone0']");
  for (const 통신사Select of 통신사Selects) {
    통신사Select.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
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
     * maxLength Attribute가 없거나 0보다 작을 경우, placeholder의 길이를 사용
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
     * maxLength Attribute가 없거나 0보다 작을 경우, placeholder의 길이를 사용
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
    통신사Input.value = profile.map.통신사(["", "S", "K", "L", "S", "K", "L"]);
    triggerEvent(통신사Input);
  }

  const 인증방법Inputs = qAll<HTMLInputElement>("input[data-id='oacx_auth']");
  for (const 인증방법Input of 인증방법Inputs) {
    인증방법Input.value = profile.map.인증방식(["", "SMS", "EMAIL"]);
    triggerEvent(인증방법Input);
  }

  const 전체동의Input = q<HTMLInputElement>("#totalAgree");
  if (전체동의Input) {
    전체동의Input.checked = true;
    triggerEvent(전체동의Input);
  }

  const 약관동의Input = q<HTMLInputElement>("#oacx_total");
  if (약관동의Input) {
    약관동의Input.checked = true;
    triggerEvent(약관동의Input);
  }

  const 개인정보동의Input = q<HTMLInputElement>("#privacy");
  if (개인정보동의Input) {
    개인정보동의Input.checked = true;
    triggerEvent(개인정보동의Input);
  }

  const 정책3동의Input = q<HTMLInputElement>("#policy3");
  if (정책3동의Input) {
    정책3동의Input.checked = true;
    triggerEvent(정책3동의Input);
  }

  const 정책4동의Input = q<HTMLInputElement>("#policy4");
  if (정책4동의Input) {
    정책4동의Input.checked = true;
    triggerEvent(정책4동의Input);
  }

  const oacxPolicy1Input = q<HTMLInputElement>("#oacx_policy1");
  if (oacxPolicy1Input) {
    oacxPolicy1Input.checked = true;
    triggerEvent(oacxPolicy1Input);
  }

  const oacxPolicy2Input = q<HTMLInputElement>("#oacx_policy2");
  if (oacxPolicy2Input) {
    oacxPolicy2Input.checked = true;
    triggerEvent(oacxPolicy2Input);
  }

  const oacxPolicy3Input = q<HTMLInputElement>("#oacx_policy3");
  if (oacxPolicy3Input) {
    oacxPolicy3Input.checked = true;
    triggerEvent(oacxPolicy3Input);
  }

  const oacxPolicy4Input = q<HTMLInputElement>("#oacx_policy4");
  if (oacxPolicy4Input) {
    oacxPolicy4Input.checked = true;
    triggerEvent(oacxPolicy4Input);
  }
}
