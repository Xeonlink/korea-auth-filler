import extra2모바일인증Gif from "@/assets/gif/extra2-모바일인증.gif";
import 대전시모바일인증Gif from "@/assets/gif/대전시-모바일인증.gif";
import 부산시모바일인증Gif from "@/assets/gif/부산시-모바일인증.gif";
import 서울시모바일인증Gif from "@/assets/gif/서울시-모바일인증.gif";
import 홈택스OacxGif from "@/assets/gif/홈택스-oacx.gif";
import tossGif from "@/assets/gif/toss.gif";

export function IntroPage() {
  return (
    <div className="w-full flex">
      <main className="container mx-auto p-10">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-4">한국인증채우기 확장프로그램</h1>
          <p className="text-sm">
            모바일 본인인증 자동 채우기 기능을 통해 귀하의 인증 절차를 간편하게 만들어드립니다.
          </p>
        </div>
        {/* First Demo Image */}
        <div className="mb-6">
          <div className="group relative mx-auto max-w-md">
            <img
              alt="홈택스 OACX 자동 채우기 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={홈택스OacxGif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">홈택스 (OACX)</span>
            </div>
          </div>
        </div>
        {/* Masonry Layout for Remaining Images */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
          <div className="group relative break-inside-avoid mb-6">
            <img
              alt="토스로 인증하기 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={tossGif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">토스로 인증하기</span>
            </div>
          </div>
          <div className="group relative break-inside-avoid mb-6">
            <img
              alt="부산시 모바일 인증 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={부산시모바일인증Gif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">부산시 모바일 인증</span>
            </div>
          </div>
          <div className="group relative break-inside-avoid mb-6">
            <img
              alt="서울시 모바일 인증 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={서울시모바일인증Gif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">서울시 모바일 인증</span>
            </div>
          </div>
          <div className="group relative break-inside-avoid mb-6">
            <img
              alt="SCI 평가정보 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={대전시모바일인증Gif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">SCI 평가정보</span>
            </div>
          </div>
          <div className="group relative break-inside-avoid mb-6">
            <img
              alt="기타 모바일 인증 데모"
              className="w-full h-auto rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
              src={extra2모바일인증Gif}
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                 group-hover:opacity-100 transition-opacity duration-300 flex 
                 items-center justify-center rounded-xl"
            >
              <span className="text-white font-semibold text-lg">기타 모바일 인증</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
