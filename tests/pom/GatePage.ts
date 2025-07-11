import { defineGate } from "../utils/gate";
import { OKnamePage } from "./OKnamePage";
import { SCI평가정보Page } from "./SCI평가정보Page";
import { 토스인증Page } from "./토스인증Page";
import { 모바일신분증Page } from "./모바일신분증Page";
import { 한국모바일인증Page } from "./한국모바일인증Page";
import { OACXPage } from "./OACXPage";
import { NICE평가정보Page } from "./NICE평가정보Page";
import { NHN_KCPPage } from "./NHN_KCPPage";
import { 넥스원소프트Page } from "./넥스원소프트Page";

type AuthMethod =
  | "OACX"
  | "모바일신분증"
  | "한국모바일인증"
  | "NHN_KCP"
  | "모바일신분증"
  | "토스인증"
  | "SCI평가정보"
  | "OKname"
  | "NICE평가정보"
  | "넥스원소프트";

export const createGate = defineGate<AuthMethod>()({
  강원도Login: {
    url: "https://state.gwd.go.kr/portal/minwon/epeople/counsel",
    method: {
      모바일신분증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_06").click();
        return new 모바일신분증Page(await pagePromise);
      },
      한국모바일인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.frameLocator(`iframe[title="민원상담신청"]`).locator("a.be_03").click();
        return new 한국모바일인증Page(await pagePromise);
      },
    },
  },
  고용24Login: {
    url: "https://www.work24.go.kr/cm/z/b/0210/openLginPageForAnyId.do?loginGbn=EBM01&untySsoFlag=Y#/",
    method: {
      모바일신분증: async (page) => {
        await page.getByRole("link", { name: "모바일 신분증" }).first().click();
        const locator = page.locator("#mipEmbededContents");
        return new 모바일신분증Page(locator);
      },
    },
  },
  대전시Login: {
    url: "https://www.daejeon.go.kr/integ/integNonmemberLoginProc.do?siteCd=drh&rtUrl=",
    method: {
      SCI평가정보: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "인증하기" }).first().click();
        const newPage = await pagePromise;
        return new SCI평가정보Page(newPage);
      },
    },
  },
  디지털원패스FindId: {
    url: "https://www.onepass.go.kr/membership/find/id",
    method: {
      OKname: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "휴대폰 인증" }).click();
        const newPage = await pagePromise;
        return new OKnamePage(newPage);
      },
      토스인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "토스인증" }).click();
        const newPage = await pagePromise;
        return new 토스인증Page(newPage);
      },
    },
  },
  롯데홈쇼핑Signup: {
    url: "https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte",
    method: {
      SCI평가정보: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByLabel("동의하기").check();
        await page.getByText("휴대폰 인증").click();
        const newPage = await pagePromise;
        return new SCI평가정보Page(newPage);
      },
    },
  },
  삼성서울병원Login: {
    url: "https://www.samsunghospital.com/home/member/login.do",
    method: {
      OACX: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "간편인증" }).click();
        const newPage = await pagePromise;
        return new OACXPage(newPage);
      },
    },
  },
  서울시평생교육원Login: {
    url: "https://www.lllcard.kr/reg/seoul/main/crtfctPage.do",
    method: {
      OACX: async (page) => {
        await page.getByRole("button", { name: "간편인증" }).click();
        await page.getByRole("link", { name: "인증", exact: true }).click();
        return new OACXPage(page);
      },
    },
    extra: {
      fillInfo: async (page, variables: { name: string; ssn1: string; ssn2: string }) => {
        await page.locator(`input[name="authMberNm"]`).fill(variables.name);
        await page.locator(`input[name="authIhidnum1"]`).fill(variables.ssn1);
        await page.locator(`input[name="authIhidnum2"]`).fill(variables.ssn2);
      },
    },
  },
  서울시Login: {
    url: "https://www.seoul.go.kr/member/userlogin/loginCheck.do",
    method: {
      OACX: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "본인확인 로그인" }).click();
        await page.getByRole("button", { name: "민간인증서" }).click();
        const newPage = await pagePromise;
        return new OACXPage(newPage);
      },
      NICE평가정보: async (page) => {
        await page.getByRole("link", { name: "본인확인 로그인" }).click();
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "휴대폰" }).click();
        const newPage = await pagePromise;
        return new NICE평가정보Page(newPage);
      },
    },
  },
  예비군Login: {
    url: "https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do",
    method: {
      OACX: async (page) => {
        await page.getByRole("button", { name: "간편인증" }).click();
        return new OACXPage(page);
      },
    },
  },
  자원봉사포털Login: {
    url: "https://www.1365.go.kr/vols/P9910/mber/volsLogin.do",
    method: {
      OACX: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByText("간편인증", { exact: true }).click();
        const newPage = await pagePromise;
        return new OACXPage(newPage);
      },
    },
  },
  홈택스Login: {
    url: "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&initPage=agitxLogin",
    method: {
      OACX: async (page) => {
        const frameLocator = page.frameLocator("iframe[name='simple_iframeView']");
        await page.getByRole("button", { name: "간편 인증" }).filter({ visible: true }).click();
        await page.getByTitle("간편인증").filter({ visible: true }).click();
        return new OACXPage(frameLocator);
      },
      모바일신분증: async (page) => {
        await page.locator("#mf_txppWframe_anchor16").click();
        await page.locator("#mf_txppWframe_anchor24").click();
        const frameLocator = page.frameLocator("iframe[title='모바일신분증 인증']");
        return new 모바일신분증Page(frameLocator);
      },
    },
  },
  cafe24SignUp: {
    url: "https://user.cafe24.com/join/hosting/general/?page=step1&landTime=1751035289",
    method: {
      NHN_KCP: async (page) => {
        await page.locator("#agreeAll").check({ force: true });
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: " 휴대폰 인증" }).click();
        const newPage = await pagePromise;
        return new NHN_KCPPage(newPage);
      },
    },
  },
  goldenBrownTest: {
    url: "https://www.goldenbrown.co.kr/_api/_nhnkcp/kcpcert_api/sample/make_hash.php",
    method: {
      NHN_KCP: async (page) => {
        await page.getByRole("link", { name: "hash 생성요청" }).click();
        const pagePromise = page.context().waitForEvent("page");
        await page.locator(`input[value="인증요청"]`).click();
        const newPage = await pagePromise;
        return new NHN_KCPPage(newPage);
      },
    },
  },
  국회Signup: {
    url: "https://member.assembly.go.kr/member/join/joinSelectPage.do",
    method: {
      넥스원소프트: async (page) => {
        await page.getByText("일반회원", { exact: true }).first().click();
        await page.waitForLoadState("load");
        await page.getByLabel("모든 약관에 동의합니다.").click();
        await page.getByRole("link", { name: "동의합니다", exact: true }).click();
        await page.waitForLoadState("load");
        await page.getByRole("link", { name: "민간인증서 인증" }).click();
        await page.waitForLoadState("networkidle");
        const locator = page.locator(`#dsh-root`);
        return new 넥스원소프트Page(locator);
      },
    },
  },
});
