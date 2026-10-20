import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Interface untuk struktur data setiap item di dalam hierarki Tree Menu.
 */
export interface TreeMenuItem {
  /** Identifier unik untuk item */
  id: string;
  /** Label teks yang ditampilkan */
  label: string;
  /** Ikon kustom opsional (ReactNode / SVG) */
  icon?: React.ReactNode;
  /** Badge indikator angka atau teks di sebelah kanan */
  badge?: string | number;
  /** Status aktif untuk menandai item yang sedang dipilih */
  isActive?: boolean;
  /** Daftar sub-menu turunan (anak) */
  children?: TreeMenuItem[];
  /** Status apakah item default terbuka saat pertama kali dimuat */
  defaultOpen?: boolean;
  /** Menonaktifkan interaksi pada item */
  disabled?: boolean;
  /** Callback khusus ketika item ini diklik */
  onClick?: (item: TreeMenuItem) => void;
}

export interface AnimatedTreeMenuProps {
  /** Array hierarkis dari item-item menu */
  items: TreeMenuItem[];
  /** ID item yang sedang aktif (opsional, untuk controlled active state) */
  activeId?: string;
  /** Callback saat ada item yang diklik/dipilih */
  onItemClick?: (item: TreeMenuItem) => void;
  /** Class styling tambahan untuk kontainer pembungkus utama */
  className?: string;
}

interface TreeItemProps {
  item: TreeMenuItem;
  activeId?: string;
  onItemClick?: (item: TreeMenuItem) => void;
  level?: number;
}

/**
 * Ikon Chevron minimalis bawaan dengan animasi rotasi 90 derajat
 */
const DefaultChevron: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <motion.svg
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.18, ease: "easeInOut" }}
    className="w-3.5 h-3.5 shrink-0 text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors"
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

/**
 * Sub-komponen internal untuk merender satu node dan memanggil dirinya sendiri secara rekursif
 */
export const TreeItem: React.FC<TreeItemProps> = ({
  item,
  activeId,
  onItemClick,
  level = 0,
}) => {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(item.defaultOpen));

  // Tentukan apakah item ini berstatus aktif
  const isItemActive = activeId ? activeId === item.id : Boolean(item.isActive);

  // Handler klik pada baris item
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
      {/* Baris Utama Item */}
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
        className={`group relative flex items-center justify-between w-full py-1.5 px-2.5 rounded-lg cursor-pointer transition-all text-sm ${
          isItemActive
            ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800/70 dark:text-zinc-50 font-medium shadow-xs"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"
        } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
      >
        {/* Sisi Kiri: Chevron + Ikon Kustom + Label */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {hasChildren ? (
            <DefaultChevron isOpen={isOpen} />
          ) : (
            // Spacer transparan agar teks sejajar dengan parent ber-chevron
            <span className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          )}

          {/* Ikon Kustom (jika tersedia) */}
          {item.icon && (
            <span className="shrink-0 flex items-center justify-center text-current opacity-80 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </span>
          )}

          {/* Label Menu */}
          <span className="truncate tracking-tight">{item.label}</span>
        </div>

        {/* Sisi Kanan: Badge Angka / Label Status yang Elegan */}
        {item.badge !== undefined && item.badge !== null && (
          <span
            className={`ml-2 shrink-0 text-[11px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors ${
              isItemActive
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200"
                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400 group-hover:bg-zinc-200/70 dark:group-hover:bg-zinc-700/60"
            }`}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Kontainer Animasi Rekursif untuk Anak (Children) */}
      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            key={`tree-children-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* Garis Vertikal Indikator Hierarki */}
            <div className="border-l border-zinc-200 dark:border-zinc-800/60 ml-4 pl-3 py-0.5 space-y-0.5">
              {item.children!.map((child) => (
                <TreeItem
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

/**
 * Komponen Navigasi Tingkat Lanjut: Animated Tree Menu
 *
 * Mendukung sistem hierarki tak terbatas (parent-child), animasi expand/collapse
 * mulus menggunakan Framer Motion, garis hierarki vertikal, badge angka, dan ikon kustom.
 */
export const AnimatedTreeMenu: React.FC<AnimatedTreeMenuProps> = ({
  items,
  activeId,
  onItemClick,
  className = "",
}) => {
  return (
    <nav
      aria-label="Tree Navigation"
      className={`w-full space-y-0.5 font-sans ${className}`}
    >
      {items.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          activeId={activeId}
          onItemClick={onItemClick}
          level={0}
        />
      ))}
    </nav>
  );
};

export default AnimatedTreeMenu;
