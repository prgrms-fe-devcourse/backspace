import { cva, type VariantProps } from "class-variance-authority";

// 태스크바
export const taskbar = cva([
  "flex items-center justify-between",
  "w-full",
  "h-8",
  "px-2",
  "gap-3",
  "text-[11px]",
  "bevel-default",
]);

export type TaskbarVariantProps = VariantProps<typeof taskbar>;

// 시작 버튼
export const taskbarStart = cva(["h-6", "w-14", "shrink-0"]);

export type TaskbarStartVariantProps = VariantProps<typeof taskbarStart>;

// 탭
export const taskbarTab = cva(
  [
    "flex items-center justify-start",
    "outline-none",
    "transition-all",
    "h-6",
    "shrink",
    "max-w-43",
    "min-w-43",
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
export const taskbarSystemTray = cva([
  "flex items-center justify-center",
  "p-1",
  "h-6",
  "w-17",
  "bevel-pressed",
]);

export type TaskbarSystemTrayVariantProps = VariantProps<typeof taskbarSystemTray>;
