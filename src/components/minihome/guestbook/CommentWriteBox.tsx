import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

interface CommentWriteBoxProps {
  entryId: string;
  onSubmit: (id: string, content: string) => void;
}

export default function CommentWriteBox({ entryId, onSubmit }: CommentWriteBoxProps) {
  const [content, setContent] = useState("");

  return (
    <div className="flex w-full items-stretch gap-1">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-w-0 flex-1"
        aria-label="답글 내용"
      />
      <Button onClick={() => onSubmit(entryId, content)} size="md" className="self-center">
        작성
      </Button>
    </div>
  );
}
