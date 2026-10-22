import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ZapIcon,
  LayersIcon,
  UserIcon,
  ShieldIcon,
  BellIcon,
  CreditCardIcon,
  HardDriveIcon,
  ActivityIcon,
  FileTextIcon,
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  SettingsIcon,
  MonitorIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

/* =========================================================================
 * I18N DICTIONARY FOR ANIMATED TABS (BILINGUAL EN & ID - 5 VARIANTS)
 * ========================================================================= */
const TABS_DICT = {
  en: {
    pillTag1: "Shared LayoutId Dynamics",
    pillTag2: "5 Production Tabs Variants",
    pageTitle: "Animated Tabs",
    pageDescription:
      "A curated suite of 5 minimalist yet creative tab interfaces engineered with Framer Motion and Tailwind CSS. Built on the philosophy of 'Simple but Creative', focusing on buttery-smooth spring micro-interactions without tacky 3D overhead.",
    variants: {
      fluid: {
        title: "1. Fluid Pill Tabs (Smooth Background Slider)",
        badge: "Gliding Pill Highlight",
        description:
          "Horizontal tab bar where the soft gray background pill glides seamlessly between active items using Framer Motion layoutId. Content panels transition with a subtle fade and a 5px upward float.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Overview", "Analytics", "Reports", "Settings"];

export function FluidPillTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full max-w-lg space-y-4">
      {/* Pill Track */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors text-zinc-600 dark:text-zinc-400"
            >
              {isActive && (
                <motion.div
                  layoutId="fluidPillBg"
                  className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-xs -z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          {activeTab} Content View
        </motion.div>
      </AnimatePresence>
    </div>
  );
}`,
      },
      underline: {
        title: "2. Elastic Underline Tabs (Animated Border Bottom)",
        badge: "Spring Baseline Indicator",
        description:
          "Ultra-minimalist typography tabs anchored along a baseline border. A crisp color bar glides dynamically under the active text with calibrated spring damping for an elastic tactile feel.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["General", "Security", "Billing", "Integrations", "API Keys"];

export function ElasticUnderlineTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full max-w-lg">
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative pb-3 px-3 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : ""}>{tab}</span>
              {isActive && (
                <motion.div
                  layoutId="elasticUnderline"
                  className="absolute bottom-0 inset-x-0 h-[2.5px] bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      expandable: {
        title: "3. Expandable Icon Tabs (Dynamic Width Breathing)",
        badge: "Smart Width Layout Morph",
        description:
          "Compact visual space saver where inactive tabs display only subtle icon markers. Upon selection, the active tab smoothly breathes outward with Framer Motion layout animation to reveal its title label alongside the icon.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";
import { ZapIcon, UserIcon, ShieldIcon, BellIcon } from "@bgsaryzzz/ui/icons";

const TABS = [
  { id: "dash", label: "Dashboard", icon: ZapIcon },
  { id: "user", label: "Profile", icon: UserIcon },
  { id: "sec", label: "Security", icon: ShieldIcon },
  { id: "notif", label: "Alerts", icon: BellIcon },
];

export function ExpandableIconTabs() {
  const [active, setActive] = useState("dash");

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            layout
            onClick={() => setActive(tab.id)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold"
          >
            {isActive && (
              <motion.div
                layoutId="expandablePill"
                className="absolute inset-0 rounded-full bg-indigo-600 text-white -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            {isActive && <motion.span layout className="relative z-10">{tab.label}</motion.span>}
          </motion.button>
        );
      })}
    </div>
  );
}`,
      },
      vertical: {
        title: "4. Vertical Minimal Tabs (Side Navigation Line)",
        badge: "Vertical Slider Track",
        description:
          "Structured side-navigation architecture featuring a vertical sliding tracker line anchored to the left of the active menu item. Right viewport updates with smooth opacity fading.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENU = ["Profile Info", "Team Access", "Authentication", "Storage"];

export function VerticalMinimalTabs() {
  const [active, setActive] = useState(MENU[0]);

  return (
    <div className="flex gap-6 w-full max-w-xl">
      <div className="w-44 flex flex-col space-y-1">
        {MENU.map((item) => {
          const isActive = item === active;
          return (
            <button
              key={item}
              onClick={() => setActive(item)}
              className="relative px-3.5 py-2 text-left text-xs font-semibold rounded-xl text-zinc-600 dark:text-zinc-400"
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="verticalTrack"
                    className="absolute left-0 inset-y-1.5 w-1 bg-indigo-600 rounded-r-full"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                  <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl -z-10" />
                </>
              )}
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      segmented: {
        title: "5. Segmented Control Tabs (macOS Styled Toggle)",
        badge: "Cupertino Solid Slider",
        description:
          "Faithful replication of the iconic Apple macOS segmented control. Features an outer container housing an elevated solid card that glides beneath active segments with crisp tactile responsiveness.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

const TIERS = ["Monthly", "Quarterly", "Annual (Save 20%)", "Lifetime"];

export function SegmentedControlTabs() {
  const [selected, setSelected] = useState(TIERS[0]);

  return (
    <div className="flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80">
      {TIERS.map((tier) => {
        const isSelected = tier === selected;
        return (
          <button
            key={tier}
            onClick={() => setSelected(tier)}
            className="relative px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400"
          >
            {isSelected && (
              <motion.div
                layoutId="segmentedActive"
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-700 -z-0"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{tier}</span>
          </button>
        );
      })}
    </div>
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Dinamika Shared LayoutId",
    pillTag2: "5 Varian Tabs Siap Produksi",
    pageTitle: "Animated Tabs",
    pageDescription:
      "Koleksi 5 antarmuka tab minimalis dan kreatif yang dibangun dengan Framer Motion dan Tailwind CSS. Didasarkan pada filosofi 'Simple but Creative', berfokus pada interaksi mikro pegas yang sangat mulus tanpa beban 3D berlebihan.",
    variants: {
      fluid: {
        title: "1. Fluid Pill Tabs (Smooth Background Slider)",
        badge: "Gliding Pill Highlight",
        description:
          "Bilah tab horizontal di mana kapsul latar belakang berwarna lembut meluncur mulus mengikuti item aktif melalui layoutId Framer Motion. Panel konten bertransisi dengan fade halus dan pergerakan ke atas 5px.",
        snippet: `// Bilah tab horizontal dengan kapsul latar belakang yang meluncur mulus`,
      },
      underline: {
        title: "2. Elastic Underline Tabs (Animated Border Bottom)",
        badge: "Spring Baseline Indicator",
        description:
          "Tab tipografi ultra-minimalis tanpa latar belakang kontainer. Garis bawah berwarna cerah meluncur dinamis mengikuti teks aktif dengan redaman pegas yang presisi.",
        snippet: `// Tab minimalis dengan garis bawah beranimasi layoutId elastis`,
      },
      expandable: {
        title: "3. Expandable Icon Tabs (Dynamic Width Breathing)",
        badge: "Smart Width Layout Morph",
        description:
          "Desain hemat ruang di mana tab non-aktif hanya menampilkan ikon kecil. Saat aktif, tab melebar secara organik menggunakan animasi layout untuk memunculkan label teks di sebelah ikon.",
        snippet: `// Tab ikon yang melebar dinamis saat aktif menggunakan prop layout`,
      },
      vertical: {
        title: "4. Vertical Minimal Tabs (Side Navigation Line)",
        badge: "Vertical Slider Track",
        description:
          "Tata letak navigasi samping vertikal dengan garis pelacak vertikal tipis yang meluncur naik-turun menempel di sisi kiri item aktif. Area konten di kanan berganti secara halus.",
        snippet: `// Menu samping vertikal dengan garis peluncur layoutId di sisi kiri`,
      },
      segmented: {
        title: "5. Segmented Control Tabs (macOS Styled Toggle)",
        badge: "Cupertino Solid Slider",
        description:
          "Replikasi segmented control macOS Apple yang ikonik. Dilengkapi kotak solid berbayang lembut yang meluncur di dalam lintasan dengan responsivitas sentuhan yang cepat.",
        snippet: `// Segmented control gaya Apple macOS dengan kotak aktif berbayang halus`,
      },
    },
  },
};

/* =========================================================================
 * 1. FLUID PILL TABS
 * ========================================================================= */
const FLUID_TABS = [
  { id: "overview", label: "Overview", icon: ActivityIcon },
  { id: "analytics", label: "Analytics", icon: ZapIcon },
  { id: "reports", label: "Reports", icon: FileTextIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function FluidPillTabs() {
  const [activeTab, setActiveTab] = useState(FLUID_TABS[0].id);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-5">
      {/* Tab Track */}
      <div className="w-full overflow-x-auto no-scrollbar py-0.5">
        <div className="inline-flex sm:flex w-auto sm:w-full min-w-full items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-inner">
          {FLUID_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex-1 shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors select-none whitespace-nowrap",
                  isActive
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="fluidPillBg"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/50 dark:border-zinc-700/60 -z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon size={14} className="relative z-10 shrink-0" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Viewport */}
      <div className="relative min-h-[160px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-3"
          >
            {activeTab === "overview" && (
              <>
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
              </>
            )}

            {activeTab === "analytics" && (
              <>
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
                <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Conversion Funnel Completion</span>
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">+18.2% YoY</span>
                </div>
              </>
            )}

            {activeTab === "reports" && (
              <>
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
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <button className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition text-center">
                    Download PDF Summary
                  </button>
                  <button className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition text-center">
                    Export Raw JSON
                  </button>
                </div>
              </>
            )}

            {activeTab === "settings" && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                    Workspace Preferences
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">v0.1.2 Production</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Animation & Sound Physics
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Customize spring stiffness, damping ratios, and haptic feedback profiles for all shared-layout components.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 gap-1.5">
                  <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">Reduced Motion Override</span>
                  <span className="text-xs font-mono font-semibold text-zinc-400">System Respect</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================================
 * 2. ELASTIC UNDERLINE TABS
 * ========================================================================= */
const UNDERLINE_TABS = [
  "General",
  "Security",
  "Billing",
  "Integrations",
  "API Keys",
];

function ElasticUnderlineTabs() {
  const [activeTab, setActiveTab] = useState(UNDERLINE_TABS[0]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-5">
      {/* Minimalist Baseline Header */}
      <div className="w-full border-b border-zinc-200/90 dark:border-zinc-800 overflow-x-auto no-scrollbar py-0.5">
        <div className="relative inline-flex sm:flex items-center gap-1 sm:gap-2 min-w-full">
          {UNDERLINE_TABS.map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative shrink-0 pb-3 pt-1 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-colors select-none whitespace-nowrap",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                <span>{tab}</span>

                {/* Elastic Moving Underline Bar */}
                {isActive && (
                  <motion.div
                    layoutId="elasticUnderline"
                    className="absolute bottom-0 inset-x-0 h-[2.5px] bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Viewport */}
      <div className="relative min-h-[140px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {activeTab} Management Panel
              </h4>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Configuring active parameters for {activeTab}. The elastic baseline slider automatically measures the exact text bounds of the clicked tab.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 gap-1 sm:gap-0">
              <span>Status: Synchronized</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Active Key • {activeTab}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================================
 * 3. EXPANDABLE ICON TABS (DYNAMIC WIDTH BREATHING)
 * ========================================================================= */
const EXPANDABLE_TABS = [
  { id: "dash", label: "Dashboard", icon: ZapIcon },
  { id: "user", label: "Account", icon: UserIcon },
  { id: "sec", label: "Security", icon: ShieldIcon },
  { id: "plan", label: "Billing", icon: CreditCardIcon },
  { id: "notif", label: "Alerts", icon: BellIcon },
];

function ExpandableIconTabs() {
  const [activeTab, setActiveTab] = useState(EXPANDABLE_TABS[0].id);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
      {/* Expandable Navigation Capsule */}
      <div className="w-full overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center py-1">
        <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm shrink-0">
          {EXPANDABLE_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                layout
                onClick={() => setActiveTab(tab.id)}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className={cn(
                  "relative shrink-0 flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full text-xs font-semibold select-none transition-colors",
                  isActive
                    ? "text-white font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {/* Active Morphing Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="expandablePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md shadow-indigo-600/30 -z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}

                <Icon size={16} className="relative z-10 shrink-0" />

                {/* Dynamic Label Breathing In When Active */}
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

      {/* Content Viewport */}
      <div className="w-full relative min-h-[140px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-[11px] sm:text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                Active Viewport
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Breathing Width Transition
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 capitalize">
              {EXPANDABLE_TABS.find((t) => t.id === activeTab)?.label} Hub
            </h4>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              When inactive, tab icons compress to preserve horizontal viewport real estate. Selecting any icon expands its parent capsule fluidly via Framer Motion layout projection.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================================
 * 4. VERTICAL MINIMAL TABS
 * ========================================================================= */
const VERTICAL_MENU = [
  { id: "profile", label: "Profile Info", icon: UserIcon },
  { id: "team", label: "Team Members", icon: LayersIcon },
  { id: "security", label: "Authentication", icon: ShieldIcon },
  { id: "notifications", label: "Notification Rules", icon: BellIcon },
  { id: "storage", label: "Data Storage", icon: HardDriveIcon },
];

function VerticalMinimalTabs() {
  const [activeItem, setActiveItem] = useState(VERTICAL_MENU[0].id);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch">
      {/* Left Vertical Menu */}
      <div className="w-full sm:w-48 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex sm:flex-col gap-1 p-1 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 min-w-full">
          {VERTICAL_MENU.map((item) => {
            const isActive = item.id === activeItem;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "relative shrink-0 sm:shrink sm:w-full flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold text-left transition-colors select-none whitespace-nowrap",
                  isActive
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {/* Vertical Sliding Tracker Indicator on Desktop, Horizontal Pill on Mobile */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="verticalTrack"
                      className="hidden sm:block absolute left-0 inset-y-1.5 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-full"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                    <motion.div
                      layoutId="verticalTrackMobile"
                      className="sm:hidden absolute bottom-0 inset-x-2 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                    <motion.div
                      layoutId="verticalBg"
                      className="absolute inset-0 bg-white dark:bg-zinc-800/80 shadow-xs rounded-xl -z-0"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  </>
                )}

                <Icon size={15} className="relative z-10 shrink-0" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 relative min-h-[160px] sm:min-h-[180px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                Navigation Panel
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Vertical Tracker Line</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
              {VERTICAL_MENU.find((m) => m.id === activeItem)?.label}
            </h4>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Configuring preferences for the selected vertical section. The indicator bar glides smoothly up and down the left border without layout shift.
            </p>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80">
              <span>Section Status</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active & Synced</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================================
 * 5. SEGMENTED CONTROL TABS (macOS STYLED TOGGLE)
 * ========================================================================= */
const TIERS = [
  { id: "monthly", label: "Monthly", price: "$29/mo", save: null },
  { id: "quarterly", label: "Quarterly", price: "$24/mo", save: "Save 15%" },
  { id: "annual", label: "Annual", price: "$19/mo", save: "Save 35%" },
  { id: "lifetime", label: "Lifetime", price: "$499 once", save: "Best Value" },
];

function SegmentedControlTabs() {
  const [selectedTier, setSelectedTier] = useState(TIERS[2].id); // Annual default

  const currentTier = TIERS.find((t) => t.id === selectedTier) || TIERS[0];

  return (
    <div className="w-full max-w-xl mx-auto space-y-5 sm:space-y-6 flex flex-col items-center">
      {/* macOS Styled Segmented Track */}
      <div className="w-full overflow-x-auto no-scrollbar py-0.5">
        <div className="inline-flex sm:flex w-auto sm:w-full min-w-full items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-inner">
          {TIERS.map((tier) => {
            const isSelected = tier.id === selectedTier;

            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={cn(
                  "relative flex-1 shrink-0 py-1.5 px-2.5 sm:px-2 text-xs font-semibold rounded-lg transition-colors select-none flex items-center justify-center gap-1.5 whitespace-nowrap",
                  isSelected
                    ? "text-zinc-950 dark:text-zinc-100 font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {/* Solid Apple Elevated Card Slider */}
                {isSelected && (
                  <motion.div
                    layoutId="segmentedActive"
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

      {/* Plan Preview Card matching active segment */}
      <div className="w-full p-4 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Pro Enterprise License
            </span>
            {currentTier.save && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">
                {currentTier.save}
              </span>
            )}
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {currentTier.price}
          </h4>
          <p className="text-xs text-zinc-500">
            Billed on a recurring {currentTier.label.toLowerCase()} cadence. Cancel anytime with zero fees.
          </p>
        </div>

        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition flex items-center justify-center gap-2">
          <span>Subscribe Now</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN PAGE COMPONENT: ANIMATED TABS DEMO (5 VARIANTS)
 * ========================================================================= */
export function AnimatedTabsDemo() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("id") ? "id" : "en") as
    | "en"
    | "id";
  const t = TABS_DICT[currentLang] || TABS_DICT.en;

  const tabsCards = [
    {
      id: "fluid-pill",
      title: t.variants.fluid.title,
      badge: t.variants.fluid.badge,
      desc: t.variants.fluid.description,
      snippet: t.variants.fluid.snippet,
      component: <FluidPillTabs />,
    },
    {
      id: "elastic-underline",
      title: t.variants.underline.title,
      badge: t.variants.underline.badge,
      desc: t.variants.underline.description,
      snippet: t.variants.underline.snippet,
      component: <ElasticUnderlineTabs />,
    },
    {
      id: "expandable-icon",
      title: t.variants.expandable.title,
      badge: t.variants.expandable.badge,
      desc: t.variants.expandable.description,
      snippet: t.variants.expandable.snippet,
      component: <ExpandableIconTabs />,
    },
    {
      id: "vertical-minimal",
      title: t.variants.vertical.title,
      badge: t.variants.vertical.badge,
      desc: t.variants.vertical.description,
      snippet: t.variants.vertical.snippet,
      component: <VerticalMinimalTabs />,
    },
    {
      id: "segmented-control",
      title: t.variants.segmented.title,
      badge: t.variants.segmented.badge,
      desc: t.variants.segmented.description,
      snippet: t.variants.segmented.snippet,
      component: <SegmentedControlTabs />,
    },
  ];

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-mono font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <ZapIcon size={12} />
            {t.pillTag1}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-mono font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
            <LayersIcon size={12} />
            {t.pillTag2}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.pageTitle}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          {t.pageDescription}
        </p>
      </div>

      {/* Single Column Stack of All 5 Tabs Architectures */}
      <div className="grid grid-cols-1 gap-8 sm:gap-14">
        {tabsCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-6 md:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            {/* Header Info */}
            <div className="space-y-2 mb-5 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <h2 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {card.title}
                </h2>
                <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 font-semibold">
                  {card.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {card.desc}
              </p>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="flex items-center justify-center p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-5 sm:mb-6 overflow-hidden">
              {card.component}
            </div>

            {/* Standardized Usage Snippet (No Framework Tabs) */}
            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default AnimatedTabsDemo;
