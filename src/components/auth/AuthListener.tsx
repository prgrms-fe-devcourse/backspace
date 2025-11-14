import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import supabase from "@/utils/supabase";

export default function AuthInitializer() {
  const { hydrateFromAuth, clearAuth, setUser } = useAuthStore.getState();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "INITIAL_SESSION" || // 앱 첫 로드 시
        event === "SIGNED_IN" // 로그인 시
      ) {
        hydrateFromAuth();
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시
        clearAuth(); // 스토어 비우기
      } else if (event === "TOKEN_REFRESHED") {
        // 세션 자동 갱신 시
        setUser(session?.user ?? null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [hydrateFromAuth, clearAuth, setUser]);

  return null;
}
