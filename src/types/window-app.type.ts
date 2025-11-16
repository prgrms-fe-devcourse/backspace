import { createElement } from "react";

import Friends from "@/assets/icons/friends.svg?react";
import Gallery from "@/assets/icons/gallery.svg?react";
import Guestbook from "@/assets/icons/guestbook.svg?react";
import Home from "@/assets/icons/home.svg?react";
import Memo from "@/assets/icons/memo.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import MiniHome from "@/pages/minihome/MiniHome";

const todoComponent = () => createElement("div", null, "(구현 예정)");

export const WINDOW_APPS = {
  HOME: {
    category: "home",
    caption: "Home",
    icon: Home,
    component: MiniHome,
  },
  GALLERY: {
    category: "gallery",
    caption: "Gallery",
    icon: Gallery,
    component: todoComponent,
  },
  MEMO: {
    category: "memo",
    caption: "Memo",
    icon: Memo,
    component: todoComponent,
  },
  GUESTBOOK: {
    category: "guestbook",
    caption: "Guest Book",
    icon: Guestbook,
    component: todoComponent,
  },
  FRIENDS: {
    category: "friends",
    caption: "Friends",
    icon: Friends,
    component: todoComponent,
  },
  SETTINGS: {
    category: "settings",
    caption: "Settings",
    icon: Settings,
    component: todoComponent,
  },
} as const;

export type WindowApps = (typeof WINDOW_APPS)[keyof typeof WINDOW_APPS];
