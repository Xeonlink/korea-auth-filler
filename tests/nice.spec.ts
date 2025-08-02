import { test } from ".";
import { way } from "@/utils/constants";
import { allcase2 } from "./utils/testcase";

type Var = {
  gateKey: "서울시Login" | "부산시FindId";
};

const testcase = allcase2<Var>((variables) => {
  const { gateKey } = variables;

  test("SMS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView();
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.전화번호filled();
    });
  });

  test("PASS", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.PASS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });

  test("QR", async ({ popupPage, gate, profile, poms }) => {
    profile.mod({ way: way.QR });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].openNICE평가정보();
    const pom = poms.nice(root, profile);

    await pom.step("QR인증View", async (expect) => {
      await expect.qrAuthView();
    });
  });
});

testcase.regist({
  gateKey: {
    서울시Login: "from 서울시Login",
    부산시FindId: "from 부산시FindId",
  },
});
