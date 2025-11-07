import { cva, type VariantProps } from "class-variance-authority";

export const button = cva(
  [
    "inline-flex cursor-pointer items-center justify-center",
    "outline-none focus-visible:outline-none",
    "disabled:cursor-not-allowed",
    "transition-all",
    "focus:outline-1 focus:-outline-offset-4 focus:outline-black focus:outline-dotted",
  ],
  {
    variants: {
      size: {
        lg: "h-9 px-5 py-2 text-sm",
        md: "h-8 px-4 py-1.5 text-xs",
        sm: "h-6 px-2 py-1 text-[10px]",
      },
      composition: {
        iconOnly: "",
        textOnly: "",
        iconText: "",
      },
      state: {
        neutral: "bevel-default",
        pressed: "bevel-pressed",
        focus: "bevel-default relative",
        inactive: "bevel-default",
      },

      width: {
        full: "w-full",
        auto: "w-auto",
      },
    },
    compoundVariants: [
      // composition이 아이콘 온리일 때만 size에 따라 박스 사이즈가 다르기 때문에 재정의
      {
        size: "sm",
        composition: "iconOnly",
        className: "h-5 w-5 p-1",
      },
      {
        size: "md",
        composition: "iconOnly",
        className: "h-7 w-7 p-1.5",
      },
      {
        size: "lg",
        composition: "iconOnly",
        className: "h-9 w-9 p-2",
      },
    ],
    defaultVariants: {
      size: "sm",
      composition: "iconText",
      state: "neutral",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof button>;
