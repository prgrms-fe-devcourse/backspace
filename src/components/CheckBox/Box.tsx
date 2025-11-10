import { twMerge } from "tailwind-merge";

import Check from "@/assets/icons/check.svg?react";

import { checkBox, type CheckBoxVariantProps } from "./variants/boxVariants";

interface BoxProps extends React.ComponentPropsWithoutRef<"div">, CheckBoxVariantProps {
  isChecked?: boolean;
}

export default function Box({
  isChecked = false,
  isDisabled = false,
  className,
  ...rest
}: BoxProps) {
  return (
    <div className={twMerge(checkBox({ isDisabled }), className)} {...rest}>
      {isChecked && <Check aria-hidden="true" />}
    </div>
  );
}
