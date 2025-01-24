import { NICE평가정보1, NICE평가정보2, NICE평가정보3, NICE평가정보4 } from "./NICE평가정보";
import { SCI평가정보1, SCI평가정보2 } from "./SCI평가정보";
import { oacx } from "./oacx";
import { okname1, okname2 } from "./okname";
import { 네이버인증 } from "./네이버인증";
import { 다날 } from "./다날";
import { 드림시큐리티 } from "./드림시큐리티";
import { 모바일신분증 } from "./모바일신분증";
import { 한국모바일인증1, 한국모바일인증2, 한국모바일인증3 } from "./한국모바일인증";
import { 한국사이버결제 } from "./한국사이버결제";
import { 홈택스_비회원 } from "./홈택스_비회원";

export const handlers = [
  oacx,
  홈택스_비회원,
  NICE평가정보1,
  NICE평가정보2,
  NICE평가정보3,
  NICE평가정보4,
  SCI평가정보1,
  SCI평가정보2,
  okname1,
  okname2,
  한국모바일인증1,
  한국모바일인증2,
  한국모바일인증3,
  네이버인증,
  다날,
  한국사이버결제,
  모바일신분증,
  드림시큐리티,
];
