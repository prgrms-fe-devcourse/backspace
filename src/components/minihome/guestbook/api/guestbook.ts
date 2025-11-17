import supabase from "@/utils/supabase";

export async function fetchGuestbookWithComments(ownerId: string) {
  const { data, error } = await supabase
    .from("guestbook_posts")
    .select(
      `
      id,
      created_at,
      content,

      homepage:homepages!inner (
        owner_id
      ),

      author:profiles!guestbook_posts_author_id_fkey (
        nickname
      ),

      comments:guestbook_comments (
        id,
        created_at,
        content,

        commenter:profiles!guestbook_comments_author_id_fkey (
          nickname
        )
      )
    `
    )
    .eq("homepage.owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
