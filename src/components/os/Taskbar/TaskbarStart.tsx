import { twMerge } from "tailwind-merge";

import BackspaceLogo from "@/assets/icons/backspace_logo.svg?react";
import Button from "@/components/common/Button/Button";

import { taskbarStart } from "./variants";

type TaskbarStartProps = React.ComponentPropsWithoutRef<"button">;

/**
 * Taskbar Start 버튼 컴포넌트
 *
 * Button 컴포넌트를 기반으로 구현되었으며, 내부에 아이콘과 "Start" 텍스트가 포함되어 있습니다.
 *
 * @component
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} Start 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * <TaskbarStart onClick={() => console.log("Start clicked")} />
 * ```
 */
export default function TaskbarStart({ className, onClick, ...rest }: TaskbarStartProps) {
  return (
    <Button
      composition="iconText"
      className={twMerge(taskbarStart, className)}
      onClick={onClick}
      {...rest}
    >
      <BackspaceLogo className="size-4" />
      Start
    </Button>
  );
}
