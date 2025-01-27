import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import { faCake, faMobile, faPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Anchor } from "../../components/ui/Anchor";
import { useStorage } from "../../hooks/useStorage";
import { useTranslation } from "../../hooks/useTranslation";
import { cn, toHyphenPhone } from "../../utils/utils";
import { useEffect } from "react";

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
  const { on, profiles, selectedProfile, isSideMenuOpen } = storage.data;
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
  const openSideMenu = () => {
    storage.mutate({ isSideMenuOpen: true });
  };
  const toggleSideMenu = () => {
    storage.mutate({ isSideMenuOpen: !isSideMenuOpen });
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

  useEffect(() => {
    if (profiles.length === 0) {
      storage.mutate({ isSideMenuOpen: true });
    }
  }, [profiles.length]);

  return (
    <>
      <header className="w-full bg-base-200 flex">
        <label className="label cursor-pointer justify-start gap-2 flex-1 px-6" htmlFor="onoff">
          <input
            checked={on}
            className="toggle toggle-sm"
            id="onoff"
            onChange={onEnabledChange}
            type="checkbox"
          />
          <h1 className="label-text font-bold text-lg">{t("auth_autofill")} ON/OFF</h1>
        </label>
        <button className="btn btn-ghost m-2" onClick={toggleSideMenu}>
          <FontAwesomeIcon className="h-4 w-4" icon={faPlus} />
        </button>
      </header>
      <main className="flex h-96">
        <section className="overflow-scroll">
          {profiles.length < 1 ? (
            <div className="p-4 text-center space-y-2">
              <h4 className="text-center text-base">프로필이 없습니다.</h4>
              <button className="btn btn-ghost" onClick={openSideMenu} type="button">
                <FontAwesomeIcon className="h-4 w-4" icon={faPlus} /> 프로필 추가하기
              </button>
            </div>
          ) : null}
          <ul className="w-96 p-2">
            {profiles.map((profile, index) => (
              <li className="w-full flex items-center" key={profile.id}>
                <button
                  className={cn("flex-1 btn font-normal justify-start btn-ghost gap-1 flex-wrap")}
                  onClick={() => selectProfile(index)}
                  type="button"
                >
                  <input
                    checked={selectedProfile === index}
                    className="checkbox checkbox-xs mr-1"
                    id={profile.id}
                    name="selected-profile"
                    readOnly
                    type="checkbox"
                  />
                  <h5 className="text-sm">{profile.name}</h5>
                  <span className="badge badge-sm border-none">
                    {toHyphenPhone(profile.phone_number).slice(4)}
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
        </section>

        <section
          className={cn("overflow-scroll transition-all w-96 duration-500 ease-in", {
            "w-0": !isSideMenuOpen,
          })}
        >
          <form className="space-y-2 w-96 p-4" onSubmit={onSubmit}>
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
        </section>
      </main>
      <footer className="w-full bg-base-200">
        <ul className="flex">
          <li className="contents">
            <Anchor
              className="btn btn-ghost btn-md flex-1"
              href="https://github.com/Xeonlink/korea-auth-filler/issues/new?template=버그-리포트.md"
            >
              {t("bug_report")}
            </Anchor>
          </li>
          <li className="contents">
            <Anchor
              className="btn btn-ghost btn-md flex-1"
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
