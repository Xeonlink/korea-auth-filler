import { Profile } from "@/utils/Profile";
import type { RawProfile } from "@/utils/type";
import type { FrameLocator, Locator, Page } from "@playwright/test";

export type WaitUntil = Required<Required<Parameters<Page["goto"]>>[1]>["waitUntil"];

export abstract class BaseGatePage {
  protected page: Page;
  protected abstract url: string;

  public constructor(page: Page) {
    this.page = page;
  }

  public async goto(waitUntil: WaitUntil = "networkidle") {
    await this.page.goto(this.url, {
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
