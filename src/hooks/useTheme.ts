import { useContext } from "react";

import { ThemeContext } from "@/providers/ThemeProvider";

export default function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) throw new Error("Theme Error");

  return theme;
}
