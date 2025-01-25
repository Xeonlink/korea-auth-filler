import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback(props: FallbackProps) {
  return (
    <main className="w-96 space-y-2 bg-base-300 p-4">
      <h1 className="text-lg font-bold">에러가 발생하였습니다. Error Occured</h1>
      {props.error instanceof Error ? (
        <h2 className="text-sm font-bold">{props.error.message}</h2>
      ) : null}
      <div className="scrollbar-hidden overflow-x-scroll">
        <p className="w-fit whitespace-pre">
          {props.error instanceof Error ? props.error.stack : props.error}
        </p>
      </div>
    </main>
  );
}
