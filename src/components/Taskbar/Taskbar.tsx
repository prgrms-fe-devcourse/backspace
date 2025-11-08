import { twMerge } from "tailwind-merge";

import { taskbar, type TaskbarVariantProps } from "./variants";

type TaskbarProps = React.ComponentPropsWithoutRef<"div"> & TaskbarVariantProps;

/**
 * Taskbar 컴포넌트
 *
 * Start 버튼, Tab 버튼들, 시간 표시를 포함합니다.
 *
 * @component
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - Taskbar 내부 콘텐츠 (TaskbarStart, TaskbarTab, TaskbarTime)
 * @returns {JSX.Element} Taskbar 엘리먼트
 *
 * @example
 *x
 * <Taskbar>
 *   <TaskbarStart>🪟 Start</TaskbarStart>
 *   <TaskbarTab isActive> My Computer</TaskbarTab>
 *   <TaskbarTime>3:45 PM</TaskbarTime>
 * </Taskbar>
 *  */
export default function Taskbar({ className, children, ...rest }: TaskbarProps) {
  return (
    <div className={twMerge(taskbar(), className)} {...rest}>
      {children}
    </div>
  );
}
