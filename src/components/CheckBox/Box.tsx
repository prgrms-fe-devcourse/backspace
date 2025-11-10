import { twMerge } from "tailwind-merge";

import { checkBox, type CheckBoxVariantProps } from "./variants/boxVariants";

interface BoxProps extends React.ComponentPropsWithoutRef<"div">, CheckBoxVariantProps {
  isChecked?: boolean;
}

export default function Box({
  isChecked = false,
  isDisabled = false,
  className,
  ...rest
}: BoxProps) {
  return (
    <div className={twMerge(checkBox({ isDisabled }), className)} {...rest}>
      {isChecked && (
        <svg
          width="10.81"
          height="10.81"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_247_86)">
            <path d="M0 2.8833H1.54464V7.92912H0V2.8833Z" fill="#2D2640" />
            <path d="M1.54468 4.3252H3.08932V9.37103H1.54468V4.3252Z" fill="#2D2640" />
            <path d="M3.08923 5.7666H4.63388V10.8124H3.08923V5.7666Z" fill="#2D2640" />
            <path d="M4.63391 4.3252H6.17855V9.37103H4.63391V4.3252Z" fill="#2D2640" />
            <path d="M6.17859 2.8833H7.72323V7.92912H6.17859V2.8833Z" fill="#2D2640" />
            <path d="M7.72327 1.44189H9.26791V6.48773H7.72327V1.44189Z" fill="#2D2640" />
            <path d="M9.26782 0H10.8125V5.04584H9.26782V0Z" fill="#2D2640" />
          </g>
          <defs>
            <clipPath id="clip0_247_86">
              <rect width="10.8125" height="10.8125" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
}
