import { test } from ".";
import type { RawProfile } from "@/utils/type";
import jumin from "./utils/jumin";

test("normal, iframe", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.홈택스Login.goto();
  const page = await gate.홈택스Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("드림인증", async () => {
    await root.locator(".provider-list li", { hasText: "드림인증" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사PASS", async () => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect통신사filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });
});

test("normal, _blank", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.자원봉사포털Login.goto();
  const page = await gate.자원봉사포털Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("네이버", async () => {
    await root.locator(".provider-list li", { hasText: "네이버" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사PASS", async () => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect통신사filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });
});

test("legacy, embeded", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.예비군Login.goto();
  const page = await gate.예비군Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("네이버", async () => {
    await root.getByTitle("네이버 인증서").filter({ visible: true }).click();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사패스", async () => {
    await root.getByTitle("통신사패스 인증서").filter({ visible: true }).click();
    await page.expect이름filled();
    await page.expect주민번호앞자리filled();
    await page.expect주민번호뒷자리filled();
    await page.expect통신사filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });
});

test("normal, embeded, some filled", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.서울시평생교육원Login.goto();
  const [dummy주민번호앞자리, dummy주민번호뒷자리] = jumin()[0].split("-");
  await gate.서울시평생교육원Login.fillInfo({
    name: "홍길동",
    ssn1: dummy주민번호앞자리,
    ssn2: dummy주민번호뒷자리,
  });
  const page = await gate.서울시평생교육원Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("네이버", async () => {
    await root.locator(".provider-list li", { hasText: "네이버" }).click();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사PASS", async () => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await page.expect통신사filled();
    await page.expect전화번호앞자리filled();
    await page.expect전화번호뒷자리filled();
    await page.expect모든동의Checked();
  });
});

test("raon(noraml, _blank)", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.서울시Login.goto();
  const page = await gate.서울시Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("우리인증서", async () => {
    await root.locator(".provider-list li", { hasText: "우리인증서" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호filled();
    await page.expect모든동의Checked();
  });

  await test.step("카카오뱅크", async () => {
    await root.locator(".provider-list li", { hasText: "카카오뱅크" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호filled();
    await page.expect모든동의Checked();
  });
});

test("raon(normal, _blank) has PASS", async ({ popupPage, gate, mockRawProfile }) => {
  const rawProfile: Omit<RawProfile, "id"> = mockRawProfile;
  await popupPage.goto();
  await popupPage.addProfile(rawProfile);
  await popupPage.selectProfile(0);

  await gate.삼성서울병원Login.goto();
  const page = await gate.삼성서울병원Login.openOACX();
  const root = await page.unvailRoot();
  await page.prepare(rawProfile);

  await test.step("신한인증서", async () => {
    await root.locator(".provider-list li", { hasText: "신한인증서" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect전화번호filled();
    await page.expect모든동의Checked();
  });

  await test.step("통신사PASS", async () => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await page.expect이름filled();
    await page.expect생년원일filled();
    await page.expect통신사filled();
    await page.expect전화번호filled();
    await page.expect모든동의Checked();
  });
});
