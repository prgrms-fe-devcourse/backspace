import type { PropsWithChildren } from "react";

export default function BevelScrollContainer({ children }: PropsWithChildren) {
  return (
    <div className="bevel-pressed h-full w-full overflow-hidden p-1">
      <div className="scrollbar bg-text-invert h-full w-full overflow-y-auto p-4">{children}</div>
    </div>
  );
}
