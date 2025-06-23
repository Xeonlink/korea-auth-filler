import KTCI from "@/assets/ci/kt_dark.png";
import KTCI_LIGHT from "@/assets/ci/kt_light.png";
import LGUCI from "@/assets/ci/lgu.png";
import SKTCI from "@/assets/ci/skt.png";
import GovernmentIcon from "@/assets/svg/government.svg";
import { ProfileForm } from "@/components/ProfileForm";
import { useStorage } from "@/hooks/useStorage";
import { useTranslation } from "@/hooks/useTranslation";
import { carrier, gender, way } from "@/utils/constants";
import type { WayCode } from "@/utils/type";
import { getWayCodeTranslationKey, toBirth, toHyphenPhone } from "@/utils/utils";
import {
  faBell,
  faEnvelope,
  faMars,
  faPlane,
  faQrcode,
  faTrash,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PageProps } from "../Options";

function getWayIcon(wayCode: WayCode) {
  switch (wayCode) {
    case way.SMS:
      return faEnvelope;
    case way.PASS:
      return faBell;
    case way.QR:
      return faQrcode;
  }
}

export function ProfilesPage(_: PageProps) {
  const { t } = useTranslation();
  const storage = useStorage();
  const { profiles, selectedProfile } = storage.data;

  const selectProfile = (index: number) => (_: React.ChangeEvent<HTMLInputElement>) => {
    if (index === selectedProfile) return;
    storage.mutate({ selectedProfile: index });
  };
  const removeProfile = (index: number) => (_: React.MouseEvent<HTMLButtonElement>) => {
    storage.mutate({
      profiles: profiles.filter((_, i) => i !== index),
      selectedProfile:
        profiles.length - 1 === selectedProfile ? selectedProfile - 1 : selectedProfile,
    });
  };

  return (
    <div className="pt-10">
      <h1 className="text-center font-bold text-2xl">프로필 관리</h1>
      <div className="text-center text-sm mt-2">
        프로필을 추가하고 관리할 수 있습니다.
        <br />
        선택된 프로필은 자동으로 본인인증 양식을 채워줍니다.
      </div>
      <main className="p-10 flex justify-center gap-10 flex-wrap">
        <section>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>선택</th>
                <th>이름</th>
                <th>생년월일</th>
                <th>통신사</th>
                <th>전화번호</th>
                <th className="text-center">외국인</th>
                <th className="text-center">성별</th>
                <th className="text-center">방법</th>
                <th className="text-center">삭제</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr className="border-none" key={profile.id}>
                  <td className="rounded-l-md overflow-hidden">
                    <input
                      checked={selectedProfile === index}
                      className="checkbox checkbox-sm"
                      onChange={selectProfile(index)}
                      type="checkbox"
                    />
                  </td>

                  <td className="px-2">{profile.name}</td>
                  <td>{toBirth(profile.birth)}</td>
                  <td className="px-2 py-0">
                    {profile.carrier === carrier.KT ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="KT" className="h-4 inline-block dark:hidden" src={KTCI} />
                        <img alt="KT" className="h-4 hidden dark:inline-block" src={KTCI_LIGHT} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.KT_MVNO ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="KT" className="h-4 inline-block dark:hidden" src={KTCI} />
                        <img alt="KT" className="h-4 hidden dark:inline-block" src={KTCI_LIGHT} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {profile.carrier === carrier.SKT ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="SKT" className="h-6" src={SKTCI} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.SKT_MVNO ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="SKT" className="h-6 inline-block" src={SKTCI} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {profile.carrier === carrier.LGU ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="LGU" className="h-5 inline-block" src={LGUCI} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.LGU_MVNO ? (
                      <div className="flex gap-1 flex-col items-start">
                        <img alt="LGU" className="h-5 inline-block" src={LGUCI} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {/* {t(getCarrierCodeTranslationKey(profile.carrier))} */}
                  </td>
                  <td>{toHyphenPhone(profile.phone_number)}</td>
                  <td className="p-0">
                    <div className="text-center">
                      {profile.foreigner === "0" ? (
                        <img alt="내국인" className="inline-block" src={GovernmentIcon} />
                      ) : (
                        <FontAwesomeIcon icon={faPlane} />
                      )}
                      <br />
                      <span className="text-xs">
                        {profile.foreigner === "0" ? "내국인" : "외국인"}
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    {profile.gender === gender.MALE ? (
                      <div className="text-center">
                        <FontAwesomeIcon icon={faMars} />
                        <br />
                        <span className="text-xs">남자</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FontAwesomeIcon icon={faVenus} />
                        <br />
                        <span className="text-xs">여자</span>
                      </div>
                    )}
                  </td>
                  <td className="p-0">
                    <div className="text-center">
                      <FontAwesomeIcon icon={getWayIcon(profile.way)} />
                      <br />
                      <span className="text-xs">{t(getWayCodeTranslationKey(profile.way))}</span>
                    </div>
                  </td>
                  <td className="rounded-r-md overflow-hidden">
                    <button className="btn btn-ghost" onClick={removeProfile(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="self-end">
          <ProfileForm />
        </section>
      </main>
    </div>
  );
}
