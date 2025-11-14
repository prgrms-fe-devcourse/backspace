import { useRef, useState } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
// import Window from "@/components/window/Window/Window";
// import MiniHome from "@/pages/minihome/MiniHome";
import { useWindowStore } from "@/stores/useWindowStore";
import { WINDOW_APP } from "@/types/window-app.type";

/**
 * 바탕화면에 표시될 바로가기 목록
 * category와 WINDOW_APP config를 매핑합니다.
 */
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
  };

  const handleShortcutContainerClick = (e: React.MouseEvent<HTMLUListElement>) => {
    // Shortcut 컨테이너 안에서 클릭한 경우
    const target = e.target as HTMLElement;

    // 버튼이 아닌 곳을 클릭한 경우에는 selected 해제
    if (!target.closest("button")) {
      setSelectedShortcutCategory(null);
    }
    // 버튼을 클릭한 경우는 selected 설정됨
    else {
      // 버튼 클릭 시 이벤트 버블링 방지 (main의 onClick이 실행되지 않도록)
      e.stopPropagation();
    }
  };

  return (
    // 마우스 이벤트 있으면 키보드 이벤트도 있어야 한다는 룰
    // 비인터렉티브 요소에 onClick 핸들러 사용하면 안된다는 룰
    // selected 상태의 상태 해제를 위한 것이므로 예외처리
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <main
      ref={ref}
      className="bg-surface relative flex h-screen flex-col overflow-hidden"
      onClick={() => {
        setSelectedShortcutCategory(null);
      }}
    >
      {/* 바탕화면 영역 */}
      <div className="flex-1 p-4">
        {/* 숏컷 영역 */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <ul
          className="flex w-16 flex-col gap-4"
          onClick={handleShortcutContainerClick}
          aria-label="바로가기"
        >
          {DESKTOP_SHORTCUTS.map(({ category, config }) => (
            <li key={category}>
              <Shortcut
                Icon={config.icon}
                caption={config.caption}
                isSelected={selectedShortcutCategory === category}
                isFocused={focusedShortcutCategory === category}
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
