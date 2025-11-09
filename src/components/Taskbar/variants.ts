import { cva, type VariantProps } from "class-variance-authority";

// 태스크바
export const taskbar =
  "flex items-center justify-between w-full h-8 px-2 gap-1 text-xs bevel-default";

// 시작 버튼
export const taskbarStart = "h-6 w-17";

// 탭
export const taskbarTab = cva(
  [
    "flex items-center justify-start",
    "outline-none",
    "transition-all",
    "h-6",
    "flex-1", // 모든 탭이 동일한 너비를 가지도록
    "max-w-43",
    "min-w-6",
  ],
  {
    variants: {
      state: {
        neutral: "bevel-default",
        pressed: "bevel-pressed",
      },
    },
    defaultVariants: {
      state: "neutral",
    },
  }
);

export type TaskbarTabVariantProps = VariantProps<typeof taskbarTab>;

// 시스템 트레이
export const taskbarSystemTray =
  "flex items-center justify-center p-1 h-6 min-w-17 gap-1 shrink-0 bevel-pressed";
