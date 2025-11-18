import type { ComponentType, FunctionComponent, SVGProps } from "react";

import type { MiniHomeTabId } from "@/types/minihome.types";

export type WindowAppId = MiniHomeTabId | "friends" | "friendHome" | "settings";

export type WindowCategory = "minihome" | "friends" | "friendHome" | "settings";

export interface WindowComponentProps {
  windowId: WindowAppId;
  ownerId?: string;
}

export interface WindowInfo {
  id: WindowAppId;
  category: WindowCategory;
  caption: string;
  isOnDesktop: boolean;
}

export interface WindowApp extends WindowInfo {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  component?: ComponentType<WindowComponentProps>;
}

export interface WindowInstance {
  id: WindowAppId;
  category: WindowCategory;
  caption: string;
  ownerId?: string;
}

export interface Position {
  x: number;
  y: number;
}
