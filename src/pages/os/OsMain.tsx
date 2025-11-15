import { useRef, useState } from "react";
import type { ComponentType } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
import Window from "@/components/window/Window/Window";
import { useWindowStore } from "@/stores/useWindowStore";
import { WINDOW_APPS, type WindowApp } from "@/types/window-app.type";

const WINDOW_CONFIGS: WindowApp[] = Object.values(WINDOW_APPS);

export default function OsMain() {
  const ref = useRef<HTMLElement | null>(null);
  const { windows, runWindow, closeWindow } = useWindowStore();
  const [selectedShortcutCategory, setSelectedShortcutCategory] = useState<string | null>(null);
  const [focusedShortcutCategory, setFocusedShortcutCategory] = useState<string | null>(null);

  const handleShortcutFocus = (category: string) => {
    // 포커스가 들어올 때 -> isSelected와 isFocused 모두 true
    setSelectedShortcutCategory(category);
    setFocusedShortcutCategory(category);
  };

  const handleShortcutBlur = () => {
    // 포커스가 다른 곳으로 이동할 때 selected 해제
    setSelectedShortcutCategory(null);
  };

  const handleShortcutDoubleClick = (
    category: string,
    title: string,
    IconComponent: ComponentType
  ) => {
    runWindow({
      category,
      title,
      icon: <IconComponent />,
    });

    // 더블클릭 시 상태 해제
    setSelectedShortcutCategory(null);
    setFocusedShortcutCategory(null);
  };

  return (
    <main ref={ref} className="bg-surface flex h-screen flex-col">
      {/* 바탕화면 영역 */}
      <div className="flex-1 p-4">
        {/* 바로가기 그리드 영역 */}
        <div
          className="grid h-full w-full auto-cols-[80px] grid-flow-col grid-rows-[repeat(auto-fill,100px)] content-start gap-4"
          aria-label="바로가기"
        >
          {WINDOW_CONFIGS.map(({ category, icon, caption }) => (
            <Shortcut
              key={category}
              Icon={icon}
              caption={caption}
              isSelected={selectedShortcutCategory === category}
              isFocused={focusedShortcutCategory === category}
              onFocus={() => handleShortcutFocus(category)}
              onBlur={handleShortcutBlur}
              onDoubleClick={() => handleShortcutDoubleClick(category, caption, icon)}
            />
          ))}
        </div>
        {/* 윈도우 렌더링 */}
        {windows.map((window) => {
          const windowConfig = WINDOW_CONFIGS.find((config) => config.category === window.category);
          const WindowContent = windowConfig?.component;
          if (!WindowContent) return null;
          return (
            <Window
              key={window.category}
              ref={ref}
              open
              buttons="all"
              onClose={() => closeWindow(window.category)}
              title={window.title}
              icon={window.icon}
            >
              <WindowContent />
            </Window>
          );
        })}
      </div>
      {/* 태스크바 영역 */}
      <Taskbar />
    </main>
  );
}
