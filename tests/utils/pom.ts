import type { Profile } from "@/utils/Profile";
import type { FrameLocator, Locator, Page, TestStepInfo } from "@playwright/test";
import { test } from "@playwright/test";

type RootType = Page | Locator | FrameLocator;

// Type MethodName = `expect${string}${"View" | "filled"}` | `action${string}`;

type AuthView<T extends RootType> = {
  [key: string]: (root: T, profile: Profile, variables: never) => Promise<void>;
};

// Prettier-ignore
type AuthUseView<T extends AuthView<never>> = {
  [key in keyof T]: T[key] extends (...args: any[]) => Promise<void>
    ? Parameters<T[key]>[2] extends undefined
      ? () => ReturnType<T[key]>
      : (variables: Parameters<T[key]>[2]) => ReturnType<T[key]>
    : never;
};

export function rootType<R extends RootType>() {
  return <T extends AuthView<R>>(authViewDef: T) =>
    (root: R, profile: Profile) => {
      const base = Object.fromEntries(
        Object.entries(authViewDef).map(([key, fn]) => [key, fn.bind(null, root, profile)]),
      ) as unknown as AuthUseView<T>;

      const step = async <R>(
        name: string,
        fn: (expect: AuthUseView<T>, info: TestStepInfo) => Promise<R>,
      ): Promise<R> => await test.step(name, async (info) => await fn(base, info));

      return {
        step,
      };
    };
}
