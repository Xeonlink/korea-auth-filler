import { BaseAuthPage } from "./base";
import { expect, Page } from "@playwright/test";

export class TossAuthPage extends BaseAuthPage<Page> {
  public async expectTossAuthPage() {
    await expect(this.root).toHaveURL("https://auth.cert.toss.im/type-info");
  }

  public async expec이름Filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByLabel("이름");
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect전화번호Filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByLabel("휴대폰번호");
    {
      await expect(전화번호Input).toBeVisible();
      const 전화번호 = this.profile!.전화번호.전체.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
      await expect(전화번호Input).toHaveValue(전화번호);
    }
  }

  public async expect생년월일Filled() {
    expect(this.profile).toBeDefined();

    const 생년월일Input = this.root.getByLabel("생년월일 6자리");
    {
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(this.profile!.생년월일.substring(2));
    }
  }
}
