import Logo from "@/assets/icon.png";
import { ProfileForm } from "@/components/ProfileForm";
import { Anchor } from "@/components/ui/anchor";
import { ScrollArea } from "@/components/ui/scrollarea";
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
import { browser } from "wxt/browser";

export function Popup() {
  const storage = useStorage();
  const { on, profiles, selectedProfile, isSideMenuOpen } = storage.data;
  const { t } = useTranslation();

  const onEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    storage.mutate({ on: e.target.checked });
  };
  const removeProfile = (index: number) => {
    const newProfiles = profiles.filter((_, i) => i !== index);
    storage.mutate({
      profiles: newProfiles,
      selectedProfile:
        newProfiles.length - 1 === selectedProfile ? selectedProfile - 1 : selectedProfile,
      isSideMenuOpen: newProfiles.length === 0 ? true : isSideMenuOpen,
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

  return (
    <>
      <header className="flex w-full bg-base-200 p-2">
        <div className="flex flex-1 justify-start">
          <label className="label cursor-pointer gap-2 pl-4" htmlFor="onoff">
            <span className="text-base font-bold">OFF</span>
            <input
              checked={on}
              className="toggle toggle-sm"
              id="onoff"
              onChange={onEnabledChange}
              type="checkbox"
            />
            <span className="text-base font-bold">ON</span>
          </label>
        </div>
        <div className="flex items-center">
          <img alt="logo" className="h-10 w-10" src={Logo} />
        </div>
        <div className="flex flex-1 justify-end">
          {/* <label className="btn btn-ghost swap swap-rotate">
            <input onChange={onThemeChange} type="checkbox" />
            <FontAwesomeIcon className="swap-off h-4 w-4" icon={faSun} />
            <FontAwesomeIcon className="swap-on h-4 w-4" icon={faMoon} />
          </label> */}
          <div
            className="tooltip tooltip-left"
            data-tip={isSideMenuOpen ? t("close") : t("add_profile")}
          >
            <label className="btn swap swap-rotate btn-ghost">
              <input checked={isSideMenuOpen} onChange={toggleSideMenu} type="checkbox" />
              <FontAwesomeIcon className="swap-on h-4 w-4" icon={faMinus} />
              <FontAwesomeIcon className="swap-off h-4 w-4" icon={faPlus} />
            </label>
          </div>
        </div>
      </header>
      <main className="flex">
        <ScrollArea className="h-96 w-96">
          {profiles.length < 1 ? (
            <div className="space-y-2 p-4 text-center">
              <h4 className="text-center text-base">{t("no_profile")}</h4>
              <button className="btn btn-ghost" onClick={openSideMenu} type="button">
                <FontAwesomeIcon className="h-4 w-4" icon={faPlus} /> {t("add_profile")}
              </button>
            </div>
          ) : null}
          <ul className="w-96 p-2 pl-3">
            {profiles.map((profile, index) => (
              <li className="flex w-full items-center" key={profile.id}>
                <div
                  className={cn("h-4 w-1 rounded-full opacity-80", {
                    "bg-base-content": selectedProfile === index,
                  })}
                ></div>
                <button
                  className="btn flex-1 justify-start gap-1 font-normal btn-ghost"
                  onClick={() => selectProfile(index)}
                  type="button"
                >
                  <h5 className="text-sm">{profile.name}</h5>
                  <span className="badge border-none badge-sm">
                    {toHyphenPhone(profile.phone_number).slice(4)}
                  </span>
                  <span className="badge border-none badge-sm">
                    {t(getCarrierCodeTranslationKey(profile.carrier))}
                  </span>
                  <span className="badge border-none badge-sm">
                    {t(getWayCodeTranslationKey(profile.way))}
                  </span>
                </button>
                <div className="tooltip tooltip-left" data-tip={t("delete")}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => removeProfile(index)}
                    type="button"
                  >
                    <FontAwesomeIcon className="h-4 w-4" icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <ScrollArea
          className={cn("h-96 w-96", {
            "w-0": !isSideMenuOpen,
          })}
        >
          <ProfileForm />
        </ScrollArea>
      </main>
      <footer className="w-full bg-base-200">
        <ul className="flex p-2">
          <li className="contents">
            <button className="btn h-10 flex-grow btn-ghost" onClick={openOptions}>
              <FontAwesomeIcon className="h-4 w-4" icon={faGear} />
              {t("options")}
            </button>
          </li>
          <li className="contents">
            <Anchor
              className="btn h-10 flex-grow btn-ghost"
              href="https://github.com/Xeonlink/korea-auth-filler"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              {t("github")}
            </Anchor>
          </li>
          <li className="contents">
            <Anchor
              className="btn h-10 flex-grow btn-ghost"
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
