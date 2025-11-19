import dayjs from "dayjs";
import { X } from "lucide-react";

import Button from "@/components/Button/Button";

import type { GuestbookCommentWithAuthor } from "../types/guestbook.types";

interface CommentProps extends GuestbookCommentWithAuthor {
  canDelete?: boolean;
  onDelete?: () => void;
}

export default function Comment({
  commenter,
  created_at,
  content,
  canDelete,
  onDelete,
}: CommentProps) {
  return (
    <div className="border-primary border-l-3 pl-3">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-accent">{commenter?.nickname}</span>
          <div className="flex gap-2">
            <span className="opacity-50">{dayjs(created_at).format("YYYY.MM.DD HH:mm")}</span>
            {canDelete && (
              <Button onClick={onDelete} composition="iconOnly" aria-label="답글 삭제">
                <X className="size-3" strokeWidth={3} />
              </Button>
            )}
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
