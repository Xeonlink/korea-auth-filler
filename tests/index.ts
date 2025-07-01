import { test as base, chromium, Page, type BrowserContext } from "@playwright/test";
import path from "path";
import { RawProfile } from "@/utils/type";
import { carrier, gender, isForeigner, way } from "@/utils/constants";
import { usePopup } from "./usePopup";

const pathToExtension = path.resolve(".output/chrome-mv3");

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
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
});

export const expect = test.expect;

export const mockRawProfile: Omit<RawProfile, "id"> = {
  name: "오지민",
  carrier: carrier.KT_MVNO,
  phone_number: "01012345678",
  birth: "20010331",
  foreigner: isForeigner.NATIVE,
  gender: gender.MALE,
  way: way.SMS,
};

export const setProfileToUse = async (
  page: Page,
  extensionId: string,
  partialRawProfile: Partial<RawProfile>,
) => {
  const popup = await usePopup(page, extensionId);
  const rawProfile = { ...mockRawProfile, ...partialRawProfile };
  await popup.addProfile(rawProfile);
  await popup.selectProfile(0);
  return rawProfile;
};
