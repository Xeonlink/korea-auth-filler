// import { form } from "@/utils/form";
import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";
import ort from "onnxruntime-web";
import { browser } from "wxt/browser";

/**
 * 테스트 사이트
 * 1. 대전광역시 : https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=
 * 2. 롯데홈쇼핑 회원가입 : https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte
 */

export const SCI평가정보_v3_1: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/pcc_V\d_j10\.jsp$/g.test(url);
  },
  fill: async (_, profile) => {
    const 통신사 = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
    const 통신사Button = q<HTMLButtonElement>(`button[onclick="submitForm('${통신사}')"]`);
    if (통신사Button) {
      통신사Button.click();
    }
  },
};

export const SCI평가정보_v3_2: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/bokdo(Mv)?\.jsp$/g.test(url);
  },
  fill: async (_, profile) => {
    const 인증방식 = profile.map.인증방식(["", "문자(SMS) 인증", "pass 인증", "QR코드 인증"]);
    const 인증방식Button = q<HTMLButtonElement>(`li[aria-label="${인증방식}"] > button`);
    if (!인증방식Button) return;
    인증방식Button.click();

    const 본인확인Check = q<HTMLInputElement>("#check_txt");
    if (!본인확인Check) return;
    if (!본인확인Check.checked) {
      본인확인Check.click();
    }

    const 다음Button = q<HTMLButtonElement>(`button[data-action="next"]`);
    if (!다음Button) return;
    다음Button.click();
  },
};

export const SCI평가정보_v3_3: Handler = {
  isMatch: (url) => {
    return /^https:\/\/pcc\.siren24\.com\/pcc_V\d\/passWebV3\/pcc_V\d_j30_certHp(Mvno)?Ti(App)?01\.jsp$/g.test(
      url,
    );
  },
  fill: async (_, profile) => {
    const 이름Input = q<HTMLInputElement>(".userName");
    if (이름Input) {
      이름Input.value = profile.이름;
      triggerEvent(이름Input);
    }

    const 이름다음Button = q<HTMLButtonElement>(".btnUserName");
    if (이름다음Button) {
      이름다음Button.click();
    }

    const 주민번호앞Input = q<HTMLInputElement>(".myNum1");
    if (주민번호앞Input) {
      주민번호앞Input.value = profile.주민번호.앞자리;
      triggerEvent(주민번호앞Input);
    }

    const 주민번호뒤Input = q<HTMLInputElement>(".myNum2");
    if (주민번호뒤Input) {
      주민번호뒤Input.value = profile.주민번호.성별숫자 ?? "";
      triggerEvent(주민번호뒤Input);
    }

    const 전화번호단계Li = q<HTMLLIElement>(".step_item.step_tel");
    if (전화번호단계Li) {
      전화번호단계Li.classList.add("on");
    }

    const 전화번호Input = q<HTMLInputElement>(".mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
    }

    const 보안문자단계Li = q<HTMLLIElement>(".step_item.step_captcha");
    if (보안문자단계Li) {
      보안문자단계Li.classList.add("on");
    }

    const 보안문자Image = q<HTMLImageElement>("#simpleCaptchaImg");
    const 보안문자Input = q<HTMLInputElement>(".captchaAnswer");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (보안문자Image && 보안문자Input && ctx) {
      ort.env.wasm.wasmPaths = {
        wasm: browser.runtime.getURL("/ort-wasm-simd-threaded.wasm"),
        mjs: browser.runtime.getURL("/ort-wasm-simd-threaded.mjs"),
      };

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 보안문자Image.width, 보안문자Image.height);
      ctx.drawImage(보안문자Image, 0, 0, 보안문자Image.width, 보안문자Image.height);
      const imageData = ctx.getImageData(0, 0, 보안문자Image.width, 보안문자Image.height);
      const tensor = await ort.Tensor.fromImage(imageData);
      const url = browser.runtime.getURL("/sci.onnx");
      const session = await ort.InferenceSession.create(url);
      const result = await session.run({ x: tensor });

      const y = Array.from(result.y.data as Float32Array);
      const NUM_CLASSES = 11;
      const seq = Array.from({ length: y.length / NUM_CLASSES })
        .map(() => y.splice(0, NUM_CLASSES))
        .map((row) => row.indexOf(Math.max(...row)));

      let out = "";
      let prev = -1;
      for (const p of seq) {
        if (p !== prev && p !== 10) {
          out += p.toString();
        }
        prev = p;
      }

      result.y.dispose();
      session.release();
      tensor.dispose();

      // 보안문자Input.focus();
      보안문자Input.value = out;
      triggerEvent(보안문자Input);
    }
  },
};
