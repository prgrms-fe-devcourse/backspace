import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, type RefObject } from "react";
import { twMerge } from "tailwind-merge";

import { useDraggable } from "@/hooks/useDraggable";
import { WINDOW_INFO } from "@/os/config/windowInfo";
import { useWindowStore } from "@/stores/useWindowStore";
import type { Position, WindowAppId } from "@/types/window.types";

import { windowVariants } from "./variants";
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

  const minimizedWindows = useWindowStore((state) => state.minimizedWindows);
  const maximizedWindows = useWindowStore((state) => state.maximizedWindows);
  const restorePositions = useWindowStore((state) => state.restorePositions);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  const isMinimized = !!minimizedWindows[windowId];
  const isMaximized = !!maximizedWindows[windowId];

  const savedPosition = categoryPositions[category];
  const [position, setPosition] = useState<Position | null>(savedPosition ?? null);

  const { onMouseDown, onDrag, isDragging } = useDraggable();

  const handleMaximize = () => {
    if (isMaximized) {
      restoreWindow(windowId);

      const savedRestorePosition = restorePositions[windowId];

      if (savedRestorePosition) setPosition(savedRestorePosition);
    } else {
      maximizeWindow(windowId, position);
      setPosition(null);
    }
  };

  useEffect(() => {
    if (!isMinimized && !isMaximized && position === null) {
      const savedRestorePosition = restorePositions[windowId];
      if (savedRestorePosition) {
        setPosition(savedRestorePosition);
      }
    }
  }, [isMinimized, isMaximized, position, restorePositions, windowId]);

  useEffect(() => {
    if (!isDragging && position && category) {
      updateWindowPosition(category, position);
    }
  }, [isDragging, position, category, updateWindowPosition]);

  useEffect(() => {
    if (!isDragging || isMaximized) return;

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
  }, [isDragging, onDrag, isMaximized]);

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
              windowVariants({
                minimized: isMinimized,
                maximized: isMaximized,
                active: isActive,
                center: !position,
              }),
              className
            )}
            style={
              !isMaximized && position
                ? { transform: `translate(${position.x}px, ${position.y}px)` }
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
              onMouseDown={isMaximized ? undefined : onMouseDown}
              onMinimize={() => minimizeWindow(windowId)}
              onMaximize={handleMaximize}
              isMaximized={isMaximized}
            />
            {children}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
