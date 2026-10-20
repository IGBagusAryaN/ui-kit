import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AnimatedTreeMenu,
  TreeMenuItem,
} from "../../src/components/AnimatedTreeMenu";
import { MultiCodeSnippet } from "../components/MultiCodeSnippet";
import {
  FolderIcon,
  FileTextIcon,
  CodeIcon,
  GlobeIcon,
  HardDriveIcon,
  LayersIcon,
  LayoutIcon,
  TerminalIcon,
  DatabaseIcon,
  SettingsIcon,
  CheckCircleIcon,
  SearchIcon,
  CheckIcon,
} from "../../src/icons";

export function TreeMenuDemo() {
  const { t } = useTranslation();

  // State untuk melacak item yang aktif pada Demo 1 (Department)
  const [activeDeptId, setActiveDeptId] = useState<string>("web-master");
  const [lastClickedDept, setLastClickedDept] = useState<string>("Web Master");

  // State untuk melacak item yang aktif pada Demo 2 (Workspace Multi-Level)
  const [activeWorkId, setActiveWorkId] = useState<string>("comp-tree");
  const [lastClickedWork, setLastClickedWork] = useState<string>("AnimatedTreeMenu.tsx");

  /* -------------------------------------------------------------------------
   * DATA: 1. Department Hierarchy (Sesuai Permintaan Spesifik User)
   * ------------------------------------------------------------------------- */
  const departmentData: TreeMenuItem[] = [
    {
      id: "departments",
      label: "DEPARTMENTS",
      icon: <FolderIcon size={15} className="text-amber-500" />,
      defaultOpen: true,
      children: [
        {
          id: "docs",
          label: "Docs",
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
          icon: <HardDriveIcon size={15} className="text-violet-500" />,
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
          id: "figma-tokens",
          label: "Design Tokens",
          icon: <LayoutIcon size={15} className="text-pink-500" />,
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
   * DATA: 2. Multi-Level Workspace Sidebar (Linear / Notion Style)
   * ------------------------------------------------------------------------- */
  const workspaceData: TreeMenuItem[] = [
    {
      id: "core-library",
      label: "ui-kit (@bgsaryzzz/ui)",
      icon: <LayersIcon size={15} className="text-indigo-500" />,
      defaultOpen: true,
      children: [
        {
          id: "src-components",
          label: "src/components",
          icon: <FolderIcon size={15} className="text-amber-500" />,
          defaultOpen: true,
          children: [
            {
              id: "comp-tree",
              label: "AnimatedTreeMenu.tsx",
              icon: <CodeIcon size={14} className="text-emerald-500" />,
              badge: "New",
            },
            {
              id: "comp-btn",
              label: "Button.tsx",
              icon: <CodeIcon size={14} className="text-sky-500" />,
              badge: "v1.2",
            },
            {
              id: "comp-timeline",
              label: "Timeline.tsx",
              icon: <CodeIcon size={14} className="text-indigo-500" />,
            },
          ],
        },
        {
          id: "src-backend",
          label: "backend-api",
          icon: <FolderIcon size={15} className="text-amber-500" />,
          children: [
            {
              id: "db-schema",
              label: "schema.prisma",
              icon: <DatabaseIcon size={14} className="text-purple-500" />,
            },
            {
              id: "server-config",
              label: "config.json",
              icon: <SettingsIcon size={14} className="text-zinc-500" />,
              badge: "PROD",
            },
          ],
        },
      ],
    },
  ];

  /* -------------------------------------------------------------------------
   * CODE BLOCKS: MULTI-FRAMEWORK SNIPPETS
   * ------------------------------------------------------------------------- */
  const deptCodeBlocks = {
    react: `import React, { useState } from "react";
import { AnimatedTreeMenu, TreeMenuItem } from "@bgsaryzzz/ui";
import { FolderIcon, FileTextIcon, CodeIcon, GlobeIcon, HardDriveIcon } from "@bgsaryzzz/ui/icons";

export function DepartmentSidebar() {
  const [activeId, setActiveId] = useState("web-master");

  const items: TreeMenuItem[] = [
    {
      id: "departments",
      label: "DEPARTMENTS",
      icon: <FolderIcon size={15} className="text-amber-500" />,
      defaultOpen: true,
      children: [
        { id: "docs", label: "Docs", icon: <FileTextIcon size={15} /> },
        { id: "programmer-dev", label: "Programmer (Dev)", icon: <CodeIcon size={15} />, badge: 70 },
        { id: "web-master", label: "Web Master", icon: <GlobeIcon size={15} />, badge: 21 },
        { id: "infra-network", label: "Infra & Network", icon: <HardDriveIcon size={15} />, badge: 10 },
      ],
    },
  ];

  return (
    <div className="w-64 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <AnimatedTreeMenu
        items={items}
        activeId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
      />
    </div>
  );
}`,
    vue: `<script setup lang="ts">
import { ref } from "vue";
import { AnimatedTreeMenu } from "@bgsaryzzz/ui-vue";

const activeId = ref("web-master");

const items = [
  {
    id: "departments",
    label: "DEPARTMENTS",
    defaultOpen: true,
    children: [
      { id: "docs", label: "Docs" },
      { id: "programmer-dev", label: "Programmer (Dev)", badge: 70 },
      { id: "web-master", label: "Web Master", badge: 21, isActive: true },
      { id: "infra-network", label: "Infra & Network", badge: 10 },
    ],
  },
];
</script>

<template>
  <div class="w-64 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
    <AnimatedTreeMenu
      :items="items"
      :activeId="activeId"
      @itemClick="(item) => activeId = item.id"
    />
  </div>
</template>`,
    laravel: `{{-- resources/views/components/department-tree.blade.php --}}
@php
  $departments = [
    [
      'id' => 'departments',
      'label' => 'DEPARTMENTS',
      'defaultOpen' => true,
      'children' => [
        ['id' => 'docs', 'label' => 'Docs'],
        ['id' => 'programmer-dev', 'label' => 'Programmer (Dev)', 'badge' => 70],
        ['id' => 'web-master', 'label' => 'Web Master', 'badge' => 21, 'isActive' => true],
        ['id' => 'infra-network', 'label' => 'Infra & Network', 'badge' => 10],
      ],
    ],
  ];
@endphp

<div class="w-64 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
  <x-bgsaryzzz-tree-menu :items="$departments" active-id="web-master" />
</div>`,
  };

  const nestedCodeBlocks = {
    react: `import { AnimatedTreeMenu, TreeMenuItem } from "@bgsaryzzz/ui";

const fileTree: TreeMenuItem[] = [
  {
    id: "core-library",
    label: "ui-kit",
    defaultOpen: true,
    children: [
      {
        id: "src-components",
        label: "components",
        defaultOpen: true,
        children: [
          { id: "comp-tree", label: "AnimatedTreeMenu.tsx", badge: "New" },
          { id: "comp-btn", label: "Button.tsx", badge: "v1.2" },
        ],
      },
    ],
  },
];

export function MultiLevelExplorer() {
  return <AnimatedTreeMenu items={fileTree} />;
}`,
    vue: `<script setup lang="ts">
import { AnimatedTreeMenu } from "@bgsaryzzz/ui-vue";
// Mendukung kedalaman hierarki folder tak terbatas (rekursif)
</script>

<template>
  <AnimatedTreeMenu :items="fileTree" />
</template>`,
    laravel: `{{-- Recursive Blade Tree Component --}}
<x-bgsaryzzz-tree-menu :items="$fileTree" />`,
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* =====================================================================
       * VARIAN 1: DEPARTMENT DIRECTORY (STUDI KASUS SPESIFIK USER)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        {/* Header Section */}
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {t("content.treeMenuDemo.variant1.badge", "Sidebar Navigation")}
            </span>
            <span className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              Adaptive Light / Dark
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("content.treeMenuDemo.variant1.title", "1. Department Directory (Parent-Child Hierarchy)")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {t(
              "content.treeMenuDemo.variant1.desc",
              "Parent 'DEPARTMENTS' yang dapat di-klik untuk membuka/menutup daftar tim turunan. Dilengkapi garis vertikal hierarki, chevron rotasi dinamis, dan badge angka di sisi kanan."
            )}
          </p>
        </div>

        {/* Live Interactive Preview & Contextual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Kolom Kiri: Realistic Desktop Sidebar Mockup */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4 shadow-sm">
              {/* Window Header Frame */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  Sidebar Mockup
                </span>
              </div>

              {/* Sidebar Content Card */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-3 shadow-xs">
                {/* Search Mockup */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-400 dark:text-zinc-500 mb-3 select-none">
                  <SearchIcon size={13} className="shrink-0 text-zinc-400" />
                  <span className="truncate">Cari departemen...</span>
                  <kbd className="ml-auto text-[10px] font-mono bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1 py-0.2 rounded">
                    ⌘K
                  </kbd>
                </div>

                {/* Render Animated Tree Menu */}
                <AnimatedTreeMenu
                  items={departmentData}
                  activeId={activeDeptId}
                  onItemClick={(item) => {
                    setActiveDeptId(item.id);
                    setLastClickedDept(item.label);
                  }}
                />

                {/* Bottom Profile Pill */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold">
                      A
                    </div>
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                      Arya (Engineering)
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: State Inspector & Quick Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Active State Card */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/70 dark:border-zinc-800/70">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <CheckCircleIcon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Active Item Inspector
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Live Synced
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-1">
                  <span className="text-zinc-400 dark:text-zinc-500 text-[11px] block">
                    Active Node ID
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    {activeDeptId}
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-1">
                  <span className="text-zinc-400 dark:text-zinc-500 text-[11px] block">
                    Selected Label
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    {lastClickedDept}
                  </span>
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block font-sans">
                  Uji Cepat Pemilihan Item:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "docs", label: "Docs" },
                    { id: "programmer-dev", label: "Programmer (Dev)" },
                    { id: "web-master", label: "Web Master" },
                    { id: "infra-network", label: "Infra & Network" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => {
                        setActiveDeptId(btn.id);
                        setLastClickedDept(btn.label);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        activeDeptId === btn.id
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                          : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">
                  ✨ Smooth Accordion
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Animasi transisi tinggi <code className="font-mono text-zinc-700 dark:text-zinc-300">0 → "auto"</code> dengan kurva presisi Framer Motion.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">
                  🎨 Seamless Light/Dark
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Skema warna adaptif natural tanpa kontras putih-hitam yang kasar saat mode berganti.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Framework Code Snippet */}
        <MultiCodeSnippet codeBlocks={deptCodeBlocks} title="Department Tree Implementation" />
      </section>

      {/* =====================================================================
       * VARIAN 2: DEEP MULTI-LEVEL WORKSPACE (LINEAR STYLE)
       * ===================================================================== */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
        {/* Header Section */}
        <div className="mb-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {t("content.treeMenuDemo.variant2.badge", "Multi-Level Hierarchy")}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("content.treeMenuDemo.variant2.title", "2. Deep Nested Workspace (Infinite Recursion)")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {t(
              "content.treeMenuDemo.variant2.desc",
              "Hierarki berkas proyek bertingkat (Level 0 → Level 1 → Level 2) dengan garis pemandu rekursif yang secara otomatis berindentasi sesuai kedalaman folder."
            )}
          </p>
        </div>

        {/* Live Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
                  Project Explorer
                </span>
                <span className="text-[10px] font-mono bg-zinc-200/80 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                  Recursive
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-3 shadow-xs">
                <AnimatedTreeMenu
                  items={workspaceData}
                  activeId={activeWorkId}
                  onItemClick={(item) => {
                    setActiveWorkId(item.id);
                    setLastClickedWork(item.label);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CheckCircleIcon size={16} className="text-emerald-500" />
                Explorer Telemetry
              </h3>

              <div className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Selected File:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {lastClickedWork}
                </span>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                Setiap sub-folder memiliki garis vertikal panduan yang otomatis sejajar dengan posisi chevron induknya. Item tanpa anak diberi spacer transparan presisi agar teks tetap sejajar rapi.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Framework Code Snippet */}
        <MultiCodeSnippet codeBlocks={nestedCodeBlocks} title="Deep Nested Tree Implementation" />
      </section>
    </div>
  );
}

export default TreeMenuDemo;
