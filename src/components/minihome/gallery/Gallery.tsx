import { useMemo } from "react";

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

interface GalleryProps {
  onUpload: () => void;
}

export default function Gallery({ onUpload }: GalleryProps) {
  const images = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-7">
      <div className="bevel-pressed flex-1 overflow-hidden p-1">
        <div className="scrollbar bg-text-invert h-full w-full overflow-y-auto px-4 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">사진첩</h1>
            <Button composition="textOnly" onClick={onUpload}>
              업로드
            </Button>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-1">
            {images.map((image) => (
              <div key={image} className="bevel-default aspect-square w-full overflow-hidden p-1">
                <div className="h-full w-full">
                  <ImagePlaceholder />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
