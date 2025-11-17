import UserHome from "@/assets/icons/friendhome.svg?react";
import Users from "@/assets/icons/friends.svg?react";
import Gallery from "@/assets/icons/gallery.svg?react";
import Guestbook from "@/assets/icons/guestbook.svg?react";
import Home from "@/assets/icons/home.svg?react";
import Memo from "@/assets/icons/memo.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import Friends from "@/pages/friends/Friends";
import MiniHome from "@/pages/minihome/MiniHome";
import { MINIHOME_TABS } from "@/types/minihome.types";
import type { WindowApp, WindowAppId, WindowComponentProps } from "@/types/window.types";

import { WINDOW_INFO } from "./windowInfo";

export const WINDOW_APPS: Record<WindowAppId, WindowApp> = {
  home: {
    ...WINDOW_INFO.home,
    icon: Home,
    component: (props: WindowComponentProps) => <MiniHome {...props} tab={MINIHOME_TABS.home} />,
  },
  gallery: {
    ...WINDOW_INFO.gallery,
    icon: Gallery,
    component: (props: WindowComponentProps) => <MiniHome {...props} tab={MINIHOME_TABS.gallery} />,
  },
  memo: {
    ...WINDOW_INFO.memo,
    icon: Memo,
    component: (props: WindowComponentProps) => <MiniHome {...props} tab={MINIHOME_TABS.memo} />,
  },
  guestbook: {
    ...WINDOW_INFO.guestbook,
    icon: Guestbook,
    component: (props: WindowComponentProps) => (
      <MiniHome {...props} tab={MINIHOME_TABS.guestbook} />
    ),
  },
  friends: {
    ...WINDOW_INFO.friends,
    icon: Users,
    component: () => <Friends />,
  },
  friendHome: {
    ...WINDOW_INFO.friendHome,
    icon: UserHome,
    component: (props: WindowComponentProps) => <MiniHome {...props} tab={MINIHOME_TABS.home} />,
  },
  settings: {
    ...WINDOW_INFO.settings,
    icon: Settings,
  },
} as const;

export type WindowApps = (typeof WINDOW_APPS)[keyof typeof WINDOW_APPS];
