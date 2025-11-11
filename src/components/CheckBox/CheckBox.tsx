import { useState } from "react";

import CheckBoxWrapper from "./CheckBoxWrapper";

interface CheckBoxProps {
  label?: string;
  disabled?: boolean;
  checked?: boolean; // controlled
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * 공통 체크박스 컴포넌트
 *
 * 제어(Controlled) / 비제어(Uncontrolled) 방식을 모두 지원하며,
 * 라벨·비활성화 상태·상위 전달 이벤트 등을 조합하여 사용할 수 있습니다.
 *
 * @component
 * @param {string} [label] - 체크박스 우측에 표시되는 라벨 텍스트
 * @param {boolean} [disabled=false] - 체크박스 비활성화 여부
 * @param {boolean} [checked] - 제어(Controlled) 모드에서 사용하는 체크 상태
 * @param {(checked: boolean) => void} [onCheckedChange] - 체크 상태 변경 콜백
 * @param {string} [className] - 추가 Tailwind 클래스
 * @returns {JSX.Element} 체크박스 엘리먼트
 *
 * @example
 * ```tsx
 * // Uncontrolled (내부 상태로 관리됨)
 * <CheckBox label="동의합니다" />
 *
 * // Controlled (상위에서 상태를 제어)
 * const [checked, setChecked] = useState(false);
 * <CheckBox
 *   label="약관 동의"
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * ```
 */

export default function CheckBox({
  label,
  disabled = false,
  checked,
  onCheckedChange,
  className,
}: CheckBoxProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = checked !== undefined;

  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = (isChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(isChecked);
    }

    onCheckedChange?.(isChecked);
  };

  return (
    <CheckBoxWrapper
      label={label}
      disabled={disabled}
      checked={currentChecked}
      onCheckedChange={handleToggle}
      className={className}
    />
  );
}
