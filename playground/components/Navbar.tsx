import React from "react";
import { MenuIcon, CloseIcon } from "../../src/icons";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageDropdown } from "./LanguageDropdown";

export interface NavbarProps {
  /** Callback saat tombol hamburger di layar mobile diklik */
  onToggleMobileMenu?: () => void;
  /** Status apakah menu navigasi mobile sedang terbuka */
  isMobileMenuOpen?: boolean;
  /** Callback saat logo / judul docs diklik */
  onLogoClick?: () => void;
  /** Teks label versi library (default: "v0.1.2") */
  version?: string;
  /** Class tambahan opsional */
  className?: string;
}

export function Navbar({
  onToggleMobileMenu,
  isMobileMenuOpen = false,
  onLogoClick,
  version = "v0.1.2",
  className = "",
}: NavbarProps) {
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors ${className}`}
    >
      <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Left Section: Mobile Hamburger & Tablet/Desktop Brand Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Tombol Hamburger: Muncul di layar mobile (< md) */}
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

          {/* Brand Logo: Disembunyikan HANYA di HP (< sm), tampil di tablet & desktop (sm:flex) */}
          <div
            className="hidden sm:flex items-center gap-2.5 cursor-pointer select-none min-w-0"
            onClick={onLogoClick}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs text-sm">
              UI
            </div>
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="font-bold text-base tracking-tight text-zinc-950 dark:text-white truncate">
                @bgsaryzzz/ui
              </span>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                docs
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Hanya Bahasa & Theme Toggle di HP (< sm), serta Versi di Tablet & Desktop */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-4 shrink-0">
          {/* Version badge: Disembunyikan di HP (< sm), tampil di tablet & desktop (sm:inline-flex) */}
          <span className="hidden sm:inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-mono font-medium text-zinc-600 border border-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
            {version}
          </span>

          {/* Language Selector (Tetap di Navbar untuk semua ukuran layar) */}
          <LanguageDropdown className="shrink-0" />

          {/* Theme Toggle (Tetap di Navbar untuk semua ukuran layar) */}
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
