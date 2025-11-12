import Input from "@/components/Input/Input";

export default function SignInForm() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="select-none">
          Email:
        </label>
        <Input id="email" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="select-none">
          Password:
        </label>
        <Input id="password" type="password" />
      </div>
    </div>
  );
}
