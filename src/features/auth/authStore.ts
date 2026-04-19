import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "@/lib/types";

interface AuthState {
  token: string | null;
  user: UserResponse | null;
  setSession: (token: string, user?: UserResponse | null) => void;
  setUser: (user: UserResponse | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user = null) => set({ token, user }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "streak-auth" },
  ),
);

export const isAuthenticated = () => Boolean(useAuthStore.getState().token);
