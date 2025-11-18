import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Logout from "@/assets/icons/logout.svg?react";
import Moon from "@/assets/icons/moon.svg?react";
import Logo from "@/assets/logo/logo.svg?react";
import Button from "@/components/common/Button/Button";
import useTheme from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/useAuthStore";

import MenuItem from "./MenuItem";

export function StartMenu() {
  const [open, setOpen] = useState(false);
  const signOut = useAuthStore((state) => state.signOut);
  const { toggleTheme } = useTheme();

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button className={twMerge("h-6 shrink-0 md:h-8", open && "bevel-pressed focus-dotted")}>
          <Logo className="size-4" />
          Start
        </Button>
      </Popover.Trigger>

      <Popover.Content side="top" align="start" avoidCollisions={false} asChild>
        <div className="bevel-default inline-flex">
          <div className="accent-gradient-vertical w-8" />

          <div className="flex min-w-50 flex-col">
            <MenuItem Icon={Moon} caption="Dark Mode" onClick={() => toggleTheme()} />
            <MenuItem Icon={Logout} caption="Shut Down" onClick={() => signOut()} />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
