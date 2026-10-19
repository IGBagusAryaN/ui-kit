import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  VerticalTimeline,
  HorizontalStepper,
  AccordionTimeline,
  TimelineItemData,
  StepItem,
} from "../../src/components/Timeline";
import { MultiCodeSnippet } from "../components/MultiCodeSnippet";
import { CheckIcon, CopyIcon } from "../../src/icons";

/* =========================================================================
 * SUB-KOMPONEN: USAGE SNIPPET BLOCK (ADAPTIF LIGHT / DARK MODE)
 * ========================================================================= */
interface SnippetBlockProps {
  code: string;
  title?: string;
}

function SnippetBlock({ code, title }: SnippetBlockProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-xs transition-colors dark:border-zinc-800 dark:bg-zinc-950">
      {/* Header Blok Kode (Top Bar dengan kontras halus) */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
          {title || t("content.timelineDemo.usageSnippet", "Usage Snippet")}
        </span>
        {/* Tombol Copy */}
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-500 shadow-2xs transition active:scale-95 cursor-pointer hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {copied ? (
            <>
              <CheckIcon size={13} className="text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {t("content.timelineDemo.copied", "✓ Disalin")}
              </span>
            </>
          ) : (
            <>
              <CopyIcon size={13} className="opacity-75" />
              <span>{t("content.timelineDemo.copy", "Salin")}</span>
            </>
          )}
        </button>
      </div>

      {/* Kontainer Utama (Body Kode) */}
      <div className="p-4 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-800 dark:text-zinc-300">
        <pre className="m-0 p-0 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN COMPONENT: TIMELINE DEMO (3 VARIAN UTAMA)
 * ========================================================================= */
export function TimelineDemo() {
  const { t } = useTranslation();

  // State untuk Horizontal Stepper Interaktif
  const [activeStep, setActiveStep] = useState<number>(1);

  /* -------------------------------------------------------------------------
   * DATA: 1. Classic Vertical Items
   * ------------------------------------------------------------------------- */
  const classicItems: TimelineItemData[] = [
    {
      id: "classic-1",
      date: t("content.timelineDemo.data.classic.step1.date", "Januari 2024"),
      title: t("content.timelineDemo.data.classic.step1.title", "Perancangan Design System"),
      subtitle: t("content.timelineDemo.data.classic.step1.subtitle", "Fondasi Desain & Token Warna"),
      description: t(
        "content.timelineDemo.data.classic.step1.desc",
        "Menyusun skema warna semantik, tipografi modular, dan token spasial yang siap digunakan pada platform web modern."
      ),
      badge: t("content.timelineDemo.data.classic.step1.badge", "Tahap Awal"),
      badgeColor: "indigo",
      status: "completed",
      tags: [
        t("content.timelineDemo.data.classic.step1.tag1", "Figma"),
        t("content.timelineDemo.data.classic.step1.tag2", "Design Tokens"),
        t("content.timelineDemo.data.classic.step1.tag3", "Color Palette"),
      ],
    },
    {
      id: "classic-2",
      date: t("content.timelineDemo.data.classic.step2.date", "April 2024"),
      title: t("content.timelineDemo.data.classic.step2.title", "Pengembangan Komponen Inti"),
      subtitle: t("content.timelineDemo.data.classic.step2.subtitle", "Button, Inputs, Modal, & Dialog"),
      description: t(
        "content.timelineDemo.data.classic.step2.desc",
        "Implementasi komponen React dengan TypeScript dan Tailwind CSS, memastikan kompatibilitas aksesibilitas WCAG 2.1 AA."
      ),
      badge: t("content.timelineDemo.data.classic.step2.badge", "Pengembangan"),
      badgeColor: "emerald",
      status: "completed",
      tags: [
        t("content.timelineDemo.data.classic.step2.tag1", "React"),
        t("content.timelineDemo.data.classic.step2.tag2", "TypeScript"),
        t("content.timelineDemo.data.classic.step2.tag3", "Accessibility"),
      ],
    },
    {
      id: "classic-3",
      date: t("content.timelineDemo.data.classic.step3.date", "Juli 2024"),
      title: t("content.timelineDemo.data.classic.step3.title", "Framer Motion Physics & Animasi"),
      subtitle: t("content.timelineDemo.data.classic.step3.subtitle", "Transisi Halus 60fps & Micro-interactions"),
      description: t(
        "content.timelineDemo.data.classic.step3.desc",
        "Integrasi spring physics, gestur hover elastis, dan efek visual dinamis tanpa mengorbankan performa rendering."
      ),
      badge: t("content.timelineDemo.data.classic.step3.badge", "Animasi"),
      badgeColor: "amber",
      status: "current",
      tags: [
        t("content.timelineDemo.data.classic.step3.tag1", "Framer Motion"),
        t("content.timelineDemo.data.classic.step3.tag2", "60fps"),
        t("content.timelineDemo.data.classic.step3.tag3", "Spring Physics"),
      ],
    },
    {
      id: "classic-4",
      date: t("content.timelineDemo.data.classic.step4.date", "Oktober 2024"),
      title: t("content.timelineDemo.data.classic.step4.title", "Rilis Publik v1.0.0"),
      subtitle: t("content.timelineDemo.data.classic.step4.subtitle", "Ekosistem Terbuka & Dokumentasi Interaktif"),
      description: t(
        "content.timelineDemo.data.classic.step4.desc",
        "Peluncuran resmi ke registry NPM dengan dokumentasi interaktif, playground lengkap, dan dukungan multi-bahasa."
      ),
      badge: t("content.timelineDemo.data.classic.step4.badge", "Rilis Utama"),
      badgeColor: "violet",
      status: "upcoming",
      tags: [
        t("content.timelineDemo.data.classic.step4.tag1", "NPM Package"),
        t("content.timelineDemo.data.classic.step4.tag2", "Open Source"),
        t("content.timelineDemo.data.classic.step4.tag3", "Production Ready"),
      ],
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA: 2. Horizontal Stepper Steps
   * ------------------------------------------------------------------------- */
  const stepperSteps: StepItem[] = [
    {
      id: "step-1",
      title: t("content.timelineDemo.data.stepper.step1.title", "Informasi Akun"),
      subtitle: t("content.timelineDemo.data.stepper.step1.subtitle", "Data Autentikasi Pengguna"),
      description: t(
        "content.timelineDemo.data.stepper.step1.desc",
        "Masukkan alamat email korporat, nama pengguna, dan kata sandi yang kuat untuk memulai proses pendaftaran akun baru."
      ),
    },
    {
      id: "step-2",
      title: t("content.timelineDemo.data.stepper.step2.title", "Profil & Preferensi"),
      subtitle: t("content.timelineDemo.data.stepper.step2.subtitle", "Konfigurasi Ruang Kerja"),
      description: t(
        "content.timelineDemo.data.stepper.step2.desc",
        "Pilih peran utama Anda, nama organisasi, serta preferensi bahasa dan tema default yang ingin Anda gunakan."
      ),
    },
    {
      id: "step-3",
      title: t("content.timelineDemo.data.stepper.step3.title", "Pilih Paket Layanan"),
      subtitle: t("content.timelineDemo.data.stepper.step3.subtitle", "Kapasitas & Fitur Sesuai Kebutuhan"),
      description: t(
        "content.timelineDemo.data.stepper.step3.desc",
        "Pilih langganan Starter, Pro, atau Enterprise sesuai dengan skala tim dan kebutuhan komputasi proyek Anda."
      ),
    },
    {
      id: "step-4",
      title: t("content.timelineDemo.data.stepper.step4.title", "Konfirmasi & Aktivasi"),
      subtitle: t("content.timelineDemo.data.stepper.step4.subtitle", "Tinjau Data & Mulai Bekerja"),
      description: t(
        "content.timelineDemo.data.stepper.step4.desc",
        "Verifikasi ringkasan pendaftaran Anda. Setelah konfirmasi, workspace langsung aktif dan siap digunakan secara instan."
      ),
    },
  ];

  /* -------------------------------------------------------------------------
   * DATA: 3. Interactive Accordion Items
   * ------------------------------------------------------------------------- */
  const accordionItems: TimelineItemData[] = [
    {
      id: "acc-1",
      date: t("content.timelineDemo.data.accordion.item1.date", "Fase 1"),
      title: t("content.timelineDemo.data.accordion.item1.title", "Audit Keamanan & Kepatuhan SOC2"),
      subtitle: t("content.timelineDemo.data.accordion.item1.subtitle", "Penyelarasan Standar Industri"),
      description: t(
        "content.timelineDemo.data.accordion.item1.desc",
        "Pemeriksaan menyeluruh terhadap arsitektur enkripsi data saat transit dan saat istirahat, manajemen kunci API, serta isolasi multi-tenant."
      ),
      badge: t("content.timelineDemo.data.accordion.item1.badge", "Selesai"),
      badgeColor: "emerald",
      tags: [
        t("content.timelineDemo.data.accordion.item1.tag1", "Security"),
        t("content.timelineDemo.data.accordion.item1.tag2", "SOC2 Type II"),
        t("content.timelineDemo.data.accordion.item1.tag3", "Encryption"),
      ],
    },
    {
      id: "acc-2",
      date: t("content.timelineDemo.data.accordion.item2.date", "Fase 2"),
      title: t("content.timelineDemo.data.accordion.item2.title", "Optimasi Web Core Vitals"),
      subtitle: t("content.timelineDemo.data.accordion.item2.subtitle", "Peningkatan Skor Lighthouse 99+"),
      description: t(
        "content.timelineDemo.data.accordion.item2.desc",
        "Reduksi bundle JavaScript hingga 42% melalui tree-shaking agresif, code-splitting cerdas, dan eliminasi dependency yang berlebihan."
      ),
      badge: t("content.timelineDemo.data.accordion.item2.badge", "Selesai"),
      badgeColor: "indigo",
      tags: [
        t("content.timelineDemo.data.accordion.item2.tag1", "Performance"),
        t("content.timelineDemo.data.accordion.item2.tag2", "Lighthouse"),
        t("content.timelineDemo.data.accordion.item2.tag3", "Tree Shaking"),
      ],
    },
    {
      id: "acc-3",
      date: t("content.timelineDemo.data.accordion.item3.date", "Fase 3"),
      title: t("content.timelineDemo.data.accordion.item3.title", "Pengembangan Generator Tema Dinamis"),
      subtitle: t("content.timelineDemo.data.accordion.item3.subtitle", "Kustomisasi Palet Warna Realtime"),
      description: t(
        "content.timelineDemo.data.accordion.item3.desc",
        "Fitur yang memungkinkan pengguna mengekspor CSS variables dan konfigurasi Tailwind kustom hanya dengan memilih satu warna aksen dasar."
      ),
      badge: t("content.timelineDemo.data.accordion.item3.badge", "Sedang Dikerjakan"),
      badgeColor: "amber",
      tags: [
        t("content.timelineDemo.data.accordion.item3.tag1", "Theming"),
        t("content.timelineDemo.data.accordion.item3.tag2", "CSS Vars"),
        t("content.timelineDemo.data.accordion.item3.tag3", "Color Engine"),
      ],
    },
    {
      id: "acc-4",
      date: t("content.timelineDemo.data.accordion.item4.date", "Fase 4"),
      title: t("content.timelineDemo.data.accordion.item4.title", "Ekstensi Plugin untuk Figma & VS Code"),
      subtitle: t("content.timelineDemo.data.accordion.item4.subtitle", "Jembatan Desainer & Engineer"),
      description: t(
        "content.timelineDemo.data.accordion.item4.desc",
        "Sinkronisasi token desain langsung dari kanvas Figma ke kode TypeScript di editor tanpa perlu manual copy-paste."
      ),
      badge: t("content.timelineDemo.data.accordion.item4.badge", "Rencana"),
      badgeColor: "violet",
      tags: [
        t("content.timelineDemo.data.accordion.item4.tag1", "Figma Plugin"),
        t("content.timelineDemo.data.accordion.item4.tag2", "VS Code"),
        t("content.timelineDemo.data.accordion.item4.tag3", "Design Sync"),
      ],
    },
  ];

  /* -------------------------------------------------------------------------
   * CODE SNIPPETS
   * ------------------------------------------------------------------------- */
  const verticalCodeBlocks = {
    react: `import { VerticalTimeline, TimelineItemData } from "@a/ui";

const milestones: TimelineItemData[] = [
  {
    id: 1,
    date: "Januari 2024",
    title: "Perancangan Design System",
    subtitle: "Fondasi Desain & Token Warna",
    description: "Menyusun skema warna semantik dan token spasial modular.",
    badge: "Tahap Awal",
    badgeColor: "indigo",
    status: "completed",
    tags: ["Figma", "Design Tokens", "Tailwind"],
  },
  {
    id: 2,
    date: "April 2024",
    title: "Pengembangan Komponen Inti",
    status: "completed",
  },
  {
    id: 3,
    date: "Juli 2024",
    title: "Framer Motion Physics & Animasi",
    status: "current",
  },
  {
    id: 4,
    date: "Oktober 2024",
    title: "Rilis Publik v1.0.0",
    status: "upcoming",
  },
];

export function ProjectRoadmap() {
  return <VerticalTimeline items={milestones} animated />;
}`,
    vue: `<script setup lang="ts">
import { VerticalTimeline } from "@a/ui-vue";

const milestones = [
  {
    id: 1,
    date: "Januari 2024",
    title: "Perancangan Design System",
    subtitle: "Fondasi Desain & Token Warna",
    description: "Menyusun skema warna semantik dan token spasial modular.",
    badge: "Tahap Awal",
    badgeColor: "indigo",
    status: "completed",
    tags: ["Figma", "Design Tokens", "Tailwind"],
  },
  {
    id: 2,
    date: "April 2024",
    title: "Pengembangan Komponen Inti",
    status: "completed",
  },
  {
    id: 3,
    date: "Juli 2024",
    title: "Framer Motion Physics & Animasi",
    status: "current",
  },
  {
    id: 4,
    date: "Oktober 2024",
    title: "Rilis Publik v1.0.0",
    status: "upcoming",
  },
];
</script>

<template>
  <VerticalTimeline :items="milestones" animated />
</template>`,
    laravel: `{{-- resources/views/components/roadmap.blade.php --}}
@php
  $milestones = [
    [
      'id' => 1,
      'date' => 'Januari 2024',
      'title' => 'Perancangan Design System',
      'subtitle' => 'Fondasi Desain & Token Warna',
      'description' => 'Menyusun skema warna semantik dan token spasial modular.',
      'badge' => 'Tahap Awal',
      'badgeColor' => 'indigo',
      'status' => 'completed',
      'tags' => ['Figma', 'Design Tokens', 'Tailwind'],
    ],
    [
      'id' => 2,
      'date' => 'April 2024',
      'title' => 'Pengembangan Komponen Inti',
      'status' => 'completed',
    ],
    [
      'id' => 3,
      'date' => 'Juli 2024',
      'title' => 'Framer Motion Physics & Animasi',
      'status' => 'current',
    ],
    [
      'id' => 4,
      'date' => 'Oktober 2024',
      'title' => 'Rilis Publik v1.0.0',
      'status' => 'upcoming',
    ],
  ];
@endphp

<x-arya-vertical-timeline :items="$milestones" animated />`,
  };

    const stepperCodeBlocks = {
    react: `import { useState } from "react";
import { HorizontalStepper, StepItem } from "@a/ui";

const checkoutSteps: StepItem[] = [
  { id: 1, title: "Akun", subtitle: "Autentikasi Pengguna" },
  { id: 2, title: "Profil", subtitle: "Pengaturan Workspace" },
  { id: 3, title: "Paket", subtitle: "Pilihan Layanan" },
  { id: 4, title: "Aktivasi", subtitle: "Konfirmasi & Mulai" },
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <HorizontalStepper
      steps={checkoutSteps}
      currentStep={currentStep}
      onStepClick={(index) => setCurrentStep(index)}
      onNext={() => setCurrentStep((prev) => Math.min(checkoutSteps.length - 1, prev + 1))}
      onPrev={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
      onReset={() => setCurrentStep(0)}
    />
  );
}`,
    vue: `<script setup lang="ts">
import { ref } from "vue";
import { HorizontalStepper } from "@a/ui-vue";

const currentStep = ref(0);
const checkoutSteps = [
  { id: 1, title: "Akun", subtitle: "Autentikasi Pengguna" },
  { id: 2, title: "Profil", subtitle: "Pengaturan Workspace" },
  { id: 3, title: "Paket", subtitle: "Pilihan Layanan" },
  { id: 4, title: "Aktivasi", subtitle: "Konfirmasi & Mulai" },
];
</script>

<template>
  <HorizontalStepper
    :steps="checkoutSteps"
    :currentStep="currentStep"
    @stepClick="(index) => currentStep = index"
    @next="() => currentStep = Math.min(checkoutSteps.length - 1, currentStep + 1)"
    @prev="() => currentStep = Math.max(0, currentStep - 1)"
    @reset="() => currentStep = 0"
  />
</template>`,
    laravel: `{{-- resources/views/components/stepper.blade.php --}}
@php
  $steps = [
    ['id' => 1, 'title' => 'Akun', 'subtitle' => 'Autentikasi Pengguna'],
    ['id' => 2, 'title' => 'Profil', 'subtitle' => 'Pengaturan Workspace'],
    ['id' => 3, 'title' => 'Paket', 'subtitle' => 'Pilihan Layanan'],
    ['id' => 4, 'title' => 'Aktivasi', 'subtitle' => 'Konfirmasi & Mulai'],
  ];
@endphp

<div x-data="{ currentStep: 0 }">
  <x-arya-horizontal-stepper
    :steps="$steps"
    ::current-step="currentStep"
    @next="currentStep = Math.min(3, currentStep + 1)"
    @prev="currentStep = Math.max(0, currentStep - 1)"
    @reset="currentStep = 0"
  />
</div>`,
  };

  const accordionCodeBlocks = {
    react: `import { AccordionTimeline, TimelineItemData } from "@a/ui";

const auditMilestones: TimelineItemData[] = [
  {
    id: "audit-1",
    date: "Fase 1",
    title: "Audit Keamanan & Kepatuhan SOC2",
    subtitle: "Penyelarasan Standar Industri",
    description: "Pemeriksaan arsitektur enkripsi data saat transit dan isolasi multi-tenant.",
    badge: "Selesai",
    badgeColor: "emerald",
    tags: ["Security", "SOC2", "Encryption"],
  },
  {
    id: "audit-2",
    date: "Fase 2",
    title: "Optimasi Web Core Vitals",
    subtitle: "Skor Lighthouse 99+",
    description: "Reduksi bundle JavaScript hingga 42% melalui tree-shaking agresif.",
    badge: "Selesai",
    badgeColor: "indigo",
  },
];

export function ProjectAudit() {
  return (
    <AccordionTimeline
      items={auditMilestones}
      allowMultiple={false}
      defaultOpenIds={["audit-1"]}
    />
  );
}`,
    vue: `<script setup lang="ts">
import { AccordionTimeline } from "@a/ui-vue";

const auditMilestones = [
  {
    id: "audit-1",
    date: "Fase 1",
    title: "Audit Keamanan & Kepatuhan SOC2",
    subtitle: "Penyelarasan Standar Industri",
    description: "Pemeriksaan arsitektur enkripsi data saat transit dan isolasi multi-tenant.",
    badge: "Selesai",
    badgeColor: "emerald",
    tags: ["Security", "SOC2", "Encryption"],
  },
  {
    id: "audit-2",
    date: "Fase 2",
    title: "Optimasi Web Core Vitals",
    subtitle: "Skor Lighthouse 99+",
    badge: "Selesai",
    badgeColor: "indigo",
  },
];
</script>

<template>
  <AccordionTimeline
    :items="auditMilestones"
    :allowMultiple="false"
    :defaultOpenIds="['audit-1']"
  />
</template>`,
    laravel: `{{-- resources/views/components/audit.blade.php --}}
@php
  $auditMilestones = [
    [
      'id' => 'audit-1',
      'date' => 'Fase 1',
      'title' => 'Audit Keamanan & Kepatuhan SOC2',
      'subtitle' => 'Penyelarasan Standar Industri',
      'description' => 'Pemeriksaan arsitektur enkripsi data saat transit.',
      'badge' => 'Selesai',
      'badgeColor' => 'emerald',
      'tags' => ['Security', 'SOC2', 'Encryption'],
    ],
    [
      'id' => 'audit-2',
      'date' => 'Fase 2',
      'title' => 'Optimasi Web Core Vitals',
      'subtitle' => 'Skor Lighthouse 99+',
      'badge' => 'Selesai',
      'badgeColor' => 'indigo',
    ],
  ];
@endphp

<x-arya-accordion-timeline
  :items="$auditMilestones"
  :allow-multiple="false"
  :default-open-ids="['audit-1']"
/>`,
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* =====================================================================
       * VARIAN 1: CLASSIC VERTICAL
       * ===================================================================== */}
      <section className="rounded-xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-950">
        <div className="mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {t("content.timelineDemo.variants.classicVertical.badge", "Linear Progression")}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("content.timelineDemo.variants.classicVertical.title", "1. Classic Vertical (VerticalTimeline)")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {t(
              "content.timelineDemo.variants.classicVertical.desc",
              "Garis alur vertikal di sisi kiri dengan penanda titik/ikon. Konten tanggal, judul, dan deskripsi meluncur masuk (slide-in) dari kanan saat memasuki viewport."
            )}
          </p>
        </div>

        {/* Live Interactive Preview */}
        <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <VerticalTimeline items={classicItems} />
        </div>

        {/* Usage Snippet Adaptif */}
        <MultiCodeSnippet codeBlocks={verticalCodeBlocks} title="1. Classic Vertical Usage" />
      </section>

      {/* =====================================================================
       * VARIAN 2: HORIZONTAL STEPPER
       * ===================================================================== */}
      <section className="rounded-xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-950">
        <div className="mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {t("content.timelineDemo.variants.stepper.badge", "Interactive Flow")}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("content.timelineDemo.variants.stepper.title", "2. Horizontal Stepper (HorizontalStepper)")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {t(
              "content.timelineDemo.variants.stepper.desc",
              "Milestone alur horizontal langkah demi langkah (Step 1 → Step 2 → Step 3). Dilengkapi animasi garis progress yang terisi secara mulus dan kontrol tombol interaktif Next / Prev."
            )}
          </p>
        </div>

        {/* Live Interactive Preview */}
        <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <HorizontalStepper
            steps={stepperSteps}
            currentStep={activeStep}
            onStepClick={(idx) => setActiveStep(idx)}
            onNext={() => setActiveStep((prev) => Math.min(stepperSteps.length - 1, prev + 1))}
            onPrev={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            onReset={() => setActiveStep(0)}
            prevLabel={t("content.timelineDemo.variants.stepper.prevBtn", "Langkah Sebelumnya")}
            nextLabel={t("content.timelineDemo.variants.stepper.nextBtn", "Langkah Selanjutnya")}
            resetLabel={t("content.timelineDemo.variants.stepper.resetBtn", "Ulangi Alur")}
          />
        </div>

        {/* Usage Snippet Adaptif */}
        <MultiCodeSnippet codeBlocks={stepperCodeBlocks} title="2. Horizontal Stepper Usage" />
      </section>

      {/* =====================================================================
       * VARIAN 3: INTERACTIVE EXPANDABLE (ACCORDION TIMELINE)
       * ===================================================================== */}
      <section className="rounded-xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-950">
        <div className="mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {t("content.timelineDemo.variants.accordion.badge", "Expandable Accordion")}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("content.timelineDemo.variants.accordion.title", "3. Interactive Expandable (AccordionTimeline)")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {t(
              "content.timelineDemo.variants.accordion.desc",
              "Milestone vertikal interaktif di mana setiap kartu dapat diklik untuk membuka atau menutup rincian penjelasan secara dinamis dengan animasi tinggi yang mulus."
            )}
          </p>
        </div>

        {/* Live Interactive Preview */}
        <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <AccordionTimeline
            items={accordionItems}
            allowMultiple={false}
            defaultOpenIds={["acc-1"]}
          />
        </div>

        {/* Usage Snippet Adaptif */}
        <MultiCodeSnippet codeBlocks={accordionCodeBlocks} title="3. Interactive Accordion Usage" />
      </section>
    </div>
  );
}
