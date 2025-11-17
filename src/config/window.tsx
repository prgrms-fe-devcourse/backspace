import Friends from "@/assets/icons/friends.svg?react";
import Gallery from "@/assets/icons/gallery.svg?react";
import Guestbook from "@/assets/icons/guestbook.svg?react";
import Home from "@/assets/icons/home.svg?react";
import Memo from "@/assets/icons/memo.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import MiniHome from "@/pages/minihome/MiniHome";
import { MINIHOME_TABS } from "@/types/minihome.types";
import type { WindowApp, WindowAppId } from "@/types/window.types";

export const WINDOW_APPS: Record<WindowAppId, WindowApp> = {
  home: {
    id: "home",
    category: "minihome",
    caption: "Home",
    icon: Home,
    component: MiniHome,
  },
  gallery: {
    id: "gallery",
    category: "minihome",
    caption: "Gallery",
    icon: Gallery,
    component: () => <MiniHome tab={MINIHOME_TABS.gallery} />,
  },
  memo: {
    id: "memo",
    category: "minihome",
    caption: "Memo",
    icon: Memo,
    component: () => <MiniHome tab={MINIHOME_TABS.memo} />,
  },
  guestbook: {
    id: "guestbook",
    category: "minihome",
    caption: "Guest Book",
    icon: Guestbook,
    component: () => <MiniHome tab={MINIHOME_TABS.guestbook} />,
  },
  friends: {
    id: "friends",
    category: "friends",
    caption: "Friends",
    icon: Friends,
  },
  settings: {
    id: "settings",
    category: "settings",
    caption: "Settings",
    icon: Settings,
  },
} as const;

export type WindowApps = (typeof WINDOW_APPS)[keyof typeof WINDOW_APPS];
