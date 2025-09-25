import nhnkcpGif from "@/assets/gif/nhnkcp.gif";
import sciGif from "@/assets/gif/sci.gif";
import niceGif from "@/assets/gif/nice.gif";
import kmcertGif from "@/assets/gif/kmcert.gif";
import oacxGif from "@/assets/gif/oacx.gif";
import tossGif from "@/assets/gif/toss.gif";
import dreamGif from "@/assets/gif/dream.gif";
import danalGif from "@/assets/gif/danal.gif";
import nexonesoftGif from "@/assets/gif/nexonesoft.gif";
import kgmobiliansGif from "@/assets/gif/kgmobilians.gif";
import kgiGif from "@/assets/gif/kgi.gif";

const images = [
  {
    name: "토스",
    src: tossGif,
    alt: "토스 자동 채우기 데모",
  },
  {
    name: "NICE평가정보",
    src: niceGif,
    alt: "NICE평가정보 데모",
  },
  {
    name: "한국모바일인증",
    src: kmcertGif,
    alt: "한국모바일인증 데모",
  },
  {
    name: "SCI 평가정보",
    src: sciGif,
    alt: "SCI 평가정보 데모",
  },
  {
    name: "NHN KCP",
    src: nhnkcpGif,
    alt: "NHN KCP 데모",
  },
  {
    name: "드림시큐리티",
    src: dreamGif,
    alt: "드림시큐리티 데모",
  },
  {
    name: "다날",
    src: danalGif,
    alt: "다날 데모",
  },
  {
    name: "넥스원소프트",
    src: nexonesoftGif,
    alt: "넥스원소프트 데모",
  },
  {
    name: "KG모빌리언스",
    src: kgmobiliansGif,
    alt: "KG모빌리언스 데모",
  },
  {
    name: "KG이니시스",
    src: kgiGif,
    alt: "KG이니시스 데모",
  },
];

export function IntroPage() {
  return (
    <div className="flex w-full">
      <main className="container mx-auto p-10">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-2xl font-bold">한국인증채우기 확장프로그램</h1>
          <p className="text-sm">
            모바일 본인인증 자동 채우기 기능을 통해 귀하의 인증 절차를 간편하게 만들어드립니다.
          </p>
        </div>
        {/* First Demo Image */}
        <div className="mb-6">
          <div className="group relative mx-auto max-w-md">
            <img
              alt="홈택스 OACX 자동 채우기 데모"
              className="h-auto w-full rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={oacxGif}
            />
            <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40">
              <span className="text-lg font-semibold text-white">홈택스 (OACX)</span>
            </div>
          </div>
        </div>
        {/* Masonry Layout for Remaining Images */}
        <div className="columns-1 gap-6 sm:columns-2 md:columns-3 lg:columns-4">
          {images.map((image) => (
            <div className="group relative mb-6 break-inside-avoid" key={image.name}>
              <img
                alt={image.alt}
                className="h-auto w-full rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
                src={image.src}
              />
              <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40">
                <span className="text-lg font-semibold text-white">{image.name}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
