import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { taskbarTab, type TaskbarTabVariantProps } from "./variants";

type TaskbarTabProps = React.ComponentPropsWithoutRef<"div"> &
  TaskbarTabVariantProps & {
    icon: ReactNode;
    text: string;
    isActive?: boolean;
  };

/**
 * Taskbar Tab 컴포넌트
 *
 * Tab을 구현한 컴포넌트입니다.
 * active된 윈도우의 상태를 감지하여 pressed/neutral 상태를 표시합니다.
 * 탭 너비가 44px 이하일 때는 아이콘만 표시하고, 그 이상일 때는 텍스트도 표시합니다.
 *
 * @component
 * @param {ReactNode} icon - Lucide React 아이콘 컴포넌트
 * @param {string} text - 탭에 표시할 텍스트
 * @param {boolean} [isActive=false] - 활성 상태 (true면 pressed, false면 neutral)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} Tab 엘리먼트
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
  ...rest
}: TaskbarTabProps) {
  const [showText, setShowText] = useState(true);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tab = tabRef.current;
    if (!tab) {
      return undefined;
    }

    const minWidthForText = 44;

    const resizeObserver = new ResizeObserver(() => {
      // 탭 너비가 44px 이하이면 텍스트 숨김 (아이콘만 표시)
      const tabWidth = tab.offsetWidth;
      setShowText(tabWidth > minWidthForText);
    });

    resizeObserver.observe(tab);

    // 초기 너비 확인
    const initialWidth = tab.offsetWidth;
    setShowText(initialWidth > minWidthForText);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={tabRef}
      className={twMerge(taskbarTab({ state: isActive ? "pressed" : "neutral" }), className)}
      {...rest}
    >
      <span className="flex min-w-0 items-center justify-start gap-1 px-1">
        <span className="shrink-0">{icon}</span>
        {showText && text && <span className="truncate">{text}</span>}
      </span>
    </div>
  );
}
