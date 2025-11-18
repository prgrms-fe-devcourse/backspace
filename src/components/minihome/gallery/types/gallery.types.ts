import type { Database } from "@/types/database.types";

type GalleryImageRow = Database["public"]["Tables"]["homepage_gallery_images"]["Row"];
type GalleryCommentRow = Database["public"]["Tables"]["homepage_gallery_image_comments"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export interface GalleryImage {
  id: GalleryImageRow["id"];
  caption: GalleryImageRow["caption"];
  image_url: GalleryImageRow["image_url"];
  created_at: GalleryImageRow["created_at"];
  author_id: GalleryImageRow["author_id"];
  homepage_id: GalleryImageRow["homepage_id"];
  visibility: GalleryImageRow["visibility"];
}

export interface GalleryComment {
  id: GalleryCommentRow["id"];
  created_at: GalleryCommentRow["created_at"];
  content: GalleryCommentRow["content"];
  author_id: GalleryCommentRow["author_id"];
  author: {
    auth_id: ProfileRow["auth_id"];
    nickname: ProfileRow["nickname"] | null;
    avatar_url: ProfileRow["avatar_url"] | null;
  } | null;
}
