import supabase from "@/utils/supabase";

const FILE_BUCKET = "files";

// Storage에 저장할 때 겹치지 않도록 홈피 ID + UUID 기반 경로를 생성
const createUniqueFilePath = (homepageId: string, fileName: string) => {
  const extension = fileName.split(".").pop() ?? "png";
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
    return { data: [], error };
  }

  return { data: data ?? [], error: null };
};
