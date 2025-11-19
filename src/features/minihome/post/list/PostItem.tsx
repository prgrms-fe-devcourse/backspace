import dayjs from "dayjs";
import { Heart, MessageSquare } from "lucide-react";

import type { PostWithCounts } from "@/types/post.types";

interface PostItemProps {
  post: PostWithCounts;
  authorName: string;
  onPostClick: (postId: string) => void;
}

export default function PostItem({ post, authorName, onPostClick }: PostItemProps) {
  const contentSnippet = String(post.content || "");

  const likeCount = post.homepage_post_likes[0]?.count || 0;
  const commentCount = post.homepage_post_comments[0]?.count || 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPostClick(post.id);
    }
  };

  return (
    <div
      onClick={() => onPostClick(post.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bevel-default flex h-21 w-full cursor-pointer flex-col justify-between p-2.5"
    >
      <div className="flex items-center justify-between">
        <h3>{post.title}</h3>
        <span className="text-[10px] opacity-60">{authorName}</span>
      </div>
      <p className="truncate opacity-70">{contentSnippet}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] opacity-70">
          {dayjs(post.created_at).format("YYYY.MM.DD")}
        </span>

        <div className="flex h-4 gap-2.5">
          <span className="text-accent flex items-center gap-1">
            <Heart width={10} /> {likeCount}
          </span>
          <span className="text-secondary flex items-center gap-1">
            <MessageSquare width={10} /> {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
