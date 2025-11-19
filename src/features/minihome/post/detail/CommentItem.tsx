import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Trash } from "lucide-react";

import Avatar from "@/components/Avatar/Avatar";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { CommentWithProfile } from "@/types/post.types";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface CommentItemProps {
  comment: CommentWithProfile;
  onDelete: () => Promise<void>;
  isMyHome: boolean;
}

export default function CommentItem({ comment, onDelete, isMyHome }: CommentItemProps) {
  const authorName = comment.profiles?.nickname || "익명";
  const avatarUrl = comment.profiles?.avatar_url;

  const { id } = useAuthUser();

  return (
    <div className="flex gap-2 border-b border-gray-100 p-2 last:border-none">
      <Avatar src={avatarUrl} className="h-7 w-7 shrink-0" />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs">{authorName}</span>
            <span className="text-[10px] opacity-60">{dayjs(comment.created_at).fromNow()}</span>
          </div>
          {(isMyHome || comment.author_id === id) && (
            <Trash
              width={18}
              className="cursor-pointer opacity-60 hover:opacity-100"
              onClick={onDelete}
            />
          )}
        </div>
        <p className="text-xs whitespace-pre-wrap">{String(comment.content)}</p>
      </div>
    </div>
  );
}
