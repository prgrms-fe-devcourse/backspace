import dayjs from "dayjs";
import { ArrowLeft, Heart, MessageSquare, Pencil, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { CommentWithProfile, Post } from "@/types/post.types";
import supabase from "@/utils/supabase";

import CommentList from "./CommentList";

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onEdit: (post: any) => void;
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
    async function fetchPostDetails() {
      setIsLoading(true);

      const [postRes, commentsRes, likesRes, myLikeRes] = await Promise.all([
        supabase.from("homepage_posts").select("*").eq("id", postId).single(),

        supabase
          .from("homepage_post_comments")
          .select(`*, profiles ( nickname, avatar_url )`)
          .eq("post_id", postId)
          .order("created_at", { ascending: true }),

        supabase.from("homepage_post_likes").select("id").eq("post_id", postId),

        authUserId
          ? supabase
              .from("homepage_post_likes")
              .select("id")
              .eq("post_id", postId)
              .eq("user_id", authUserId)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null }),
      ]);

      if (postRes.error) console.error("게시물 로딩 실패:", postRes.error);
      else setPost(postRes.data);

      if (commentsRes.error) console.error("댓글 로딩 실패:", commentsRes.error);
      else setComments(commentsRes.data as CommentWithProfile[]);

      if (likesRes.error) {
        console.error("좋아요 로딩 실패:", likesRes.error);
      } else {
        setLikeCount(likesRes.data ? likesRes.data.length : 0);
      }

      if (myLikeRes.data) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      setIsLoading(false);
    }
    fetchPostDetails();
  }, [postId, authUserId]);

  const handleCommentSubmit = async (content: string) => {
    if (!authUserId || !post) return;

    const newComment = {
      post_id: post.id,
      author_id: authUserId,
      content,
    };

    const { data: addedComment, error } = await supabase
      .from("homepage_post_comments")
      .insert(newComment)
      .select(`*, profiles ( nickname, avatar_url )`)
      .single();

    if (error) {
      console.error("댓글 등록 실패:", error);
      // TODO: Toast "댓글 등록 실패"
    } else if (addedComment) {
      setComments((prev) => [...prev, addedComment as CommentWithProfile]);
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;

    const { error } = await supabase.from("homepage_posts").delete().eq("id", post.id);

    if (error) {
      console.error("게시글 삭제 실패:", error);
      // TODO: Toast "삭제 실패"
    } else {
      onBack();
    }
  };

  const handleToggleLike = async () => {
    if (!authUserId || isLikeLoading) return;

    setIsLikeLoading(true);

    const prevIsLiked = isLiked;
    const prevCount = likeCount;

    setIsLiked(!prevIsLiked);
    setLikeCount(prevIsLiked ? prevCount - 1 : prevCount + 1);

    let error;

    if (prevIsLiked) {
      const { error: deleteError } = await supabase
        .from("homepage_post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", authUserId);
      error = deleteError;
    } else {
      const { error: insertError } = await supabase
        .from("homepage_post_likes")
        .insert({ post_id: postId, user_id: authUserId });
      error = insertError;
    }

    if (error) {
      console.error("좋아요 실패:", error);
      setIsLiked(prevIsLiked);
      setLikeCount(prevCount);
      // TODO: Toast "좋아요 실패"
    }

    setIsLikeLoading(false);
  };

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (!post) return <div className="p-4 text-center">게시글을 찾을 수 없습니다.</div>;

  const isOwner = myHomepageId === post.homepage_id;

  return (
    <div className="scrollbar flex h-full min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto py-3.5">
      <Button onClick={onBack} className="self-start">
        <ArrowLeft size={14} /> 목록으로
      </Button>

      <div>
        <div className="border-b">
          <h2 className="text-sm">{post.title}</h2>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{dayjs(post.created_at).format("YYYY.MM.DD HH:mm")}</span>
            <span className="flex items-center gap-1">
              <MessageSquare width={12} /> {comments.length}
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-[100px] whitespace-pre-wrap">{String(post.content || "")}</div>

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
            <Button size="md" className="flex items-center gap-1" onClick={() => onEdit(post)}>
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
  );
}
