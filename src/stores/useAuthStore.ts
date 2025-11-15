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
  setUser: (user: User | null) => void;
  hydrateFromAuth: () => Promise<void>;
  clearAuth: () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        // 초기 isLoading을 true로 해놔야 처음 접속했을 때 hydrateFromAuth하기 때문에 isLoading이 false -> true -> false로 돼서 flicker가 발생하는 것을 방지할 수 있음
        isLoading: true,
        user: null,
        profile: null,

        setUser: (user) =>
          set((state: AuthStore) => {
            state.user = user;
          }),

        hydrateFromAuth: async () => {
          set((state: AuthStore) => {
            state.isLoading = true;
          });

          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error || !session) {
            set((state: AuthStore) => {
              state.user = null;
              state.profile = null;
              state.isLoading = false;
            });
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
            set((state: AuthStore) => {
              state.profile = null;
              state.isLoading = false;
            });
            return;
          }

          set((state: AuthStore) => {
            state.profile = profile;
            state.isLoading = false;
          });
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
