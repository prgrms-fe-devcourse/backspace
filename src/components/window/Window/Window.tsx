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
  title,
  description,
  children,
  ref,
}: WindowProps) {
  return (
    <Dialog.Root defaultOpen open={open} modal={false}>
      <Dialog.Portal container={ref.current}>
        <Dialog.Content onInteractOutside={(e) => e.preventDefault()} asChild>
          <section
            role="application"
            className={twMerge(
              "bevel-default absolute inline-flex h-fit w-fit flex-col p-[3px] focus:outline-none",
              // TODO: 가변 사이즈 변경
              "h-[500px] w-[600px]",
              // TODO: 드래그 시 변경
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            )}
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
            <TitleBar buttons={buttons} onClose={onClose} />
            {children}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
