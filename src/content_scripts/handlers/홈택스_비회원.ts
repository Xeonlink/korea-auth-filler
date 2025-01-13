import type { Handler, IProfile } from "../../type";
import { q } from "../../utils";

export const 홈택스_비회원: Handler = {
  isMatch: (url: string) => {
    return ["https://www.hometax.go.kr/websquare/"].some((t) => url.includes(t));
  },
  fill: (profile: IProfile) => {
    setInterval(() => {
      const 이름Input = q<HTMLInputElement>("#iptUserNm");
      if (이름Input) {
        이름Input.value = profile.이름;
      }

      const 주민번호앞Input = q<HTMLInputElement>("#iptUserJuminNo1");
      if (주민번호앞Input) {
        주민번호앞Input.value = profile.주민번호.앞자리;
      }

      const 체크Input = q<HTMLInputElement>("#prvcClgtArgeYn_input_0");
      if (체크Input) {
        체크Input.checked = true;
      }

      const 체크Input2 = q<HTMLInputElement>("#ukInfoYn_input_0");
      if (체크Input2) {
        체크Input2.checked = true;
      }
    }, 500);
  },
};
