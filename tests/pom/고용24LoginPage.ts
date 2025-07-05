import { 모바일신분증Page } from "./모바일신분증Page";
import { BaseGatePage } from "./base";

export class 고용24LoginPage extends BaseGatePage {
  protected url =
    "https://www.work24.go.kr/cm/z/b/0210/openLginPageForAnyId.do?loginGbn=EBM01&untySsoFlag=Y#/";

  public async open모바일신분증(): Promise<모바일신분증Page> {
    await this.page.getByRole("link", { name: "모바일 신분증" }).first().click();
    await this.page.waitForLoadState("networkidle");
    const locator = this.page.locator("#mipEmbededContents");
    await locator.waitFor({ state: "visible" });
    return new 모바일신분증Page(locator);
  }
}
