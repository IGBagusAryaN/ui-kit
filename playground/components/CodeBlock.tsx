import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="group relative my-3 overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-50/70 transition-colors dark:border-neutral-800/80 dark:bg-neutral-900/40">
      {filename && (
        <div className="flex items-center justify-between border-b border-neutral-200/80 bg-neutral-100/60 px-4 py-2 text-xs font-mono text-neutral-600 dark:border-neutral-800/80 dark:bg-neutral-900/80 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-medium">{filename}</span>
          </div>
          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {language}
          </span>
        </div>
      )}

      <div className="relative p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-neutral-800 dark:text-neutral-200">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/90 px-2.5 py-1 text-xs font-sans font-medium text-neutral-600 shadow-xs transition hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
        <pre className="pr-16 m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
