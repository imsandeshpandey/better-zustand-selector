import { StoreApi, UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

const getStoreMapByKeys =
  <S extends Record<string, unknown>, K extends keyof S>(keys: K[]) =>
  (state: S) => {
    if (keys.length === 0) return state;

    const map = {} as { [T in K]: S[T] };
    for (const key of keys) {
      map[key] = state[key];
    }
    return map;
  };

export const createSelector = <TStore extends Record<string, unknown>>(
  store: UseBoundStore<StoreApi<TStore>>
) => {
  const useSelector = <Tkey extends keyof TStore>(...keys: Tkey[]) =>
    store(useShallow(getStoreMapByKeys(keys)));
  return useSelector;
};
