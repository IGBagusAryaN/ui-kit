import React, { useState, useRef, useEffect } from "react";

export interface IconCardProps {
  /**
   * Nama komponen ikon (misal: "ActivityIcon", "SearchIcon")
   */
  name: string;
  /**
   * Elemen ikon aktual yang dirender (ReactNode)
   */
  icon: React.ReactNode;
  /**
   * Kode raw SVG (string) untuk disalin saat "Copy SVG" diklik
   */
  svgContent?: string;
  /**
   * Tag pemanggilan JSX komponen (string) untuk disalin saat "Copy JSX" diklik
   */
  jsxContent?: string;
  /**
   * Callback opsional saat salah satu format berhasil disalin
   */
  onCopy?: (format: "svg" | "jsx", content: string) => void;
  /**
   * ClassName utility Tailwind tambahan untuk kontainer card
   */
  className?: string;
}

export type CopiedState = "idle" | "svg" | "jsx";

/**
 * IconCard Component
 *
 * Komponen pembungkus ikon untuk dokumentasi UI Kit.
 * - Idle: Menampilkan ikon di tengah dan nama komponen di bawah.
 * - Hover: Memunculkan overlay dual-button ("Copy SVG" & "Copy JSX").
 * - Copied: Menampilkan overlay gelap dengan ikon centang & teks "Copied!" selama 2 detik.
 */
export const IconCard: React.FC<IconCardProps> = ({
  name,
  icon,
  svgContent,
  jsxContent,
  onCopy,
  className = "",
}) => {
  const [copiedState, setCopiedState] = useState<CopiedState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fallback otomatis jika svgContent atau jsxContent tidak dioper secara eksplisit
  const resolvedJsxContent = jsxContent || `<${name} size={24} />`;
  const resolvedSvgContent =
    svgContent ||
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${name}">\n  <!-- ${name} SVG -->\n</svg>`;

  // Bersihkan timeout saat komponen unmount untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handler salin ke clipboard
  const handleCopy = async (format: "svg" | "jsx", e: React.MouseEvent) => {
    e.stopPropagation();
    const content = format === "svg" ? resolvedSvgContent : resolvedJsxContent;

    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // Fallback untuk browser dengan hak akses clipboard terbatas
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopiedState(format);
    onCopy?.(format, content);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopiedState("idle");
    }, 2000);
  };

  return (
    <div
      className={`relative group flex flex-col items-center justify-center p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 transition-all overflow-hidden ${className}`}
    >
      {/* ===================================================================
       * 1. DEFAULT VIEW (IDLE)
       * =================================================================== */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* Ikon di Tengah */}
        <div className="flex items-center justify-center h-12 w-12 text-zinc-700 dark:text-zinc-300 transition-transform duration-200 group-hover:scale-110 mb-3">
          {icon}
        </div>

        {/* Nama Komponen Ikon */}
        <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 truncate max-w-full text-center px-1 select-none">
          {name}
        </span>
      </div>

      {/* ===================================================================
       * 2. HOVER OVERLAY (DUAL-BUTTONS: "Copy SVG" & "Copy JSX")
       * =================================================================== */}
      {copiedState === "idle" && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col transition-opacity bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10">
          {/* Tombol Atas: Copy SVG */}
          <button
            type="button"
            onClick={(e) => handleCopy("svg", e)}
            className="flex-1 flex items-center justify-center gap-1.5 w-full text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors cursor-pointer select-none"
            title={`Copy raw SVG code for ${name}`}
          >
            <svg
              className="w-3.5 h-3.5 opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Copy SVG</span>
          </button>

          {/* Tombol Bawah: Copy JSX */}
          <button
            type="button"
            onClick={(e) => handleCopy("jsx", e)}
            className="flex-1 flex items-center justify-center gap-1.5 w-full text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 transition-colors cursor-pointer select-none"
            title={`Copy React JSX code for <${name} />`}
          >
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
            <span>Copy JSX</span>
          </button>
        </div>
      )}

      {/* ===================================================================
       * 3. COPIED STATE (FULL CARD DARK OVERLAY DENGAN IKON CENTANG & TEKS HIJAU)
       * =================================================================== */}
      {copiedState !== "idle" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-zinc-900 dark:bg-zinc-100 transition-all animate-in fade-in zoom-in-95 duration-150 select-none">
          {/* Ikon Centang Hijau */}
          <svg
            className="w-6 h-6 text-emerald-500 animate-in zoom-in-50 duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>

          {/* Label Teks Copied Hijau */}
          <span className="text-xs font-bold text-emerald-500 tracking-wide">
            {copiedState === "svg" ? "SVG Copied!" : "JSX Copied!"}
          </span>
        </div>
      )}
    </div>
  );
};

export default IconCard;

