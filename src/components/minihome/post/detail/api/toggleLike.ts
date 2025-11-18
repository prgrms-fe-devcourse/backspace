import supabase from "@/utils/supabase";

export async function addLike(postId: string, userId: string) {
  return supabase.from("homepage_post_likes").insert({ post_id: postId, user_id: userId });
}

export async function removeLike(postId: string, userId: string) {
  return supabase.from("homepage_post_likes").delete().eq("post_id", postId).eq("user_id", userId);
}
