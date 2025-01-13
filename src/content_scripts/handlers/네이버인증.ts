import { Handler } from "../../type";
import { q } from "../../utils";

export const 네이버인증: Handler = {
  isMatch: (url) => {
    return ["https://nid.naver.com/"].some((t) => url.includes(t));
  },
  fill: (profile) => {
    const agreeCheckbox = q<HTMLInputElement>("#chk_agree3Lb");
    if (agreeCheckbox) {
      agreeCheckbox.click();
    }

    const 이름Input = q<HTMLInputElement>("#nm");
    if (이름Input) {
      이름Input.value = profile.이름;
    }

    const 외국인Input = q<HTMLInputElement>("#foreignYn");
    if (외국인Input) {
      외국인Input.value = profile.is내국인 ? "N" : "Y";
    }

    const 성별Input = q<HTMLInputElement>(profile.성별.매핑("#male", "#female"));
    if (성별Input) {
      성별Input.click();
    }

    const 생년Input = q<HTMLInputElement>("#birth_year");
    if (생년Input) {
      생년Input.value = profile.생년월일.substring(0, 4);
    }

    const 생월Input = q<HTMLInputElement>("#birth_month");
    if (생월Input) {
      생월Input.value = String(Number(profile.생년월일.substring(4, 6)));
    }

    const 생일Input = q<HTMLInputElement>("#birth_day");
    if (생일Input) {
      생일Input.value = String(Number(profile.생년월일.substring(6)));
    }

    const 통신사Input = q<HTMLInputElement>("#mobile_cd");
    if (통신사Input) {
      통신사Input.value = profile.통신사.매핑(["", "SKT", "KTF", "LGT", "MVNO", "MVNO", "MVNO"]);
    }

    if (!profile.통신사.is3사) {
      const 통신사Input = q<HTMLInputElement>(
        profile.통신사.매핑(["", "", "", "", "mvno_skLb", "mvno_ktLb", "mvno_lgLb"]),
      );
      if (통신사Input) {
        통신사Input.click();
      }
    }

    const 전화번호Input = q<HTMLInputElement>("#phone_no");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
    }

    const 인증번호Input = q<HTMLInputElement>("#auth_no");
    if (인증번호Input) {
      인증번호Input.value = profile.전화번호.전체;
    }
  },
};
