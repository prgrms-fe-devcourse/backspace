import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";

import TitleBar, { type TitleBarProps } from "@/components/window/TitleBar/TitleBar";
import { useDraggable } from "@/hooks/useDraggable";
import { useWindowStore } from "@/stores/useWindowStore";
import type { WindowAppId } from "@/types/window.types";

interface WindowProps extends Dialog.DialogProps, TitleBarProps {
  ref: RefObject<HTMLElement | null>;
  windowId: WindowAppId;
  description?: string | undefined;
  isActive?: boolean;
}

type Position = { x: number; y: number } | null;

export default function Window({
  windowId,
  open,
  buttons,
  onClose,
  icon,
  title,
  description,
  children,
  ref,
  isActive,
  className,
}: WindowProps) {
  const { windows, categoryPositions, updateWindowPosition } = useWindowStore();
  const category = windows[windowId]?.category;
  const savedPosition = category ? categoryPositions[category] : undefined;
  const [position, setPosition] = useState<Position>(savedPosition ?? null);
  const { onMouseDown, onDrag, isDragging } = useDraggable();

  useEffect(() => {
    if (!isDragging && position && category) {
      updateWindowPosition(category, position);
    }
  }, [isDragging, position, category, updateWindowPosition]);

  useEffect(() => {
    if (!isDragging) return;

    let frameId: number;

    const update = () => {
      const next = onDrag.current;
      if (next) {
        setPosition((prev) => (prev?.x === next.x && prev.y === next.y ? prev : next));
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, onDrag]);

  return (
    <Dialog.Root defaultOpen open={open} modal={false}>
      <Dialog.Portal container={ref.current}>
        <Dialog.Content onInteractOutside={(e) => e.preventDefault()} asChild>
          <section
            className={twMerge(
              "bevel-default absolute inset-0 inline-flex h-full w-full flex-1 flex-col p-[3px] focus:outline-none",
              // TODO: 가변 사이즈 변경
              "md:h-[500px] md:w-[600px]",

              position === null &&
                "md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",

              isActive ? "z-40" : "z-10",

              className
            )}
            style={
              position
                ? {
                    transform: `translate(${position.x}px, ${position.y}px)`,
                  }
                : undefined
            }
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
            <TitleBar
              icon={icon}
              title={title}
              buttons={buttons}
              onClose={onClose}
              onMouseDown={(event) => onMouseDown(event)}
            />
            {children}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
