import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { getGalleryImagesByHomepage, getHomepageIdByOwner } from "./api/gallery";
import GalleryDetailPanel from "./GalleryDetailPanel";
import GalleryList from "./GalleryList";
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

  // 갤러리 데이터를 ownerId 변경마다 다시 가져온다.
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

      // 중간 단계에서 실패했을 때 공통으로 실행되는 처리
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

  // 다른 ownerId로 이동하거나 탭을 다시 열었을 때 상세/업로드 상태 초기화
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

  const renderContent = () => {
    if (view === "list") {
      return (
        <GalleryList
          images={images}
          isMine={canManageGallery}
          onRequestUpload={handleRequestUpload}
          onSelectImage={handleSelectImage}
          showStatus={{
            ownerMissing: !ownerId,
            isLoading,
            error,
            isEmpty: images.length === 0,
          }}
        />
      );
    }

    if (view === "detail" && selectedImage) {
      return <GalleryDetailPanel image={selectedImage} onBack={handleBackToList} />;
    }

    if (view === "upload" && canManageGallery) {
      return <GalleryUploadPanel onCancel={handleBackToList} />;
    }

    // 3가지 뷰 상태 모두 해당되지 않는다면 null 반환
    return null;
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-7">
      <div className="h-full w-full">{renderContent()}</div>
    </div>
  );
}
