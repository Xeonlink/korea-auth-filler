import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CarrierCode, GenderCode, IsForeigner, WayCode } from "./type";

/**
 * 전화번호 하이픈 처리
 * @param str - 전화번호 11자리
 * @returns 하이픈 처리된 전화번호
 */
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
  QR: "3",
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

/**
 * 이동통신망사업자 여부 \
 * MNO(통신3사)와 MVNO(알뜰통신사)를 구분할 목적으로 사용
 * @param carrier_code - 통신사 코드
 * @returns 이동통신망사업자 여부
 */
export function is_MNO(carrier_code: CarrierCode) {
  // MNO(Mobile Network Operator)
  // 이동통신망사업자
  // SKT, KT, LGU+
  return Number(carrier_code) < 4;
}

/**
 * 요소 선택 \
 * document.querySelector의 간단한 버전
 * @param selector - 선택할 요소의 선택자
 * @returns 선택한 요소, 없으면 null
 */
export function q<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector);
}

/**
 * 요소 모두 선택 \
 * document.querySelectorAll의 간단한 버전
 * @param selector - 선택할 요소의 선택자
 * @returns 선택한 요소 모두, 없으면 빈 배열
 */
export function qAll<T extends HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll(selector));
}

/**
 * 지연 함수
 * @param delay - 지연할 시간
 * @returns 지연 함수
 */
export async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const EVENT = {
  CHANGE: {
    VALUE: new Event("input", { bubbles: true, cancelable: true }),
    CHECK: new Event("change", { bubbles: true, cancelable: true }),
  },
};

/**
 * 이벤트 발송 \
 * 이벤트를 일으키지 않으면 이벤트 리스너가 동작하지 않아서 제대로 입력이 완료되지 않는 경우가 있음.
 * @param target - 이벤트를 발송할 요소
 */
export function dispatchEvent(target: HTMLElement) {
  target.dispatchEvent(EVENT.CHANGE.VALUE);
  target.dispatchEvent(EVENT.CHANGE.CHECK);
}

/**
 * 클래스 병합
 * @param inputs - 병합할 클래스
 * @returns 병합된 클래스
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 이벤트 함수 \
 * 이벤트 함수를 여러 개 받아서 하나로 합치는 함수 \
 * 이벤트 객체를 여러개의 이벤트 함수로 뿌려서 처리
 * @param fns - 이벤트 함수
 * @returns 이벤트 함수
 */
export const events =
  <E extends Event>(...fns: ((e: E) => void)[]) =>
  (e: E) => {
    fns.forEach((fn) => fn(e));
  };

export function getCarrierCodeTranslationKey(carrierCode: CarrierCode) {
  switch (carrierCode) {
    case "1":
      return "carrier_SKT";
    case "2":
      return "carrier_KT";
    case "3":
      return "carrier_LGU";
    case "4":
      return "carrier_SKT_MVNO";
    case "5":
      return "carrier_KT_MVNO";
    case "6":
      return "carrier_LGU_MVNO";
  }
}

export function getWayCodeTranslationKey(wayCode: WayCode) {
  switch (wayCode) {
    case "1":
      return "sms";
    case "2":
      return "pass";
    case "3":
      return "qr";
  }
}
