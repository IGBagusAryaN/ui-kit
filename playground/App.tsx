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
import { AnimatedTimelineDemo } from "./pages/AnimatedTimelineDemo";
import { DropdownPage } from "./pages/DropdownPage";
import { AnimatedAccordionDemo } from "./pages/AnimatedAccordionDemo";
import { AdvancedCarouselDemo } from "./pages/AdvancedCarouselDemo";
import { AutoCarouselDemo } from "./pages/AutoCarouselDemo";
import { AnimatedDatepickerDemo } from "./pages/AnimatedDatepickerDemo";
import { AnimatedTabsDemo } from "./pages/AnimatedTabsDemo";
import { AnimatedToggleDemo } from "./pages/AnimatedToggleDemo";
import { ToastProvider } from "../src/components/ToastAnimation";
import { FloatingFeedback } from "./components/FloatingFeedback";

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

          {
            id: "advanced-buttons",
            label: t("sidebar.components.advancedButtons", "Advanced Buttons"),
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
            id: "dropdown-animation",
            label: t("sidebar.components.dropdown", "Dropdown"),
          },
          {
            id: "accordion-animation",
            label: t("sidebar.components.accordion", "Accordion"),
          },
          {
            id: "carousel-animation",
            label: t("sidebar.components.carousel", "Carousel"),
          },
          {
            id: "auto-carousel-animation",
            label: t("sidebar.components.autoCarousel", "Auto Carousel"),
          },
          {
            id: "datepicker-animation",
            label: t("sidebar.components.datepicker", "Animated Datepicker"),
          },
          {
            id: "tabs-animation",
            label: t("sidebar.components.tabs", "Animated Tabs"),
          },
          {
            id: "toggle-animation",
            label: t("sidebar.components.toggle", "Animated Toggle"),
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

  const getInitialPage = () => {
    const hash = window.location.hash.replace("#", "");
    const allPageIds = [
      "introduction",
      "installation",
      "button-animation",
      "advanced-buttons",
      "navbar-animation",
      "dropdown-animation",
      "accordion-animation",
      "carousel-animation",
      "auto-carousel-animation",
      "datepicker-animation",
      "tabs-animation",
      "toggle-animation",
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

  const handleSelectPage = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

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
      case "accordion-animation":
        return <AnimatedAccordionDemo />;
      case "carousel-animation":
        return <AdvancedCarouselDemo />;
      case "auto-carousel-animation":
        return <AutoCarouselDemo />;
      case "datepicker-animation":
        return <AnimatedDatepickerDemo />;
      case "tabs-animation":
        return <AnimatedTabsDemo />;
      case "toggle-animation":
        return <AnimatedToggleDemo />;
      case "toast-animation":
        return <ToastAnimationPage />;
      case "modal-animation":
        return <ModalAnimationPage />;
      case "marquee-animation":
        return <MarqueeAnimationPage />;
      case "timeline-animation":
        return <AnimatedTimelineDemo />;
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
        <FloatingFeedback />
      </ToastProvider>
    </ThemeProvider>
  );
}
