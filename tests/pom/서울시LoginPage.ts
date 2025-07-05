import { BaseGatePage } from "./base";
import { NICE평가정보Page } from "./NICE평가정보Page";
import { OACXPage } from "./OACXPage";

export class 서울시LoginPage extends BaseGatePage {
  protected url = "https://www.seoul.go.kr/member/userlogin/loginCheck.do";

  public async openNICE평가정보(): Promise<NICE평가정보Page> {
    await this.page.getByRole("link", { name: "본인확인 로그인" }).click();
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("button", { name: "휴대폰" }).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    return new NICE평가정보Page(page);
  }

  public async openOACX(): Promise<OACXPage> {
    await this.page.getByRole("link", { name: "본인확인 로그인" }).click();
    const pagePromise = this.page.context().waitForEvent("page");
    await this.page.getByRole("button", { name: "민간인증서" }).click();
    const page = await pagePromise;
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000 * 3);
    return new OACXPage(page);
  }
}
