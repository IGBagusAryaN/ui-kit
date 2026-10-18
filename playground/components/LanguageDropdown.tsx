import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, CheckIcon } from "../../src/icons";

export interface LanguageOption {
  code: "id" | "en";
  label: string;
  flag: string;
  nativeLabel: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: "id",
    label: "Bahasa Indonesia",
    nativeLabel: "ID",
    flag: "🇮🇩",
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "EN",
    flag: "🇺🇸",
  },
];

export interface LanguageDropdownProps {
  className?: string;
}

export function LanguageDropdown({ className = "" }: LanguageDropdownProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("en") ? "en" : "id";
  const activeOption = LANGUAGE_OPTIONS.find((opt) => opt.code === currentLang) || LANGUAGE_OPTIONS[0];

  // Listener untuk menutup popover saat klik di luar elemen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: "id" | "en") => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Tombol Pemicu (Trigger Button) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="relative inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-neutral-200/80 bg-white/90 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 transition shadow-xs cursor-pointer select-none"
      >
        <span className="text-sm leading-none">{activeOption.flag}</span>
        <span className="font-mono text-[11px] font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          {activeOption.nativeLabel}
        </span>
        <ChevronDownIcon
          size={14}
          className={`text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Menu dengan Animasi Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 z-50 rounded-2xl border border-neutral-200/90 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-900/95"
          >
            <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800/60 mb-1">
              Select Language
            </div>

            <div className="space-y-0.5">
              {LANGUAGE_OPTIONS.map((option) => {
                const isSelected = option.code === currentLang;

                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => handleSelectLanguage(option.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                      isSelected
                        ? "bg-neutral-100 text-neutral-950 font-semibold dark:bg-neutral-800 dark:text-white"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm leading-none">{option.flag}</span>
                      <span>{option.label}</span>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                        ({option.nativeLabel})
                      </span>
                    </div>

                    {isSelected && (
                      <CheckIcon size={14} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
