import { useRef, useState } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
import Window from "@/components/window/Window/Window";
import { WINDOW_APPS } from "@/config/window";
import { useAuthStore } from "@/stores/useAuthStore";
import { useWindowStore } from "@/stores/useWindowStore";
import type { WindowAppId, WindowCategory } from "@/types/window.types";

export default function OsMain() {
  const ref = useRef<HTMLElement | null>(null);
  const [selectedShortcutId, setSelectedShortcutId] = useState<string | null>(null);
  const [focusedShortcutId, setFocusedShortcutId] = useState<string | null>(null);
  const { windows, openWindow, closeWindow } = useWindowStore();
  const user = useAuthStore((state) => state.user);
  const ownerId = user?.id;

  const handleShortcutFocus = (id: string) => {
    setSelectedShortcutId(id);
    setFocusedShortcutId(id);
  };

  const handleShortcutBlur = () => {
    setSelectedShortcutId(null);
  };

  const handleShortcutDoubleClick = (id: WindowAppId, category: WindowCategory) => {
    if (category === "minihome") {
      openWindow(id, ownerId);
    } else {
      openWindow(id);
    }
    setSelectedShortcutId(null);
    setFocusedShortcutId(null);
  };

  return (
    <main ref={ref} className="bg-base-2 flex h-screen flex-col">
      <div className="flex-1 p-4">
        <div
          className="grid h-full w-full auto-cols-max grid-flow-row auto-rows-max gap-6 md:gap-8"
          aria-label="바로가기"
        >
          {Object.values(WINDOW_APPS).map(({ id, icon, caption, category }) => (
            <Shortcut
              key={id}
              Icon={icon}
              caption={caption}
              isSelected={selectedShortcutId === id}
              isFocused={focusedShortcutId === id}
              onFocus={() => handleShortcutFocus(id)}
              onBlur={handleShortcutBlur}
              onDoubleClick={() => handleShortcutDoubleClick(id, category)}
            />
          ))}
        </div>

        {Object.values(windows).map((windowState) => {
          const Component = windowState.component;
          if (!Component) return null;

          return (
            <Window
              key={windowState.id}
              ref={ref}
              open
              buttons="all"
              onClose={() => closeWindow(windowState.id)}
              title={windowState.caption}
              icon={windowState.icon}
            >
              <Component ownerId={windowState.ownerId} />
            </Window>
          );
        })}
      </div>
      <Taskbar />
    </main>
  );
}
