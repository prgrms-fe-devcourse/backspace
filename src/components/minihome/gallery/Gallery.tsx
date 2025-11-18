import { useMemo, useState } from "react";

import Button from "@/components/common/Button/Button";
import { useAuthStore } from "@/stores/useAuthStore";

import GalleryDetailPanel from "./GalleryDetailPanel";
import GalleryUploadPanel from "./GalleryUploadPanel";

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
  ownerId?: string;
}

type GalleryView = "list" | "detail" | "upload";

export default function Gallery({ ownerId }: GalleryProps) {
  const [view, setView] = useState<GalleryView>("list");
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const userId = useAuthStore((state) => state.user?.id);
  const canManageGallery = ownerId !== undefined && ownerId === userId;

  const images = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);

  const handleSelectImage = (imageId: number) => {
    setSelectedImageId(imageId);
    setView("detail");
  };

  const handleRequestUpload = () => {
    if (!canManageGallery) return;
    setView("upload");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedImageId(null);
  };

  const renderListView = () => (
    // 베벨 테두리 래퍼
    <div className="bevel-pressed h-full w-full overflow-hidden p-1">
      {/* 내부 컨텐츠 */}
      <div className="scrollbar bg-text-invert h-full w-full overflow-y-auto px-4 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <h1>사진첩</h1>
          {canManageGallery && (
            <Button composition="textOnly" onClick={handleRequestUpload}>
              업로드
            </Button>
          )}
        </div>

        <div className="mt-2 grid grid-cols-4 gap-1">
          {images.map((image) => (
            <button
              key={image}
              type="button"
              className="bevel-default aspect-square w-full cursor-pointer overflow-hidden p-1 transition hover:opacity-90"
              onClick={() => handleSelectImage(image)}
            >
              <div className="h-full w-full">
                <ImagePlaceholder />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (view === "detail" && selectedImageId !== null) {
      return <GalleryDetailPanel imageId={selectedImageId} onBack={handleBackToList} />;
    }

    if (view === "upload" && canManageGallery) {
      return <GalleryUploadPanel onCancel={handleBackToList} />;
    }

    return renderListView();
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-7">
      <div className="h-full w-full">{renderContent()}</div>
    </div>
  );
}
