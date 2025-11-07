import { twMerge } from "tailwind-merge";
import Button from "@/components/Button/Button";
import { taskbarStart } from "./variants";

type TaskbarStartProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

/**
 * Taskbar Start 버튼 컴포넌트
 *
 * Windows 95 스타일의 Start 버튼을 구현한 컴포넌트입니다.
 * Button 컴포넌트를 기반으로 구현되었습니다.
 *
 * @component
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - 버튼 내부 콘텐츠 (아이콘 + 텍스트)
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} Start 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * <TaskbarStart onClick={() => console.log("Start clicked")}>
 *   🪟 Start
 * </TaskbarStart>
 * ```
 */
export default function TaskbarStart({ className, children, onClick, ...rest }: TaskbarStartProps) {
  return (
    <Button
      composition="iconText"
      className={twMerge(taskbarStart(), className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}
