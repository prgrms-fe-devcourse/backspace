import { Activity, type ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <>
      <Activity>{children}</Activity>;
    </>
  );
}
