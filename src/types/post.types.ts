import type { Database } from "./database.types";

export type Post = Database["public"]["Tables"]["homepage_posts"]["Row"];
export type Comment = Database["public"]["Tables"]["homepage_post_comments"]["Row"];

export type PostWithCounts = Post & {
  homepage_post_comments: {
    count: number;
  }[];
  homepage_post_likes: {
    count: number;
  }[];
};

export type CommentWithProfile = Comment & {
  profiles: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
};
