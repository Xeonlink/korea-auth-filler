import { Profile } from "@/utils/Profile";
import {
  expect,
  test,
  type FrameLocator,
  type Locator,
  type Page,
  type TestStepInfo,
} from "@playwright/test";

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

  public async prepare(profile: Profile) {
    this.profile = profile;
  }

  public async step(title: string, fn: (root: T, info: TestStepInfo) => Promise<void>) {
    expect(this.profile).toBeDefined();

    return test.step(title, async (info) => {
      await fn(this.root, info);
    });
  }
}
