import { Profile } from "@/utils/Profile";
import { carrier, gender, isForeigner, way } from "@/utils/constants";
import { type BrowserContext, test as base, chromium } from "@playwright/test";
import path from "path";
import { createGate } from "./pom/GatePage";
import { poms } from "./pom/PomPage";
import { PopupPage } from "./pom/PopupPage";

const pathToExtension = path.resolve(".output/chrome-mv3");

async function getExtensionId(context: BrowserContext, manifestVersion: "mv2" | "mv3") {
  let background: { url(): string };

  if (manifestVersion === "mv3") {
    [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent("serviceworker");
    }
  }
  if (manifestVersion === "mv2") {
    [background] = context.backgroundPages();
    if (!background) {
      background = await context.waitForEvent("backgroundpage");
    }
  }

  return background!.url().split("/")[2];
}

type FixtureProps = {
  context: BrowserContext;
  extensionId: string;
  popupPage: PopupPage;
  gate: ReturnType<typeof createGate>;
  profile: Profile;
  poms: typeof poms;
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
  popupPage: async ({ page, context }, use) => {
    const manifestVersion = pathToExtension.endsWith("-mv3") ? "mv3" : "mv2";
    const extensionId = await getExtensionId(context, manifestVersion);
    const popupPage = new PopupPage(page, extensionId);
    await use(popupPage);
  },
  gate: async ({ page }, use) => {
    const gate = createGate(page);
    await use(gate);
  },
  profile: async ({}, use) => {
    const profile = new Profile({
      name: "오지민",
      carrier: carrier.KT,
      phone_number: "01012345678",
      birth: "20010331",
      foreigner: isForeigner.NATIVE,
      gender: gender.MALE,
      way: way.SMS,
    });
    await use(profile);
  },
  poms,
});

export const { expect } = test;
