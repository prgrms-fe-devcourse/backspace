import type { Database } from "@/types/database.types";

type GalleryImageRow = Database["public"]["Tables"]["homepage_gallery_images"]["Row"];

export interface GalleryImage {
  id: GalleryImageRow["id"];
  caption: GalleryImageRow["caption"];
  image_url: GalleryImageRow["image_url"];
  created_at: GalleryImageRow["created_at"];
  author_id: GalleryImageRow["author_id"];
  homepage_id: GalleryImageRow["homepage_id"];
  visibility: GalleryImageRow["visibility"];
}
