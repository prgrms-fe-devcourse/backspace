import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

import SocialLoginButtons from "./SocialLoginButtons";

export default function SignInForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="email" className="select-none">
          Email:
        </label>

        <Input id="email" />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="password" className="select-none">
          Password:
        </label>

        <Input id="password" type="password" />
      </div>

      <SocialLoginButtons />

      <Button composition="textOnly" type="submit" size="lg" className="w-60">
        Login
      </Button>

      <button type="button" className="cursor-pointer text-xs underline opacity-40">
        Don’t have an account?
      </button>
    </form>
  );
}
