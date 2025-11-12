import { cva, type VariantProps } from "class-variance-authority";

export const windowVariant = cva([], {
  variants: {
    windowState: {
      maximized: "size-full",
      minimized: "size-0",
      normal: "",
    },
    activeState: {
      active: "opacity-100",
      inactive: "opacity-60",
    },
  },
  defaultVariants: {
    windowState: "normal",
    activeState: "active",
  },
});

export const windowContents = cva([], {
  variants: {
    padding: {
      full: "p-0",
      standard: "p-4",
      extra: "p-6",
      custom: "",
    },
  },
  defaultVariants: {
    padding: "full",
  },
});

export type WindowVariantProps = VariantProps<typeof windowVariant>;
export type WindowContentsVariantProps = VariantProps<typeof windowContents>;
