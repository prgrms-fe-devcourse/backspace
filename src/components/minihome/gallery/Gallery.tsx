import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import { useAuthStore } from "@/stores/useAuthStore";

import { getGalleryImagesByHomepage, getHomepageIdByOwner } from "./api/gallery";
import GalleryDetailPanel from "./GalleryDetailPanel";
import GalleryUploadPanel from "./GalleryUploadPanel";
import type { GalleryImage } from "./types/gallery.types";

interface GalleryProps {
  ownerId?: string;
}

type GalleryView = "list" | "detail" | "upload";

export default function Gallery({ ownerId }: GalleryProps) {
  const [view, setView] = useState<GalleryView>("list");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.user?.id);
  const canManageGallery = ownerId !== undefined && ownerId === userId;

  const selectedImage = selectedImageId
    ? (images.find((image) => image.id === selectedImageId) ?? null)
    : null;

  useEffect(() => {
    if (!ownerId) {
      setImages([]);
      setError(null);
      return;
    }

    let isMounted = true;

    const fetchGalleryImages = async () => {
      setIsLoading(true);
      setError(null);

      const stopLoading = () => {
        if (isMounted) {
          setIsLoading(false);
        }
      };

      const failWithMessage = (message: string) => {
        if (isMounted) {
          setImages([]);
          setError(message);
        }
        stopLoading();
      };

      const { data: homepage, error: homepageError } = await getHomepageIdByOwner(ownerId);

      if (homepageError) {
        failWithMessage(homepageError.message ?? "홈페이지 정보를 불러오지 못했습니다.");
        return;
      }

      if (!homepage) {
        if (isMounted) {
          setImages([]);
        }
        stopLoading();
        return;
      }

      const { data, error: galleryError } = await getGalleryImagesByHomepage(homepage.id);

      if (galleryError) {
        failWithMessage(galleryError.message ?? "갤러리를 불러오지 못했습니다.");
        return;
      }

      if (isMounted) {
        setImages(data ?? []);
      }

      stopLoading();
    };

    fetchGalleryImages();

    return () => {
      isMounted = false;
    };
  }, [ownerId]);

  useEffect(() => {
    setView("list");
    setSelectedImageId(null);
  }, [ownerId]);

  const handleSelectImage = (imageId: string) => {
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

  const renderGrid = () => (
    <div className="mt-2 grid grid-cols-4 gap-1">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          className="bevel-default aspect-square w-full cursor-pointer overflow-hidden p-1 transition hover:opacity-90"
          onClick={() => handleSelectImage(image.id)}
        >
          <div className="h-full w-full">
            <img
              src={image.image_url ?? ""}
              alt={image.caption ?? "갤러리 이미지"}
              className="h-full w-full object-cover"
            />
          </div>
        </button>
      ))}
    </div>
  );

  const renderStatusText = (text: string, textClassName = "text-muted") => (
    <p className={`${textClassName} mt-8 text-center text-sm`}>{text}</p>
  );

  const renderListBody = () => {
    if (!ownerId) {
      return renderStatusText("홈페이지 정보를 찾을 수 없습니다.");
    }
    if (isLoading) {
      return renderStatusText("사진을 불러오는 중입니다...");
    }
    if (error) {
      return renderStatusText(error, "text-red-500");
    }
    if (images.length === 0) {
      return renderStatusText("등록된 사진이 없습니다.");
    }

    return renderGrid();
  };

  const renderListView = () => (
    <div className="bevel-pressed h-full w-full overflow-hidden p-1">
      <div className="scrollbar bg-text-invert h-full w-full overflow-y-auto px-4 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <h1>사진첩</h1>
          {canManageGallery && (
            <Button composition="textOnly" onClick={handleRequestUpload}>
              업로드
            </Button>
          )}
        </div>

        {renderListBody()}
      </div>
    </div>
  );

  const renderContent = () => {
    if (view === "detail" && selectedImage) {
      return <GalleryDetailPanel image={selectedImage} onBack={handleBackToList} />;
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
