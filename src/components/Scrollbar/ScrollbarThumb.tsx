import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { scrollbarThumb, type ScrollbarThumbVariantProps } from "./variants";

type ScrollbarThumbProps = ComponentPropsWithoutRef<"div"> & ScrollbarThumbVariantProps;

/**
 * Scrollbar Thumb 컴포넌트
 *
 * 스크롤바의 썸(드래그 가능한 부분)입니다.
 *
 * @component
 * @param {"horizontal" | "vertical"} [direction="horizontal"] - 스크롤바 방향
 * @param {"sm" | "md" | "lg"} [size="md"] - 썸의 크기 (sm: 40px, md: 66px, lg: 100px)
 * @param {boolean} [disabled=false] - 비활성화 상태
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} 스크롤바 썸 엘리먼트
 *
 * @example
 * ```tsx
 * <ScrollbarThumb direction="horizontal" size="md" />
 * ```
 */
export default function ScrollbarThumb({
  direction = "horizontal",
  size = "md",
  disabled = false,
  className,
  ...rest
}: ScrollbarThumbProps) {
  return (
    <div className={twMerge(scrollbarThumb({ direction, size, disabled }), className)} {...rest} />
  );
}
