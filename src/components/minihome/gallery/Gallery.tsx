import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import supabase from "@/utils/supabase";

import GalleryDetailPanel from "./GalleryDetailPanel";
import GalleryUploadPanel from "./GalleryUploadPanel";
import type { GalleryImage } from "./types/gallery.types";

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

      try {
        const { data: homepage, error: homepageError } = await supabase
          .from("homepages")
          .select("id")
          .eq("owner_id", ownerId)
          .maybeSingle();

        if (homepageError) throw homepageError;
        if (!homepage) {
          if (isMounted) {
            setImages([]);
          }
          return;
        }

        const { data, error: galleryError } = await supabase
          .from("homepage_gallery_images")
          .select("id, caption, created_at, image_url, author_id, homepage_id, visibility")
          .eq("homepage_id", homepage.id)
          .order("created_at", { ascending: false });

        if (galleryError) throw galleryError;

        if (isMounted) {
          setImages(
            (data ?? []).map((image) => ({
              id: image.id,
              caption: image.caption,
              created_at: image.created_at,
              image_url: image.image_url,
              author_id: image.author_id,
              homepage_id: image.homepage_id,
              visibility: image.visibility,
            }))
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setImages([]);
          setError(
            fetchError instanceof Error ? fetchError.message : "갤러리를 불러오지 못했습니다."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
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
            {image.image_url ? (
              <img
                src={image.image_url}
                alt={image.caption ?? "갤러리 이미지"}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlaceholder />
            )}
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
