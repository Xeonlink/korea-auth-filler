import { test } from ".";
import { carrier } from "@/utils/constants";
import { way } from "@/utils/constants";

test.describe("from 디지털원패스", () => {
  test("-", async ({ popupPage, gate, profile }) => {
    profile.mod({ carrier: carrier.KT, way: way.SMS });
    await popupPage.prepare(profile);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.open토스인증();
    await page.expect토스인증Page();

    await page.prepare(profile);
    await page.expec이름filled();
    await page.expect전화번호filled();
    await page.expect생년월일filled();
    await page.expect개인정보동의checked();
    await page.expect인증하기active();
  });
});
