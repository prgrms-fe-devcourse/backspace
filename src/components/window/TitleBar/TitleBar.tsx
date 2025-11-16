import { AppWindow, Minus, X } from "lucide-react";
import React, { type ComponentType, type SVGProps } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";

import { titleBar } from "./variants";
import type { TitleBarVariantProps } from "./variants";

const sizeConfig = {
  small: {
    iconClassName: "h-3 w-3",
    buttonSizeClass: "h-4.5 w-4.5",
    iconSizeClass: "h-3 w-3",
  },
  medium: {
    iconClassName: "h-4 w-4",
    buttonSizeClass: "h-6 w-6",
    iconSizeClass: "h-4 w-4",
  },
} as const;

export interface TitleBarProps extends React.ComponentPropsWithoutRef<"div">, TitleBarVariantProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>; // FunctionComponent → ComponentType
  title?: string; // text → title (prop 이름 통일)
  buttons?: "all" | "closeOnly" | null;
  onClose?: () => void;
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
 * @param {ComponentType<SVGProps<SVGSVGElement>>} [icon]
 *   - TitleBar 좌측에 표시되는 아이콘 컴포넌트입니다.
 *     TitleBar 크기에 맞춰 자동으로 리사이징됩니다.
 *
 * @param {string} [title]
 *   - 제목 문자열로 TitleBar의 중앙에 표시됩니다.
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
 *   icon={Folder}
 *   title="My Computer"
 *   buttons="all"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TitleBar
 *   size="medium"
 *   icon={Image}
 *   title="Photos Viewer"
 *   buttons="closeOnly"
 * />
 * ```
 */

export default function TitleBar({
  state = "active",
  size = "small",
  icon: Icon,
  title,
  buttons = null,
  onClose,
  className,
  ...rest
}: TitleBarProps) {
  const { iconClassName, buttonSizeClass, iconSizeClass } = sizeConfig[size ?? "small"];

  return (
    <header
      className={twMerge(
        titleBar({
          state,
          size,
        }),
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1.5">
        {Icon && (
          <div className="shrink-0">
            <Icon className={twMerge(iconSizeClass, "text-accent-contrast")} />
          </div>
        )}
        <div className="text-accent-contrast truncate whitespace-nowrap">{title}</div>
      </div>

      {buttons && (
        <div className="flex shrink-0 gap-0.5">
          {buttons === "all" && (
            <>
              <Button
                composition="iconOnly"
                className={buttonSizeClass}
                aria-label="Minimize window"
              >
                <Minus className={iconClassName} strokeWidth={2} />
              </Button>

              <Button
                composition="iconOnly"
                className={buttonSizeClass}
                aria-label="Maximize window"
              >
                <AppWindow className={iconClassName} strokeWidth={2} />
              </Button>
            </>
          )}

          <Button
            onClick={onClose}
            composition="iconOnly"
            className={buttonSizeClass}
            aria-label="Close window"
          >
            <X className={iconClassName} strokeWidth={2} />
          </Button>
        </div>
      )}
    </header>
  );
}
