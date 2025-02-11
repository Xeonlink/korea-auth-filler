import { useStorage } from "@/hooks/useStorage";
import type { PageProps } from "../Options";

export function FillSettingsPage(_: PageProps) {
  const storage = useStorage();
  const { on, delay } = storage.data;

  const toggleEnabled = () => {
    storage.mutate({ on: !on });
  };
  const updateDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    storage.mutate({ delay: value });
  };

  return (
    <main className="p-10">
      <h1 className="text-center font-bold text-2xl">설정</h1>
      <div className="text-center text-sm mt-2">일하기 싫다.</div>
      <section className="mt-10 max-w-2xl mx-auto space-y-8">
        <div className="flex items-start gap-8 bg-base-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 w-40">
            <span className="font-bold text-base">OFF</span>
            <input checked={on} className="toggle" onChange={toggleEnabled} type="checkbox" />
            <span className="font-bold text-base">ON</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              본인인증 페이지에 접속했을 때 선택된 프로필의 정보가 자동으로 입력됩니다.
              <br />
              프로필 정보는 프로필 관리 페이지에서 설정할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-8 bg-base-200 p-4 rounded-lg">
          <div className="flex items-center gap-3 w-40">
            <input
              className="input input-bordered w-24 text-center"
              defaultValue={delay ?? 1000}
              max="10000"
              min="100"
              onBlur={updateDelay}
              step="100"
              type="number"
            />
            <span className="font-medium">검사 주기 (ms)</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              본인인증 페이지를 감지하는 주기를 설정합니다.
              <br />
              값이 작을수록 빠르게 감지하지만 브라우저 성능에 영향을 줄 수 있습니다.
              <br />
              100ms ~ 10,000ms 사이의 값을 입력할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
