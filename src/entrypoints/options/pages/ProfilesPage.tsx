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

function getWayIcon(wayCode: WayCode | ({} & string)) {
  switch (wayCode) {
    case way.SMS:
      return faEnvelope;
    case way.PASS:
      return faBell;
    case way.QR:
      return faQrcode;
  }

  throw new Error("Invalid way code");
}

export function ProfilesPage() {
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
      <h1 className="text-center text-2xl font-bold">프로필 관리</h1>
      <div className="mt-2 text-center text-sm">
        프로필을 추가하고 관리할 수 있습니다.
        <br />
        선택된 프로필은 자동으로 본인인증 양식을 채워줍니다.
      </div>
      <main className="flex flex-wrap justify-center gap-10 p-10">
        <section>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>{t("select")}</th>
                <th>{t("full_name")}</th>
                <th>{t("birthday")}</th>
                <th>{t("carrier")}</th>
                <th>{t("phone_number")}</th>
                <th className="text-center">{t("foreigner")}</th>
                <th className="text-center">{t("gender")}</th>
                <th className="text-center">{t("method")}</th>
                <th className="text-center">{t("delete")}</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr className="border-none" key={profile.id}>
                  <td className="overflow-hidden rounded-l-md">
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
                      <div className="flex flex-col items-start gap-1">
                        <img alt="KT" className="inline-block h-4 dark:hidden" src={KTCI} />
                        <img alt="KT" className="hidden h-4 dark:inline-block" src={KTCI_LIGHT} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.KT_MVNO ? (
                      <div className="flex flex-col items-start gap-1">
                        <img alt="KT" className="inline-block h-4 dark:hidden" src={KTCI} />
                        <img alt="KT" className="hidden h-4 dark:inline-block" src={KTCI_LIGHT} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {profile.carrier === carrier.SKT ? (
                      <div className="flex flex-col items-start gap-1">
                        <img alt="SKT" className="h-6" src={SKTCI} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.SKT_MVNO ? (
                      <div className="flex flex-col items-start gap-1">
                        <img alt="SKT" className="inline-block h-6" src={SKTCI} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {profile.carrier === carrier.LGU ? (
                      <div className="flex flex-col items-start gap-1">
                        <img alt="LGU" className="inline-block h-5" src={LGUCI} />
                      </div>
                    ) : null}
                    {profile.carrier === carrier.LGU_MVNO ? (
                      <div className="flex flex-col items-start gap-1">
                        <img alt="LGU" className="inline-block h-5" src={LGUCI} />
                        <span className="badge text-xs">{t("mvno")}</span>
                      </div>
                    ) : null}

                    {/* {t(getCarrierCodeTranslationKey(profile.carrier))} */}
                  </td>
                  <td>{toHyphenPhone(profile.phone_number)}</td>
                  <td className="p-0">
                    <div className="text-center">
                      {profile.foreigner === "0" ? (
                        <img alt={t("citizen")} className="inline-block" src={GovernmentIcon} />
                      ) : (
                        <FontAwesomeIcon icon={faPlane} />
                      )}
                      <br />
                      <span className="text-xs">
                        {profile.foreigner === "0" ? t("citizen") : t("foreigner")}
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    {profile.gender === gender.MALE ? (
                      <div className="text-center">
                        <FontAwesomeIcon icon={faMars} />
                        <br />
                        <span className="text-xs">{t("male")}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FontAwesomeIcon icon={faVenus} />
                        <br />
                        <span className="text-xs">{t("female")}</span>
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
                  <td className="overflow-hidden rounded-r-md">
                    <button className="btn btn-ghost" onClick={removeProfile(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="w-96 self-end">
          <ProfileForm />
        </section>
      </main>
    </div>
  );
}
