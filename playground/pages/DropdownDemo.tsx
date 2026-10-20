import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AnimatedDropdown,
  DropdownItem,
} from "../../src/components/AnimatedDropdown";
import { MultiCodeSnippet } from "../components/MultiCodeSnippet";
import {
  FolderIcon,
  FileTextIcon,
  CodeIcon,
  GlobeIcon,
  HardDriveIcon,
  CloudIcon,
  LayersIcon,
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
} from "../../src/icons";

export function DropdownDemo() {
  const { t } = useTranslation();

  // State telemetry interaksi pengguna
  const [activeItemLabel, setActiveItemLabel] = useState<string>("Belum ada item yang diklik");
  const [activeVariantName, setActiveVariantName] = useState<string>("-");

  // State spesifik untuk masing-masing varian
  const [activeTreeId, setActiveTreeId] = useState<string>("web-master");
  const [activeContextId, setActiveContextId] = useState<string>("prod");
  const [activeMegaId, setActiveMegaId] = useState<string>("payments");

  const notifyClick = (variant: string, item: DropdownItem) => {
    setActiveVariantName(variant);
    setActiveItemLabel(item.label);
  };

  /* -------------------------------------------------------------------------
   * DATA 1: variant="tree" (Nested Explorer - Notion Style)
   * ------------------------------------------------------------------------- */
  const treeData: DropdownItem[] = [
    {
      id: "departments",
      label: "DEPARTMENTS",
      icon: <FolderIcon size={15} className="text-amber-500" />,
      defaultOpen: true,
      children: [
        {
          id: "docs",
          label: "Docs & Specifications",
          icon: <FileTextIcon size={15} className="text-sky-500" />,
        },
        {
          id: "programmer-dev",
          label: "Programmer (Dev)",
          icon: <CodeIcon size={15} className="text-emerald-500" />,
          badge: 70,
        },
        {
          id: "web-master",
          label: "Web Master",
          icon: <GlobeIcon size={15} className="text-indigo-500" />,
          badge: 21,
          isActive: true,
        },
        {
          id: "infra-network",
          label: "Infra & Network",
          icon: <HardDriveIcon size={15} className="text-purple-500" />,
          badge: 10,
        },
      ],
    },
    {
      id: "resources",
      label: "RESOURCES",
      icon: <LayersIcon size={15} className="text-rose-500" />,
      defaultOpen: false,
      children: [
        {
          id: "design-tokens",
          label: "Design Tokens",
          icon: <ZapIcon size={15} className="text-amber-400" />,
          badge: 128,
        },
        {
          id: "api-endpoints",
          label: "API Endpoints",
          icon: <TerminalIcon size={15} className="text-cyan-500" />,
          badge: 45,
        },
      ],
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA 2: variant="context" (Vercel Style Floating Menu)
   * ------------------------------------------------------------------------- */
  const contextData: DropdownItem[] = [
    {
      id: "prod",
      label: "Production (us-east)",
      icon: <CheckCircleIcon size={15} className="text-emerald-500" />,
      badge: "live",
      isActive: true,
    },
    {
      id: "staging",
      label: "Staging (sgp-1)",
      icon: <CloudIcon size={15} className="text-amber-500" />,
      badge: "syncing",
    },
    {
      id: "preview",
      label: "Preview Deployments",
      icon: <GlobeIcon size={15} className="text-sky-500" />,
      badge: 14,
    },
    {
      id: "dev",
      label: "Local Development",
      icon: <TerminalIcon size={15} className="text-zinc-500" />,
    },
    {
      id: "redeploy",
      label: "Trigger Redeployment",
      icon: <RefreshCwIcon size={15} className="text-indigo-500" />,
      separator: true,
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA 3: variant="mega" (Stripe Style 2-Column Grid)
   * ------------------------------------------------------------------------- */
  const megaData: DropdownItem[] = [
    {
      id: "payments",
      label: "Global Payments",
      subtitle: "Terima kartu kredit, transfer bank, dan e-wallet global.",
      icon: <CreditCardIcon size={17} className="text-indigo-500" />,
      badge: "Hot",
      isActive: true,
    },
    {
      id: "billing",
      label: "Automated Billing",
      subtitle: "Kelola langganan bulanan dan faktur pajak otomatis.",
      icon: <ZapIcon size={17} className="text-amber-500" />,
    },
    {
      id: "radar",
      label: "Fraud & Risk Radar",
      subtitle: "Deteksi kecurangan transaksi secara real-time via AI.",
      icon: <ShieldIcon size={17} className="text-emerald-500" />,
      badge: "Security",
    },
    {
      id: "database",
      label: "Cloud Storage",
      subtitle: "Database terdistribusi multi-region dengan latensi rendah.",
      icon: <DatabaseIcon size={17} className="text-purple-500" />,
    },
    {
      id: "terminal",
      label: "In-Person Terminal",
      subtitle: "Integrasi mesin EDC dan pembayaran offline di kasir.",
      icon: <TerminalIcon size={17} className="text-sky-500" />,
    },
    {
      id: "connect",
      label: "Marketplace Connect",
      subtitle: "Bagi hasil payout otomatis ke merchant dan mitra vendor.",
      icon: <Share2Icon size={17} className="text-rose-500" />,
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA 4: variant="profile" (GitHub Style User Menu)
   * ------------------------------------------------------------------------- */
  const profileData: DropdownItem[] = [
    {
      id: "profile-page",
      label: "Your Profile",
      icon: <UserIcon size={15} className="text-zinc-500" />,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: <SettingsIcon size={15} className="text-zinc-500" />,
    },
    {
      id: "api-keys",
      label: "API Tokens & Keys",
      icon: <KeyIcon size={15} className="text-zinc-500" />,
      badge: "3 active",
    },
    {
      id: "cloud-teams",
      label: "Organization Teams",
      icon: <LayersIcon size={15} className="text-zinc-500" />,
    },
    {
      id: "logout",
      label: "Sign out",
      icon: <LogoutIcon size={15} className="text-rose-500" />,
      separator: true,
      isDestructive: true,
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA 5: variant="command" (Raycast Style Search Menu)
   * ------------------------------------------------------------------------- */
  const commandData: DropdownItem[] = [
    {
      id: "cmd-new-proj",
      label: "New Project / Repository",
      icon: <PlusIcon size={15} className="text-emerald-500" />,
      shortcut: "⌘N",
    },
    {
      id: "cmd-search-files",
      label: "Quick Search Files",
      icon: <SearchIcon size={15} className="text-sky-500" />,
      shortcut: "⌘P",
    },
    {
      id: "cmd-open-terminal",
      label: "Open Cloud Terminal",
      icon: <TerminalIcon size={15} className="text-purple-500" />,
      shortcut: "⌥T",
    },
    {
      id: "cmd-copy-link",
      label: "Copy Shareable Link",
      icon: <Share2Icon size={15} className="text-amber-500" />,
      shortcut: "⌘C",
    },
    {
      id: "cmd-deploy",
      label: "Deploy to Production",
      icon: <CloudIcon size={15} className="text-indigo-500" />,
      shortcut: "⇧D",
    },
    {
      id: "cmd-security",
      label: "Run Security Audit",
      icon: <ShieldIcon size={15} className="text-rose-500" />,
      shortcut: "⇧S",
    },
    {
      id: "cmd-settings",
      label: "System Preferences",
      icon: <SettingsIcon size={15} className="text-zinc-500" />,
      shortcut: "⌘,",
    },
  ];

  /* -------------------------------------------------------------------------
   * CODE BLOCKS: MULTI-FRAMEWORK SNIPPETS
   * ------------------------------------------------------------------------- */
  const codeBlocks = {
    react: `import { AnimatedDropdown, DropdownItem } from "@bgsaryzzz/ui";

// 1. Variant "tree" (Nested Explorer)
<AnimatedDropdown variant="tree" items={departmentItems} activeId="web-master" />

// 2. Variant "context" (Vercel Floating Menu)
<AnimatedDropdown variant="context" items={environmentItems} triggerLabel="Pilih Environment" />

// 3. Variant "mega" (Stripe 2-Column Grid)
<AnimatedDropdown variant="mega" items={saasProducts} triggerLabel="Semua Solusi & Fitur" />

// 4. Variant "profile" (GitHub User Menu)
<AnimatedDropdown
  variant="profile"
  items={userMenuItems}
  profile={{
    name: "Arya Wijaya",
    email: "arya@acme.co",
    avatarFallback: "AW",
  }}
/>

// 5. Variant "command" (Raycast Search Menu)
<AnimatedDropdown variant="command" items={commandItems} searchPlaceholder="Cari perintah..." />`,

    vue: `<script setup>
import { AnimatedDropdown } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <!-- Varian Context Menu -->
  <AnimatedDropdown variant="context" :items="envItems" triggerLabel="Pilih Server" />

  <!-- Varian Mega Menu (2-Column) -->
  <AnimatedDropdown variant="mega" :items="saasItems" triggerLabel="Produk" />

  <!-- Varian Command Palette -->
  <AnimatedDropdown variant="command" :items="commands" searchPlaceholder="Ketik perintah..." />
</template>`,

    laravel: `{{-- resources/views/components/dropdown-showcase.blade.php --}}
{{-- 1. Tree Explorer --}}
<x-ui::animated-dropdown variant="tree" :items="$departments" />

{{-- 2. Context Menu --}}
<x-ui::animated-dropdown variant="context" :items="$environments" trigger-label="Pilih Env" />

{{-- 3. Mega Menu (2-Col Grid) --}}
<x-ui::animated-dropdown variant="mega" :items="$products" trigger-label="Solusi SaaS" />

{{-- 4. Profile Menu --}}
<x-ui::animated-dropdown variant="profile" :items="$userMenu" :profile="$currentUser" />

{{-- 5. Command Search Menu --}}
<x-ui::animated-dropdown variant="command" :items="$commands" search-placeholder="Ketik aksi..." />`,
  };

  return (
    <div className="space-y-16">
      {/* Telemetry Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-500 dark:text-zinc-400">Interaksi Terakhir:</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            [{activeVariantName}] {activeItemLabel}
          </span>
        </div>
        <div className="text-zinc-500 dark:text-zinc-400 font-sans text-xs">
          5 Variasi Modern • Framer Motion • Click Outside Auto-Close
        </div>
      </div>

      {/* =====================================================================
       * 1. VARIANT: "tree" (Nested Explorer ala Notion)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Varian 1
            </span>
            <span className="text-xs font-mono text-zinc-500">variant="tree"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            1. Nested Explorer (Notion Style)
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Struktur pohon hierarkis rekursif (parent-child) dengan garis vertikal pemandu hierarki, rotasi chevron otomatis, badge angka status, dan animasi transisi tinggi accordion (<code className="font-mono text-xs">height: 0 → auto</code>).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-4">
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-3 font-semibold">
                Organization Tree
              </span>
              <AnimatedDropdown
                variant="tree"
                items={treeData}
                activeId={activeTreeId}
                onItemClick={(item) => {
                  setActiveTreeId(item.id);
                  notifyClick("variant=tree", item);
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Karakteristik Utama:</h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <li>Animasi ekspansi mulus menggunakan kurva <code className="font-mono">[0.04, 0.62, 0.23, 0.98]</code>.</li>
                <li>Garis hierarki vertikal otomatis sejajar dengan posisi chevron induk.</li>
                <li>Skema warna adaptif: lembut di Light Mode dan menyatu natural di Dark Mode.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 2. VARIANT: "context" (Vercel Style Floating Menu)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Varian 2
            </span>
            <span className="text-xs font-mono text-zinc-500">variant="context"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            2. Floating Context Menu (Vercel Style)
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Menu mengambang berposisi absolut dengan efek <code className="font-mono text-xs">backdrop-blur-md</code>, bayangan dramatis <code className="font-mono text-xs">shadow-2xl</code>, animasi masuk skala <code className="font-mono text-xs">scale: 0.95 → 1</code>, dan animasi <em>staggered children</em> berurutan dari atas ke bawah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 py-4">
            <AnimatedDropdown
              variant="context"
              items={contextData}
              activeId={activeContextId}
              triggerLabel="Pilih Environment"
              align="left"
              onItemClick={(item) => {
                setActiveContextId(item.id);
                notifyClick("variant=context", item);
              }}
            />
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Interaksi & Animasi:</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Klik tombol untuk membuka menu popover. Setiap elemen baris muncul berurutan dengan jeda <em>stagger</em> 35ms. Klik di luar area menu atau tekan tombol <kbd className="font-mono px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Esc</kbd> untuk menutup secara otomatis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 3. VARIANT: "mega" (Stripe Style 2-Column Grid)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Varian 3
            </span>
            <span className="text-xs font-mono text-zinc-500">variant="mega"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            3. Navigation Mega Menu (Stripe Style)
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Dropdown lebar berposisi absolut yang dirender dalam tata letak <strong>grid 2 kolom</strong>. Masing-masing opsi memiliki kotak ikon modern, title utama, dan deskripsi subtitle informatif. Menggunakan animasi <strong>spring physics</strong> (geser pegas dari <code className="font-mono text-xs">y: -15</code> ke <code className="font-mono text-xs">y: 0</code>).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 py-4">
            <AnimatedDropdown
              variant="mega"
              items={megaData}
              activeId={activeMegaId}
              triggerLabel="Jelajahi Produk & Layanan"
              align="left"
              onItemClick={(item) => {
                setActiveMegaId(item.id);
                notifyClick("variant=mega", item);
              }}
            />
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Physics & Layout:</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Dioptimalkan untuk menu navigasi navbar tingkat lanjut pada aplikasi SaaS. Menggunakan <code className="font-mono">stiffness: 420</code> dan <code className="font-mono">damping: 26</code> untuk sensasi pegas yang natural dan presisi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 4. VARIANT: "profile" (GitHub Style User Menu)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Varian 4
            </span>
            <span className="text-xs font-mono text-zinc-500">variant="profile"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            4. User Account Menu (GitHub Style)
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Dropdown profil berposisi absolut yang dilengkapi header akun (Avatar, Nama, Email), garis pemisah tipis, daftar menu pengaturan akun, dan tombol aksi <strong>destructive (merah)</strong> seperti "Sign out".
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 py-4">
            <AnimatedDropdown
              variant="profile"
              items={profileData}
              profile={{
                name: "Arya Wijaya",
                email: "arya@engineering.acme.co",
                avatarFallback: "AW",
              }}
              align="left"
              onItemClick={(item) => notifyClick("variant=profile", item)}
            />
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Header & Destructive Action:</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Item dengan prop <code className="font-mono text-rose-500 font-semibold">isDestructive: true</code> secara otomatis mendapatkan penekanan teks merah dengan efek hover latar belakang merah redup, memberikan indikasi visual tegas terhadap aksi sensitif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 5. VARIANT: "command" (Raycast Style Search Menu)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Varian 5
            </span>
            <span className="text-xs font-mono text-zinc-500">variant="command"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            5. Raycast Style Command Palette
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Dropdown interaktif yang terintegrasi langsung dengan <strong>kotak input pencarian</strong> di bagian atas. Menampilkan daftar perintah yang dapat di-scroll (<code className="font-mono text-xs">max-h-60 overflow-y-auto</code>) dan dilengkapi badge pintasan keyboard (<em>keyboard shortcut badges</em> seperti ⌘N, ⌘P, ⇧D).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 py-4">
            <AnimatedDropdown
              variant="command"
              items={commandData}
              triggerLabel="Buka Command Menu"
              searchPlaceholder="Ketik perintah aksi (misal: 'deploy', 'search')..."
              align="left"
              onItemClick={(item) => notifyClick("variant=command", item)}
            />
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Live Search & Shortcut:</h4>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Input pencarian langsung memfilter item menu secara real-time. Input difokuskan secara otomatis saat popover dibuka. Dilengkapi badge tombol pintas bergaya <code className="font-mono">&lt;kbd&gt;</code> di sebelah kanan setiap opsi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Framework Code Snippet Section */}
      <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Contoh Kode Implementasi (Multi-Framework)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Dukungan integrasi instan untuk React, Vue 3, dan Laravel Blade:
          </p>
        </div>

        <MultiCodeSnippet codeBlocks={codeBlocks} title="5-Variant AnimatedDropdown Usage" />
      </div>
    </div>
  );
}

export default DropdownDemo;
