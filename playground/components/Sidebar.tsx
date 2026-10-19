import React from "react";
import { useTranslation } from "react-i18next";

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
}

export function Sidebar({
  activePage,
  onSelectPage,
  isOpenMobile = false,
  onCloseMobile,
  navGroups: customNavGroups,
}: SidebarProps) {
  const { t } = useTranslation();

  // Daftar default jika tidak dioper secara eksplisit dari parent
  const defaultNavGroups: NavGroup[] = [
    {
      title: t("sidebar.gettingStarted", "Getting Started"),
      items: [
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
          id: "navbar-animation",
          label: t("sidebar.components.navbar", "Navbar"),
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

  const groups = customNavGroups && customNavGroups.length > 0 ? customNavGroups : defaultNavGroups;

  const handleMenuClick = (pageId: string) => {
    onSelectPage(pageId);
    if (onCloseMobile) {
      onCloseMobile();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 z-40 w-64 shrink-0 border-r border-neutral-200/80 bg-white/95 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/95 md:sticky md:top-16 md:z-30 md:h-[calc(100vh-4rem)] md:self-start md:overflow-y-auto md:translate-x-0 transition-transform duration-200 ${
        isOpenMobile ? "translate-x-0 shadow-xl" : "-translate-x-full"
      }`}
    >
      <nav className="h-full space-y-6 pb-8">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h4 className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {group.title}
            </h4>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left ${
                        isActive
                          ? "bg-neutral-100 text-neutral-950 font-semibold dark:bg-neutral-900 dark:text-white border-l-2 border-blue-600 pl-2.5 dark:border-blue-500"
                          : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-neutral-100"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
