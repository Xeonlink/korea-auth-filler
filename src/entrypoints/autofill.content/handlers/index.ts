import type { Handler } from "@/utils/type";
import { danal } from "./danal";
import { dream } from "./dream";
import { kcb1, kcb2 } from "./kcb";
import { kgmobilians } from "./kgmobilians";
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
import { mobileid1, mobileid2 } from "./mobileid";
import { nexonesoft } from "./nexonesoft";
import { nhnkcp1, nhnkcp2 } from "./nhnkcp";
import { nice1, nice2, nice3, nice4 } from "./nice";
import { oacx } from "./oacx";
import { sci_v2_1, sci_v2_3, sci_v3_1, sci_v3_2, sci_v3_3 } from "./sci";
import { toss } from "./toss";
import { payco } from "./payco";
import { kgi } from "./kgi";
// Import { yeskey } from "./yeskey";

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
  danal,
  payco,
  kgi,
  // Yeskey,
];
