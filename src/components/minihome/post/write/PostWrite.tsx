import { PostgrestError } from "@supabase/supabase-js";
import { Send, X } from "lucide-react";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import TextArea from "@/components/common/TextArea/TextArea";
import { useAuthUser } from "@/hooks/useAuthUser";
import supabase from "@/utils/supabase";

interface EditingPost {
  id: string;
  title: string;
  content: string;
}

interface PostWriteProps {
  onClose: () => void;
  onCompleteEdit: (postId: string) => void;
  editingPost?: EditingPost | null;
}

export default function PostWrite({ onClose, onCompleteEdit, editingPost }: PostWriteProps) {
  const isEditMode = !!editingPost;

  const [title, setTitle] = useState(editingPost?.title ?? "");
  const [content, setContent] = useState(editingPost?.content ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { homepageId } = useAuthUser();

  let submitLabel = "";
  if (isSubmitting) {
    submitLabel = isEditMode ? "수정 중..." : "등록 중...";
  } else {
    submitLabel = isEditMode ? "수정" : "등록";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return;
    if (!homepageId) return;

    setIsSubmitting(true);

    let error: PostgrestError | null = null;
    let savedPostId: string | null = null;

    if (isEditMode && editingPost) {
      const { error: updateError, data } = await supabase
        .from("homepage_posts")
        .update({ title, content })
        .eq("id", editingPost.id)
        .select("id")
        .single();

      error = updateError;
      savedPostId = data?.id ?? null;
    } else {
      const newPost = {
        homepage_id: homepageId,
        title,
        content,
      };

      const { error: insertError, data } = await supabase
        .from("homepage_posts")
        .insert(newPost)
        .select("id")
        .single();

      error = insertError;
      savedPostId = data?.id ?? null;
    }

    setIsSubmitting(false);

    if (error) {
      console.error(isEditMode ? "게시글 수정 실패 :" : "게시글 등록 실패 :", error);
      return;
    }

    if (savedPostId) {
      onCompleteEdit(savedPostId);
      return;
    }

    onClose();
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
        <Button size="md" type="button" onClick={onClose} disabled={isSubmitting}>
          <X size={12} /> 취소
        </Button>

        <Button size="md" type="submit" disabled={isSubmitting}>
          <Send size={12} />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
