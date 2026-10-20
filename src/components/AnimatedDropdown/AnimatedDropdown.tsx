import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================================
 * 1. TYPES & INTERFACES
 * ========================================================================= */

export type DropdownVariant =
  | "tree"
  | "context"
  | "mega"
  | "profile"
  | "command"
  | "sidebar" // Backward compatibility alias for "tree"
  | "floating"; // Backward compatibility alias for "context"

export interface DropdownItem {
  /** Identifier unik */
  id: string;
  /** Label teks utama */
  label: string;
  /** Subtitle atau deskripsi singkat (terutama untuk varian "mega") */
  subtitle?: string;
  /** Ikon elemen (ReactNode / SVG) */
  icon?: React.ReactNode;
  /** Badge indikator angka atau teks di sebelah kanan */
  badge?: string | number;
  /** Keyboard shortcut badge (misal: "⌘K", "⇧P", "⌘C") khusus varian "command" */
  shortcut?: string;
  /** Kategori pengelompokan item (opsional) */
  category?: string;
  /** Menandakan apakah item ini sedang aktif/terpilih */
  isActive?: boolean;
  /** Menonaktifkan interaksi pada item */
  disabled?: boolean;
  /** Item dengan penekanan aksi destruktif (misal: "Log out" / "Delete") dengan warna merah */
  isDestructive?: boolean;
  /** Menambahkan garis pemisah tipis sebelum item ini */
  separator?: boolean;
  /** Callback khusus ketika item ini diklik */
  onClick?: (item: DropdownItem) => void;
  /** Sub-item turunan untuk varian "tree" (rekursif) */
  children?: DropdownItem[];
  /** Khusus "tree": apakah sub-menu terbuka secara default */
  defaultOpen?: boolean;
}

export interface ProfileData {
  /** Nama lengkap pengguna */
  name: string;
  /** Alamat email atau username / handle */
  email: string;
  /** URL foto profil avatar */
  avatarUrl?: string;
  /** Inisial fallback jika avatarUrl tidak ada (misal: "JD") */
  avatarFallback?: string;
  /** Tagline atau status (opsional) */
  status?: string;
}

export interface AnimatedDropdownProps {
  /**
   * Varian tampilan komponen:
   * 1. "tree": Nested Explorer ala Notion (Parent-Child collapsible)
   * 2. "context": Floating Menu ala Vercel (Staggered items, blur, shadow-2xl)
   * 3. "mega": Navigation Menu ala Stripe (2-column grid, ikon, title, subtitle, spring)
   * 4. "profile": User Menu ala GitHub (Header profil, menu list, tombol destruktif merah)
   * 5. "command": Raycast Style Menu (Search input terintegrasi, scrollable, keyboard shortcut)
   */
  variant?: DropdownVariant;
  /** Daftar item yang akan dirender */
  items: DropdownItem[];
  /** Tombol atau elemen pembuka kustom (khusus varian floating: context, mega, profile, command) */
  trigger?: React.ReactNode;
  /** Label fallback jika trigger kustom tidak diberikan */
  triggerLabel?: string;
  /** Data profil khusus untuk varian "profile" */
  profile?: ProfileData;
  /** Placeholder input pencarian untuk varian "command" */
  searchPlaceholder?: string;
  /** State terbuka (controlled) */
  isOpen?: boolean;
  /** Callback perubahan state terbuka */
  onOpenChange?: (open: boolean) => void;
  /** State terbuka default untuk mode uncontrolled */
  defaultOpen?: boolean;
  /** ID item yang sedang aktif */
  activeId?: string;
  /** Callback saat salah satu item diklik */
  onItemClick?: (item: DropdownItem) => void;
  /** Class CSS kustom untuk container pembungkus utama */
  className?: string;
  /** Posisi alignment pop-over untuk varian floating (default: "left") */
  align?: "left" | "right" | "center";
}

/* =========================================================================
 * 2. CUSTOM HOOK: useClickOutside & useEscape
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
 * 3. INTERNAL ICONS (Chevron, Check, Search, User)
 * ========================================================================= */

