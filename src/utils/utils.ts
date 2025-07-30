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
 * 생년월일 .(닷) 처리
 * @param str - 생년월일 8자리
 * @returns 생년월일 .(닷) 처리된 문자열
 */
export function toDotBirth(str: string) {
  return str.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
}

/**
 * 생년월일을 국가에 맞는 형식으로 변환, 생년월일을 년 월 일로 분리하고, Date 객체로 변환하여 toLocaleDateString() 메서드를 호출하여 국가에 맞는 형식으로 변환
 * @param str - 생년월일 8자리
 * @param country - 국가 코드
 * @returns 생년월일 형식으로 변환된 문자열
 */
export function toBirth(str: string, country?: Intl.LocalesArgument) {
  const dotBirth = toDotBirth(str);
  const [year, month, day] = dotBirth.split(".").map(Number);
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  return date.toLocaleDateString(country);
}

/**
 * 개발진행시 console.log()
 * @param {string} string - 출력할 문자열
 */
export function log(string: string) {
  if (!import.meta.env.DEV) return;
  console.log(string);
}

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
  throw new Error("Invalid birth");
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

/**
 * 이벤트 발송 \
 * 이벤트를 일으키지 않으면 이벤트 리스너가 동작하지 않아서 제대로 입력이 완료되지 않는 경우가 있음.
 * @param target - 이벤트를 발송할 요소
 */
export function triggerEvent(target: HTMLElement) {
  target.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
  target.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
  target.dispatchEvent(new Event("keydown", { bubbles: true, cancelable: true }));
  target.dispatchEvent(new Event("keypress", { bubbles: true, cancelable: true }));
  target.dispatchEvent(new Event("keyup", { bubbles: true, cancelable: true }));
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

// export const YYYYMMDD = Number(dayjs().format("YYYYMMDD"));

/**
 * 디바운스 함수
 * @param func - 디바운스 함수
 * @param wait - 디바운스 시간
 * @returns 디바운스 함수
 */
export function debounce(func: () => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, wait);
  };
}

/**
 * 문서가 아이드 상태가 될 때까지 대기하고 함수 실행
 * @param func - 실행할 함수
 * @param wait - 대기 시간
 */
export function waitUntilDomIdle(func: () => void, wait: number) {
  const debouncedFunc = debounce(() => {
    observer?.disconnect();
    observer = null;
    func();
  }, wait);

  let observer: MutationObserver | null = new MutationObserver(debouncedFunc);

  debouncedFunc();
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
}
