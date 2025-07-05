import { Page } from "@playwright/test";
import { BaseAuthPage, WaitUntil } from "../pom/base";

type GateDefMap<K extends string> = Record<string, {
  url: string;
  method: Partial<Record<K, (page: Page) => Promise<BaseAuthPage>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: Record<string, (page: Page, variabels: any) => Promise<any>>;
}>;

type GateUseMap<K extends string, D extends GateDefMap<K>> = {
    [key in keyof D]: key extends string ? keyof D[key]["method"] extends string ? {
        [method in keyof D[key]["method"] as `open${method}`]: D[key]["method"][method] extends (page: Page) => Promise<infer R> ? () => Promise<R> : never;
    } & {
        goto: (waitUntil?: WaitUntil) => Promise<void>;
    } & {
        [extra in keyof D[key]["extra"]]: D[key]["extra"][extra] extends (page: Page, variables: infer V) => Promise<infer R> ? (variables: V) => Promise<R> : never;
    } :never : never
}

export const defineGate = <K extends string>() => {
  return <D extends GateDefMap<K>>(definition: D) => {
    return (page: Page) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gateMap: any = {};
  
      for (const [key, value] of Object.entries(definition)) {
        const extra = Object.fromEntries(
          Object.entries(value.extra || {})
            .map(([extraKey, extraValue]) => [extraKey, extraValue.bind(null, page)])
        );
        
        const method = Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          Object.entries<((page: Page) => Promise<BaseAuthPage>)>(value.method)
            .map(([methodKey, methodValue]) => [`open${methodKey}`, methodValue.bind(null, page)])
        );

        gateMap[key] = {
          goto: async (waitUntil: WaitUntil = "networkidle") => {
            await page.goto(value.url, { waitUntil });
          },
          ...extra,
          ...method,
        };
      }
  
      return gateMap as GateUseMap<K, D>;
    };
  }
}