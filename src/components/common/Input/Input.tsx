import { CircleAlert } from "lucide-react";
import { useId, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id?: string | undefined;
  error?: string | undefined;
}

/**
 * 기본 Input 컴포넌트
 *
 * @component
 *
 *  @param {string} [id]
 *   - input의 id 속성입니다.
 *   - 외부 `<label htmlFor>`과 연결할 때 사용합니다.
 *
 * @param {string} [error]
 *   - 에러 메시지 문자열입니다. 값이 있으면 input에 에러 스타일이 적용되고 하단에 에러 메시지가 표시됩니다.
 *   - 에러가 있을 때 자동으로 `aria-invalid`와 `aria-errormessage` 속성이 설정됩니다.
 *
 * @param {string} [className]
 *   - input 요소에 추가할 Tailwind 클래스입니다.
 *     기본 스타일과 병합되며, 충돌 시 전달된 className이 우선됩니다.
 *
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props
 *   - input 요소의 기본 HTML 속성들입니다 (placeholder, disabled, onChange 등).
 *
 * @returns {JSX.Element} Input 엘리먼트와 에러 메시지를 포함하는 컨테이너
 *
 * @example
 * ```tsx
 * <Input
 *   placeholder="Enter your name"
 *   error="Name is required"
 * />
 * ```
 */
export default function Input({ id, error, className, ...props }: InputProps) {
  const errorId = useId();

  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="relative">
        <input
          id={id}
          className={twMerge(
            "bevel-pressed w-full px-2 py-1.5",
            "border-2 border-transparent outline-none",
            "focus:border-primary/80 disabled:disabled-base",
            error && "error-tint pr-8",
            className
          )}
          {...props}
          {...(error && { "aria-invalid": true, "aria-errormessage": errorId })}
        />
        {error && (
          <CircleAlert
            aria-hidden="true"
            size={16}
            className="text-error pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
          />
        )}
      </div>
      {error && (
        <span id={errorId} className="text-error px-1 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}
