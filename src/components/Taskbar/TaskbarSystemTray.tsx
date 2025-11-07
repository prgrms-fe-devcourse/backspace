import { twMerge } from "tailwind-merge";
import { taskbarSystemTray, type TaskbarSystemTrayVariantProps } from "./variants";

type TaskbarSystemTrayProps = React.ComponentPropsWithoutRef<"div"> &
  TaskbarSystemTrayVariantProps & {
    children: React.ReactNode;
  };

/**
 * Taskbar 시스템 트레이 컴포넌트
 *
 * Windows 95 스타일의 시스템 트레이를 구현한 컴포넌트입니다.
 *
 * @component
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - 시스템 트레이 콘텐츠
 * @returns {JSX.Element} 시스템 트레이 엘리먼트
 *
 * @example
 * ```tsx
 * <TaskbarSystemTray>3:45 PM</TaskbarSystemTray>
 * ```
 */
export default function TaskbarSystemTray({
  className,
  children,
  ...rest
}: TaskbarSystemTrayProps) {
  return (
    <div className={twMerge(taskbarSystemTray(), className)} {...rest}>
      {children}
    </div>
  );
}
