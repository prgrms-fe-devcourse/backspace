import { Send, X } from "lucide-react";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import TextArea from "@/components/common/TextArea/TextArea";
import { useAuthUser } from "@/hooks/useAuthUser";
import supabase from "@/utils/supabase";

interface PostWriteProps {
  onClose: () => void;
}

// TODO: zod를 활용해 유효성 검사 추후 추가

export default function PostWrite({ onClose }: PostWriteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { homepageId } = useAuthUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      // TODO: "제목과 내용을 모두 입력해주세요" 라는 알림이 뜨도록 해야함
      return;
    }

    if (!homepageId) {
      // TODO: "홈페이지 ID를 찾을 수 없습니다. 다시 시도해주세요." 라는 알림이 뜨도록 해야함
      return;
    }

    setIsSubmitting(true);

    const newPost = {
      homepage_id: homepageId,
      title,
      content,
    };

    const { error } = await supabase.from("homepage_posts").insert(newPost).select().single();

    setIsSubmitting(false);

    if (error) {
      console.error("게시글 등록 실패:", error);
      // TODO: "글 등록에 실패했습니다." 라는 알림이 뜨도록 해야함
    } else {
      // TODO: "게시글이 등록되었습니다." 라는 알림이 뜨도록 해야함
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3.5 p-3.5">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">제목</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button size="md" type="button" onClick={onClose}>
          <X size={12} /> 취소
        </Button>
        <Button size="md" type="submit" disabled={isSubmitting}>
          <Send size={12} /> {isSubmitting ? "등록 중..." : "등록"}
        </Button>
      </div>
    </form>
  );
}
