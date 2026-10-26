import React, { forwardRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. CVA VARIANTS
 * ========================================================================= */

export const tabsVariants = cva("w-full font-sans select-none", {
  variants: {
    variant: {
      default: "flex flex-col space-y-4",
      fluid: "flex flex-col space-y-4",
      underline: "flex flex-col space-y-4",
      expandable: "flex flex-col items-center space-y-4",
      vertical: "flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch",
      segmented: "flex flex-col items-center space-y-5 sm:space-y-6",
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
});

/* =========================================================================
 * 2. TYPES & DATA CONTRACTS
 * ========================================================================= */

export type TabVariant =
  | "default"
  | "fluid"
  | "underline"
  | "expandable"
  | "vertical"
  | "segmented";

export interface TabItem {
  /** Identifier unik untuk tab */
  id: string;
  /** Label teks utama tab */
  label: string;
  /** Ikon elemen (ReactNode / SVG) opsional */
  icon?: React.ReactNode;
  /** Konten panel yang dirender ketika tab ini aktif */
  content?: React.ReactNode;
  /** Badge indikator angka atau teks */
  badge?: string | number;
  /** Menonaktifkan interaksi pada tab */
  disabled?: boolean;
  /** Informasi harga opsional (khusus segmented tier) */
  price?: string;
  /** Badge penghematan promo (khusus segmented tier) */
  save?: string | null;
}

export interface BaseTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tabsVariants> {
  /** Daftar elemen tab */
  items?: TabItem[];
  /** Tab yang sedang aktif (controlled mode) */
  value?: string;
  /** Tab aktif awal untuk mode uncontrolled */
  defaultValue?: string;
  /** Callback saat tab aktif berganti */
  onChange?: (value: string) => void;
  /** Alias callback saat tab aktif berganti */
  onValueChange?: (value: string) => void;
  /** Menampilkan atau menyembunyikan panel konten tab (default: true) */
  showContent?: boolean;
  /** Class CSS kustom untuk wadah list tombol tab */
  tabListClassName?: string;
  /** Class CSS kustom untuk wadah panel konten */
  contentClassName?: string;
}

/* =========================================================================
 * 3. DEFAULT PRESETS (Fallback data out of the box)
 * ========================================================================= */

export const DEFAULT_FLUID_TABS: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            System Health • Normal
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold">
            99.98% SLA
          </span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Global Cluster Throughput
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Active replication nodes across 14 edge regions responding with sub-12ms latency. All background cron tasks synchronized.
        </p>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2">
          <div className="p-2 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono block truncate">Requests/s</span>
            <p className="text-xs sm:text-base font-extrabold text-zinc-900 dark:text-zinc-100 truncate">42,890</p>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono block truncate">Avg Latency</span>
            <p className="text-xs sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 truncate">8.4 ms</p>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono block truncate">Error Rate</span>
            <p className="text-xs sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 truncate">0.001%</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            Audience Telemetry
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">Real-time Feed</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Engagement & Session Duration
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Interactive session duration increased by 24.6% this cycle following fluid micro-interaction deployments across all consumer funnels.
        </p>
      </div>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            Compliance & Audits
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
            SOC2 Certified
          </span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Automated Security Verification
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Continuous zero-trust auditing across storage buckets and secret managers with automatic anomaly quarantine.
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    content: (
      <div className="space-y-3">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Workspace Preferences
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Customize spring stiffness, damping ratios, and haptic feedback profiles for all shared-layout components.
        </p>
      </div>
    ),
  },
];

export const DEFAULT_UNDERLINE_TABS: TabItem[] = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "integrations", label: "Integrations" },
  { id: "api-keys", label: "API Keys" },
];

export const DEFAULT_EXPANDABLE_TABS: TabItem[] = [
  { id: "dash", label: "Dashboard" },
  { id: "user", label: "Account" },
  { id: "sec", label: "Security" },
  { id: "plan", label: "Billing" },
  { id: "notif", label: "Alerts" },
];

export const DEFAULT_VERTICAL_TABS: TabItem[] = [
  { id: "profile", label: "Profile Info" },
  { id: "team", label: "Team Members" },
  { id: "security", label: "Authentication" },
  { id: "notifications", label: "Notification Rules" },
  { id: "storage", label: "Data Storage" },
];

