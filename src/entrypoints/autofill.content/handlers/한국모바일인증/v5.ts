import type { Handler } from "@/utils/type";
import { triggerEvent, q } from "@/utils/utils";
import ort from "onnxruntime-web/wasm";
import { browser } from "wxt/browser";

/**
 * 테스트 주소
 * 1. 강원도 : https://state.gwd.go.kr/portal/minwon/epeople/counsel
 */

// 한국모바일인증 - 통신사 선택 & 약관동의 & 인증방식 선택
export const 한국모바일인증_v5_1: Handler = {
  isMatch: (url) => {
    return url.includes("https://www.kmcert.com/kmcis/web_v5/kmcisHp00.jsp");
  },
  fill: async (_, profile) => {
    const 폼 = q<HTMLFormElement>("form[name='cplogn']");
    if (폼) {
      const 통신사Input = q<HTMLInputElement>("#reqCommIdStated");
      if (통신사Input) {
        통신사Input.value = profile.map.통신사(["", "SKT", "KTF", "LGT", "SKM", "KTM", "LGM"]);
        triggerEvent(통신사Input);
      }

      const actionHref = profile.map.인증방식([
        "",
        "/kmcis/web_v5/kmcisSms01.jsp",
        "/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
        "/kmcis/qr_web_v5/kmcisQr01.jsp",
      ]);

      폼.setAttribute("action", actionHref);
      폼.submit();
    }
  },
};

// 한국모바일인증 - SMS 인증 & PASS 인증
export const 한국모바일인증_v5_2: Handler = {
  isMatch: (url) => {
    return [
      "https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
      "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
    ].some((l) => url.includes(l));
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

    const 전화번호Input = q<HTMLInputElement>(".mobileNo");
    if (전화번호Input) {
      전화번호Input.value = profile.전화번호.전체;
      triggerEvent(전화번호Input);
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
      const url = browser.runtime.getURL("/kmcert.onnx");
      const session = await ort.InferenceSession.create(url);
      const result = await session.run({ x: tensor });

      const NUM_CLASSES = 11;
      const y = Array.from(result.y.data as Float32Array);
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

    // const 확인Button = q<HTMLButtonElement>(".btn_confirm");
    // if (확인Button) {
    //   확인Button.click();
    // }
  },
};
