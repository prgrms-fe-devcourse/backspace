import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { User } from "lucide-react";

import type { CommentWithProfile } from "@/types/post.types";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface CommentItemProps {
  comment: CommentWithProfile;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const authorName = comment.profiles?.nickname || "익명";
  const avatarUrl = comment.profiles?.avatar_url;

  return (
    <div className="flex gap-2 border-b border-gray-100 p-2 last:border-none">
      <div className="h-7 w-7 shrink-0 overflow-hidden bg-gray-200">
        {avatarUrl ? (
          <img src={avatarUrl} alt={authorName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            <User size={16} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs">{authorName}</span>
          <span className="text-[10px] opacity-60">{dayjs(comment.created_at).fromNow()}</span>
        </div>
        <p className="text-xs whitespace-pre-wrap">{String(comment.content)}</p>
      </div>
    </div>
  );
}
