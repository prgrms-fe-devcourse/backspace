import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="from-primary to-secondary fixed inset-0 flex h-dvh max-h-dvh w-dvw max-w-dvw items-center justify-center overflow-hidden bg-linear-to-br">
      <Outlet />
    </main>
  );
}
