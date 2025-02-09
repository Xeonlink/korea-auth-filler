import type { PageProps } from "../Options";
import KTCI from "@/assets/ci/kt_dark.png";
import SKTCI from "@/assets/ci/skt.png";
import LGUCI from "@/assets/ci/lgu.png";

export function HowToUsePage(_: PageProps) {
  return (
    <main className="p-10">
      <h1 className="text-center font-bold text-2xl">사용법</h1>
      <div className="text-center text-sm mt-2">안 알려줌이 아니고 잘 알려줌 아마도...</div>
      <section className="mt-10 max-w-2xl mx-auto space-y-8">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">1. 프로필 등록하기</div>
          <div className="collapse-content">
            <div>
              <p>
                왼쪽 메뉴에서 프로필 탭으로 이동한 후, 본인의 정보를 입력하여 프로필을 등록합니다.
                <br />
                여러 개의 프로필을 등록할 수 있으며, 체크박스로 사용할 프로필을 선택할 수 있습니다.
              </p>

              <div className="mt-4">
                <p className="font-medium">입력 가능한 정보:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>이름 (예: 홍길동)</li>
                  <li>생년월일 (예: 19900101)</li>
                  <li>전화번호 (예: 01012345678)</li>
                  <li>내/외국인 여부</li>
                  <li>성별 (남자/여자)</li>
                  <li>
                    통신사 선택:
                    <div className="flex gap-4 items-center mt-2 ml-4">
                      <div className="flex flex-col items-center gap-1">
                        <img alt="KT" className="h-4" src={KTCI} />
                        <span className="text-xs">KT</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <img alt="SKT" className="h-6" src={SKTCI} />
                        <span className="text-xs">SKT</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <img alt="LGU" className="h-5" src={LGUCI} />
                        <span className="text-xs">LGU+</span>
                      </div>
                      <div className="text-sm">(알뜰폰도 선택 가능)</div>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="mt-4">
                등록된 프로필은 언제든지 삭제할 수 있으며, 한 번에 하나의 프로필만 선택하여 사용할
                수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">2. 자동 채우기 사용하기</div>
          <div className="collapse-content">
            <p>
              본인인증이 필요한 페이지에 접속하면 자동으로 인식하여 프로필 정보가 입력됩니다.
              <br />
              설정에서 자동 채우기를 활성화/비활성화할 수 있습니다.
            </p>
            <p className="mt-2">지원하는 서비스:</p>
            <ul className="list-disc list-inside mt-1 space-y-2">
              <li>홈택스 (OACX)</li>
              <li>서울시 (모바일 인증)</li>
              <li>부산시 (모바일 인증)</li>
              <li>대전시 (모바일 인증)</li>
              <li>정부24 (모바일 인증)</li>
              <li>경기도청 (모바일 인증)</li>
              <li>한국도로공사 (모바일 인증)</li>
              <li>국민건강보험 (모바일 인증)</li>
              <li>NICE 본인인증 사용 사이트</li>
              <li>KG이니시스 본인인증 사용 사이트</li>
              <li>토스 본인인증 사용 사이트</li>
              <li>신한은행 본인인증 사용 사이트</li>
            </ul>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">3. 확장프로그램 고정하기</div>
          <div className="collapse-content">
            <p>브라우저 상단의 확장프로그램 아이콘을 쉽게 찾을 수 있도록 고정할 수 있습니다.</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>브라우저 상단 오른쪽의 퍼즐 모양 아이콘을 클릭합니다.</li>
              <li>목록에서 본 확장프로그램을 찾아 핀 모양 아이콘을 클릭합니다.</li>
              <li>이제 브라우저 상단에서 항상 확장프로그램 아이콘을 볼 수 있습니다.</li>
            </ol>
          </div>
        </div>

        <div className="alert">
          <p>
            <span className="font-bold">참고:</span> 본 확장 프로그램은 사용자의 개인정보를 브라우저
            내에만 저장하며, 외부로 전송하지 않습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
