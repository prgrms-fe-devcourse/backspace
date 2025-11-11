import { twMerge } from "tailwind-merge";

interface TabProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

/**
 * RoundedTab 컴포넌트
 *
 * Rounded 탭 컴포넌트입니다.
 * 하단이 잘려있고 상단 모서리가 둥근 탭을 div 레이어를 쌓아서 구현했습니다.
 *
 * @component
 * @param {React.ReactNode} children - 탭에 표시할 내용
 * @param {string} [className] - 추가 Tailwind CSS 클래스
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [rest] - button 요소의 나머지 속성들
 * @returns {JSX.Element} RoundedTab 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <RoundedTab>Tab 1</RoundedTab>
 *
 * // 클릭 이벤트
 * <RoundedTab onClick={() => console.log("Tab clicked")}>
 *   Clickable Tab
 * </RoundedTab>
 *
 * // 여러 탭 그룹
 * <div className="flex items-end gap-0">
 *   <RoundedTab>Tab 1</RoundedTab>
 *   <RoundedTab>Tab 2</RoundedTab>
 *   <RoundedTab>Tab 3</RoundedTab>
 * </div>
 * ```
 */
export default function RoundedTab({ children, className, ...rest }: TabProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "relative inline-flex cursor-pointer items-center justify-center",
        "px-3 py-1.5 text-xs",
        "whitespace-nowrap",
        "mr-0.5",
        "z-0",
        className
      )}
      {...rest}
    >
      {/* 레이어 컨테이너 - 모든 레이어를 묶는 기준 컨테이너 */}
      <div className="absolute inset-0">
        {/* 상단 하이라이트 - 내부 */}
        <div className="absolute top-0 right-0.25 left-0.25 h-px bg-[var(--color-bevel-light-inner)]" />
        {/* 상단 하이라이트 - 외부 */}
        <div className="absolute top-[-1px] right-0.5 left-0.5 h-px bg-[var(--color-bevel-light-outer)]" />
        {/* 좌측 하이라이트 - 내부 */}
        <div className="absolute top-0.5 bottom-0 left-0 w-px bg-[var(--color-bevel-light-outer)]" />
        {/* 좌측 하이라이트 - 외부 */}
        <div className="absolute top-0.5 bottom-0 left-[-1px] w-px bg-[var(--color-bevel-light-outer)]" />
        {/* 우측 그림자 - 내부 */}
        <div className="absolute top-0.5 right-0 bottom-0 w-px bg-[var(--color-bevel-shadow-inner)]" />
        {/* 우측 그림자 - 외부 */}
        <div className="absolute top-0.5 right-[-1px] bottom-0 w-px bg-[var(--color-bevel-shadow-outer)]" />
        {/* 배경 - 메인 바디 */}
        <div className="absolute top-px right-px bottom-0 left-px z-0 bg-[var(--color-surface)]" />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
