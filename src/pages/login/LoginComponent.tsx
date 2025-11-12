import Icon from "@/assets/logo/logo.svg?react";
import Button from "@/components/Button/Button";
import TitleBar from "@/components/TitleBar/TitleBar";

import LoginForm from "./LoginForm";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginComponent() {
  return (
    <div className="bevel-default flex h-full w-full flex-col p-1">
      <TitleBar size="medium" text="Welcome to Windows" className="pl-5" />
      <div className="flex flex-1 -translate-y-10 flex-col items-center justify-center gap-6 p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <Icon />

          <p className="text-center select-none">Enter your password to log on</p>
        </div>

        <LoginForm />

        <SocialLoginButtons />

        <div className="flex w-full justify-center gap-5">
          <Button composition="textOnly" type="button" className="h-8 w-full">
            OK
          </Button>
          <Button composition="textOnly" type="button" className="h-8 w-full">
            Cancel
          </Button>
        </div>
        <button type="button" className="cursor-pointer text-xs underline opacity-40">
          Don’t have an account?
        </button>
      </div>
    </div>
  );
}
