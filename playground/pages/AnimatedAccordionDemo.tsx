import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ChevronDownIcon,
  SparklesIcon,
  ShieldIcon,
  ZapIcon,
  CheckIcon,
} from "../../src/icons";

// ============================================================================
// I18N LOCALIZATION DICTIONARY (ALL 5 ANIMATED ACCORDION VARIANTS)
// ============================================================================
const ACCORDION_DICT = {
  en: {
    pillTag1: "Height Physics & Micro-Interactions",
    pillTag2: "5 Variants",
    pageTitle: "Animated Accordion",
    pageDescription:
      "A premier suite of 5 buttery-smooth animated accordion architectures engineered with Framer Motion and Tailwind CSS. Features dynamic DOM height measurement, separated floating island cards, morphing glyph icons, translucent backdrop glassmorphism, and staggered child element physics.",
    cards: {
      classic: {
        title: "1. Classic Accordion (Standard Connected)",
        badge: "Continuous Border & Subtitle Divide",
        desc: "The quintessential enterprise accordion with connected rows sharing unified borders. As each panel activates, its background shifts to an organic tint while the chevron smoothly pivots 180 degrees via spring physics.",
        snippet: `import { ClassicAccordion } from "@bgsaryzzz/ui";

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
        snippet: `import { FloatingCardAccordion } from "@bgsaryzzz/ui";

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
        snippet: `import { MinimalistAccordion } from "@bgsaryzzz/ui";

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
        snippet: `import { GlassmorphismAccordion } from "@bgsaryzzz/ui";

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
        snippet: `import { StaggeredContentAccordion } from "@bgsaryzzz/ui";

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
    },
  },
  id: {
    pillTag1: "Fisika Tinggi & Mikro-Interaksi",
    pillTag2: "5 Varian",
    pageTitle: "Akordion Beranimasi (Animated Accordion)",
    pageDescription:
      "Koleksi 5 arsitektur akordion modern beranimasi sangat mulus (buttery smooth) yang dirancang dengan Framer Motion dan Tailwind CSS. Menampilkan pengukuran tinggi dinamis, kartu pulau melayang, perubahan bentuk ikon (morphing glyph), efek kaca buram translucent, dan fisika konten bertingkat (staggered children).",
    cards: {
      classic: {
        title: "1. Classic Accordion (Gaya Klasik Menempel)",
        badge: "Border Bersambung & Divider Subtitle",
        desc: "Gaya akordion klasik di mana setiap baris menempel dengan pembatas garis tipis. Saat panel dibuka, background berubah halus ke warna aksen netral dan panah chevron berputar 180 derajat dengan pegas spring.",
        snippet: `import { ClassicAccordion } from "@bgsaryzzz/ui";

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
        snippet: `import { FloatingCardAccordion } from "@bgsaryzzz/ui";

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
      content: "Sintetik trafik memantau anomali dan otomatis mengembalikan rilis jika ambang batas eror melebihi 0.05%.",
    },
  ];

  return <FloatingCardAccordion items={items} defaultOpenId="edge" />;
}`,
      },
      minimal: {
        title: "3. Minimalist Accordion (Garis Bersih & Plus/Minus)",
        badge: "Tipografi Editorial & Morphing Ikon",
        desc: "Desain sangat clean tanpa border samping atau background kartu tebal. Dilengkapi ikon Plus (+) mekanis yang bilah vertikalnya berputar 90° dan memudar ke nol, bertransformasi mulus menjadi Minus (-) saat terbuka.",
        snippet: `import { MinimalistAccordion } from "@bgsaryzzz/ui";

export function Example() {
  const items = [
    {
      id: "gestures",
      title: "Penanganan Gestur Deklaratif & Dinamika Pegas",
      content: "Mengekspresikan state UI melalui kecepatan pegas kontinu memastikan gestur beradaptasi mulus terhadap interupsi pengguna.",
    },
    {
      id: "contrast",
      title: "Standar Kontras WCAG 2.2 AAA & Navigasi Keyboard",
      content: "Aksesibilitas keyboard penuh via Tab, Enter, Spasi, dan Panah dengan keterbacaan tajam di layar OLED.",
    },
  ];

  return <MinimalistAccordion items={items} defaultOpenId="gestures" />;
}`,
      },
      glass: {
        title: "4. Glassmorphism Accordion (Translucent Blur)",
        badge: "Backdrop Blur & Pendaran Cahaya Ambient",
        desc: "Diciptakan untuk latar belakang gradasi modern. Menggunakan panel kaca frosted dengan efek backdrop-blur-md, garis border tipis berkilau, dan pendaran cahaya sekitar yang bereaksi anggun saat panel dibuka.",
        snippet: `import { GlassmorphismAccordion } from "@bgsaryzzz/ui";

export function Example() {
  const items = [
    {
      id: "spatial",
      title: "Matriks Spasial & Proyeksi Perspektif 3D",
      badge: "Akselerasi GPU",
      content: "Menghitung offset kedalaman real-time, blur kedalaman visual, dan inersia pegas fisika di atas layout spasial.",
    },
    {
      id: "crypto",
      title: "Komputasi Enklave Zero-Knowledge",
      badge: "Terenkripsi E2E",
      content: "Identitas kriptografi pengguna dan token otorisasi tetap terisolasi di sisi klien dengan WebAssembly.",
    },
  ];

  return <GlassmorphismAccordion items={items} defaultOpenId="spatial" />;
}`,
      },
      staggered: {
        title: "5. Staggered Content Accordion (Konten Internal Berurutan)",
        badge: "Animasi Beruntun & Langkah Alur Kerja",
        desc: "Meningkatkan animasi pembukaan tinggi standar dengan animasi masuk konten anak secara beruntun (staggered). Saat panel terbuka, item langkah kerja di dalamnya meluncur naik satu per satu secara berurutan.",
        snippet: `import { StaggeredContentAccordion } from "@bgsaryzzz/ui";

export function Example() {
  const items = [
    {
      id: "checklist",
      title: "Daftar Periksa Deployment Produksi",
      subtitle: "4 langkah verifikasi sebelum rilis live",
      badge: "Pipeline Rilis",
      steps: [
        {
          id: "step-1",
          title: "Jalankan Test Suite Unit & E2E",
          description: "Seluruh 142 spesifikasi pengujian lulus dengan 100% cakupan kode.",
          tag: "Lulus",
          completed: true,
        },
        {
          id: "step-2",
          title: "Audit Ukuran Bundle & Tree-Shaking",
          description: "Ukuran runtime dioptimalkan menjadi 18.4 kB gzipped.",
          tag: "18.4 kB",
          completed: true,
        },
      ],
    },
  ];

  return <StaggeredContentAccordion items={items} defaultOpenId="checklist" />;
}`,
      },
    },
  },
};

