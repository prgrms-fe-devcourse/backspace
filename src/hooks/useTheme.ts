import { useContext } from "react";

import { ThemeContext } from "@/contexts/ThemeContext";

export default function useTheme() {
  const theme = useContext(ThemeContext);

  // TODO: 에러 핸들링
  if (!theme) throw new Error("Theme Error");

  return theme;
}
