import { cva, type VariantProps } from "class-variance-authority";

export const window = cva([], {
  variants: {
    state: {
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
    state: "normal",
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

export type WindowVariantProps = VariantProps<typeof window>;
export type WindowContentsVariantProps = VariantProps<typeof windowContents>;
