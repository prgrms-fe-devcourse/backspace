import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import supabase from "@/utils/supabase";

const User = z.object({
  username: z.string().min(2, "유저명은 최소 2자 이상 입력해주세요."),
  email: z.email("올바른 이메일 형식을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[A-Z]/, "대문자가 최소 1개 포함되어야 합니다.")
    .regex(/[a-z]/, "소문자가 최소 1개 포함되어야 합니다.")
    .regex(/[0-9]/, "숫자가 최소 1개 포함되어야 합니다.")
    .regex(/[^A-Za-z0-9]/, "특수문자가 최소 1개 포함되어야 합니다."),
});

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});
    setIsSuccess(false);
    setIsSubmitting(true);

    const result = User.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") errors[key] = issue.message;
      });
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.username,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Supabase SignUp Error:", error);

      switch (error.code) {
        case "user_already_exists":
          setErrorMessage("이미 가입된 이메일입니다.");
          break;

        case "over_request_rate_limit":
        case "over_email_send_rate_limit":
          setErrorMessage("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
          break;

        default:
          setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }

      return;
    }

    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    navigate("/signin");
  };

  return (
    <form onSubmit={handleSignUp} className="flex w-full flex-col items-center gap-2">
      {isSuccess ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold">Sign-up Successful!</h3>
          <p>You are now logged in. Redirecting to the main page...</p>
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="username" className="px-1 select-none">
              Username:
            </label>

            <Input
              id="username"
              value={formData.username}
              onChange={handleChange}
              error={fieldErrors.username}
              disabled={isSubmitting}
            />
            <div className="min-h-5">
              {fieldErrors.username && (
                <span id="username-error" className="text-error px-1 text-xs">
                  {fieldErrors.username}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="email" className="px-1 select-none">
              Email:
            </label>

            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
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
              Password:
            </label>

            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
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

          {errorMessage && <p className="text-error">{errorMessage}</p>}

          <div className="flex w-full justify-center gap-2">
            <Button
              composition="textOnly"
              type="submit"
              size="lg"
              className="h-8 w-full"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? "Signing up…" : "OK"}
            </Button>
            <Button
              composition="textOnly"
              type="button"
              size="lg"
              className="h-8 w-full"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
