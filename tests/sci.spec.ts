import { carrier, way } from "@/utils/constants";
import type { CarrierCode } from "@/utils/type";
import { allcase2 } from "./utils/testcase";
import { test } from "./index";
import { poms } from "./pom/PomPage";

type Var = {
  gateKey: "대전시Login" | "롯데홈쇼핑SignUp";
  carrier: CarrierCode;
};

const testcase = allcase2<Var>((variables) => {
  const { gateKey, carrier } = variables;

  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ carrier, way: way.SMS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openSCI평가정보();
    const pom = poms.sci(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView(profile.통신3사 ? "MNO" : "MVNO");
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.전화번호filled();
    });
  });

  test("PASS", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier, way: way.PASS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openSCI평가정보();
    const pom = poms.sci(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView(profile.통신3사 ? "MNO" : "MVNO");
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });

  test("QR", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier, way: way.QR });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openSCI평가정보();
    const pom = poms.sci(root, profile);

    await pom.step("QR인증View", async (expect) => {
      await expect.qrAuthView(profile.통신3사 ? "MNO" : "MVNO");
    });
  });
});

testcase.regist({
  gateKey: {
    대전시Login: "from 대전시Login",
    롯데홈쇼핑SignUp: "from 롯데홈쇼핑SignUp",
  },
  carrier: {
    [carrier.KT]: "MNO",
    [carrier.KT_MVNO]: "MVNO",
  },
});
