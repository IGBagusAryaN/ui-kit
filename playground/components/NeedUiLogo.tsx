import React from "react";
import { cn } from "../../src/utils/cn";

export interface NeedUiLogoProps {
  /**
   * Ukuran preset logo yang selaras dengan komponen navigasi.
   * - "sm": h-7 w-7 (Mobile drawer header)
   * - "md": h-8 w-8 (Navbar header)
   * - "lg": h-10 w-10 (Hero / splash)
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * ClassName Tailwind opsional untuk override styling kontainer
   */
  className?: string;
}

const SIZE_MAP = {
  sm: "h-7 w-7 rounded-lg",
  md: "h-8 w-8 rounded-xl",
  lg: "h-10 w-10 rounded-2xl",
} as const;

/**
 * NeedUiLogo
 *
 * Komponen logo resmi NeedUI dengan dukungan otomatis mode Light & Dark.
 * Menggunakan aset logo berkualitas tinggi berlatar blueprint grid halus
 * yang selaras dengan estetika modern NeedUI.
 */
export const NeedUiLogo: React.FC<NeedUiLogoProps> = ({
  size = "md",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center justify-center select-none bg-zinc-50 dark:bg-zinc-950 transition-all",
        SIZE_MAP[size] || SIZE_MAP.md,
        className
      )}
    >
      <img
        src="/logo-light-square-bg.png"
        alt="needui logo"
        className="w-full h-full object-cover block dark:hidden"
        loading="eager"
      />

      <img
        src="/logo-dark-square-bg.png"
        alt="needui logo"
        className="w-full h-full object-cover hidden dark:block"
        loading="eager"
      />
    </div>
  );
};

export default NeedUiLogo;
