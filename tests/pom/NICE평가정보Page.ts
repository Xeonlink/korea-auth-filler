import { expect, Page } from "@playwright/test";
import { BaseAuthPage } from "./base";

export class NICE평가정보Page extends BaseAuthPage<Page> {
  public async expectSmsAuthPage() {
    await expect(this.root).toHaveURL(
      "https://nice.checkplus.co.kr/cert/mobileCert/sms/certification",
    );
  }

  public async expectPassAuthPage() {
    await expect(this.root).toHaveURL(
      "https://nice.checkplus.co.kr/cert/mobileCert/push/certification",
    );
  }

  public async expectQrAuthPage() {
    await expect(this.root).toHaveURL(
      "https://nice.checkplus.co.kr/cert/mobileCert/qr/certification",
    );
  }

  public async expect이름Filled(strict: boolean = true) {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByPlaceholder("이름");
    {
      if (strict) {
        await expect(이름Input).toBeVisible();
      }
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect주민번호앞자리Filled() {
    expect(this.profile).toBeDefined();

    const 주민번호앞자리Input = this.root.getByPlaceholder("생년월일 6자리");
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(this.profile!.주민번호.앞자리);
    }
  }

  public async expect주민번호성별Filled() {
    expect(this.profile).toBeDefined();

    const 주민번호성별Input = this.root.getByLabel("주민등록번호 뒤 첫번째 자리");
    {
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(this.profile!.주민번호.성별숫자 ?? "");
    }
  }

  public async expect전화번호Filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByPlaceholder("휴대폰번호");
    {
      //   await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }
}
