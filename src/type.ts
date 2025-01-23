export type CarrierCode = "1" | "2" | "3" | "4" | "5" | "6";
export type WayCode = "1" | "2";
export type GenderCode = "1" | "2";
export type IsForeigner = "0" | "1";

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
};

export interface IProfile {
  이름: string;
  생년월일: string;
  주민번호: {
    앞자리: string;
    성별숫자: string | null;
  };
  전화번호: {
    전체: string;
    앞3자리: string;
    뒷8자리: string;
  };
  통신사: string;
  통신3사: boolean;
  인증방식: string;
  내국인: boolean;
  외국인: boolean;
  성별: string;
  map: {
    통신사: (mapper: string[]) => string;
    인증방식: (mapper: string[]) => string;
    성별: (남자: string, 여자: string) => string;
  };
}

export type Handler = {
  isMatch: (url: string) => boolean;
  fill: (profile: IProfile) => void;
};
