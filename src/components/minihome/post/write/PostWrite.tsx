import { Send, X } from "lucide-react";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import TextArea from "@/components/common/TextArea/TextArea";

export default function PostWrite({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form className="flex h-full flex-col gap-3.5 p-3.5">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">제목</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="content">내용</label>
        <TextArea
          id="content"
          value={content}
          className="flex-1"
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button size="lg" onClick={onClose}>
          <X size={14} /> 취소
        </Button>
        <Button size="lg">
          <Send size={14} /> 등록
        </Button>
      </div>
    </form>
  );
}
