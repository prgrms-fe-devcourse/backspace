import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";

import { taskbarTab } from "./variants";

interface TaskbarTabProps {
  icon: ReactNode;
  text: string;
  isActive?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Taskbar Tab 컴포넌트
 *
 * Tab을 구현한 컴포넌트입니다.
 * active된 윈도우의 상태를 감지하여 pressed/neutral 상태를 표시합니다.
 * 탭 너비가 44px 이하일 때는 아이콘만 표시하고, 그 이상일 때는 텍스트도 표시합니다.
 * CSS Container Queries를 사용하여 JavaScript 없이 동작합니다.
 * Button 컴포넌트를 기반으로 구현되었습니다.
 *
 * @component
 * @param {ReactNode} icon - 아이콘을 나타내는 React 노드
 * @param {string} text - 탭에 표시할 텍스트
 * @param {boolean} [isActive=false] - 활성 상태 (true면 pressed, false면 neutral)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} Button 컴포넌트
 *
 * @example
 * ```tsx
 * <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
 * ```
 */
export default function TaskbarTab({
  icon,
  text,
  isActive = false,
  className,
  onClick,
}: TaskbarTabProps) {
  return (
    <Button
      size="sm"
      composition="iconText"
      state={isActive ? "pressed" : "neutral"}
      width="auto"
      className={twMerge(taskbarTab, className)}
      onClick={onClick}
    >
      <span className="flex overflow-hidden">
        <span className="shrink-0">{icon}</span>
        {text && (
          <span className="min-w-0 flex-1 truncate @max-[44px]:hidden" title={text}>
            {text}
          </span>
        )}
      </span>
    </Button>
  );
}
