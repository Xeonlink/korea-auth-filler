import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const { on, profiles, selectedProfile } = storage.data!;

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
      { onSuccess: e.currentTarget.reset },
    );
  };

  return (
    <main className="w-96 space-y-2 bg-base-300 p-4">
      <label htmlFor="onoff" className="flex items-center gap-2">
        <input
          id="onoff"
          type="checkbox"
          className="checkbox"
          checked={on}
          onChange={onEnabledChange}
          disabled={storage.isPending}
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
              type="button"
              onClick={() => selectProfile(index)}
              disabled={storage.isPending}
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
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={() => removeProfile(index)}
              disabled={storage.isPending}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>

      <div className="divider"></div>

      <form onSubmit={onSubmit} className="space-y-2">
        <h3 className="text-lg font-bold">{browser.i18n.getMessage("add_profile")}</h3>

        <input
          type="text"
          id="name"
          required
          name="name"
          placeholder={browser.i18n.getMessage("full_name")}
          className="input input-bordered w-full"
          disabled={storage.isPending}
        />

        <div className="join w-full">
          <select
            id="carrier"
            name="carrier"
            className="join-item select select-bordered w-1/2"
            disabled={storage.isPending}
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
            type="tel"
            name="phone_number"
            id="phone_number"
            placeholder={browser.i18n.getMessage("phone_number")}
            required
            className="input join-item input-bordered max-w-min"
            disabled={storage.isPending}
            onChange={(e) => (e.target.value = toHyphenPhone(e.target.value))}
          />
        </div>

        <input
          type="number"
          id="birth"
          required
          name="birth"
          minLength={8}
          maxLength={9}
          min={Number(dayjs().format("YYYYMMDD")) - 1000000}
          max={Number(dayjs().format("YYYYMMDD"))}
          placeholder={browser.i18n.getMessage("birthday")}
          className="input input-bordered w-full"
          disabled={storage.isPending}
        />

        <div className="join w-full">
          <select
            className="join-item select select-bordered flex-1"
            id="foreigner"
            name="foreigner"
            disabled={storage.isPending}
          >
            <option value="0">{browser.i18n.getMessage("citizen")}</option>
            <option value="1">{browser.i18n.getMessage("foreigner")}</option>
          </select>

          <select
            className="join-item select select-bordered flex-1"
            id="gender"
            name="gender"
            disabled={storage.isPending}
          >
            <option value="-1">{browser.i18n.getMessage("gender")}</option>
            <option value="1">{browser.i18n.getMessage("male")}</option>
            <option value="2">{browser.i18n.getMessage("female")}</option>
          </select>
        </div>

        <select
          id="way"
          className="select select-bordered w-full"
          name="way"
          disabled={storage.isPending}
        >
          <option value="-1">{browser.i18n.getMessage("auth_method")}</option>
          <option value="1">{browser.i18n.getMessage("sms")}</option>
          <option value="2">{browser.i18n.getMessage("pass")}</option>
        </select>

        <div>
          <button type="submit" className="btn" disabled={storage.isPending}>
            {browser.i18n.getMessage("add_profile")}
          </button>
        </div>
      </form>
    </main>
  );
}
