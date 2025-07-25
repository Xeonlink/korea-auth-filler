import { expect } from "@playwright/test";
import { BaseAuthPage } from "./base";
import { toHyphenPhone } from "@/utils/utils";

export class OACXPage extends BaseAuthPage {
  public async unvailRoot() {
    return this.root;
  }

  public async expect이름filled() {
    expect(this.profile).toBeDefined();

    // const 이름Input = this.root.locator(`input[data-id="oacx_name"]`);
    const 이름Input = this.root.getByTitle("이름").filter({ visible: true });
    {
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(this.profile!.이름);
    }
  }

  public async expect생년원일filled() {
    expect(this.profile).toBeDefined();

    // const 생년원일Input = this.root.locator(`input[data-id="oacx_birth"]`);
    const 생년원일Input = this.root.getByTitle("생년월일 여덟자리").filter({ visible: true });
    {
      await expect(생년원일Input).toBeVisible();
      await expect(생년원일Input).toHaveValue(this.profile!.생년월일);
    }
  }

  public async expect통신사filled() {
    expect(this.profile).toBeDefined();

    // const 통신사Select = this.root.locator(`select[data-id="oacx_phone0"]`);
    const 통신사Select = this.root.getByTitle("통신사 선택").filter({ visible: true });
    {
      await expect(통신사Select).toBeVisible();
      await expect(통신사Select).toHaveValue(
        this.profile!.map.통신사("S", "K", "L", "S", "K", "L"),
      );
    }
  }

  public async expect전화번호앞자리filled() {
    expect(this.profile).toBeDefined();

    // const 전화번호앞자리Select = this.root.locator(`select[data-id="oacx_phone1"]`);
    const 전화번호앞자리Select = this.root
      .getByTitle("휴대폰번호 앞자리 선택")
      .filter({ visible: true });
    {
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(this.profile!.전화번호.앞3자리);
    }
  }

  public async expect전화번호뒷자리filled() {
    expect(this.profile).toBeDefined();

    // const 전화번호뒷자리Input = this.root.locator(`input[data-id="oacx_phone2"]`);
    const 전화번호뒷자리Input = this.root
      .getByTitle("휴대폰번호 뒷자리 여덟자리") // normal
      .or(this.root.getByTitle("휴대폰번호 뒷자리 일곱 또는 여덟자리")) // legacy
      .filter({ visible: true });
    {
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(this.profile!.전화번호.뒷8자리);
    }
  }

  public async expect주민번호앞자리filled() {
    expect(this.profile).toBeDefined();

    // const 주민번호앞자리Input = this.root.locator(`input[data-id="oacx_num1"]`);
    const 주민번호앞자리Input = this.root
      .getByTitle("주민등록번호 앞자리")
      .filter({ visible: true });
    {
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(this.profile!.주민번호.앞자리);
    }
  }

  public async expect주민번호뒷자리filled() {
    expect(this.profile).toBeDefined();

    // const 주민번호성별Input = this.root.locator(`input[data-id="oacx_num2"]`);
    const 주민번호성별Input = this.root.getByTitle("주민등록번호 뒷자리").filter({ visible: true });
    {
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(this.profile!.주민번호.성별숫자 ?? "");
    }
  }

  public async expect모든동의Checked() {
    const 동의Inputs = await this.root
      .locator(`.agree input[type="checkbox"]`)
      .filter({ visible: true })
      .all();
    for (const 동의Input of 동의Inputs) {
      await expect(동의Input).toBeVisible();
      await expect(동의Input).toBeChecked();
    }
  }

  /**
   * raon 전용
   */
  public async expect전화번호filled() {
    expect(this.profile).toBeDefined();

    // const 전화번호Input = this.root.locator(`input[data-id="oacx_phone2"]`);
    const 전화번호Input = this.root
      .getByTitle("휴대폰번호 숫자11자리입력")
      .filter({ visible: true });
    {
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(toHyphenPhone(this.profile!.전화번호.전체));
    }
  }
}
