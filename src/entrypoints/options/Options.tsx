import Logo from "@/assets/icon.png";
import { cn } from "@/utils/utils";
import {
  faArrowLeft,
  faBookOpenReader,
  faGear,
  faHouse,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IntroPage } from "./pages/IntroPage";
import { HowToUsePage } from "./pages/HowToUsePage";
import { ProfilesPage } from "./pages/ProfilesPage";
import { FillSettingsPage } from "./pages/FillSettingsPage";
import { ScrollArea } from "@/components/ui/scrollarea";

type Route = "/intro" | "/how-to-use" | "/profiles" | "/fill-settings";
export type PageProps = {
  navigate: (path: Route) => void;
};

export function Options() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [route, setRoute] = useState<Route>("/profiles");

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const navigate = (path: Route) => {
    setRoute(path);
  };

  return (
    <>
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
                    소개
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": route === "/intro",
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
                    사용법
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": route === "/how-to-use",
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
                    프로필
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": route === "/profiles",
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
                    채우기 설정
                  </span>
                </div>
              </button>
              <div
                className={cn("w-1 h-4 rounded-full opacity-80", {
                  "bg-base-content": route === "/fill-settings",
                })}
              ></div>
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
                닫기
              </span>
            </div>
          </button>
        </div>
      </nav>
      <ScrollArea className="flex-1">
        {route === "/intro" ? <IntroPage navigate={navigate} /> : null}
        {route === "/how-to-use" ? <HowToUsePage navigate={navigate} /> : null}
        {route === "/profiles" ? <ProfilesPage navigate={navigate} /> : null}
        {route === "/fill-settings" ? <FillSettingsPage navigate={navigate} /> : null}
      </ScrollArea>
    </>
  );
}
