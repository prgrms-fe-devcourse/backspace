import { twMerge } from "tailwind-merge";
import { taskbarTab, type TaskbarTabVariantProps } from "./variants";

type TaskbarTabProps = React.ComponentPropsWithoutRef<"div"> &
  TaskbarTabVariantProps & {
    children: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    isActive?: boolean;
  };

/**
 * Taskbar Tab 컴포넌트
 *
 * Windows 95 스타일의 Tab을 구현한 컴포넌트입니다.
 * active된 윈도우의 상태를 감지하여 pressed/neutral 상태를 표시합니다.
 * 사용 가능한 공간에 따라 텍스트가 자동으로 잘립니다.
 *
 * @component
 * @param {boolean} [isActive=false] - 활성 상태 (true면 pressed, false면 neutral)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - Tab 내부 콘텐츠 (아이콘 + 텍스트)
 * @returns {JSX.Element} Tab 엘리먼트
 *
 * @example
 * ```tsx
 * <TaskbarTab isActive>
 *   📁 My Computer
 * </TaskbarTab>
 * ```
 */
export default function TaskbarTab({
  isActive = false,
  className,
  children,
  ...rest
}: TaskbarTabProps) {
  return (
    <div
      className={twMerge(taskbarTab({ state: isActive ? "pressed" : "neutral" }), className)}
      {...rest}
    >
      <span className="flex min-w-0 items-center justify-start gap-1 truncate px-1">
        {children}
      </span>
    </div>
  );
}
