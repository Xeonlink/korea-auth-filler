/**
 * 주요 상수 및 enum 정의
 */

// 인증방식
export const way = {
  SMS: "1",
  PASS: "2",
  QR: "3",
} as const;

// 성별
export const gender = {
  MALE: "1",
  FEMALE: "2",
} as const;

// 내/외국인
export const isForeigner = {
  NATIVE: "0",
  FOREIGNER: "1",
} as const;

// 통신사
export const carrier = {
  SKT: "1",
  KT: "2",
  LGU: "3",
  SKT_MVNO: "4",
  KT_MVNO: "5",
  LGU_MVNO: "6",
} as const;

export const DECODABLE_CHARSETS = {
  DIGIT: "0123456789",
  ALPHADIGIT: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
} as const;
