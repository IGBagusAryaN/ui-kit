import React from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import { APP_VERSION } from "../version";
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
  ArrowRightIcon,
  SettingsIcon,
} from "../../src/icons";
import {
  AnimatedTabs,
  FluidPillTabs,
  ElasticUnderlineTabs,
  ExpandableIconTabs,
  VerticalMinimalTabs,
  SegmentedControlTabs,
  type TabItem,
} from "../../src/components/AnimatedTabs";

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
        snippet: `// Standalone Component (or use <AnimatedTabs variant="fluid" />)
import { FluidPillTabs, type TabItem } from "@needui/ui-kit";

const tabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div>Overview Content</div> },
  { id: "analytics", label: "Analytics", content: <div>Analytics Content</div> },
  { id: "reports", label: "Reports", content: <div>Reports Content</div> },
  { id: "settings", label: "Settings", content: <div>Settings Content</div> },
];

export function FluidTabsExample() {
  return (
    <FluidPillTabs
      items={tabs}
      defaultValue="overview"
      onChange={(id) => console.log("Active Tab:", id)}
    />
  );
}`,
      },
      underline: {
        title: "2. Elastic Underline Tabs (Animated Border Bottom)",
        badge: "Spring Baseline Indicator",
        description:
          "Ultra-minimalist typography tabs anchored along a baseline border. A crisp color bar glides dynamically under the active text with calibrated spring damping for an elastic tactile feel.",
        snippet: `// Standalone Component (or use <AnimatedTabs variant="underline" />)
import { ElasticUnderlineTabs, type TabItem } from "@needui/ui-kit";

const tabs: TabItem[] = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "integrations", label: "Integrations" },
  { id: "api-keys", label: "API Keys" },
];

export function UnderlineTabsExample() {
  return (
    <ElasticUnderlineTabs
      items={tabs}
      defaultValue="general"
      onChange={(id) => console.log("Selected:", id)}
    />
  );
}`,
      },
      expandable: {
        title: "3. Expandable Icon Tabs (Dynamic Width Breathing)",
        badge: "Smart Width Layout Morph",
        description:
          "Compact visual space saver where inactive tabs display only subtle icon markers. Upon selection, the active tab smoothly breathes outward with Framer Motion layout animation to reveal its title label alongside the icon.",
        snippet: `// Standalone Component (or use <AnimatedTabs variant="expandable" />)
import { ExpandableIconTabs, type TabItem } from "@needui/ui-kit";
import { ZapIcon, UserIcon, ShieldIcon, BellIcon } from "@needui/ui-kit/icons";

const tabs: TabItem[] = [
  { id: "dash", label: "Dashboard", icon: <ZapIcon size={16} /> },
  { id: "user", label: "Account", icon: <UserIcon size={16} /> },
  { id: "sec", label: "Security", icon: <ShieldIcon size={16} /> },
  { id: "notif", label: "Alerts", icon: <BellIcon size={16} /> },
];

export function ExpandableTabsExample() {
  return (
    <ExpandableIconTabs
      items={tabs}
      defaultValue="dash"
      onChange={(id) => console.log("Tab:", id)}
    />
  );
}`,
      },
      vertical: {
        title: "4. Vertical Minimal Tabs (Side Navigation Line)",
        badge: "Vertical Slider Track",
        description:
          "Structured side-navigation architecture featuring a vertical sliding tracker line anchored to the left of the active menu item. Right viewport updates with smooth opacity fading.",
        snippet: `// Standalone Component (or use <AnimatedTabs variant="vertical" />)
import { VerticalMinimalTabs, type TabItem } from "@needui/ui-kit";

const menu: TabItem[] = [
  { id: "profile", label: "Profile Info" },
  { id: "team", label: "Team Members" },
  { id: "security", label: "Authentication" },
  { id: "storage", label: "Data Storage" },
];

export function VerticalTabsExample() {
  return (
    <VerticalMinimalTabs
      items={menu}
      defaultValue="profile"
      onChange={(id) => console.log("Nav:", id)}
    />
  );
}`,
      },
      segmented: {
        title: "5. Segmented Control Tabs (macOS Styled Toggle)",
        badge: "Cupertino Solid Slider",
        description:
          "Faithful replication of the iconic Apple macOS segmented control. Features an outer container housing an elevated solid card that glides beneath active segments with crisp tactile responsiveness.",
        snippet: `// Standalone Component (or use <AnimatedTabs variant="segmented" />)
import { SegmentedControlTabs, type TabItem } from "@needui/ui-kit";

const tiers: TabItem[] = [
  { id: "monthly", label: "Monthly", price: "$29/mo" },
  { id: "quarterly", label: "Quarterly", price: "$24/mo", save: "Save 15%" },
  { id: "annual", label: "Annual", price: "$19/mo", save: "Save 35%" },
  { id: "lifetime", label: "Lifetime", price: "$499 once", save: "Best Value" },
];

export function SegmentedTabsExample() {
  return (
    <SegmentedControlTabs
      items={tiers}
      defaultValue="annual"
      onChange={(tier) => console.log("Tier:", tier)}
    />
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
        snippet: `// Komponen Standalone (atau gunakan <AnimatedTabs variant="fluid" />)
import { FluidPillTabs, type TabItem } from "@needui/ui-kit";

const tabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div>Overview Content</div> },
  { id: "analytics", label: "Analytics", content: <div>Analytics Content</div> },
  { id: "reports", label: "Reports", content: <div>Reports Content</div> },
  { id: "settings", label: "Settings", content: <div>Settings Content</div> },
];