export const DEFAULT_SEGMENTED_TABS: TabItem[] = [
  { id: "monthly", label: "Monthly", price: "$29/mo", save: null },
  { id: "quarterly", label: "Quarterly", price: "$24/mo", save: "Save 15%" },
  { id: "annual", label: "Annual", price: "$19/mo", save: "Save 35%" },
  { id: "lifetime", label: "Lifetime", price: "$499 once", save: "Best Value" },
];

/* =========================================================================
 * 4. VARIANT 1: FluidPillTabs (Pill Background Slider)
 * ========================================================================= */

export interface FluidPillTabsProps extends BaseTabsProps {}

export const FluidPillTabs = forwardRef<HTMLDivElement, FluidPillTabsProps>(
  (
    {
      items = DEFAULT_FLUID_TABS,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      showContent = true,
      tabListClassName,
      contentClassName,
      className,
      size = "default",
      variant = "fluid",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const initialActive = defaultValue || (items.length > 0 ? items[0].id : "");
    const [internalActive, setInternalActive] = useState<string>(initialActive);
    const isControlled = controlledValue !== undefined;
    const activeId = isControlled ? controlledValue : internalActive;

    const handleSelect = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
      onValueChange?.(id);
    };

    const activeItem = items.find((it) => it.id === activeId) || items[0];

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full overflow-x-auto no-scrollbar py-0.5">
          <div
            className={cn(
              "inline-flex sm:flex w-auto sm:w-full min-w-full items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-inner",
              tabListClassName
            )}
          >
            {items.map((tab) => {
              const isActive = tab.id === activeId;

              return (
                <button
                  key={tab.id}
                  type="button"
                  disabled={tab.disabled}
                  onClick={() => handleSelect(tab.id)}
                  className={cn(
                    "relative flex-1 shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl font-semibold transition-colors select-none whitespace-nowrap cursor-pointer",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs sm:text-sm",
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                    tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`${uniqueId}-fluidPillBg`}
                      className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/60 -z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  {tab.icon && <span className="relative z-10 shrink-0">{tab.icon}</span>}
                  <span className="relative z-10">{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className={cn(
              "relative min-h-[140px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden text-left",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeItem.content || (
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {activeItem.label} Panel
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Active content for {activeItem.label}.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
FluidPillTabs.displayName = "FluidPillTabs";

/* =========================================================================
 * 5. VARIANT 2: ElasticUnderlineTabs (Animated Baseline Indicator)
 * ========================================================================= */

export interface ElasticUnderlineTabsProps extends BaseTabsProps {}

export const ElasticUnderlineTabs = forwardRef<
  HTMLDivElement,
  ElasticUnderlineTabsProps
>(
  (
    {
      items = DEFAULT_UNDERLINE_TABS,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      showContent = true,
      tabListClassName,
      contentClassName,
      className,
      size = "default",
      variant = "underline",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const initialActive = defaultValue || (items.length > 0 ? items[0].id : "");
    const [internalActive, setInternalActive] = useState<string>(initialActive);
    const isControlled = controlledValue !== undefined;
    const activeId = isControlled ? controlledValue : internalActive;

    const handleSelect = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
      onValueChange?.(id);
    };

    const activeItem = items.find((it) => it.id === activeId) || items[0];

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full border-b border-zinc-200/90 dark:border-zinc-800 overflow-x-auto no-scrollbar py-0.5">
          <div
            className={cn(
              "relative inline-flex sm:flex items-center gap-1 sm:gap-2 min-w-full",
              tabListClassName
            )}
          >
            {items.map((tab) => {
              const isActive = tab.id === activeId;

              return (
                <button
                  key={tab.id}
                  type="button"
                  disabled={tab.disabled}
                  onClick={() => handleSelect(tab.id)}
                  className={cn(
                    "relative shrink-0 pb-3 pt-1 px-3 sm:px-4 font-semibold transition-colors select-none whitespace-nowrap cursor-pointer",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs sm:text-sm",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                    tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {tab.icon && <span>{tab.icon}</span>}
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {tab.badge}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId={`${uniqueId}-elasticUnderline`}
                      className="absolute bottom-0 inset-x-0 h-[2.5px] bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className={cn(
              "relative min-h-[130px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden text-left",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeItem.content || (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {activeItem.label} Management
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Configuring parameters and permissions for {activeItem.label}.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
ElasticUnderlineTabs.displayName = "ElasticUnderlineTabs";

/* =========================================================================
 * 6. VARIANT 3: ExpandableIconTabs (Dynamic Breathing Width)
 * ========================================================================= */

export interface ExpandableIconTabsProps extends BaseTabsProps {}

export const ExpandableIconTabs = forwardRef<
  HTMLDivElement,
  ExpandableIconTabsProps
>(
  (
    {
      items = DEFAULT_EXPANDABLE_TABS,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      showContent = true,
      tabListClassName,
      contentClassName,
      className,
      size = "default",
      variant = "expandable",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const initialActive = defaultValue || (items.length > 0 ? items[0].id : "");
    const [internalActive, setInternalActive] = useState<string>(initialActive);
    const isControlled = controlledValue !== undefined;
    const activeId = isControlled ? controlledValue : internalActive;

    const handleSelect = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
      onValueChange?.(id);
    };

    const activeItem = items.find((it) => it.id === activeId) || items[0];

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center py-1">
          <div
            className={cn(
              "inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm shrink-0",
              tabListClassName
            )}
          >
            {items.map((tab) => {
              const isActive = tab.id === activeId;

              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  layout
                  disabled={tab.disabled}
                  onClick={() => handleSelect(tab.id)}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className={cn(
                    "relative shrink-0 flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full font-semibold select-none transition-colors cursor-pointer",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs",
                    isActive
                      ? "text-white font-bold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                    tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`${uniqueId}-expandablePill`}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md shadow-indigo-600/30 -z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}

                  {tab.icon && <span className="relative z-10 shrink-0">{tab.icon}</span>}

                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 whitespace-nowrap overflow-hidden"
                      >
                        {tab.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className={cn(
              "w-full relative min-h-[130px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden text-left",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeItem.content || (
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {activeItem.label} Hub
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Compressed icon layout that breathes outward upon activation.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
ExpandableIconTabs.displayName = "ExpandableIconTabs";

/* =========================================================================
 * 7. VARIANT 4: VerticalMinimalTabs (Side Navigation Line Tracker)
 * ========================================================================= */

export interface VerticalMinimalTabsProps extends BaseTabsProps {}

export const VerticalMinimalTabs = forwardRef<
  HTMLDivElement,
  VerticalMinimalTabsProps
>(
  (
    {
      items = DEFAULT_VERTICAL_TABS,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      showContent = true,
      tabListClassName,
      contentClassName,
      className,
      size = "default",
      variant = "vertical",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const initialActive = defaultValue || (items.length > 0 ? items[0].id : "");
    const [internalActive, setInternalActive] = useState<string>(initialActive);
    const isControlled = controlledValue !== undefined;
    const activeId = isControlled ? controlledValue : internalActive;

    const handleSelect = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
      onValueChange?.(id);
    };

    const activeItem = items.find((it) => it.id === activeId) || items[0];

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full sm:w-56 shrink-0">
          <div
            className={cn(
              "flex flex-col gap-1 p-1.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 w-full",
              tabListClassName
            )}
          >
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "relative w-full flex items-center gap-2.5 pl-4 pr-3 py-2 sm:py-2.5 rounded-xl font-medium text-left transition-colors select-none cursor-pointer",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs sm:text-sm",
                    isActive
                      ? "text-zinc-950 dark:text-white font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40",
                    item.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {isActive && (
                    <>
                      <motion.div
                        layoutId={`${uniqueId}-verticalBg`}
                        className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-xs rounded-xl border border-zinc-200/70 dark:border-zinc-700/70 -z-0"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                      <motion.div
                        layoutId={`${uniqueId}-verticalTrack`}
                        className="absolute left-1.5 inset-y-2 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    </>
                  )}

                  {item.icon && <span className="relative z-10 shrink-0">{item.icon}</span>}
                  <span className="relative z-10 truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className={cn(
              "flex-1 relative min-h-[160px] sm:min-h-[180px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden text-left",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-3"
              >
                {activeItem.content || (
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {activeItem.label}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Vertical minimal slider layout with hardware-accelerated indicator physics.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
VerticalMinimalTabs.displayName = "VerticalMinimalTabs";

/* =========================================================================
 * 8. VARIANT 5: SegmentedControlTabs (macOS Cupertino Card Slider)
 * ========================================================================= */

export interface SegmentedControlTabsProps extends BaseTabsProps {}

export const SegmentedControlTabs = forwardRef<
  HTMLDivElement,
  SegmentedControlTabsProps
>(
  (
    {
      items = DEFAULT_SEGMENTED_TABS,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      showContent = true,
      tabListClassName,
      contentClassName,
      className,
      size = "default",
      variant = "segmented",
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const initialActive = defaultValue || (items.length > 2 ? items[2].id : items[0]?.id || "");
    const [internalActive, setInternalActive] = useState<string>(initialActive);
    const isControlled = controlledValue !== undefined;
    const activeId = isControlled ? controlledValue : internalActive;

    const handleSelect = (id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
      onValueChange?.(id);
    };

    const activeItem = items.find((it) => it.id === activeId) || items[0];

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        <div className="w-full overflow-x-auto no-scrollbar py-0.5">
          <div
            className={cn(
              "inline-flex sm:flex w-auto sm:w-full min-w-full items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-inner",
              tabListClassName
            )}
          >
            {items.map((tier) => {
              const isSelected = tier.id === activeId;

              return (
                <button
                  key={tier.id}
                  type="button"
                  disabled={tier.disabled}
                  onClick={() => handleSelect(tier.id)}
                  className={cn(
                    "relative flex-1 shrink-0 py-1.5 px-2.5 sm:px-2 font-semibold rounded-lg transition-colors select-none flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs",
                    isSelected
                      ? "text-zinc-950 dark:text-zinc-100 font-bold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                    tier.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`${uniqueId}-segmentedActive`}
                      className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-700/80 -z-0"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}

                  <span className="relative z-10">{tier.label}</span>

                  {tier.save && (
                    <span className="hidden sm:inline-block relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                      {tier.save}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className={cn(
              "w-full p-4 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-left",
              contentClassName
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="w-full"
              >
                {activeItem.content || (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        Selected Plan
                      </span>
                      {activeItem.save && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">
                          {activeItem.save}
                        </span>
                      )}
                    </div>
                    {activeItem.price && (
                      <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        {activeItem.price}
                      </h4>
                    )}
                    <p className="text-xs text-zinc-500">
                      Tier: {activeItem.label}. Cupertino segmented switch dynamics.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);
SegmentedControlTabs.displayName = "SegmentedControlTabs";

/* =========================================================================
 * 9. MASTER PRIMITIVE: AnimatedTabs (and Tabs Alias)
 * ========================================================================= */

export interface AnimatedTabsProps extends BaseTabsProps {
  /**
   * Varian tampilan tabs yang dipilih:
   * - "default" / "fluid": Fluid pill slider dengan background meluncur halus
   * - "underline": Garis indikator bawah elastis
   * - "expandable": Tab ikon yang melebar dinamis saat aktif
   * - "vertical": Navigasi vertikal dengan garis pelacak sisi kiri
   * - "segmented": macOS / Cupertino segmented control switch
   */
  variant?: TabVariant;
}

export const AnimatedTabs = forwardRef<HTMLDivElement, AnimatedTabsProps>(
  ({ variant = "default", ...props }, ref) => {
    switch (variant) {
      case "underline":
        return <ElasticUnderlineTabs ref={ref} {...props} />;
      case "expandable":
        return <ExpandableIconTabs ref={ref} {...props} />;
      case "vertical":
        return <VerticalMinimalTabs ref={ref} {...props} />;
      case "segmented":
        return <SegmentedControlTabs ref={ref} {...props} />;
      case "fluid":
      case "default":
      default:
        return <FluidPillTabs ref={ref} {...props} />;
    }
  }
);
AnimatedTabs.displayName = "AnimatedTabs";

/* =========================================================================
 * 10. EXPORT ALIASES
 * ========================================================================= */

export const Tabs = AnimatedTabs;
export const PillTabs = FluidPillTabs;
export const UnderlineTabs = ElasticUnderlineTabs;
export const IconTabs = ExpandableIconTabs;
export const VerticalTabs = VerticalMinimalTabs;
export const SegmentedTabs = SegmentedControlTabs;

export default AnimatedTabs;
