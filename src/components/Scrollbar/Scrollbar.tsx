import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import ScrollbarButton from "./ScrollbarButton";
import ScrollbarThumb from "./ScrollbarThumb";
import ScrollbarTrack from "./ScrollbarTrack";
import { scrollbar, type ScrollbarVariantProps } from "./variants";

type ScrollbarProps = ComponentPropsWithoutRef<"div"> &
  ScrollbarVariantProps & {
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
  };

/**
 * Scrollbar 컴포넌트
 *
 * Windows 95 스타일의 커스텀 스크롤바 컴포넌트입니다.
 * horizontal 또는 vertical 방향을 지원합니다.
 *
 * @component
 * @param {"horizontal" | "vertical"} [direction="horizontal"] - 스크롤바 방향
 * @param {boolean} [disabled=false] - 비활성화 상태
 * @param {"sm" | "md" | "lg"} [size="md"] - 썸의 크기 (sm: 40px, md: 66px, lg: 100px)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} 스크롤바 엘리먼트
 *
 * @example
 * ```tsx
 * <Scrollbar direction="horizontal" size="md" />
 * <Scrollbar direction="vertical" size="sm" disabled />
 * ```
 */
export default function Scrollbar({
  direction = "horizontal",
  disabled = false,
  size = "md",
  className,
  ...rest
}: ScrollbarProps) {
  const isHorizontal = direction === "horizontal";
  const iconSize = 10;

  return (
    <div className={twMerge(scrollbar({ direction }), className)} {...rest}>
      {/* 첫 번째 버튼 */}
      <ScrollbarButton
        icon={isHorizontal ? <ChevronLeft size={iconSize} /> : <ChevronUp size={iconSize} />}
        disabled={disabled}
      />

      {/* 트랙 (thumb 포함) */}
      <ScrollbarTrack direction={direction} disabled={disabled}>
        {!disabled && <ScrollbarThumb direction={direction} size={size} disabled={disabled} />}
      </ScrollbarTrack>

      {/* 두 번째 버튼 */}
      <ScrollbarButton
        icon={isHorizontal ? <ChevronRight size={iconSize} /> : <ChevronDown size={iconSize} />}
        disabled={disabled}
      />
    </div>
  );
}
