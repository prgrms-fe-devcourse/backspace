import React from "react";
import { twMerge } from "tailwind-merge";

import { window } from "./variants";
import type { WindowVariantProps } from "./variants";

interface WindowProps extends React.ComponentPropsWithoutRef<"div">, WindowVariantProps {}

/**
 * 공통 Window 컴포넌트
 *
 * Windows 95 스타일의 윈도우를 구현한 컴포넌트입니다.
 * CVA 기반으로 크기(size)와 여백(padding)을 조합하여 다양한 스타일을 제공합니다.
 *
 * @component
 *
 * @param {"maximized" | "minimized" | "auto" | "custom"} [size="auto"]
 *   - Window 전체 크기를 조절합니다.
 *
 * @param {"full" | "standard" | "extra" | "custom"} [padding="standard"]
 *   - padding 크기를 조절합니다.
 *
 * @param {string} [className]
 *   - 추가 Tailwind 클래스를 전달하여 Window의 스타일을 오버라이드할 수 있습니다.
 */

export default function Window({
  size = "auto",
  padding = "standard",
  className,
  children,
}: WindowProps) {
  return (
    <section>
      <div
        className={twMerge(
          window({
            size,
            padding,
          }),
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
