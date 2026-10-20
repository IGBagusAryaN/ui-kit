import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/ThemeProvider";
import { DocsLayout, NavGroup } from "./components/DocsLayout";
import { Introduction } from "./pages/Introduction";
import { InstallationPage } from "./pages/InstallationPage";
import { ButtonAnimationPage } from "./pages/ButtonAnimationPage";
import { AdvancedButtonsDemo } from "./pages/AdvancedButtonsDemo";
import { SearchAnimationPage } from "./pages/SearchAnimationPage";
import { NavbarAnimationPage } from "./pages/NavbarAnimationPage";
import { WebIconsPage } from "./pages/WebIconsPage";
import { ToastAnimationPage } from "./pages/ToastAnimationPage";
import { ModalAnimationPage } from "./pages/ModalAnimationPage";
import { MarqueeAnimationPage } from "./pages/MarqueeAnimationPage";
import { TimelineAnimationPage } from "./pages/TimelineAnimationPage";
import { DropdownPage } from "./pages/DropdownPage";
import { ToastProvider } from "../src/components/ToastAnimation";

export function App() {
  const { t } = useTranslation();

  const navGroups: NavGroup[] = useMemo(
    () => [
      {
        title: t("sidebar.gettingStarted", "Get Started"),
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
          // {
          //   id: "button-animation",
          //   label: t("sidebar.components.button", "Button"),
          // },
          {
            id: "advanced-buttons",
            label: t("sidebar.components.advancedButtons", "Advanced Buttons"),
          },
          // {
          //   id: "navbar-animation",
          //   label: t("sidebar.components.navbar", "Navbar"),
          // },
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
            id: "dropdown-animation",
            label: t("sidebar.components.dropdown", "Dropdown"),
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
    ],
    [t]
  );

  // Ambil initial page dari URL hash jika ada (misal #button-animation), default ke "introduction"
  const getInitialPage = () => {
    const hash = window.location.hash.replace("#", "");
    const allPageIds = [
      "introduction",
      "installation",
      "button-animation",
      "advanced-buttons",
      "navbar-animation",
      "dropdown-animation",
      "toast-animation",
      "modal-animation",
      "marquee-animation",
      "timeline-animation",
      "web-icons",
      "search-animation",
    ];
    return allPageIds.includes(hash) ? hash : "introduction";
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);

  // Sync state dengan URL hash
  const handleSelectPage = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  // Dengarkan event hashchange (misal tombol Back/Forward browser ditekan)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActivePage(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Render halaman sesuai activePage
  const renderContent = () => {
    switch (activePage) {
      case "introduction":
        return <Introduction onNavigate={handleSelectPage} />;
      case "installation":
        return <InstallationPage />;
      case "button-animation":
        return <ButtonAnimationPage />;
      case "advanced-buttons":
        return <AdvancedButtonsDemo />;
      case "search-animation":
        return <SearchAnimationPage />;
      case "navbar-animation":
        return <NavbarAnimationPage />;
      case "dropdown-animation":
        return <DropdownPage />;
      case "toast-animation":
        return <ToastAnimationPage />;
      case "modal-animation":
        return <ModalAnimationPage />;
      case "marquee-animation":
        return <MarqueeAnimationPage />;
      case "timeline-animation":
        return <TimelineAnimationPage />;
      case "web-icons":
        return <WebIconsPage />;
      default:
        return <Introduction onNavigate={handleSelectPage} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <ToastProvider position="bottom-right" defaultDuration={4000}>
        <DocsLayout
          activePage={activePage}
          onSelectPage={handleSelectPage}
          navGroups={navGroups}
        >
          {renderContent()}
        </DocsLayout>
      </ToastProvider>
    </ThemeProvider>
  );
}
