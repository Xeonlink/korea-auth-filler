import { useStorage } from "@/hooks/useStorage";
import { useTranslation } from "@/hooks/useTranslation";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const KNOWN_OACX_PROVIDERS = [
  "네이버",
  "네이버인증서",
  "카카오톡",
  "카카오뱅크",
  "토스",
  "토스인증서",
  "PASS",
  "통신사PASS",
  "KB국민은행",
  "국민인증서",
  "신한은행",
  "신한인증서",
  "우리은행",
  "우리인증서",
  "하나은행",
  "하나인증서",
  "농협은행",
  "NH인증서",
  "드림인증",
  "페이코",
  "삼성패스",
  "뱅크샐러드",
];

export function FillSettingsPage() {
  const { t } = useTranslation();
  const storage = useStorage();
  const inputRef = useRef<HTMLInputElement>(null);

  const { on, delay, vendorOptions } = storage.data;
  const oacxPreferences = vendorOptions.oacx.preferences || [];

  const toggleEnabled = () => {
    storage.mutate({ on: !on });
  };
  const updateDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    storage.mutate({ delay: value });
  };

  const addOacxPreference = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || oacxPreferences.includes(trimmed)) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    storage.change((data) => data.vendorOptions.oacx.preferences.push(trimmed));

    if (inputRef.current) inputRef.current.value = "";
  };
  const removeOacxPreference = (index: number) => {
    storage.change((data) => data.vendorOptions.oacx.preferences.toSpliced(index, 1));
  };
  const onOacxPreferenceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOacxPreference(e.currentTarget.value);
    }
  };
  const onOacxPreferenceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    addOacxPreference(e.currentTarget.value);
  };

  return (
    <main className="p-10">
      <h1 className="text-center text-2xl font-bold">{t("settings")}</h1>
      <div className="mt-2 text-center text-sm">일하기 싫다.</div>
      <section className="mx-auto mt-10 max-w-2xl space-y-8">
        <article className="rounded-lg bg-base-200 p-4">
          <h2 className="mb-2 text-lg font-bold">{t("fill_settings")}</h2>
          <p className="mb-4 text-sm text-gray-500">
            {t("on_off_description_1")} {t("on_off_description_2")}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">OFF</span>
            <input checked={on} className="toggle" onChange={toggleEnabled} type="checkbox" />
            <span className="text-base font-bold">ON</span>
          </div>
        </article>
        <article className="rounded-lg bg-base-200 p-4">
          <h2 className="mb-2 text-lg font-bold">{t("check_period")}</h2>
          <p className="mb-4 text-sm text-gray-500">
            {t("check_period_description_1")} {t("check_period_description_2")}{" "}
            {t("check_period_description_3")}
          </p>
          <div className="flex items-center gap-3">
            <input
              className="input input-sm w-24 text-center"
              defaultValue={delay ?? 1000}
              max="10000"
              min="100"
              onBlur={updateDelay}
              step="100"
              type="number"
            />
            <span className="font-medium">(ms)</span>
          </div>
        </article>
        <article className="rounded-lg bg-base-200 p-4">
          <h2 className="mb-2 text-lg font-bold">{t("oacx_preferred_providers")}</h2>
          <p className="mb-4 text-sm text-gray-500">{t("oacx_preferred_providers_description")}</p>
          <div className="flex flex-wrap gap-1">
            {oacxPreferences.map((provider, index) => (
              <div key={index} className="badge h-10 gap-1 badge-xl">
                <span className="text-sm">{provider}</span>
                <button
                  className="btn size-6 p-1 btn-ghost"
                  onClick={() => removeOacxPreference(index)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faX} className="text-xs" />
                </button>
              </div>
            ))}
            <div>
              <input
                ref={inputRef}
                className="input input-sm w-36 rounded-2xl"
                list="known-providers"
                onBlur={onOacxPreferenceBlur}
                onKeyDown={onOacxPreferenceKeyDown}
                placeholder={t("oacx_provider_input_placeholder")}
                type="text"
              />
              <datalist id="known-providers">
                {KNOWN_OACX_PROVIDERS.map((provider) => (
                  <option key={provider} value={provider} />
                ))}
              </datalist>
            </div>
          </div>
        </article>
        {/* <div className="flex items-start gap-8 rounded-lg bg-base-200 p-4">
          <div className="flex w-40 items-center gap-2">
            <span className="text-base font-bold">OFF</span>
            <input
              checked={fullauto}
              className="toggle"
              onChange={toggleFullauto}
              type="checkbox"
            />
            <span className="text-base font-bold">YOLO</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              {t("fullauto_description_1")}
              <br />
              {t("fullauto_description_2")}
            </p>
          </div>
        </div> */}
      </section>
    </main>
  );
}
