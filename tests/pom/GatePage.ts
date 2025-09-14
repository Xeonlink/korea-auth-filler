import { defineGate } from "../utils/gate";
import { type } from "@/utils/utils";

const authMethod = type<
  | "OACX"
  | "모바일신분증"
  | "한국모바일인증"
  | "NHN_KCP"
  | "토스인증"
  | "SCI평가정보"
  | "KCB"
  | "NICE평가정보"
  | "넥스원소프트"
  | "드림시큐리티"
  | "KG모빌리언스"
  | "YESKEY"
  | "다날"
  | "페이코"
  | "KG이니시스"
>();

export const createGate = defineGate(authMethod, {
  강원도Login: {
    url: "https://state.gwd.go.kr/portal/minwon/epeople/counsel",
    method: {
      한국모바일인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        const frame = page.frames()[1]!;
        await frame.waitForLoadState("networkidle");
        await frame.locator("a.be_03").click();
        const newPage = await pagePromise;
        return newPage;
      },
      모바일신분증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        const frame = page.frames()[1]!;
        await frame.waitForLoadState("networkidle");
        await frame.locator("a.be_06").click();
        const newPage = await pagePromise;
        return newPage;
      },
      YESKEY: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        const frame = page.frames()[1]!;
        await frame.waitForLoadState("networkidle");
        await frame.locator("a.be_05").click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  ktSignUp: {
    url: "https://idmng.kt.com/identify/personal",
    method: {
      한국모바일인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "PASS 또는 아이핀으로 인증하기" }).click();
        await page.getByRole("button", { name: "PASS로 인증하기" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  고용24Login: {
    url: "https://www.work24.go.kr/cm/z/b/0210/openLginPageForAnyId.do?loginGbn=EBM01&untySsoFlag=Y#/",
    method: {
      모바일신분증: async (page) => {
        await page.getByRole("link", { name: "모바일 신분증" }).first().click();
        const locator = page.locator("#mipEmbededContents");
        return locator;
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
        return newPage;
      },
    },
  },
  디지털원패스FindId: {
    url: "https://www.onepass.go.kr/membership/find/id",
    method: {
      KCB: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "휴대폰 인증" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
      토스인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "토스인증" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  롯데홈쇼핑SignUp: {
    url: "https://www.lotteimall.com/member/regist/forward.MemberRegist.lotte",
    method: {
      SCI평가정보: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByLabel("동의하기").check();
        await page.getByText("휴대폰 인증").click();
        const newPage = await pagePromise;
        return newPage;
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
        return newPage;
      },
    },
  },
  서울시평생교육원Login: {
    url: "https://www.lllcard.kr/reg/seoul/main/crtfctPage.do",
    method: {
      OACX: async (page) => {
        await page.getByRole("button", { name: "간편인증" }).click();
        await page.getByRole("link", { name: "인증", exact: true }).click();
        return page;
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
        return newPage;
      },
      NICE평가정보: async (page) => {
        await page.getByRole("link", { name: "본인확인 로그인" }).click();
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "휴대폰" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  부산시FindId: {
    url: "https://www.busan.go.kr/member/findId",
    method: {
      NICE평가정보: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "휴대폰 인증하기" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  예비군Login: {
    url: "https://www.yebigun1.mil.kr/dmobis/uat/uia/LoginUsr.do",
    method: {
      OACX: async (page) => {
        await page.getByRole("button", { name: "간편인증" }).click();
        return page;
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
        return newPage;
      },
    },
  },
  홈택스Login: {
    url: "https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&initPage=agitxLogin",
    method: {
      OACX: async (page) => {
        await page.waitForLoadState("networkidle");
        const frameLocator = page.frameLocator("iframe[name='simple_iframeView']");
        await page.getByRole("button", { name: "간편 인증" }).filter({ visible: true }).click();
        await page.getByTitle("간편인증").filter({ visible: true }).click();
        return frameLocator;
      },
      모바일신분증: async (page) => {
        await page.waitForLoadState("networkidle");
        await page.locator("#mf_txppWframe_anchor16").click();
        await page.locator("#mf_txppWframe_anchor24").click();
        const frameLocator = page.frameLocator("iframe[title='모바일신분증 인증']");
        return frameLocator;
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
        return newPage;
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
        return newPage;
      },
    },
  },
  국회SignUp: {
    url: "https://member.assembly.go.kr/member/join/joinSelectPage.do",
    method: {
      넥스원소프트: async (page) => {
        await page.getByText("일반회원", { exact: true }).first().click();
        await page.getByLabel("모든 약관에 동의합니다.").click();
        await page.getByRole("link", { name: "동의합니다", exact: true }).click();
        await page.getByRole("link", { name: "민간인증서 인증" }).click();
        const locator = page.locator(`#dsh-root`);
        await page.waitForLoadState("networkidle");
        return locator;
      },
    },
  },
  hPointSignUp: {
    url: "https://www.h-point.co.kr/cu/join/start.nhd",
    method: {
      드림시큐리티: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "휴대폰 인증" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  make샵SignUp: {
    url: "https://www.makeshop.co.kr/newmakeshop/home/create_shop.html",
    method: {
      드림시큐리티: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "본인인증" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  야놀자SignUp: {
    url: "https://accounts.yanolja.com/?service=yanolja",
    method: {
      KG모빌리언스: async (page) => {
        await page.getByRole("button", { name: "이메일로 시작하기" }).click();
        await page.getByRole("button", { name: "이메일로 가입하기" }).click();
        await page.getByRole("button", { name: "전체 동의" }).click();
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "본인 인증하기" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  인터파크티켓_본인인증: {
    url: "https://member.interpark.com/mypage/enter-identity",
    method: {
      한국모바일인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("button", { name: "본인 인증" }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  blank: {
    url: "about:blank",
    method: {
      다날: async (page) => {
        const newPage = await page.context().newPage();
        await newPage.evaluate(() => {
          const form = document.createElement("form");
          form.setAttribute("method", "post");
          form.setAttribute("action", "https://wauth.teledit.com/Danal/WebAuth/Web/Start.php");

          const input = document.createElement("input");
          input.setAttribute("name", "TID");
          input.setAttribute("value", "202508011549039561634010");

          form.appendChild(input);
          document.body.appendChild(form);
          form.submit();
        });
        return newPage;
      },
    },
  },
  paycoLogin: {
    url: "https://www.payco.com/",
    method: {
      페이코: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "로그인" }).click();
        const newPage = await pagePromise;

        await newPage.getByRole("link", { name: "아이디 찾기" }).click();
        await newPage.getByRole("button", { name: "휴대폰 인증" }).click();

        return newPage;
      },
    },
  },
  paycoSignUp: {
    url: "https://www.payco.com/",
    method: {
      페이코: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "회원가입" }).click();
        const newPage = await pagePromise;

        await newPage.locator("#checkboxAll").check();
        await newPage.locator("#confirmButton").click();

        return newPage;
      },
    },
  },
  고속도로통행료: {
    url: "https://www.hipass.co.kr/comm/lginpg.do#",
    method: {
      페이코: async (page) => {
        await page.getByRole("link", { name: "SNS 인증" }).click();

        const pagePromise = page.context().waitForEvent("page");
        await page.getByRole("link", { name: "페이코 로그인" }).click();
        const newPage = await pagePromise;

        await newPage.getByRole("link", { name: "아이디 찾기" }).click();
        await newPage.getByRole("button", { name: "휴대폰 인증" }).click();
        return newPage;
      },
    },
  },
  kfcSignUp: {
    url: "https://www.kfckorea.com/member/join",
    method: {
      KG이니시스: async (page) => {
        await page.locator(".clause-all .agree").click();
        await page.getByText("다음", { exact: true }).click();
        const pagePromise = page.context().waitForEvent("page");
        await page.getByText("본인 인증", { exact: true }).click();
        const newPage = await pagePromise;
        return newPage;
      },
    },
  },
  본인확인_즉시차단해제: {
    url: "https://www.kmcert.com/kmcis/web_v2/kmcisBlockSelfClear_v2.jsp",
    method: {
      한국모바일인증: async (page) => {
        const pagePromise = page.context().waitForEvent("page");
        await page.getByAltText("차단 해제하기 버튼").click();
        const newPage = await pagePromise;
        await newPage.getByText("휴대폰 본인확인", { exact: true }).click();
        return newPage;
      },
    },
  },
});
