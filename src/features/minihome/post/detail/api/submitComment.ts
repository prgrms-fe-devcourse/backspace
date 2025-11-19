import supabase from "@/utils/supabase";

export async function submitComment(postId: string, userId: string, content: string) {
  return supabase
    .from("homepage_post_comments")
    .insert({
      post_id: postId,
      author_id: userId,
      content,
    })
    .select(`*, profiles ( nickname, avatar_url )`)
    .single();
}
