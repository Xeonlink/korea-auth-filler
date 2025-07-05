import { expect, Locator } from "@playwright/test";
import { BaseAuthPage } from "./base";

export class 모바일신분증Page extends BaseAuthPage {
  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input1 = this.root.locator("input[name='name']");
    const 이름Input2 = this.root.getByPlaceholder("홍길동");
    const 이름Input = 이름Input1.or(이름Input2);
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect전화번호앞자리filled() {
    expect(this.profile).toBeDefined();

    const 전화번호앞자리Select = this.root.locator("select[data-id='phone1']");
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(this.profile!.전화번호.앞3자리);
    }
  }

  public async expect전화번호뒷자리filled() {
    expect(this.profile).toBeDefined();

    const 전화번호뒷자리Input = this.root.locator("input[data-id='phone2']");
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(this.profile!.전화번호.뒷8자리);
    }
  }

  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.locator("input[name='telno']");
    {
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }

  public async expect모든동의Checked() {
    let 동의Inputs: Locator[] = [];

    if (동의Inputs.length === 0) {
      동의Inputs = await this.root.locator(".agree-list input").all();
    }
    if (동의Inputs.length === 0) {
      동의Inputs = await this.root.locator(".agree .pcAgree input").all();
    }

    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }
}
