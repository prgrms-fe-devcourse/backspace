import { Send } from "lucide-react";

import Button from "@/components/common/Button/Button";
import TextArea from "@/components/common/TextArea/TextArea";

export default function GuestbookWriteBox() {
  return (
    <div className="bevel-pressed mb-3 flex flex-col justify-end gap-1 p-3">
      <span>방명록 남기기</span>
      <TextArea className="w-full" aria-label="방명록 내용" />
      <Button>
        <Send size="1em" />
        등록
      </Button>
    </div>
  );
}
