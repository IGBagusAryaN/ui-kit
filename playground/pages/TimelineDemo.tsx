import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  VerticalTimeline,
  HorizontalStepper,
  AccordionTimeline,
  TimelineItemData,
  StepItem,
} from "../../src/components/Timeline";
import { SearchIcon } from "../../src/icons";
import { CodeSnippet } from "../components/CodeSnippet";

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
    react: `import { VerticalTimeline, TimelineItemData } from "@bgsaryzzz/ui";

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
import { VerticalTimeline } from "@bgsaryzzz/ui-vue";

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
import { HorizontalStepper, StepItem } from "@bgsaryzzz/ui";

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
import { HorizontalStepper } from "@bgsaryzzz/ui-vue";

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
    react: `import { AccordionTimeline, TimelineItemData } from "@bgsaryzzz/ui";

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
import { AccordionTimeline } from "@bgsaryzzz/ui-vue";

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

  const [searchQuery, setSearchQuery] = useState("");

  const timelineList = useMemo(
    () => [
      {
        id: "classic-vertical",
        title: t("content.timelineDemo.variants.classicVertical.title", "1. Classic Vertical (VerticalTimeline)"),
        badge: t("content.timelineDemo.variants.classicVertical.badge", "Linear Progression"),
        description: t(
          "content.timelineDemo.variants.classicVertical.desc",
          "Garis alur vertikal di sisi kiri dengan penanda titik/ikon. Konten tanggal, judul, dan deskripsi meluncur masuk (slide-in) dari kanan saat memasuki viewport."
        ),
        snippet: verticalCodeBlocks.react,
        render: () => <VerticalTimeline items={classicItems} />,
      },
      {
        id: "horizontal-stepper",
        title: t("content.timelineDemo.variants.stepper.title", "2. Horizontal Stepper (HorizontalStepper)"),
        badge: t("content.timelineDemo.variants.stepper.badge", "Interactive Flow"),
        description: t(
          "content.timelineDemo.variants.stepper.desc",
          "Milestone alur horizontal langkah demi langkah (Step 1 → Step 2 → Step 3). Dilengkapi animasi garis progress yang terisi secara mulus dan kontrol tombol interaktif Next / Prev."
        ),
        snippet: stepperCodeBlocks.react,
        render: () => (
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
        ),
      },
      {
        id: "accordion-timeline",
        title: t("content.timelineDemo.variants.accordion.title", "3. Interactive Expandable (AccordionTimeline)"),
        badge: t("content.timelineDemo.variants.accordion.badge", "Expandable Accordion"),
        description: t(
          "content.timelineDemo.variants.accordion.desc",
          "Milestone vertikal interaktif di mana setiap kartu dapat diklik untuk membuka atau menutup rincian penjelasan secara dinamis dengan animasi tinggi yang mulus."
        ),
        snippet: accordionCodeBlocks.react,
        render: () => (
          <AccordionTimeline
            items={accordionItems}
            allowMultiple={false}
            defaultOpenIds={["acc-1"]}
          />
        ),
      },
    ],
    [t, classicItems, stepperSteps, activeStep, accordionItems, verticalCodeBlocks, stepperCodeBlocks, accordionCodeBlocks]
  );

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return timelineList;
    return timelineList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [timelineList, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Top Search & Filter Bar */}
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
              "content.timelineDemo.searchPlaceholder",
              "Cari tata letak timeline (contoh: 'vertical', 'stepper', 'accordion', 'progress')..."
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

        {/* Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {t("content.timelineDemo.collectionTitle", "Koleksi Tata Letak Timeline & Milestone:")}
            </span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.timelineDemo.showingCount", {
                count: filteredList.length,
                total: timelineList.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${timelineList.length} tata letak timeline dan milestone progres.`,
              })}
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {t("content.timelineDemo.statusBadge", "Responsive & Production Ready")}
          </span>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.timelineDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan variasi timeline dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.timelineDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      {/* 1 Column Vertical List (gap-14) for Full Experience */}
      <div className="flex flex-col gap-14">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            {/* Header Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="w-full flex items-center justify-center p-4 sm:p-6 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 overflow-visible">
              {item.render()}
            </div>

            {/* Usage Code Snippet */}
            <CodeSnippet code={item.snippet} />
          </div>
        ))}
      </div>
    </div>
  );
}
