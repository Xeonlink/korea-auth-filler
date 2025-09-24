import { way } from "@/utils/constants";
import { test } from ".";

const callback = (gateKey: "paycoLogin") => {
  test("SMS | PASS", async ({ gate, popupPage, profile, poms }) => {
    profile.mod({ way: way.SMS });
    await popupPage.prepare(profile);

    await gate[gateKey].goto();
    const root = await gate[gateKey].open페이코();
    const pom = poms.payco(root, profile);

    const REPEAT_COUNT = 2;
    for (let i = 0; i < REPEAT_COUNT; i++) {
      await pom.step(`SMS인증View ${i}`, async (expect) => {
        await expect.gotoSmsAuthView();
        await expect.이름filled();
        await expect.주민번호앞자리filled();
        await expect.주민번호성별filled();
        await expect.통신사selected();
        await expect.전화번호filled();
        await expect.인증요청active();
      });

      await pom.step(`PASS인증View ${i}`, async (expect) => {
        await expect.gotoPassAuthView();
        await expect.이름filled();
        await expect.통신사selected();
        await expect.전화번호filled();
      });
    }
  });
};

test.describe("normal", () => callback("paycoLogin"));
