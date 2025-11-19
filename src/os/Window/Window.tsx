import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";

import { useDraggable } from "@/hooks/useDraggable";
import { WINDOW_INFO } from "@/os/config/windowInfo";
import { useWindowStore } from "@/stores/useWindowStore";
import type { Position, WindowAppId } from "@/types/window.types";

import type { TitleBarProps } from "../TitleBar/TitleBar";
import TitleBar from "../TitleBar/TitleBar";

interface WindowProps extends Dialog.DialogProps, TitleBarProps {
  ref: RefObject<HTMLElement | null>;
  windowId: WindowAppId;
  description?: string | undefined;
  isActive?: boolean;
}

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
  onPointerDown,
  className,
}: WindowProps) {
  const { category } = WINDOW_INFO[windowId];
  const categoryPositions = useWindowStore((state) => state.categoryPositions);
  const updateWindowPosition = useWindowStore((state) => state.updateWindowPosition);

  const savedPosition = categoryPositions[category];
  const [position, setPosition] = useState<Position | null>(savedPosition ?? null);

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
        setPosition((prev) => (prev && prev.x === next.x && prev.y === next.y ? prev : next));
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, onDrag]);

  return (
    <Dialog.Root
      open={open}
      modal={false}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose?.();
        }
      }}
    >
      <Dialog.Portal container={ref.current}>
        <Dialog.Content onInteractOutside={(e) => e.preventDefault()} asChild>
          <section
            onPointerDown={onPointerDown}
            className={twMerge(
              "bevel-default absolute inset-0 inline-flex h-full w-full flex-1 flex-col p-[3px] focus:outline-none",
              // TODO: 가변 사이즈 변경
              "md:h-[500px] md:w-[600px]",
              !position &&
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
              onMouseDown={onMouseDown}
            />
            {children}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
