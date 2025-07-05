import { BaseGatePage } from "./base";
import { SCI평가정보Page } from "./SCI평가정보Page";

export class 롯데홈쇼핑SignupPage extends BaseGatePage {
  protected url = "https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte";

  public async openSCI평가정보() {
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByLabel("동의하기").check();
    await this.page.getByText("휴대폰 인증").click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new SCI평가정보Page(page);
  }
}
