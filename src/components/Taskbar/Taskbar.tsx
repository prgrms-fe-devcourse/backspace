import { twMerge } from "tailwind-merge";

import TaskbarStart from "./TaskbarStart";
import TaskbarSystemTray from "./TaskbarSystemTray";
import { taskbar } from "./variants";

export type TaskbarConfig = "default" | "noStartButton" | "noSystemTray" | "minimal";

type TaskbarProps = React.ComponentPropsWithoutRef<"div"> & {
  config: TaskbarConfig;
  children: React.ReactNode;
};

/**
 * Taskbar 컴포넌트
 *
 * Start 버튼, Tab 버튼들, 시스템 트레이를 포함합니다.
 * config prop으로 표시할 요소를 제어할 수 있습니다.
 *
 * @component
 * @param {TaskbarConfig} [config="default"] - Taskbar 구성 옵션
 *   - "default": Start 버튼과 시스템 트레이 모두 표시
 *   - "noStartButton": Start 버튼 없음
 *   - "noSystemTray": 시스템 트레이 없음
 *   - "minimal": Start 버튼과 시스템 트레이 모두 없음 (Tab만 표시)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - TaskbarTab 컴포넌트들
 * @returns {JSX.Element} Taskbar 엘리먼트
 *
 * @example
 * ```tsx
 * // 기본 구성 (모두 표시)
 * <Taskbar>
 *   <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
 * </Taskbar>
 *
 * // Start 버튼 없음
 * <Taskbar config="noStartButton">
 *   <TaskbarTab icon={<Folder size={14} />} text="My Computer" />
 * </Taskbar>
 *
 * // 시스템 트레이 없음
 * <Taskbar config="noSystemTray">
 *   <TaskbarTab icon={<Folder size={14} />} text="My Computer" />
 * </Taskbar>
 *
 * // 최소 구성 (Tab만 표시)
 * <Taskbar config="minimal">
 *   <TaskbarTab icon={<Folder size={14} />} text="My Computer" />
 * </Taskbar>
 * ```
 */
export default function Taskbar({
  className,
  config = "default",
  children,
  ...rest
}: TaskbarProps) {
  const showStart = config === "default" || config === "noSystemTray";
  const showSystemTray = config === "default" || config === "noStartButton";

  return (
    <div className={twMerge(taskbar, className)} {...rest}>
      {showStart && <TaskbarStart />}
      <div className="flex flex-1 items-center gap-1 overflow-hidden">{children}</div>
      {showSystemTray && <TaskbarSystemTray />}
    </div>
  );
}
