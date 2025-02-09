import { useStorage } from "@/hooks/useStorage";
import type { PageProps } from "../Options";
import { useTranslation } from "@/hooks/useTranslation";
import {
  carrier,
  gender,
  getWayCodeTranslationKey,
  toBirth,
  toHyphenPhone,
  way,
  YYYYMMDD,
} from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCake,
  faEnvelope,
  faMars,
  faMobile,
  faPlane,
  faPlus,
  faQrcode,
  faTrash,
  faUser,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import type { CarrierCode, GenderCode, IsForeigner, RawProfile, WayCode } from "@/utils/type";
import GovernmentIcon from "@/assets/svg/government.svg";
import KTCI from "@/assets/ci/kt_dark.png";
import SKTCI from "@/assets/ci/skt.png";
import LGUCI from "@/assets/ci/lgu.png";
import KTCI_LIGHT from "@/assets/ci/kt_light.png";

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
        <form className="space-y-6" onSubmit={onSubmit}>
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
              <FontAwesomeIcon icon={faPlus} />
              {t("add_profile")}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
