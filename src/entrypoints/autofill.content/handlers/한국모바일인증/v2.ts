import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v2_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v2/kmcisHp00.jsp");
  },
  fill: (_, profile) => {
    const 폼 = q<HTMLFormElement>("form[name='cplogn']");
    if (폼) {
      const 통신사Input = q<HTMLInputElement>("#reqCommIdStated");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
        triggerEvent(통신사Input);
      }

      const actionHref = profile.map.인증방식([
        "",
        "/kmcis/web_v2/kmcisSms01.jsp",
        "/kmcis/simpleCert_web/kmcisApp01.jsp",
        "/kmcis/web_v2/kmcisSms01.jsp", // QR을 지원하지 않는 버전이므로, 대신 SMS 인증 페이지로 이동
      ]);

      폼.setAttribute("action", actionHref);
      폼.submit();
    }
  },
};

// 한국모바일인증 - SMS 인증 & PASS 인증
export const 한국모바일인증_v2_2: Handler = {
  isMatch: (url) => {
    return [
      "https://www.kmcert.com/kmcis/web_v2/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web/kmcisApp01.jsp",
    ].some((l) => url.includes(l));
  },
  fill: (_, profile) => {
    const 이름Input = q<HTMLInputElement>(`input[name="userName"]`);
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 국가Select = q<HTMLSelectElement>(`select[name="nation"]`);
    if (국가Select) {
      국가Select.value = profile.내국인 ? "0" : "1";
      triggerEvent(국가Select);
    }

    const 생년월일Input = q<HTMLInputElement>(`input[name="Birth"]`);
    if (생년월일Input) {
      생년월일Input.value = profile.생년월일;
      triggerEvent(생년월일Input);
    }

    const 성별Input = q<HTMLInputElement>(`input[name="sex"]`);
    if (성별Input) {
      const 남자A = q<HTMLAnchorElement>("#man");
      const 여자A = q<HTMLAnchorElement>("#woman");
      const 성별 = profile.map.성별("남자", "여자");
      if (성별 === "남자") {
        남자A?.classList.add("active");
        여자A?.classList.remove("active");
      }
      if (성별 === "여자") {
        여자A?.classList.add("active");
        남자A?.classList.remove("active");
      }

      성별Input.value = profile.map.성별("0", "1");
      triggerEvent(성별Input);
    }

    const 전화번호Input = q<HTMLInputElement>(`input[name="No"]`);
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 전체동의Input = q<HTMLInputElement>(`input[name="togglecheck"]`);
    if (전체동의Input) {
      전체동의Input.checked = true;
      triggerEvent(전체동의Input);
    }

    const 개인정보이용동의Input = q<HTMLInputElement>(`input[name="agree_list01"]`);
    if (개인정보이용동의Input) {
      개인정보이용동의Input.checked = true;
      triggerEvent(개인정보이용동의Input);
    }

    const 고유식별정보처리동의Input = q<HTMLInputElement>(`input[name="agree_list02"]`);
    if (고유식별정보처리동의Input) {
      고유식별정보처리동의Input.checked = true;
      triggerEvent(고유식별정보처리동의Input);
    }

    const 서비스이용약관동의Input = q<HTMLInputElement>(`input[name="agree_list03"]`);
    if (서비스이용약관동의Input) {
      서비스이용약관동의Input.checked = true;
      triggerEvent(서비스이용약관동의Input);
    }

    const 통신사약관동의Input = q<HTMLInputElement>(`input[name="agree_list04"]`);
    if (통신사약관동의Input) {
      통신사약관동의Input.checked = true;
      triggerEvent(통신사약관동의Input);
    }

    const 보안문자Input = q<HTMLInputElement>(`input[name="securityNum"]`);
    if (보안문자Input) {
      보안문자Input.focus();
    }
  },
};
