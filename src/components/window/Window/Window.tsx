import * as Dialog from "@radix-ui/react-dialog";
import type { RefObject } from "react";
import { twMerge } from "tailwind-merge";

import TitleBar, { type TitleBarProps } from "../TitleBar/TitleBar";

interface WindowProps extends Dialog.DialogProps, TitleBarProps {
  ref: RefObject<HTMLElement | null>;
  description?: string | undefined;
}

export default function Window({
  open,
  buttons,
  onClose,
  icon,
  title,
  description,
  children,
  ref,
  className,
}: WindowProps) {
  return (
    <Dialog.Root defaultOpen open={open} modal={false}>
      <Dialog.Portal container={ref.current}>
        <Dialog.Content onInteractOutside={(e) => e.preventDefault()} asChild>
          <section
            className={twMerge(
              "bevel-default absolute inset-0 inline-flex h-full w-full flex-1 flex-col p-[3px] focus:outline-none",
              // TODO: 가변 사이즈 변경
              "md:h-[500px] md:w-[600px]",
              // TODO: 드래그 시 변경
              "md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              className
            )}
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
            <TitleBar icon={icon} title={title} buttons={buttons} onClose={onClose} />
            {children}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
