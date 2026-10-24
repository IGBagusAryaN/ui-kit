import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export interface ThemeToggleProps {
  /** Menampilkan teks label 'Light' / 'Dark' di sebelah icon (default: true) */
  showLabel?: boolean;
  /** Ukuran tombol: 'sm' | 'md' | 'lg' (default: 'md') */
  size?: "sm" | "md" | "lg";
  /** ClassName Tailwind tambahan */
  className?: string;
}

export function ThemeToggle({
  showLabel = true,
  size = "md",
  className = "",
}: ThemeToggleProps) {

  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "h-8 px-2.5 text-xs gap-1.5 rounded-lg",
    md: "h-9 px-3 text-xs gap-2 rounded-lg",
    lg: "h-10 px-4 text-sm gap-2.5 rounded-xl",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center font-medium select-none cursor-pointer outline-none border border-neutral-200 bg-white text-neutral-700 shadow-xs hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white ${sizeClasses[size]} ${className}`}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun-icon"
              initial={{ rotate: -90, scale: 0.35, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.35, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center text-amber-500 dark:text-amber-400"
            >
              <svg
                width={iconSizes[size]}
                height={iconSizes[size]}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon-icon"
              initial={{ rotate: 90, scale: 0.35, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.35, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center text-neutral-600 dark:text-blue-400"
            >
              <svg
                width={iconSizes[size]}
                height={iconSizes[size]}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <div className="relative overflow-hidden hidden sm:inline-block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "light-text" : "dark-text"}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block font-medium"
            >
              {isDark ? "Light" : "Dark"}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </motion.button>
  );
}
