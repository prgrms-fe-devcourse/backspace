import { cva, type VariantProps } from "class-variance-authority";

export const titleBar = cva(
  // Base styles:
  [
    "flex w-full cursor-default items-center select-none",
    // TODO: 아래 gradient 색상은 이후 global.css에서 가져와 수정할 예정
    "w-full bg-linear-to-r from-[#B2AAEB] to-[#AAC1F8] px-1 py-1.5",
  ],
  {
    variants: {
      // 상태 (Active, Inactive)
      state: {
        active: "opacity-100",
        inactive: "opacity-60",
      },
      // 크기 (Small, Medium)
      size: {
        small: "h-6 text-xs leading-3",
        medium: "h-8 text-sm leading-3.5",
      },
    },

    defaultVariants: {
      state: "active",
      size: "small",
    },
  }
);

export type TitleBarVariantProps = VariantProps<typeof titleBar>;
