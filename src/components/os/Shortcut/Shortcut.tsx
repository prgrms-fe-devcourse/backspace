import { twMerge } from "tailwind-merge";

import type { WindowApp } from "@/types/window-app.type.ts";

interface ShortcutProps {
  Icon: WindowApp["icon"];
  caption: WindowApp["caption"];
  isSelected?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
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
  onClick,
  onDoubleClick,
}: ShortcutProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={twMerge(
        "group",
        "inline-flex min-h-16 min-w-16 flex-col items-center justify-center",
        "gap-1 px-2 py-2",
        "text-center"
      )}
    >
      <Icon
        className={twMerge(
          "text-text-default",
          "size-11 md:size-14 lg:size-16",
          isSelected && "bg-secondary/80"
        )}
        aria-hidden="true"
      />
      <span
        className={twMerge(
          "text-text-default",
          isSelected && "bg-secondary/80 focus-dotted",
          isFocused && "focus-dotted"
        )}
      >
        {caption}
      </span>
    </button>
  );
}
