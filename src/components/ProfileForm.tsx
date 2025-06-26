import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCake, faMobile, faUser } from "@fortawesome/free-solid-svg-icons";
import { toHyphenPhone } from "@/utils/utils";
import { useTranslation } from "@/hooks/useTranslation";
import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import { useStorage } from "@/hooks/useStorage";

export function ProfileForm() {
  const { t } = useTranslation();
  const storage = useStorage();
  const { profiles } = storage.data;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = crypto.randomUUID();
    const name = formData.get("name") as string;
    const carrier = formData.get("carrier") as CarrierCode;
    if (Number(carrier) < 1 || Number(carrier) > 6) {
      alert(t("select_carrier"));
      return;
    }
    const phone_number = (formData.get("phone_number") as string).replaceAll("-", "");
    if (phone_number.length !== 11) {
      alert(t("check_number"));
      return;
    }
    const birth = formData.get("birth") as string;
    if (birth.length !== 8) {
      alert(t("check_birthday"));
      return;
    }
    const birthMonth = parseInt(birth.slice(4, 6));
    if (birthMonth < 1 || birthMonth > 12) {
      alert(t("check_birthday"));
      return;
    }
    const birthDay = parseInt(birth.slice(6, 8));
    if (birthDay < 1 || birthDay > 31) {
      alert(t("check_birthday"));
      return;
    }
    const gender = formData.get("gender") as GenderCode;
    if (Number(gender) < 1 || Number(gender) > 2) {
      alert(t("select_gender"));
      return;
    }
    const foreigner = formData.get("foreigner") as IsForeigner;
    if (Number(foreigner) < 0 || Number(foreigner) > 1) {
      alert(t("select_foreigner"));
      return;
    }
    const way = formData.get("way") as WayCode;
    if (Number(way) < 1 || Number(way) > 3) {
      alert(t("select_auth_method"));
      return;
    }

    const profile: RawProfile = { id, name, carrier, phone_number, birth, gender, foreigner, way };

    storage.mutate(
      {
        profiles: [...profiles, profile],
      },
      {
        onSuccess: () => {
          e.currentTarget.reset();
        },
      },
    );
  };

  return (
    <form className="space-y-2 p-4" onSubmit={onSubmit}>
      <h3 className="text-lg font-bold ml-2">{t("add_profile")}</h3>

      <fieldset className="grid grid-cols-12">
        <label className="input input-bordered flex items-center gap-2 col-span-12 rounded-b-none border-b-0">
          <FontAwesomeIcon className="h-4 w-4" icon={faUser} />
          <input id="name" name="name" placeholder={t("full_name")} required type="text" />
        </label>

        <select
          className="select select-bordered col-span-5 rounded-none border-r-0"
          id="carrier"
          name="carrier"
        >
          <option value="-1">{t("carrier")}</option>
          <option value="1">{t("carrier_SKT")}</option>
          <option value="2">{t("carrier_KT")}</option>
          <option value="3">{t("carrier_LGU")}</option>
          <option value="4">{t("carrier_SKT_MVNO")}</option>
          <option value="5">{t("carrier_KT_MVNO")}</option>
          <option value="6">{t("carrier_LGU_MVNO")}</option>
        </select>

        <label className="input input-bordered flex items-center gap-2 rounded-none col-span-7">
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

        <label className="input input-bordered flex items-center gap-2 col-span-12 rounded-none border-y-0">
          <FontAwesomeIcon className="h-4 w-4" icon={faCake} />
          <input
            className="grow"
            id="birth"
            maxLength={8}
            minLength={8}
            name="birth"
            placeholder={t("birthday")}
            required
            type="text"
          />
        </label>

        <select
          className="join-item select select-bordered col-span-3 rounded-t-none rounded-br-none pr-0"
          id="foreigner"
          name="foreigner"
        >
          <option value="0">{t("citizen")}</option>
          <option value="1">{t("foreigner")}</option>
        </select>

        <select
          className="join-item select select-bordered col-span-4 rounded-none border-x-0 pr-0"
          id="gender"
          name="gender"
        >
          <option value="-1">{t("gender")}</option>
          <option value="1">{t("male")}</option>
          <option value="2">{t("female")}</option>
        </select>

        <select
          className="join-item select select-bordered col-span-5 rounded-t-none rounded-bl-none pr-0"
          id="way"
          name="way"
        >
          <option value="-1">{t("auth_method")}</option>
          <option value="1">{t("sms")}</option>
          <option value="2">{t("pass")}</option>
          <option value="3">{t("qr")}</option>
        </select>
      </fieldset>
      <div className="text-right">
        <button className="btn" type="submit">
          {t("add_profile")}
        </button>
      </div>
    </form>
  );
}
