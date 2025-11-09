import { useId, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: string | undefined;
}

export default function Input({ error, className, ...props }: InputProps) {
  const errorId = useId();

  return (
    <div className="flex flex-col justify-center gap-1">
      <input
        type="text"
        className={twMerge(
          "bevel-pressed w-xs px-2 py-1.5",
          "border-2 border-transparent outline-none",
          "focus:border-accent disabled:disabled-base",
          error && "bevel-error",
          className
        )}
        {...props}
        {...(error && { "aria-invalid": true, "aria-errormessage": errorId })}
      />
      {error && (
        <span id={errorId} className="text-error px-1 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}
