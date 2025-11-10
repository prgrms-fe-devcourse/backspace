import { cva, type VariantProps } from "class-variance-authority";

// 스크롤바 버튼
export const scrollbarButton = cva(
  [
    "flex items-center justify-center",
    "bevel-default",
    "cursor-pointer",
    "outline-none",
    "transition-all",
  ],
  {
    variants: {
      direction: {
        horizontal: "h-4 w-4",
        vertical: "h-4 w-4",
      },
      disabled: {
        true: "disabled-base",
        false: "",
      },
    },
    defaultVariants: {
      direction: "horizontal",
      disabled: false,
    },
  }
);

export type ScrollbarButtonVariantProps = VariantProps<typeof scrollbarButton>;

// 스크롤바 트랙
export const scrollbarTrack = cva(["flex", "relative", "flex-1"], {
  variants: {
    direction: {
      horizontal: "h-4 flex-row",
      vertical: "w-4 flex-col",
    },
    disabled: {
      true: "bg-[var(--color-bevel-light-inner)]",
      false: "bevel-pressed",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    disabled: false,
  },
});

export type ScrollbarTrackVariantProps = VariantProps<typeof scrollbarTrack>;

// 스크롤바 썸
export const scrollbarThumb = cva(
  ["bevel-default", "cursor-pointer", "transition-all", "relative"],
  {
    variants: {
      direction: {
        horizontal: "h-full",
        vertical: "w-full",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      disabled: {
        true: "disabled-base",
        false: "",
      },
    },
    compoundVariants: [
      // horizontal 방향일 때 size에 따른 width
      {
        direction: "horizontal",
        size: "sm",
        className: "w-10",
      },
      {
        direction: "horizontal",
        size: "md",
        className: "w-[66px]",
      },
      {
        direction: "horizontal",
        size: "lg",
        className: "w-25",
      },
      // vertical 방향일 때 size에 따른 height
      {
        direction: "vertical",
        size: "sm",
        className: "h-10",
      },
      {
        direction: "vertical",
        size: "md",
        className: "h-[66px]",
      },
      {
        direction: "vertical",
        size: "lg",
        className: "h-25",
      },
    ],
    defaultVariants: {
      direction: "horizontal",
      size: "md",
      disabled: false,
    },
  }
);

export type ScrollbarThumbVariantProps = VariantProps<typeof scrollbarThumb>;

// 스크롤바 컨테이너
export const scrollbar = cva(["flex items-center", "shrink-0"], {
  variants: {
    direction: {
      horizontal: "w-full flex-row",
      vertical: "h-full flex-col",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export type ScrollbarVariantProps = VariantProps<typeof scrollbar>;
