import Logo from "@/assets/icon.png";
import { ScrollArea } from "@/components/ui/scrollarea";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/utils/utils";
import {
  faArrowLeft,
  faBookOpenReader,
  faBug,
  faGear,
  faHouse,
  faListUl,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FillSettingsPage } from "./pages/FillSettingsPage";
import { HowToUsePage } from "./pages/HowToUsePage";
import { IntroPage } from "./pages/IntroPage";
import { ProfilesPage } from "./pages/ProfilesPage";
import { createRouter, RouteProvider, useLocation, useNavigate } from "@/components/Router";

export const router = createRouter([
  {
    path: "intro",
    render: () => <IntroPage />,
  },
  {
    path: "how-to-use",
    render: () => <HowToUsePage />,
  },
  {
    path: "profiles",
    render: () => <ProfilesPage />,
  },
  {
    path: "fill-settings",
    render: () => <FillSettingsPage />,
  },
]);

export function Options() {
  const { t } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const navigate = useNavigate(router);
  const currentPath = useLocation(router, "/intro");

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>{t("extension_name")}</title>
      </Helmet>
      <nav
        className={cn("w-64 bg-base-200 h-full flex flex-col transition-all duration-500", {
          "w-16": !isNavOpen,
        })}
      >
        <div className="p-2 text-center py-10">
          <img
            alt="로고"
            className={cn("inline-block w-10 transition-all duration-500", {
              "w-16": isNavOpen,
            })}
            src={Logo}
          />
        </div>
        <div className="p-2 flex-1 pr-1">
          <ul>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => navigate("/intro")}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon icon={faHouse} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("intro")}
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": currentPath === "/intro",
                })}
              ></div>
            </li>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => navigate("/how-to-use")}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon icon={faBookOpenReader} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("how_to_use")}
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": currentPath === "/how-to-use",
                })}
              ></div>
            </li>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => navigate("/profiles")}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon icon={faListUl} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("profiles")}
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": currentPath === "/profiles",
                })}
              ></div>
            </li>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => navigate("/fill-settings")}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon icon={faGear} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("fill_settings")}
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": currentPath === "/fill-settings",
                })}
              ></div>
            </li>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/eonnjagalbjlklfjnfpgdeaajkghpnjc/support",
                    "_blank",
                  );
                }}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon className="h-4 w-4" icon={faBug} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("bug_report")}
                  </span>
                </div>
              </button>
              <div className={cn("w-1 h-4 rounded-full opacity-80")}></div>
            </li>
            <li className="flex items-center">
              <button
                className="btn btn-ghost flex-1 block text-start overflow-hidden"
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/eonnjagalbjlklfjnfpgdeaajkghpnjc/support",
                    "_blank",
                  );
                }}
              >
                <div className="w-32 space-x-4">
                  <FontAwesomeIcon className="h-4 w-4" icon={faQuestionCircle} />
                  <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                    {t("ask_and_request")}
                  </span>
                </div>
              </button>
              <div className={cn("w-1 h-4 rounded-full opacity-80")}></div>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <button
            className="btn btn-ghost w-full block text-start overflow-hidden"
            onClick={toggleNav}
          >
            <div className="w-32 space-x-4">
              <FontAwesomeIcon
                className={cn("transition-transform duration-500", {
                  "rotate-180": !isNavOpen,
                })}
                icon={faArrowLeft}
              />
              <span className={cn("transition-all duration-500", { "opacity-0": !isNavOpen })}>
                {t("close")}
              </span>
            </div>
          </button>
        </div>
      </nav>
      <ScrollArea className="flex-1">
        <RouteProvider defaultPath="/intro" router={router} />
      </ScrollArea>
    </>
  );
}
