import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreData {
  name: string;
  value: number;
}

interface UseStore {
  storeData: StoreData | null;
  setStoreData: (storeData: StoreData) => void;
}

const useStoreSwitcher = create(
  persist<UseStore>(
    (set) => ({
      storeData: {
        name: "All Stores",
        value: 0,
      },
      setStoreData: (storeData: StoreData) => set({ storeData }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStoreSwitcher;
