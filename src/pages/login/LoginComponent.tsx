import Icon from "@/assets/logo/logo.svg?react";
import Button from "@/components/Button/Button";
import TitleBar from "@/components/TitleBar/TitleBar";

import LoginForm from "./LoginForm";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginComponent() {
  return (
    <div className="bevel-default flex w-full flex-col p-1">
      <TitleBar size="small" text="Welcome to Windows" />
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        <div className="flex flex-col items-center justify-center gap-3">
          <Icon />

          <p className="text-center select-none">Enter your password to log on</p>
        </div>

        <LoginForm />

        <SocialLoginButtons />

        <div className="flex w-full justify-center gap-4">
          <Button composition="textOnly" type="button" className="h-8 w-full">
            OK
          </Button>
          <Button composition="textOnly" type="button" className="h-8 w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
