import type { Handler } from "@/utils/type";
import { dispatchEvent, q } from "@/utils/utils";

export const okname1: Handler = {
  isMatch: (url) => {
    return url.includes("https://safe.ok-name.co.kr/CommonSvl");
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const test = q<HTMLElement>(".step1header");
      if (!test) {
        return; // 존재여부 확인용
      }

      const tcInput = q<HTMLInputElement>("input[name='tc']");
      if (tcInput) {
        let tcValue = "";
        if (profile.통신3사 && profile.인증방식.PASS) {
          tcValue = "kcb.oknm.online.pass.popup.push.cmd.mno.PS02_PushMno011Cmd";
        }
        if (!profile.통신3사 && profile.인증방식.PASS) {
          tcValue = "kcb.oknm.online.pass.popup.push.cmd.mvno.PS02_PushMvno011Cmd";
        }
        if (profile.통신3사 && profile.인증방식.SMS) {
          tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mno.PS02_SmsMno011Cmd";
        }
        if (!profile.통신3사 && profile.인증방식.SMS) {
          tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mvno.PS02_SmsMvno011Cmd";
        }
        tcInput.value = tcValue;
        dispatchEvent(tcInput);
      }

      const 통신사Input = q<HTMLInputElement>("input[name='mbl_tel_cmm_cd']");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "01", "02", "03", "04", "05", "06"]);
        dispatchEvent(통신사Input);
      }

      const 폼 = q<HTMLFormElement>("#ct > form");
      if (폼) {
        폼.submit();
      }
    }, 500);
  },
};

export const okname2: Handler = {
  isMatch: (url) => {
    return url.includes("https://safe.ok-name.co.kr/CommonSvl");
  },
  fill: (ctx, profile) => {
    ctx.setInterval(() => {
      const test = q<HTMLElement>("section.certify_user2.certifyWrap.certifyWrap_02");
      if (!test) {
        return; // 존재여부 확인용
      }

      const 이름Input = q<HTMLInputElement>("#nm");
      if (이름Input) {
        이름Input.value = profile.이름;
        dispatchEvent(이름Input);
      }

      const 주민번호앞Input = q<HTMLInputElement>("#ssn6");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
        dispatchEvent(주민번호앞Input);
      }

      const 주민번호뒤Input = q<HTMLInputElement>("#ssn1");
      if (주민번호뒤Input) {
        주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
        dispatchEvent(주민번호뒤Input);
      }

      const 전화번호Input = q<HTMLInputElement>("#mbphn_no");
      if (전화번호Input) {
        전화번호Input.value = profile.전화번호.뒷8자리;
        dispatchEvent(전화번호Input);
      }
    }, 500);
  },
};
