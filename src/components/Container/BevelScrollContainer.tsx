import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export default function BevelScrollContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="bevel-pressed h-full w-full overflow-hidden p-1">
      <div
        className={twMerge("scrollbar bg-text-invert h-full w-full overflow-y-auto p-4", className)}
      >
        {children}
      </div>
    </div>
  );
}