export function FluidTabsExample() {
  return (
    <FluidPillTabs
      items={tabs}
      defaultValue="overview"
      onChange={(id) => console.log("Active Tab:", id)}
    />
  );
}`,
      },
      underline: {
        title: "2. Elastic Underline Tabs (Animated Border Bottom)",
        badge: "Spring Baseline Indicator",
        description:
          "Tab tipografi ultra-minimalis tanpa latar belakang kontainer. Garis bawah berwarna cerah meluncur dinamis mengikuti teks aktif dengan redaman pegas yang presisi.",
        snippet: `// Komponen Standalone (atau gunakan <AnimatedTabs variant="underline" />)
import { ElasticUnderlineTabs, type TabItem } from "@needui/ui-kit";

const tabs: TabItem[] = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "integrations", label: "Integrations" },
  { id: "api-keys", label: "API Keys" },
];

export function UnderlineTabsExample() {
  return (
    <ElasticUnderlineTabs
      items={tabs}
      defaultValue="general"
      onChange={(id) => console.log("Selected:", id)}
    />
  );
}`,
      },
      expandable: {
        title: "3. Expandable Icon Tabs (Dynamic Width Breathing)",
        badge: "Smart Width Layout Morph",
        description:
          "Desain hemat ruang di mana tab non-aktif hanya menampilkan ikon kecil. Saat aktif, tab melebar secara organik menggunakan animasi layout untuk memunculkan label teks di sebelah ikon.",
        snippet: `// Komponen Standalone (atau gunakan <AnimatedTabs variant="expandable" />)
import { ExpandableIconTabs, type TabItem } from "@needui/ui-kit";
import { ZapIcon, UserIcon, ShieldIcon, BellIcon } from "@needui/ui-kit/icons";

const tabs: TabItem[] = [
  { id: "dash", label: "Dashboard", icon: <ZapIcon size={16} /> },
  { id: "user", label: "Account", icon: <UserIcon size={16} /> },
  { id: "sec", label: "Security", icon: <ShieldIcon size={16} /> },
  { id: "notif", label: "Alerts", icon: <BellIcon size={16} /> },
];

