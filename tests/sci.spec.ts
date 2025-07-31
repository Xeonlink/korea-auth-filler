import { carrier, way } from "@/utils/constants";
import { test } from "./index";
import { poms } from "./pom/PomPage";
import type { CarrierCode } from "@/utils/type";

test.describe("from 대전시", () => {
  const callback = (carrier: CarrierCode) => {
    test("SMS", async ({ popupPage, gate, profile, poms }) => {
      profile.mod({ carrier, way: way.SMS });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const root = await gate.대전시Login.openSCI평가정보();
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

      await gate.대전시Login.goto();
      const root = await gate.대전시Login.openSCI평가정보();
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

      await gate.대전시Login.goto();
      const root = await gate.대전시Login.openSCI평가정보();
      const pom = poms.sci(root, profile);

      await pom.step("QR인증View", async (expect) => {
        await expect.qrAuthView(profile.통신3사 ? "MNO" : "MVNO");
      });
    });
  };

  test.describe("MNO", () => callback(carrier.KT));
  test.describe("MVNO", () => callback(carrier.KT_MVNO));
});
