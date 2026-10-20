import React, { useState } from "react";
import { Navbar } from "./Navbar";
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
      {/* Top Navbar */}
      <Navbar
        onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobileMenuOpen={mobileSidebarOpen}
        onLogoClick={() => handleMenuClick("introduction")}
        version="v0.1.2"
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
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
          version="v0.1.2"
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
