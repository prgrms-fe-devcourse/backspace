import { type ComponentType, type FunctionComponent, type SVGProps } from "react";

export type WindowAppId = "home" | "gallery" | "memo" | "guestbook" | "friends" | "settings";

export interface WindowApp {
  id: WindowAppId;
  caption: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  component?: ComponentType;
}
