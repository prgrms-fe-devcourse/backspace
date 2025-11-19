import { twMerge } from "tailwind-merge";

interface TabProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * RoundedTab 컴포넌트
 *
 * Rounded 탭 컴포넌트입니다.
 * 하단이 잘려있고 상단 모서리가 둥근 Windows 98 스타일 탭을 div 레이어를 쌓아서 구현했습니다.
 * bevel 효과를 위해 여러 개의 div 레이어를 절대 위치로 배치하여 3D 효과를 구현했습니다.
 *
 * 반응형 동작
 * - 화면이 줄어들면 탭 너비가 자동으로 축소됩니다 (`min-w-0 shrink`)
 * - 긴 텍스트는 ellipsis(`...`)로 표시됩니다 (`text-ellipsis`)
 * - 텍스트는 줄바꿈되지 않습니다 (`whitespace-nowrap`)
 *
 * selected 상태:
 * - 하단에 surface 색의 3px 높이 줄이 추가되어 윈도우와 연결됩니다
 * - 좌우 하이라이트와 그림자가 3px 아래로 확장됩니다
 *
 * @component
 * @param {React.ReactNode} children - 탭에 표시할 내용 (텍스트, 아이콘 등)
 * @param {boolean} [selected=false] - 탭의 선택 상태. true일 때 하단에 surface 색 줄이 추가되고, 좌우 하이라이트/그림자가 3px 아래로 확장되어 윈도우와 연결됩니다.
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
 * // selected 탭
 * <RoundedTab selected>Selected Tab</RoundedTab>
 *
 * // 클릭 이벤트
 * <RoundedTab onClick={() => console.log("Tab clicked")}>
 *   Clickable Tab
 * </RoundedTab>
 *
 * // 여러 탭 그룹 (selected 탭과 함께)
 * <div className="flex items-end gap-0">
 *   <RoundedTab selected>Tab 1</RoundedTab>
 *   <RoundedTab>Tab 2</RoundedTab>
 *   <RoundedTab>Tab 3</RoundedTab>
 * </div>
 *
 * // 탭과 컨텐츠 영역 함께 사용
 * <div>
 *   <div className="flex items-end gap-0">
 *     <RoundedTab selected>Tab 1</RoundedTab>
 *     <RoundedTab>Tab 2</RoundedTab>
 *   </div>
 *   <div className="bevel-default bg-surface p-4">
 *     컨텐츠 영역입니다.
 *   </div>
 * </div>
 *
 * // 긴 텍스트 탭 (자동으로 ellipsis 처리됨)
 * <div className="flex items-end gap-0">
 *   <RoundedTab>Short</RoundedTab>
 *   <RoundedTab>Medium Tab</RoundedTab>
 *   <RoundedTab>Super duper longer tab name that will be truncated</RoundedTab>
 * </div>
 * ```
 */
export default function RoundedTab({ children, onClick, className, isActive, ...rest }: TabProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "relative inline-flex cursor-pointer items-center justify-center",
        "min-w-0 shrink px-0 py-1 text-xs select-none",
        className
      )}
      {...rest}
    >
      {/* 레이어 컨테이너 - 모든 레이어를 묶는 기준 컨테이너 */}
      <div className="absolute top-px right-px bottom-0 left-px">
        {/* 상단 하이라이트 - 내부 */}
        <div className="bg-bevel-light-inner absolute top-0 right-px left-px h-px" />
        {/* 상단 하이라이트 - 외부 */}
        <div className="bg-bevel-light-outer absolute -top-px right-0.5 left-0.5 h-px" />
        {/* 좌측 하이라이트 - 내부 */}
        <div
          className={twMerge(
            "bg-bevel-light-inner absolute top-0.5 left-0 w-px",
            isActive ? "-bottom-0.75" : "bottom-0"
          )}
        />
        {/* 좌측 하이라이트 - 외부 */}
        <div
          className={twMerge(
            "bg-bevel-light-outer absolute top-0.5 -left-px w-px",
            isActive ? "-bottom-0.75" : "bottom-0"
          )}
        />
        {/* 우측 그림자 - 내부 */}
        <div
          className={twMerge(
            "bg-bevel-shadow-inner absolute top-0.5 right-0 w-px",
            isActive ? "-bottom-0.75" : "bottom-0"
          )}
        />
        {/* 우측 그림자 - 외부 */}
        <div
          className={twMerge(
            "bg-bevel-shadow-outer absolute top-0.5 -right-px w-px",
            isActive ? "-bottom-0.75" : "bottom-0"
          )}
        />
        {/* 배경 - 메인 바디 */}
        <div className="bg-surface absolute top-px right-px bottom-0 left-px z-0" />
      </div>
      {/* isActive일 때 하단 surface 색 줄 - 윈도우와 배경을 잇기 위한 줄 */}
      {isActive && (
        <div className="bg-surface absolute right-0.5 -bottom-0.75 left-0.5 z-10 h-0.75" />
      )}
      <span className="relative min-w-0 overflow-hidden px-2 text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
