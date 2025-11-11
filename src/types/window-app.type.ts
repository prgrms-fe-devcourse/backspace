import Friends from "@/assets/icons/friends.svg?react";
import Gallery from "@/assets/icons/gallery.svg?react";
import Guestbook from "@/assets/icons/guestbook.svg?react";
import Home from "@/assets/icons/home.svg?react";
import Settings from "@/assets/icons/settings.svg?react";

export const WINDOW_APP = {
  HOME: {
    caption: "Home",
    icon: Home,
  },
  GALLERY: {
    caption: "Gallery",
    icon: Gallery,
  },
  GUESTBOOK: {
    caption: "Guest Book",
    icon: Guestbook,
  },
  FRIENDS: {
    caption: "Friends",
    icon: Friends,
  },
  SETTINGS: {
    caption: "Settings",
    icon: Settings,
  },
} as const;

export type WindowApp = (typeof WINDOW_APP)[keyof typeof WINDOW_APP];
