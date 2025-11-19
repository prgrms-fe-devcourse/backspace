import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import type { WindowApp } from "@/types/window.types";

interface ShortcutProps extends ComponentPropsWithoutRef<"button"> {
  Icon: WindowApp["icon"];
  caption: WindowApp["caption"];
  isSelected?: boolean;
  isFocused?: boolean;
}

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
        className={twMerge("text-muted", "size-9 md:size-10", isSelected && "bg-secondary/80")}
        aria-hidden="true"
      />
      <span
        className={twMerge(
          "text-muted text-xs select-none md:text-sm",
          isSelected && "bg-secondary/80 focus-dotted",
          isFocused && "focus-dotted"
        )}
      >
        {caption}
      </span>
    </button>
  );
}
