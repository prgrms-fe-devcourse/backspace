import { cva, type VariantProps } from "class-variance-authority";

export const checkBox = cva(
  [
    "bevel-pressed",
    "relative flex items-center justify-center transition-all",
    "h-4.5 w-4.5 p-[3.6px] select-none",
  ],
  {
    variants: {
      isDisabled: {
        true: "disabled-base",
      },
    },
  }
);

export type CheckBoxVariantProps = VariantProps<typeof checkBox>;
