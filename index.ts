import { StoreApi, UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

const getStoreMapByKeys =
  <S extends Record<string, unknown>, K extends keyof S>(keys: K[]) =>
  (state: S) => {
    return keys.reduce((acc, key) => {
      acc[key] = state[key];
      return acc;
    }, {} as { [T in K]: S[T] });
  };

export type UseSelector<
  TStore extends Record<string, unknown>,
  TKey extends keyof TStore = keyof TStore
> = (...keys: TKey[]) => Record<TKey, TStore[TKey]>;

export const createSelector = <TStore extends Record<string, unknown>>(
  store: UseBoundStore<StoreApi<TStore>>
) => {
  const useSelector: UseSelector<TStore> = (...keys) =>
    store(useShallow(getStoreMapByKeys(keys)));
  return useSelector;
};
