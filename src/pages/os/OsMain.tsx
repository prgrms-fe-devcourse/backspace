import { useRef, useState } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
import { useWindowStore } from "@/stores/useWindowStore";
import { WINDOW_APP } from "@/types/window-app.type";

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

  const handleShortcutDoubleClick = (category: string, title: string, icon: React.ReactNode) => {
    runWindow({
      category,
      title,
      icon,
    });
  };

  const handleShortcutContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <main
      ref={ref}
      className="bg-primary relative flex h-screen flex-col overflow-hidden"
      onClick={() => {
        setSelectedShortcutCategory(null);
      }}
    >
      {/* 바탕화면 영역 */}
      <div className="flex-1 p-4">
        {/* 숏컷 영역 */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="flex w-16 flex-col gap-4" onClick={handleShortcutContainerClick}>
          <Shortcut
            Icon={WINDOW_APP.HOME.icon}
            caption={WINDOW_APP.HOME.caption}
            isSelected={selectedShortcutCategory === "home"}
            isFocused={focusedShortcutCategory === "home"}
            onClick={() => handleShortcutClick("home")}
            onDoubleClick={() =>
              handleShortcutDoubleClick("home", WINDOW_APP.HOME.caption, <WINDOW_APP.HOME.icon />)
            }
          />
          <Shortcut
            Icon={WINDOW_APP.GALLERY.icon}
            caption={WINDOW_APP.GALLERY.caption}
            isSelected={selectedShortcutCategory === "gallery"}
            isFocused={focusedShortcutCategory === "gallery"}
            onClick={() => handleShortcutClick("gallery")}
            onDoubleClick={() =>
              handleShortcutDoubleClick(
                "gallery",
                WINDOW_APP.GALLERY.caption,
                <WINDOW_APP.GALLERY.icon />
              )
            }
          />
          <Shortcut
            Icon={WINDOW_APP.MEMO.icon}
            caption={WINDOW_APP.MEMO.caption}
            isSelected={selectedShortcutCategory === "memo"}
            isFocused={focusedShortcutCategory === "memo"}
            onClick={() => handleShortcutClick("memo")}
            onDoubleClick={() =>
              handleShortcutDoubleClick("memo", WINDOW_APP.MEMO.caption, <WINDOW_APP.MEMO.icon />)
            }
          />
          <Shortcut
            Icon={WINDOW_APP.GUESTBOOK.icon}
            caption={WINDOW_APP.GUESTBOOK.caption}
            isSelected={selectedShortcutCategory === "guestbook"}
            isFocused={focusedShortcutCategory === "guestbook"}
            onClick={() => handleShortcutClick("guestbook")}
            onDoubleClick={() =>
              handleShortcutDoubleClick(
                "guestbook",
                WINDOW_APP.GUESTBOOK.caption,
                <WINDOW_APP.GUESTBOOK.icon />
              )
            }
          />
          <Shortcut
            Icon={WINDOW_APP.FRIENDS.icon}
            caption={WINDOW_APP.FRIENDS.caption}
            isSelected={selectedShortcutCategory === "friends"}
            isFocused={focusedShortcutCategory === "friends"}
            onClick={() => handleShortcutClick("friends")}
            onDoubleClick={() =>
              handleShortcutDoubleClick(
                "friends",
                WINDOW_APP.FRIENDS.caption,
                <WINDOW_APP.FRIENDS.icon />
              )
            }
          />
          <Shortcut
            Icon={WINDOW_APP.SETTINGS.icon}
            caption={WINDOW_APP.SETTINGS.caption}
            isSelected={selectedShortcutCategory === "settings"}
            isFocused={focusedShortcutCategory === "settings"}
            onClick={() => handleShortcutClick("settings")}
            onDoubleClick={() =>
              handleShortcutDoubleClick(
                "settings",
                WINDOW_APP.SETTINGS.caption,
                <WINDOW_APP.SETTINGS.icon />
              )
            }
          />
        </div>
      </div>
      {/* 태스크바 영역 */}
      <Taskbar />
    </main>
  );
}
