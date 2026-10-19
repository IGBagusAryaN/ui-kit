import React, { useState } from "react";
import { MenuIcon, CloseIcon } from "../../src/icons";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageDropdown } from "./LanguageDropdown";
import { Sidebar, NavGroup } from "./Sidebar";

export type { NavGroup };

interface DocsLayoutProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  children: React.ReactNode;
  navGroups: NavGroup[];
}

export function DocsLayout({
  activePage,
  onSelectPage,
  children,
  navGroups,
}: DocsLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleMenuClick = (pageId: string) => {
    onSelectPage(pageId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cari label halaman yang sedang aktif untuk breadcrumb
  const currentItem = navGroups
    .flatMap((g) => g.items)
    .find((item) => item.id === activePage);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex flex-col">
      {/* Top Header (Fixed top-0 with high z-index z-50) */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/95">
        <div className="flex h-full items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition cursor-pointer"
            >
              {mobileSidebarOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>

            {/* Brand Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => handleMenuClick("installation")}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs text-sm">
                UI
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base tracking-tight text-neutral-950 dark:text-white">
                  @bgsaryzzz/ui
                </span>
                <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                  docs
                </span>
              </div>
            </div>
          </div>

          {/* Right Header: Version Pill & Theme Toggle */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-mono font-medium text-neutral-600 border border-neutral-200/80 dark:bg-neutral-900 dark:text-neutral-400 dark:border-neutral-800">
              v0.1.0
            </span>

            {/* Language Dropdown (ID / EN) */}
            <LanguageDropdown />

            {/* Animated Framer Motion Dark / Light Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container with pt-16 padding offset for fixed header */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto pt-16">
        {/* Mobile Backdrop Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-xs md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          onSelectPage={handleMenuClick}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          navGroups={navGroups}
        />

        {/* Right Main Content */}
        <main className="flex-1 w-full min-w-0 px-4 py-8 sm:px-8 lg:px-12">
          {/* Breadcrumb Info */}
          {currentItem && (
            <div className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
              <span>Docs</span>
              <span>/</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                {currentItem.label}
              </span>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
