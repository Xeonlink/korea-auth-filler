import { expect } from "@playwright/test";
import type { Page, Locator, FrameLocator } from "@playwright/test";
import { rootType } from "../utils/pom";
import { toHyphenPhone } from "@/utils/utils";

const definePage = rootType<Page>();
const defineAny = rootType<Page | Locator | FrameLocator>();

export const poms = {
  kgmobilians: defineAny({
    smsAuthView: async (root) => {
      const SMS인증View = root.locator("#smsStep1");
      await expect(SMS인증View).toBeVisible();
    },
    passAuthView: async (root) => {
      const PASS인증View = root.locator("#pushStep1");
      await expect(PASS인증View).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름 입력").filter({ visible: true });
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.locator("#birthYMD");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.locator("#birthSF");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("숫자만 입력").filter({ visible: true });
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  nhnkcp: definePage({
    smsAuthView: async (root) => {
      await expect(root).toHaveURL("https://cert.kcp.co.kr/cert/pc/smsForm.jsp");
    },
    passAuthView: async (root) => {
      await expect(root).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");
    },
    qrAuthView: async (root) => {
      await expect(root).toHaveURL("https://cert.kcp.co.kr/cert/pc/pushQRForm.jsp");
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("성명입력");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByTitle("주민등록번호 앞 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByTitle("주민등록번호 뒤 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("숫자만 입력").filter({ visible: true });
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  nice: definePage({
    smsAuthView: async (root) => {
      await expect(root).toHaveURL(
        "https://nice.checkplus.co.kr/cert/mobileCert/sms/certification",
      );
    },
    passAuthView: async (root) => {
      await expect(root).toHaveURL(
        "https://nice.checkplus.co.kr/cert/mobileCert/push/certification",
      );
    },
    qrAuthView: async (root) => {
      await expect(root).toHaveURL("https://nice.checkplus.co.kr/cert/mobileCert/qr/certification");
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByPlaceholder("생년월일 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByLabel("주민등록번호 뒤 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("휴대폰번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
    보안문자Focuced: async (root) => {
      const 보안문자Input = root.getByPlaceholder("보안문자 입력");
      await expect(보안문자Input).toBeVisible();
      await expect(보안문자Input).toBeFocused();
    },
  }),
  oacx: defineAny({
    이름filled: async (root, profile) => {
      const 이름Input = root
        .getByTitle("이름")
        .or(root.getByTitle("성명 입력"))
        .filter({ visible: true });
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    생년원일filled: async (root, profile) => {
      const 생년원일Input = root.getByTitle("생년월일 여덟자리").filter({ visible: true });
      await expect(생년원일Input).toBeVisible();
      await expect(생년원일Input).toHaveValue(profile.생년월일);
    },
    통신사filled: async (root, profile) => {
      const 통신사Select = root.getByTitle("통신사 선택").filter({ visible: true });
      await expect(통신사Select).toBeVisible();
      await expect(통신사Select).toHaveValue(profile.map.통신사("S", "K", "L", "S", "K", "L"));
    },
    전화번호앞자리filled: async (root, profile) => {
      const 전화번호앞자리Select = root
        .getByTitle("휴대폰번호 앞자리 선택")
        .filter({ visible: true });
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    },
    전화번호뒷자리filled: async (root, profile) => {
      const legacyPhoneInput = root.getByTitle("휴대폰번호 뒷자리 일곱 또는 여덟자리");
      const normalPhoneInput = root.getByTitle("휴대폰번호 뒷자리 여덟자리");
      const 전화번호뒷자리Input = legacyPhoneInput.or(normalPhoneInput).filter({ visible: true });
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByTitle("주민등록번호 앞자리").filter({ visible: true });
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByTitle("주민등록번호 뒷자리").filter({ visible: true });
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    모든동의Checked: async (root) => {
      const 동의Inputs = await root
        .locator(`.agree input[type="checkbox"]`)
        .filter({ visible: true })
        .all();
      for (const 동의Input of 동의Inputs) {
        await expect(동의Input).toBeVisible();
        await expect(동의Input).toBeChecked();
      }
    },
    /**
     * raon 전용
     */
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByTitle("휴대폰번호 숫자11자리입력").filter({ visible: true });
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(toHyphenPhone(profile.전화번호.전체));
    },
  }),
  kcb: definePage({
    smsAuthView: async (root) => {
      await expect(root).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");
      await expect(root.locator("section.certifyWrap")).toBeVisible();
    },
    passAuthView: async (root) => {
      await expect(root).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");
      await expect(root.locator("section.certifyWrap")).toBeVisible();
    },
    qrAuthView: async (root) => {
      await expect(root).toHaveURL("https://safe.ok-name.co.kr/CommonSvl");
      await expect(root.locator("section.certifyWrap")).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("성명입력");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByTitle("주민등록번호 앞 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByTitle("주민등록번호 뒤 첫번째자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("숫자만 입력");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  sci: definePage({
    smsAuthView: async (root, _, carrier: "MNO" | "MVNO") => {
      await expect(root).toHaveURL(
        `https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHp${carrier === "MVNO" ? "Mvno" : ""}Ti01.jsp`,
      );
    },
    passAuthView: async (root, _, carrier: "MNO" | "MVNO") => {
      await expect(root).toHaveURL(
        `https://pcc.siren24.com/pcc_V3/passWebV3/pcc_V3_j30_certHp${carrier === "MVNO" ? "Mvno" : ""}TiApp01.jsp`,
      );
    },
    qrAuthView: async (root, _, carrier: "MNO" | "MVNO") => {
      await expect(root).toHaveURL(
        `https://pcc.siren24.com/pcc_V3/passWebV3/${carrier === "MVNO" ? "mvnoTestQr" : "testqr"}.jsp`,
      );
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByPlaceholder("생년월일 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.locator(".myNum.myNum2");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("휴대폰번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  toss: definePage({
    authView: async (root) => {
      await expect(root).toHaveURL("https://auth.cert.toss.im/type-info");
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByLabel("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByLabel("휴대폰번호");
      await expect(전화번호Input).toBeVisible();
      const 전화번호 = profile.전화번호.전체.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
      await expect(전화번호Input).toHaveValue(전화번호);
    },
    생년월일filled: async (root, profile) => {
      const 생년월일Input = root.getByLabel("생년월일 6자리");
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(profile.생년월일.substring(2));
    },
    개인정보동의checked: async (root) => {
      const 개인정보동의Input = root.getByLabel("개인정보 수집", { exact: false });
      await expect(개인정보동의Input).toBeChecked();
    },
    인증하기active: async (root) => {
      const 인증하기버튼 = root.getByRole("button", { name: "인증하기" });
      await expect(인증하기버튼).toBeVisible();
      await expect(인증하기버튼).toBeEnabled();
    },
  }),
  nexonesoft: defineAny({
    providerView: async (root) => {
      const locator = root.locator(`form.ns-step1`);
      await expect(locator).toBeVisible();
    },
    selectProvider: async (root, _, variables: { text: string }) => {
      const locator = root.getByText(variables.text);
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();
      await locator.click();
    },
    채우기View: async (root) => {
      const locator = root.locator(`form.ns-step2`);
      await expect(locator).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByLabel("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    생년월일filled: async (root, profile) => {
      const 생년월일Input = root.getByLabel("생년월일");
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(profile.생년월일);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByLabel("휴대폰 번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  dream: defineAny({
    smsAuthView: async (root) => {
      const locator = root.locator("#sms_01");
      await expect(locator).toBeVisible();
    },
    passAuthView: async (root) => {
      const locator = root.locator("#pass_01");
      await expect(locator).toBeVisible();
    },
    qrAuthView: async (root) => {
      const locator = root.locator("#pass_02");
      await expect(locator).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByLabel("이름").filter({ visible: true });
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByLabel("생년월일 6자리").filter({ visible: true });
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const rrnGender = root.getByLabel("주민등록번호 뒤 첫번째 자리").filter({ visible: true });
      await expect(rrnGender).toBeVisible();
      await expect(rrnGender).toHaveValue(profile.주민번호.성별숫자);
    },
    휴대폰번호filled: async (root, profile) => {
      const 휴대폰번호Input = root.getByLabel("휴대폰번호").filter({ visible: true });
      await expect(휴대폰번호Input).toBeVisible();
      await expect(휴대폰번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  mobileid: defineAny({
    이름filled: async (root, profile) => {
      const 이름Input1 = root.locator("input[name='name']");
      const 이름Input2 = root.getByPlaceholder("홍길동");
      const 이름Input = 이름Input1.or(이름Input2);
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    전화번호앞자리filled: async (root, profile) => {
      const 전화번호앞자리Select = root.locator("select[data-id='phone1']");
      await expect(전화번호앞자리Select).toBeVisible();
      await expect(전화번호앞자리Select).toHaveValue(profile.전화번호.앞3자리);
    },
    전화번호뒷자리filled: async (root, profile) => {
      const 전화번호뒷자리Input = root.locator("input[data-id='phone2']");
      await expect(전화번호뒷자리Input).toBeVisible();
      await expect(전화번호뒷자리Input).toHaveValue(profile.전화번호.뒷8자리);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.locator("input[name='telno']");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
    모든동의Checked: async (root) => {
      let 동의Inputs: Locator[] = [];

      if (동의Inputs.length === 0) {
        동의Inputs = await root.locator(".agree-list input").all();
      }
      if (동의Inputs.length === 0) {
        동의Inputs = await root.locator(".agree .pcAgree input").all();
      }

      for (const 동의Input of 동의Inputs) {
        await expect(동의Input).toBeVisible();
        await expect(동의Input).toBeChecked();
      }
    },
  }),
  kmcert: definePage({
    smsAuthView: async (root) => {
      await expect(root).toHaveURL((url) => {
        return [
          "https://www.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
          "https://evt.kmcert.com/kmcis/web_v5/kmcisSms01.jsp",
        ].some((l) => url.href.includes(l));
      });
    },
    passAuthView: async (root) => {
      await expect(root).toHaveURL((url) => {
        return [
          "https://www.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
          "https://evt.kmcert.com/kmcis/simpleCert_web_v5/kmcisApp01.jsp",
        ].some((l) => url.href.includes(l));
      });
    },
    qrAuthView: async (root) => {
      await expect(root).toHaveURL((url) => {
        return [
          "https://www.kmcert.com/kmcis/qr_web_v5/kmcisQr01.jsp",
          "https://evt.kmcert.com/kmcis/qr_web_v5/kmcisQr01.jsp",
        ].some((l) => url.href.includes(l));
      });
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByPlaceholder("생년월일 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByLabel("주민등록번호 뒤 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("휴대폰번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
    보안문자Focuced: async (root) => {
      const 보안문자Input = root.getByPlaceholder("보안문자");
      await expect(보안문자Input).toBeVisible();
      await expect(보안문자Input).toBeFocused();
    },
  }),
  yeskey: definePage({
    certViewByUrl: async (root) => {
      await expect(root).toHaveURL("https://www.epeople.go.kr/nep/crtf/fictInfoCrtfPopup.npaid");
    },
    certView: async (root) => {
      const locator = root.locator("#__fincert_root__");
      await expect(locator).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.locator("#CLOUD_ID_1");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.locator("#CLOUD_ID_2");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
    생년월일filled: async (root, profile) => {
      const 생년월일Input = root.locator("#CLOUD_ID_3");
      await expect(생년월일Input).toBeVisible();
      await expect(생년월일Input).toHaveValue(profile.생년월일);
    },
  }),
  danal: definePage({
    smsAuthView: async (root) => {
      const locator = root.locator("#authTabSms");
      await expect(locator).toBeVisible();
      await expect(locator).toHaveClass(/(^|\s)on(\s|$)/);
    },
    passAuthView: async (root) => {
      const locator = root.locator("#authTabPass");
      await expect(locator).toBeVisible();
      await expect(locator).toHaveClass(/(^|\s)on(\s|$)/);
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름").filter({ visible: true });
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByTitle("주민등록번호 앞 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByTitle("주민등록번호 7번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByTitle("휴대폰번호 입력").filter({ visible: true });
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  payco: defineAny({
    gotoSmsAuthView: async (root) => {
      await root.locator("#tabSms").click();
    },
    gotoPassAuthView: async (root) => {
      await root.locator("#tabApp").click();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름");
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("휴대폰 번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByPlaceholder("주민번호");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByTitle("성별코드 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    통신사selected: async (root, profile) => {
      const 통신사button = root.getByTitle("통신사 선택");
      await expect(통신사button).toBeVisible();
      const 통신사 = profile.map.통신사("Skt", "Ktf", "Lgt", "Skr", "Ktr", "Lgr");
      await expect(통신사button).toHaveAttribute("aria-labelledby", `telecomChoiceButton${통신사}`);
    },
    인증요청active: async (root) => {
      const 인증요청Button = root.getByRole("button", { name: "인증요청" });
      await expect(인증요청Button).toBeVisible();
      await expect(인증요청Button).toBeEnabled();
    },
  }),
};
