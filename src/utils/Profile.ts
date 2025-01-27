import type { IProfile, RawProfile } from "./type";
import { get_RRN_GenderNum, is_MNO, way } from "./utils";

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
      통신사: (mapper: string[]) => mapper[Number(this.rawProfile.carrier)],
      인증방식: (mapper: string[]) => mapper[Number(this.rawProfile.way)],
      성별: (남자: string, 여자: string) => (this.rawProfile.gender === "1" ? 남자 : 여자),
    };
  }
}
