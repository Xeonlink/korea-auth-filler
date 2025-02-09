import type { PageProps } from "../Options";
import 홈택스OacxGif from "@/assets/gif/홈택스-oacx.gif";
import 부산시모바일인증Gif from "@/assets/gif/부산시-모바일인증.gif";
import 서울시모바일인증Gif from "@/assets/gif/서울시-모바일인증.gif";
import 대전시모바일인증Gif from "@/assets/gif/대전시-모바일인증.gif";
import extra2모바일인증Gif from "@/assets/gif/extra2-모바일인증.gif";

export function IntroPage(_: PageProps) {
  return (
    <div className="w-full flex">
      <main className="container mx-auto p-10">
        <h1 className="text-center font-bold text-2xl">소개</h1>
        <div className="text-center text-sm mt-2">
          대한민국 본인인증 자동 채우기 브라우저 확장 프로그램
        </div>
        <section className="flex gap-6 flex-wrap mt-10 justify-center">
          <img alt="홈택스-oacx" className="h-96 rounded-xl border" src={홈택스OacxGif} />
          <img
            alt="부산시-모바일인증"
            className="w-80 rounded-xl border"
            src={부산시모바일인증Gif}
          />
          <img
            alt="서울시-모바일인증"
            className="w-80 rounded-xl border"
            src={서울시모바일인증Gif}
          />
          <img
            alt="대전시-모바일인증"
            className="w-80 rounded-xl border"
            src={대전시모바일인증Gif}
          />
          <img
            alt="extra2-모바일인증"
            className="w-80 rounded-xl border"
            src={extra2모바일인증Gif}
          />
        </section>
      </main>
    </div>
  );
}
