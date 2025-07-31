import type { Handler } from "@/utils/type";
import { nhnkcp1, nhnkcp2 } from "./nhnkcp";
import { nice1, nice2, nice3, nice4 } from "./nice";
import { sci_v2_1, sci_v2_3, sci_v3_1, sci_v3_2, sci_v3_3 } from "./sci";
import { oacx } from "./oacx";
import { kcb1, kcb2 } from "./kcb";
import { toss } from "./toss";
import { nexonesoft } from "./nexonesoft";
import { dream } from "./dream";
import { mobileid1, mobileid2 } from "./mobileid";
import {
  kmcert_v2_1,
  kmcert_v2_2,
  kmcert_v3_1,
  kmcert_v3_3,
  kmcert_v4_1,
  kmcert_v4_2,
  kmcert_v4_3,
  kmcert_v5_1,
  kmcert_v5_2,
} from "./kmcert";
import { kgmobilians } from "./kgmobilians";
// import { yeskey } from "./yeskey";

export const handlers: Handler[] = [
  oacx,
  nice1,
  nice2,
  nice3,
  nice4,
  sci_v2_1,
  sci_v2_3,
  sci_v3_1,
  sci_v3_2,
  sci_v3_3,
  kcb1,
  kcb2,
  kmcert_v2_1,
  kmcert_v2_2,
  kmcert_v3_1,
  kmcert_v3_3,
  kmcert_v4_1,
  kmcert_v4_2,
  kmcert_v4_3,
  kmcert_v5_1,
  kmcert_v5_2,
  toss,
  nhnkcp1,
  nhnkcp2,
  mobileid1,
  mobileid2,
  dream,
  nexonesoft,
  kgmobilians,
  // yeskey,
];
