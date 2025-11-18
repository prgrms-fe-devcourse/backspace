import dayjs from "dayjs";
import { ChevronLeft, Heart, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useAuthStore } from "@/stores/useAuthStore";

import {
  addGalleryImageComment,
  deleteGalleryImageComment,
  getGalleryImageComments,
  getGalleryImageLikeSummary,
  likeGalleryImage,
  unlikeGalleryImage,
} from "./api/gallery";
import type { GalleryComment, GalleryImage } from "./types/gallery.types";

interface GalleryDetailPanelProps {
  image: GalleryImage;
  onBack: () => void;
  isMine?: boolean;
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

export default function GalleryDetailPanel({
  image,
  onBack,
  isMine = false,
}: GalleryDetailPanelProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);
  const [isUpdatingLike, setIsUpdatingLike] = useState(false);
  const [comments, setComments] = useState<GalleryComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    let isMounted = true;

    const loadLikes = async () => {
      const { count, liked, error } = await getGalleryImageLikeSummary(
        image.id,
        userId ?? undefined
      );

      if (!isMounted) {
        return;
      }

      if (error) {
        setLikeError(error.message ?? "좋아요 정보를 불러오지 못했습니다.");
        setLikeCount(0);
        setIsLiked(false);
      } else {
        setLikeError(null);
        setLikeCount(count);
        setIsLiked(liked);
      }
    };

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

    loadLikes();
    loadComments();

    return () => {
      isMounted = false;
    };
  }, [image.id, userId]);

  const handleSubmitComment = async () => {
    const trimmed = newComment.trim();
    if (!userId) {
      setSubmitError("로그인이 필요합니다.");
      return;
    }
    // 아무것도 안 적혀있으면 댓글 안 남김
    if (!trimmed) {
      return;
    }

    setIsSubmittingComment(true);
    setSubmitError(null);

    const { data, error } = await addGalleryImageComment({
      imageId: image.id,
      authorId: userId,
      content: trimmed,
    });

    setIsSubmittingComment(false);

    if (error) {
      setSubmitError(error.message ?? "댓글을 등록하지 못했습니다.");
      return;
    }

    if (data) {
      setComments((prev) => [...prev, data]);
      setNewComment("");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isMine) {
      return;
    }
    const error = await deleteGalleryImageComment(commentId);
    if (error) {
      setSubmitError(error.message ?? "댓글을 삭제하지 못했습니다.");
      return;
    }
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const handleToggleLike = async () => {
    if (!userId) {
      setLikeError("로그인이 필요합니다.");
      return;
    }
    if (isUpdatingLike) {
      return;
    }

    setIsUpdatingLike(true);
    setLikeError(null);

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
      const error = await unlikeGalleryImage(image.id, userId);
      if (error) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        setLikeError(error.message ?? "좋아요 취소에 실패했습니다.");
      }
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      const error = await likeGalleryImage(image.id, userId);
      if (error) {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
        setLikeError(error.message ?? "좋아요에 실패했습니다.");
      }
    }

    setIsUpdatingLike(false);
  };

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
                  <div className="text-muted flex h-full w-full items-center justify-center">
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
                onClick={handleToggleLike}
                className={twMerge("text-primary px-3", isLiked && "text-accent")}
              >
                <Heart
                  className={twMerge("h-3.5 w-3.5", isLiked && "text-accent fill-current")}
                  fill={isLiked ? "currentColor" : "none"}
                />
                좋아요 {likeCount}
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
              {isLoadingComments && <p className="text-muted">댓글을 불러오는 중입니다.</p>}
              {commentsError && !isLoadingComments && (
                <p className="text-red-500">{commentsError}</p>
              )}
              {!isLoadingComments && !commentsError && comments.length === 0 && (
                <p className="text-muted">첫 댓글을 남겨보세요.</p>
              )}
              {!isLoadingComments &&
                !commentsError &&
                comments.map((comment) => {
                  const nickname = comment.author?.nickname ?? "알 수 없음";
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
                            <span className="text-primary">{nickname}</span>
                            <div className="flex items-center gap-2">
                              <span>{dayjs(comment.created_at).format("YYYY.MM.DD HH:mm")}</span>
                              {isMine && (
                                <Button
                                  size="sm"
                                  composition="iconOnly"
                                  aria-label="댓글 삭제"
                                  onClick={() => handleDeleteComment(comment.id)}
                                >
                                  <X size={12} />
                                </Button>
                              )}
                            </div>
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
      <div className="mt-4 flex shrink-0 flex-col gap-2 px-[6px]">
        <div className="flex items-center gap-2">
          <Input
            placeholder={userId ? "댓글을 입력하세요..." : "로그인이 필요합니다."}
            aria-label="댓글 입력"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            disabled={isSubmittingComment || !userId}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <Button
            size="md"
            composition="iconText"
            onClick={handleSubmitComment}
            disabled={!userId || isSubmittingComment}
          >
            <Send size={12} />
            등록
          </Button>
        </div>
        {likeError && <p className="text-right text-red-500">{likeError}</p>}
        {submitError && <p className="text-right text-red-500">{submitError}</p>}
      </div>
    </div>
  );
}
