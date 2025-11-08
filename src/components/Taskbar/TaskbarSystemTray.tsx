import { Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { taskbarSystemTray, type TaskbarSystemTrayVariantProps } from "./variants";

type TaskbarSystemTrayProps = React.ComponentPropsWithoutRef<"div"> & TaskbarSystemTrayVariantProps;

/**
 * Taskbar 시스템 트레이 컴포넌트
 *
 * 내부에 스피커 아이콘과 현재 시각이 포함되어 있습니다.
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  return (
    <div className={twMerge(taskbarSystemTray(), className)} {...rest}>
      <Volume2 size={14} className="shrink-0" />
      <span className="whitespace-nowrap">{formatTime(currentTime)}</span>
    </div>
  );
}
