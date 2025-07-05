import { 모바일신분증Page } from "./모바일신분증Page";
import { 한국모바일인증Page } from "./한국모바일인증Page";
import { BaseGatePage } from "./base";

export class 강원도LoginPage extends BaseGatePage {
  protected url = "https://state.gwd.go.kr/portal/minwon/epeople/counsel";

  public async open모바일신분증(): Promise<모바일신분증Page> {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_06").click();
    const mobileIdPage = new 모바일신분증Page(await pagePromise);
    return mobileIdPage;
  }

  public async open한국모바일인증(): Promise<한국모바일인증Page> {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_03").click();
    const mobileIdPage = new 한국모바일인증Page(await pagePromise);
    return mobileIdPage;
  }
}
