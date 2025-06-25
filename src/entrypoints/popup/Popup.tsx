import Logo from "@/assets/icon.png";
import { ProfileForm } from "@/components/ProfileForm";
import { Anchor } from "@/components/ui/anchor";
import { ScrollArea } from "@/components/ui/scrollarea";
import { Tooltip } from "@/components/ui/tooltip";
import { useStorage } from "@/hooks/useStorage";
import { useTranslation } from "@/hooks/useTranslation";
import {
  cn,
  getCarrierCodeTranslationKey,
  getWayCodeTranslationKey,
  toHyphenPhone,
} from "@/utils/utils";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBug, faGear, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { browser } from "wxt/browser";

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
  const openOptions = () => {
    browser.runtime.openOptionsPage();
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
      <Helmet>
        <title>{t("extension_name")}</title>
      </Helmet>
      <header className="w-full bg-base-200 flex p-2">
        <div className="flex-1 flex justify-start">
          <label className="label cursor-pointer gap-2 pl-4" htmlFor="onoff">
            <span className="font-bold text-base">OFF</span>
            <input
              checked={on}
              className="toggle toggle-sm"
              id="onoff"
              onChange={onEnabledChange}
              type="checkbox"
            />
            <span className="font-bold text-base">ON</span>
          </label>
        </div>
        <div className="flex items-center">
          <img alt="logo" className="w-10 h-10" src={Logo} />
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
          <ProfileForm />
        </ScrollArea>
      </main>
      <footer className="w-full bg-base-200">
        <ul className="flex p-2">
          <li className="contents">
            <button className="btn btn-ghost min-h-0 h-10 flex-grow" onClick={openOptions}>
              <FontAwesomeIcon className="h-4 w-4" icon={faGear} />
              {t("options")}
            </button>
          </li>
          <li className="contents">
            <Anchor
              className="btn btn-ghost min-h-0 h-10 flex-grow"
              href="https://github.com/Xeonlink/korea-auth-filler"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              {t("github")}
            </Anchor>
          </li>
          <li className="contents">
            <Anchor
              className="btn btn-ghost min-h-0 h-10 flex-grow"
              href="https://chromewebstore.google.com/detail/eonnjagalbjlklfjnfpgdeaajkghpnjc/support"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faBug} />
              {t("bug_report")}
            </Anchor>
          </li>
        </ul>
      </footer>
    </>
  );
}
