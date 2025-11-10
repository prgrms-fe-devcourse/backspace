import { useId } from "react";
import { twMerge } from "tailwind-merge";

import Box from "./Box";
import { checkBoxWrapper, type WrapperVariantProps } from "./variants/wrapperVariants";

interface CheckBoxWrapperProps
  extends React.ComponentPropsWithoutRef<"label">,
    WrapperVariantProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CheckBoxWrapper({
  label,
  checked = false,
  disabled = false,
  onCheckedChange,
  className,
  ...rest
}: CheckBoxWrapperProps) {
  const customId = rest.id;
  const generatedId = useId();

  // props로 id를 전달받으면 그것을 쓰고, 아니면 useId로 생성한 id를 사용
  const id = customId ?? generatedId;

  return (
    <label
      htmlFor={id}
      className={twMerge(
        checkBoxWrapper({
          hasLabel: Boolean(label),
          isDisabled: disabled,
        }),
        className
      )}
      {...rest}
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />

      <Box isChecked={checked} isDisabled={disabled} />

      {label && <span className="group-focus-within:focus-dotted">{label}</span>}
    </label>
  );
}
