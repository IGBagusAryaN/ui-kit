import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/ThemeProvider";
import { DocsLayout, NavGroup } from "./components/DocsLayout";
import { InstallationPage } from "./pages/InstallationPage";
import { ButtonAnimationPage } from "./pages/ButtonAnimationPage";
import { SearchAnimationPage } from "./pages/SearchAnimationPage";
import { NavbarAnimationPage } from "./pages/NavbarAnimationPage";
import { WebIconsPage } from "./pages/WebIconsPage";
import { ToastAnimationPage } from "./pages/ToastAnimationPage";
import { ModalAnimationPage } from "./pages/ModalAnimationPage";
import { MarqueeAnimationPage } from "./pages/MarqueeAnimationPage";
import { TimelineAnimationPage } from "./pages/TimelineAnimationPage";
import { ToastProvider } from "../src/components/ToastAnimation";

export function App() {
  const { t } = useTranslation();

  const navGroups: NavGroup[] = useMemo(
    () => [
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
    ],
    [t]
  );

  // Ambil initial page dari URL hash jika ada (misal #button-animation), default ke "installation"
  const getInitialPage = () => {
    const hash = window.location.hash.replace("#", "");
    const allPageIds = [
      "installation",
      "button-animation",
      "navbar-animation",
      "toast-animation",
      "modal-animation",
      "marquee-animation",
      "timeline-animation",
      "web-icons",
      "search-animation",
    ];
    return allPageIds.includes(hash) ? hash : "installation";
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
      case "installation":
        return <InstallationPage />;
      case "button-animation":
        return <ButtonAnimationPage />;
      case "search-animation":
        return <SearchAnimationPage />;
      case "navbar-animation":
        return <NavbarAnimationPage />;
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
        return <InstallationPage />;
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

