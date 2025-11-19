import supabase from "@/utils/supabase";

export async function deleteComment(commentId: string) {
  return supabase.from("homepage_post_comments").delete().eq("id", commentId);
}