export function ExpandableTabsExample() {
  return (
    <ExpandableIconTabs
      items={tabs}
      defaultValue="dash"
      onChange={(id) => console.log("Tab:", id)}
    />
  );
}`,
      },
      vertical: {
        title: "4. Vertical Minimal Tabs (Side Navigation Line)",
        badge: "Vertical Slider Track",
        description:
          "Tata letak navigasi samping vertikal dengan garis pelacak vertikal tipis yang meluncur naik-turun menempel di sisi kiri item aktif. Area konten di kanan berganti secara halus.",
        snippet: `// Komponen Standalone (atau gunakan <AnimatedTabs variant="vertical" />)
import { VerticalMinimalTabs, type TabItem } from "@needui/ui-kit";

const menu: TabItem[] = [
  { id: "profile", label: "Profile Info" },
  { id: "team", label: "Team Members" },
  { id: "security", label: "Authentication" },
  { id: "storage", label: "Data Storage" },
];

export function VerticalTabsExample() {
  return (
    <VerticalMinimalTabs
      items={menu}
      defaultValue="profile"
      onChange={(id) => console.log("Nav:", id)}
    />
  );
}`,
      },
      segmented: {
        title: "5. Segmented Control Tabs (macOS Styled Toggle)",
        badge: "Cupertino Solid Slider",
        description:
          "Replikasi segmented control macOS Apple yang ikonik. Dilengkapi kotak solid berbayang lembut yang meluncur di dalam lintasan dengan responsivitas sentuhan yang cepat.",
        snippet: `// Komponen Standalone (atau gunakan <AnimatedTabs variant="segmented" />)
import { SegmentedControlTabs, type TabItem } from "@needui/ui-kit";

const tiers: TabItem[] = [
  { id: "monthly", label: "Monthly", price: "$29/mo" },
  { id: "quarterly", label: "Quarterly", price: "$24/mo", save: "Save 15%" },
  { id: "annual", label: "Annual", price: "$19/mo", save: "Save 35%" },
  { id: "lifetime", label: "Lifetime", price: "$499 once", save: "Best Value" },
];

