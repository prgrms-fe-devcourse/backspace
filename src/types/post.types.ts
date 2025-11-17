import type { Database } from "./database.types";

export type Post = Database["public"]["Tables"]["homepage_posts"]["Row"];

export type PostWithCounts = Post & {
  homepage_post_comments: {
    count: number;
  }[];
  homepage_post_likes: {
    count: number;
  }[];
};
