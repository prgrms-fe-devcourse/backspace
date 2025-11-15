import { Link } from "react-router";

import Logo from "@/assets/logo/logo.svg?react";
import TitleBar from "@/components/window/TitleBar/TitleBar";

import SignInForm from "./SignInForm";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignInPage() {
  return (
    <>
      <TitleBar icon={<Logo />} text="Welcome to BackSpace" />

      <div className="lex-1 flex h-full w-full flex-col items-center justify-center gap-5 p-4">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Logo />
          <p className="text-center select-none">Enter your email and password to log on.</p>
        </div>

        <SignInForm />

        <div className="flex w-full items-center gap-4">
          <div className="border-text-default/30 flex-1 border-t" />
          <span className="text-text-default/70 text-xs select-none">or</span>
          <div className="border-text-default/30 flex-1 border-t" />
        </div>

        <SocialLoginButtons />

        <Link to="/signup" className="text-xs underline opacity-60">
          Don’t have an account?
        </Link>
      </div>
    </>
  );
}