// ============================================================================
// DATA & TYPES FOR INTERACTIVE DEMO COMPONENTS
// ============================================================================
export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  content: string;
}

export interface StaggeredItemStep {
  id: string;
  title: string;
  description: string;
  tag: string;
  completed: boolean;
}

export interface StaggeredItemData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  steps: StaggeredItemStep[];
}

// ============================================================================
// 1. <ClassicAccordionDemo />
// ============================================================================
function ClassicAccordionDemo() {
  const items: AccordionItemData[] = [
    {
      id: "classic-1",
      title: "How does dynamic height transition work in Framer Motion?",
      badge: "Architecture",
      content:
        "By binding initial height to 0 and target height to 'auto' inside an AnimatePresence wrapper, Framer Motion automatically measures the element's DOM bounding rect prior to execution, creating a perfectly frame-timed animation without layout shudder.",
    },
    {
      id: "classic-2",
      title: "Is virtual DOM recalculation suppressed during expansion?",
      badge: "Performance",
      content:
        "Yes. The content container encapsulates GPU-accelerated CSS transforms using transform-style preserve-3d and will-change hint attributes, preventing unnecessary parent paint cycles across 120Hz displays.",
    },
    {
      id: "classic-3",
      title: "Can I customize the active state colors and borders?",
      badge: "Customization",
      content:
        "All styles rely on Tailwind CSS semantic classes. You can override active backgrounds, divider lines, and text typography via standard utility classes or by passing custom JSX into the item content payload.",
    },
  ];

  const [openId, setOpenId] = useState<string>("classic-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white overflow-hidden divide-y divide-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 dark:divide-zinc-800">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150 cursor-pointer select-none ${
                isOpen
                  ? "bg-zinc-50 dark:bg-zinc-900/50"
                  : "hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30"
              }`}
            >
              <div className="flex items-center gap-3 pr-4">
                <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80">
                    {item.badge}
                  </span>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="shrink-0 text-zinc-400 dark:text-zinc-500"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100/80 dark:border-zinc-800/40">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 2. <FloatingCardAccordionDemo />
// ============================================================================
function FloatingCardAccordionDemo() {
  const items: AccordionItemData[] = [
    {
      id: "island-1",
      title: "Multi-Region Global Edge Replicas",
      subtitle: "Latency Optimization",
      badge: "Active",
      content:
        "Static and serverless workloads are automatically replicated across 300+ Edge Points of Presence worldwide. Intelligent anycast DNS ensures client requests hit the closest edge node with sub-25ms response latencies.",
    },
    {
      id: "island-2",
      title: "Automated Canary Rollback Guard",
      subtitle: "Deployment Safety",
      badge: "Real-Time",
      content:
        "Real-time synthetic traffic monitors error rate spikes, HTTP 5xx occurrences, and memory leaks. If anomaly thresholds exceed 0.05%, traffic instantly diverts back to the previous stable release without manual intervention.",
    },
    {
      id: "island-3",
      title: "Zero-Downtime Schema Migrations",
      subtitle: "Database Engine",
      badge: "Enterprise",
      content:
        "Expand-and-contract pattern support allows non-destructive database migrations. Dual-write sync and schema versioning keep your services fully online during massive relational table transformations.",
    },
  ];

  const [openId, setOpenId] = useState<string>("island-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full max-w-2xl space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-zinc-300 bg-white shadow-md shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none"
                : "border-zinc-200/80 bg-white shadow-xs hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 shrink-0 ${
                    isOpen
                      ? "bg-emerald-500 scale-100 shadow-sm shadow-emerald-500/50"
                      : "bg-zinc-300 dark:bg-zinc-700 scale-75"
                  }`}
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                  isOpen
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                }`}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`island-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 3. <MinimalistAccordionDemo />
// ============================================================================
function MinimalistAccordionDemo() {
  const items: AccordionItemData[] = [
    {
      id: "minimal-1",
      title: "Declarative Gesture Handling & Spring Dynamics",
      content:
        "By expressing UI state as continuous velocity variables rather than static keyframe intervals, transitions respond dynamically to interrupted touch inputs and mouse drag trajectories without jarring visual snaps.",
    },
    {
      id: "minimal-2",
      title: "Perceptual Latency and 16ms Frame Budgets",
      content:
        "Every layout mutation is scheduled within standard browser requestAnimationFrame phases. Calculations finish under 10ms to leave adequate breathing room for layout reflow and compositor thread flushing.",
    },
    {
      id: "minimal-3",
      title: "WCAG 2.2 AAA Contrast and Keyboard Navigation",
      content:
        "Fully keyboard navigable via Tab, Enter, Spacebar, and Arrow keys. High-contrast typography guarantees legibility under sunlight and OLED low-luminance ambient lighting environments.",
    },
  ];

  const [openId, setOpenId] = useState<string>("minimal-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full max-w-2xl divide-y divide-zinc-200 dark:divide-zinc-800">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const indexStr = String(index + 1).padStart(2, "0");

        return (
          <div key={item.id} className="py-2">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full group flex items-center justify-between py-4 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {indexStr}
                </span>
                <span className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>

              {/* Morphing Plus / Minus Glyph Icon */}
              <div className="relative w-7 h-7 flex items-center justify-center shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                <motion.span
                  className="absolute h-0.5 w-3 bg-current rounded-full"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                />
                <motion.span
                  className="absolute h-3 w-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isOpen ? 90 : 0,
                    scaleY: isOpen ? 0 : 1,
                    opacity: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.22 }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`minimal-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-7 pr-2 pb-5 pt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. <GlassmorphismAccordionDemo />
// ============================================================================
function GlassmorphismAccordionDemo() {
  const items: AccordionItemData[] = [
    {
      id: "glass-1",
      title: "Spatial Matrix & 3D Perspective Projection",
      icon: <SparklesIcon className="w-4 h-4 text-emerald-500" />,
      badge: "GPU Accelerated",
      content:
        "Harnesses WebGL and CSS hardware transforms to calculate real-time depth offsets, depth-of-field blurs, and physics-driven spring inertia across spatial layouts.",
    },
    {
      id: "glass-2",
      title: "Zero-Knowledge Enclave Computation",
      icon: <ShieldIcon className="w-4 h-4 text-sky-500" />,
      badge: "End-to-End Encrypted",
      content:
        "Sensitive user cryptographic identities and authorization payloads remain strictly quarantined within client-side WebAssembly isolation boundaries.",
    },
    {
      id: "glass-3",
      title: "Sub-Millisecond Edge Serverless Invocation",
      icon: <ZapIcon className="w-4 h-4 text-amber-500" />,
      badge: "V8 Isolate",
      content:
        "Cold boot overhead drops to near zero thanks to pre-warmed snapshot memory isolates provisioned across geo-distributed cloud compute clusters.",
    },
  ];

  const [openId, setOpenId] = useState<string>("glass-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full max-w-2xl relative">
      {/* Decorative ambient gradient backdrop glow for glass illusion */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-sky-500/15 to-indigo-500/10 blur-xl opacity-75 pointer-events-none" />

      <div className="relative space-y-3">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-zinc-300/80 bg-white/80 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/70 dark:bg-zinc-900/70"
                  : "border-zinc-200/60 bg-white/50 hover:bg-white/70 hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 pr-4">
                  {item.icon && (
                    <div className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                      {item.icon}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                    {item.badge && (
                      <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {item.badge}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  className="p-1.5 rounded-xl bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 shrink-0"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`glass-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 5. <StaggeredContentAccordionDemo />
// ============================================================================
function StaggeredContentAccordionDemo() {
  const items: StaggeredItemData[] = [
    {
      id: "stagger-1",
      title: "Production Deployment Checklist",
      subtitle: "4 verification steps before shipping live",
      badge: "Release Pipeline",
      steps: [
        {
          id: "step-1",
          title: "Run Unit & E2E Test Suite",
          description: "All 142 Vitest and Playwright test specs passed (100% coverage).",
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
        {
          id: "step-3",
          title: "WebAuthn Multi-Factor Authentication",
          description: "FIDO2 security token exchange verified across edge clusters.",
          tag: "Verified",
          completed: true,
        },
        {
          id: "step-4",
          title: "Anycast Edge CDN Cache Invalidation",
          description: "Purge stale surrogate keys across worldwide points of presence.",
          tag: "Ready",
          completed: false,
        },
      ],
    },
    {
      id: "stagger-2",
      title: "Zero-Trust API Webhook Pipeline",
      subtitle: "Real-time event dispatch and HMAC verification",
      badge: "Webhooks",
      steps: [
        {
          id: "step-2-1",
          title: "Generate HMAC-SHA256 Signing Secrets",
          description: "Unique per-tenant secret keys stored in hardware KMS vault.",
          tag: "Encrypted",
          completed: true,
        },
        {
          id: "step-2-2",
          title: "Configure Dead-Letter Queue (DLQ)",
          description: "Automatic exponential backoff with 5 retry intervals.",
          tag: "Enabled",
          completed: true,
        },
        {
          id: "step-2-3",
          title: "Stream Real-Time Audit Telemetry",
          description: "Payload event logs piped to Prometheus and OpenTelemetry.",
          tag: "Active",
          completed: true,
        },
      ],
    },
  ];

  const [openId, setOpenId] = useState<string>("stagger-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-zinc-300 bg-white shadow-md shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none"
                : "border-zinc-200/80 bg-white shadow-xs hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="p-1.5 rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 shrink-0"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`stagger-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.05,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-2.5 px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800/60"
                  >
                    {item.steps.map((step) => (
                      <motion.div
                        key={step.id}
                        variants={{
                          hidden: { opacity: 0, y: 12, scale: 0.98 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 420,
                              damping: 26,
                            },
                          },
                        }}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 hover:bg-zinc-100/70 dark:border-zinc-800/80 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/60 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                              step.completed
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-transparent"
                            }`}
                          >
                            <CheckIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                              {step.title}
                            </span>
                            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {step.tag && (
                          <span
                            className={`shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-md border ${
                              step.completed
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50"
                                : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                            }`}
                          >
                            {step.tag}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// MAIN PAGE: AnimatedAccordionDemo (Single Column Layout)
// ============================================================================
export function AnimatedAccordionDemo() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("id")
    ? "id"
    : "en";
  const t = ACCORDION_DICT[lang];

  return (
    <div className="w-full space-y-12 pb-20">
      {/* Page Header */}
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

      {/* Single Column Stack of All 5 Variants */}
      <div className="grid grid-cols-1 gap-10">
        {/* 1. CLASSIC ACCORDION */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.classic.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.classic.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.classic.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <ClassicAccordionDemo />
          </div>

          <CodeSnippet code={t.cards.classic.snippet} />
        </section>

        {/* 2. FLOATING CARD ACCORDION */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.floating.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.floating.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.floating.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <FloatingCardAccordionDemo />
          </div>

          <CodeSnippet code={t.cards.floating.snippet} />
        </section>

        {/* 3. MINIMALIST ACCORDION */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.minimal.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.minimal.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.minimal.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <MinimalistAccordionDemo />
          </div>

          <CodeSnippet code={t.cards.minimal.snippet} />
        </section>

        {/* 4. GLASSMORPHISM ACCORDION */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.glass.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.glass.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.glass.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <GlassmorphismAccordionDemo />
          </div>

          <CodeSnippet code={t.cards.glass.snippet} />
        </section>

        {/* 5. STAGGERED CONTENT ACCORDION */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.staggered.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.staggered.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.staggered.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-12 px-4 sm:px-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <StaggeredContentAccordionDemo />
          </div>

          <CodeSnippet code={t.cards.staggered.snippet} />
        </section>
      </div>
    </div>
  );
}

export default AnimatedAccordionDemo;

