import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

import Logo from "@/assets/logo/logo.svg?react";
import TitleBar from "@/os/TitleBar/TitleBar";

export default function AuthLayout() {
  return (
    <main
      className={twMerge(
        "relative inset-0 h-dvh max-h-dvh w-dvw max-w-dvw",
        "flex items-center justify-center overflow-hidden",
        "from-primary to-secondary bg-linear-to-br"
      )}
    >
      <section
        className={twMerge(
          "bevel-default absolute inset-0 inline-flex h-full w-full flex-col p-[3px] focus:outline-none",
          "md:h-150 md:w-110",
          "md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        )}
      >
        <TitleBar icon={Logo} title="Welcome to BackSpace" />
        <Outlet />
      </section>
    </main>
  );
}
