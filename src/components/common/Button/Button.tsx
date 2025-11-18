import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { button, type ButtonVariantProps } from "./variants";

type ButtonState = "neutral" | "pressed" | "focus" | "inactive";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, ButtonVariantProps {}

/**
 * 공통 버튼 컴포넌트
 *
 * 버튼 스타일, 사이즈, 형태 등을 조합할 수 있도록 CVA를 활용해 구현했습니다.
 *
 * @component
 * @param {"lg" | "md" | "sm"} [size="sm"] - 버튼 크기
 * @param {"iconOnly" | "textOnly" | "iconText" } [composition="iconText"] - 아이콘/텍스트 조합 형태
 * @param {"neutral" | "pressed" | "focus" | "inactive"} [state="neutral"] - 버튼 스타일 유형
 * @param {"full" | "auto"} [width="auto"] - 버튼 폭 정의
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - 버튼 내부 콘텐츠
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * <Button size="sm" composition="iconText" onClick={() => alert("clicked")}>
 *   <Plus /> 저장하기
 * </Button>
 * ```
 */

export default function Button({
  size = "sm",
  composition = "iconText",
  state: controlledState,
  width = "auto",
  disabled,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const [state, setState] = useState<ButtonState>("neutral");

  const currentState = controlledState ?? state;

  const handleMouseDown = () => !controlledState && setState("pressed");
  const handleMouseUp = () => !controlledState && setState("focus");
  const handleBlur = () => !controlledState && setState("neutral");

  return (
    <button
      type="button"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        button({
          size,
          state: currentState,
          composition,
          width,
        }),
        className
      )}
      {...rest}
    >
      <span
        className={twMerge(
          "flex items-center justify-center",
          composition === "iconText" && size === "sm" && "gap-1",
          composition === "iconText" && size === "md" && "gap-1.5",
          composition === "iconText" && size === "lg" && "gap-2",
          disabled && "opacity-40"
        )}
      >
        {children}
      </span>
    </button>
  );
}
