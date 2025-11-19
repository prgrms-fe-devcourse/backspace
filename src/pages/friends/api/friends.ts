import type { PostgrestError } from "@supabase/supabase-js";

import type { FriendRequest } from "@/pages/friends/types/friends.types";
import supabase from "@/utils/supabase";

export const searchProfiles = async (keyword: string, userId: string | undefined) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`nickname.ilike.%${keyword}%, email.ilike.%${keyword}%`)
    .neq("auth_id", userId);

  if (error) throw error;

  return data;
};

export const getFriendRequests = async (
  userId: string
): Promise<{ data: FriendRequest[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from("friend_requests")
    .select(
      `
      *,
      requester:profiles!requester_id(*)
    `
    )
    .eq("addressee_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const sendFriendRequest = async (requesterId: string, userId: string) => {
  if (!requesterId || !userId) {
    throw new Error("유효하지 않은 사용자 ID입니다.");
  }

  if (requesterId === userId) {
    throw new Error("본인에게 친구 요청을 보낼 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("friend_requests")
    .insert({
      requester_id: requesterId,
      addressee_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const acceptFriendRequest = async (requestId: string, userId: string) => {
  if (!requestId || !userId) {
    throw new Error("유효하지 않은 요청입니다.");
  }

  const { data: request, error: requestError } = await supabase
    .from("friend_requests")
    .select("*")
    .eq("id", requestId)
    .eq("addressee_id", userId)
    .single();

  if (requestError) throw requestError;
  if (!request) throw new Error("친구 요청을 찾을 수 없습니다.");

  const requesterId = request.requester_id;
  const addresseeId = request.addressee_id;

  const [user1Id, user2Id] = [requesterId, addresseeId].sort();

  const { error: insertError } = await supabase.from("friends").insert({
    user1_id: user1Id,
    user2_id: user2Id,
  });

  if (insertError) {
    throw insertError;
  }

  const { error: deleteError } = await supabase
    .from("friend_requests")
    .delete()
    .eq("id", requestId);

  if (deleteError) throw deleteError;

  return { user1Id, user2Id };
};

export const rejectFriendRequest = async (requestId: string, userId: string) => {
  if (!requestId || !userId) {
    throw new Error("유효하지 않은 요청입니다.");
  }

  const { error } = await supabase.from("friend_requests").delete().match({
    id: requestId,
    addressee_id: userId,
  });

  if (error) throw error;
};
