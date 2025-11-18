import type { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/utils/supabase";

import type { GuestbookCommentWithAuthor, GuestbookWithComments } from "../types/guestbook.types";

export const getGuestBookWithComment = async (
  ownerId: string
): Promise<{ data: GuestbookWithComments[]; error: PostgrestError | null }> => {
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
        auth_id,
        nickname
      ),

      comments:guestbook_comments!guestbook_comments_post_id_fkey (
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

  return {
    data: data ?? [],
    error,
  };
};

export const deleteGuestBookEntry = async (id: string): Promise<PostgrestError | null> => {
  const { error } = await supabase.from("guestbook_posts").delete().eq("id", id);

  if (error) return error;

  return null;
};

export const deleteGuestBookReply = async (id: string): Promise<PostgrestError | null> => {
  const { error } = await supabase.from("guestbook_comments").delete().eq("id", id);

  if (error) return error;

  return null;
};

export const insertReply = async (
  id: string,
  entryId: string,
  content: string
): Promise<{ data: GuestbookCommentWithAuthor[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("guestbook_comments")
    .insert({ post_id: entryId, author_id: id, content })
    .select(
      `
      id,
      created_at,
      content,
      commenter:profiles!guestbook_comments_author_id_fkey (
        nickname
      )
    `
    );

  return { data, error };
};
