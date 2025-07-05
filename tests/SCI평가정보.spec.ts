import { carrier, way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";
import { test } from "./index";

test.describe("from 대전시", () => {
  test.describe("MNO", () => {
    test("SMS", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.SMS,
      };
      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectSmsAuthPage("MNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect주민번호앞자리Filled();
      await page.expect주민번호성별Filled();
      await page.expect전화번호Filled();
    });

    test("PASS", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.PASS,
      };
      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectPassAuthPage("MNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect전화번호Filled();
    });

    test("QR", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.QR,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectQrAuthPage("MNO");
    });
  });

  test.describe("MVNO", () => {
    test("SMS", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.SMS,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectSmsAuthPage("MVNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect주민번호앞자리Filled();
      await page.expect주민번호성별Filled();
      await page.expect전화번호Filled();
    });

    test("PASS", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.PASS,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectPassAuthPage("MVNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect전화번호Filled();
    });

    test("QR", async ({ popupPage, _대전시LoginPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.QR,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _대전시LoginPage.goto();
      const page = await _대전시LoginPage.openSCI평가정보();
      await page.expectQrAuthPage("MVNO");
    });
  });
});

test.describe("from 롯데홈쇼핑", () => {
  test.describe("MNO", () => {
    test("SMS", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.SMS,
      };
      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectSmsAuthPage("MNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect주민번호앞자리Filled();
      await page.expect주민번호성별Filled();
      await page.expect전화번호Filled();
    });

    test("PASS", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.PASS,
      };
      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectPassAuthPage("MNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect전화번호Filled();
    });

    test("QR", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT,
        way: way.QR,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectQrAuthPage("MNO");
    });
  });

  test.describe("MVNO", () => {
    test("SMS", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.SMS,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectSmsAuthPage("MVNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect주민번호앞자리Filled();
      await page.expect주민번호성별Filled();
      await page.expect전화번호Filled();
    });

    test("PASS", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.PASS,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectPassAuthPage("MVNO");

      await page.prepare(rawProfile);
      await page.expect이름Filled();
      await page.expect전화번호Filled();
    });

    test("QR", async ({ popupPage, _롯데홈쇼핑SignupPage, mockRawProfile }) => {
      const rawProfile: Omit<RawProfile, "id"> = {
        ...mockRawProfile,
        carrier: carrier.KT_MVNO,
        way: way.QR,
      };

      await popupPage.goto();
      await popupPage.addProfile(rawProfile);
      await popupPage.selectProfile(0);

      await _롯데홈쇼핑SignupPage.goto("domcontentloaded");
      const page = await _롯데홈쇼핑SignupPage.openSCI평가정보();
      await page.expectQrAuthPage("MVNO");
    });
  });
});
