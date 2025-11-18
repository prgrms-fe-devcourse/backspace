import supabase from "@/utils/supabase";

import type { GalleryImage } from "../types/gallery.types";

export const getHomepageIdByOwner = async (ownerId: string) => {
  const { data, error } = await supabase
    .from("homepages")
    .select("id")
    .eq("owner_id", ownerId)
    .maybeSingle();

  return { data, error };
};

export const getGalleryImagesByHomepage = async (homepageId: string) => {
  const { data, error } = await supabase
    .from("homepage_gallery_images")
    .select("id, caption, created_at, image_url, author_id, homepage_id, visibility")
    .eq("homepage_id", homepageId)
    .order("created_at", { ascending: false });

  const parsedData: GalleryImage[] =
    data?.map((image) => ({
      id: image.id,
      caption: image.caption,
      created_at: image.created_at,
      image_url: image.image_url,
      author_id: image.author_id,
      homepage_id: image.homepage_id,
      visibility: image.visibility,
    })) ?? [];

  return { data: parsedData, error };
};
