import { way } from "@/utils/constants";
import { test } from "./index";

const callback = (gateKey: "ktSignUp" | "인터파크티켓_본인인증" | "강원도Login") => {
  test("SMS", async ({ gate, popupPage, profile, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open한국모바일인증();
    const pom = poms.kmcert(root, profile);

    await pom.step("SMS인증View", async (expect) => {
      await expect.smsAuthView();
      await expect.이름filled();
      await expect.주민번호앞자리filled();
      await expect.주민번호성별filled();
      await expect.전화번호filled();
    });
  });

  test("PASS", async ({ gate, popupPage, profile, poms }) => {
    profile.mod({ way: way.PASS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open한국모바일인증();
    const pom = poms.kmcert(root, profile);

    await pom.step("PASS인증View", async (expect) => {
      await expect.passAuthView();
      await expect.이름filled();
      await expect.전화번호filled();
    });
  });

  test("QR", async ({ gate, popupPage, profile, poms }) => {
    profile.mod({ way: way.QR });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open한국모바일인증();
    const pom = poms.kmcert(root, profile);

    await pom.step("QR인증View", async (expect) => {
      await expect.qrAuthView();
    });
  });
};

test.describe("from 강원도Login", () => callback("강원도Login"));
test.describe("from ktSignUp", () => callback("ktSignUp"));
test.describe("from 인터파크 티켓 본인인증", () => callback("인터파크티켓_본인인증"));
