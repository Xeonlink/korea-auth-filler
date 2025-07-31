import { carrier, way } from "@/utils/constants";
import { test } from ".";

test("normal", async ({ popupPage, gate, profile, poms }) => {
  profile.mod({ carrier: carrier.KT, way: way.SMS });
  await popupPage.prepare(profile);

  await gate.국회SignUp.goto();
  const root = await gate.국회SignUp.open넥스원소프트();
  const pom = poms.nexonesoft(root, profile);

  await pom.step("인증벤더View", async (expect) => {
    await expect.providerView();
    await expect.selectProvider({ text: "신한인증서" });
  });

  await pom.step("채우기View", async (expect) => {
    await expect.채우기View();
    await expect.이름filled();
    await expect.생년월일filled();
    await expect.전화번호filled();
  });
});
