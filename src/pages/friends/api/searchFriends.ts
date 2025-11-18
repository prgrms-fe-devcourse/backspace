import supabase from "@/utils/supabase";

export async function searchFriends(keyword: string, userId: string | undefined) {
  if (!userId) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`nickname.ilike.%${keyword}%, email.ilike.%${keyword}%`)
    .neq("auth_id", userId);

  if (error) throw error;

  return data;
}
