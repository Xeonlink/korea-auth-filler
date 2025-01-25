import type { StorageData } from "@/utils/type";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { browser } from "wxt/browser";

/**
 * browser.storage.sync에서 스토리지 데이터를 가져오는 훅
 *
 * @returns 스토리지 데이터를 포함하는 쿼리 결과
 */
export function useStorageData() {
  return useSuspenseQuery({
    queryKey: ["storage"],
    queryFn: async () => {
      const res = (await browser.storage.sync.get(null)) as StorageData;
      if (Object.keys(res).length === 0) {
        throw new Error("Storage data not found");
      }
      return res;
    },
  });
}

/**
 * 브라우저 스토리지를 업데이트하는 훅
 *
 * @returns 스토리지 업데이트를 위한 뮤테이션 객체
 */
export function useUpdateStorage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["storage"],
    mutationFn: (items: Partial<StorageData>) => {
      return browser.storage.sync.set(items);
    },
    onMutate: (items: Partial<StorageData>) => {
      const oldData = queryClient.getQueryData(["storage"]);
      queryClient.setQueryData(["storage"], (oldData: StorageData) => {
        return { ...oldData, ...items };
      });
      return { oldData };
    },
    onError: (error, items, context) => {
      if (!context) return;
      queryClient.setQueryData(["storage"], context.oldData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["storage"],
      });
    },
  });
}

export function useStorage() {
  const { data } = useStorageData();
  const { mutate, isPending } = useUpdateStorage();
  return { data, mutate, isPending };
}
