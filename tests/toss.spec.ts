import { test } from ".";
import { carrier } from "@/utils/constants";
import { way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";

test.describe("from 디지털원패스", () => {
  test("-", async ({ popupPage, gate, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };

    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await gate.디지털원패스FindId.goto();
    const page = await gate.디지털원패스FindId.open토스인증();
    await page.expect토스인증Page();

    await page.prepare(rawProfile);
    await page.expec이름Filled();
    await page.expect전화번호Filled();
    await page.expect생년월일Filled();
  });
});
