import { TestDetails, test } from "@playwright/test";

// Prettier-ignore
type Cases<T extends Record<string, any>> = {
  [key in keyof T]: Partial<Record<T[key], string | (TestDetails & { title: string })>>;
};

function _allcase<T extends Record<string, any>>(
  cases: Cases<T>,
  index: number,
  current: T,
  keys: string[],
  callback: (variables: T) => void,
) {
  if (index === keys.length) {
    callback(current);
    return;
  }

  for (const [key, value] of Object.entries(cases[keys[index]])) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    current[keys[index]] = key;

    if (typeof value === "string") {
      test.describe(value as string, () => {
        _allcase(cases, index + 1, current, keys, callback);
      });
    } else {
      const { title, ...details } = value as TestDetails & { title: string };
      test.describe(title, details, () => {
        _allcase(cases, index + 1, current, keys, callback);
      });
    }
    delete current[key];
  }
}

export function allcase<T extends Record<string, any>>(
  callback: (variables: T) => void,
  cases: Cases<T>,
) {
  _allcase(cases, 0, {} as T, Object.keys(cases), callback);
}

export function allcase2<T extends Record<string, any>>(callback: (variables: T) => void) {
  return {
    regist: (cases: Cases<T>) => {
      _allcase(cases, 0, {} as T, Object.keys(cases), callback);
    },
  };
}
