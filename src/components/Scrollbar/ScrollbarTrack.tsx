import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { scrollbarTrack, type ScrollbarTrackVariantProps } from "./variants";

type ScrollbarTrackProps = ComponentPropsWithoutRef<"div"> &
  ScrollbarTrackVariantProps & {
    children: ReactNode;
  };

/**
 * Scrollbar Track 컴포넌트
 *
 * 스크롤바의 트랙 영역입니다. 내부에 Thumb가 위치합니다.
 *
 * @component
 * @param {"horizontal" | "vertical"} [direction="horizontal"] - 스크롤바 방향
 * @param {boolean} [disabled=false] - 비활성화 상태
 * @param {ReactNode} children - 내부 콘텐츠 (보통 ScrollbarThumb)
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} 스크롤바 트랙 엘리먼트
 *
 * @example
 * ```tsx
 * <ScrollbarTrack direction="horizontal">
 *   <ScrollbarThumb />
 * </ScrollbarTrack>
 * ```
 */
export default function ScrollbarTrack({
  direction = "horizontal",
  disabled = false,
  children,
  className,
  ...rest
}: ScrollbarTrackProps) {
  return (
    <div className={twMerge(scrollbarTrack({ direction, disabled }), className)} {...rest}>
      {children}
    </div>
  );
}
