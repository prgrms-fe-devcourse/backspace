import type { Database } from "@/types/database.types";

type GuestbookPostRow = Database["public"]["Tables"]["guestbook_posts"]["Row"];
type HomePageRow = Database["public"]["Tables"]["homepages"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type CommentRow = Database["public"]["Tables"]["guestbook_comments"]["Row"];

export interface GuestbookWithComments {
  id: GuestbookPostRow["id"];
  created_at: GuestbookPostRow["created_at"];
  content: GuestbookPostRow["content"];

  homepage: {
    owner_id: HomePageRow["owner_id"];
  } | null;

  author: {
    auth_id: ProfileRow["auth_id"];
    nickname: ProfileRow["nickname"] | null;
  } | null;

  comments: GuestbookCommentWithAuthor[];
}

export type GuestBookEntryType = Pick<
  GuestbookWithComments,
  "id" | "created_at" | "content" | "author"
>;

export interface GuestbookCommentWithAuthor {
  id: CommentRow["id"];
  created_at: CommentRow["created_at"];
  content: CommentRow["content"];
  commenter: {
    nickname: ProfileRow["nickname"] | null;
  } | null;
}
