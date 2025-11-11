import GitHub from "@/assets/oauth/github.svg?react";
import Google from "@/assets/oauth/google.svg?react";
import Kakao from "@/assets/oauth/kakao.svg?react";

export default function SocialLoginButtons() {
  return (
    <div className="flex gap-8">
      <button type="button" className="cursor-pointer">
        <Google />
      </button>
      <button type="button" className="cursor-pointer">
        <Kakao />
      </button>
      <button type="button" className="cursor-pointer">
        <GitHub />
      </button>
    </div>
  );
}
