import Logo from "@/assets/logo/logo.svg?react";

import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-5 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Logo />
        <p className="text-center select-none">Enter your details to create an account</p>
      </div>

      <SignUpForm />
    </div>
  );
}
