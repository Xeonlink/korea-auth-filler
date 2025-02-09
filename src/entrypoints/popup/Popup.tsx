import MainIcon from "@/assets/icons/128.png";
import { Anchor } from "@/components/ui/anchor";
import { ScrollArea } from "@/components/ui/scrollarea";
import { Tooltip } from "@/components/ui/tooltip";
import { useStorage } from "@/hooks/useStorage";
import { useTranslation } from "@/hooks/useTranslation";
import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import {
  cn,
  getCarrierCodeTranslationKey,
  getWayCodeTranslationKey,
  toHyphenPhone,
  YYYYMMDD,
} from "@/utils/utils";
import {
  faCake,
  faMinus,
  faMobile,
  faPlus,
  faQuestionCircle,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function Popup() {
  const storage = useStorage();
  const { on, profiles, selectedProfile, isSideMenuOpen } = storage.data;
  const { t } = useTranslation();

  const onEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    storage.mutate({ on: e.target.checked });
  };
  const removeProfile = (index: number) => {
    storage.mutate({
      profiles: profiles.filter((_, i) => i !== index),
      selectedProfile:
        profiles.length - 1 === selectedProfile ? selectedProfile - 1 : selectedProfile,
    });
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

  // const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     document.documentElement.setAttribute("data-theme", "light");
  //   } else {
  //     document.documentElement.setAttribute("data-theme", "night");
  //   }
  // };

  return (
    <>
      <header className="w-full bg-base-200 flex p-2">
        <div className="flex-1 flex justify-start">
          <label className="label cursor-pointer gap-2 pl-4" htmlFor="onoff">
            <input
              checked={on}
              className="toggle toggle-sm"
              id="onoff"
              onChange={onEnabledChange}
              type="checkbox"
            />
            <span className="font-bold text-lg">ON/OFF</span>
          </label>
        </div>
        <div className="flex items-center">
          <img alt="logo" className="w-10 h-10" src={MainIcon} />
        </div>
        <div className="flex-1 flex justify-end">
          {/* <label className="btn btn-ghost swap swap-rotate">
            <input onChange={onThemeChange} type="checkbox" />
            <FontAwesomeIcon className="swap-off h-4 w-4" icon={faSun} />
            <FontAwesomeIcon className="swap-on h-4 w-4" icon={faMoon} />
          </label> */}
          <Tooltip dir="left" tip={isSideMenuOpen ? "닫기" : t("add_profile")}>
            <label className="btn btn-ghost swap swap-rotate">
              <input checked={isSideMenuOpen} onChange={toggleSideMenu} type="checkbox" />
              <FontAwesomeIcon className="h-4 w-4 swap-on" icon={faMinus} />
              <FontAwesomeIcon className="h-4 w-4 swap-off" icon={faPlus} />
            </label>
          </Tooltip>
        </div>
      </header>
      <main className="flex">
        <ScrollArea className="w-96 h-96">
          {profiles.length < 1 ? (
            <div className="p-4 text-center space-y-2">
              <h4 className="text-center text-base">{t("no_profile")}</h4>
              <button className="btn btn-ghost" onClick={openSideMenu} type="button">
                <FontAwesomeIcon className="h-4 w-4" icon={faPlus} /> {t("add_profile")}
              </button>
            </div>
          ) : null}
          <ul className="w-96 p-2 pl-3">
            {profiles.map((profile, index) => (
              <li className="w-full flex items-center" key={profile.id}>
                <div
                  className={cn("w-1 h-4 rounded-full opacity-80", {
                    "bg-base-content": selectedProfile === index,
                  })}
                ></div>
                <button
                  className="flex-1 btn btn-ghost font-normal justify-start gap-1"
                  onClick={() => selectProfile(index)}
                  type="button"
                >
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
                <Tooltip dir="left" tip="삭제하기">
                  <button
                    className="btn btn-ghost"
                    onClick={() => removeProfile(index)}
                    type="button"
                  >
                    <FontAwesomeIcon className="h-4 w-4" icon={faTrash} />
                  </button>
                </Tooltip>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <ScrollArea
          className={cn("w-96 h-96", {
            "w-0": !isSideMenuOpen,
          })}
        >
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
        </ScrollArea>
      </main>
      <footer className="w-full bg-base-200">
        <ul className="flex p-2">
          <li className="contents">
            <Anchor
              className="btn btn-ghost min-h-0 h-10 flex-1"
              href="https://github.com/Xeonlink/korea-auth-filler"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              {t("github")}
            </Anchor>
          </li>
          <li className="contents">
            <Anchor
              className="btn btn-ghost min-h-0 h-10 flex-1"
              href="https://chromewebstore.google.com/detail/eonnjagalbjlklfjnfpgdeaajkghpnjc/support"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faQuestionCircle} />
              {t("ask_and_request")}
            </Anchor>
          </li>
        </ul>
      </footer>
    </>
  );
}
