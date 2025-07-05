import { test } from ".";
import { carrier } from "@/utils/constants";
import { way } from "@/utils/constants";
import { RawProfile } from "@/utils/type";

test.describe("from 디지털원패스", () => {
  test("-", async ({ popupPage, _디지털원패스FindIdPage, mockRawProfile }) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      ...mockRawProfile,
      carrier: carrier.KT,
      way: way.SMS,
    };

    await popupPage.goto();
    await popupPage.addProfile(rawProfile);
    await popupPage.selectProfile(0);

    await _디지털원패스FindIdPage.goto();
    const page = await _디지털원패스FindIdPage.open토스인증();
    await page.expectTossAuthPage();

    await page.prepare(rawProfile);
    await page.expec이름Filled();
    await page.expect전화번호Filled();
    await page.expect생년월일Filled();
  });
});
