import { useRef } from "react";

import Shortcut from "@/components/os/Shortcut/Shortcut";
import Taskbar from "@/components/os/Taskbar/Taskbar";
import { useWindowStore } from "@/stores/useWindowStore";
import { WINDOW_APP } from "@/types/window-app.type";

export default function OsMain() {
  const ref = useRef<HTMLElement | null>(null);
  const { runWindow } = useWindowStore();

  const handleShortcutClick = () => {
    // 일반 클릭 시 처리 (선택 상태 등)
    // TODO: 선택 상태 관리 구현
  };

  const handleShortcutDoubleClick = (category: string, title: string, icon: React.ReactNode) => {
    runWindow({
      category,
      title,
      icon,
    });
  };

  return (
    <main ref={ref} className="bg-primary relative flex h-screen flex-col overflow-hidden">
      {/* 바탕화면 영역 */}
      <div className="flex-1 p-4">
        <div className="flex w-16 flex-col gap-4">
          <Shortcut
            Icon={WINDOW_APP.HOME.icon}
            caption={WINDOW_APP.HOME.caption}
            onClick={() => handleShortcutClick()}
            onDoubleClick={() =>
              handleShortcutDoubleClick("home", WINDOW_APP.HOME.caption, <WINDOW_APP.HOME.icon />)
            }
          />
          <Shortcut
            Icon={WINDOW_APP.GALLERY.icon}
            caption={WINDOW_APP.GALLERY.caption}
            onClick={() => handleShortcutClick()}
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
            onClick={() => handleShortcutClick()}
            onDoubleClick={() =>
              handleShortcutDoubleClick("memo", WINDOW_APP.MEMO.caption, <WINDOW_APP.MEMO.icon />)
            }
          />
          <Shortcut
            Icon={WINDOW_APP.GUESTBOOK.icon}
            caption={WINDOW_APP.GUESTBOOK.caption}
            onClick={() => handleShortcutClick()}
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
            onClick={() => handleShortcutClick()}
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
            onClick={() => handleShortcutClick()}
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
