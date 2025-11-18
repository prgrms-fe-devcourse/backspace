import { createContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [hasStoredTheme, setHasStoredTheme] = useState(
    () => localStorage.getItem("theme") !== null
  );

  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  });

  useEffect(() => {
    if (hasStoredTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [hasStoredTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    if (hasStoredTheme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, hasStoredTheme]);

  const handleSetTheme = (newTheme: Theme) => {
    setHasStoredTheme(true);
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    setHasStoredTheme(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // ! Profiler에서 리액트 컴파일러에 의해 자동으로 useMemo가 되어 캐싱 되는 걸 확인했는데 필요하다면 수정하겠습니다.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
