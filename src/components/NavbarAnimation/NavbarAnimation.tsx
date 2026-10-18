import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import {
  SearchIcon,
  CloseIcon,
  ArrowRightIcon,
  BellIcon,
  SettingsIcon,
} from "../../icons";

/* =========================================================================
 * 1. FLOATING MAC DOCK (`FloatingDockNav`)
 * ========================================================================= */

export interface FloatingDockItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}

export interface FloatingDockNavProps {
  items?: FloatingDockItem[];
  className?: string;
  activeId?: string;
  onItemClick?: (item: FloatingDockItem) => void;
}

function DockIconItem({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: FloatingDockItem;
  mouseX: any;
  isActive: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Hitung jarak kursor mouse X ke titik tengah elemen dock icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale dinamis layaknya macOS Dock: tengah 64px, mereda ke 42px di radius 150px
  const widthTransform = useTransform(distance, [-140, 0, 140], [42, 64, 42]);
  const heightTransform = useTransform(distance, [-140, 0, 140], [42, 64, 42]);

  // Spring physics untuk pergerakan elastis yang sangat mulus
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex flex-col items-center cursor-pointer select-none"
    >
      {/* Floating Tooltip Label di atas icon */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-7 z-30 pointer-events-none whitespace-nowrap rounded-lg bg-neutral-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md dark:bg-neutral-100 dark:text-neutral-900"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Item Button with spring size */}
      <motion.div
        style={{ width, height }}
        whileTap={{ scale: 0.88 }}
        className={cn(
          "flex items-center justify-center rounded-2xl border transition-colors shadow-sm",
          isActive
            ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/20"
            : "bg-white/80 text-neutral-700 hover:text-neutral-950 hover:bg-white border-neutral-200/80 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-700/80 dark:border-neutral-700/80"
        )}
      >
        <div className="flex items-center justify-center pointer-events-none scale-100">
          {item.icon}
        </div>
      </motion.div>

      {/* Titik indikator aktif di bawah icon (seperti macOS) */}
      {isActive && (
        <span className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400" />
      )}
    </div>
  );
}

export function FloatingDockNav({
  items = [],
  className,
  activeId,
  onItemClick,
}: FloatingDockNavProps) {
  const mouseX = useMotionValue(Infinity);
  const [currentActive, setCurrentActive] = useState<string>(
    activeId || (items[0]?.id ?? "")
  );

  useEffect(() => {
    if (activeId !== undefined) {
      setCurrentActive(activeId);
    }
  }, [activeId]);

  return (
    <nav
      aria-label="Floating Mac Dock"
      className={cn("flex justify-center w-full py-4", className)}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 px-4 py-3 rounded-3xl border border-neutral-200/70 bg-white/70 backdrop-blur-xl shadow-xl dark:border-neutral-800/70 dark:bg-neutral-900/70 transition-all duration-300"
      >
        {items.map((item) => (
          <DockIconItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            isActive={currentActive === item.id}
            onClick={() => {
              setCurrentActive(item.id);
              item.onClick?.();
              onItemClick?.(item);
            }}
          />
        ))}
      </motion.div>
    </nav>
  );
}

/* =========================================================================
 * 2. MAGNETIC SLIDING PILL (`MagneticTabNav`)
 * ========================================================================= */

export interface MagneticTabItem {
  id: string;
  label: string;
  href?: string;
  badge?: string;
}

export interface MagneticTabNavProps {
  brand?: ReactNode;
  items?: MagneticTabItem[];
  activeId?: string;
  onTabChange?: (item: MagneticTabItem) => void;
  rightElement?: ReactNode;
  className?: string;
}

export function MagneticTabNav({
  brand,
  items = [],
  activeId,
  onTabChange,
  rightElement,
  className,
}: MagneticTabNavProps) {
  const [selectedId, setSelectedId] = useState<string>(
    activeId || (items[0]?.id ?? "")
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (activeId !== undefined) {
      setSelectedId(activeId);
    }
  }, [activeId]);

  return (
    <nav
      aria-label="Magnetic Tab Navigation"
      className={cn(
        "w-full rounded-2xl border border-neutral-200/80 bg-white/90 p-2.5 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/90 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        {brand && (
          <div className="flex items-center gap-2 pl-2 shrink-0">{brand}</div>
        )}

        {/* Tab Links with Floating Pill Indicator */}
        <div
          onMouseLeave={() => setHoveredId(null)}
          className="relative flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5"
        >
          {items.map((item) => {
            const isActive = selectedId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  onTabChange?.(item);
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                className="relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 select-none outline-none cursor-pointer"
              >
                {/* Active Pill (menggunakan Framer Motion layoutId untuk meluncur mulus) */}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-neutral-950 dark:bg-white shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                {/* Subtle Hover Background jika belum aktif */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hover-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-neutral-100 dark:bg-neutral-800/60"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                {/* Label text */}
                <span
                  className={cn(
                    "relative z-10 flex items-center gap-1.5 transition-colors duration-150",
                    isActive
                      ? "text-white dark:text-neutral-950 font-semibold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                        isActive
                          ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900"
                          : "bg-neutral-200/80 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right CTA Element */}
        {rightElement && (
          <div className="flex items-center gap-2 pr-1 shrink-0">
            {rightElement}
          </div>
        )}
      </div>
    </nav>
  );
}

/* =========================================================================
 * 3. SMART GLASSMORPHISM (`SmartScrollNav`)
 * ========================================================================= */

export interface SmartScrollNavProps {
  brand?: ReactNode;
  items?: { label: string; href: string; active?: boolean }[];
  rightElement?: ReactNode;
  /** Sembunyikan otomatis saat scroll ke bawah, tampil saat scroll ke atas */
  hideOnScroll?: boolean;
  /** Override manual paksa sembunyi/tampil (berguna untuk simulasi interaktif) */
  forceHidden?: boolean;
  className?: string;
  onItemClick?: (item: { label: string; href: string }) => void;
}

export function SmartScrollNav({
  brand,
  items = [],
  rightElement,
  hideOnScroll = true,
  forceHidden,
  className,
  onItemClick,
}: SmartScrollNavProps) {
  const { scrollY } = useScroll();
  const [internalHidden, setInternalHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    setIsScrolled(latest > 20);

    if (!hideOnScroll || forceHidden !== undefined) return;

    if (latest > 100 && diff > 8) {
      setInternalHidden(true);
    } else if (diff < -6 || latest <= 100) {
      setInternalHidden(false);
    }
  });

  const isHidden = forceHidden !== undefined ? forceHidden : internalHidden;

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-120%", opacity: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full transition-all duration-300", className)}
    >
      <div
        className={cn(
          "w-full rounded-2xl border transition-all duration-300 px-4 py-3 flex items-center justify-between gap-4",
          isScrolled
            ? "border-neutral-200/90 bg-white/85 shadow-lg backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-950/85"
            : "border-neutral-200/60 bg-white/60 shadow-sm backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-900/60"
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
          {brand || (
            <span className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                ▲
              </span>
              <span>SmartNav</span>
            </span>
          )}
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          {items.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onItemClick?.(link);
              }}
              className={cn(
                "text-xs font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 relative py-1",
                link.active
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              {link.label}
              {link.active && (
                <motion.span
                  layoutId="smart-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {rightElement || (
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-sm transition"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}

/* =========================================================================
 * 4. MORPHING CIRCLE (`MorphingNav`)
 * ========================================================================= */

export interface MorphingNavProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  brandName?: string;
  className?: string;
}

export function MorphingNav({
  placeholder = "Ketik pencarian atau perintah...",
  onSearch,
  brandName = "AryaUI",
  className,
}: MorphingNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  return (
    <div className={cn("w-full flex justify-center py-2", className)}>
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 28,
        }}
        className={cn(
          "relative overflow-hidden border border-neutral-200/90 bg-white/95 shadow-xl backdrop-blur-xl dark:border-neutral-800/90 dark:bg-neutral-900/95 transition-colors",
          isOpen
            ? "w-full max-w-2xl rounded-2xl p-3"
            : "w-14 h-14 rounded-full p-0 flex items-center justify-center hover:scale-105 active:scale-95"
        )}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Lingkaran Minimalis dengan Icon Search / Menu */
            <motion.button
              key="closed-circle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              type="button"
              onClick={() => setIsOpen(true)}
              title="Klik untuk membuka menu pencarian"
              className="w-full h-full flex items-center justify-center text-neutral-800 dark:text-neutral-100 cursor-pointer"
            >
              <SearchIcon size={22} />
            </motion.button>
          ) : (
            /* Wujud Morphed Bar Lengkap */
            <motion.div
              key="opened-bar"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 w-full"
            >
              {/* Brand Tag */}
              <div className="flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{brandName}</span>
              </div>

              {/* Input Area */}
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  placeholder={placeholder}
                  className="w-full bg-transparent py-1.5 px-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>

              {/* Quick Actions & Close button */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  title="Notifikasi"
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <BellIcon size={17} />
                </button>
                <button
                  type="button"
                  title="Pengaturan"
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition cursor-pointer"
                >
                  <SettingsIcon size={17} />
                </button>

                {/* Close Button: kembali morph menjadi lingkaran */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Tutup & Perkecil"
                  className="p-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition cursor-pointer"
                >
                  <CloseIcon size={17} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* =========================================================================
 * 5. STAGGERED FULLSCREEN (`FullscreenMenuNav`)
 * ========================================================================= */

export interface FullscreenMenuItem {
  number: string;
  title: string;
  subtitle?: string;
  href?: string;
}

export interface FullscreenMenuNavProps {
  brand?: ReactNode;
  menuItems?: FullscreenMenuItem[];
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

const DEFAULT_FULLSCREEN_ITEMS: FullscreenMenuItem[] = [
  { number: "01", title: "Showcase", subtitle: "Koleksi komponen interaktif modern" },
  { number: "02", title: "Architecture", subtitle: "Struktur Tailwind & Framer Motion" },
  { number: "03", title: "Animation Engine", subtitle: "Spring physics & dynamic gesture" },
  { number: "04", title: "Iconography", subtitle: "60+ SVG icons presisi tinggi" },
  { number: "05", title: "Get in Touch", subtitle: "Kolaborasi & diskusi engineering" },
];

export function FullscreenMenuNav({
  brand,
  menuItems = DEFAULT_FULLSCREEN_ITEMS,
  isOpen: controlledOpen,
  onToggle,
  className,
}: FullscreenMenuNavProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(nextState);
    }
    onToggle?.(nextState);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Top Bar dengan Brand dan 2-Line Hamburger Minimalis */}
      <div className="relative z-40 w-full flex items-center justify-between p-4 rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/90 shadow-sm transition-colors">
        <div className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
          {brand || (
            <>
              <span className="h-7 w-7 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-violet-500/20">
                A
              </span>
              <span>Studio Arya</span>
            </>
          )}
        </div>

        {/* 2-Line Animated Hamburger Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? "Tutup menu fullscreen" : "Buka menu fullscreen"}
          className="relative h-10 w-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-200/80 hover:bg-neutral-100 dark:border-neutral-700/80 dark:hover:bg-neutral-800/60 transition cursor-pointer"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-5 h-0.5 rounded-full bg-neutral-900 dark:bg-white origin-center"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -0.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-5 h-0.5 rounded-full bg-neutral-900 dark:bg-white origin-center"
          />
        </button>
      </div>

      {/* Staggered Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 z-30 min-h-[480px] rounded-3xl bg-neutral-950 text-white p-6 sm:p-10 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* Ambient Background Glow Effect */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

            {/* Menu Header Note */}
            <div className="pt-12 text-xs font-mono uppercase tracking-widest text-neutral-400">
              Navigation Index // Arya UI
            </div>

            {/* Staggered Links List */}
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="space-y-4 my-8"
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.number}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 35 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <a
                    href={item.href || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggle();
                    }}
                    className="group flex items-baseline justify-between py-2 border-b border-neutral-800/80 hover:border-neutral-700 transition"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm text-neutral-500 group-hover:text-violet-400 transition-colors">
                        {item.number}
                      </span>
                      <span className="text-2xl sm:text-4xl font-extrabold tracking-tight group-hover:translate-x-2 group-hover:text-violet-400 transition-all duration-200">
                        {item.title}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                      {item.subtitle && (
                        <span className="text-xs text-neutral-400 font-sans">
                          {item.subtitle}
                        </span>
                      )}
                      <ArrowRightIcon
                        size={18}
                        className="text-neutral-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Footer metadata */}
            <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
              <span>© {new Date().getFullYear()} @a/ui design system</span>
              <div className="flex items-center gap-4">
                <span className="hover:text-neutral-300 cursor-pointer">GitHub</span>
                <span className="hover:text-neutral-300 cursor-pointer">Twitter</span>
                <span className="hover:text-neutral-300 cursor-pointer">Figma</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
 * DEFAULT EXPORT & BACKWARD COMPATIBILITY
 * ========================================================================= */

/** Default Unified NavbarAnimation (menggunakan SmartScrollNav sebagai basis) */
export const NavbarAnimation = SmartScrollNav;
