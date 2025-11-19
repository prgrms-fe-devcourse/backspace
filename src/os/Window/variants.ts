import { cva } from "class-variance-authority";

export const windowVariants = cva(
  "bevel-default absolute inline-flex flex-1 flex-col p-[3px] focus:outline-none",
  {
    variants: {
      minimized: {
        true: "hidden",
        false: "",
      },
      maximized: {
        true: "inset-0 h-full w-full",
        false: "",
      },
      active: {
        true: "z-40",
        false: "z-10",
      },
      center: {
        true: "md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
        false: "",
      },
    },
    compoundVariants: [
      {
        maximized: false,
        minimized: false,
        class: "inset-0 h-full w-full md:h-[500px] md:w-[600px]",
      },
    ],
    defaultVariants: {
      minimized: false,
      maximized: false,
      active: false,
      center: false,
    },
  }
);
