import { defineHandler } from ".";
import type { IProfile } from "@/utils/type";
import { qAll, waitUntilDomIdle } from "@/utils/utils";
import { Page } from "@/utils/Page";

/**
 * 테스트 주소
 * - 디지털원패스 : https://www.onepass.go.kr/membership/find/id
 */

defineHandler("toss", {
  isMatch: (page) => {
    return page.url.href.startsWith("https://auth.cert.toss.im/type-info");
  },
  fill: async (page, profile, _options) => {
    const 탭Items = qAll<HTMLLIElement>(".tab__item");

    for (const 탭Item of 탭Items) {
      탭Item.addEventListener("click", () => {
        waitUntilDomIdle(() => fill(page, profile), 50);
      });
    }

    await fill(page, profile);
  },
});

async function fill(page: Page, profile: IProfile) {
  await page.input("#text-field-line-1").visible().fill(profile.이름);
  await page.input("#text-field-line-2").visible().fill(profile.전화번호.전체);
  await page.input("#text-field-line-3").visible().fill(profile.생년월일.substring(2));
  page.qById("checkbox-circle-:r9:")?.click();
}