const DefaultChevron: React.FC<{ isOpen: boolean; className?: string }> = ({
  isOpen,
  className = "w-3.5 h-3.5",
}) => (
  <motion.svg
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
    className={`shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors ${className}`}
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
 * 4. VARIANT 1: "tree" (Nested Explorer ala Notion)
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
        className={`group flex items-center justify-between w-full py-1.5 px-2.5 rounded-lg cursor-pointer transition-all text-sm ${
          isItemActive
            ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium shadow-xs"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
        } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
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
            className={`ml-2 shrink-0 text-[11px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors ${
              isItemActive
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200"
                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
            }`}
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

const TreeVariant: React.FC<{
  items: DropdownItem[];
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  className?: string;
}> = ({ items, activeId, onItemClick, className = "" }) => {
  return (
    <div
      className={`w-full rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-2 space-y-0.5 font-sans ${className}`}
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
};

/* =========================================================================
 * 5. VARIANT 2: "context" (Vercel Style Floating Menu dengan Staggered)
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

const ContextVariant: React.FC<{
  items: DropdownItem[];
  trigger?: React.ReactNode;
  triggerLabel?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  align?: "left" | "right" | "center";
  className?: string;
}> = ({
  items,
  trigger,
  triggerLabel = "Opsi Menu",
  isOpen,
  onToggle,
  onClose,
  activeId,
  onItemClick,
  align = "left",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose, isOpen);

  const activeItem = items.find((it) =>
    activeId ? it.id === activeId : it.isActive
  );

  const alignClasses =
    align === "right"
      ? "right-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <div onClick={onToggle} className="cursor-pointer select-none">
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="flex items-center justify-between gap-3 min-w-[190px] px-3.5 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none"
          >
            <div className="flex items-center gap-2 truncate">
              {activeItem?.icon && <span className="shrink-0">{activeItem.icon}</span>}
              <span className="truncate">{activeItem?.label || triggerLabel}</span>
            </div>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
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
        {isOpen && (
          <motion.div
            variants={contextContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: "top" }}
            className={`absolute z-50 mt-2 min-w-[210px] w-60 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-md ${alignClasses}`}
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
                        onClose();
                      }}
                      className={`group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-sm transition-colors ${
                        item.isDestructive
                          ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          : isItemActive
                          ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800/60"
                      } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
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
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
 * 6. VARIANT 3: "mega" (Stripe Style 2-Column Grid dengan Spring Physics)
 * ========================================================================= */

const MegaVariant: React.FC<{
  items: DropdownItem[];
  trigger?: React.ReactNode;
  triggerLabel?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  align?: "left" | "right" | "center";
  className?: string;
}> = ({
  items,
  trigger,
  triggerLabel = "Jelajahi Produk",
  isOpen,
  onToggle,
  onClose,
  activeId,
  onItemClick,
  align = "left",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose, isOpen);

  const alignClasses =
    align === "right"
      ? "right-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <div onClick={onToggle} className="cursor-pointer select-none">
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none"
          >
            <span>{triggerLabel}</span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 26,
              mass: 0.8,
            }}
            className={`absolute z-50 mt-2.5 w-[22rem] sm:w-[32rem] md:w-[36rem] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-md ${alignClasses}`}
          >
            {/* Grid 2 Kolom ala Stripe */}
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
                      onClose();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (item.disabled) return;
                        item.onClick?.(item);
                        onItemClick?.(item);
                        onClose();
                      }
                    }}
                    className={`group flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all select-none ${
                      isItemActive
                        ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                    } ${item.disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
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
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
 * 7. VARIANT 4: "profile" (GitHub Style User Menu dengan Destructive Logout)
 * ========================================================================= */

const ProfileVariant: React.FC<{
  items: DropdownItem[];
  profile?: ProfileData;
  trigger?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  align?: "left" | "right" | "center";
  className?: string;
}> = ({
  items,
  profile = {
    name: "Arya Wijaya",
    email: "arya@engineering.acme.co",
    avatarFallback: "AW",
    status: "Lead Architect",
  },
  trigger,
  isOpen,
  onToggle,
  onClose,
  activeId,
  onItemClick,
  align = "right",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, onClose, isOpen);

  const alignClasses =
    align === "left"
      ? "left-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-0";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <div onClick={onToggle} className="cursor-pointer select-none">
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {profile.avatarFallback || profile.name.slice(0, 2).toUpperCase()}
            </div>
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 mt-2 w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-md ${alignClasses}`}
          >
            {/* Profile Header Box */}
            <div className="px-3 py-2.5 mb-1 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {profile.avatarFallback || profile.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {profile.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu List */}
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
                        onClose();
                      }}
                      className={`group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                        item.isDestructive
                          ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-300 font-semibold"
                          : isItemActive
                          ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-semibold"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                      } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
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
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
 * 8. VARIANT 5: "command" (Raycast Style Search Menu dengan Shortcuts)
 * ========================================================================= */

const CommandVariant: React.FC<{
  items: DropdownItem[];
  trigger?: React.ReactNode;
  triggerLabel?: string;
  searchPlaceholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeId?: string;
  onItemClick?: (item: DropdownItem) => void;
  align?: "left" | "right" | "center";
  className?: string;
}> = ({
  items,
  trigger,
  triggerLabel = "Command Palette",
  searchPlaceholder = "Type a command or search...",
  isOpen,
  onToggle,
  onClose,
  activeId,
  onItemClick,
  align = "left",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");

  useClickOutside(containerRef, onClose, isOpen);

  // Fokuskan input otomatis saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter item berdasarkan teks pencarian query
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
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <div onClick={onToggle} className="cursor-pointer select-none">
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 shadow-xs transition-all focus:outline-none"
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 mt-2 w-72 sm:w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-md overflow-hidden ${alignClasses}`}
          >
            {/* Search Input Bar (Raycast Style) */}
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

            {/* Scrollable Command List */}
            <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
              {filteredItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
                  Tidak ditemukan perintah untuk "{query}"
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
                        onClose();
                      }}
                      className={`group flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        isItemActive
                          ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                      } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {item.icon && (
                          <span className="shrink-0 text-current opacity-80 group-hover:opacity-100">
                            {item.icon}
                          </span>
                        )}
                        <span className="truncate">{item.label}</span>
                      </div>

                      {/* Shortcut Badge (misal: ⌘K, ⇧P) */}
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
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
 * 9. KOMPONEN UTAMA: AnimatedDropdown
 * ========================================================================= */

/**
 * AnimatedDropdown
 *
 * Komponen dropdown animasi 5 varian modern:
 * 1. "tree": Nested Explorer ala Notion (Parent-Child recursive accordion)
 * 2. "context": Floating Menu ala Vercel (Staggered items, blur, shadow-2xl)
 * 3. "mega": Navigation Menu ala Stripe (2-column grid, ikon, subtitle, spring)
 * 4. "profile": User Menu ala GitHub (Profile header, items, destructive logout)
 * 5. "command": Raycast Style Menu (Built-in search input, scrollable list, keyboard shortcuts)
 */
export const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  variant = "tree",
  items,
  trigger,
  triggerLabel,
  profile,
  searchPlaceholder,
  isOpen: controlledIsOpen,
  onOpenChange,
  defaultOpen = false,
  activeId,
  onItemClick,
  className = "",
  align = "left",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(next);
    }
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setInternalIsOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  // Varian 1: Tree / Sidebar
  if (variant === "tree" || variant === "sidebar") {
    return (
      <TreeVariant
        items={items}
        activeId={activeId}
        onItemClick={onItemClick}
        className={className}
      />
    );
  }

  // Varian 2: Context / Floating
  if (variant === "context" || variant === "floating") {
    return (
      <ContextVariant
        items={items}
        trigger={trigger}
        triggerLabel={triggerLabel}
        isOpen={isOpen}
        onToggle={handleToggle}
        onClose={handleClose}
        activeId={activeId}
        onItemClick={onItemClick}
        align={align}
        className={className}
      />
    );
  }

  // Varian 3: Mega (2-Column Stripe Style)
  if (variant === "mega") {
    return (
      <MegaVariant
        items={items}
        trigger={trigger}
        triggerLabel={triggerLabel}
        isOpen={isOpen}
        onToggle={handleToggle}
        onClose={handleClose}
        activeId={activeId}
        onItemClick={onItemClick}
        align={align}
        className={className}
      />
    );
  }

  // Varian 4: Profile (GitHub Style)
  if (variant === "profile") {
    return (
      <ProfileVariant
        items={items}
        profile={profile}
        trigger={trigger}
        isOpen={isOpen}
        onToggle={handleToggle}
        onClose={handleClose}
        activeId={activeId}
        onItemClick={onItemClick}
        align={align}
        className={className}
      />
    );
  }

  // Varian 5: Command (Raycast Style)
  return (
    <CommandVariant
      items={items}
      trigger={trigger}
      triggerLabel={triggerLabel}
      searchPlaceholder={searchPlaceholder}
      isOpen={isOpen}
      onToggle={handleToggle}
      onClose={handleClose}
      activeId={activeId}
      onItemClick={onItemClick}
      align={align}
      className={className}
    />
  );
};

export default AnimatedDropdown;
