import { Page } from "./Page";

export type CarrierCode = "1" | "2" | "3" | "4" | "5" | "6"; // SKT, KTF, LGT, SKM, KTM, LGM
export type WayCode = "1" | "2" | "3"; // SMS, PASS, QR
export type GenderCode = "1" | "2"; // 남자, 여자
export type IsForeigner = "0" | "1"; // 내국인, 외국인

export type RawProfile = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  carrier: CarrierCode;
  phone_number: string;
  birth: string;
  gender: GenderCode;
  foreigner: IsForeigner;
  way: WayCode;
};

export type StorageData = {
  profiles: RawProfile[];
  selectedProfile: number; // profiles의 index
  on: boolean;
  isSideMenuOpen: boolean;
  delay: number;
};

export interface IProfile {
  이름: string;
  생년월일: string;
  주민번호: {
    앞자리: string;
    성별숫자: string;
  };
  전화번호: {
    전체: string;
    앞3자리: string;
    뒷8자리: string;
  };
  통신사: string;
  통신3사: boolean;
  인증방식: {
    SMS: boolean;
    PASS: boolean;
    QR: boolean;
  };
  내국인: boolean;
  외국인: boolean;
  성별: string;
  map: {
    통신사: (
      skt: string,
      kt: string,
      lgu: string,
      sk_mvno: string,
      kt_mvno: string,
      lgu_mvno: string,
    ) => string;
    인증방식: (mapper: string[]) => string;
    성별: (남자: string, 여자: string) => string;
  };
}

export type Handler = {
  isMatch: (page: Page) => boolean;
  fill: (page: Page, profile: IProfile) => Promise<void>;
};
