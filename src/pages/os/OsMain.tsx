import { useRef, useState } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
// import Window from "@/components/window/Window/Window";
// import MiniHome from "@/pages/minihome/MiniHome";
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

export default function OsMain() {
  const ref = useRef<HTMLElement | null>(null);
  const { runWindow } = useWindowStore();
  const [selectedShortcutCategory, setSelectedShortcutCategory] = useState<string | null>(null);
  const [focusedShortcutCategory, setFocusedShortcutCategory] = useState<string | null>(null);

  const handleShortcutBlur = () => {
    // 포커스가 다른 곳으로 이동할 때 selected 해제
    setSelectedShortcutCategory(null);
  };

  const handleShortcutClick = (category: string) => {
    // 아이콘 클릭 시 -> isSelected와 isFocused 모두 true
    setSelectedShortcutCategory(category);
    setFocusedShortcutCategory(category);
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
    <main ref={ref} className="bg-surface relative flex h-screen flex-col overflow-hidden">
      {/* 바탕화면 영역 */}
      <div className="flex-1 p-4">
        {/* 숏컷 영역 */}
        <ul className="flex w-16 flex-col gap-4" aria-label="바로가기">
          {DESKTOP_SHORTCUTS.map(({ category, config }) => (
            <li key={category}>
              <Shortcut
                Icon={config.icon}
                caption={config.caption}
                isSelected={selectedShortcutCategory === category}
                isFocused={focusedShortcutCategory === category}
                onBlur={handleShortcutBlur}
                onClick={() => handleShortcutClick(category)}
                onDoubleClick={() =>
                  handleShortcutDoubleClick(category, config.caption, config.icon)
                }
              />
            </li>
          ))}
        </ul>
        {/* TODO: 윈도우 렌더링 구현 */}
      </div>
      {/* 태스크바 영역 */}
      <Taskbar />
    </main>
  );
}
