import type { Database } from "@/types/database.types";

export const FRIENDS_TABS = {
  search: "Search",
  request: "Request",
  list: "Friends",
} as const;

export type FriendsTabs = (typeof FRIENDS_TABS)[keyof typeof FRIENDS_TABS];

export type FriendsTabsId = keyof typeof FRIENDS_TABS;

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type FriendRequestRow = Database["public"]["Tables"]["friend_requests"]["Row"];

export type FriendRequest = FriendRequestRow & {
  requester: Profile;
};
