import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("en") ? "en" : "id";
  const targetLang = currentLang === "id" ? "en" : "id";

  const handleToggle = () => {
    i18n.changeLanguage(targetLang);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch language to ${targetLang.toUpperCase()}`}
      title={`${t("common.language", "Bahasa")}: ${currentLang.toUpperCase()} → ${targetLang.toUpperCase()}`}
      className={`relative inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl border border-neutral-200/80 bg-white/90 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer select-none overflow-hidden ${className}`}
    >
      <span className="text-xs text-neutral-400 dark:text-neutral-500">
        🌐
      </span>

      <div className="relative w-6 h-4 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentLang}
            initial={{ y: 9, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -9, opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute font-mono font-bold uppercase tracking-wider text-[11px] text-blue-600 dark:text-blue-400"
          >
            {currentLang}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
}
