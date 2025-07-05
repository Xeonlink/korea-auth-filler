import { BaseGatePage } from "./base";
import { NHN_KCPPage } from "./NHN_KCPPage";

export class Cafe24SignUpPage extends BaseGatePage {
  protected url = "https://user.cafe24.com/join/hosting/general/?page=step1&landTime=1751035289";

  public async openNHN_KCP(): Promise<NHN_KCPPage> {
    await this.page.locator("#agreeAll").check({ force: true });
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("link", { name: " 휴대폰 인증" }).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new NHN_KCPPage(page);
  }
}
