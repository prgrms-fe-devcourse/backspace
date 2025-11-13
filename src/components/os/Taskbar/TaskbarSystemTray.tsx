import { twMerge } from "tailwind-merge";

import { taskbarSystemTray } from "./variants";

type TaskbarSystemTrayProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Taskbar 시스템 트레이 컴포넌트
 *
 * 내부에 스피커 아이콘과 시간 표시 영역이 포함되어 있습니다.
 *
 * @component
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} 시스템 트레이 엘리먼트
 *
 * @example
 * ```tsx
 * <TaskbarSystemTray />
 * ```
 */
export default function TaskbarSystemTray({ className, ...rest }: TaskbarSystemTrayProps) {
  return (
    <div className={twMerge(taskbarSystemTray, className)} {...rest}>
      <time className="whitespace-nowrap" dateTime="">
        {/* 시간 표시 영역 */}
        12:00
      </time>
    </div>
  );
}
