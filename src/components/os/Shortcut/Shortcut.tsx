import type { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

import type { WindowApp } from "@/types/window.types";

interface ShortcutProps extends ComponentPropsWithRef<"button"> {
  Icon: WindowApp["icon"];
  caption: WindowApp["caption"];
  isSelected?: boolean;
  isFocused?: boolean;
}

/**
 * 바로가기 컴포넌트
 *
 * @component
 * @example
 * ```tsx
 * import Shortcut from "@/components/Shortcut/Shortcut";
 * import { WINDOW_APP } from "@/types/window-app.type";
 *
 * <Shortcut
 *   Icon={WINDOW_APP.HOME.icon}
 *   caption={WINDOW_APP.HOME.caption
 * />
 * ```
 */
export default function Shortcut({
  Icon,
  caption,
  isSelected = false,
  isFocused = false,
  ...props
}: ShortcutProps) {
  return (
    <button
      type="button"
      className={twMerge("group inline-flex flex-col items-center gap-1")}
      {...props}
    >
      <Icon
        className={twMerge(
          "text-text-default",
          "size-9 md:size-10",
          isSelected && "bg-secondary/80"
        )}
        aria-hidden="true"
      />
      <span
        className={twMerge(
          "text-text-default text-xs select-none md:text-sm",
          isSelected && "bg-secondary/80 focus-dotted",
          isFocused && "focus-dotted"
        )}
      >
        {caption}
      </span>
    </button>
  );
}
