import { type WxtI18n, browser } from "wxt/browser";

export function useTranslation() {
  const t = (key: Parameters<WxtI18n["getMessage"]>[0]) => browser.i18n.getMessage(key);

  return { t };
}
