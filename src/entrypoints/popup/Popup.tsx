import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { browser } from "wxt/browser";
import { toHyphenPhone } from "../../utils/utils";
import { useStorage } from "./storage";

export function getCarrierName(carrierCode: CarrierCode) {
  if (carrierCode === "1") return browser.i18n.getMessage("carrier_SKT");
  if (carrierCode === "2") return browser.i18n.getMessage("carrier_KT");
  if (carrierCode === "3") return browser.i18n.getMessage("carrier_LGU");
  if (carrierCode === "4") return browser.i18n.getMessage("carrier_SKT_MNVO");
  if (carrierCode === "5") return browser.i18n.getMessage("carrier_KT_MNVO");
  if (carrierCode === "6") return browser.i18n.getMessage("carrier_LGU_MNVO");
}

export function getWay(wayCode: WayCode) {
  if (wayCode === "1") return browser.i18n.getMessage("sms");
  if (wayCode === "2") return browser.i18n.getMessage("pass");
}

export function Popup() {
  const storage = useStorage();
  const { on, profiles, selectedProfile } = storage.data;

  const onEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    storage.mutate({ on: e.target.checked });
  };
  const removeProfile = (index: number) => {
    storage.mutate({ profiles: profiles.filter((_, i) => i !== index) });
  };

  const selectProfile = (index: number) => {
    if (index === selectedProfile) return;
    storage.mutate({ selectedProfile: index });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profile: RawProfile = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      carrier: formData.get("carrier") as CarrierCode,
      phone_number: (formData.get("phone_number") as string).replaceAll("-", ""),
      birth: formData.get("birth") as string,
      gender: formData.get("gender") as GenderCode,
      foreigner: formData.get("foreigner") as IsForeigner,
      way: formData.get("way") as WayCode,
    };

    storage.mutate(
      {
        profiles: [...profiles, profile],
      },
      { onSuccess: () => e.currentTarget.reset() },
    );
  };

  return (
    <main className="w-96 space-y-2 p-4 bg-base-200">
      <label className="flex items-center gap-2" htmlFor="onoff">
        <input
          checked={on}
          className="checkbox "
          disabled={storage.isPending}
          id="onoff"
          onChange={onEnabledChange}
          type="checkbox"
        />
        <h1 className="text-lg font-bold">{browser.i18n.getMessage("auth_autofill")} ON/OFF</h1>
      </label>

      <ul>
        {profiles.map((profile, index) => (
          <li className="join w-full" key={profile.id}>
            <div className="w-4 py-3 text-center">
              {selectedProfile === index ? (
                <span className="inline-block h-full w-2 rounded-full bg-white bg-opacity-30"></span>
              ) : null}
            </div>
            <button
              className="join-item flex-1 space-y-1 p-2 text-left"
              disabled={storage.isPending}
              onClick={() => selectProfile(index)}
              type="button"
            >
              <h5 className="ml-2 text-sm">
                {profile.name} ( {toHyphenPhone(profile.phone_number)} )
              </h5>
              <div className="space-x-1">
                <span className="badge badge-md text-xs">{getCarrierName(profile.carrier)}</span>
                <span className="badge badge-md text-xs">{getWay(profile.way)}</span>
              </div>
            </button>
            <button
              className="btn btn-ghost btn-lg"
              disabled={storage.isPending}
              onClick={() => removeProfile(index)}
              type="button"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="divider"></div>

      <form className="space-y-2" onSubmit={onSubmit}>
        <h3 className="text-lg font-bold">{browser.i18n.getMessage("add_profile")}</h3>

        <input
          className="input w-full input-bordered"
          disabled={storage.isPending}
          id="name"
          name="name"
          placeholder={browser.i18n.getMessage("full_name")}
          required
          type="text"
        />

        <div className="join w-full">
          <select
            className="join-item select select-bordered w-1/2"
            disabled={storage.isPending}
            id="carrier"
            name="carrier"
          >
            <option value="-1">{browser.i18n.getMessage("carrier")}</option>
            <option value="1">{browser.i18n.getMessage("carrier_SKT")}</option>
            <option value="2">{browser.i18n.getMessage("carrier_KT")}</option>
            <option value="3">{browser.i18n.getMessage("carrier_LGU")}</option>
            <option value="4">{browser.i18n.getMessage("carrier_SKT_MNVO")}</option>
            <option value="5">{browser.i18n.getMessage("carrier_KT_MNVO")}</option>
            <option value="6">{browser.i18n.getMessage("carrier_LGU_MNVO")}</option>
          </select>

          <input
            className="input join-item input-bordered max-w-min"
            disabled={storage.isPending}
            id="phone_number"
            name="phone_number"
            onChange={(e) => (e.target.value = toHyphenPhone(e.target.value))}
            placeholder={browser.i18n.getMessage("phone_number")}
            required
            type="tel"
          />
        </div>

        <input
          className="input input-bordered w-full"
          disabled={storage.isPending}
          id="birth"
          max={Number(dayjs().format("YYYYMMDD"))}
          maxLength={9}
          min={Number(dayjs().format("YYYYMMDD")) - 1000000}
          minLength={8}
          name="birth"
          placeholder={browser.i18n.getMessage("birthday")}
          required
          type="number"
        />

        <div className="join w-full">
          <select
            className="join-item select select-bordered flex-1"
            disabled={storage.isPending}
            id="foreigner"
            name="foreigner"
          >
            <option value="0">{browser.i18n.getMessage("citizen")}</option>
            <option value="1">{browser.i18n.getMessage("foreigner")}</option>
          </select>

          <select
            className="join-item select select-bordered flex-1"
            disabled={storage.isPending}
            id="gender"
            name="gender"
          >
            <option value="-1">{browser.i18n.getMessage("gender")}</option>
            <option value="1">{browser.i18n.getMessage("male")}</option>
            <option value="2">{browser.i18n.getMessage("female")}</option>
          </select>
        </div>

        <select
          className="select select-bordered w-full"
          disabled={storage.isPending}
          id="way"
          name="way"
        >
          <option value="-1">{browser.i18n.getMessage("auth_method")}</option>
          <option value="1">{browser.i18n.getMessage("sms")}</option>
          <option value="2">{browser.i18n.getMessage("pass")}</option>
        </select>

        <div className="text-right">
          <button className="btn" disabled={storage.isPending} type="submit">
            {browser.i18n.getMessage("add_profile")}
          </button>
        </div>
      </form>

      <div className="divider"></div>

      <form action="" className="space-y-2">
        <h3 className="text-lg font-bold">버그제보 및 기능추가 요청하기</h3>
        {/* <textarea className="textarea textarea-bordered w-full" id="log" name="log" rows={10}>
          {reportTemplate}
        </textarea> */}
        <div className="text-right">
          <a
            className="btn"
            href="https://github.com/Xeonlink/korea-auth-filler/issues/new?template=버그-리포트"
            onClick={() => {
              browser.tabs.create({
                url: "https://github.com/Xeonlink/korea-auth-filler/issues/new?template=버그-리포트",
              });
            }}
          >
            제보 및 요청하기
          </a>
        </div>
      </form>
    </main>
  );
}

// const reportTemplate = `<<Example Report>>
// ## bug report
// - where: https://**/*
// - what: at login
// - how: some info is not filled or filled wrong

// ## feature request
// - what: add some awesome feature
// - why: for user convenience and better UX
// - how: by simply automate something
// `;
