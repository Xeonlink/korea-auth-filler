import { BaseAuthPage } from "./base";
import { expect, Page } from "@playwright/test";

export class KG모빌리언스Page extends BaseAuthPage<Page> {
  public async expectSMS인증View() {
    expect(this.profile).toBeDefined();

    const SMS인증View = this.root.locator("#smsStep1");
    {
      await expect(SMS인증View).toBeVisible();
    }
  }

  public async expectPASS인증View() {
    expect(this.profile).toBeDefined();

    const PASS인증View = this.root.locator("#pushStep1");
    {
      await expect(PASS인증View).toBeVisible();
    }
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByPlaceholder("이름 입력").filter({ visible: true });
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect주민번호앞자리filled() {
    expect(this.profile).toBeDefined();

    const 주민번호앞자리Input = this.root.locator("#birthYMD");
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(this.profile!.주민번호.앞자리);
    }
  }

  public async expect주민번호뒷자리filled() {
    expect(this.profile).toBeDefined();

    const 주민번호뒷자리Input = this.root.locator("#birthSF");
    {
      await expect(주민번호뒷자리Input).toBeVisible();
      await expect(주민번호뒷자리Input).toHaveValue(this.profile!.주민번호.성별숫자);
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
