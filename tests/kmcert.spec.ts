import { gender, way } from "@/utils/constants";
import { test } from "./index";
import { expect } from "@playwright/test";

const callback = (gateKey: "ktSignUp" | "인터파크티켓_본인인증") => {
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

test.describe("kmcert v5", () => {
  test.describe("www.kmcert.com", () => {
    callback("ktSignUp");
  });
  test.describe("evt.kmcert.com", () => {
    callback("인터파크티켓_본인인증");
  });
});

test.describe("kmcert v2", () => {
  test.describe("normal", () => {
    test("SMS", async ({ gate, popupPage, profile }) => {
      profile.mod({ way: way.SMS });
      await popupPage.prepare(profile);

      await gate.본인확인_즉시차단해제.goto();
      const root = await gate.본인확인_즉시차단해제.open한국모바일인증();

      await test.step("SMS인증View", async () => {
        await expect(root).toHaveURL("https://www.kmcert.com/kmcis/web_v2/kmcisSms01.jsp");
        await expect(root.locator("#name")).toHaveValue(profile.이름);
        await expect(root.locator("#Birth")).toHaveValue(profile.생년월일);
        if (profile.성별 === gender.MALE) {
          await expect(root.locator("#man")).toHaveClass("active");
          await expect(root.locator("#woman")).not.toHaveClass("active");
        } else {
          await expect(root.locator("man")).toHaveClass("active");
          await expect(root.locator("woman")).not.toHaveClass("active");
        }
        await expect(root.locator("#No")).toHaveValue(profile.전화번호.전체);
        await expect(root.locator("#securityNum")).toHaveValue(/[0-9]{5}/);
      });
    });

    test("PASS", async ({ gate, popupPage, profile }) => {
      profile.mod({ way: way.PASS });
      await popupPage.prepare(profile);

      await gate.본인확인_즉시차단해제.goto();
      const root = await gate.본인확인_즉시차단해제.open한국모바일인증();

      await test.step("PASS인증View", async () => {
        await expect(root).toHaveURL("https://www.kmcert.com/kmcis/simpleCert_web/kmcisApp01.jsp");
        await expect(root.locator("#name")).toHaveValue(profile.이름);
        await expect(root.locator("#No")).toHaveValue(profile.전화번호.전체);
        await expect(root.locator("#securityNum")).toHaveValue(/[0-9]{5}/);
      });
    });
  });
});
