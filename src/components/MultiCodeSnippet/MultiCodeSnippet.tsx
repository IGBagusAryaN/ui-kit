import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, CopyIcon } from "../../icons";

export type FrameworkKey = "react" | "vue" | "laravel" | string;

export interface MultiCodeSnippetProps {
  /**
   * Objek kode berdasarkan framework/bahasa.
   * Contoh: { react: "...", vue: "...", laravel: "..." }
   */
  codeBlocks: {
    react?: string;
    vue?: string;
    laravel?: string;
    [key: string]: string | undefined;
  };
  /** Tab awal yang aktif (default: "react") */
  defaultTab?: FrameworkKey;
  /** Judul opsional di header kiri (misal: "Usage Snippet" atau nama komponen) */
  title?: string;
  /** Label tombol copy (default: "Copy") */
  copyLabel?: string;
  /** Label status telah disalin (default: "Copied!") */
  copiedLabel?: string;
  /** Class kustom tambahan untuk kontainer terluar */
  className?: string;
}

interface FrameworkMeta {
  key: string;
  label: string;
  dotColor: string;
  badge: string;
}

const FRAMEWORK_METAS: Record<string, FrameworkMeta> = {
  react: {
    key: "react",
    label: "React",
    dotColor: "bg-sky-500 dark:bg-sky-400",
    badge: "JSX / TSX",
  },
  vue: {
    key: "vue",
    label: "Vue",
    dotColor: "bg-emerald-500 dark:bg-emerald-400",
    badge: "SFC 3",
  },
  laravel: {
    key: "laravel",
    label: "Laravel",
    dotColor: "bg-rose-500 dark:bg-rose-400",
    badge: "Blade",
  },
};

export const MultiCodeSnippet: React.FC<MultiCodeSnippetProps> = ({
  codeBlocks,
  defaultTab = "react",
  title,
  copyLabel = "Copy",
  copiedLabel = "Copied!",
  className = "",
}) => {
  // Ambil daftar tab yang memiliki kode valid
  const availableTabs = useMemo(() => {
    return Object.keys(codeBlocks).filter(
      (key) => typeof codeBlocks[key] === "string" && codeBlocks[key]!.trim().length > 0
    );
  }, [codeBlocks]);

  // Tab aktif (fallback ke tab pertama yang tersedia jika defaultTab tidak ada)
  const initialTab = availableTabs.includes(defaultTab)
    ? defaultTab
    : availableTabs[0] || "react";

  const [activeTab, setActiveTab] = useState<FrameworkKey>(initialTab);
  const [copied, setCopied] = useState<boolean>(false);

  // Ambil kode dari tab yang sedang aktif
  const currentCode = codeBlocks[activeTab] || "";

  // Handler salin ke clipboard
  const handleCopy = async () => {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback untuk browser lawas bila diperlukan
    }
  };

  return (
    <div
      className={`group relative mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-950 ${className}`}
    >
      {/* ===================================================================
       * HEADER TAB BAR & ACTION
       * =================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100/90 px-3.5 py-2 dark:border-zinc-800 dark:bg-zinc-900/90">
        {/* Sisi Kiri: Judul Opsional + Tab Navigasi Framework */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {title && (
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mr-1 sm:mr-2">
              {title}
            </span>
          )}

          {/* Deretan Tombol Tab Framework */}
          <div className="inline-flex items-center gap-1 rounded-lg bg-zinc-200/60 p-0.5 dark:bg-zinc-800/60">
            {availableTabs.map((tabKey) => {
              const meta = FRAMEWORK_METAS[tabKey] || {
                key: tabKey,
                label: tabKey.charAt(0).toUpperCase() + tabKey.slice(1),
                dotColor: "bg-indigo-500",
                badge: tabKey,
              };

              const isActive = activeTab === tabKey;

              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveTab(tabKey)}
                  className={`relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer select-none ${
                    isActive
                      ? "text-zinc-900 shadow-2xs dark:text-zinc-50 font-semibold"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40"
                  }`}
                >
                  {/* Sliding pill background active */}
                  {isActive && (
                    <motion.span
                      layoutId="activeFrameworkPill"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-md bg-white border border-zinc-200/80 dark:bg-zinc-800 dark:border-zinc-700 shadow-2xs -z-0"
                    />
                  )}

                  {/* Dot warna framework */}
                  <span
                    className={`relative z-10 h-1.5 w-1.5 rounded-full ${meta.dotColor}`}
                  />
                  {/* Label nama framework */}
                  <span className="relative z-10">{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sisi Kanan: Badge Ekstensi & Tombol Copy Sejajar */}
        <div className="flex items-center gap-2">
          {/* Badge format aktif (opsional) */}
          {FRAMEWORK_METAS[activeTab]?.badge && (
            <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {FRAMEWORK_METAS[activeTab].badge}
            </span>
          )}

          {/* Tombol Copy Interaktif */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy active code"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200/90 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-600 shadow-2xs transition active:scale-95 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-700/90 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
          >
            {copied ? (
              <>
                <CheckIcon size={13} className="text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {copiedLabel}
                </span>
              </>
            ) : (
              <>
                <CopyIcon size={13} className="opacity-75" />
                <span>{copyLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================================
       * BODY KODE DENGAN TRANSISI INSTAN (150ms)
       * =================================================================== */}
      <div className="relative min-h-[90px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="p-4 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-800 dark:text-zinc-300"
          >
            <pre className="m-0 p-0 font-mono">
              <code>{currentCode}</code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

