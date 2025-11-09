import { cva, type VariantProps } from "class-variance-authority";

export const titleBar = cva(
  // Base styles:
  ["flex w-full cursor-default items-center select-none", "accent-gradient w-full"],
  {
    variants: {
      // 상태 (Active, Inactive)
      state: {
        active: "opacity-100",
        inactive: "opacity-60",
      },
      // 크기 (Small, Medium)
      size: {
        small: "h-6 px-[5px] py-[3px] text-xs leading-3",
        medium: "h-8 px-1 py-1.5 text-sm leading-3.5",
      },
    },

    defaultVariants: {
      state: "active",
      size: "small",
    },
  }
);

export type TitleBarVariantProps = VariantProps<typeof titleBar>;
