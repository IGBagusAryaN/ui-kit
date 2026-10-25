import React from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ClassicAccordion,
  FloatingCardAccordion,
  MinimalistAccordion,
  GlassmorphismAccordion,
  StaggeredContentAccordion,
  HorizontalAccordion,
  TimelineAccordion,
  NestedTreeAccordion,
} from "../../src/components/AnimatedAccordion";

const ACCORDION_DICT = {
  en: {
    pillTag1: "Height Physics & Micro-Interactions",
    pillTag2: "8 Variants",
    pageTitle: "Animated Accordion",
    pageDescription:
      "A premier suite of 8 buttery-smooth animated accordion architectures engineered with Framer Motion and Tailwind CSS. Features dynamic DOM height measurement, separated floating island cards, morphing glyph icons, translucent backdrop glassmorphism, cascading staggered child elements, side-expanding horizontal tabs, continuous stepped audit timelines, and hierarchical nested sub-modules.",
    cards: {
      classic: {
        title: "1. Classic Accordion (Standard Connected)",
        badge: "Continuous Border & Subtitle Divide",
        desc: "The quintessential enterprise accordion with connected rows sharing unified borders. As each panel activates, its background shifts to an organic tint while the chevron smoothly pivots 180 degrees via spring physics.",
        snippet: `import { ClassicAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "1",
      title: "How does dynamic height transition work?",
      badge: "Architecture",
      content: "Framer Motion automatically measures DOM bounding dimensions prior to expansion, guaranteeing jitter-free height animation.",
    },
    {
      id: "2",
      title: "Is layout recalculation GPU-accelerated?",
      badge: "Performance",
      content: "Yes. Child containers leverage hardware transform hints to isolate repaint boundaries across 120Hz refresh rate displays.",
    },
  ];

  return <ClassicAccordion items={items} defaultOpenId="1" />;
}`,
      },
      floating: {
        title: "2. Floating Card Accordion (Separated Islands)",
        badge: "Isolated Card Surfaces & Elevation",
        desc: "Each accordion item lives as an independent, floating island card. Expanding an item elevates its surface with a deeper ambient drop shadow, luminous border highlight, and an active emerald status dot indicator.",
        snippet: `import { FloatingCardAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "edge",
      title: "Multi-Region Global Edge Replicas",
      subtitle: "Latency Optimization",
      badge: "Active",
      content: "Static and serverless workloads automatically replicate across 300+ Edge PoPs with sub-25ms response latencies.",
    },
    {
      id: "canary",
      title: "Automated Canary Rollback Guard",
      subtitle: "Deployment Safety",
      badge: "Real-Time",
      content: "Synthetic traffic monitors anomaly spikes and automatically rolls back bad deployments if error budgets exceed 0.05%.",
    },
  ];

  return <FloatingCardAccordion items={items} defaultOpenId="edge" />;
}`,
      },
      minimal: {
        title: "3. Minimalist Accordion (Clean Line & Plus/Minus)",
        badge: "Editorial Typography & Glyph Morphing",
        desc: "Ultra-clean editorial aesthetic stripped of card containers and lateral boundaries. Features a mechanical Plus (+) icon whose vertical stem smoothly rotates 90° and fades to zero, morphing seamlessly into a Minus (-) upon expansion.",
        snippet: `import { MinimalistAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "gestures",
      title: "Declarative Gesture Handling & Spring Dynamics",
      content: "Expressing UI state through continuous spring velocities ensures gestures seamlessly adapt to touch and mouse interrupts.",
    },
    {
      id: "contrast",
      title: "WCAG 2.2 AAA Contrast and Keyboard Navigation",
      content: "Full keyboard accessibility via Tab, Enter, Spacebar, and Arrow keys with crisp legibility on OLED dark displays.",
    },
  ];

  return <MinimalistAccordion items={items} defaultOpenId="gestures" />;
}`,
      },
      glass: {
        title: "4. Glassmorphism Accordion (Translucent Blur)",
        badge: "Backdrop Blur & Ambient Specular Glow",
        desc: "Designed for immersive, modern gradient backgrounds. Features frosted translucent glass panels with backdrop blur (blur-md), specular border highlights, and ambient illumination that reacts smoothly to panel expansion.",
        snippet: `import { GlassmorphismAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "spatial",
      title: "Spatial Matrix & 3D Perspective Projection",
      badge: "GPU Accelerated",
      content: "Calculates real-time depth offsets, depth-of-field blurs, and physics-driven spring inertia across spatial canvas layouts.",
    },
    {
      id: "crypto",
      title: "Zero-Knowledge Enclave Computation",
      badge: "E2E Encrypted",
      content: "Sensitive cryptographic identities and authorization payloads remain strictly quarantined within client-side isolation boundaries.",
    },
  ];

  return <GlassmorphismAccordion items={items} defaultOpenId="spatial" />;
}`,
      },
      staggered: {
        title: "5. Staggered Content Accordion (Animated Internal Content)",
        badge: "Cascading Motion Physics & Interactive Steps",
        desc: "Elevates standard height expansion with cascading internal child entrance animations. Opening the panel triggers an orchestrated, sequential slide-up and fade-in of embedded interactive workflow steps with completed status indicators.",
        snippet: `import { StaggeredContentAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "checklist",
      title: "Production Deployment Checklist",
      subtitle: "4 verification steps before shipping live",
      badge: "Release Pipeline",
      steps: [
        {
          id: "step-1",
          title: "Run Unit & E2E Test Suite",
          description: "All 142 test specs passed with 100% code coverage.",
          tag: "Passed",
          completed: true,
        },
        {
          id: "step-2",
          title: "Bundle Size & Tree-Shaking Audit",
          description: "Core runtime footprint optimized to 18.4 kB gzipped.",
          tag: "18.4 kB",
          completed: true,
        },
      ],
    },
  ];

  return <StaggeredContentAccordion items={items} defaultOpenId="checklist" />;
}`,
      },
      horizontal: {
        title: "6. Horizontal Accordion (Side-Expanding Showcase)",
        badge: "Dynamic Flex Width & Visual Feature Tab",
        desc: "Flips traditional vertical disclosures into a horizontal expanding showcase. Clicking any column smoothly expands its width via spring layout transitions while compressing sibling panels, with a fixed container height to prevent vertical jitter.",
        snippet: `import { HorizontalAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "telemetry",
      title: "Real-Time Telemetry",
      subtitle: "Zero-Latency Stream",
      badge: "v2.4",
      tagline: "Live Metrics & Tracing",
      content: "Ingests 250,000+ continuous event ticks per second with zero-drop UDP and TLS multiplexing.",
    },
    {
      id: "vault",
      title: "Encrypted Edge Vault",
      subtitle: "Hardware Security",
      badge: "FIPS 140-3",
      tagline: "Key Management",
      content: "Hardware Security Module (HSM) isolation protects tenant cryptographic root secrets.",
    },
  ];

  return <HorizontalAccordion items={items} defaultOpenId="telemetry" />;
}`,
      },
      timeline: {
        title: "7. Timeline Accordion (Connected Milestone Track)",
        badge: "Stepped Progress & Vertical Continuous Line",
        desc: "Connects accordion milestones with an unbroken vertical audit track. Each milestone node highlights upon expansion with custom status rings (completed, in-progress, pending) and collapsible execution logs.",
        snippet: `import { TimelineAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "step-1",
      step: 1,
      title: "Static Code & Dependency Vulnerability Scan",
      subtitle: "Automated SecOps",
      date: "10:14:02 AM",
      status: "completed",
      badge: "0 CVEs",
      content: "Analyzed 1,480 packages across npm and cargo registries. Zero critical vulnerabilities found.",
    },
    {
      id: "step-2",
      step: 2,
      title: "Ephemeral Database Migration & Seed Verification",
      subtitle: "Branch Preview Isolation",
      date: "10:14:38 AM",
      status: "in-progress",
      badge: "Active Run",
      content: "Spun up isolated PostgreSQL 16 replica container and applied 14 pending SQL migrations.",
    },
  ];

  return <TimelineAccordion items={items} defaultOpenId="step-2" />;
}`,
      },
      nested: {
        title: "8. Nested Tree Accordion (Hierarchical Multi-Level)",
        badge: "Multi-Tier Module Branching & Sub-Drawers",
        desc: "Supports multi-level documentation hierarchies and folder structures. Expanding a parent module reveals secondary nested accordion panels with branch guide lines and individual disclosure controls.",
        snippet: `import { NestedTreeAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "auth",
      title: "Authentication Engine",
      badge: "Core Module",
      children: [
        {
          id: "oauth",
          title: "OAuth 2.1 & PKCE Handshake",
          badge: "RFC 7636",
          content: "Enforces cryptographically random code_verifier hashes to eliminate code injection attacks.",
        },
        {
          id: "passkeys",
          title: "WebAuthn Biometric Passkeys",
          badge: "FIDO2",
          content: "Native hardware enclave credentials with Touch ID and Windows Hello support.",
        },
      ],
    },
  ];

  return <NestedTreeAccordion items={items} defaultOpenId="auth" />;
}`,
      },
    },
  },
  id: {
    pillTag1: "Fisika Tinggi & Mikro-Interaksi",
    pillTag2: "8 Varian",
    pageTitle: "Akordion Beranimasi (Animated Accordion)",
    pageDescription:
      "Koleksi 8 arsitektur akordion modern beranimasi sangat mulus (buttery smooth) yang dirancang dengan Framer Motion dan Tailwind CSS. Menampilkan pengukuran tinggi dinamis, kartu pulau melayang, perubahan bentuk ikon (morphing glyph), efek kaca buram translucent, fisika konten bertingkat, ekspansi samping horizontal, garis timeline berurutan, dan pohon hierarki bersarang.",
    cards: {
      classic: {
        title: "1. Classic Accordion (Gaya Klasik Menempel)",
        badge: "Border Bersambung & Divider Subtitle",
        desc: "Gaya akordion klasik di mana setiap baris menempel dengan pembatas garis tipis. Saat panel dibuka, background berubah halus ke warna aksen netral dan panah chevron berputar 180 derajat dengan pegas spring.",
        snippet: `import { ClassicAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "1",
      title: "Bagaimana cara kerja transisi tinggi dinamis?",
      badge: "Arsitektur",
      content: "Framer Motion mengukur dimensi DOM sebelum ekspansi sehingga animasi tinggi berjalan mulus tanpa getaran layout.",
    },
    {
      id: "2",
      title: "Apakah kalkulasi layout diakselerasi GPU?",
      badge: "Performa",
      content: "Ya. Kontainer konten menggunakan petunjuk transform perangkat keras untuk mengisolasi repaint pada layar 120Hz.",
    },
  ];

  return <ClassicAccordion items={items} defaultOpenId="1" />;
}`,
      },
      floating: {
        title: "2. Floating Card Accordion (Kartu Pulau Terpisah)",
        badge: "Permukaan Kartu Independen & Elevasi",
        desc: "Setiap baris akordion berdiri sendiri sebagai pulau kartu mandiri. Saat dibuka, elevasi kartu bertambah dengan bayangan halus, garis tepi menyala lembut, dan lampu indikator status hijau zamrud (emerald).",
        snippet: `import { FloatingCardAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "edge",
      title: "Replikasi Edge Global Multi-Region",
      subtitle: "Optimasi Latensi",
      badge: "Aktif",
      content: "Beban kerja statis dan serverless direplikasi otomatis ke 300+ Edge PoP dengan latensi di bawah 25ms.",
    },
    {
      id: "canary",
      title: "Canary Rollback Guard Otomatis",
      subtitle: "Keamanan Rilis",
      badge: "Real-Time",
      content: "Lalu lintas sintetis memantau anomali dan secara otomatis mengembalikan rilis jika budget error melebihi 0.05%.",
    },
  ];

  return <FloatingCardAccordion items={items} defaultOpenId="edge" />;
}`,
      },
      minimal: {
        title: "3. Minimalist Accordion (Garis Bersih & Morphing Ikon)",
        badge: "Tipografi Editorial & Animasi Plus/Minus",
        desc: "Desain editorial minimalis tanpa kotak kartu samping. Menggunakan ikon Plus (+) mekanis yang bilah vertikalnya berputar 90° dan memudar mulus menjadi Minus (-) saat panel dibuka.",
        snippet: `import { MinimalistAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "gestures",
      title: "Penanganan Gestur Deklaratif & Dinamika Pegas",
      content: "Menyatakan state UI dengan kecepatan pegas memastikan gestur beradaptasi mulus dengan interupsi mouse dan sentuhan.",
    },
    {
      id: "contrast",
      title: "Kontras WCAG 2.2 AAA & Navigasi Keyboard",
      content: "Aksesibilitas penuh via Tab, Enter, Spasi, dan Tombol Panah dengan keterbacaan tajam pada layar OLED gelap.",
    },
  ];

  return <MinimalistAccordion items={items} defaultOpenId="gestures" />;
}`,
      },
      glass: {
        title: "4. Glassmorphism Accordion (Efek Kaca Buram)",
        badge: "Backdrop Blur & Kilauan Latar Belakang",
        desc: "Dirancang khusus untuk latar gradasi modern. Menampilkan panel kaca semi-transparan dengan efek blur (backdrop blur), garis tepi specular, dan pendaran cahaya yang bereaksi terhadap status buka-tutup.",
        snippet: `import { GlassmorphismAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "spatial",
      title: "Matriks Spasial & Proyeksi Perspektif 3D",
      badge: "GPU Accelerated",
      content: "Menghitung offset kedalaman real-time, blur depth-of-field, dan inersia pegas berbasis fisika.",
    },
    {
      id: "crypto",
      title: "Komputasi Enklave Zero-Knowledge",
      badge: "E2E Encrypted",
      content: "Identitas kriptografi dan payload otorisasi sensitif tetap terisolasi di dalam WebAssembly sisi klien.",
    },
  ];

  return <GlassmorphismAccordion items={items} defaultOpenId="spatial" />;
}`,
      },
      staggered: {
        title: "5. Staggered Content Accordion (Konten Anak Bertingkat)",
        badge: "Fisika Animasi Mengalir & Langkah Interaktif",
        desc: "Meningkatkan animasi tinggi dengan efek kemunculan anak elemen secara berurutan (cascading). Membuka panel akan memicu animasi geser dan pudar langkah demi langkah secara terorkestrasi.",
        snippet: `import { StaggeredContentAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "checklist",
      title: "Daftar Periksa Rilis Produksi",
      subtitle: "4 langkah verifikasi sebelum peluncuran live",
      badge: "Release Pipeline",
      steps: [
        {
          id: "step-1",
          title: "Jalankan Unit & E2E Test Suite",
          description: "Seluruh 142 spesifikasi tes berhasil lulus dengan coverage 100%.",
          tag: "Passed",
          completed: true,
        },
        {
          id: "step-2",
          title: "Audit Ukuran Bundle & Tree-Shaking",
          description: "Jejak ukuran runtime dioptimalkan menjadi 18.4 kB gzipped.",
          tag: "18.4 kB",
          completed: true,
        },
      ],
    },
  ];

  return <StaggeredContentAccordion items={items} defaultOpenId="checklist" />;
}`,
      },
      horizontal: {
        title: "6. Horizontal Accordion (Ekspansi Samping / Horizontal)",
        badge: "Lebar Flex Dinamis & Showcase Fitur",
        desc: "Mengubah pola akordion vertikal menjadi ekspansi horizontal menyamping. Mengklik salah satu kolom akan melebarkan panel secara mulus dengan transisi pegas sembari memadatkan panel lainnya, dengan tinggi kontainer stabil tanpa getaran vertikal.",
        snippet: `import { HorizontalAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "telemetry",
      title: "Telemetri Real-Time",
      subtitle: "Aliran Tanpa Latensi",
      badge: "v2.4",
      tagline: "Metrik & Jejak Live",
      content: "Memproses 250,000+ event per detik dengan multiplexing UDP dan TLS anti-hilang paket.",
    },
    {
      id: "vault",
      title: "Brankas Edge Terenkripsi",
      subtitle: "Keamanan Perangkat Keras",
      badge: "FIPS 140-3",
      tagline: "Manajemen Kunci",
      content: "Isolasi Hardware Security Module (HSM) melindungi kunci induk kriptografi penyewa.",
    },
  ];

  return <HorizontalAccordion items={items} defaultOpenId="telemetry" />;
}`,
      },
      timeline: {
        title: "7. Timeline Accordion (Jalur Milestone Terhubung)",
        badge: "Proses Bertahap & Garis Vertikal Terhubung",
        desc: "Menghubungkan setiap tahapan dengan garis rel vertikal yang tidak terputus. Titik milestone menampilkan indikator status (selesai, berjalan, menunggu) dan log detail yang dapat diciutkan.",
        snippet: `import { TimelineAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "step-1",
      step: 1,
      title: "Pindai Kerentanan Kode & Dependensi",
      subtitle: "SecOps Otomatis",
      date: "10:14:02 AM",
      status: "completed",
      badge: "0 CVEs",
      content: "Memeriksa 1,480 paket di npm dan cargo. Nol kerentanan kritis ditemukan.",
    },
    {
      id: "step-2",
      step: 2,
      title: "Migrasi Database & Verifikasi Seed",
      subtitle: "Isolasi Branch Preview",
      date: "10:14:38 AM",
      status: "in-progress",
      badge: "Active Run",
      content: "Menyiapkan container replika PostgreSQL 16 dan menerapkan 14 migrasi SQL dalam 4.2 detik.",
    },
  ];

  return <TimelineAccordion items={items} defaultOpenId="step-2" />;
}`,
      },
      nested: {
        title: "8. Nested Tree Accordion (Hierarki Bersarang Multi-Level)",
        badge: "Percabangan Modul & Sub-Drawer Dokumen",
        desc: "Mendukung hierarki dokumentasi bersarang dan struktur folder berkas. Membuka modul utama akan menampilkan sub-akordion sekunder dengan garis panduan cabang pohon yang rapi.",
        snippet: `import { NestedTreeAccordion } from "@needui/ui-kit";

export function Example() {
  const items = [
    {
      id: "auth",
      title: "Mesin Autentikasi & Otorisasi",
      badge: "Modul Inti",
      children: [
        {
          id: "oauth",
          title: "OAuth 2.1 & PKCE Handshake",
          badge: "RFC 7636",
          content: "Menerapkan hash code_verifier acak untuk mengeliminasi serangan injeksi kode otorisasi.",
        },
        {
          id: "passkeys",
          title: "WebAuthn Kunci Sandi Biometrik",
          badge: "FIDO2",
          content: "Kredensial enklave perangkat keras asli dengan dukungan Touch ID dan Windows Hello.",
        },
      ],
    },
  ];

  return <NestedTreeAccordion items={items} defaultOpenId="auth" />;
}`,
      },
    },
  },
};

