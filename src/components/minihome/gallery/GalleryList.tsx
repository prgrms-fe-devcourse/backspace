import Button from "@/components/common/Button/Button";

import type { GalleryImage } from "./types/gallery.types";

interface GalleryListProps {
  images: GalleryImage[];
  isMine: boolean;
  onRequestUpload: () => void;
  onSelectImage: (imageId: string) => void;
  showStatus: {
    ownerMissing: boolean;
    isLoading: boolean;
    error: string | null;
    isEmpty: boolean;
  };
}

// 갤러리 메인 리스트 (그리드 + 상태 메시지 + 업로드 버튼)
export default function GalleryList({
  images,
  isMine,
  onRequestUpload,
  onSelectImage,
  showStatus,
}: GalleryListProps) {
  const hasImages = images.length > 0;

  // ownerId/로딩/에러/빈 상태에 맞는 안내 문구
  const renderStatus = () => {
    if (showStatus.ownerMissing) {
      return (
        <p className="text-muted mt-8 text-center text-sm">홈페이지 정보를 찾을 수 없습니다.</p>
      );
    }

    if (showStatus.error) {
      return <p className="mt-8 text-center text-sm text-red-500">{showStatus.error}</p>;
    }
    if (showStatus.isEmpty) {
      return <p className="text-muted mt-8 text-center text-sm">등록된 사진이 없습니다.</p>;
    }
    return null;
  };

  const statusContent = renderStatus();

  return (
    // 베벨 테두리 래퍼
    <div className="bevel-pressed h-full w-full overflow-hidden p-1">
      {/* 내부 컨텐츠 */}
      <div className="scrollbar bg-text-invert h-full w-full overflow-y-auto px-4 pt-4 pb-4">
        {/* 헤더 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1>사진첩</h1>
          <div className="flex flex-col items-end gap-1">
            {isMine && (
              <Button composition="textOnly" onClick={onRequestUpload}>
                업로드
              </Button>
            )}
            {statusContent && (
              <div className="[&>p]:mt-0 [&>p]:text-right [&>p]:text-xs">{statusContent}</div>
            )}
          </div>
        </div>

        {hasImages ? (
          /* 이미지 그리드 영역 */
          <div className="mt-2 grid grid-cols-4 gap-1">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                className="bevel-default aspect-square w-full cursor-pointer overflow-hidden p-1 transition hover:opacity-90"
                onClick={() => onSelectImage(image.id)}
              >
                <div className="h-full w-full">
                  {image.image_url ? (
                    <img
                      src={image.image_url}
                      alt={image.caption ?? "갤러리 이미지"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-muted flex h-full w-full items-center justify-center text-xs">
                      이미지 호출 실패
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
