import supabase from "@/utils/supabase";

export async function searchFriends(keyword: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`nickname.ilike.%${keyword}%, email.ilike.%${keyword}%`);

  if (error) throw error;

  return data;
}