export function AnimatedAccordionDemo() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("id")
    ? "id"
    : "en";
  const t = ACCORDION_DICT[lang];

  return (
    <div className="w-full space-y-12 pb-20">
      <div className="space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
          <span>{t.pillTag1}</span>
          <span>•</span>
          <span>{t.pillTag2}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="max-w-4xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.pageDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.classic.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.classic.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.classic.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <ClassicAccordion />
          </div>

          <CodeSnippet code={t.cards.classic.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.floating.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.floating.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.floating.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <FloatingCardAccordion />
          </div>

          <CodeSnippet code={t.cards.floating.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.minimal.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.minimal.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.minimal.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <MinimalistAccordion />
          </div>

          <CodeSnippet code={t.cards.minimal.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.glass.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.glass.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.glass.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <GlassmorphismAccordion />
          </div>

          <CodeSnippet code={t.cards.glass.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.staggered.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.staggered.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.staggered.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <StaggeredContentAccordion />
          </div>

          <CodeSnippet code={t.cards.staggered.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.horizontal.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.horizontal.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.horizontal.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-x-auto">
            <HorizontalAccordion />
          </div>

          <CodeSnippet code={t.cards.horizontal.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.timeline.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.timeline.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.timeline.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <TimelineAccordion />
          </div>

          <CodeSnippet code={t.cards.timeline.snippet} />
        </section>

        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.nested.title}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.nested.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.nested.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <NestedTreeAccordion />
          </div>

          <CodeSnippet code={t.cards.nested.snippet} />
        </section>

        {/* COMPONENT GUIDELINES STANDARD: PROPS API REFERENCE */}
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
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">items</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">AccordionItem[]</td>
                  <td className="px-4 py-2.5 font-mono text-xs">defaultItems</td>
                  <td className="px-4 py-2.5">
                    Daftar item data akordion yang akan dirender (id, title, content, badge).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">defaultOpenId</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string | null</td>
                  <td className="px-4 py-2.5 font-mono text-xs">null</td>
                  <td className="px-4 py-2.5">
                    ID item akordion yang langsung terbuka secara default saat komponen pertama kali di-mount.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">allowMultiple</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                  <td className="px-4 py-2.5 font-mono text-xs">false</td>
                  <td className="px-4 py-2.5">
                    Mengizinkan beberapa panel akordion terbuka bersamaan (multi-collapse mode).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                  <td className="px-4 py-2.5 font-mono text-xs">""</td>
                  <td className="px-4 py-2.5">
                    Class utilitas Tailwind CSS tambahan untuk container luar akordion via cn().
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimatedAccordionDemo;
