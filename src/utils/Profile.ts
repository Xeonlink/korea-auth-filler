import type { GenderCode, IsForeigner, WayCode, CarrierCode, IProfile, RawProfile } from "./type";
import { get_RRN_GenderNum, is_MNO } from "./utils";
import { way } from "./constants";

export class Profile implements IProfile {
  private rawProfile: Omit<RawProfile, "id">;

  constructor(rawProfile: Omit<RawProfile, "id">) {
    this.rawProfile = rawProfile;
  }

  public static builder(): ProfileBuilder {
    return new ProfileBuilder();
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

  public get 인증방식() {
    return {
      SMS: this.rawProfile.way === way.SMS,
      PASS: this.rawProfile.way === way.PASS,
      QR: this.rawProfile.way === way.QR,
    };
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
      통신사: (
        skt: string,
        kt: string,
        lgu: string,
        sk_nvmo: string,
        kt_nvmo: string,
        lgu_nvmo: string,
      ) => {
        const mapper = [skt, kt, lgu, sk_nvmo, kt_nvmo, lgu_nvmo];
        return mapper[Number(this.rawProfile.carrier) - 1];
      },
      인증방식: (mapper: string[]) => mapper[Number(this.rawProfile.way)],
      성별: (남자: string, 여자: string) => (this.rawProfile.gender === "1" ? 남자 : 여자),
    };
  }
}

export class ProfileBuilder {
  private name: string;
  private carrier: CarrierCode;
  private phone_number: string;
  private birth: string;
  private gender: GenderCode;
  private foreigner: IsForeigner;
  private way: WayCode;

  constructor() {
    this.name = "";
    this.carrier = "1";
    this.phone_number = "";
    this.birth = "";
    this.gender = "1";
    this.foreigner = "0";
    this.way = "1";
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setCarrier(carrier: CarrierCode) {
    this.carrier = carrier;
    return this;
  }

  public setPhoneNumber(phone_number: string) {
    this.phone_number = phone_number;
    return this;
  }

  public setBirth(birth: string) {
    this.birth = birth;
    return this;
  }

  public setGender(gender: GenderCode) {
    this.gender = gender;
    return this;
  }

  public setForeigner(foreigner: IsForeigner) {
    this.foreigner = foreigner;
    return this;
  }

  public setWay(way: WayCode) {
    this.way = way;
    return this;
  }

  public raw(): RawProfile {
    return {
      id: crypto.randomUUID(),
      name: this.name,
      carrier: this.carrier,
      phone_number: this.phone_number,
      birth: this.birth,
      gender: this.gender,
      foreigner: this.foreigner,
      way: this.way,
    };
  }

  public build() {
    return new Profile(this.raw());
  }
}
