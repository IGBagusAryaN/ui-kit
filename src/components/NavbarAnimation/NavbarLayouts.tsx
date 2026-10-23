import {
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  BellIcon,
  ChevronDownIcon,
  ShieldIcon,
  CreditCardIcon,
  ReceiptIcon,
  FileTextIcon,
  SettingsIcon,
} from "../../icons";

export interface EnterpriseNavItem {
  id: string;
  label: string;
  href?: string;
  badge?: string;
}

export interface EnterpriseNavProps {
  brand?: ReactNode;
  items?: EnterpriseNavItem[];
  activeId?: string;
  onItemClick?: (item: EnterpriseNavItem) => void;
  onLogin?: () => void;
  onSignup?: () => void;
  className?: string;
}

const DEFAULT_ENTERPRISE_ITEMS: EnterpriseNavItem[] = [
  { id: "platform", label: "Platform" },
  { id: "solutions", label: "Solutions" },
  { id: "enterprise", label: "Enterprise", badge: "New" },
];

export function EnterpriseNav({
  brand,
  items = DEFAULT_ENTERPRISE_ITEMS,
  activeId = "platform",
  onItemClick,
  onLogin,
  onSignup,
  className,
}: EnterpriseNavProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(activeId);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/95 transition-colors",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 shrink-0">
          {brand || (
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="h-8 w-8 rounded-xl bg-neutral-950 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 font-black text-sm shadow-sm">
                ▲
              </div>
              <span className="font-bold text-base tracking-tight text-neutral-950 dark:text-white">
                needui
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                Enterprise
              </span>
            </div>
          )}
        </div>

        <nav
          onMouseLeave={() => setHoveredId(null)}
          className="hidden md:flex items-center gap-1 relative h-full"
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isSelected = selectedId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  onItemClick?.(item);
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                className="relative h-16 px-4 flex items-center gap-1.5 text-xs lg:text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer select-none"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}

                {(isHovered || isSelected) && (
                  <motion.div
                    layoutId="enterprise-nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onLogin}
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-98 shadow-sm shadow-blue-500/20 transition cursor-pointer"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export interface GlassHeaderProps {
  brand?: ReactNode;
  items?: { label: string; href?: string }[];
  /** Simulasi state scrolled (>50px) jika dijalankan dalam demo statis */
  isScrolled?: boolean;
  className?: string;
  onCtaClick?: () => void;
}

export function GlassHeader({
  brand,
  items = [
    { label: "Features" },
    { label: "Architecture" },
    { label: "Integrations" },
    { label: "Customers" },
  ],
  isScrolled: controlledScrolled,
  className,
  onCtaClick,
}: GlassHeaderProps) {
  const { scrollY } = useScroll();
  const [internalScrolled, setInternalScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (controlledScrolled === undefined) {
      setInternalScrolled(latest > 50);
    }
  });

  const isScrolled =
    controlledScrolled !== undefined ? controlledScrolled : internalScrolled;

  return (
    <motion.header
      animate={{
        height: isScrolled ? 58 : 74,
      }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300 flex items-center",
        isScrolled
          ? "border-b border-neutral-200/90 bg-white/80 shadow-sm backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-950/80"
          : "border-b border-neutral-200/40 bg-white/40 backdrop-blur-md dark:border-neutral-800/40 dark:bg-neutral-950/40",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {brand || (
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-xs font-black shadow-md shadow-cyan-500/20">
                ✦
              </span>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-white">
                needui
              </span>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href || "#"}
              className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCtaClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition cursor-pointer shadow-sm"
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export interface PillNavProps {
  brand?: ReactNode;
  items?: { label: string; href?: string; active?: boolean }[];
  className?: string;
  onUserClick?: () => void;
  onCtaClick?: () => void;
}

export function PillNav({
  brand,
  items = [
    { label: "Home", active: true },
    { label: "Showcase" },
    { label: "Docs" },
    { label: "Pricing" },
    { label: "Blog" },
  ],
  className,
  onUserClick,
  onCtaClick,
}: PillNavProps) {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className={cn("w-full flex justify-center py-4 px-4", className)}>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-full border border-neutral-200/90 bg-white/90 px-3.5 py-2 shadow-lg shadow-neutral-500/5 backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-900/90 dark:shadow-black/20 flex items-center justify-between gap-4 transition-colors"
      >
        <div className="flex items-center gap-2.5 pl-2 cursor-pointer">
          {brand || (
            <>
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                P
              </div>
              <span className="font-bold text-sm tracking-tight text-neutral-950 dark:text-white">
                needui
              </span>
            </>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1">
          {items.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer",
                  isActive
                    ? "bg-neutral-100 text-neutral-950 font-semibold dark:bg-neutral-800 dark:text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/50"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pr-1">
          <button
            type="button"
            onClick={onUserClick}
            title="Profil Pengguna"
            className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition cursor-pointer"
          >
            <UserIcon size={16} />
          </button>
          <button
            type="button"
            onClick={onCtaClick}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-500/20 transition cursor-pointer"
          >
            Connect
          </button>
        </div>
      </motion.nav>
    </div>
  );
}

interface DropdownSection {
  title: string;
  icon: ReactNode;
  desc: string;
}

export interface DropdownNavProps {
  brand?: ReactNode;
  className?: string;
  onActionClick?: () => void;
}

const PRODUCTS_DATA: DropdownSection[] = [
  {
    title: "Payments & Invoicing",
    icon: <CreditCardIcon size={18} className="text-blue-500" />,
    desc: "Global payment processing with zero setup friction.",
  },
  {
    title: "Fraud & Risk Shield",
    icon: <ShieldIcon size={18} className="text-emerald-500" />,
    desc: "AI-driven radar detecting anomaly card behavior.",
  },
  {
    title: "Tax & Compliance",
    icon: <ReceiptIcon size={18} className="text-violet-500" />,
    desc: "Automated VAT and sales tax collection globally.",
  },
  {
    title: "Reporting Engine",
    icon: <FileTextIcon size={18} className="text-amber-500" />,
    desc: "Instant ledger and cashflow reconciliation.",
  },
];

const DEVELOPERS_DATA: DropdownSection[] = [
  {
    title: "Documentation",
    icon: <FileTextIcon size={18} className="text-blue-500" />,
    desc: "Quickstart guides, libraries, and interactive SDKs.",
  },
  {
    title: "REST & GraphQL APIs",
    icon: <SettingsIcon size={18} className="text-cyan-500" />,
    desc: "Full endpoint documentation with live testing keys.",
  },
];

export function DropdownNav({
  brand,
  className,
  onActionClick,
}: DropdownNavProps) {
  const [activeMenu, setActiveMenu] = useState<"products" | "developers" | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: "products" | "developers") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "relative w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/95 transition-colors z-30",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 shrink-0">
          {brand || (
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                needui
              </span>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-2 h-full">
          <div
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
            className="relative h-full flex items-center"
          >
            <button
              type="button"
              className={cn(
                "px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer",
                activeMenu === "products"
                  ? "text-blue-600 dark:text-blue-400 bg-neutral-100 dark:bg-neutral-900"
                  : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              <span>Products</span>
              <ChevronDownIcon
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  activeMenu === "products" && "rotate-180"
                )}
              />
            </button>
          </div>

          <div
            onMouseEnter={() => handleMouseEnter("developers")}
            onMouseLeave={handleMouseLeave}
            className="relative h-full flex items-center"
          >
            <button
              type="button"
              className={cn(
                "px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer",
                activeMenu === "developers"
                  ? "text-blue-600 dark:text-blue-400 bg-neutral-100 dark:bg-neutral-900"
                  : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              <span>Developers</span>
              <ChevronDownIcon
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  activeMenu === "developers" && "rotate-180"
                )}
              />
            </button>
          </div>

          <a
            href="#pricing"
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#company"
            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            Company
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onActionClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="absolute top-16 left-0 right-0 flex justify-center px-4 pointer-events-auto"
          >
            <div className="w-full max-w-2xl rounded-2xl border border-neutral-200/90 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-900/95 transition-all">
              {activeMenu === "products" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRODUCTS_DATA.map((item) => (
                    <a
                      key={item.title}
                      href="#item"
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition"
                    >
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:scale-105 transition-transform shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {activeMenu === "developers" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DEVELOPERS_DATA.map((item) => (
                    <a
                      key={item.title}
                      href="#dev"
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition"
                    >
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:scale-105 transition-transform shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export interface SplitNavProps {
  announcement?: string;
  cartCount?: number;
  onSearch?: (q: string) => void;
  onCartClick?: () => void;
  className?: string;
}

export function SplitNav({
  announcement = "⚡ Promo Spesial: Bebas Ongkir se-Indonesia untuk pesanan pertama!",
  cartCount = 3,
  onSearch,
  onCartClick,
  className,
}: SplitNavProps) {
  const [query, setQuery] = useState("");

  return (
    <header
      className={cn(
        "w-full bg-white dark:bg-neutral-950 transition-colors",
        className
      )}
    >
      <div className="w-full border-b border-neutral-200/80 bg-neutral-50 dark:border-neutral-800/80 dark:bg-neutral-900/60 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span>{announcement}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 font-medium">
          <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
            Lacak Pesanan
          </span>
          <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
            Bantuan
          </span>
          <span className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer">
            ID / IDR
          </span>
        </div>
      </div>

      <div className="w-full border-b border-neutral-200/90 dark:border-neutral-800/90 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-2 cursor-pointer shrink-0">
            <span className="h-8 w-8 rounded-xl bg-rose-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
              S
            </span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 dark:text-white">
              needui
            </span>
          </div>

          <div className="flex-1 max-w-xl relative">
            <SearchIcon
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Cari produk elektronik, pakaian, atau promo..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              title="Notifikasi Promo"
              className="p-2 rounded-xl text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <BellIcon size={20} />
            </button>

            <button
              type="button"
              onClick={onCartClick}
              title="Keranjang Belanja"
              className="relative p-2 rounded-xl text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <ShoppingCartIcon size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition cursor-pointer text-xs font-semibold text-neutral-800 dark:text-neutral-200"
            >
              <UserIcon size={16} />
              <span>Akun Saya</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
