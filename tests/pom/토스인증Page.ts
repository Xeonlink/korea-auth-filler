import { BaseAuthPage } from "./base";
import { expect, Page } from "@playwright/test";

export class 토스인증Page extends BaseAuthPage<Page> {
  public async expect토스인증Page() {
    await expect(this.root).toHaveURL("https://auth.cert.toss.im/type-info");
  }

  public async expec이름filled() {
    expect(this.profile).toBeDefined();

    const 이름Input = this.root.getByLabel("이름");
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    const 전화번호Input = this.root.getByLabel("휴대폰번호");
    {
      await expect(전화번호Input).toBeVisible();
      const 전화번호 = this.profile!.전화번호.전체.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
      await expect(전화번호Input).toHaveValue(전화번호);
    }
  }

  public async expect생년월일filled() {
    expect(this.profile).toBeDefined();

    const 생년월일Input = this.root.getByLabel("생년월일 6자리");
    {
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(this.profile!.생년월일.substring(2));
    }
  }

  public async expect개인정보동의checked() {
    const 개인정보동의Input = this.root.getByLabel("개인정보 수집", { exact: false });
    {
      await expect(개인정보동의Input).toBeChecked();
    }
  }

  public async expect인증하기active() {
    const 인증하기버튼 = this.root.getByRole("button", { name: "인증하기" });
    {
      await expect(인증하기버튼).toBeVisible();
      await expect(인증하기버튼).toBeEnabled();
    }
  }
}