export function SegmentedTabsExample() {
  return (
    <SegmentedControlTabs
      items={tiers}
      defaultValue="annual"
      onChange={(tier) => console.log("Tier:", tier)}
    />
  );
}`,
      },
    },
  },
};

/* -------------------------------------------------------------------------
 * DEMO TAB ITEMS WITH RICH CONTENT
 * ------------------------------------------------------------------------- */

const FLUID_DEMO_ITEMS: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <ActivityIcon size={14} />,
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
    icon: <ZapIcon size={14} />,
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
        <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
          <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Conversion Funnel Completion</span>
          <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">+18.2% YoY</span>
        </div>
      </div>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileTextIcon size={14} />,
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <button className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition text-center cursor-pointer">
            Download PDF Summary
          </button>
          <button className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition text-center cursor-pointer">
            Export Raw JSON
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={14} />,
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            Workspace Preferences
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">{APP_VERSION} Production</span>
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
      </div>
    ),
  },
];

const EXPANDABLE_DEMO_ITEMS: TabItem[] = [
  {
    id: "dash",
    label: "Dashboard",
    icon: <ZapIcon size={16} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Executive Dashboard
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          High-level operational KPIs, real-time user concurrency, and live revenue run rate telemetry.
        </p>
      </div>
    ),
  },
  {
    id: "user",
    label: "Account",
    icon: <UserIcon size={16} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Account Administration
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Manage identity SSO provider bindings, profile avatar URLs, and scoped OAuth scopes.
        </p>
      </div>
    ),
  },
  {
    id: "sec",
    label: "Security",
    icon: <ShieldIcon size={16} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Security & Secrets
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Rotate API signing tokens, hardware security keys (WebAuthn), and session audit logs.
        </p>
      </div>
    ),
  },
  {
    id: "plan",
    label: "Billing",
    icon: <CreditCardIcon size={16} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Billing & Invoicing
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          View auto-renew cycle invoices, tax jurisdiction IDs, and enterprise payment routing.
        </p>
      </div>
    ),
  },
  {
    id: "notif",
    label: "Alerts",
    icon: <BellIcon size={16} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Alert Rules & Webhooks
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Dispatch Slack and PagerDuty notifications whenever incident triage thresholds are breached.
        </p>
      </div>
    ),
  },
];

const VERTICAL_DEMO_ITEMS: TabItem[] = [
  {
    id: "profile",
    label: "Profile Info",
    icon: <UserIcon size={15} />,
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            Navigation Panel
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">Vertical Tracker Line</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Profile Information
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Configuring profile preferences and public bios. The indicator bar glides smoothly up and down the left border without layout shift.
        </p>
        <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80">
          <span>Section Status</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active & Synced</span>
        </div>
      </div>
    ),
  },
  {
    id: "team",
    label: "Team Members",
    icon: <LayersIcon size={15} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Team Access Control
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Manage member permissions, seat assignments, and repository collaboration roles.
        </p>
      </div>
    ),
  },
  {
    id: "security",
    label: "Authentication",
    icon: <ShieldIcon size={15} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Authentication Protocols
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Enforce multi-factor authentication (MFA) and SAML single sign-on across the organization.
        </p>
      </div>
    ),
  },
  {
    id: "notifications",
    label: "Notification Rules",
    icon: <BellIcon size={15} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Notification Preferences
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Control desktop push alerts, email digest frequency, and emergency alert escalation trees.
        </p>
      </div>
    ),
  },
  {
    id: "storage",
    label: "Data Storage",
    icon: <HardDriveIcon size={15} />,
    content: (
      <div className="space-y-2">
        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
          Storage Buckets
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Configure S3 asset replication, geo-redundant backups, and automated data retention policies.
        </p>
      </div>
    ),
  },
];

const SEGMENTED_DEMO_TIERS: TabItem[] = [
  {
    id: "monthly",
    label: "Monthly",
    price: "$29/mo",
    save: null,
    content: (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Monthly Flexible Plan
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">$29/mo</h4>
          <p className="text-xs text-zinc-500">Pay as you go. Pause or cancel anytime.</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer">
          <span>Subscribe Monthly</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    ),
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: "$24/mo",
    save: "Save 15%",
    content: (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">Quarterly Plan</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">Save 15%</span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">$24/mo</h4>
          <p className="text-xs text-zinc-500">Billed every 3 months with discounted seats.</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer">
          <span>Subscribe Quarterly</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    ),
  },
  {
    id: "annual",
    label: "Annual",
    price: "$19/mo",
    save: "Save 35%",
    content: (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">Annual Enterprise</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">Save 35%</span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">$19/mo</h4>
          <p className="text-xs text-zinc-500">Billed annually. Includes dedicated support engineer.</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer">
          <span>Subscribe Annual</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    ),
  },
  {
    id: "lifetime",
    label: "Lifetime",
    price: "$499 once",
    save: "Best Value",
    content: (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">Lifetime Founder</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400 font-bold">Best Value</span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100">$499 once</h4>
          <p className="text-xs text-zinc-500">One-time payment. All future updates included forever.</p>
        </div>
        <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer">
          <span>Get Lifetime Access</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    ),
  },
];

/* -------------------------------------------------------------------------
 * MAIN PLAYGROUND COMPONENT
 * ------------------------------------------------------------------------- */

export function AnimatedTabsDemo() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const currentLang = (isId ? "id" : "en") as "en" | "id";
  const t = TABS_DICT[currentLang] || TABS_DICT.en;

  const tabsCards = [
    {
      id: "fluid-pill",
      title: t.variants.fluid.title,
      badge: t.variants.fluid.badge,
      desc: t.variants.fluid.description,
      snippet: t.variants.fluid.snippet,
      component: (
        <div className="w-full max-w-xl mx-auto">
          <FluidPillTabs items={FLUID_DEMO_ITEMS} defaultValue="overview" />
        </div>
      ),
    },
    {
      id: "elastic-underline",
      title: t.variants.underline.title,
      badge: t.variants.underline.badge,
      desc: t.variants.underline.description,
      snippet: t.variants.underline.snippet,
      component: (
        <div className="w-full max-w-xl mx-auto">
          <ElasticUnderlineTabs defaultValue="general" />
        </div>
      ),
    },
    {
      id: "expandable-icon",
      title: t.variants.expandable.title,
      badge: t.variants.expandable.badge,
      desc: t.variants.expandable.description,
      snippet: t.variants.expandable.snippet,
      component: (
        <div className="w-full max-w-xl mx-auto">
          <ExpandableIconTabs items={EXPANDABLE_DEMO_ITEMS} defaultValue="dash" />
        </div>
      ),
    },
    {
      id: "vertical-minimal",
      title: t.variants.vertical.title,
      badge: t.variants.vertical.badge,
      desc: t.variants.vertical.description,
      snippet: t.variants.vertical.snippet,
      component: (
        <div className="w-full max-w-2xl mx-auto">
          <VerticalMinimalTabs items={VERTICAL_DEMO_ITEMS} defaultValue="profile" />
        </div>
      ),
    },
    {
      id: "segmented-control",
      title: t.variants.segmented.title,
      badge: t.variants.segmented.badge,
      desc: t.variants.segmented.description,
      snippet: t.variants.segmented.snippet,
      component: (
        <div className="w-full max-w-xl mx-auto">
          <SegmentedControlTabs items={SEGMENTED_DEMO_TIERS} defaultValue="annual" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-10 sm:space-y-12">
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

      <div className="grid grid-cols-1 gap-8 sm:gap-14">
        {tabsCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-6 md:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
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

            <div className="flex items-center justify-center p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-5 sm:mb-6 overflow-hidden">
              {card.component}
            </div>

            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>

      {/* PROPS API REFERENCE TABLE */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Props API Reference
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2.5">Prop</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Default</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  variant
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "fluid" | "underline" | "expandable" | "vertical" | "segmented" | "default"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"fluid"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Menentukan gaya visual, tata letak indikator, dan animasi transisi tab."
                    : "Specifies visual layout, slider indicator dynamics, and tab transition style."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  size
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "sm" | "default" | "lg"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Mengatur ukuran font teks, padding tombol, dan ketebalan track slider."
                    : "Sets typography sizing, button padding, and slider track thickness."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  items
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  TabItem[]
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">DEFAULT_ITEMS</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Daftar tab yang dirender (id, label, icon, content, badge, disabled, price, save)."
                    : "Array of tab descriptors (id, label, icon, content, badge, disabled, price, save)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  value
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "ID tab yang sedang aktif untuk mode controlled."
                    : "Currently active tab ID for controlled mode."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  defaultValue
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">items[0]?.id</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "ID tab aktif awal untuk mode uncontrolled."
                    : "Initial active tab ID for uncontrolled mode."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  onChange / onValueChange
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Callback saat tab aktif berganti diklik oleh pengguna."
                    : "Callback invoked whenever the active tab selection changes."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  showContent
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  boolean
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Menampilkan wadah kartu panel konten yang aktif di bawah bilah tab."
                    : "Renders the active tab content panel container card beneath the tab bar."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  tabListClassName
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class Tailwind tambahan khusus wadah tombol tab."
                    : "Custom Tailwind class for the tab buttons bar wrapper."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  contentClassName
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class Tailwind tambahan khusus wadah panel konten aktif."
                    : "Custom Tailwind class for the active content viewport container."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  className
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class Tailwind CSS kustom untuk root container komponen (cn)."
                    : "Custom Tailwind CSS classes merged via cn() onto the root container."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnimatedTabsDemo;
