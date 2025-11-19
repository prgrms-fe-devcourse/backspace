import { Home, UserMinus2 } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import BevelScrollContainer from "@/components/Container/BevelScrollContainer";
import { useAuthStore } from "@/stores/useAuthStore";
import { useWindowStore } from "@/stores/useWindowStore";

import { getFriends, removeFriend } from "../api/friends";
import type { FriendRelation } from "../types/friends.types";

export default function List() {
  const user = useAuthStore((state) => state.user);
  const openWindow = useWindowStore((state) => state.openWindow);

  const [friends, setFriends] = useState<FriendRelation[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const { data, error } = await getFriends(user.id);

      // TODO: 에러 핸들링
      if (error) {
        console.error(error);
        return;
      }

      setFriends(data ?? []);
    };

    fetch();
  }, [user]);

  const handleVisitMiniHome = (ownerId: string) => {
    openWindow("friendHome", ownerId);
  };

  const handleRemoveFriend = async (relationId: string) => {
    try {
      await removeFriend(relationId);
      setFriends((prev) => prev.filter((friend) => friend.id !== relationId));
    } catch (error) {
      // TODO: 에러 핸들링
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1 p-4">
      <span className="pl-1">친구 목록 {friends.length}</span>
      <div className="flex min-h-0 flex-1">
        <BevelScrollContainer>
          <ul className="flex flex-col gap-2">
            {friends.map((friend) => {
              const profile =
                friend.user1_id === user?.id ? friend.user2_profile : friend.user1_profile;

              if (!profile) return null;

              return (
                <li key={friend.id}>
                  <div className="flex items-center gap-3 p-2 pl-2 select-none">
                    <div className="shrink-0">
                      <img
                        src={profile.avatar_url ?? ""}
                        alt="프로필 아바타"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium">{profile.nickname}</span>
                      <span className="text-text-subtle truncate text-xs">{profile.email}</span>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button
                        size="md"
                        composition="iconText"
                        onClick={() => handleVisitMiniHome(profile.auth_id)}
                      >
                        <Home className="h-4 w-4" />
                        미니홈 방문
                      </Button>
                      <Button
                        size="md"
                        composition="iconText"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        <UserMinus2 className="h-4 w-4" />
                        친구 끊기
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </BevelScrollContainer>
      </div>
    </div>
  );
}
