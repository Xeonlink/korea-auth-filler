import { expect } from "@playwright/test";
import { BaseAuthPage } from "./base";

export class 드림시큐리티Page extends BaseAuthPage {
  public async expectSMS인증View() {
    expect(this.profile).toBeDefined();

    const SMS인증View = this.root.locator("#sms_01");
    {
      await expect(SMS인증View).toBeVisible();
    }
  }

  public async expectPASS인증View() {
    expect(this.profile).toBeDefined();

    const PASS인증View = this.root.locator("#pass_01");
    {
      await expect(PASS인증View).toBeVisible();
    }
  }

  public async expectQR인증View() {
    expect(this.profile).toBeDefined();

    const QR인증View = this.root.locator("#pass_02");
    {
      await expect(QR인증View).toBeVisible();
    }
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByLabel("이름").filter({ visible: true });
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect주민번호앞자리filled() {
    expect(this.profile).toBeDefined();

    const 생년월일Input = this.root.getByLabel("생년월일 6자리").filter({ visible: true });
    {
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(this.profile!.생년월일.substring(2));
    }
  }

  public async expect주민번호뒷자리filled() {
    expect(this.profile).toBeDefined();

    const 주민번호뒷자리Input = this.root
      .getByLabel("주민등록번호 뒤 첫번째 자리")
      .filter({ visible: true });
    {
      await expect(주민번호뒷자리Input).toBeVisible();
      await expect(주민번호뒷자리Input).toHaveValue(this.profile!.주민번호.성별숫자 ?? "");
    }
  }

  public async expect휴대폰번호filled() {
    expect(this.profile).toBeDefined();

    const 휴대폰번호Input = this.root.getByLabel("휴대폰번호").filter({ visible: true });
    {
      await expect(휴대폰번호Input).toBeVisible();
      await expect(휴대폰번호Input).toHaveValue(this.profile!.전화번호.전체);
    }
  }
}
