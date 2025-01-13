import { Handler } from "../../type";
import { q } from "../../utils";

// TODO: 확인필요
export const 다날: Handler = {
  isMatch: (url) => {
    return url.includes("https://wauth.teledit.com/");
  },
  fill: (profile) => {
    const 통신사Button = q<HTMLButtonElement>(
      "#agency-" + profile.통신사.매핑(["", "sk", "kt", "lgu", "and", "and", "and"]),
    );
    if (통신사Button) {
      통신사Button.click();
    }

    if (!profile.통신사.is3사) {
      const 통신사Check = q<HTMLInputElement>(
        [
          "#layerPopupMvno > div.layer-pop > form > div.pop-con_02 > ul > li.first-item > div.licensee_title > a > label",
          "#layerPopupMvno > div.layer-pop > form > div.pop-con_02 > ul > li:nth-child(2) > div.licensee_title > a > label",
          "#layerPopupMvno > div.layer-pop > form > div.pop-con_02 > ul > li:nth-child(3) > div.licensee_title > a > label",
        ][Number(profile.통신사.raw) - 4],
      );
      if (통신사Check) {
        통신사Check.click();
      }

      const 통신사2 = q<HTMLInputElement>("#btnSelectMvno");
      if (통신사2) {
        통신사2.click();
      }
    }

    const 전체동의Check = q<HTMLInputElement>("#agree_all");
    if (전체동의Check) {
      전체동의Check.click();
    }

    const 인증방식Button = q<HTMLButtonElement>(profile.인증방식.매핑(["", "#btnSms", "#btnPass"]));
    if (인증방식Button) {
      인증방식Button.click();
    }

    const tab변경Button = q<HTMLButtonElement>(
      profile.인증방식.매핑(["#authTabSms > a", "#authTabPass > a"]),
    );
    if (tab변경Button) {
      if (tab변경Button.title == "선택됨") return;
      const tab = q<HTMLButtonElement>(profile.인증방식.매핑(["0", "#authTabSms", "#authTabPass"]));
      tab?.click();
    }

    const 이름Input = q<HTMLInputElement>(
      profile.인증방식.매핑(["", "#sms_username", "#push_username"]),
    );
    if (이름Input) {
      이름Input.value = profile.이름;
    }

    const 주민번호Input = q<HTMLInputElement>("#sms_mynum1");
    if (주민번호Input) {
      주민번호Input.value = profile.주민번호.앞자리;
    }

    const 주민번호Input2 = q<HTMLInputElement>("#sms_mynum2");
    if (주민번호Input2) {
      주민번호Input2.value = profile.주민번호.성별숫자 ?? "";
    }

    const 전화번호Input = q<HTMLInputElement>(
      profile.인증방식.매핑(["", "#sms_mobileno", "#push_mobileno"]),
    );
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
    }
  },
};
