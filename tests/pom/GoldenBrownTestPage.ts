import { BaseGatePage } from "./base";
import { NHN_KCPPage } from "./NHN_KCPPage";

export class GoldenBrownTestPage extends BaseGatePage {
  protected url = "https://www.goldenbrown.co.kr/_api/_nhnkcp/kcpcert_api/sample/make_hash.php";

  public async openNHN_KCP(): Promise<NHN_KCPPage> {
    await this.page.getByRole("link", { name: "hash 생성요청" }).click();
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.locator(`input[value="인증요청"]`).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new NHN_KCPPage(page);
  }
}
