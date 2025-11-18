import supabase from "@/utils/supabase";

export async function deletePost(postId: string) {
  return supabase.from("homepage_posts").delete().eq("id", postId);
}
