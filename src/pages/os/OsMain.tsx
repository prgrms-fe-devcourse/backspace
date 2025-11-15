import { useRef, useState } from "react";
import type { ComponentType } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
import Window from "@/components/window/Window/Window";
import MiniHome from "@/pages/minihome/MiniHome";
import { useWindowStore } from "@/stores/useWindowStore";
import { WINDOW_APP } from "@/types/window-app.type";

// 바탕화면에 표시될 바로가기 목록
const DESKTOP_SHORTCUTS = [
  { category: "home", config: WINDOW_APP.HOME },
  { category: "gallery", config: WINDOW_APP.GALLERY },
  { category: "memo", config: WINDOW_APP.MEMO },
  { category: "guestbook", config: WINDOW_APP.GUESTBOOK },
  { category: "friends", config: WINDOW_APP.FRIENDS },
  { category: "settings", config: WINDOW_APP.SETTINGS },
] as const;

function createPlannedComponent() {
  return () => <div>(구현 예정)</div>;
}

const WINDOW_COMPONENT_MAP: Record<string, ComponentType> = {
  home: MiniHome,
  gallery: createPlannedComponent(),
  memo: createPlannedComponent(),
  guestbook: createPlannedComponent(),
  friends: createPlannedComponent(),
  settings: createPlannedComponent(),
};

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
    IconComponent: React.ComponentType
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
          {DESKTOP_SHORTCUTS.map(({ category, config }) => (
            <Shortcut
              key={category}
              Icon={config.icon}
              caption={config.caption}
              isSelected={selectedShortcutCategory === category}
              isFocused={focusedShortcutCategory === category}
              onFocus={() => handleShortcutFocus(category)}
              onBlur={handleShortcutBlur}
              onDoubleClick={() => handleShortcutDoubleClick(category, config.caption, config.icon)}
            />
          ))}
        </div>
        {/* 윈도우 렌더링 */}
        {windows.map((window) => {
          // 카테고리에 맞는 컴포넌트를 맵에서 찾아 해당 창에 렌더링
          const WindowContent = WINDOW_COMPONENT_MAP[window.category];
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
