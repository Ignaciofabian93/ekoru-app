"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: "dark" | "light" | undefined;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  systemTheme: undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ekoru-theme",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage?.getItem(storageKey) as Theme) || defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<"dark" | "light" | undefined>(undefined);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme) {
        setThemeState(storedTheme);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(media.matches ? "dark" : "light");

    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system" && enableSystem) {
      const systemThemeValue = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemThemeValue);
      return;
    }

    root.classList.add(theme);
  }, [theme, enableSystem]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme);
      }
      setThemeState(theme);
    },
    systemTheme: enableSystem ? systemTheme : undefined,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
