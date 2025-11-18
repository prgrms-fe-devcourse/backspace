import { ChevronLeft, Heart } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

interface GalleryDetailPanelProps {
  imageId: number;
  onBack: () => void;
}

const MOCK_COMMENTS = [
  {
    id: 1,
    nickname: "일촌친구1",
    timeAgo: "1시간 전",
    caption: "사진 너무 이쁘다!",
    avatarUrl: "https://picsum.photos/seed/friend1/80",
  },
  {
    id: 2,
    nickname: "일촌친구2",
    timeAgo: "2시간 전",
    caption: "여기 어디예요? 나도 가고싶다 ㅠㅠ",
    avatarUrl: "https://picsum.photos/seed/friend2/80",
  },
  {
    id: 3,
    nickname: "일촌친구3",
    timeAgo: "3시간 전",
    caption: "날씨 좋은 날들이 최고지~",
    avatarUrl: "https://picsum.photos/seed/friend3/80",
  },
  {
    id: 4,
    nickname: "도토리",
    timeAgo: "4시간 전",
    caption: "다들 고마워요! 다음에 같이 가요 ㅎㅎ",
    avatarUrl: "https://picsum.photos/seed/dotori/80",
  },
];

const MOCK_DESCRIPTIONS = [
  "친구들이랑 제주도 다녀왔어요~",
  "전시회에서 찍은 감성 사진이에요.",
  "퇴근길 하늘이 예뻐서 한 컷!",
  "주말마다 산책하는 우리 동네 산책로.",
];

const ImagePlaceholder = () => (
  <div className="bg-surface flex h-full w-full items-center justify-center">
    <svg className="text-muted h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11l3 3 5-5 3 3" />
    </svg>
  </div>
);

export default function GalleryDetailPanel({ imageId, onBack }: GalleryDetailPanelProps) {
  const [photoLiked, setPhotoLiked] = useState(false);
  const description =
    MOCK_DESCRIPTIONS[(imageId - 1) % MOCK_DESCRIPTIONS.length] ?? "설명이 없습니다.";

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
          <section className="flex w-full flex-col items-center gap-4 p-4">
            <div className="w-full overflow-hidden">
              <div className="aspect-square h-full w-full overflow-hidden">
                <ImagePlaceholder />
              </div>
            </div>

            <div className="border-primary/30 mt-3 w-full border-t pt-3 text-left">
              <p>{description}</p>
              <span className="text-muted">2024.11.10 14:30</span>
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
              <p>댓글 4개</p>
              {MOCK_COMMENTS.map((comment) => (
                <div key={comment.id} className="bevel-default bg-text-invert p-3">
                  <div className="flex items-start gap-3">
                    <div className="bevel-default bg-surface text-primary flex h-10 w-10 items-center justify-center overflow-hidden">
                      {comment.avatarUrl ? (
                        <img src={comment.avatarUrl} alt={`${comment.nickname} avatar`} />
                      ) : (
                        comment.nickname.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-muted mb-1 flex items-center justify-between">
                        <span className="text-primary font-semibold">{comment.nickname}</span>
                        <span>{comment.timeAgo}</span>
                      </div>
                      <p>{comment.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
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
