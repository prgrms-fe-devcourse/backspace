export const MINIHOME_TABS = {
  HOME: "Home",
  GALLERY: "Gallery",
  MEMO: "Memo",
  GUESTBOOK: "Guest Book",
} as const;

export type MiniHomeTabs = (typeof MINIHOME_TABS)[keyof typeof MINIHOME_TABS];
