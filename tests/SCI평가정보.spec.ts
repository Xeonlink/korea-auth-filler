import { carrier, way } from "@/utils/constants";
import { test } from "./index";

test.describe("from 대전시", () => {
  test.describe("MNO", () => {
    test("SMS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.SMS });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectSmsAuthPage("MNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect주민번호앞자리filled();
      await page.expect주민번호성별filled();
      await page.expect전화번호filled();
    });

    test("PASS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.PASS });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectPassAuthPage("MNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect전화번호filled();
    });

    test("QR", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.QR });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectQrAuthPage("MNO");
    });
  });

  test.describe("MVNO", () => {
    test("SMS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.SMS });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectSmsAuthPage("MVNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect주민번호앞자리filled();
      await page.expect주민번호성별filled();
      await page.expect전화번호filled();
    });

    test("PASS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.PASS });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectPassAuthPage("MVNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect전화번호filled();
    });

    test("QR", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.QR });
      await popupPage.prepare(profile);

      await gate.대전시Login.goto();
      const page = await gate.대전시Login.openSCI평가정보();
      await page.expectQrAuthPage("MVNO");
    });
  });
});

test.describe("from 롯데홈쇼핑", () => {
  test.describe("MNO", () => {
    test("SMS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.SMS });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectSmsAuthPage("MNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect주민번호앞자리filled();
      await page.expect주민번호성별filled();
      await page.expect전화번호filled();
    });

    test("PASS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.PASS });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectPassAuthPage("MNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect전화번호filled();
    });

    test("QR", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT, way: way.QR });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectQrAuthPage("MNO");
    });
  });

  test.describe("MVNO", () => {
    test("SMS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.SMS });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectSmsAuthPage("MVNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect주민번호앞자리filled();
      await page.expect주민번호성별filled();
      await page.expect전화번호filled();
    });

    test("PASS", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.PASS });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectPassAuthPage("MVNO");

      await page.prepare(profile);
      await page.expect이름filled();
      await page.expect전화번호filled();
    });

    test("QR", async ({ popupPage, gate, profile }) => {
      profile.mod({ carrier: carrier.KT_MVNO, way: way.QR });
      await popupPage.prepare(profile);

      await gate.롯데홈쇼핑SignUp.goto({ waitUntil: "domcontentloaded" });
      const page = await gate.롯데홈쇼핑SignUp.openSCI평가정보();
      await page.expectQrAuthPage("MVNO");
    });
  });
});
