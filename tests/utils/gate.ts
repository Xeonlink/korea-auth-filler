import { Page } from "@playwright/test";
import { BaseAuthPage } from "../pom/base";

// Definition Types ----------------------------------------------------------------------------------------------
type GateDefMisc = {
  url: string;
}
type GateDefMethod<K extends string> = {
  method: Partial<Record<K, (page: Page) => Promise<BaseAuthPage>>>;
}
type GateDefExtra = {
  extra?: Record<string, (page: Page, variabels: never) => Promise<never | void>>;
}
type GateDef<K extends string> = GateDefMisc & GateDefMethod<K> & GateDefExtra;
type GateDefMap<K extends string> = Record<string, GateDef<K>>;

// Use Types -----------------------------------------------------------------------------------------------------
type GateUseMisc = {
  goto: Page["goto"] extends (url: string, options: infer O) => Promise<infer R> ? (options?: O) => Promise<R> : never;
}
type GateUseMethod<D extends GateDef<string>["method"]> = keyof D extends string ? { 
  [key in keyof D as `open${key}`]: D[key] extends (page: Page) => Promise<infer R> ? () => Promise<R> : never; 
} : never;
type GateUseExtra<D extends GateDef<string>["extra"]> = {
  [key in keyof D]: D[key] extends (page: Page, variables: infer V) => Promise<infer R> ? (variables: V) => Promise<R> : never;
}
type GateUse<D extends GateDef<string>> = GateUseMethod<D["method"]> & GateUseMisc & GateUseExtra<D["extra"]>;
type GateUseMap<DM extends GateDefMap<string>> = {
  [key in keyof DM]: GateUse<DM[key]>
}

// Methods -------------------------------------------------------------------------------------------------------
export const defineGate = <K extends string, D extends GateDefMap<K>>(_: K, defMap: D) => (page: Page) => {
  const gateMap: GateUseMap<D> = {} as unknown as GateUseMap<D>;

  for (const [key, value] of Object.entries(defMap)) {
    const extra: GateUseExtra<typeof value["extra"]> = {};
    for (const [extraKey, extraValue] of Object.entries(defMap[key].extra || {})) {
      extra[extraKey] = extraValue.bind(null, page);
    }

    const method: Record<string, (page: Page) => Promise<BaseAuthPage>> = {};
    for (const [methodKey, methodValue] of Object.entries(defMap[key].method as typeof method)) {
      method[`open${methodKey}`] = methodValue.bind(null, page);
    }


    const misc: GateUseMisc = {
      goto: async (...args) => {
        await page.route("**/*.{png,jpg,jpeg,gif,svg,webp}", (route) => {
          route.abort();
        });
        await page.route(/(analytics|fonts)/, (route) => {
          route.abort();
        });
        return await page.goto(value.url, ...args);
      },
    }
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gateMap[key] = {
      ...misc,
      ...extra,
      ...method,
    };
  }

  return gateMap as GateUseMap<D>;
};
