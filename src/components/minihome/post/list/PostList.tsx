import { useEffect, useState } from "react";

import { useAuthUser } from "@/hooks/useAuthUser";
import type { PostWithCounts } from "@/types/post.types";
import supabase from "@/utils/supabase";

import PostItem from "./PostItem";

interface PostListProps {
  onPostClick: (postId: string) => void;
}

export default function PostList({ onPostClick }: PostListProps) {
  const [posts, setPosts] = useState<PostWithCounts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { homepageId, nickname: authorName } = useAuthUser();

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);

      if (!homepageId) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("homepage_posts")
        .select(
          `
          *,
          homepage_post_comments ( count ),
          homepage_post_likes ( count )
        `
        )
        .eq("homepage_id", homepageId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("게시물 목록 로딩 실패:", error);
      } else if (data) {
        setPosts(data as PostWithCounts[]);
      }
      setIsLoading(false);
    }

    fetchPosts();
  }, [homepageId]);

  if (isLoading) {
    return <div className="p-4 text-center">게시물을 불러오는 중...</div>;
  }

  return (
    <div className="bevel-pressed scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto bg-white p-2.5">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            authorName={authorName || "주인장"}
            onPostClick={onPostClick}
          />
        ))
      ) : (
        <div className="py-4 text-center text-gray-500">작성된 게시글이 없습니다.</div>
      )}
    </div>
  );
}
