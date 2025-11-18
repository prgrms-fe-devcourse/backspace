import dayjs from "dayjs";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import useTheme from "@/hooks/useTheme";

import { taskbarSystemTray } from "./variants";

type TaskbarSystemTrayProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Taskbar 시스템 트레이 컴포넌트
 *
 * 내부에 시간 표시 영역이 포함되어 있습니다.
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
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(dayjs());
    };

    // 즉시 한 번 업데이트
    updateTime();

    // 다음 분 경계에 맞춰서 1분 간격으로 갱신
    const now = dayjs();
    const msUntilNextMinute = (60 - now.second()) * 1000 - now.millisecond();

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const formattedTime = currentTime.format("h:mm A");
  const isoTime = currentTime.toISOString();

  const { toggleTheme, theme } = useTheme();

  return (
    <div className={twMerge(taskbarSystemTray, "select-non1 gap-1.5 px-2", className)} {...rest}>
      <button type="button" onClick={() => toggleTheme()}>
        {theme === "light" ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
      </button>
      <time className="whitespace-nowrap" dateTime={isoTime}>
        {formattedTime}
      </time>
    </div>
  );
}
