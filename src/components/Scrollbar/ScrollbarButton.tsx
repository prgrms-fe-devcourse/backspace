import type { LucideProps } from "lucide-react";
import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button/Button";

interface ScrollbarButtonProps {
  icon: ReactElement<LucideProps>;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Scrollbar Button 컴포넌트
 *
 * 스크롤바의 양 끝에 위치하는 화살표 버튼입니다.
 * Button 컴포넌트를 기반으로 구현되었습니다.
 *
 * @component
 * @param {ReactElement} icon - Lucide React 아이콘 컴포넌트
 * @param {boolean} [disabled=false] - 비활성화 상태
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {string} [aria-label] - 접근성을 위한 버튼 설명
 * @returns {JSX.Element} 스크롤바 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * <ScrollbarButton icon={<ChevronLeft size={10} />} aria-label="왼쪽으로 스크롤" />
 * ```
 */
export default function ScrollbarButton({
  icon,
  disabled = false,
  className,
  "aria-label": ariaLabel,
  ...rest
}: ScrollbarButtonProps) {
  return (
    <Button
      size="sm"
      composition="iconOnly"
      state="neutral"
      disabled={disabled}
      aria-label={ariaLabel}
      className={twMerge("h-4 w-4 p-0", className)}
      {...rest}
    >
      {icon}
    </Button>
  );
}
