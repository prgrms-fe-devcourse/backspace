import { useId, useRef } from "react";

import Button from "@/components/common/Button/Button";

const ImagePlaceholder = () => (
  <div className="flex h-full w-full items-center justify-center">
    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="Mdi4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

interface GalleryUploadFileSelectorProps {
  fileName: string | null;
  fileSize: string | null;
  previewUrl: string | null;
  onFileChange: (file: File | undefined) => void;
}

export default function GalleryUploadFileSelector({
  fileName,
  fileSize,
  previewUrl,
  onFileChange,
}: GalleryUploadFileSelectorProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* 이미지 프리뷰 카드 */}
      <div className="bevel-pressed bg-text-invert text-muted flex flex-col items-center justify-center gap-2 p-4">
        <div className="bevel-default flex h-24 w-24 items-center justify-center overflow-hidden p-1">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={fileName ?? "업로드 미리보기"}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
        <div className="text-center">
          <p>{fileName ?? "선택된 파일이 없습니다."}</p>
          <p>{fileSize ?? "최대 50MB 업로드 가능"}</p>
        </div>
      </div>

      {/* 파일 선택 버튼 */}
      <div className="flex w-full">
        <Button composition="textOnly" className="w-full" onClick={handleButtonClick}>
          파일 선택
        </Button>
      </div>

      {/* 실제 파일 입력 */}
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
