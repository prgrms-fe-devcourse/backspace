import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Profile } from "@/types/profile.types";
import supabase from "@/utils/supabase";

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
  homepageId: string | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile) => void;
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
        homepageId: null,

        setUser: (user) =>
          set((state: AuthStore) => {
            state.user = user;
          }),

        setProfile: (profile) => {
          set((state: AuthStore) => {
            state.profile = profile;
          });
        },

        hydrateFromAuth: async () => {
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error(error);
            set((state: AuthStore) => {
              state.user = null;
              state.profile = null;
              state.homepageId = null;
              state.isLoading = false;
            });
            return;
          }

          if (!session) {
            set((state: AuthStore) => {
              state.isLoading = false;
            });
            return;
          }

          const { user } = session;

          const [profileRes, homepageRes] = await Promise.all([
            supabase.from("profiles").select("*").eq("auth_id", user.id).single(),
            supabase.from("homepages").select("id").eq("owner_id", user.id).single(),
          ]);

          if (profileRes.error || homepageRes.error) {
            console.error(
              "프로필 또는 홈페이지 ID 조회 실패 (로그인은 유지):",
              profileRes.error || homepageRes.error
            );
            set((state: AuthStore) => {
              state.user = user;
              state.profile = profileRes.data || null;
              state.homepageId = homepageRes.data?.id || null;
              state.isLoading = false;
            });
            return;
          }

          set((state: AuthStore) => {
            state.user = user;
            state.profile = profileRes.data;
            state.homepageId = homepageRes.data.id;
            state.isLoading = false;
          });
        },

        clearAuth: () =>
          set((state: AuthStore) => {
            state.user = null;
            state.profile = null;
            state.homepageId = null;
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
          homepageId: state.homepageId,
        }),
      }
    )
  )
);
