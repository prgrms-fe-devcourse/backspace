import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import {
  deleteGalleryImage,
  getGalleryImagesByHomepage,
  getHomepageIdByOwner,
  updateGalleryImage,
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
  // ---------------------------------------------------------------------------
  // 상태 & 파생 값
  // ---------------------------------------------------------------------------
  const [view, setView] = useState<GalleryView>("list");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [homepageId, setHomepageId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const userId = useAuthStore((state) => state.user?.id);
  const canManageGallery = ownerId !== undefined && ownerId === userId;
  const [reloadVersion, setReloadVersion] = useState(0);

  const selectedImage = selectedImageId
    ? (images.find((image) => image.id === selectedImageId) ?? null)
    : null;

  // ---------------------------------------------------------------------------
  // 데이터 로딩 관련 이펙트
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!ownerId) {
      setImages([]);
      setListError(null);
      setHomepageId(null);
      return;
    }

    const loadGallery = async () => {
      setIsLoading(true);
      setListError(null);

      const { data: homepage, error: homepageError } = await getHomepageIdByOwner(ownerId);

      if (homepageError) {
        setImages([]);
        setHomepageId(null);
        setListError(homepageError.message ?? "홈페이지 정보를 불러오지 못했습니다.");
        setIsLoading(false);
        return;
      }

      if (!homepage) {
        setImages([]);
        setHomepageId(null);
        setListError(null);
        setIsLoading(false);
        return;
      }

      const { data, error: galleryError } = await getGalleryImagesByHomepage(homepage.id);

      if (galleryError) {
        setImages([]);
        setHomepageId(homepage.id);
        setListError(galleryError.message ?? "갤러리를 불러오지 못했습니다.");
        setIsLoading(false);
        return;
      }

      setHomepageId(homepage.id);
      setImages(data ?? []);
      setListError(null);
      setIsLoading(false);
    };

    loadGallery();
  }, [ownerId, reloadVersion]);

  useEffect(() => {
    setView("list");
    setSelectedImageId(null);
    setEditingImage(null);
  }, [ownerId]);

  useEffect(() => {
    if (view === "detail" && !selectedImage) {
      setView("list");
      setSelectedImageId(null);
    }
  }, [view, selectedImage]);

  // ---------------------------------------------------------------------------
  // 이벤트 핸들러: 뷰 전환
  // ---------------------------------------------------------------------------
  const handleSelectImage = (imageId: string) => {
    setSelectedImageId(imageId);
    setView("detail");
  };

  const handleRequestUpload = () => {
    if (!canManageGallery) return;
    setEditingImage(null);
    setView("upload");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedImageId(null);
  };

  const handleCancelUpload = () => {
    if (editingImage) {
      setView("detail");
      setEditingImage(null);
      return;
    }
    handleBackToList();
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setView("upload");
  };

  // ---------------------------------------------------------------------------
  // 이벤트 핸들러: 데이터 조작 (삭제/업로드/수정)
  // ---------------------------------------------------------------------------
  const handleDeleteImage = async (imageId: string, imageUrl?: string | null) => {
    const error = await deleteGalleryImage(imageId, imageUrl);
    if (error) {
      setListError(error.message ?? "사진을 삭제하지 못했습니다.");
      return;
    }
    setView("list");
    setSelectedImageId(null);
    setReloadVersion((prev) => prev + 1);
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
      throw new Error(message);
    }

    setView("list");
    setReloadVersion((prev) => prev + 1);
  };

  const handleUpdateImage = async (file?: File, description?: string) => {
    if (!editingImage || !homepageId) {
      setListError("수정할 사진 정보를 찾을 수 없습니다.");
      return;
    }

    const { error } = await updateGalleryImage({
      imageId: editingImage.id,
      homepageId,
      caption: description,
      file,
      previousImageUrl: editingImage.image_url,
    });

    if (error) {
      setListError(error.message ?? "사진을 수정하지 못했습니다.");
      return;
    }

    setEditingImage(null);
    setSelectedImageId(editingImage.id);
    setView("detail");
    setReloadVersion((prev) => prev + 1);
  };

  // ---------------------------------------------------------------------------
  // 렌더링 보조
  // ---------------------------------------------------------------------------
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
      return (
        <GalleryDetailPanel
          image={selectedImage}
          onBack={handleBackToList}
          isMine={canManageGallery}
          onDelete={handleDeleteImage}
          onEdit={handleEditImage}
        />
      );
    }

    if (view === "upload" && canManageGallery) {
      const isEditing = Boolean(editingImage);
      return (
        <GalleryUploadPanel
          onCancel={handleCancelUpload}
          onUpload={isEditing ? handleUpdateImage : handleUploadComplete}
          initialDescription={editingImage?.caption ?? ""}
          initialPreviewUrl={editingImage?.image_url ?? null}
          submitLabel={isEditing ? "수정" : "업로드"}
          allowEmptyFile={isEditing}
        />
      );
    }

    // 3가지 뷰 상태 모두 해당되지 않는다면 null 반환
    return null;
  };

  // ---------------------------------------------------------------------------
  // 렌더링
  // ---------------------------------------------------------------------------
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-7">
      <div className="h-full w-full">{renderContent()}</div>
    </div>
  );
}
