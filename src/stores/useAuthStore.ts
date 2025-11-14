import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Profile } from "@/types/profile";
import supabase from "@/utils/supabase";

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
  hydrateFromAuth: () => Promise<void>;
  clearAuth: () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        isLoading: true,
        user: null,
        profile: null,

        hydrateFromAuth: async () => {
          set({ isLoading: true });

          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error || !session) {
            set({ user: null, profile: null, isLoading: false });
            return;
          }

          const { user } = session;
          set((state: AuthStore) => {
            state.user = user;
          });

          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("auth_id", user.id)
            .single();

          if (profileError) {
            console.error(
              "프로필 조회 실패: DB에서 사용자 프로필을 가져오는 중 오류가 발생했습니다.",
              profileError
            );
            set({ profile: null, isLoading: false });
            return;
          }

          set({ profile, isLoading: false });
        },

        clearAuth: () =>
          set((state: AuthStore) => {
            state.user = null;
            state.profile = null;
            state.isLoading = false;
          }),

        signOut: async () => {
          await supabase.auth.signOut();
        },
      })),
      {
        name: "auth-store",
        partialize: (state: AuthStore) => ({
          user: state.user,
          profile: state.profile,
        }),
      }
    )
  )
);
