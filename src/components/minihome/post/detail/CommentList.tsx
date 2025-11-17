import type { CommentWithProfile } from "@/types/post.types";

import CommentItem from "./CommentItem";

export default function CommentList({ comments }: { comments: CommentWithProfile[] }) {
  return (
    <div className="bevel-pressed mt-2 flex flex-1 flex-col gap-1.5 bg-white p-3.5">
      <p>댓글 {comments.length}개</p>
      {comments.length > 0 ? (
        comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
      ) : (
        <div className="py-4 text-center text-xs opacity-60">작성된 댓글이 없습니다.</div>
      )}
    </div>
  );
}
