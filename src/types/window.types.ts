import { type ComponentType, type FunctionComponent, type SVGProps } from "react";

import type { MiniHomeTabId } from "@/types/minihome.types";

export type WindowAppId = MiniHomeTabId | "friends" | "friendHome" | "settings";

export type WindowCategory = "minihome" | "friends" | "friendHome" | "settings";

export interface WindowComponentProps {
  ownerId?: string;
}

export interface WindowApp {
  id: WindowAppId;
  ownerId?: string;
  category: WindowCategory;
  caption: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  component?: ComponentType<WindowComponentProps>;
  isOnDesktop: boolean;
}
