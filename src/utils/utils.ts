import type { CarrierCode, GenderCode, IProfile, IsForeigner, RawProfile } from "./type";

// TODO: ?? "" 개선
export function toHyphenPhone(str: string): string {
  return (
    str
      .match(/\d*/g)
      ?.join("")
      .match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      ?.slice(1)
      .join("-")
      .replace(/-*$/g, "") ?? ""
  );
}

/**
 * 개발진행시 console.log()
 * @param {string} string - 출력할 문자열
 */
export function log(string: string) {
  if (!import.meta.env.DEV) return;
  console.log(string);
}

export const carrier = {
  SKT: "1",
  KT: "2",
  LGU: "3",
  SKT_MVNO: "4",
  KT_MVNO: "5",
  LGU_MVNO: "6",
} as const;

export const way = {
  SMS: "1",
  PASS: "2",
} as const;

/**
 * 주민등록번호 7번째 자리(성별) 가져오기
 * @param birth - 생년월일 8자리
 * @param gender - 성별 코드
 * @param foreigner - 내/외국인 코드
 * @returns 주민등록번호 7번째 자리, null이면 알 수 없음을 의미함
 */
export function get_RRN_GenderNum(birth: string, gender: GenderCode, foreigner: IsForeigner) {
  // 9: 1800 ~ 1899년에 태어난 남성
  // 0: 1800 ~ 1899년에 태어난 여성
  // 1: 1900 ~ 1999년에 태어난 남성
  // 2: 1900 ~ 1999년에 태어난 여성
  // 3: 2000 ~ 2099년에 태어난 남성
  // 4: 2000 ~ 2099년에 태어난 여성
  // 5: 1900 ~ 1999년에 태어난 외국인 남성
  // 6: 1900 ~ 1999년에 태어난 외국인 여성
  // 7: 2000 ~ 2099년에 태어난 외국인 남성
  // 8: 2000 ~ 2099년에 태어난 외국인 여성
  const birthSub02 = birth.substring(0, 2);
  if (birthSub02 === "18") {
    return gender === "1" ? "9" : "0";
  }
  if (birthSub02 === "19" && foreigner === "0") {
    return gender as string;
  }
  if (birthSub02 === "20" && foreigner === "0") {
    return String(Number(gender) + 2);
  }
  if (birthSub02 === "19" && foreigner === "1") {
    return String(Number(gender) + 4);
  }
  if (birthSub02 === "20" && foreigner === "1") {
    return String(Number(gender) + 6);
  }
  return null;
}

export function is_MNO(carrier_code: CarrierCode) {
  // MNO(Mobile Network Operator)
  // 이동통신망사업자
  // SKT, KT, LGU+
  return Number(carrier_code) < 4;
}

export class Profile implements IProfile {
  private rawProfile: RawProfile;

  constructor(rawProfile: RawProfile) {
    this.rawProfile = rawProfile;
  }

  public get 이름(): string {
    return this.rawProfile.name;
  }

  public get 생년월일(): string {
    return this.rawProfile.birth;
  }

  public get 출생년도(): string {
    return this.rawProfile.birth.substring(0, 4);
  }

  public get 주민번호(): IProfile["주민번호"] {
    return {
      앞자리: this.rawProfile.birth.substring(2),
      성별숫자: get_RRN_GenderNum(
        this.rawProfile.birth,
        this.rawProfile.gender,
        this.rawProfile.foreigner,
      ),
    };
  }

  public get 전화번호(): IProfile["전화번호"] {
    return {
      전체: this.rawProfile.phone_number,
      앞3자리: this.rawProfile.phone_number.substring(0, 3),
      뒷8자리: this.rawProfile.phone_number.substring(3),
    };
  }

  public get 통신사(): IProfile["통신사"] {
    return this.rawProfile.carrier;
  }

  public get 인증방식(): IProfile["인증방식"] {
    return this.rawProfile.way;
  }

  public get 통신3사(): boolean {
    return is_MNO(this.rawProfile.carrier);
  }

  public get 내국인(): boolean {
    return this.rawProfile.foreigner === "0";
  }

  public get 외국인(): boolean {
    return this.rawProfile.foreigner === "1";
  }

  public get 성별(): IProfile["성별"] {
    return this.rawProfile.gender;
  }

  public get map(): IProfile["map"] {
    return {
      통신사: (mapper: string[]) => mapper[Number(this.rawProfile.carrier)],
      인증방식: (mapper: string[]) => mapper[Number(this.rawProfile.way)],
      성별: (남자: string, 여자: string) => (this.rawProfile.gender === "1" ? 남자 : 여자),
    };
  }
}

export function q<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector);
}

export async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const EVENT = {
  CHANGE: {
    VALUE: new Event("input", { bubbles: true, cancelable: true }),
    CHECK: new Event("change", { bubbles: true, cancelable: true }),
  },
};

export function dispatchEvent(target: HTMLElement) {
  target.dispatchEvent(EVENT.CHANGE.VALUE);
  target.dispatchEvent(EVENT.CHANGE.CHECK);
}
