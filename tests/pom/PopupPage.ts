import { Profile } from "@/utils/Profile";
import { RawProfile } from "@/utils/type";
import { Page } from "@playwright/test";

export class PopupPage {
  private readonly page: Page;
  private readonly extensionId: string;

  constructor(page: Page, extensionId: string) {
    this.page = page;
    this.extensionId = extensionId;
  }

  /**
   * 팝업 페이지로 이동
   */
  private async _goto() {
    return await this.page.goto(`chrome-extension://${this.extensionId}/popup.html`, {
      waitUntil: "domcontentloaded",
    });
  }

  /**
   * 프로필 추가
   * @param rawProfile 프로필 정보
   */
  private async _addProfile(rawProfile: Omit<RawProfile, "id">) {
    await this.page.locator(`input[name="name"]`).fill(rawProfile.name);
    await this.page.locator(`select[name="carrier"]`).selectOption(rawProfile.carrier);
    await this.page.locator(`input[name="phone_number"]`).fill(rawProfile.phone_number);
    await this.page.locator(`input[name="birth"]`).fill(rawProfile.birth);
    await this.page.locator(`select[name="foreigner"]`).selectOption(rawProfile.foreigner);
    await this.page.locator(`select[name="gender"]`).selectOption(rawProfile.gender);
    await this.page.locator(`select[name="way"]`).selectOption(rawProfile.way);
    await this.page.locator(`button[type="submit"]`).click();
  }

  /**
   * 프로필 선택
   * @param index 프로필 인덱스
   */
  private async _selectProfile(index: number) {
    const ul = this.page.locator("main ul");
    const li = ul.nth(index);
    const button = li.getByRole("button").nth(0);
    await button.click();
  }

  /**
   * 프로필 삭제
   * @param index 프로필 인덱스
   */
  private async _removeProfile(index: number) {
    const ul = this.page.locator("main ul");
    const li = ul.nth(index);
    const button = li.getByRole("button").nth(1);
    await button.click();
  }

  /**
   * 프로필 준비
   * @param profile 프로필 정보
   */
  public async prepare(profile: Profile) {
    await this._goto();
    await this._addProfile(profile.raw);
    await this._selectProfile(0);
  }
}
