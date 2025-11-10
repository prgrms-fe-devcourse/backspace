import { cva, type VariantProps } from "class-variance-authority";

export const checkBoxWrapper = cva(
  ["inline-flex items-center", "group", "align-middle", "select-none"],
  {
    variants: {
      hasLabel: {
        true: "gap-3",
        false: "",
      },
      isDisabled: {
        true: "disabled-base pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      hasLabel: true,
      isDisabled: false,
    },
  }
);

export type WrapperVariantProps = VariantProps<typeof checkBoxWrapper>;
