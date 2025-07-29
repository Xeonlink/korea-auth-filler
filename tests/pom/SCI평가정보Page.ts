import { BaseAuthPage } from "./base";
import { expect, Page } from "@playwright/test";

export class SCI평가정보Page extends BaseAuthPage<Page> {
  public async expectSmsAuthPage(carrier: "MNO" | "MVNO") {
    await expect(this.root).toHaveURL(
      `https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHp${carrier === "MVNO" ? "Mvno" : ""}Ti01.jsp`,
    );
  }

  public async expectPassAuthPage(carrier: "MNO" | "MVNO") {
    await expect(this.root).toHaveURL(
      `https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHp${carrier === "MVNO" ? "Mvno" : ""}TiApp01.jsp`,
    );
  }

  public async expectQrAuthPage(carrier: "MNO" | "MVNO") {
    await expect(this.root).toHaveURL(
      `https://pcc.siren24.com/pcc_V3/passWebV3/${carrier === "MVNO" ? "mvnoTestQr" : "testqr"}.jsp`,
    );
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

    const 주민번호성별Input = this.root.locator(".myNum.myNum2");
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
}
