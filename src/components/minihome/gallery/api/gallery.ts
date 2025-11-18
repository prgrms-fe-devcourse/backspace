import type { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/utils/supabase";

import type { GalleryComment } from "../types/gallery.types";

const FILE_BUCKET = "files";

// Storage에 저장할 때 겹치지 않도록 홈피 ID + UUID 기반 경로를 생성
const createUniqueFilePath = (homepageId: string, fileName: string) => {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "webp"];
  let extension = "";
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot !== -1 && lastDot < fileName.length - 1) {
    extension = fileName.slice(lastDot + 1).toLowerCase();
  }
  if (!allowedExtensions.includes(extension)) {
    extension = "png";
  }
  const unique =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return `gallery/${homepageId}/${unique}.${extension}`;
};

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

  return { data: data ?? [], error };
};

interface UploadGalleryImageParams {
  file: File;
  homepageId: string;
  authorId: string;
  caption?: string;
}

export const uploadGalleryImage = async ({
  file,
  homepageId,
  authorId,
  caption,
}: UploadGalleryImageParams) => {
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      data: null,
      error: new Error("JPEG, PNG, GIF, WebP 파일만 업로드 가능합니다."),
    };
  }

  const filePath = createUniqueFilePath(homepageId, file.name);

  const { error: uploadError } = await supabase.storage.from(FILE_BUCKET).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadError) {
    return { data: null, error: uploadError };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(FILE_BUCKET).getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("homepage_gallery_images")
    .insert({
      homepage_id: homepageId,
      author_id: authorId,
      caption: caption ?? null,
      image_url: publicUrl,
    })
    .select("id, caption, created_at, image_url, author_id, homepage_id, visibility")
    .single();

  if (error) {
    await supabase.storage.from(FILE_BUCKET).remove([filePath]);
    return { data: null, error };
  }

  return { data, error: null };
};

export const getGalleryImageComments = async (
  imageId: string
): Promise<{ data: GalleryComment[]; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("homepage_gallery_image_comments")
    .select(
      `
      id,
      created_at,
      content,
      author_id,
      author:profiles!homepage_gallery_image_relies_author_id_fkey (
        auth_id,
        nickname,
        avatar_url
      )
    `
    )
    .eq("post_id", imageId)
    .order("created_at", { ascending: true });

  return { data: (data as GalleryComment[] | null) ?? [], error };
};

interface AddGalleryImageCommentParams {
  imageId: string;
  authorId: string;
  content: string;
}

export const addGalleryImageComment = async ({
  imageId,
  authorId,
  content,
}: AddGalleryImageCommentParams): Promise<{
  data: GalleryComment | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from("homepage_gallery_image_comments")
    .insert({
      post_id: imageId,
      author_id: authorId,
      content,
    })
    .select(
      `
      id,
      created_at,
      content,
      author_id,
      author:profiles!homepage_gallery_image_relies_author_id_fkey (
        auth_id,
        nickname,
        avatar_url
      )
    `
    )
    .single();

  return { data: (data as GalleryComment | null) ?? null, error };
};
