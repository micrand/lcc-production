import { fetchUser } from "@/services/cart";
import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

type AppStoreType = {
  bgColor: string;
  setBgColor: (color: string) => void;
  height: number;
  setHeight: (height: number) => void;
  openModalVideo: boolean;
  setOpenModalVideo: (bool: boolean) => void;
  usingImageKit: boolean;
  setUsingImageKit: (bool: boolean) => void;
  user: User | null;
  setUser: (newUser: User) => void;
  getUser: () => Promise<User | null>;
};

export const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      bgColor: "#d8fc31",
      setBgColor: (color: string) => set({ bgColor: color }),
      height: 129,
      setHeight: (height: number) => set({ height }),
      openModalVideo: false,
      setOpenModalVideo: (bool: boolean) => set({ openModalVideo: bool }),
      usingImageKit: true,
      setUsingImageKit: (bool: boolean) => set({ usingImageKit: bool }),
      user: null,
      setUser: (newUser) => set({ user: newUser }),
      getUser: async () => {
        const newUser = await fetchUser();
        set({ user: {...newUser, logged: true} });
        return newUser;
      }
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
