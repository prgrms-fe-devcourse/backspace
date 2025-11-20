import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import Ghost from "@/assets/icons/ghost.svg?react";

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  src?: string | null;
}

export default function Avatar({ src, alt = "사용자 아바타", className, ...props }: AvatarProps) {
  return (
    <div
      className={twMerge(
        "flex aspect-square h-max items-center justify-center overflow-hidden rounded-full bg-gray-50",
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" {...props} />
      ) : (
        <Ghost className="text-primary h-3/4 w-3/4" />
      )}
    </div>
  );
}
