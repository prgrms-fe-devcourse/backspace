import React from "react";
import { twMerge } from "tailwind-merge";

import { window, windowContents } from "./variants";
import type { WindowContentsVariantProps, WindowVariantProps } from "./variants";
import TitleBar from "../TitleBar/TitleBar";

interface WindowProps
  extends React.ComponentPropsWithoutRef<"div">,
    WindowVariantProps,
    WindowContentsVariantProps {
  titleIcon?: React.ReactNode;
  titleText?: string;
  titleSize?: "small" | "medium";
  titleButtons?: "all" | "closeOnly" | null;
  titleVisible?: boolean;
  state?: "maximized" | "minimized" | "normal";
  activeState?: "active" | "inactive";
}

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
  state = "normal",
  activeState = "active",
  padding = "standard",
  titleSize = "small",
  titleIcon = null,
  titleText = "",
  titleButtons = "all",
  titleVisible = true,
  className,
  children,
}: WindowProps) {
  return (
    <div
      className={twMerge("bevel-default flex flex-col", window({ state, activeState }), className)}
    >
      {titleVisible && (
        <TitleBar
          state={activeState}
          size={titleSize}
          icon={titleIcon}
          text={titleText}
          buttons={titleButtons}
        />
      )}
      <section className="size-full">
        <div
          className={twMerge(
            "size-full",
            windowContents({
              padding,
            })
          )}
        >
          {children}
        </div>
      </section>
    </div>
  );
}
