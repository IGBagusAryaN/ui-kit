import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. CVA VARIANTS
 * ========================================================================= */

export const dropdownVariants = cva(
  "relative inline-block text-left font-sans select-none",
  {
    variants: {
      variant: {
        default: "inline-block",
        context: "inline-block",
        floating: "inline-block",
        mega: "inline-block",
        profile: "inline-block",
        command: "inline-block",
        tree: "w-full block",
        sidebar: "w-full block",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* =========================================================================
 * 2. TYPES & DATA CONTRACTS
 * ========================================================================= */

export type DropdownVariant =
  | "default"
  | "context"
  | "mega"
  | "profile"
  | "command"
  | "tree"
  | "sidebar"
  | "floating";

export interface DropdownItem {
  /** Identifier unik untuk item menu */
  id: string;
  /** Teks label utama item */
  label: string;
  /** Subtitle atau deskripsi singkat pendukung (terutama untuk varian mega) */
  subtitle?: string;
  /** Ikon grafis di sebelah kiri (ReactNode / SVG) */
  icon?: React.ReactNode;
  /** Badge indikator angka atau teks di sebelah kanan */
  badge?: string | number;
  /** Keyboard shortcut badge (misal: "⌘K", "⇧P", "⌘C") khusus varian command */
  shortcut?: string;
  /** Kategori pengelompokan item (opsional) */
  category?: string;
  /** Menandakan apakah item ini sedang aktif/terpilih */
  isActive?: boolean;
  /** Menonaktifkan interaksi pada item */
  disabled?: boolean;
  /** Item dengan penekanan aksi destruktif (warna merah, misal: "Keluar" / "Delete") */
  isDestructive?: boolean;
  /** Menambahkan garis pemisah tipis sebelum item ini */
  separator?: boolean;
  /** Callback khusus ketika item ini diklik */
  onClick?: (item: DropdownItem) => void;
  /** Sub-item turunan untuk varian tree (rekursif) */
  children?: DropdownItem[];
  /** Khusus tree: apakah sub-menu terbuka secara default */
  defaultOpen?: boolean;
}

export interface ProfileData {
  /** Nama lengkap pengguna */
  name: string;
  /** Alamat email atau username / handle */
  email: string;
  /** URL foto profil avatar */
  avatarUrl?: string;
  /** Inisial fallback jika avatarUrl tidak tersedia (misal: "JD") */
  avatarFallback?: string;
  /** Tagline peran atau status keanggotaan (misal: "Pro Member", "Team Admin") */
  status?: string;
}

export interface BaseDropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dropdownVariants> {
  /** Daftar item yang akan dirender dalam dropdown */
  items?: DropdownItem[];
  /** Tombol atau elemen pembuka kustom */
  trigger?: React.ReactNode;
  /** Label teks default untuk tombol pembuka jika trigger kustom tidak diberikan */
  triggerLabel?: string;
  /** Status keterbukaan dropdown (controlled mode) */
  isOpen?: boolean;
  /** Status keterbukaan awal untuk uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback saat status buka/tutup berubah */
  onOpenChange?: (isOpen: boolean) => void;
  /** ID item yang sedang aktif */
  activeId?: string;
  /** Callback saat salah satu item menu diklik */
  onItemClick?: (item: DropdownItem) => void;
  /** Posisi alignment pop-over terhadap trigger ("left" | "right" | "center") */
  align?: "left" | "right" | "center";
}

/* =========================================================================
 * 3. DEFAULT PRESETS (Out-of-the-box fallback data)
 * ========================================================================= */

export const DEFAULT_CONTEXT_ITEMS: DropdownItem[] = [
  { id: "prod", label: "Production (us-east-1)", badge: "Live", isActive: true },
  { id: "staging", label: "Staging (eu-central-1)", badge: "v2.4" },
  { id: "dev", label: "Development (ap-southeast-1)" },
  { id: "preview", label: "Preview Branch (Ephemeral)" },
];

export const DEFAULT_MEGA_ITEMS: DropdownItem[] = [
  {
    id: "payments",
    label: "Payments & Billing",
    subtitle: "Infrastruktur pemrosesan transaksi global & multi-mata uang.",
    badge: "Popular",
  },
  {
    id: "connect",
    label: "Instant Connect",
    subtitle: "Routing pembayaran marketplace & split fee otomatis.",
  },
  {
    id: "vault",
    label: "Cloud Vault",
    subtitle: "Enkripsi zero-knowledge & penyimpanan token PCI-DSS.",
  },
  {
    id: "shield",
    label: "Fraud Shield",
    subtitle: "Deteksi anomali transaksi berbasis AI realtime.",
    badge: "AI",
  },
];

export const DEFAULT_PROFILE_DATA: ProfileData = {
  name: "John Doe",
  email: "john@engineering.acme.co",
  avatarFallback: "JD",
  status: "Lead Architect",
};

export const DEFAULT_PROFILE_ITEMS: DropdownItem[] = [
  { id: "profile", label: "Profil Akun" },
  { id: "settings", label: "Pengaturan Workspace" },
  { id: "keys", label: "API Credentials", badge: "Active" },
  { id: "logout", label: "Keluar Akun", isDestructive: true, separator: true },
];

export const DEFAULT_COMMAND_ITEMS: DropdownItem[] = [
  { id: "cmd-new", label: "Create New Project", shortcut: "⌘N" },
  { id: "cmd-invite", label: "Invite Team Member", shortcut: "⇧I" },
  { id: "cmd-deploy", label: "Deploy to Production", shortcut: "⇧D" },
  { id: "cmd-audit", label: "Run Security Audit", shortcut: "⇧S" },
  { id: "cmd-settings", label: "System Preferences", shortcut: "⌘," },
];

export const DEFAULT_TREE_ITEMS: DropdownItem[] = [
  {
    id: "components",
    label: "Components",
    defaultOpen: true,
    children: [
      { id: "button", label: "Button.tsx" },
      { id: "modal", label: "Modal.tsx" },
      { id: "dropdown", label: "Dropdown.tsx", isActive: true },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    children: [
      { id: "home", label: "Home.tsx" },
      { id: "dashboard", label: "Dashboard.tsx" },
    ],
  },
  { id: "package", label: "package.json" },
];

/* =========================================================================
 * 4. CLICK OUTSIDE & KEYBOARD HOOK
 * ========================================================================= */

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      handler();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, handler, isActive]);
}

/* =========================================================================
 * 5. INTERNAL SVG ICONS
 * ========================================================================= */

const DefaultChevron: React.FC<{ isOpen: boolean; className?: string }> = ({
  isOpen,
  className = "w-3.5 h-3.5",
}) => (
  <motion.svg
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
    className={cn(
      "shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors",
      className
    )}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </motion.svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-emerald-500",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4 text-zinc-400",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/* =========================================================================
 * 6. VARIANT A: ContextSelectDropdown (Context / Select Floating Popover)
 * ========================================================================= */

const contextContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: 0.12, ease: "easeIn" },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

const contextItemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

export interface ContextSelectDropdownProps extends BaseDropdownProps {}

export const ContextSelectDropdown = forwardRef<
  HTMLDivElement,
  ContextSelectDropdownProps
>(
  (
    {
      items = DEFAULT_CONTEXT_ITEMS,
      trigger,
      triggerLabel = "Pilih Opsi",
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onOpenChange,
      activeId,
      onItemClick,
      align = "center",
      className,
      variant = "context",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, open);

    const toggleOpen = () => {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const activeItem = items.find((it) =>
      activeId ? it.id === activeId : it.isActive
    );

    const alignClasses =
      align === "right"
        ? "right-0"
        : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

    return (
      <div
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(dropdownVariants({ variant, size }), className)}
        {...props}
      >
        <div onClick={toggleOpen} className="cursor-pointer select-none">
          {trigger ? (
            trigger
          ) : (
            <button
              type="button"
              className={cn(
                "flex items-center justify-between gap-3 min-w-[200px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none",
                size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-4 py-2.5 text-base" : "px-3.5 py-2 text-sm"
              )}
            >
              <div className="flex items-center gap-2 truncate">
                {activeItem?.icon && <span className="shrink-0">{activeItem.icon}</span>}
                <span className="truncate">{activeItem?.label || triggerLabel}</span>
              </div>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className="w-4 h-4 shrink-0 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <div className={cn("absolute z-50 mt-2", alignClasses)}>
              <motion.div
                variants={contextContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ transformOrigin: "top center" }}
                className="min-w-[210px] w-60 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-md"
              >
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const isItemActive = activeId
                      ? activeId === item.id
                      : Boolean(item.isActive);

                    return (
                      <React.Fragment key={item.id}>
                        {item.separator && (
                          <div className="my-1 border-t border-zinc-200 dark:border-zinc-800/80" />
                        )}
                        <motion.button
                          type="button"
                          variants={contextItemVariants}
                          disabled={item.disabled}
                          onClick={() => {
                            if (item.disabled) return;
                            item.onClick?.(item);
                            onItemClick?.(item);
                            if (!isControlled) setInternalOpen(false);
                            onOpenChange?.(false);
                          }}
                          className={cn(
                            "group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer",
                            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
                            item.isDestructive
                              ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                              : isItemActive
                              ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium"
                              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/60",
                            item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {item.icon && (
                              <span className="shrink-0 text-current opacity-85 group-hover:opacity-100">
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate">{item.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {item.badge !== undefined && (
                              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                                {item.badge}
                              </span>
                            )}
                            {isItemActive && <CheckIcon />}
                          </div>
                        </motion.button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
ContextSelectDropdown.displayName = "ContextSelectDropdown";

/* =========================================================================
 * 7. VARIANT B: MegaMenuDropdown (Stripe Style 2-Column Grid)
 * ========================================================================= */

export interface MegaMenuDropdownProps extends BaseDropdownProps {}

export const MegaMenuDropdown = forwardRef<
  HTMLDivElement,
  MegaMenuDropdownProps
>(
  (
    {
      items = DEFAULT_MEGA_ITEMS,
      trigger,
      triggerLabel = "Jelajahi Produk & Solusi",
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onOpenChange,
      activeId,
      onItemClick,
      align = "center",
      className,
      variant = "mega",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, open);

    const toggleOpen = () => {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const alignClasses =
      align === "right"
        ? "right-0"
        : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

    return (
      <div
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(dropdownVariants({ variant, size }), className)}
        {...props}
      >
        <div onClick={toggleOpen} className="cursor-pointer select-none">
          {trigger ? (
            trigger
          ) : (
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none font-medium",
                size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm"
              )}
            >
              <span>{triggerLabel}</span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className="w-4 h-4 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <div className={cn("absolute z-50 mt-2.5", alignClasses)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 26,
                  mass: 0.8,
                }}
                style={{ transformOrigin: "top center" }}
                className="w-[22rem] sm:w-[32rem] md:w-[36rem] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-md"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item) => {
                    const isItemActive = activeId
                      ? activeId === item.id
                      : Boolean(item.isActive);

                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={item.disabled ? -1 : 0}
                        onClick={() => {
                          if (item.disabled) return;
                          item.onClick?.(item);
                          onItemClick?.(item);
                          if (!isControlled) setInternalOpen(false);
                          onOpenChange?.(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (item.disabled) return;
                            item.onClick?.(item);
                            onItemClick?.(item);
                            if (!isControlled) setInternalOpen(false);
                            onOpenChange?.(false);
                          }
                        }}
                        className={cn(
                          "group flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all select-none",
                          isItemActive
                            ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400",
                          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        {item.icon && (
                          <div className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-zinc-800 group-hover:text-zinc-950 dark:group-hover:text-white transition-all shadow-2xs">
                            {item.icon}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white truncate transition-colors">
                              {item.label}
                            </span>
                            {item.badge !== undefined && (
                              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
MegaMenuDropdown.displayName = "MegaMenuDropdown";

/* =========================================================================
 * 8. VARIANT C: UserProfileDropdown (GitHub / Linear User Menu)
 * ========================================================================= */

export interface UserProfileDropdownProps extends BaseDropdownProps {
  /** Data identitas profil pengguna */
  profile?: ProfileData;
}

export const UserProfileDropdown = forwardRef<
  HTMLDivElement,
  UserProfileDropdownProps
>(
  (
    {
      items = DEFAULT_PROFILE_ITEMS,
      profile = DEFAULT_PROFILE_DATA,
      trigger,
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onOpenChange,
      activeId,
      onItemClick,
      align = "center",
      className,
      variant = "profile",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, open);

    const toggleOpen = () => {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const alignClasses =
      align === "right"
        ? "right-0"
        : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

    return (
      <div
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(dropdownVariants({ variant, size }), className)}
        {...props}
      >
        <div onClick={toggleOpen} className="cursor-pointer select-none">
          {trigger ? (
            trigger
          ) : (
            <button
              type="button"
              className={cn(
                "flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none",
                size === "sm" ? "p-0.5 pr-2.5 text-xs" : size === "lg" ? "p-1.5 pr-4 text-base" : "p-1 pr-3 text-sm"
              )}
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover shadow-xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {profile.avatarFallback || profile.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[100px]">
                {profile.name}
              </span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <div className={cn("absolute z-50 mt-2", alignClasses)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top center" }}
                className="w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-md"
              >
                <div className="px-3 py-2.5 mb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-9 h-9 shrink-0 rounded-full object-cover shadow-xs"
                      />
                    ) : (
                      <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {profile.avatarFallback || profile.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {profile.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {profile.email}
                      </p>
                      {profile.status && (
                        <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          {profile.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const isItemActive = activeId
                      ? activeId === item.id
                      : Boolean(item.isActive);

                    return (
                      <React.Fragment key={item.id}>
                        {item.separator && (
                          <div className="my-1 border-t border-zinc-200/80 dark:border-zinc-800/80" />
                        )}

                        <button
                          type="button"
                          disabled={item.disabled}
                          onClick={() => {
                            if (item.disabled) return;
                            item.onClick?.(item);
                            onItemClick?.(item);
                            if (!isControlled) setInternalOpen(false);
                            onOpenChange?.(false);
                          }}
                          className={cn(
                            "group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer",
                            item.isDestructive
                              ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-300 font-semibold"
                              : isItemActive
                              ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-semibold"
                              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50",
                            item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {item.icon && (
                              <span className="shrink-0 text-current opacity-85 group-hover:opacity-100">
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge !== undefined && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
UserProfileDropdown.displayName = "UserProfileDropdown";

/* =========================================================================
 * 9. VARIANT D: CommandMenuDropdown (Raycast Style Command Palette)
 * ========================================================================= */

export interface CommandMenuDropdownProps extends BaseDropdownProps {
  /** Placeholder untuk field input pencarian cepat */
  searchPlaceholder?: string;
}

export const CommandMenuDropdown = forwardRef<
  HTMLDivElement,
  CommandMenuDropdownProps
>(
  (
    {
      items = DEFAULT_COMMAND_ITEMS,
      trigger,
      triggerLabel = "Ketik perintah... (⌘K)",
      searchPlaceholder = "Cari perintah atau aksi cepat...",
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onOpenChange,
      activeId,
      onItemClick,
      align = "center",
      className,
      variant = "command",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : internalOpen;

    const [query, setQuery] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useClickOutside(containerRef, () => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, open);

    const toggleOpen = () => {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    useEffect(() => {
      if (open) {
        setTimeout(() => inputRef.current?.focus(), 50);
      } else {
        setQuery("");
      }
    }, [open]);

    const filteredItems = useMemo(() => {
      if (!query.trim()) return items;
      const lower = query.toLowerCase();
      return items.filter(
        (it) =>
          it.label.toLowerCase().includes(lower) ||
          (it.subtitle && it.subtitle.toLowerCase().includes(lower)) ||
          (it.shortcut && it.shortcut.toLowerCase().includes(lower))
      );
    }, [items, query]);

    const alignClasses =
      align === "right"
        ? "right-0"
        : align === "left"
        ? "left-0"
        : "left-1/2 -translate-x-1/2";

    return (
      <div
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(dropdownVariants({ variant, size }), className)}
        {...props}
      >
        <div onClick={toggleOpen} className="cursor-pointer select-none">
          {trigger ? (
            trigger
          ) : (
            <button
              type="button"
              className={cn(
                "flex items-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none font-medium",
                size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-4 py-2.5 text-base" : "px-3.5 py-2 text-sm"
              )}
            >
              <SearchIcon className="w-4 h-4 text-zinc-400" />
              <span>{triggerLabel}</span>
              <kbd className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700/80">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <div className={cn("absolute z-50 mt-2", alignClasses)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top center" }}
                className="w-72 sm:w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-md overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
                  <SearchIcon className="w-4 h-4 text-zinc-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 font-mono"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                  {filteredItems.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
                      Tidak ditemukan perintah untuk &quot;{query}&quot;
                    </div>
                  ) : (
                    filteredItems.map((item) => {
                      const isItemActive = activeId
                        ? activeId === item.id
                        : Boolean(item.isActive);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={item.disabled}
                          onClick={() => {
                            if (item.disabled) return;
                            item.onClick?.(item);
                            onItemClick?.(item);
                            if (!isControlled) setInternalOpen(false);
                            onOpenChange?.(false);
                          }}
                          className={cn(
                            "group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer",
                            isItemActive
                              ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium"
                              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50",
                            item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {item.icon && (
                              <span className="shrink-0 text-current opacity-80 group-hover:opacity-100">
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.shortcut && (
                            <kbd className="ml-2 shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
CommandMenuDropdown.displayName = "CommandMenuDropdown";

/* =========================================================================
 * 10. VARIANT E: TreeDropdown (Notion Style Nested Collapsible Tree)
 * ========================================================================= */

interface TreeNodeProps {
  item: DropdownItem;
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  activeId,
  onItemClick,
  level = 0,
}) => {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(item.defaultOpen));

  const isItemActive = activeId ? activeId === item.id : Boolean(item.isActive);

  const handleClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (item.disabled) return;

    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }

    item.onClick?.(item);
    onItemClick?.(item);
  };

  return (
    <div className="w-full select-none font-sans">
      <div
        role="button"
        tabIndex={item.disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          "group flex items-center justify-between w-full py-1.5 px-2.5 rounded-lg cursor-pointer transition-all text-sm",
          isItemActive
            ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium shadow-2xs"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40",
          item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {hasChildren ? (
            <DefaultChevron isOpen={isOpen} />
          ) : (
            <span className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          )}

          {item.icon && (
            <span className="shrink-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </span>
          )}

          <span className="truncate tracking-tight">{item.label}</span>
        </div>

        {item.badge !== undefined && item.badge !== null && (
          <span
            className={cn(
              "ml-2 shrink-0 text-[11px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors",
              isItemActive
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200"
                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
            )}
          >
            {item.badge}
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            key={`tree-child-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="border-l border-zinc-200 dark:border-zinc-800/60 ml-4 pl-3 py-0.5 space-y-0.5">
              {item.children!.map((child) => (
                <TreeNode
                  key={child.id}
                  item={child}
                  activeId={activeId}
                  onItemClick={onItemClick}
                  level={level + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface TreeDropdownProps extends BaseDropdownProps {}

export const TreeDropdown = forwardRef<HTMLDivElement, TreeDropdownProps>(
  (
    {
      items = DEFAULT_TREE_ITEMS,
      activeId,
      onItemClick,
      className,
      variant = "tree",
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-2 space-y-0.5 font-sans",
          dropdownVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <TreeNode
            key={item.id}
            item={item}
            activeId={activeId}
            onItemClick={onItemClick}
            level={0}
          />
        ))}
      </div>
    );
  }
);
TreeDropdown.displayName = "TreeDropdown";

/* =========================================================================
 * 11. MASTER PRIMITIVE: AnimatedDropdown (and Dropdown Alias)
 * ========================================================================= */

export interface AnimatedDropdownProps
  extends Omit<BaseDropdownProps, "variant"> {
  /**
   * Varian dropdown yang dipilih:
   * - "context" / "default" / "floating": Floating Menu ala Vercel
   * - "mega": 2-Column Grid ala Stripe
   * - "profile": User Account Menu ala GitHub
   * - "command": Raycast Command Palette
   * - "tree" / "sidebar": Notion Nested Explorer
   */
  variant?: DropdownVariant;
  /** Data profil pengguna khusus varian "profile" */
  profile?: ProfileData;
  /** Placeholder pencarian khusus varian "command" */
  searchPlaceholder?: string;
}

export const AnimatedDropdown = forwardRef<
  HTMLDivElement,
  AnimatedDropdownProps
>(
  (
    {
      variant = "context",
      items,
      trigger,
      triggerLabel,
      profile,
      searchPlaceholder,
      isOpen,
      defaultOpen,
      onOpenChange,
      activeId,
      onItemClick,
      align = "center",
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    // Varian Tree / Sidebar
    if (variant === "tree" || variant === "sidebar") {
      return (
        <TreeDropdown
          ref={ref}
          items={items}
          activeId={activeId}
          onItemClick={onItemClick}
          className={className}
          size={size}
          {...props}
        />
      );
    }

    // Varian Mega Menu
    if (variant === "mega") {
      return (
        <MegaMenuDropdown
          ref={ref}
          items={items}
          trigger={trigger}
          triggerLabel={triggerLabel}
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          activeId={activeId}
          onItemClick={onItemClick}
          align={align}
          className={className}
          size={size}
          {...props}
        />
      );
    }

    // Varian Profile
    if (variant === "profile") {
      return (
        <UserProfileDropdown
          ref={ref}
          items={items}
          profile={profile}
          trigger={trigger}
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          activeId={activeId}
          onItemClick={onItemClick}
          align={align}
          className={className}
          size={size}
          {...props}
        />
      );
    }

    // Varian Command
    if (variant === "command") {
      return (
        <CommandMenuDropdown
          ref={ref}
          items={items}
          trigger={trigger}
          triggerLabel={triggerLabel}
          searchPlaceholder={searchPlaceholder}
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          activeId={activeId}
          onItemClick={onItemClick}
          align={align}
          className={className}
          size={size}
          {...props}
        />
      );
    }

    // Default / Context / Floating
    return (
      <ContextSelectDropdown
        ref={ref}
        items={items}
        trigger={trigger}
        triggerLabel={triggerLabel}
        isOpen={isOpen}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        activeId={activeId}
        onItemClick={onItemClick}
        align={align}
        className={className}
        size={size}
        {...props}
      />
    );
  }
);
AnimatedDropdown.displayName = "AnimatedDropdown";

/* =========================================================================
 * 12. EXPORT ALIASES
 * ========================================================================= */

export const Dropdown = AnimatedDropdown;
export const SelectDropdown = ContextSelectDropdown;
export const ContextDropdown = ContextSelectDropdown;
export const MegaMenu = MegaMenuDropdown;
export const ProfileDropdown = UserProfileDropdown;
export const CommandMenu = CommandMenuDropdown;
export const TreeMenu = TreeDropdown;

export default AnimatedDropdown;
