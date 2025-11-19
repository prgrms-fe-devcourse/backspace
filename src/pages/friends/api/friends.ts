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

export const getFriendRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from("friend_requests")
    .select("*")
    .eq("addressee_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

/**
 * ✉️ 친구 요청 보내기
 * - requesterId: 나
 * - addresseeId: 친구 요청 받는 사람
 */
export const sendFriendRequest = async (requesterId: string, addresseeId: string) => {
  if (!requesterId || !addresseeId) {
    throw new Error("유효하지 않은 사용자 ID입니다.");
  }

  if (requesterId === addresseeId) {
    throw new Error("본인에게 친구 요청을 보낼 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("friend_requests")
    .insert({
      requester_id: requesterId,
      addressee_id: addresseeId,
    })
    .select()
    .single();

  if (error) {
    // 유니크 제약(requester_id + addressee_id) 위반 등 처리
    throw error;
  }

  return data;
};

/**
 * ✅ 친구 요청 수락
 * - currentUserId: 나 (addressee)
 * - requestId: 수락할 friend_requests.id
 *
 * 1) friend_requests에서 해당 요청 찾고
 * 2) friends에 (user1_id, user2_id) 추가
 * 3) friend_requests에서 해당 요청 삭제
 */
export const acceptFriendRequest = async (requestId: string, currentUserId: string) => {
  if (!requestId || !currentUserId) {
    throw new Error("유효하지 않은 요청입니다.");
  }

  // 1. 현재 유저에게 온 요청인지 확인하면서 가져오기
  const { data: request, error: requestError } = await supabase
    .from("friend_requests")
    .select("*")
    .eq("id", requestId)
    .eq("addressee_id", currentUserId)
    .single();

  if (requestError) throw requestError;
  if (!request) throw new Error("친구 요청을 찾을 수 없습니다.");

  const requesterId = request.requester_id;
  const addresseeId = request.addressee_id;

  // 2. 친구 관계를 (user1_id, user2_id) 정규화해서 friends에 추가
  const [user1Id, user2Id] = [requesterId, addresseeId].sort();

  // friends insert 할 때는 컬럼 이름만 snake_case로 맞춰주고
  const { error: insertError } = await supabase.from("friends").insert({
    user1_id: user1Id,
    user2_id: user2Id,
  });

  if (insertError) {
    // 이미 friends에 존재하면 유니크 제약 오류가 날 수 있음
    throw insertError;
  }

  // 3. friend_requests에서 해당 요청 삭제
  const { error: deleteError } = await supabase
    .from("friend_requests")
    .delete()
    .eq("id", requestId);

  if (deleteError) throw deleteError;

  return { user1Id, user2Id };
};

/**
 * ❌ 친구 요청 취소/거절
 * - currentUserId: 나 (addressee)
 * - requestId: 취소/거절할 friend_requests.id
 *
 * 여기서는 "나한테 온 요청"만 취소(거절) 가능하게 함.
 */
export const cancelFriendRequest = async (requestId: string, currentUserId: string) => {
  if (!requestId || !currentUserId) {
    throw new Error("유효하지 않은 요청입니다.");
  }

  const { error } = await supabase.from("friend_requests").delete().match({
    id: requestId,
    addressee_id: currentUserId,
  });

  if (error) throw error;
};
