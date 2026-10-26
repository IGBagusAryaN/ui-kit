import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AnimatedDropdown,
  ContextSelectDropdown,
  MegaMenuDropdown,
  UserProfileDropdown,
  CommandMenuDropdown,
  type DropdownItem,
} from "../../src/components/AnimatedDropdown";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  CreditCardIcon,
  ZapIcon,
  ShieldIcon,
  DatabaseIcon,
  UserIcon,
  SettingsIcon,
  KeyIcon,
  LogoutIcon,
  SearchIcon,
  TerminalIcon,
  PlusIcon,
  Share2Icon,
  CheckCircleIcon,
  RefreshCwIcon,
  CloudIcon,
  LayersIcon,
} from "../../src/icons";

export function DropdownDemo() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const [activeContextId, setActiveContextId] = useState<string>("prod");
  const [activeMegaId, setActiveMegaId] = useState<string>("payments");

  const contextData: DropdownItem[] = useMemo(
    () => [
      {
        id: "prod",
        label: t("content.dropdownDemo.data.context.items.prod.label", "Production (us-east-1)"),
        icon: <CheckCircleIcon size={15} className="text-emerald-500" />,
        badge: t("content.dropdownDemo.data.context.items.prod.badge", "Live"),
        isActive: activeContextId === "prod",
      },
      {
        id: "staging",
        label: t("content.dropdownDemo.data.context.items.staging.label", "Staging (eu-central-1)"),
        icon: <RefreshCwIcon size={15} className="text-sky-500" />,
        badge: t("content.dropdownDemo.data.context.items.staging.badge", "v2.4"),
        isActive: activeContextId === "staging",
      },
      {
        id: "dev",
        label: t("content.dropdownDemo.data.context.items.dev.label", "Development (ap-southeast-1)"),
        icon: <TerminalIcon size={15} className="text-amber-500" />,
        isActive: activeContextId === "dev",
      },
      {
        id: "preview",
        label: t("content.dropdownDemo.data.context.items.preview.label", "Preview Branch (Ephemeral)"),
        icon: <Share2Icon size={15} className="text-purple-500" />,
        isActive: activeContextId === "preview",
      },
    ],
    [t, activeContextId]
  );

  const megaData: DropdownItem[] = useMemo(
    () => [
      {
        id: "payments",
        label: t("content.dropdownDemo.data.mega.items.payments.label", "Payments & Billing"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.payments.subtitle",
          "Infrastruktur pemrosesan transaksi global & multi-mata uang."
        ),
        icon: <CreditCardIcon size={18} className="text-indigo-500" />,
        badge: t("content.dropdownDemo.data.mega.items.payments.badge", "Popular"),
      },
      {
        id: "connect",
        label: t("content.dropdownDemo.data.mega.items.connect.label", "Instant Connect"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.connect.subtitle",
          "Routing pembayaran marketplace & split fee otomatis."
        ),
        icon: <ZapIcon size={18} className="text-amber-500" />,
      },
      {
        id: "vault",
        label: t("content.dropdownDemo.data.mega.items.vault.label", "Cloud Vault"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.vault.subtitle",
          "Enkripsi zero-knowledge & penyimpanan token PCI-DSS."
        ),
        icon: <DatabaseIcon size={18} className="text-emerald-500" />,
      },
      {
        id: "shield",
        label: t("content.dropdownDemo.data.mega.items.shield.label", "Fraud Shield"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.shield.subtitle",
          "Deteksi anomali berbasis AI & machine learning realtime."
        ),
        icon: <ShieldIcon size={18} className="text-rose-500" />,
        badge: t("content.dropdownDemo.data.mega.items.shield.badge", "AI"),
      },
      {
        id: "analytics",
        label: t("content.dropdownDemo.data.mega.items.analytics.label", "Deep Analytics"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.analytics.subtitle",
          "Insight metrik churn, MRR, dan visualisasi retensi pengguna."
        ),
        icon: <LayersIcon size={18} className="text-sky-500" />,
      },
      {
        id: "deploy",
        label: t("content.dropdownDemo.data.mega.items.deploy.label", "Edge Network"),
        subtitle: t(
          "content.dropdownDemo.data.mega.items.deploy.subtitle",
          "Jaringan server CDN 280+ PoP di seluruh dunia."
        ),
        icon: <CloudIcon size={18} className="text-purple-500" />,
      },
    ],
    [t]
  );

  const profileMenuItems: DropdownItem[] = useMemo(
    () => [
      {
        id: "profile",
        label: t("content.dropdownDemo.data.profile.items.profile.label", "Profil Akun"),
        icon: <UserIcon size={15} className="text-neutral-500" />,
      },
      {
        id: "settings",
        label: t("content.dropdownDemo.data.profile.items.settings.label", "Pengaturan Workspace"),
        icon: <SettingsIcon size={15} className="text-neutral-500" />,
      },
      {
        id: "keys",
        label: t("content.dropdownDemo.data.profile.items.keys.label", "API Credentials"),
        icon: <KeyIcon size={15} className="text-amber-500" />,
        badge: t("content.dropdownDemo.data.profile.items.keys.badge", "Active"),
      },
      {
        id: "logout",
        label: t("content.dropdownDemo.data.profile.items.logout.label", "Keluar Akun"),
        icon: <LogoutIcon size={15} className="text-rose-500" />,
        isDestructive: true,
        separator: true,
      },
    ],
    [t]
  );

  const commandData: DropdownItem[] = useMemo(
    () => [
      {
        id: "cmd-new",
        label: t("content.dropdownDemo.data.command.items.newProject.label", "Create New Project"),
        icon: <PlusIcon size={15} className="text-blue-500" />,
        shortcut: "⌘N",
      },
      {
        id: "cmd-invite",
        label: t("content.dropdownDemo.data.command.items.inviteMember.label", "Invite Team Member"),
        icon: <UserIcon size={15} className="text-emerald-500" />,
        shortcut: "⇧I",
      },
      {
        id: "cmd-deploy",
        label: t("content.dropdownDemo.data.command.items.deployProd.label", "Deploy to Production"),
        icon: <CloudIcon size={15} className="text-indigo-500" />,
        shortcut: "⇧D",
      },
      {
        id: "cmd-security",
        label: t("content.dropdownDemo.data.command.items.securityAudit.label", "Run Security Audit"),
        icon: <ShieldIcon size={15} className="text-rose-500" />,
        shortcut: "⇧S",
      },
      {
        id: "cmd-settings",
        label: t("content.dropdownDemo.data.command.items.systemPrefs.label", "System Preferences"),
        icon: <SettingsIcon size={15} className="text-neutral-500" />,
        shortcut: "⌘,",
      },
    ],
    [t]
  );

  const contextSnippet = useMemo(
    () => `// Standalone Component (atau gunakan <AnimatedDropdown variant="context" />)
import { ContextSelectDropdown, type DropdownItem } from "@needui/ui-kit";

const environmentItems: DropdownItem[] = [
  { id: "prod", label: "${t("content.dropdownDemo.data.context.items.prod.label", "Production (us-east-1)")}", badge: "${t("content.dropdownDemo.data.context.items.prod.badge", "Live")}", isActive: true },
  { id: "staging", label: "${t("content.dropdownDemo.data.context.items.staging.label", "Staging (eu-central-1)")}" },
  { id: "dev", label: "${t("content.dropdownDemo.data.context.items.dev.label", "Development (ap-southeast-1)")}" },
  { id: "preview", label: "${t("content.dropdownDemo.data.context.items.preview.label", "Preview Branch (Ephemeral)")}" },
];

export function EnvironmentSelect() {
  return (
    <ContextSelectDropdown
      items={environmentItems}
      triggerLabel="${t("content.dropdownDemo.data.context.triggerLabel", "Pilih Environment")}"
      align="center"
      onItemClick={(item) => console.log(item)}
    />
  );
}`,
    [t]
  );

  const megaSnippet = useMemo(
    () => `// Standalone Component (atau gunakan <AnimatedDropdown variant="mega" />)
import { MegaMenuDropdown, type DropdownItem } from "@needui/ui-kit";

const solutionItems: DropdownItem[] = [
  { id: "payments", label: "${t("content.dropdownDemo.data.mega.items.payments.label", "Payments & Billing")}", subtitle: "${t("content.dropdownDemo.data.mega.items.payments.subtitle", "Infrastruktur pemrosesan transaksi global")}", badge: "${t("content.dropdownDemo.data.mega.items.payments.badge", "Popular")}" },
  { id: "connect", label: "${t("content.dropdownDemo.data.mega.items.connect.label", "Instant Connect")}", subtitle: "${t("content.dropdownDemo.data.mega.items.connect.subtitle", "Routing marketplace & split fee otomatis")}" },
  { id: "vault", label: "${t("content.dropdownDemo.data.mega.items.vault.label", "Cloud Vault")}", subtitle: "${t("content.dropdownDemo.data.mega.items.vault.subtitle", "Enkripsi zero-knowledge & PCI-DSS token storage")}" },
  { id: "shield", label: "${t("content.dropdownDemo.data.mega.items.shield.label", "Fraud Shield")}", subtitle: "${t("content.dropdownDemo.data.mega.items.shield.subtitle", "Deteksi anomali berbasis AI realtime")}", badge: "AI" },
];

export function NavigationMegaMenu() {
  return (
    <MegaMenuDropdown
      items={solutionItems}
      triggerLabel="${t("content.dropdownDemo.data.mega.triggerLabel", "Semua Solusi & Fitur")}"
      align="center"
      onItemClick={(item) => console.log(item)}
    />
  );
}`,
    [t]
  );

  const profileSnippet = useMemo(
    () => `// Standalone Component (atau gunakan <AnimatedDropdown variant="profile" />)
import { UserProfileDropdown, type DropdownItem } from "@needui/ui-kit";

const userMenuItems: DropdownItem[] = [
  { id: "profile", label: "${t("content.dropdownDemo.data.profile.items.profile.label", "Profil Akun")}" },
  { id: "settings", label: "${t("content.dropdownDemo.data.profile.items.settings.label", "Pengaturan Workspace")}" },
  { id: "keys", label: "${t("content.dropdownDemo.data.profile.items.keys.label", "API Credentials")}", badge: "${t("content.dropdownDemo.data.profile.items.keys.badge", "Active")}" },
  { id: "logout", label: "${t("content.dropdownDemo.data.profile.items.logout.label", "Keluar Akun")}", isDestructive: true, separator: true },
];

export function UserAccountMenu() {
  return (
    <UserProfileDropdown
      items={userMenuItems}
      profile={{
        name: "${t("content.dropdownDemo.data.profile.name", "John Doe")}",
        email: "${t("content.dropdownDemo.data.profile.email", "John Doe")}",
        avatarFallback: "AW",
        status: "${t("content.dropdownDemo.data.profile.status", "Pro Member")}",
      }}
      align="center"
      onItemClick={(item) => console.log(item)}
    />
  );
}`,
    [t]
  );

  const commandSnippet = useMemo(
    () => `// Standalone Component (atau gunakan <AnimatedDropdown variant="command" />)
import { CommandMenuDropdown, type DropdownItem } from "@needui/ui-kit";

const commandItems: DropdownItem[] = [
  { id: "cmd-new", label: "${t("content.dropdownDemo.data.command.items.newProject.label", "Create New Project")}", shortcut: "⌘N" },
  { id: "cmd-invite", label: "${t("content.dropdownDemo.data.command.items.inviteMember.label", "Invite Team Member")}", shortcut: "⇧I" },
  { id: "cmd-deploy", label: "${t("content.dropdownDemo.data.command.items.deployProd.label", "Deploy to Production")}", shortcut: "⇧D" },
  { id: "cmd-audit", label: "${t("content.dropdownDemo.data.command.items.securityAudit.label", "Run Security Audit")}", shortcut: "⇧S" },
  { id: "cmd-settings", label: "${t("content.dropdownDemo.data.command.items.systemPrefs.label", "System Preferences")}", shortcut: "⌘," },
];

export function QuickCommandMenu() {
  return (
    <CommandMenuDropdown
      items={commandItems}
      triggerLabel="${t("content.dropdownDemo.data.command.triggerLabel", "Ketik perintah... (⌘K)")}"
      searchPlaceholder="${t("content.dropdownDemo.data.command.searchPlaceholder", "Cari perintah atau aksi cepat...")}"
      align="center"
      onItemClick={(item) => console.log(item)}
    />
  );
}`,
    [t]
  );

  /* -------------------------------------------------------------------------
   * LIST DEFINITION FOR SINGLE SOURCE OF TRUTH
   * ------------------------------------------------------------------------- */
  const dropdownList = useMemo(
    () => [
      {
        id: "context-select",
        title: t("content.dropdownDemo.variants.context.title", "1. Context & Select Menu (Floating Popover)"),
        badge: t("content.dropdownDemo.variants.context.badge", "Floating Staggered"),
        description: t(
          "content.dropdownDemo.variants.context.desc",
          "Menu mengambang adaptif ala Vercel untuk pemilihan environment atau opsi cepat dengan checkmark status aktif, animasi staggered halus, dan auto-close saat klik di luar."
        ),
        snippet: contextSnippet,
        render: () => (
          <div className="w-full flex items-start justify-center pt-8 pb-16">
            <AnimatedDropdown
              variant="context"
              items={contextData}
              activeId={activeContextId}
              triggerLabel={t("content.dropdownDemo.data.context.triggerLabel", "Pilih Environment")}
              align="center"
              onItemClick={(item) => setActiveContextId(item.id)}
            />
          </div>
        ),
      },
      {
        id: "mega-grid",
        title: t("content.dropdownDemo.variants.mega.title", "2. Mega Menu (2-Column Feature Grid)"),
        badge: t("content.dropdownDemo.variants.mega.badge", "Stripe Style Grid"),
        description: t(
          "content.dropdownDemo.variants.mega.desc",
          "Panel navigasi dua kolom ala Stripe dengan kartu berikon, subtitle penjelasan, badge fitur baru, dan footer aksi dengan transisi spring physics."
        ),
        snippet: megaSnippet,
        render: () => (
          <div className="w-full flex items-start justify-center pt-8 pb-16">
            <AnimatedDropdown
              variant="mega"
              items={megaData}
              activeId={activeMegaId}
              triggerLabel={t("content.dropdownDemo.data.mega.triggerLabel", "Semua Solusi & Fitur")}
              align="center"
              onItemClick={(item) => setActiveMegaId(item.id)}
            />
          </div>
        ),
      },
      {
        id: "user-profile",
        title: t("content.dropdownDemo.variants.profile.title", "3. User Profile Menu (Account & Settings)"),
        badge: t("content.dropdownDemo.variants.profile.badge", "Avatar Popover"),
        description: t(
          "content.dropdownDemo.variants.profile.desc",
          "Menu akun pengguna ala GitHub & Linear dengan avatar header, nama & email pengguna, navigasi profil, pengaturan, dan tombol logout destruktif."
        ),
        snippet: profileSnippet,
        render: () => (
          <div className="w-full flex items-start justify-center pt-8 pb-16">
            <AnimatedDropdown
              variant="profile"
              items={profileMenuItems}
              profile={{
                name: t("content.dropdownDemo.data.profile.name", "John Doe"),
                email: t("content.dropdownDemo.data.profile.email", "John Doe"),
                avatarFallback: "AW",
                status: t("content.dropdownDemo.data.profile.status", "Pro Member"),
              }}
              align="center"
              onItemClick={(item) => console.log("Profile clicked:", item)}
            />
          </div>
        ),
      },
      {
        id: "command-search",
        title: t("content.dropdownDemo.variants.command.title", "4. Command Search Menu (Raycast Palette)"),
        badge: t("content.dropdownDemo.variants.command.badge", "Keyboard Shortcuts"),
        description: t(
          "content.dropdownDemo.variants.command.desc",
          "Dropdown pencarian aksi cepat ala Raycast dengan input search instan, pengelompokan aksi, dan badge shortcut keyboard."
        ),
        snippet: commandSnippet,
        render: () => (
          <div className="w-full flex items-start justify-center pt-8 pb-16">
            <AnimatedDropdown
              variant="command"
              items={commandData}
              triggerLabel={t("content.dropdownDemo.data.command.triggerLabel", "Ketik perintah... (⌘K)")}
              searchPlaceholder={t(
                "content.dropdownDemo.data.command.searchPlaceholder",
                "Cari perintah atau aksi cepat..."
              )}
              align="center"
              onItemClick={(item) => console.log("Command clicked:", item)}
            />
          </div>
        ),
      },
    ],
    [
      t,
      activeContextId,
      activeMegaId,
      contextData,
      megaData,
      profileMenuItems,
      commandData,
      contextSnippet,
      megaSnippet,
      profileSnippet,
      commandSnippet,
    ]
  );

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return dropdownList;
    return dropdownList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [dropdownList, searchQuery]);

  return (
    <div className="w-full space-y-8">
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
              "content.dropdownDemo.searchPlaceholder",
              "Cari variasi dropdown (contoh: 'context', 'mega', 'profile', 'command', 'select')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("common.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {t("content.dropdownDemo.collectionTitle", "Koleksi Variasi Dropdown Animasi:")}
            </span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.dropdownDemo.showingCount", {
                count: filteredList.length,
                total: dropdownList.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${dropdownList.length} variasi dropdown interaktif.`,
              })}
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {t("content.dropdownDemo.statusBadge", "Floating & Click-Outside Handled")}
          </span>
        </div>
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.dropdownDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan variasi dropdown dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.dropdownDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-14">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-6 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            <div className="space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="w-full min-h-[360px] flex items-start justify-center pt-8 pb-16 px-2 sm:px-4 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 overflow-x-auto no-scrollbar">
              {item.render()}
            </div>

            <CodeSnippet code={item.snippet} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownDemo;
