import { 모바일신분증Page } from "./모바일신분증Page";
import { BaseGatePage } from "./base";
import { OACXPage } from "./OACXPage";

export class 홈택스LoginPage extends BaseGatePage {
  protected url =
    "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&initPage=agitxLogin";

  public async open모바일신분증(): Promise<모바일신분증Page> {
    await this.page.locator("#mf_txppWframe_anchor16").click();
    await this.page.locator("#mf_txppWframe_anchor24").click();
    const frameLocator = this.page.frameLocator("iframe[title='모바일신분증 인증']");
    const mobileIdPage = new 모바일신분증Page(frameLocator);
    return mobileIdPage;
  }

  public async openOACX(): Promise<OACXPage> {
    const frameLocator = this.page.frameLocator("iframe[name='simple_iframeView']");
    await this.page.getByRole("button", { name: "간편 인증" }).filter({ visible: true }).click();
    await this.page.getByTitle("간편인증").filter({ visible: true }).click();
    const oacxPage = new OACXPage(frameLocator);
    return oacxPage;
  }
}
