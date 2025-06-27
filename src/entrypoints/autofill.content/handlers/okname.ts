import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";

/**
 * 테스트 주소
 * - 디지털원패스 : https://www.onepass.go.kr/membership/find/id
 */

export const okname1: Handler = {
  isMatch: (url) => {
    const isUrlMatch = url.includes("https://safe.ok-name.co.kr/CommonSvl");
    const isStep1 = !!q<HTMLElement>(".step1header");
    return isUrlMatch && isStep1;
  },
  fill: (_, profile) => {
    const tcInput = q<HTMLInputElement>("input[name='tc']");
    if (tcInput) {
      let tcValue = "";
      if (profile.통신3사 && (profile.인증방식.PASS || profile.인증방식.QR)) {
        tcValue = "kcb.oknm.online.pass.popup.push.cmd.mno.PS02_PushMno011Cmd";
      }
      if (!profile.통신3사 && (profile.인증방식.PASS || profile.인증방식.QR)) {
        tcValue = "kcb.oknm.online.pass.popup.push.cmd.mvno.PS02_PushMvno011Cmd";
      }
      if (profile.통신3사 && profile.인증방식.SMS) {
        tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mno.PS02_SmsMno011Cmd";
      }
      if (!profile.통신3사 && profile.인증방식.SMS) {
        tcValue = "kcb.oknm.online.pass.popup.sms.cmd.mvno.PS02_SmsMvno011Cmd";
      }
      tcInput.value = tcValue;
      triggerEvent(tcInput);
    }

    const 통신사Input = q<HTMLInputElement>("input[name='mbl_tel_cmm_cd']");
    if (통신사Input) {
      통신사Input.value = profile.map.통신사(["", "01", "02", "03", "04", "05", "06"]);
      triggerEvent(통신사Input);
    }

    const 폼 = q<HTMLFormElement>("#ct > form");
    if (폼) {
      폼.submit();
    }
  },
};

export const okname2: Handler = {
  isMatch: (url) => {
    const isUrlMatch = url.includes("https://safe.ok-name.co.kr/CommonSvl");
    const isStep2 = !!q<HTMLElement>("section.certify_user2.certifyWrap.certifyWrap_02");
    return isUrlMatch && isStep2;
  },
  fill: (_, profile) => {
    /**
     * 인증방식 PASS | SMS 일 때
     */
    const 이름Input = q<HTMLInputElement>("#nm");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 주민번호앞Input = q<HTMLInputElement>("#ssn6");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>("#ssn1");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒤Input);
    }

    const 전화번호Input = q<HTMLInputElement>("#mbphn_no");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    /**
     * 인증방식 QR 일 때
     *
     * QR인증 창을 닫으면 refresh 되어서 다시 QR인증 창이 떠버리는 문제가 있음.
     */
    if (profile.인증방식.QR) {
      // const QR인증Button = q<HTMLButtonElement>("#qr_auth");
      // if (QR인증Button) {
      //   QR인증Button.click();
      // }
    }
  },
};
