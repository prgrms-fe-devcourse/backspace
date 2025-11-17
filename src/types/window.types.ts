import { type ComponentType, type FunctionComponent, type SVGProps } from "react";

import type { MiniHomeTabId } from "@/types/minihome.types";

export type WindowAppId = MiniHomeTabId | "friends" | "settings";

export type WindowCategory = "minihome" | "friends" | "friendHome" | "settings";

export interface WindowApp {
  id: WindowAppId;
  category: WindowCategory;
  caption: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  component?: ComponentType;
}
