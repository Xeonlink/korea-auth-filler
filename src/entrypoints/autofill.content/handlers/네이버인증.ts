import type { Handler, IProfile } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

export const 네이버인증: Handler = {
  isMatch: (url) => {
    return ["https://nid.naver.com/"].some((t) => url.includes(t));
  },
  fill: (_, profile) => {
    const agreeCheckbox = q<HTMLInputElement>("#chk_agree3Lb");
    if (agreeCheckbox) {
      agreeCheckbox.click();
    }

    const 이름Input = q<HTMLInputElement>("#nm");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 외국인Input = q<HTMLInputElement>("#foreignYn");
    if (외국인Input) {
      외국인Input.value = profile.내국인 ? "N" : "Y";
      triggerEvent(외국인Input);
    }

    const 성별Input = q<HTMLInputElement>(profile.map.성별("#male", "#female"));
    if (성별Input) {
      성별Input.click();
    }

    const 생년Input = q<HTMLInputElement>("#birth_year");
    if (생년Input) {
      생년Input.value = profile.생년월일.substring(0, 4);
      triggerEvent(생년Input);
    }

    const 생월Input = q<HTMLInputElement>("#birth_month");
    if (생월Input) {
      생월Input.value = String(Number(profile.생년월일.substring(4, 6)));
      triggerEvent(생월Input);
    }

    const 생일Input = q<HTMLInputElement>("#birth_day");
    if (생일Input) {
      생일Input.value = String(Number(profile.생년월일.substring(6)));
      triggerEvent(생일Input);
    }

    const 통신사Input = q<HTMLInputElement>("#mobile_cd");
    if (통신사Input) {
      통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "MVNO", "MVNO", "MVNO"]);
      triggerEvent(통신사Input);
    }

    if (!profile.통신3사) {
      const 통신사Input = q<HTMLInputElement>(
        profile.map.통신사(["", "", "", "", "mvno_skLb", "mvno_ktLb", "mvno_lgLb"]),
      );
      if (통신사Input) {
        통신사Input.click();
      }
    }

    const 전화번호Input = q<HTMLInputElement>("#phone_no");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 인증번호Input = q<HTMLInputElement>("#auth_no");
    if (인증번호Input) {
      인증번호Input.value = profile.전화번호.전체;
      triggerEvent(인증번호Input);
    }

    NHNCloudPlatform(profile);
  },
};

function NHNCloudPlatform(profile: IProfile) {
  const 전체동의Input = q<HTMLInputElement>(".all_check_box");
  if (전체동의Input) {
    전체동의Input.click();
  }

  const 이름Input = q<HTMLInputElement>("#name");
  if (이름Input) {
    이름Input.value = profile.이름;
    triggerEvent(이름Input);
  }

  const 생년월일Input = q<HTMLInputElement>("#birth");
  if (생년월일Input) {
    생년월일Input.value = profile.생년월일;
    triggerEvent(생년월일Input);
  }

  const 성별Button = q<HTMLInputElement>(profile.map.성별("#gender01", "#gender02"));
  if (성별Button) {
    성별Button.click();
  }

  const 통신사Button = q<HTMLInputElement>(
    `a[data-tel="${profile.map.통신사(["", "SKT", "KTF", "LGT", "SKR", "KTR", "LGR"])}"]`,
  );
  if (통신사Button) {
    통신사Button.click();
  }

  const 내외국인Button = q<HTMLInputElement>(profile.내국인 ? "#nationality01" : "#nationality02");
  if (내외국인Button) {
    내외국인Button.click();
  }

  const 전화번호Input = q<HTMLInputElement>("#phone");
  if (전화번호Input) {
    전화번호Input.value = profile.전화번호.전체;
    triggerEvent(전화번호Input);
  }

  const 통신사Input = q<HTMLInputElement>("#mobile_cd");
  if (통신사Input) {
    통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "MVNO", "MVNO", "MVNO"]);
    triggerEvent(통신사Input);
  }
}
