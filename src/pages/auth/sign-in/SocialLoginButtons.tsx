import GitHub from "@/assets/oauth/github.svg?react";
import Google from "@/assets/oauth/google.svg?react";
import Kakao from "@/assets/oauth/kakao.svg?react";
import supabase from "@/utils/supabase";

type AuthProvider = "google" | "github" | "kakao";

export default function SocialLoginButtons() {
  const handleOAuthLogin = async (provider: AuthProvider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,

        options: {
          redirectTo: `${import.meta.env.VITE_URL}/`, // 로그인 후 리디렉션할 URL
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center gap-8">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => handleOAuthLogin("google")}
        aria-label="Sign in with Google"
      >
        <Google />
      </button>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => handleOAuthLogin("kakao")}
        aria-label="Sign in with Kakao"
      >
        <Kakao />
      </button>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => handleOAuthLogin("github")}
        aria-label="Sign in with GitHub"
      >
        <GitHub />
      </button>
    </div>
  );
}
