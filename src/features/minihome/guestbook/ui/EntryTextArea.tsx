import { Send } from "lucide-react";
import { useState } from "react";

import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

interface EntryTextAreaProps {
  onSubmit: (content: string) => void;
}

export default function EntryTextArea({ onSubmit }: EntryTextAreaProps) {
  const [content, setContent] = useState("");

  return (
    <div className="bevel-pressed mb-3 flex flex-col justify-end gap-1 p-3">
      <span>방명록 남기기</span>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full"
        aria-label="방명록 내용"
      />
      <Button
        onClick={() => {
          onSubmit(content);
          setContent("");
        }}
      >
        <Send className="size-4" />
        등록
      </Button>
    </div>
  );
}
