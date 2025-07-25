import type { Handler } from "@/utils/type";
import { NHN_KCP1, NHN_KCP2 } from "./NHN_KCP";
import { NICE평가정보1, NICE평가정보2, NICE평가정보3, NICE평가정보4 } from "./NICE평가정보";
import { SCI평가정보_v2_1, SCI평가정보_v2_3 } from "./SCI평가정보/v2";
import { SCI평가정보_v3_1, SCI평가정보_v3_2, SCI평가정보_v3_3 } from "./SCI평가정보/v3";
import { oacx } from "./oacx/oacx";
import { okname1, okname2 } from "./okname";
import { toss } from "./toss";
import { 네이버인증 } from "./네이버인증";
import { 넥스원소프트 } from "./넥스원소프트";
import { 다날 } from "./다날";
import { 드림시큐리티 } from "./드림시큐리티";
import { 모바일신분증1, 모바일신분증2 } from "./모바일신분증";
import { 한국모바일인증_v2_1, 한국모바일인증_v2_2 } from "./한국모바일인증/v2";
import { 한국모바일인증_v3_3 } from "./한국모바일인증/v3";
import { 한국모바일인증_v4_1, 한국모바일인증_v4_2, 한국모바일인증_v4_3 } from "./한국모바일인증/v4";
import { 한국모바일인증_v5_1, 한국모바일인증_v5_2 } from "./한국모바일인증/v5";
import { KG모빌리언스 } from "./KG모빌리언스";

export const handlers: Handler[] = [
  oacx,
  NICE평가정보1,
  NICE평가정보2,
  NICE평가정보3,
  NICE평가정보4,
  SCI평가정보_v2_1,
  SCI평가정보_v2_3,
  SCI평가정보_v3_1,
  SCI평가정보_v3_2,
  SCI평가정보_v3_3,
  okname1,
  okname2,
  한국모바일인증_v2_1,
  한국모바일인증_v2_2,
  한국모바일인증_v4_1,
  한국모바일인증_v4_2,
  한국모바일인증_v4_3,
  한국모바일인증_v5_1,
  한국모바일인증_v5_2,
  한국모바일인증_v3_3,
  toss,
  네이버인증,
  다날,
  NHN_KCP1,
  NHN_KCP2,
  모바일신분증1,
  모바일신분증2,
  드림시큐리티,
  넥스원소프트,
  KG모빌리언스,
];
