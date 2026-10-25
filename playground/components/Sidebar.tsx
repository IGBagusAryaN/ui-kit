import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../src/icons";
import { NeedUiLogo } from "./NeedUiLogo";
import { APP_VERSION } from "../version";
import { cn } from "../../src/utils/cn";

export interface NavItem {
  id: string;
  label: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface SidebarProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  navGroups?: NavGroup[];
  version?: string;
}

export function Sidebar({
  activePage,
  onSelectPage,
  isOpenMobile = false,
  onCloseMobile,
  navGroups: customNavGroups,
  version = APP_VERSION,
}: SidebarProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isMac =
    typeof navigator !== "undefined" &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

  const defaultNavGroups: NavGroup[] = [
    {
      title: t("sidebar.gettingStarted", "Getting Started"),
      items: [
        {
          id: "introduction",
          label: t("sidebar.introduction", "Introduction"),
        },
        {
          id: "installation",
          label: t("sidebar.installation", "Installation"),
        },
      ],
    },
    {
      title: t("sidebar.components.title", "Components"),
      items: [
        {
          id: "button-animation",
          label: t("sidebar.components.button", "Button"),
        },
        {
          id: "advanced-buttons",
          label: t("sidebar.components.advancedButtons", "Buttons"),
        },
        {
          id: "navbar-animation",
          label: t("sidebar.components.navbar", "Navbar"),
        },
        {
          id: "dropdown-animation",
          label: t("sidebar.components.dropdown", "Dropdown"),
        },
        {
          id: "toast-animation",
          label: t("sidebar.components.toast", "Toast"),
        },
        {
          id: "modal-animation",
          label: t("sidebar.components.modal", "Modal"),
        },
        {
          id: "marquee-animation",
          label: t("sidebar.components.marquee", "Marquee"),
        },
        {
          id: "timeline-animation",
          label: t("sidebar.components.timeline", "Timeline"),
        },
        {
          id: "pagination-animation",
          label: t("sidebar.components.pagination", "Pagination"),
        },
      ],
    },
    {
      title: t("sidebar.icons.title", "Icons"),
      items: [
        {
          id: "web-icons",
          label: t("sidebar.icons.icons", "Icons"),
        },
      ],
    },
  ];

  const groups =
    customNavGroups && customNavGroups.length > 0
      ? customNavGroups
      : defaultNavGroups;

  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchQuery]);

  const handleMenuClick = (pageId: string) => {
    onSelectPage(pageId);
    if (onCloseMobile) {
      onCloseMobile();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shrink-0 border-r border-neutral-200/80 bg-white p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950 md:sticky md:top-16 md:z-30 md:h-[calc(100vh-4rem)] md:w-64 md:translate-x-0 md:shadow-none flex flex-col transition-transform duration-200 ${
        isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="flex md:hidden items-center justify-between pb-3.5 mb-3 border-b border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => handleMenuClick("introduction")}
        >
          <NeedUiLogo size="sm" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-white">
              needui
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-600 border border-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
              {version}
            </span>
          </div>
        </div>

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900 transition active:scale-95 cursor-pointer"
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>

      <div className="sticky top-0 z-10 pb-3 mb-3 shrink-0 bg-white dark:bg-neutral-950 border-b border-zinc-200/70 dark:border-zinc-800/70">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("sidebar.searchPlaceholder", "Search...")}
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md py-2 pl-9 pr-12 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
              <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto pr-1 space-y-6 pb-4">
        {filteredGroups.length === 0 ? (
          /* Empty Search State */
          <div className="py-8 px-2 text-center space-y-2.5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No components found for{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                "{searchQuery}"
              </span>
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h4 className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {group.title}
              </h4>
              <ul className="space-y-0.5">
                {filteredGroups.length > 0 &&
                  group.items.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <li key={item.id} className="relative">
                        <button
                          type="button"
                          onClick={() => handleMenuClick(item.id)}
                          className={cn(
                            "relative w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left select-none cursor-pointer group",
                            isActive
                              ? "text-neutral-950 dark:text-white font-semibold"
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-900/60"
                          )}
                        >
                          {isActive && (
                            /* Fluid Sliding Active Pill Background (Smooth spring physics, no ugly edge strip) */
                            <motion.div
                              layoutId="sidebarActiveBackground"
                              className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                            />
                          )}

                          <span className="relative z-10 truncate">
                            {item.label}
                          </span>

                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.15 }}
                              className="relative z-10 flex items-center text-neutral-400 dark:text-neutral-500 shrink-0 ml-2"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </motion.span>
                          )}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
