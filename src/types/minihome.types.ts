export const MINIHOME_TABS = {
  home: "Home",
  gallery: "Gallery",
  memo: "Memo",
  guestbook: "Guest Book",
} as const;

export type MiniHomeTabs = (typeof MINIHOME_TABS)[keyof typeof MINIHOME_TABS];

export type MiniHomeTabId = keyof typeof MINIHOME_TABS;
