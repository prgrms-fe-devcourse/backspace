import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

interface CommentInputProps {
  entryId: string;
  onSubmit: (id: string, content: string) => void;
}

export default function CommentInput({ entryId, onSubmit }: CommentInputProps) {
  const [content, setContent] = useState("");

  return (
    <div className="flex w-full items-stretch gap-1">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-w-0 flex-1"
        aria-label="답글 내용"
      />
      <Button
        onClick={() => {
          onSubmit(entryId, content);
          setContent("");
        }}
        className="self-center"
      >
        작성
      </Button>
    </div>
  );
}
