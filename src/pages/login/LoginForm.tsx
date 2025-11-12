import Input from "@/components/Input/Input";

export default function LoginForm() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="user-name" className="select-none">
          User Name:
        </label>
        <Input id="user-name" />
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
