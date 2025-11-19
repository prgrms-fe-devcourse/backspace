import type { WindowAppId, WindowInfo } from "@/types/window.types";

export const WINDOW_INFO: Record<WindowAppId, WindowInfo> = {
  home: {
    id: "home",
    category: "minihome",
    caption: "Home",
    isOnDesktop: true,
  },
  gallery: {
    id: "gallery",
    category: "minihome",
    caption: "Gallery",
    isOnDesktop: true,
  },
  memo: {
    id: "memo",
    category: "minihome",
    caption: "Memo",
    isOnDesktop: true,
  },
  guestbook: {
    id: "guestbook",
    category: "minihome",
    caption: "Guest Book",
    isOnDesktop: true,
  },
  friends: {
    id: "friends",
    category: "friends",
    caption: "Friends",
    isOnDesktop: true,
  },
  friendHome: {
    id: "friendHome",
    category: "friendHome",
    caption: "Friend Home",
    isOnDesktop: false,
  },
  settings: {
    id: "settings",
    category: "settings",
    caption: "Settings",
    isOnDesktop: false,
  },
} as const;
