import { useState } from "react";
import { useNavigate } from "react-router";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import supabase from "@/utils/supabase";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.username,
        },
      },
    });
    if (error) return console.error(error);

    navigate("/sign-in");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleCancel = () => {
    navigate("/sign-in");
  };

  // TODO: 우선은 required로 해놓은 후 나중에 수정할 예정
  return (
    <form onSubmit={handleSignUp} className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="username" className="select-none">
          UserName:
        </label>

        <Input id="username" value={formData.username} onChange={handleChange} required />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="email" className="select-none">
          Email:
        </label>

        <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label htmlFor="password" className="select-none">
          Password:
        </label>

        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-20 flex w-full justify-center gap-5">
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
