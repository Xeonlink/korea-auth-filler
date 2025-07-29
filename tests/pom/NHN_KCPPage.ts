import { expect, Page } from "@playwright/test";
import { BaseAuthPage } from "./base";

export class NHN_KCPPage extends BaseAuthPage<Page> {
  public async expectSmsAuthPage() {
    await expect(this.root).toHaveURL("https://cert.kcp.co.kr/cert/pc/smsForm.jsp");
  }

  public async expectPassAuthPage() {
    await expect(this.root).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");
  }

  public async expectQrAuthPage() {
    await expect(this.root).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByPlaceholder("성명입력");
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect주민번호앞자리filled() {
    expect(this.profile).toBeDefined();

    const 주민번호앞자리Input = this.root.getByTitle("주민등록번호 앞 6자리");
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(this.profile!.주민번호.앞자리);
    }
  }

  public async expect주민번호성별filled() {
    expect(this.profile).toBeDefined();

    const 주민번호성별Input = this.root.getByTitle("주민등록번호 뒤 첫번째 자리");
    {
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(this.profile!.주민번호.성별숫자);
    }
  }

  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByPlaceholder("숫자만 입력").filter({ visible: true });
    {
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }
}
