import { BaseGatePage } from "./base";
import { OKnamePage } from "./OKnamePage";
import { TossAuthPage } from "./TossAuthPage";

export class 디지털원패스FindIdPage extends BaseGatePage {
  protected url = "https://www.onepass.go.kr/membership/find/id";

  public async open_okname(): Promise<OKnamePage> {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("link", { name: "휴대폰 인증" }).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new OKnamePage(page);
  }

  public async open토스인증() {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("link", { name: "토스인증" }).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new TossAuthPage(page);
  }
}
