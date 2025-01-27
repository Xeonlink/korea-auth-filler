import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import { faCake, faMobile, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Anchor } from "../../components/ui/Anchor";
import { useStorage } from "../../hooks/useStorage";
import { useTranslation } from "../../hooks/useTranslation";
import { cn, toPhoneStyle, toHyphenPhone } from "../../utils/utils";

export function getCarrierCodeTranslationKey(carrierCode: CarrierCode) {
  switch (carrierCode) {
    case "1":
      return "carrier_SKT";
    case "2":
      return "carrier_KT";
    case "3":
      return "carrier_LGU";
    case "4":
      return "carrier_SKT_MVNO";
    case "5":
      return "carrier_KT_MVNO";
    case "6":
      return "carrier_LGU_MVNO";
  }
}

export function getWayCodeTranslationKey(wayCode: WayCode) {
  switch (wayCode) {
    case "1":
      return "sms";
    case "2":
      return "pass";
    case "3":
      return "qr";
  }
}

const YYYYMMDD = Number(dayjs().format("YYYYMMDD"));

export function Popup() {
  const storage = useStorage();
  const { on, profiles, selectedProfile } = storage.data;
  const { t } = useTranslation();
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
    const id = crypto.randomUUID();
    const name = formData.get("name") as string;
    const carrier = formData.get("carrier") as CarrierCode;
    if (Number(carrier) < 1 || Number(carrier) > 6) {
      alert("통신사를 선택해주세요.");
      return;
    }
    const phone_number = (formData.get("phone_number") as string).replaceAll("-", "");
    if (phone_number.length !== 11) {
      alert("전화번호를 11자리로 입력해주세요.");
      return;
    }
    const birth = formData.get("birth") as string;
    if (birth.length !== 8) {
      alert("생년월일을 8자리로 입력해주세요.");
      return;
    }
    const gender = formData.get("gender") as GenderCode;
    if (Number(gender) < 1 || Number(gender) > 2) {
      alert("성별을 선택해주세요.");
      return;
    }
    const foreigner = formData.get("foreigner") as IsForeigner;
    if (Number(foreigner) < 0 || Number(foreigner) > 1) {
      alert("외국인 여부를 선택해주세요.");
      return;
    }
    const way = formData.get("way") as WayCode;
    if (Number(way) < 1 || Number(way) > 2) {
      alert("인증방식을 선택해주세요.");
      return;
    }

    const profile: RawProfile = { id, name, carrier, phone_number, birth, gender, foreigner, way };

    storage.mutate(
      {
        profiles: [...profiles, profile],
      },
      { onSuccess: () => e.currentTarget.reset() },
    );
  };

  return (
    <>
      <header className="w-full bg-base-200">
        <div className="form-control p-4">
          <label className="label cursor-pointer justify-start gap-2 p-0" htmlFor="onoff">
            <input
              checked={on}
              className="toggle toggle-sm"
              //
              id="onoff"
              onChange={onEnabledChange}
              type="checkbox"
            />
            <h1 className="label-text font-bold text-lg">{t("auth_autofill")} ON/OFF</h1>
          </label>
        </div>
      </header>
      <main className="w-full space-y-2 p-4">
        {profiles.length > 0 ? (
          <ul>
            {profiles.map((profile, index) => (
              <li className="w-full flex items-center" key={profile.id}>
                <button
                  className={cn(
                    { outline: selectedProfile === index },
                    "flex-1 btn font-normal justify-start btn-ghost gap-1 flex-wrap",
                  )}
                  onClick={() => selectProfile(index)}
                  type="button"
                >
                  <h5 className="text-sm">{profile.name}</h5>
                  <span className="badge badge-sm border-none">
                    {toPhoneStyle(profile.phone_number, "$2-$3")}
                  </span>
                  <span className="badge badge-sm border-none">
                    {t(getCarrierCodeTranslationKey(profile.carrier))}
                  </span>
                  <span className="badge badge-sm border-none">
                    {t(getWayCodeTranslationKey(profile.way))}
                  </span>
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => removeProfile(index)}
                  type="button"
                >
                  <FontAwesomeIcon className="h-4 w-4" icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {profiles.length > 0 ? <div className="divider"></div> : null}

        <form className="space-y-2" onSubmit={onSubmit}>
          <h3 className="text-lg font-bold">{t("add_profile")}</h3>
          <div className="w-96 join join-vertical">
            <label className="input w-full input-bordered flex items-center gap-2 join-item">
              <FontAwesomeIcon className="h-4 w-4" icon={faUser} />
              <input id="name" name="name" placeholder={t("full_name")} required type="text" />
            </label>

            <div className="join w-full join-item">
              <select className="join-item select select-bordered w-36" id="carrier" name="carrier">
                <option value="-1">{t("carrier")}</option>
                <option value="1">{t("carrier_SKT")}</option>
                <option value="2">{t("carrier_KT")}</option>
                <option value="3">{t("carrier_LGU")}</option>
                <option value="4">{t("carrier_SKT_MVNO")}</option>
                <option value="5">{t("carrier_KT_MVNO")}</option>
                <option value="6">{t("carrier_LGU_MVNO")}</option>
              </select>

              <label className="input join-item input-bordered flex items-center gap-2 w-full">
                <FontAwesomeIcon className="h-4 w-4" icon={faMobile} />
                <input
                  id="phone_number"
                  name="phone_number"
                  onChange={(e) => (e.target.value = toHyphenPhone(e.target.value))}
                  placeholder={t("phone_number")}
                  required
                  type="tel"
                />
              </label>
            </div>

            <label className="input input-bordered flex items-center gap-2 join-item">
              <FontAwesomeIcon className="h-4 w-4" icon={faCake} />
              <input
                className="grow"
                id="birth"
                max={YYYYMMDD}
                maxLength={9}
                min={YYYYMMDD - 1000000}
                minLength={8}
                name="birth"
                placeholder={t("birthday")}
                required
                type="number"
              />
            </label>

            <div className="join w-full join-item">
              <select
                className="join-item select select-bordered w-36"
                id="foreigner"
                name="foreigner"
              >
                <option value="0">{t("citizen")}</option>
                <option value="1">{t("foreigner")}</option>
              </select>

              <select className="join-item select select-bordered flex-1" id="gender" name="gender">
                <option value="-1">{t("gender")}</option>
                <option value="1">{t("male")}</option>
                <option value="2">{t("female")}</option>
              </select>
            </div>

            <select className="w-full select select-bordered join-item" id="way" name="way">
              <option value="-1">{t("auth_method")}</option>
              <option value="1">{t("sms")}</option>
              <option value="2">{t("pass")}</option>
              <option value="3">{t("qr")}</option>
            </select>
          </div>
          <div className="text-right">
            <button className="btn" type="submit">
              {t("add_profile")}
            </button>
          </div>
        </form>
      </main>
      <footer className="w-full bg-base-200">
        <ul className="flex">
          <li className="contents">
            <Anchor
              className="btn btn-ghost btn-md rounded-none flex-1"
              href="https://github.com/Xeonlink/korea-auth-filler/issues/new?template=버그-리포트.md"
            >
              {t("bug_report")}
            </Anchor>
          </li>
          <li className="contents">
            <Anchor
              className="btn btn-ghost btn-md rounded-none flex-1"
              href="https://github.com/Xeonlink/korea-auth-filler/issues/new?template=수정-요청.md"
            >
              {t("feature_request")}
            </Anchor>
          </li>
        </ul>
      </footer>
    </>
  );
}
