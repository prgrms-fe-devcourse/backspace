import { useState } from "react";
import { z } from "zod";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import supabase from "@/utils/supabase";

const SignInSchema = z.object({
  email: z.email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(8, "비밀번호를 8자 이상 입력해주세요."),
});

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({ email: "", password: "" });
    setIsSuccess(false);
    setIsSubmitting(true);

    const result = SignInSchema.safeParse({ email, password });

    setFieldErrors({ email: "", password: "" });

    if (!result.success) {
      const zodErrors = { email: "", password: "" };

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "email" || field === "password") {
          zodErrors[field] = issue.message;
        }
      });

      setFieldErrors(zodErrors);
      setIsSubmitting(false);
      return;
    }

    const { error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signError) {
      console.error("Supabase SignIn Error:", signError);

      switch (signError.code) {
        case "invalid_credentials":
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
          break;

        case "over_request_rate_limit":
          setError("너무 많은 시도가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;

        default:
          setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }

      return;
    }

    setIsSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="email" className="px-1 select-none">
          이메일:
        </label>

        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          disabled={isSubmitting}
        />
        <div className="min-h-5">
          {fieldErrors.email && (
            <span id="email-error" className="text-error px-1 text-xs">
              {fieldErrors.email}
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="password" className="px-1 select-none">
          패스워드:
        </label>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          disabled={isSubmitting}
        />
        <div className="min-h-5">
          {fieldErrors.password && (
            <span id="password-error" className="text-error px-1 text-xs">
              {fieldErrors.password}
            </span>
          )}
        </div>
      </div>

      {error && <p className="text-error">{error}</p>}

      <Button
        composition="textOnly"
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? "로그인중..." : "로그인"}
      </Button>
    </form>
  );
}
