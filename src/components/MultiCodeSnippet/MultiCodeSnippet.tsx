import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface CodeSnippetProps {
  /**
   * String kode yang akan ditampilkan dan disalin ke clipboard.
   */
  code?: string;
  /**
   * Dukungan backward-compatibility jika komponen menerima objek codeBlocks.
   */
  codeBlocks?: {
    react?: string;
    vue?: string;
    laravel?: string;
    [key: string]: any;
  };
  /**
   * ClassName utility Tailwind kustom untuk kontainer terluar.
   */
  className?: string;
}

/**
 * Komponen CodeSnippet Standar (Navbar / Button Spec):
 * - Wrapper: relative rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3.5 font-mono text-xs dark:border-neutral-800/80 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200
 * - Header: flex items-center justify-between mb-1.5 text-[11px] font-sans text-neutral-500 dark:text-neutral-400
 * - Tombol: rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white transition shadow-xs cursor-pointer
 * - Pre: overflow-x-auto m-0 py-1 text-[11px] leading-relaxed
 */
export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  codeBlocks,
  className = "",
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<boolean>(false);

  // Ambil string kode: props.code > props.codeBlocks.react > fallback string pertama
  const displayCode =
    code ??
    codeBlocks?.react ??
    (codeBlocks ? Object.values(codeBlocks).find((c) => typeof c === "string") : "") ??
    "";

  // Handler salin kode ke clipboard dengan feedback status
  const handleCopy = async () => {
    if (!displayCode) return;
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback jika API clipboard diblokir oleh browser
      const textArea = document.createElement("textarea");
      textArea.value = displayCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className={`relative rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3.5 font-mono text-xs dark:border-neutral-800/80 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-1.5 text-[11px] font-sans text-neutral-500 dark:text-neutral-400">
        <span className="font-medium">
          {t("common.usageSnippet", { defaultValue: "Usage Snippet" })}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white transition shadow-xs cursor-pointer"
        >
          {copied
            ? t("common.copied", { defaultValue: "✓ Disalin" })
            : t("common.copy", { defaultValue: "Salin" })}
        </button>
      </div>
      <pre className="overflow-x-auto m-0 py-1 text-[11px] leading-relaxed">
        <code>{displayCode}</code>
      </pre>
    </div>
  );
};

// Export alias untuk backward-compatibility
export const MultiCodeSnippet = CodeSnippet;
export type MultiCodeSnippetProps = CodeSnippetProps;
export default CodeSnippet;
