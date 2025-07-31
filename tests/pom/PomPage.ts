import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { rootType } from "../utils/pom";

const definePage = rootType<Page>();
const defineLocator = rootType<Locator>();

export const test = {
  kgmobilians: definePage({
    smsAuthView: async (root) => {
      const SMS인증View = root.locator("#smsStep1");
      await expect(SMS인증View).toBeVisible();
    },
    passAuthView: async (root) => {
      const PASS인증View = root.locator("#pushStep1");
      await expect(PASS인증View).toBeVisible();
    },
    이름filled: async (root, profile) => {
      const 이름Input = root.getByPlaceholder("이름").filter({ visible: true });
      await expect(이름Input).toBeVisible();
      await expect(이름Input).toHaveValue(profile.이름);
    },
    주민번호앞자리filled: async (root, profile) => {
      const 주민번호앞자리Input = root.getByPlaceholder("생년월일 6자리");
      await expect(주민번호앞자리Input).toBeVisible();
      await expect(주민번호앞자리Input).toHaveValue(profile.주민번호.앞자리);
    },
    주민번호성별filled: async (root, profile) => {
      const 주민번호성별Input = root.getByPlaceholder("주민등록번호 뒤 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
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
      const 주민번호성별Input = root.getByPlaceholder("주민등록번호 뒤 첫번째 자리");
      await expect(주민번호성별Input).toBeVisible();
      await expect(주민번호성별Input).toHaveValue(profile.주민번호.성별숫자);
    },
    전화번호filled: async (root, profile) => {
      const 전화번호Input = root.getByPlaceholder("휴대폰번호");
      await expect(전화번호Input).toBeVisible();
      await expect(전화번호Input).toHaveValue(profile.전화번호.전체);
    },
  }),
  nexonesoft: defineLocator({
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
  }),
};
