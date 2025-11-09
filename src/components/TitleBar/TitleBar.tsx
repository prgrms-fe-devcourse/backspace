// TitleBar.tsx
import { AppWindow, Minus, X } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { titleBar } from "./variants";
import type { TitleBarVariantProps } from "./variants";
import Button from "../Button/Button";

interface TitleBarProps extends React.ComponentPropsWithoutRef<"div">, TitleBarVariantProps {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  buttons?: "all" | "closeOnly" | null;
}

/**
 * 공통 TitleBar 컴포넌트
 *
 * Windows 95 스타일의 제목 표시줄을 구현한 컴포넌트입니다.
 * 아이콘, 제목 텍스트, 우측의 윈도우 컨트롤 버튼(최소화/최대화/닫기)을 표시할 수 있습니다.
 * CVA 기반으로 상태(state)와 크기(size)를 조합하여 다양한 스타일을 제공합니다.
 *
 * @component
 *
 * @param {"active" | "inactive"} [state="active"]
 *   - TitleBar의 활성/비활성 스타일을 정의합니다.
 *
 * @param {"small" | "medium"} [size="small"]
 *   - TitleBar 전체 높이 및 내부 요소(Button, Icon)의 크기를 조절합니다.
 *
 * @param {React.ReactNode} [icon]
 *   - TitleBar 좌측에 표시되는 아이콘 요소입니다.
 *     ReactElement로 전달되며, TitleBar 크기에 맞춰 자동으로 리사이징됩니다.
 *
 * @param {React.ReactNode} [text]
 *   - 제목 문자열 또는 JSX로 전달할 수 있는 TitleBar의 중앙 텍스트입니다.
 *
 * @param {"all" | "closeOnly" | null} [buttons=null]
 *   - 우측 컨트롤 버튼 표시 옵션입니다.
 *     - `"all"` → 최소화 / 최대화 / 닫기 버튼 모두 표시
 *     - `"closeOnly"` → 닫기(X) 버튼만 표시
 *     - `null` → 어떤 버튼도 표시하지 않음
 *
 * @param {string} [className]
 *   - 추가 Tailwind 클래스를 전달하여 TitleBar의 스타일을 오버라이드할 수 있습니다.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} rest
 *   - div 요소에 전달되는 기본 DOM 속성들입니다.
 *
 * @returns {JSX.Element} TitleBar 엘리먼트
 *
 * @example
 * ```tsx
 * <TitleBar
 *   size="small"
 *   state="active"
 *   icon={<Folder />}
 *   text="My Computer"
 *   buttons="all"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TitleBar
 *   size="medium"
 *   icon={<Image />}
 *   text="Photos Viewer"
 *   buttons="closeOnly"
 * />
 * ```
 */

export default function TitleBar({
  state = "active",
  size = "small",
  icon,
  text,
  buttons = null,
  className,
  ...rest
}: TitleBarProps) {
  const buttonSizeProp = size === "medium" ? "md" : "sm";

  const iconClassName = size === "medium" ? "h-4 w-4" : "h-3 w-3";

  const buttonSizeClass = size === "medium" ? "h-6 w-6" : "h-4.5 w-4.5";

  const iconSizeClass = size === "medium" ? "h-4 w-4" : "h-3 w-3";

  const sizedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        className: twMerge(
          (icon as React.ReactElement<any>).props.className,
          iconSizeClass,
          "text-accent-contrast"
        ),
      })
    : null;

  const renderButtons = () => {
    if (buttons === "all") {
      return (
        <div className="flex gap-0.5">
          <Button size={buttonSizeProp} composition="iconOnly" className={buttonSizeClass}>
            <Minus className={iconClassName} strokeWidth={2} />
          </Button>
          <Button size={buttonSizeProp} composition="iconOnly" className={buttonSizeClass}>
            <AppWindow className={iconClassName} strokeWidth={2} />
          </Button>
          <Button size={buttonSizeProp} composition="iconOnly" className={buttonSizeClass}>
            <X className={iconClassName} strokeWidth={2} />
          </Button>
        </div>
      );
    }
    if (buttons === "closeOnly") {
      return (
        <Button size={buttonSizeProp} composition="iconOnly" className={buttonSizeClass}>
          <X className={iconClassName} strokeWidth={2} />
        </Button>
      );
    }
    return null;
  };

  return (
    <div
      className={twMerge(
        titleBar({
          state,
          size,
        }),
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        {sizedIcon && <div className="shrink-0">{sizedIcon}</div>}
        <span className="text-accent-contrast truncate whitespace-nowrap">{text}</span>
      </div>

      {renderButtons()}
    </div>
  );
}
