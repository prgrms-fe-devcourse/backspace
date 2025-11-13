import Icon from "@/assets/logo/logo.svg?react";
import TitleBar from "@/components/window/TitleBar/TitleBar";

import SignUpForm from "./SignUpForm";

export default function SignUpComponent() {
  return (
    <div className="bevel-default flex h-full w-full flex-col p-1 md:h-150 md:w-110">
      <TitleBar size="medium" text="Welcome to Windows" className="pl-5" />

      <div className="mt-8 flex flex-1 flex-col items-center justify-start gap-6 p-4">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Icon />

          <p className="text-center select-none">Enter your details to create an account</p>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
