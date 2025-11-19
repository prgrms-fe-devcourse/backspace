import { useEffect, useState } from "react";

import BevelScrollContainer from "@/components/Container/BevelScrollContainer";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { PostWithCounts } from "@/types/post.types";
import supabase from "@/utils/supabase";

import PostItem from "./PostItem";

interface PostListProps {
  onPostClick: (postId: string) => void;
  ownerId: string | undefined;
}

export default function PostList({ onPostClick, ownerId }: PostListProps) {
  const [posts, setPosts] = useState<PostWithCounts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { nickname: authorName } = useAuthUser();

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);

      if (!ownerId) {
        setIsLoading(false);
        return;
      }

      const { data: homepage, error: homepageError } = await supabase
        .from("homepages")
        .select("id")
        .eq("owner_id", ownerId)
        .single();

      if (homepageError || !homepage) {
        console.error("해당 유저 홈피를 찾을 수 없음:", homepageError);
        setIsLoading(false);
        return;
      }

      const homepageIdToFetch = homepage.id;

      const { data, error } = await supabase
        .from("homepage_posts")
        .select(
          `
        *,
        homepage_post_comments ( count ),
        homepage_post_likes ( count )
      `
        )
        .eq("homepage_id", homepageIdToFetch)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("게시물 로딩 실패:", error);
      } else if (data) {
        setPosts(data as PostWithCounts[]);
      }

      setIsLoading(false);
    }

    fetchPosts();
  }, [ownerId]);

  if (isLoading) {
    return <div className="p-4 text-center">게시물을 불러오는 중...</div>;
  }

  return (
    <BevelScrollContainer>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
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
          <div className="py-4 text-center opacity-60">작성된 게시글이 없습니다.</div>
        )}
      </div>
    </BevelScrollContainer>
  );
}
