import { type ComponentType, type FunctionComponent, type SVGProps } from "react";

import type { MiniHomeTabId } from "@/types/minihome.types";

export type WindowAppId = MiniHomeTabId | "friends" | "settings";

export interface WindowApp {
  id: WindowAppId;
  caption: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  component?: ComponentType;
}
