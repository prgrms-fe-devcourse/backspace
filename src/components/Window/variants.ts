import { cva, type VariantProps } from "class-variance-authority";

export const window = cva(["bevel-default flex"], {
  variants: {
    size: {
      maximized: "size-full",
      minimized: "size-0",
      auto: "size-auto",
      custom: "",
    },
    padding: {
      full: "p-0",
      standard: "p-4",
      extra: "p-6",
      custom: "",
    },
  },
  defaultVariants: {
    size: "auto",
    padding: "full",
  },
});

export type WindowVariantProps = VariantProps<typeof window>;
