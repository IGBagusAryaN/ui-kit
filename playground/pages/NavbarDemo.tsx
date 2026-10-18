import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  EnterpriseNav,
  GlassHeader,
  PillNav,
  DropdownNav,
  SplitNav,
} from "../../src/components/NavbarAnimation";
import { SearchIcon } from "../../src/icons";

interface NavbarCardInfo {
  id: string;
  title: string;
  badge: string;
  description: string;
  snippet: string;
  render: (helpers: {
    glassScrolled: boolean;
    setGlassScrolled: (val: boolean) => void;
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
  }) => React.ReactNode;
}

export function NavbarDemo() {
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [glassScrolled, setGlassScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const navbarsList: NavbarCardInfo[] = useMemo(
    () => [
      {
        id: "enterprise-nav",
        title: t(
          "content.navbarDemo.items.enterprise.title",
          "1. SaaS Enterprise Header"
        ),
        badge: t(
          "content.navbarDemo.items.enterprise.badge",
          "Klasik Full-Width"
        ),
        description: t(
          "content.navbarDemo.items.enterprise.desc",
          "Layout standar enterprise: Logo di sisi kiri ekstrim, link menu proporsional di tengah dengan animasi garis bawah (underline) mulus menggunakan layoutId Framer Motion saat di-hover, dan grup tombol CTA (Log in & Start Free Trial) di kanan ekstrim."
        ),
        snippet: `<EnterpriseNav
  items={[
    { id: "platform", label: "Platform" },
    { id: "solutions", label: "Solutions" },
    { id: "enterprise", label: "Enterprise", badge: "New" },
    { id: "pricing", label: "Pricing" },
    { id: "resources", label: "Resources" },
  ]}
  activeId="platform"
  onLogin={() => console.log("Login")}
  onSignup={() => console.log("Sign up")}
/>`,
        render: () => (
          <div className="w-full rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 shadow-xs">
            <EnterpriseNav />
          </div>
        ),
      },
      {
        id: "glass-header",
        title: t(
          "content.navbarDemo.items.glass.title",
          "2. Sticky Glassmorphism"
        ),
        badge: t(
          "content.navbarDemo.items.glass.badge",
          "Menyusut & Efek Blur"
        ),
        description: t(
          "content.navbarDemo.items.glass.desc",
          "Navbar transparan full-width yang menempel di atas dengan efek backdrop-blur-md halus. Saat di-scroll ke bawah lebih dari 50px (simulasikan tombol di bawah), tinggi navbar menyusut dari 74px ke 58px dan garis border bawah menjadi lebih tegas."
        ),
        snippet: `<GlassHeader
  isScrolled={false} // Otomatis deteksi scrollY > 50px
  items={[
    { label: "Features" },
    { label: "Architecture" },
    { label: "Integrations" },
    { label: "Customers" },
  ]}
  onCtaClick={() => console.log("Get Started")}
/>`,
        render: ({ glassScrolled, setGlassScrolled }) => (
          <div className="w-full flex flex-col space-y-3">
            {/* Controls Bar Simulator */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 text-xs">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                {t(
                  "content.navbarDemo.items.glass.simulatorLabel",
                  "Simulasi Status Scroll:"
                )}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setGlassScrolled(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition ${
                    !glassScrolled
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {t(
                    "content.navbarDemo.items.glass.normalBtn",
                    "Normal (74px)"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setGlassScrolled(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition ${
                    glassScrolled
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {t(
                    "content.navbarDemo.items.glass.scrolledBtn",
                    "Scrolled (>50px / 58px)"
                  )}
                </button>
              </div>
            </div>

            {/* Navbar Preview Container with Simulated Content */}
            <div className="relative w-full rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 bg-gradient-to-b from-blue-50/30 to-purple-50/20 dark:from-neutral-900 dark:to-neutral-950 shadow-xs">
              <GlassHeader isScrolled={glassScrolled} />
              <div className="p-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
                <span>
                  {glassScrolled
                    ? "✨ Mode Scrolled: Navbar ramping (58px) dengan border tegas"
                    : "✨ Mode Normal: Navbar lapang (74px) dengan backdrop halus"}
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "pill-nav",
        title: t(
          "content.navbarDemo.items.pill.title",
          "3. Modern Floating Pill"
        ),
        badge: t(
          "content.navbarDemo.items.pill.badge",
          "Kapsul Melayang Tengah"
        ),
        description: t(
          "content.navbarDemo.items.pill.desc",
          "Navbar bergaya kapsul melayang (floating pill) dengan margin elegan dari tepi layar dan elevasi shadow lembut. Logo, deretan menu link, icon user account, dan tombol aksi berjejer rapi di dalam satu wadah kapsul."
        ),
        snippet: `<PillNav
  items={[
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "blog", label: "Blog" },
  ]}
  activeId="work"
  onCtaClick={() => console.log("Hire Me")}
/>`,
        render: () => (
          <div className="w-full py-6 rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/50 dark:bg-neutral-900/40 shadow-xs flex items-center justify-center">
            <PillNav />
          </div>
        ),
      },
      {
        id: "dropdown-nav",
        title: t(
          "content.navbarDemo.items.dropdown.title",
          "4. Stripe-Inspired Dropdown"
        ),
        badge: t(
          "content.navbarDemo.items.dropdown.badge",
          "Mega Popover Animasi"
        ),
        description: t(
          "content.navbarDemo.items.dropdown.desc",
          "Layout header full-width yang bersih dan rapi. Arahkan kursor ke menu 'Products' atau 'Developers' untuk memunculkan kotak dropdown mega-menu yang memanjang dinamis dengan animasi fade & slide down Framer Motion yang anggun."
        ),
        snippet: `<DropdownNav
  onLogin={() => console.log("Sign in")}
  onContactSales={() => console.log("Contact sales")}
/>`,
        render: () => (
          <div className="w-full flex flex-col space-y-2">
            <div className="w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 shadow-xs min-h-[220px]">
              <DropdownNav />
              <div className="p-8 text-center text-xs text-neutral-400">
                {t(
                  "content.navbarDemo.items.dropdown.hint",
                  "* Arahkan kursor (hover) pada menu Products atau Developers di atas."
                )}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "split-nav",
        title: t(
          "content.navbarDemo.items.split.title",
          "5. Split E-Commerce Header"
        ),
        badge: t(
          "content.navbarDemo.items.split.badge",
          "Arsitektur Dua Baris"
        ),
        description: t(
          "content.navbarDemo.items.split.desc",
          "Header e-commerce profesional dua baris: Baris atas tipis untuk teks pengumuman bebas ongkir dan pilihan bahasa, serta baris bawah untuk Logo toko, Search Bar lebar di tengah, dan barisan icon aksi (Notifikasi, Cart dengan badge counter, dan Akun Saya)."
        ),
        snippet: `<SplitNav
  announcement="⚡ Promo Spesial: Bebas Ongkir se-Indonesia untuk pesanan pertama!"
  cartCount={3}
  onSearch={(query) => console.log("Search:", query)}
  onCartClick={() => console.log("Open Cart")}
/>`,
        render: ({ cartCount, setCartCount }) => (
          <div className="w-full rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800/70 shadow-xs">
            <SplitNav
              cartCount={cartCount}
              onCartClick={() => setCartCount((c) => c + 1)}
            />
          </div>
        ),
      },
    ],
    [t]
  );

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return navbarsList;
    return navbarsList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [navbarsList, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Title Section */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.navbarDemo.badge", "Navigasi")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.navbarDemo.pageTitle", "Navbar Animation")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.navbarDemo.pageDesc",
            "Koleksi 5 variasi animasi navigasi dengan arsitektur, physics gesture, dan tata letak yang berbeda: mulai dari Floating Mac Dock, Magnetic Sliding Pill, Smart Glassmorphism, Morphing Circle, hingga Staggered Fullscreen."
          )}
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "content.navbarDemo.searchPlaceholder",
              "Cari tata letak navbar (contoh: 'enterprise', 'glass', 'pill', 'dropdown', 'ecommerce')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.navbarDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        {/* Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {t(
                "content.navbarDemo.collectionTitle",
                "Koleksi Tata Letak Web Header:"
              )}
            </span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.navbarDemo.showingCount", {
                count: filteredList.length,
                total: navbarsList.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${navbarsList.length} tata letak navigasi standar web modern.`,
              })}
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {t(
              "content.navbarDemo.statusBadge",
              "Responsive & Production Ready"
            )}
          </span>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.navbarDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan layout navbar dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.navbarDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      {/* 1 Column Vertical List (gap-14) for Full-Width Navigation Experience */}
      <div className="flex flex-col gap-14">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            {/* Header Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="w-full flex items-center justify-center p-4 sm:p-6 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 overflow-visible">
              {item.render({
                glassScrolled,
                setGlassScrolled,
                cartCount,
                setCartCount,
              })}
            </div>

            {/* Usage Code Snippet */}
            <div className="relative rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3.5 font-mono text-xs dark:border-neutral-800/80 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200">
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-sans text-neutral-500 dark:text-neutral-400">
                <span className="font-medium">
                  {t("content.navbarDemo.usageSnippet", "Usage Snippet")}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.snippet)}
                  className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white transition shadow-xs cursor-pointer"
                >
                  {copiedId === item.id
                    ? t("content.navbarDemo.copied", "✓ Disalin")
                    : t("content.navbarDemo.copy", "Salin")}
                </button>
              </div>
              <pre className="overflow-x-auto m-0 py-1 text-[11px] leading-relaxed">
                <code>{item.snippet}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
