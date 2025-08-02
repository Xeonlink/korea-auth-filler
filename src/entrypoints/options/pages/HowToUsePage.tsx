import KTCI from "@/assets/ci/kt_dark.png";
import LGUCI from "@/assets/ci/lgu.png";
import SKTCI from "@/assets/ci/skt.png";
import AfterProfileAdd from "@/assets/readme/after-profile-add.png";
import BeforeProfileAdd from "@/assets/readme/before-profile-add.png";
import ExtensionPinImg from "@/assets/readme/extension-pin.png";
import ProfileAddImg from "@/assets/readme/profile-add.png";
import oacxGif from "@/assets/readme/oacx.gif";

export function HowToUsePage() {
  return (
    <main className="p-10 text-sm">
      <h1 className="text-center font-bold text-2xl">사용법</h1>
      <div className="text-center mt-2">아래의 설명을 따라 차근차근 설정하시면 됩니다.</div>
      <section className="mt-10 max-w-2xl mx-auto space-y-8">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">1. 프로필 추가하기</div>
          <div className="collapse-content">
            <div>
              <p>
                왼쪽 메뉴에서 프로필 탭으로 이동한 후, 본인의 정보를 입력하여 프로필을 추가합니다.
                <br />
                여러 개의 프로필을 등록할 수 있으며, 체크박스로 사용할 프로필을 선택할 수 있습니다.
              </p>
              <div className="mt-4 flex flex-col gap-6">
                <div className="flex flex-col items-center">
                  <img
                    alt="프로필 추가 전 화면"
                    className="mx-auto max-w-lg"
                    src={BeforeProfileAdd}
                  />
                  <p className="mt-2 text-center italic">
                    1. 확장프로그램 아이콘을 클릭하여 팝업창이 열리기 전의 화면입니다.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img alt="프로필 추가 화면" className="mx-auto max-w-lg" src={ProfileAddImg} />
                  <p className="mt-2 text-center italic">
                    2. 사용자가 정보를 입력한 후 프로필 추가 버튼을 누르는 화면입니다.
                  </p>
                </div>
                <div className="mt-4 w-full max-w-lg">
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
                        <div>(알뜰폰도 선택 가능)</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    alt="프로필 추가 후 화면"
                    className="mx-auto max-w-lg"
                    src={AfterProfileAdd}
                  />
                  <p className="mt-2 text-center italic">
                    3. 성공적으로 추가된 프로필을 확인하는 결과 화면입니다.
                  </p>
                </div>
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
            <div className="flex flex-col items-center mt-4">
              <img alt="홈택스 자동 채우기 데모" className="mx-auto max-w-lg" src={oacxGif} />
              <p className="mt-2 text-center italic">
                1. 홈택스 로그인 페이지에서 자동 채우기 기능이 작동하는 예시입니다.
              </p>
            </div>
            <p className="mt-4 text-lg font-medium">문제 발생 시 확인 사항:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>프로필이 추가되었는지 확인합니다.</li>
              <li>입력한 정보가 정확한지 확인합니다.</li>
              <li>확장프로그램이 활성화되어 있는지 확인합니다.</li>
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
            <div className="flex flex-col items-center mt-4">
              <img
                alt="확장프로그램 고정 화면"
                className="mx-auto max-w-lg"
                src={ExtensionPinImg}
              />
              <p className="mt-2 text-center italic">
                1. 브라우저 상단에 확장프로그램 아이콘이 고정되어 언제든지 쉽게 접근할 수 있는
                상태를 보여줍니다.
              </p>
            </div>
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
