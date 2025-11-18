import dayjs from "dayjs";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import Button from "@/components/common/Button/Button";
import type { GuestBookEntryType } from "@/components/minihome/guestbook/types/guestbook.types";

export interface EntryProps extends GuestBookEntryType {
  canDelete?: boolean;
  onDelete?: () => void;
  children?: ReactNode;
}

export default function Entry({
  author,
  created_at,
  content,
  canDelete,
  onDelete,
  children,
}: EntryProps) {
  return (
    <div className="bevel-default flex w-full flex-col gap-2 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-muted dark:text-primary">{author?.nickname}</span>
          <div className="flex gap-2">
            <span className="opacity-50">{dayjs(created_at).format("YYYY.MM.DD HH:mm")}</span>
            {canDelete && (
              <Button onClick={onDelete} composition="iconOnly" aria-label="방명록 삭제">
                <X className="size-3" strokeWidth={3} />
              </Button>
            )}
          </div>
        </div>
        <p>{content}</p>
      </div>
      {children}
    </div>
  );
}
