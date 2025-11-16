import type { FunctionComponent, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";

import { taskbarTab } from "./variants";

interface TaskbarTabProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  isFocused?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Taskbar Tab 컴포넌트
 *
 * Tab을 구현한 컴포넌트입니다.
 * focus된 윈도우의 상태를 감지하여 pressed/neutral 상태를 표시합니다.
 * 탭 너비가 44px 이하일 때는 아이콘만 표시하고, 그 이상일 때는 텍스트도 표시합니다.
 * CSS Container Queries를 사용하여 JavaScript 없이 동작합니다.
 * Button 컴포넌트를 기반으로 구현되었습니다.
 *
 * @component
 * @param {ComponentType<SVGProps<SVGSVGElement>>} icon - 아이콘 컴포넌트
 * @param {string} title - 탭에 표시할 윈도우 제목
 * @param {boolean} [isFocused=false] - focus 상태 (true면 pressed, false면 neutral)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} Button 컴포넌트
 *
 * @example
 * ```tsx
 * <TaskbarTab icon={Folder} title="My Computer" isFocused />
 * ```
 */
export default function TaskbarTab({
  icon: Icon,
  title,
  isFocused = false,
  className,
  onClick,
}: TaskbarTabProps) {
  return (
    <Button
      size="sm"
      composition="iconText"
      state={isFocused ? "pressed" : "neutral"}
      width="auto"
      className={twMerge(taskbarTab, className)}
      onClick={onClick}
    >
      <span className="flex gap-1.5 overflow-hidden">
        <span className="shrink-0">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {title && (
          <span className="min-w-0 flex-1 truncate @max-[44px]:hidden" title={title}>
            {title}
          </span>
        )}
      </span>
    </Button>
  );
}
