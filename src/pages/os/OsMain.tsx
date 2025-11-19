import { useRef, useState } from "react";

import { WINDOW_APPS } from "@/os/config/windowApps";
import Shortcut from "@/os/Shortcut/Shortcut";
import Taskbar from "@/os/Taskbar/Taskbar";
import Window from "@/os/Window/Window";
import { useAuthStore } from "@/stores/useAuthStore";
import { useWindowStore } from "@/stores/useWindowStore";
import type { WindowAppId, WindowCategory } from "@/types/window.types";

export default function OsMain() {
  const ref = useRef<HTMLElement | null>(null);
  const [selectedShortcutId, setSelectedShortcutId] = useState<string | null>(null);
  const [focusedShortcutId, setFocusedShortcutId] = useState<string | null>(null);

  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);

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
    <main className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#e9e0fb]">
      <section
        ref={ref}
        className="relative flex-1 overflow-hidden bg-[url(@/assets/wallpapers/wallpaper.jpg)] bg-size-[40%] bg-center bg-no-repeat p-4"
        aria-label="데스크톱"
      >
        <div
          className="grid h-full w-full auto-cols-max grid-flow-row auto-rows-max gap-6 md:gap-8"
          aria-label="바로가기"
        >
          {Object.values(WINDOW_APPS).map(({ id, icon, caption, category, isOnDesktop }) =>
            isOnDesktop ? (
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
            ) : null
          )}
        </div>

        {Object.values(windows).map((window) => {
          if (!window) return null;

          const app = WINDOW_APPS[window.id];
          if (!app.component) return null;

          const Component = app.component;
          const isActive = window.id === activeWindowId;

          return (
            <Window
              key={window.id}
              ref={ref}
              open
              buttons="all"
              onClose={() => closeWindow(window.id)}
              title={window.caption}
              icon={app.icon}
              isActive={isActive}
              onPointerDown={() => setActiveWindow(window.id)}
              windowId={window.id}
            >
              <Component windowId={window.id} ownerId={window.ownerId} />
            </Window>
          );
        })}
      </section>
      <Taskbar />
    </main>
  );
}
