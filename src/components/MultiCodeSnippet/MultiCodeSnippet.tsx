import React, { useState } from "react";

export interface MultiCodeSnippetProps {
  /**
   * String kode langsung (single snippet mode)
   */
  code?: string;
  /**
   * Blok kode multi-framework (React, Vue, Laravel)
   */
  codeBlocks?: {
    react?: string;
    vue?: string;
    laravel?: string;
    [key: string]: string | undefined;
  };
  /**
   * Judul opsional di header blok kode
   */
  title?: string;
  /**
   * ClassName utility Tailwind kustom untuk kontainer terluar
   */
  className?: string;
}

export type FrameworkTab = "react" | "vue" | "laravel" | string;

export const MultiCodeSnippet: React.FC<MultiCodeSnippetProps> = ({
  code,
  codeBlocks,
  title,
  className = "",
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const availableTabs = codeBlocks
    ? (Object.keys(codeBlocks).filter(
        (key) => Boolean(codeBlocks[key])
      ) as FrameworkTab[])
    : [];

  const hasMultipleTabs = availableTabs.length > 1;

  const [activeTab, setActiveTab] = useState<FrameworkTab>(
    availableTabs.includes("react")
      ? "react"
      : availableTabs[0] ?? "react"
  );

  const currentCode =
    (codeBlocks && codeBlocks[activeTab]) ||
    code ||
    (codeBlocks?.react ?? "");

  const getTabLabel = (tab: string) => {
    const key = tab.toLowerCase();
    switch (key) {
      case "usage":
        return "Usage";
      case "source":
        return "Component Source";
      case "installation":
        return "Installation";
      case "code":
        return "Code";
      case "preview":
        return "Preview";
      case "react":
        return "React";
      case "vue":
        return "Vue 3";
      case "laravel":
        return "Laravel (Blade)";
      default:
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    }
  };

  const handleCopy = async () => {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = currentCode;
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
      className={`relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-mono text-xs shadow-xs transition-colors ${className}`}
    >
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 select-none">
        <div className="flex items-center gap-2">
          {title && (
            <span className="font-sans text-xs font-semibold text-zinc-700 dark:text-zinc-300 mr-2">
              {title}
            </span>
          )}

          {hasMultipleTabs && (
            <div className="flex items-center gap-1 bg-zinc-200/70 dark:bg-zinc-800/80 p-0.5 rounded-lg">
              {availableTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {getTabLabel(tab)}
                  </button>
                );
              })}
            </div>
          )}

          {!hasMultipleTabs && !title && (
            <span className="font-sans text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              "Usage Snippet"
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition cursor-pointer"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-emerald-600 dark:text-emerald-400">
                "Copied!"
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5 opacity-70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>"Copy"</span>
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 m-0 text-[11px] leading-relaxed text-zinc-800 dark:text-zinc-300 font-mono">
        <code>{currentCode}</code>
      </pre>
    </div>
  );
};

// Aliases for backward compatibility
export const CodeSnippet = MultiCodeSnippet;
export type CodeSnippetProps = MultiCodeSnippetProps;
export default MultiCodeSnippet;
