import { Profile } from "@/utils/Profile";
import type { RawProfile } from "@/utils/type";
import type { FrameLocator, Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

type WaitUntil = Required<Required<Parameters<Page["goto"]>>[1]>["waitUntil"];

export class BaseGatePage {
  protected page: Page;
  protected url: string | null;

  public constructor(page: Page) {
    this.page = page;
    this.url = null;
  }

  public async goto(waitUntil: WaitUntil = "networkidle") {
    expect(this.url).not.toBeNull();

    await this.page.goto(this.url!, {
      waitUntil,
    });
  }
}

type RootType = Page | FrameLocator | Locator;

export class BaseAuthPage<T extends RootType = RootType> {
  protected profile: Profile | null;
  protected root: T;

  public constructor(root: T) {
    this.profile = null;
    this.root = root;
  }

  public async prepare(rawProfile: Omit<RawProfile, "id">) {
    const profile = new Profile(rawProfile);
    this.profile = profile;
  }

  public async expect<T>(
    rawProfile: Omit<RawProfile, "id">,
    tester: (page: this) => Promise<T>,
  ): Promise<T> {
    const profile = new Profile(rawProfile);
    this.profile = profile;
    const result = await tester(this);
    this.profile = null;
    return result;
  }
}
