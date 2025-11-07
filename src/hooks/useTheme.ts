import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let userTheme = localStorage.getItem("theme");

    if (!userTheme) {
      userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (userTheme === "light" || userTheme === "dark") {
      localStorage.setItem("theme", userTheme);
      setTheme(userTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
