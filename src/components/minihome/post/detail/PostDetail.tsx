import dayjs from "dayjs";
import { ArrowLeft, Heart, MessageSquare, Pencil, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { CommentWithProfile, Post } from "@/types/post.types";

import { deletePost } from "./api/deletePost";
import { fetchPostDetail } from "./api/fetchPostDetail";
import { submitComment } from "./api/submitComment";
import { addLike, removeLike } from "./api/toggleLike";
import CommentList from "./CommentList";

interface MinihomePost {
  id: string;
  title: string;
  content: string;
}

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onEdit: (post: MinihomePost) => void;
}
export default function PostDetail({ postId, onBack, onEdit }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const { id: authUserId, homepageId: myHomepageId } = useAuthUser();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const { postRes, commentsRes, likesRes, myLikeRes } = await fetchPostDetail(
        postId,
        authUserId
      );

      if (!postRes.error) setPost(postRes.data);
      if (!commentsRes.error) setComments(commentsRes.data);
      if (!likesRes.error) setLikeCount(likesRes.data?.length ?? 0);
      setIsLiked(!!myLikeRes.data);

      setIsLoading(false);
    }
    load();
  }, [postId, authUserId]);

  const handleCommentSubmit = async (text: string) => {
    if (!authUserId || !post) return;

    if (!text.trim()) return;

    const { data, error } = await submitComment(post.id, authUserId, text);
    if (!error && data) {
      setComments((prev) => [...prev, data]);
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;

    const { error } = await deletePost(post.id);
    if (!error) onBack();
  };

  const handleToggleLike = async () => {
    if (!authUserId || isLikeLoading) return;

    setIsLikeLoading(true);

    const prev = isLiked;
    setIsLiked(!prev);
    setLikeCount(prev ? likeCount - 1 : likeCount + 1);

    const { error } = prev
      ? await removeLike(postId, authUserId)
      : await addLike(postId, authUserId);

    if (error) {
      setIsLiked(prev);
      setLikeCount(prev ? likeCount : likeCount + (prev ? 1 : -1));
    }

    setIsLikeLoading(false);
  };

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (!post) return <div className="p-4 text-center">게시글을 찾을 수 없습니다.</div>;

  const isOwner = myHomepageId === post.homepage_id;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="scrollbar flex min-h-0 flex-col gap-2.5 overflow-auto px-4 py-3.5">
        <Button onClick={onBack} className="self-start">
          <ArrowLeft size={14} /> 목록으로
        </Button>

        <div>
          <div className="border-b">
            <h2 className="text-sm">{post.title}</h2>
            <div className="mt-1 flex justify-between text-xs opacity-60">
              <span>{dayjs(post.created_at).format("YYYY.MM.DD HH:mm")}</span>
              <span className="flex items-center gap-1">
                <MessageSquare width={12} /> {comments.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="min-h-[120px] flex-1 whitespace-pre-wrap">
            {String(post.content || "")}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            size="md"
            className={`flex items-center gap-1 ${isLiked ? "text-accent" : ""}`}
            onClick={handleToggleLike}
            disabled={isLikeLoading}
          >
            <Heart width={14} fill={isLiked ? "currentColor" : "none"} />
            좋아요 {likeCount}
          </Button>

          {isOwner && (
            <div className="flex gap-2">
              <Button
                size="md"
                className="flex items-center gap-1"
                onClick={() =>
                  onEdit({
                    id: post.id,
                    title: post.title ?? "",
                    content:
                      typeof post.content === "string"
                        ? post.content
                        : JSON.stringify(post.content),
                  })
                }
              >
                <Pencil width={14} /> 수정
              </Button>
              <Button size="md" className="flex items-center gap-1" onClick={handleDeletePost}>
                <Trash2 width={14} /> 삭제
              </Button>
            </div>
          )}
        </div>

        <CommentList comments={comments} />
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleCommentSubmit(commentText);
            setCommentText("");
          }}
        >
          <Input
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="submit" size="md" className="w-20">
            <Send width={14} />
          </Button>
        </form>
      </div>
    </div>
  );
}
