import * as z from "zod";
import { Page } from "./Page";

export type CarrierCode = "1" | "2" | "3" | "4" | "5" | "6"; // SKT, KTF, LGT, SKM, KTM, LGM
export type WayCode = "1" | "2" | "3"; // SMS, PASS, QR
export type GenderCode = "1" | "2"; // 남자, 여자
export type IsForeigner = "0" | "1"; // 내국인, 외국인

export const rawProfileSchame = z.object({
  id: z.uuid(),
  name: z.string(),
  carrier: z.string(),
  phone_number: z.string(),
  birth: z.string(),
  gender: z.string(),
  foreigner: z.string(),
  way: z.string(),
});

export type RawProfile = z.infer<typeof rawProfileSchame>;

export const storageDataSchema = z.object({
  profiles: z.array(rawProfileSchame).default([]),
  selectedProfile: z.number().default(0),
  on: z.boolean().default(true),
  isSideMenuOpen: z.boolean().default(true),
  delay: z.number().default(1000),
  globalOptoins: z
    .object({
      fullauto: z.boolean().default(false),
    })
    .default({
      fullauto: false,
    }),
  vendorOptions: z
    .object({
      oacx: z
        .object({
          preferences: z.array(z.string()).default([]),
        })
        .default({
          preferences: [],
        }),
    })
    .default({
      oacx: {
        preferences: [],
      },
    }),
});

export type StorageData = z.infer<typeof storageDataSchema>;

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

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type InferOptions<T extends string> = Prettify<
  T extends keyof StorageData["vendorOptions"]
    ? StorageData["vendorOptions"][T] & StorageData["globalOptoins"]
    : StorageData["globalOptoins"]
>;

export type Handler<T extends string = string> = {
  name: T;
  isMatch: (page: Page) => boolean;
  fill: (page: Page, profile: IProfile, options: InferOptions<T>) => Promise<void>;
};
