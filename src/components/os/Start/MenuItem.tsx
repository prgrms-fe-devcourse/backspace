import type { FunctionComponent } from "react";

interface MenuItemProps {
  Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  caption: string;
  onClick: () => void;
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
