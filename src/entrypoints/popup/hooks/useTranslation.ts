import { browser, type WxtI18n } from "wxt/browser";

export function useTranslation() {
  const t = (key: Parameters<WxtI18n["getMessage"]>[0]) => {
    return browser.i18n.getMessage(key);
  };

  return { t };
}
