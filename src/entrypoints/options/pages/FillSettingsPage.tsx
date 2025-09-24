import { useStorage } from "@/hooks/useStorage";
import { useTranslation } from "@/hooks/useTranslation";

export function FillSettingsPage() {
  const { t } = useTranslation();
  const storage = useStorage();
  const { on, delay } = storage.data;

  const toggleEnabled = () => {
    storage.mutate({ on: !on });
  };
  const updateDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    storage.mutate({ delay: value });
  };

  return (
    <main className="p-10">
      <h1 className="text-center text-2xl font-bold">{t("settings")}</h1>
      <div className="mt-2 text-center text-sm">일하기 싫다.</div>
      <section className="mx-auto mt-10 max-w-2xl space-y-8">
        <div className="flex items-start gap-8 rounded-lg bg-base-200 p-4">
          <div className="flex w-40 items-center gap-2">
            <span className="text-base font-bold">OFF</span>
            <input checked={on} className="toggle" onChange={toggleEnabled} type="checkbox" />
            <span className="text-base font-bold">ON</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              {t("on_off_description_1")}
              <br />
              {t("on_off_description_2")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-8 rounded-lg bg-base-200 p-4">
          <div className="flex w-40 items-center gap-3">
            <input
              className="input w-24 text-center"
              defaultValue={delay ?? 1000}
              max="10000"
              min="100"
              onBlur={updateDelay}
              step="100"
              type="number"
            />
            <span className="font-medium">{t("check_period")} (ms)</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              {t("check_period_description_1")}
              <br />
              {t("check_period_description_2")}
              <br />
              {t("check_period_description_3")}
            </p>
          </div>
        </div>
        {/* <div className="flex items-start gap-8 bg-base-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 w-40">
            <span className="font-bold text-base">OFF</span>
            <input
              checked={fullauto}
              className="toggle"
              onChange={toggleFullauto}
              type="checkbox"
            />
            <span className="font-bold text-base">YOLO</span>
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
