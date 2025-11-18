import dayjs from "dayjs";
import { ChevronLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { getGalleryImageComments } from "./api/gallery";
import type { GalleryComment, GalleryImage } from "./types/gallery.types";

interface GalleryDetailPanelProps {
  image: GalleryImage;
  onBack: () => void;
}

// JSON 타입의 댓글 내용을 문자열로 변환
const stringifyCommentContent = (value: unknown): string => {
  if (value === null || typeof value === "undefined") {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => stringifyCommentContent(item)).join(" ");
  }
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

export default function GalleryDetailPanel({ image, onBack }: GalleryDetailPanelProps) {
  const [photoLiked, setPhotoLiked] = useState(false);
  const [comments, setComments] = useState<GalleryComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadComments = async () => {
      if (!image.id) {
        setComments([]);
        setCommentsError(null);
        return;
      }
      setIsLoadingComments(true);
      setCommentsError(null);

      const { data, error } = await getGalleryImageComments(image.id);

      if (!isMounted) {
        return;
      }

      if (error) {
        setComments([]);
        setCommentsError(error.message ?? "댓글을 불러오지 못했습니다.");
      } else {
        setComments(data);
        setCommentsError(null);
      }
      setIsLoadingComments(false);
    };

    loadComments();

    return () => {
      isMounted = false;
    };
  }, [image.id]);

  const togglePhotoLike = () => setPhotoLiked((prev) => !prev);

  return (
    // 전체 컨테이너
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* 상단 고정 뒤로가기 버튼 */}
      <Button
        size="sm"
        composition="iconOnly"
        onClick={onBack}
        className="bg-base-2 absolute"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {/* 스크롤 가능한 본문 영역 */}
      <div className="flex-1 overflow-hidden">
        <div className="scrollbar flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
          {/* 이미지 표시 영역 */}
          <section className="flex w-full flex-col items-center gap-4">
            <div className="w-full overflow-hidden">
              <div className="aspect-square h-full w-full overflow-hidden">
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.caption ?? "갤러리 이미지"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-muted flex h-full w-full items-center justify-center text-sm">
                    이미지를 찾을 수 없습니다.
                  </div>
                )}
              </div>
            </div>

            <div className="border-primary/30 mt-3 w-full border-t pt-3 text-left">
              <p>{image.caption ?? "등록된 설명이 없습니다."}</p>
              <span className="text-muted">
                {dayjs(image.created_at).format("YYYY.MM.DD HH:mm")}
              </span>
            </div>

            <div className="border-primary/20 flex w-full flex-wrap items-center justify-between pt-3">
              <Button
                size="sm"
                composition="iconText"
                onClick={togglePhotoLike}
                className={twMerge("text-primary px-3", photoLiked && "text-accent")}
              >
                <Heart
                  className={twMerge("h-3.5 w-3.5", photoLiked && "text-accent fill-current")}
                  fill={photoLiked ? "currentColor" : "none"}
                />
                좋아요 4
              </Button>
              <div className="flex items-center gap-2">
                <Button size="sm" composition="textOnly" className="text-primary px-3">
                  수정
                </Button>
                <Button size="sm" composition="textOnly" className="text-primary px-3">
                  삭제
                </Button>
              </div>
            </div>
          </section>

          {/* 댓글 영역 */}
          <section className="bevel-pressed bg-text-invert flex w-full flex-col gap-4 p-4">
            <div className="space-y-4">
              <p>댓글 {comments.length}개</p>
              {isLoadingComments && (
                <p className="text-muted text-sm">댓글을 불러오는 중이에요...</p>
              )}
              {commentsError && !isLoadingComments && (
                <p className="text-sm text-red-500">{commentsError}</p>
              )}
              {!isLoadingComments && !commentsError && comments.length === 0 && (
                <p className="text-muted text-sm">첫 댓글을 남겨보세요.</p>
              )}
              {!isLoadingComments &&
                !commentsError &&
                comments.map((comment) => {
                  const nickname = comment.author?.nickname ?? "익명";
                  const avatar = comment.author?.avatar_url;
                  const fallbackInitial = nickname.charAt(0);
                  const body = stringifyCommentContent(comment.content);

                  return (
                    <div key={comment.id} className="bevel-default bg-text-invert p-3">
                      <div className="flex items-start gap-3">
                        <div className="bevel-default bg-surface text-primary flex h-10 w-10 items-center justify-center overflow-hidden">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={`${nickname} avatar`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            fallbackInitial
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-muted mb-1 flex items-center justify-between">
                            <span className="text-primary font-semibold">{nickname}</span>
                            <span>{dayjs(comment.created_at).format("YYYY.MM.DD HH:mm")}</span>
                          </div>
                          <p>{body || "내용이 없습니다."}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      </div>
      <div className="mt-4 flex shrink-0 items-center gap-2 px-4">
        <Input placeholder="댓글을 입력하세요..." aria-label="댓글 입력" />
        <Button composition="textOnly">등록</Button>
      </div>
    </div>
  );
}
