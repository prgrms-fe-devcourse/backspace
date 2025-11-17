import dayjs from "dayjs";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import Button from "@/components/common/Button/Button";

import type { GuestBookEntryType } from "./types/guestbook.types";

export interface GuestBookEntryProps extends GuestBookEntryType {
  children?: ReactNode;
}

export default function GuestBookEntry({
  author,
  created_at,
  content,
  children,
}: GuestBookEntryProps) {
  return (
    <div className="bevel-default flex w-full flex-col gap-2 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-muted dark:text-primary">{author?.nickname}</span>
          <div className="flex gap-2">
            <span className="opacity-50">{dayjs(created_at).format("YYYY.MM.DD HH:mm")}</span>
            <Button composition="iconOnly" size="sm" className="font-bold" aria-label="방명록 삭제">
              <X size="1em" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <p>{content}</p>
      </div>
      {children}
    </div>
  );
}
