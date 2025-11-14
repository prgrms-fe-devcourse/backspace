import { useAuthStore } from "@/stores/useAuthStore";

/**
 * 'profiles' 테이블과 'auth.users'의 데이터를 조합해
 * 사용하기 편한 "바로가기" 데이터를 제공하는 훅입니다.
 */

export function useAuthUser() {
  const { user, profile, isLoading, signOut } = useAuthStore((state) => ({
    user: state.user,
    profile: state.profile,
    isLoading: state.isLoading,
    signOut: state.signOut,
  }));

  return {
    user,
    profile,
    isLoading,
    signOut,

    /** 'profiles' 테이블의 닉네임 */
    nickname: profile?.nickname,
    /** 'profiles' 테이블의 아바타 URL */
    avatarUrl: profile?.avatar_url,
    /** 'profiles' 테이블의 자기소개 */
    bio: profile?.bio,
    /** (Auth) 사용자의 이메일 */
    email: user?.email,
    /** (Auth) 사용자의 고유 ID */
    id: user?.id,

    /** 로그인 여부 */
    isLoggedIn: !isLoading && !!user,
  };
}
