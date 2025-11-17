import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

export default function TextArea({ id, maxLength = 2200, className, ...props }: TextAreaProps) {
  return (
    <textarea
      id={id}
      maxLength={maxLength}
      className={twMerge(
        "bevel-pressed bg-text-invert scrollbar w-full resize-none",
        "disabled:disabled-base h-15 p-3 outline-none focus:border-none",
        className
      )}
      {...props}
    />
  );
}
