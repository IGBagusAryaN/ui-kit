import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  // Inisialisasi tema dari localStorage atau fallback ke defaultTheme
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return defaultTheme;
  });

  // State boolean apakah tema aktif sekarang adalah dark
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Efek untuk sinkronisasi class 'dark' pada tag <html> dan media listener
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (currentTheme: Theme) => {
      let activeIsDark = false;

      if (currentTheme === "system") {
        activeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        activeIsDark = currentTheme === "dark";
      }

      setIsDark(activeIsDark);

      if (activeIsDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    // Listener jika user memilih 'system' dan preferensi OS berubah secara dinamis
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Handler update tema dengan auto-save ke localStorage
  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  // Toggle instan antara Light dan Dark
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom Hook untuk mengakses ThemeContext di seluruh komponen
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme harus digunakan di dalam komponen <ThemeProvider>");
  }
  return context;
}
