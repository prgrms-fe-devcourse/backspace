import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from "@/pages/friends/api/friends";
import type { FriendRequest } from "@/pages/friends/types/friends.types";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Request() {
  const user = useAuthStore((state) => state.user);
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const { data, error } = await getFriendRequests(user.id);

      // TODO: 에러 핸들링
      if (error) throw new Error("error");

      setRequests(data ?? []);
    };

    fetch();
  }, [user]);

  const handleAccept = async (requestId: string) => {
    if (!user) return;

    try {
      await acceptFriendRequest(requestId, user.id);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      // TODO: 에러 핸들링
      console.error(error);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!user) return;

    try {
      await rejectFriendRequest(requestId, user.id);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      // TODO: 에러 핸들링
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1 p-4">
      <span className="pl-1">친구 신청 {requests.length}</span>
      <div className="bevel-pressed flex min-h-0 flex-1 flex-col overflow-hidden px-[3px]">
        <div className="bg-text-invert scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3 pr-0">
          <ul className="flex flex-col gap-2">
            {requests.map((request) => (
              <li key={request.id}>
                <div className="flex items-center gap-3 p-2 pl-2 select-none">
                  <div className="shrink-0">
                    <img
                      // TODO: 디폴트 아바타 설정
                      src={request.requester.avatar_url ?? ""}
                      alt="프로필 아바타"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {request.requester.nickname}
                    </span>
                    <span className="text-text-subtle truncate text-xs">
                      {request.requester.email}
                    </span>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="md" onClick={() => handleAccept(request.id)}>
                      수락
                    </Button>
                    <Button size="md" onClick={() => handleReject(request.id)}>
                      거절
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
