import React from "react";
import { MenuIcon, CloseIcon } from "../../src/icons";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageDropdown } from "./LanguageDropdown";
import { NeedUiLogo } from "./NeedUiLogo";
import { APP_VERSION } from "../version";

export interface NavbarProps {
  /** Callback saat tombol hamburger di layar mobile diklik */
  onToggleMobileMenu?: () => void;
  /** Status apakah menu navigasi mobile sedang terbuka */
  isMobileMenuOpen?: boolean;
  /** Callback saat logo / judul docs diklik */
  onLogoClick?: () => void;
  /** Teks label versi library (default dari package.json) */
  version?: string;
  /** Class tambahan opsional */
  className?: string;
}

export function Navbar({
  onToggleMobileMenu,
  isMobileMenuOpen = false,
  onLogoClick,
  version = APP_VERSION,
  className = "",
}: NavbarProps) {
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors ${className}`}
    >
      <div className="flex h-14 md:h-16 items-center justify-between px-4  max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 min-w-0">
          {onToggleMobileMenu && (
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={onToggleMobileMenu}
              className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition active:scale-95 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={18} />
              ) : (
                <MenuIcon size={18} />
              )}
            </button>
          )}

          <div
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0"
            onClick={onLogoClick}
          >
            <NeedUiLogo size="md" />
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="font-bold text-base tracking-tight text-zinc-950 dark:text-white truncate">
                needui
              </span>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                docs
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-4 shrink-0">
          <span className="hidden sm:inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-mono font-medium text-zinc-600 border border-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
            {version}
          </span>

          <LanguageDropdown className="shrink-0" />

          <div className="shrink-0">
            <span className="hidden sm:inline-block">
              <ThemeToggle showLabel={true} size="md" />
            </span>
            <span className="inline-block sm:hidden">
              <ThemeToggle showLabel={false} size="sm" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
