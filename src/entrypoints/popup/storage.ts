import type { StorageData } from "@/utils/type";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
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

export function useStorage2() {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<StorageData | null>(null);

  const update = async (items: Partial<StorageData>) => {
    if (data == null) return;
    const original = { ...data };
    try {
      setIsPending(true);
      setData({ ...data, ...items });
      await browser.storage.sync.set(original);
      const result = (await browser.storage.sync.get(null)) as StorageData;
      setData(result);
    } catch (error) {
      setData(original);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        const result = (await browser.storage.sync.get(null)) as StorageData;
        setData(result);
      } catch (error) {
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, []);

  return { isPending, update, data };
}
