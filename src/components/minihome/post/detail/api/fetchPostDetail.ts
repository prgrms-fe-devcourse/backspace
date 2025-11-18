import supabase from "@/utils/supabase";

export async function fetchPostDetail(postId: string, authUserId?: string) {
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

  return {
    postRes,
    commentsRes,
    likesRes,
    myLikeRes,
  };
}
