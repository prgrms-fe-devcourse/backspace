import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import {
  getGalleryImagesByHomepage,
  getHomepageIdByOwner,
  uploadGalleryImage,
} from "./api/gallery";
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
  const [listError, setListError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [homepageId, setHomepageId] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.user?.id);
  const canManageGallery = ownerId !== undefined && ownerId === userId;
  const [reloadVersion, setReloadVersion] = useState(0);

  const selectedImage = selectedImageId
    ? (images.find((image) => image.id === selectedImageId) ?? null)
    : null;

  // ownerId나 의존한 값이 변할 때마다 목록을 조회
  useEffect(() => {
    if (!ownerId) {
      setImages([]);
      setListError(null);
      setUploadError(null);
      setHomepageId(null);
      return;
    }

    // ownerId를 받아 해당 홈피의 갤러리 목록을 불러오는 공통 함수
    const loadGallery = async () => {
      setIsLoading(true);
      setListError(null);

      // 홈피 ID 조회
      const { data: homepage, error: homepageError } = await getHomepageIdByOwner(ownerId);

      if (homepageError) {
        setImages([]);
        setHomepageId(null);
        setListError(homepageError.message ?? "홈페이지 정보를 불러오지 못했습니다.");
        setUploadError(null);
        setIsLoading(false);
        return;
      }

      if (!homepage) {
        setImages([]);
        setHomepageId(null);
        setListError(null);
        setUploadError(null);
        setIsLoading(false);
        return;
      }

      // 실제 갤러리 이미지 목록 조회
      const { data, error: galleryError } = await getGalleryImagesByHomepage(homepage.id);

      if (galleryError) {
        setImages([]);
        setHomepageId(homepage.id);
        setListError(galleryError.message ?? "갤러리를 불러오지 못했습니다.");
        setUploadError(null);
        setIsLoading(false);
        return;
      }

      setHomepageId(homepage.id);
      setImages(data ?? []);
      setListError(null);
      setUploadError(null);
      setIsLoading(false);
    };

    loadGallery();
  }, [ownerId, reloadVersion]);

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
    setUploadError(null);
  };

  const handleUploadComplete = async (file?: File, description?: string) => {
    if (!file) {
      throw new Error("업로드할 파일을 선택해 주세요.");
    }
    if (!homepageId) {
      throw new Error("홈페이지 정보를 찾을 수 없습니다.");
    }
    if (!userId) {
      throw new Error("로그인이 필요합니다.");
    }

    const { error } = await uploadGalleryImage({
      file,
      caption: description,
      homepageId,
      authorId: userId,
    });

    if (error) {
      const message = error.message ?? "이미지를 업로드하지 못했습니다.";
      setUploadError(message);
      throw new Error(message);
    }

    setUploadError(null);
    setView("list");
    setReloadVersion((prev) => prev + 1);
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
            error: listError,
            isEmpty: images.length === 0,
          }}
        />
      );
    }

    if (view === "detail" && selectedImage) {
      return <GalleryDetailPanel image={selectedImage} onBack={handleBackToList} />;
    }

    if (view === "upload" && canManageGallery) {
      return (
        <GalleryUploadPanel
          onCancel={handleBackToList}
          onUpload={handleUploadComplete}
          errorMessage={uploadError}
        />
      );
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
