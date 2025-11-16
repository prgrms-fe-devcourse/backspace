import type { User } from "@supabase/supabase-js";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/stores/useAuthStore";
import type { Profile } from "@/types/profile.types";

interface AuthUserData {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  homepageId: string | null;
  nickname: string | undefined | null;
  avatarUrl: string | undefined | null;
  bio: string | undefined | null;
  email: string | undefined | null;
  id: string | undefined;
  isLoggedIn: boolean;
}

/**
 * 'profiles' 테이블과 'auth.users'의 데이터를 조합해
 * 사용하기 편한 "바로가기" 데이터를 제공하는 훅입니다.
 */

export function useAuthUser(): AuthUserData {
  const { user, profile, isLoading, homepageId, signOut } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      profile: state.profile,
      isLoading: state.isLoading,
      homepageId: state.homepageId,
      signOut: state.signOut,
    }))
  );

  return {
    user,
    profile,
    isLoading,
    homepageId,
    signOut,

    nickname: profile?.nickname,
    avatarUrl: profile?.avatar_url,
    bio: profile?.bio,
    email: user?.email,
    id: user?.id,

    isLoggedIn: !isLoading && !!user,
  };
}
