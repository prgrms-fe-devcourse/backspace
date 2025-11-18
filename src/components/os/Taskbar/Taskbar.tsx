import React from "react";
import { twMerge } from "tailwind-merge";

import { StartMenu } from "@/components/os/Start/StartMenu";
import { WINDOW_APPS } from "@/config/window";
import { useWindowStore } from "@/stores/useWindowStore";
import type { WindowAppId } from "@/types/window.types";

import TaskbarSystemTray from "./TaskbarSystemTray";
import TaskbarTab from "./TaskbarTab";
import { taskbar } from "./variants";

export type TaskbarConfig = "default" | "noStartButton" | "noSystemTray" | "minimal";

type TaskbarProps = React.ComponentPropsWithoutRef<"nav"> & {
  config?: TaskbarConfig;
};

/**
 * Taskbar 컴포넌트
 *
 * Zustand와 연동되어 Window Store의 windows를 구독하여 자동으로 탭을 생성합니다.
 * Start 버튼, Tab 버튼들, 시스템 트레이를 포함합니다.
 * config prop으로 표시할 요소를 제어할 수 있습니다.
 * 네비게이션 역할을 하므로 `<nav>` 엘리먼트를 사용합니다.
 *
 * @component
 * @param {TaskbarConfig} [config="default"] - Taskbar 구성 옵션
 *   - "default": Start 버튼과 시스템 트레이 모두 표시
 *   - "noStartButton": Start 버튼 없음
 *   - "noSystemTray": 시스템 트레이 없음
 *   - "minimal": Start 버튼과 시스템 트레이 모두 없음 (Tab만 표시)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} Nav 엘리먼트
 *
 * @example
 * ```tsx
 * // 기본 구성 (모두 표시)
 * <Taskbar />
 *
 * // Start 버튼 없음
 * <Taskbar config="noStartButton" />
 *
 * // 시스템 트레이 없음
 * <Taskbar config="noSystemTray" />
 *
 * // 최소 구성 (Tab만 표시)
 * <Taskbar config="minimal" />
 * ```
 */
export default function Taskbar({ className, config = "default", ...rest }: TaskbarProps) {
  const windows = useWindowStore((state) => state.windows);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);

  const showStart = config === "default" || config === "noSystemTray";
  const showSystemTray = config === "default" || config === "noStartButton";

  const handleTabClick = (id: WindowAppId) => {
    // Taskbar 탭 클릭 시 해당 window로 focus
    setActiveWindow(id);
  };

  return (
    <nav className={twMerge(taskbar, className)} {...rest}>
      {showStart && <StartMenu />}
      <ul className="flex flex-1 items-center gap-1 overflow-hidden">
        {Object.values(windows).map((window) => {
          if (!window) return null;

          const app = WINDOW_APPS[window.id];
          if (!app) return null;

          return (
            <li key={window.id} className="@container flex max-w-43 min-w-0 flex-1">
              <TaskbarTab
                icon={app.icon}
                title={window.caption ?? app.caption}
                isFocused={window.id === activeWindowId}
                onClick={() => handleTabClick(window.id)}
              />
            </li>
          );
        })}
      </ul>
      {showSystemTray && <TaskbarSystemTray />}
    </nav>
  );
}
