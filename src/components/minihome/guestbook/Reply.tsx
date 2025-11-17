import dayjs from "dayjs";
import { X } from "lucide-react";

import Button from "@/components/common/Button/Button";

interface ReplyProps {
  username: string;
  date: string;
  content: string;
}

export default function Reply({ username, date, content }: ReplyProps) {
  return (
    <div className="border-primary border-l-3 pl-3">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-accent">{username}</span>
          <div className="flex gap-2">
            <span className="opacity-50">{dayjs(date).format("YYYY.MM.DD HH:mm")}</span>
            <Button composition="iconOnly" size="sm" className="font-bold" aria-label="답글 삭제">
              <X size="1em" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
