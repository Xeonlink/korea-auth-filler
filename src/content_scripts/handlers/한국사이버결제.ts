import { Handler } from "../../type";
import { q } from "../../utils";

// TODO: 확인필요
export const 한국사이버결제: Handler = {
  isMatch: (url) => {
    return url.includes("https://cert.kcp.co.kr/");
  },
  fill: (profile) => {
    const 통신사Button = q<HTMLButtonElement>(
      "#agency-" + profile.map.통신사(["", "sk", "kt", "lgu", "and", "and", "and"]),
    );
    if (통신사Button) {
      통신사Button.click();
    }

    if (!profile.통신3사) {
      const 통신사Check = q<HTMLInputElement>("#btnMvnoSelect");
      if (통신사Check) {
        통신사Check.click();
      }
    }

    const isPc = !window.location.pathname.includes("/mo");
    const 전체동의Check = q<HTMLInputElement>(
      isPc ? "#frm > fieldset > ul.agreelist.all > li > div > label:nth-child(2)" : "#agree_all",
    );
    if (전체동의Check && !전체동의Check.checked) {
      전체동의Check.click();
    }

    const 인증방식Button = q<HTMLButtonElement>(profile.map.인증방식(["", "#btnSms", "#btnPass"]));
    if (인증방식Button) {
      인증방식Button.click();
    }

    const 이름Input = q<HTMLInputElement>("#user_name");
    if (이름Input) {
      이름Input.value = profile.이름;
    }

    const 주민번호Input1 = q<HTMLInputElement>("#mynum1");
    if (주민번호Input1) {
      주민번호Input1.value = profile.주민번호.앞자리;
    }

    const 주민번호Input2 = q<HTMLInputElement>("#mynum2");
    if (주민번호Input2) {
      주민번호Input2.value = profile.주민번호.성별숫자 ?? "";
    }

    const 전화번호Input = q<HTMLInputElement>(isPc ? "#phone_no_rKey" : "#phone_no");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
    }
  },
};
