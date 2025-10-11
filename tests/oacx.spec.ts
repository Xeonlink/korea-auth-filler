import { test } from ".";
import { poms } from "./pom/PomPage";
import jumin from "./utils/jumin";

test("normal, iframe", async ({ popupPage, gate, profile, poms }) => {
  await popupPage.prepare(profile);

  await gate.홈택스Login.goto();
  const root = await gate.홈택스Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("네이버", async (expect) => {
    await root.locator(".provider-list li", { hasText: "네이버" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });

  await pom.step("통신사PASS", async (expect) => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.통신사filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });
});

test("normal, _blank", async ({ popupPage, gate, profile, poms }) => {
  await popupPage.prepare(profile);

  await gate.자원봉사포털Login.goto();
  const root = await gate.자원봉사포털Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("네이버", async (expect) => {
    await root.locator(".provider-list li", { hasText: "네이버" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });

  await pom.step("통신사PASS", async (expect) => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.통신사filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });
});

test("legacy, embeded", async ({ popupPage, gate, profile, poms }) => {
  await popupPage.prepare(profile);

  await gate.예비군Login.goto();
  const root = await gate.예비군Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("네이버", async (expect) => {
    await root.getByTitle("네이버 인증서").filter({ visible: true }).click();
    await expect.이름filled();
    await expect.주민번호앞자리filled();
    await expect.주민번호성별filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });

  await pom.step("통신사패스", async (expect) => {
    await root.getByTitle("통신사패스 인증서").filter({ visible: true }).click();
    await expect.이름filled();
    await expect.주민번호앞자리filled();
    await expect.주민번호성별filled();
    await expect.통신사filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });
});

test("normal, embeded, some filled", async ({ popupPage, gate, profile }) => {
  await popupPage.prepare(profile);

  await gate.서울시평생교육원Login.goto();
  const [dummy주민번호앞자리, dummy주민번호뒷자리] = jumin()[0].split("-");
  await gate.서울시평생교육원Login.fillInfo({
    name: "홍길동",
    ssn1: dummy주민번호앞자리,
    ssn2: dummy주민번호뒷자리,
  });
  const root = await gate.서울시평생교육원Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("네이버", async (expect) => {
    await root.locator(".provider-list li", { hasText: "네이버" }).click();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });

  await pom.step("통신사PASS", async (expect) => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await expect.통신사filled();
    await expect.전화번호앞자리filled();
    await expect.전화번호뒷자리filled();
    await expect.모든동의Checked();
  });
});

test("raon(noraml, _blank)", async ({ popupPage, gate, profile, poms }) => {
  await popupPage.prepare(profile);

  await gate.서울시Login.goto();
  const root = await gate.서울시Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("우리인증서", async (expect) => {
    await root.locator(".provider-list li", { hasText: "우리인증서" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });

  await pom.step("카카오뱅크", async (expect) => {
    await root.locator(".provider-list li", { hasText: "카카오뱅크" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });
});

test("raon(normal, _blank) has PASS", async ({ popupPage, gate, profile, poms }) => {
  await popupPage.prepare(profile);

  await gate.삼성서울병원Login.goto();
  const root = await gate.삼성서울병원Login.openOACX();
  const pom = poms.oacx(root, profile);

  await pom.step("신한인증서", async (expect) => {
    await root.locator(".provider-list li", { hasText: "신한인증서" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });

  await pom.step("통신사PASS", async (expect) => {
    await root.locator(".provider-list li", { hasText: "통신사PASS" }).click();
    await expect.이름filled();
    await expect.생년원일filled();
    await expect.통신사filled();
    await expect.전화번호filled();
    await expect.모든동의Checked();
  });
});
