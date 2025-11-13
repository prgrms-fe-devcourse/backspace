import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import supabase from "@/utils/supabase";

const User = z.object({
  username: z.string().min(2, "유저명은 최소 2자 이상 입력해주세요."),
  email: z.email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const result = User.safeParse(formData);

    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
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

    if (error) {
      const msg = error.message;

      if (msg.includes("registered")) {
        setErrorMessage("이미 가입된 이메일입니다.");
      } else if (msg.includes("Password")) {
        setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
      } else if (msg.includes("rate")) {
        setErrorMessage("잠시 후 다시 시도해주세요.");
      } else if (msg.includes("validate")) {
        setErrorMessage("올바른 이메일 주소를 입력해주세요.");
      } else {
        setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }

      return;
    }

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleCancel = () => {
    navigate("/signIn");
  };

  return (
    <form onSubmit={handleSignUp} className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="username" className="select-none">
          UserName:
        </label>

        <Input id="username" value={formData.username} onChange={handleChange} />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="email" className="select-none">
          Email:
        </label>

        <Input type="email" id="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="password" className="select-none">
          Password:
        </label>

        <Input id="password" type="password" value={formData.password} onChange={handleChange} />
      </div>

      <div className="text-accent h-5 w-full text-center text-sm">
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="flex w-full justify-center gap-5">
        <Button composition="textOnly" type="submit" size="lg" className="h-8 w-full">
          OK
        </Button>
        <Button
          composition="textOnly"
          type="button"
          size="lg"
          className="h-8 w-full"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
