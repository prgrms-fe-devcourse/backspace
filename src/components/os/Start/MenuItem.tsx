import type { ComponentPropsWithoutRef, FunctionComponent } from "react";

interface MenuItemProps extends ComponentPropsWithoutRef<"button"> {
  Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  caption: string;
}

export default function MenuItem({ Icon, caption, ...props }: MenuItemProps) {
  return (
    <button
      type="button"
      className="hover:bg-primary/20 hover:text-invert flex items-center gap-2 px-4 py-2"
      {...props}
    >
      <Icon className="size-7" />
      <span className="truncate">{caption}</span>
    </button>
  );
}
