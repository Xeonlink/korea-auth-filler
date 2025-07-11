import { BaseAuthPage } from "./base";
import { expect } from "@playwright/test";

export class 넥스원소프트Page extends BaseAuthPage {
  public async expectProviderView() {
    const locator = this.root.locator(`form.ns-step1`);
    await expect(locator).toBeVisible();
  }

  public async selectProvider(provider: string) {
    const locator = this.root.getByText(provider);
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  public async expect채우기View() {
    const locator = this.root.locator(`form.ns-step2`);
    await expect(locator).toBeVisible();
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByLabel("이름");
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect생년월일filled() {
    expect(this.profile).toBeDefined();

    const 생년월일Input = this.root.getByLabel("생년월일");
    {
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(this.profile!.생년월일);
    }
  }

  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByLabel("휴대폰 번호");
    {
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }
}
