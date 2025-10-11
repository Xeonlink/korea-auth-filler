import type { Handler, StorageData } from "@/utils/type";

const handlers: Handler<any>[] = [];

export function defineHandler<VN extends keyof StorageData["vendorOptions"] | ({} & string)>(
  vendorName: VN,
  rawHandler: Omit<Handler<VN>, "name">,
) {
  const handler: Handler<VN> = {
    name: vendorName,
    ...rawHandler,
  };

  handlers.push(handler);
}

export async function importHandlers() {
  await import("./oacx");
  await import("./nice");
  await import("./kcb");
  await import("./kmcert");
  await import("./sci");
  await import("./nhnkcp");
  await import("./mobileid");
  await import("./dream");
  await import("./danal");
  await import("./nexonesoft");
  await import("./kgmobilians");
  await import("./payco");
  await import("./kgi");
  await import("./toss");
  await import("./YESKEY");

  return handlers;
}
