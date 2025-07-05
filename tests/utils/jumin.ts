/**
 * 한국 주민등록번호 생성 및 검증 유틸리티
 *
 * 이 모듈은 테스트 목적으로 유효한 한국 주민등록번호를 생성하고 검증하는 기능을 제공합니다.
 * 생성된 주민번호는 실제 주민번호가 아닌 테스트용 가상의 번호입니다.
 *
 * 주요 기능:
 * - 랜덤 주민번호 생성
 * - 특정 생년월일 및 성별 기반 주민번호 생성
 * - 주민번호 유효성 검증 (체크섬 및 날짜 유효성)
 * - 여러 개의 주민번호 일괄 생성
 *
 * 사용 예시:
 * ```typescript
 * // 랜덤 주민번호 1개 생성
 * const randomNumbers = jumin();
 *
 * // 특정 생년월일로 주민번호 생성
 * const specificNumbers = jumin({
 *   year: 1990,
 *   month: 3,
 *   day: 12,
 *   gender: 1,  // 1: 남성, 2: 여성
 *   loop: 5     // 5개 생성
 * });
 *
 * // 주민번호 유효성 검증
 * const isValid = jumin.verify('901212-1234567');
 * ```
 *
 * 주의사항:
 * - 이 모듈은 테스트 목적으로만 사용되어야 합니다.
 * - 실제 개인정보나 주민번호와는 관련이 없습니다.
 * - 생성된 번호를 실제 서비스에서 사용하지 마세요.
 *
 * @author 테스트 유틸리티
 * @version 1.0.0
 * @since 2024
 */

interface JuminOptions {
  year?: number;
  month?: number;
  day?: number;
  gender?: number;
  loop?: number;
}

interface JuminGenerator {
  (options?: JuminOptions): string[];
  verify(jumin: string, secondPart?: string): boolean;
}

/**
 * 숫자나 문자열을 지정된 길이만큼 패딩하는 함수
 * @param n 패딩할 숫자나 문자열
 * @param c 패딩에 사용할 문자
 * @param length 목표 길이
 * @returns 패딩된 문자열
 */
function pad(n: number | string, c: string, length: number): string {
  let result = n.toString();
  while (result.length < length) {
    result = c + result;
  }
  return result.slice(-length);
}

/**
 * 랜덤 값을 생성하는 객체
 * 주민번호 생성 시 필요한 연도, 월, 일, 성별을 랜덤으로 생성
 */
const random = {
  /**
   * 1900년부터 현재 연도까지의 랜덤 연도 생성
   * @returns 랜덤 연도
   */
  year(): number {
    const currentYear = new Date().getFullYear();
    return Math.floor(Math.random() * (currentYear - 1900) + 1900);
  },
  /**
   * 1월부터 12월까지의 랜덤 월 생성
   * @returns 랜덤 월 (1-12)
   */
  month(): number {
    return Math.floor(Math.random() * 12) + 1;
  },
  /**
   * 1일부터 31일까지의 랜덤 일 생성
   * @returns 랜덤 일 (1-31)
   */
  day(): number {
    return Math.floor(Math.random() * 31) + 1;
  },
  /**
   * 성별을 나타내는 랜덤 숫자 생성
   * @returns 랜덤 성별 (1: 남성, 2: 여성)
   */
  gender(): number {
    return Math.floor(Math.random() * 2) + 1;
  },
};

/**
 * 주민번호의 마지막 체크섬 자리수를 계산하는 함수
 * @param digits 주민번호의 앞 12자리 숫자들
 * @returns 계산된 체크섬 자리수
 */
function calculateLastDigit(...digits: number[]): number {
  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  const sum = digits.reduce((acc, digit, index) => acc + digit * multipliers[index], 0);
  const remainder = 11 - (sum % 11);
  return remainder > 9 ? remainder % 10 : remainder;
}

/**
 * 주민번호의 뒷자리 7자리를 생성하는 함수
 * @param frontDigits 주민번호의 앞자리 숫자들 (생년월일 + 성별)
 * @returns 생성된 뒷자리 7자리 문자열
 */
function generateBackPart(...frontDigits: number[]): string {
  const digits = [...frontDigits];

  // Generate 5 random digits
  for (let i = 0; i < 5; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const lastDigit = calculateLastDigit(...digits);

  return digits.slice(6).join("") + lastDigit.toString();
}

/**
 * 주민번호를 생성하는 메인 함수
 * @param options 주민번호 생성 옵션 (연도, 월, 일, 성별, 생성 개수)
 * @returns 생성된 주민번호 배열
 */
const jumin: JuminGenerator = (options: JuminOptions = {}): string[] => {
  const result: string[] = [];
  const loop = options.loop || 1;

  for (let i = 0; i < loop; i++) {
    const year = options.year || random.year();
    const month = options.month || random.month();
    const day = options.day || random.day();
    const gender = options.gender || random.gender();

    const date = new Date(year, month - 1, day);
    const actualYear = date.getFullYear();
    const actualMonth = date.getMonth() + 1;
    const actualDay = date.getDate();

    // Generate front part (YYMMDD)
    const frontPart = (
      actualYear.toString() +
      pad(actualMonth, "0", 2) +
      pad(actualDay, "0", 2)
    ).substring(2);
    const frontDigits = frontPart.split("").map(Number);

    // Add gender digit (1-2 for 1900s, 3-4 for 2000s)
    const genderDigit = gender + (actualYear > 1999 ? 2 : 0);
    frontDigits.push(genderDigit);

    // Generate back part
    const backPart = generateBackPart(...frontDigits);

    result.push(`${frontPart}-${backPart}`);
  }

  return result;
};

/**
 * 주민번호의 유효성을 검증하는 함수
 * @param juminNumber 검증할 주민번호 (하이픈 포함 가능)
 * @param secondPart 주민번호 뒷자리 (선택사항)
 * @returns 유효성 검증 결과 (true: 유효, false: 무효)
 */
jumin.verify = (juminNumber: string, secondPart?: string): boolean => {
  if (!juminNumber) {
    console.error("no arguments.");
    return false;
  }

  let fullJumin = juminNumber;
  if (secondPart) {
    fullJumin += secondPart;
  }

  // Remove hyphen
  fullJumin = fullJumin.replace("-", "");

  if (fullJumin.length !== 13) {
    console.error("not valid length.");
    return false;
  }

  const digits = fullJumin.split("").map(Number);
  const genderDigit = digits[6];

  // Determine century based on gender digit
  const century = genderDigit > 2 ? "20" : "19";
  const year = parseInt(century + fullJumin.substring(0, 2));
  const month = parseInt(fullJumin.substring(2, 4));
  const day = parseInt(fullJumin.substring(4, 6));

  const date = new Date(year, month - 1, day);

  // Validate date
  const expectedDateString = (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1, "0", 2) +
    pad(date.getDate(), "0", 2)
  ).substring(2);

  if (fullJumin.substring(0, 6) !== expectedDateString) {
    console.error("not valid date (yyMMdd).");
    return false;
  }

  // Validate checksum
  const calculatedLastDigit = calculateLastDigit(...digits.slice(0, 12));
  if (digits[12] !== calculatedLastDigit) {
    console.error("not valid ssn (last number not match).");
    return false;
  }

  return true;
};

export default jumin;
