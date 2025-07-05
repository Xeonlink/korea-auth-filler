import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";
import { RawProfile } from "@/utils/type";
import { carrier, gender, isForeigner, way } from "@/utils/constants";
import { PopupPage } from "./pom/PopupPage";
import { 강원도LoginPage } from "./pom/강원도LoginPage";
import { 홈택스LoginPage } from "./pom/홈택스LoginPage";
import { 고용24LoginPage } from "./pom/고용24LoginPage";
import { Cafe24SignUpPage } from "./pom/Cafe24SignupPage";
import { GoldenBrownTestPage } from "./pom/GoldenBrownTestPage";
import { 서울시LoginPage } from "./pom/서울시LoginPage";
import { 디지털원패스FindIdPage } from "./pom/디지털원패스FindIdPage";
import { 대전시LoginPage } from "./pom/대전시LoginPage";
import { 롯데홈쇼핑SignupPage } from "./pom/롯데홈쇼핑SignupPage";

const pathToExtension = path.resolve(".output/chrome-mv3");

type FixtureProps = {
  context: BrowserContext;
  extensionId: string;
  popupPage: PopupPage;
  _강원도LoginPage: 강원도LoginPage;
  _홈택스LoginPage: 홈택스LoginPage;
  _고용24LoginPage: 고용24LoginPage;
  _GoldenBrownTestPage: GoldenBrownTestPage;
  _Cafe24SignUpPage: Cafe24SignUpPage;
  _서울시LoginPage: 서울시LoginPage;
  _디지털원패스FindIdPage: 디지털원패스FindIdPage;
  _대전시LoginPage: 대전시LoginPage;
  _롯데홈쇼핑SignupPage: 롯데홈쇼핑SignupPage;
  mockRawProfile: Omit<RawProfile, "id">;
};

export const test = base.extend<FixtureProps>({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let background: { url(): string };
    if (pathToExtension.endsWith("-mv3")) {
      [background] = context.serviceWorkers();
      if (!background) background = await context.waitForEvent("serviceworker");
    } else {
      [background] = context.backgroundPages();
      if (!background) background = await context.waitForEvent("backgroundpage");
    }

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
  popupPage: async ({ page, extensionId }, use) => {
    const popupPage = new PopupPage(page, extensionId);
    await use(popupPage);
  },
  _강원도LoginPage: async ({ page }, use) => {
    const _강원도LoginPage = new 강원도LoginPage(page);
    await use(_강원도LoginPage);
  },
  _홈택스LoginPage: async ({ page }, use) => {
    const _홈택스LoginPage = new 홈택스LoginPage(page);
    await use(_홈택스LoginPage);
  },
  _고용24LoginPage: async ({ page }, use) => {
    const _고용24LoginPage = new 고용24LoginPage(page);
    await use(_고용24LoginPage);
  },
  _GoldenBrownTestPage: async ({ page }, use) => {
    const _GoldenBrownTestPage = new GoldenBrownTestPage(page);
    await use(_GoldenBrownTestPage);
  },
  _Cafe24SignUpPage: async ({ page }, use) => {
    const _Cafe24SignUpPage = new Cafe24SignUpPage(page);
    await use(_Cafe24SignUpPage);
  },
  _서울시LoginPage: async ({ page }, use) => {
    const _서울시LoginPage = new 서울시LoginPage(page);
    await use(_서울시LoginPage);
  },
  _디지털원패스FindIdPage: async ({ page }, use) => {
    const _디지털원패스FindIdPage = new 디지털원패스FindIdPage(page);
    await use(_디지털원패스FindIdPage);
  },
  _대전시LoginPage: async ({ page }, use) => {
    const _대전시LoginPage = new 대전시LoginPage(page);
    await use(_대전시LoginPage);
  },
  _롯데홈쇼핑SignupPage: async ({ page }, use) => {
    const _롯데홈쇼핑SignupPage = new 롯데홈쇼핑SignupPage(page);
    await use(_롯데홈쇼핑SignupPage);
  },
  mockRawProfile: async ({}, use) => {
    const rawProfile: Omit<RawProfile, "id"> = {
      name: "오지민",
      carrier: carrier.KT_MVNO,
      phone_number: "01012345678",
      birth: "20010331",
      foreigner: isForeigner.NATIVE,
      gender: gender.MALE,
      way: way.SMS,
    };
    await use(rawProfile);
  },
});

export const expect = test.expect;
