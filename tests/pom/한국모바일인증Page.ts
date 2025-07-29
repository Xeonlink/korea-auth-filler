import { expect, Page } from "@playwright/test";
import { BaseAuthPage } from "./base";

export class 한국모바일인증Page extends BaseAuthPage<Page> {
  public async expectSmsAuthPage() {
    await expect(this.root).toHaveURL("https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp");
  }

  public async expectPassAuthPage() {
    await expect(this.root).toHaveURL(
      "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
    );
  }

  public async expectQrAuthPage() {
    await expect(this.root).toHaveURL("https://www.kmcert.com/kmcis/qr_web_v5/kmcisQr01.jsp");
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByPlaceholder("이름");
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect주민번호앞자리filled() {
    expect(this.profile).toBeDefined();

    const 주민번호앞자리Input = this.root.getByPlaceholder("생년월일 6자리");
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(this.profile!.주민번호.앞자리);
    }
  }

  public async expect주민번호성별filled() {
    expect(this.profile).toBeDefined();

    const 주민번호성별Input = this.root.getByLabel("주민등록번호 뒤 첫번째 자리");
    {
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(this.profile!.주민번호.성별숫자);
    }
  }

  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByPlaceholder("휴대폰번호");
    {
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }

  public async expect보안문자Focuced() {
    const 보안문자Input = this.root.getByPlaceholder("보안문자");
    {
      await expect(보안문자Input).toBeVisible();
      await expect(보안문자Input).toBeFocused();
    }
  }
}
