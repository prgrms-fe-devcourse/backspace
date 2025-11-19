import type { CommentWithProfile } from "@/types/post.types";

import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
  onDeleteComment,
  isMyHome,
}: {
  comments: CommentWithProfile[];
  onDeleteComment: (commentId: string) => Promise<void>;
  isMyHome: boolean;
}) {
  return (
    <div className="bevel-pressed bg-text-invert mt-2 flex flex-1 flex-col gap-1.5 p-3.5">
      <p>댓글 {comments.length}개</p>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={() => onDeleteComment(comment.id)}
            isMyHome={isMyHome}
          />
        ))
      ) : (
        <div className="py-4 text-center text-xs opacity-60">첫 댓글을 남겨보세요.</div>
      )}
    </div>
  );
}
