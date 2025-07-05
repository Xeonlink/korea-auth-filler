import { BaseGatePage } from "./base";
import { SCI평가정보Page } from "./SCI평가정보Page";

export class 대전시LoginPage extends BaseGatePage {
  protected url = "https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=";

  public async openSCI평가정보() {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("link", { name: "인증하기" }).first().click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new SCI평가정보Page(page);
  }
}
