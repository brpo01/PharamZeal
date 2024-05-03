import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  id: number;
  phoneNumber: string;
  address: [];
  role: {
    id: number;
    name: string;
  };
  store: {
    id: number;
    name: string;
    address: string;
  };
}

interface UserStore {
  userData: UserData | null;
  setUser: (userData: UserData) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userData: null,
      setUser: (userData: UserData) => set({ userData }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
