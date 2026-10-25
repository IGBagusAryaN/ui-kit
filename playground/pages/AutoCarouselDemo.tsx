import React from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ZapIcon,
  LayersIcon,
} from "../../src/icons";
import {
  AutoCarousel,
  EpicSidebarCarousel,
  AutoTabsCarousel,
  DynamicPillCarousel,
  RadialProgressCarousel,
  type CarouselItem,
} from "../../src/components/AutoCarousel";

const CAROUSEL_DICT = {
  en: {
    pillTag1: "Zero-State Automated Engine",
    pillTag2: "4 Auto-Progress Variants",
    pageTitle: "Auto-Progress Carousels",
    pageDescription:
      "A premier collection of 4 automated, progress-timed carousel architectures built with Framer Motion and Tailwind CSS. Features internal timer state management: no useState boilerplate needed in user applications—simply pass database records or manual JSON items.",
    variants: {
      epic: {
        title: "1. Epic Store Vertical Progress Sidebar",
        badge: "Epic Games Store Style",
        description:
          "Split layout carousel where the 75% left hero viewport displays the featured showcase with title and CTA, while the 25% right vertical list item acts as an active timer, filling its background smoothly before advancing.",
        snippet: `import { EpicSidebarCarousel } from "@needui/ui-kit";

// Data fetched from database or loaded from manual JSON:
const games = [
  {
    id: "epic-1",
    title: "Cyber Odyssey: 2088",
    tagline: "Explore a neon-drenched metropolis with neural implant abilities.",
    genre: "Action RPG • Cyberpunk",
    price: "$59.99",
    cta: "Pre-Purchase Now",
    badge: "Available Nov 12",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-2",
    title: "Chronicles of Aethelgard",
    tagline: "Command ancestral legions in a fractured high-fantasy realm.",
    genre: "Strategy • Isometric RPG",
    price: "$49.99",
    cta: "Play Open Beta",
    badge: "Early Access",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
];

// Zero useState: Simply pass items and optional configuration!
export function HeroShowcase() {
  return (
    <EpicSidebarCarousel
      items={games}
      interval={5000}
      pauseOnHover
      onSlideChange={(index, item) => console.log("Slide:", index, item.title)}
    />
  );
}`,
      },
      tabs: {
        title: "2. Auto-Tabs Carousel (Horizontal Underline Fill)",
        badge: "Horizontal Text Tabs",
        description:
          "Enterprise feature showcase displaying a main interactive canvas with horizontal text navigation tabs underneath. A smooth underline progress line fills from 0 to 100% of the active tab width before transitioning to the next feature.",
        snippet: `import { AutoTabsCarousel } from "@needui/ui-kit";

// Data items from DB or JSON:
const features = [
  {
    id: "tab-1",
    title: "High-Concurrency",
    tagline: "500k req/s throughput",
    badge: "WASM JIT",
    spec: "< 1.2ms latency",
    description: "Multi-threaded virtual machine running zero-overhead byte-code.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-2",
    title: "Zero Layout Shift",
    tagline: "Pre-evaluated bounds",
    badge: "CLS Guard",
    spec: "0.000 score",
    description: "Calculates bounding box constraints offscreen prior to repaint.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=80",
  },
];

export function FeatureSection() {
  return <AutoTabsCarousel items={features} interval={4500} pauseOnHover />;
}`,
      },
      pills: {
        title: "3. Dynamic Pill Carousel (Expanding Dot Fill)",
        badge: "Morphing Glass Capsule",
        description:
          "Panoramic visual carousel featuring a floating glassmorphism pill capsule dock. Inactive slides appear as subtle circular dots, while the active slide expands into a capsule whose inner track fills with a glowing gradient.",
        snippet: `import { DynamicPillCarousel } from "@needui/ui-kit";

const projects = [
  {
    id: "pl-1",
    title: "The Glass Pavilion",
    tag: "Minimalist Habitat",
    location: "Lucerne, Switzerland",
    architect: "Studio Solis",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-2",
    title: "Nordic Obsidian Fjord",
    tag: "Sustainable Monolith",
    location: "Tromso, Norway",
    architect: "Aura Arkitekter",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
];

export function PortfolioGallery() {
  return <DynamicPillCarousel items={projects} interval={3500} />;
}`,
      },
      radial: {
        title: "4. Radial Progress Carousel (Circular Dial Timer)",
        badge: "SVG Stroke-Dashoffset Dial",
        description:
          "Luxury engineering layout with specs on the left and imagery on the right. An animated SVG circular dial counts down 360 degrees using synchronized stroke-dashoffset transitions, seamlessly triggering the next slide upon completion.",
        snippet: `import { RadialProgressCarousel } from "@needui/ui-kit";

const products = [
  {
    id: "rd-1",
    title: "ChronoSphere Chronograph",
    edition: "Ref. 904L Titanium",
    statPrimary: "28,800 vph",
    statLabel: "Balance Frequency",
    description: "Hand-finished skeleton movement with silicon escapement wheel.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-2",
    title: "Aura Acoustics Studio 1",
    edition: "Planar Magnetic Driver",
    statPrimary: "4Hz - 54kHz",
    statLabel: "Frequency Range",
    description: "Ultra-thin beryllium composite diaphragms offering natural transients.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  },
];

export function ProductShowcase() {
  return <RadialProgressCarousel items={products} interval={4000} />;
}`,
      },
    },
    propsTable: {
      title: "Props API Reference",
      headers: {
        prop: "Prop",
        type: "Type",
        default: "Default",
        description: "Description",
      },
      rows: [
        {
          prop: "items",
          type: "CarouselItem[]",
          default: "required",
          description: "Array of data items loaded from database or manual JSON (id, title, image, tagline, etc.).",
        },
        {
          prop: "variant",
          type: '"epic" | "tabs" | "pills" | "radial"',
          default: '"epic"',
          description: "Visual layout architecture and progress timer style (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"full"',
          description: "Configures max-width container bounds for the carousel (CVA).",
        },
        {
          prop: "interval",
          type: "number",
          default: "5000",
          description: "Duration of the auto-advancing timer per slide in milliseconds.",
        },
        {
          prop: "autoPlay",
          type: "boolean",
          default: "true",
          description: "Enables automatic slide playback driven by the internal timer.",
        },
        {
          prop: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: "Pauses active countdown timer while pointer/cursor hovers over the carousel.",
        },
        {
          prop: "onSlideChange",
          type: "(index: number, item: CarouselItem) => void",
          default: "undefined",
          description: "Callback triggered whenever the active slide index advances (for analytics/tracking).",
        },
        {
          prop: "onItemClick",
          type: "(item: CarouselItem, index: number) => void",
          default: "undefined",
          description: "Callback fired when a user explicitly clicks a tab, thumbnail, or dot indicator.",
        },
        {
          prop: "progressClassName",
          type: "string",
          default: "undefined",
          description: "Custom CSS className for the active countdown progress load indicator (default: neutral monochrome).",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Additional Tailwind CSS classes merged onto root container element.",
        },
      ],
    },
  },
  id: {
    pillTag1: "Mesin Otomatis Tanpa useState",
    pillTag2: "4 Varian Progres Otomatis",
    pageTitle: "Auto-Progress Carousels",
    pageDescription:
      "Rangkaian 4 arsitektur carousel otomatis dengan indikator progres waktu terpadu yang dibangun dengan Framer Motion dan Tailwind CSS. Mengelola state timer dan slide aktif secara internal tanpa mengharuskan user mendeklarasikan useState manual—cukup masukkan data dari DB atau file JSON.",
    variants: {
      epic: {
        title: "1. Epic Store Vertical Progress Sidebar",
        badge: "Gaya Epic Games Store",
        description:
          "Layout terbagi di mana 75% hero sisi kiri menampilkan showcase utama lengkap dengan judul dan CTA, sementara daftar vertikal di sisi kanan 25% bertindak sebagai timer aktif yang mengisi latar belakangnya secara halus sebelum berpindah slide.",
        snippet: `import { EpicSidebarCarousel } from "@needui/ui-kit";

// Data langsung dari database atau file JSON:
const games = [
  {
    id: "epic-1",
    title: "Cyber Odyssey: 2088",
    tagline: "Explore a neon-drenched metropolis with neural implant abilities.",
    genre: "Action RPG • Cyberpunk",
    price: "$59.99",
    cta: "Pre-Purchase Now",
    badge: "Available Nov 12",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-2",
    title: "Chronicles of Aethelgard",
    tagline: "Command ancestral legions in a fractured high-fantasy realm.",
    genre: "Strategy • Isometric RPG",
    price: "$49.99",
    cta: "Play Open Beta",
    badge: "Early Access",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
];

// Tanpa useState: Cukup berikan data items dan durasi interval opsional!
export function HeroShowcase() {
  return (
    <EpicSidebarCarousel
      items={games}
      interval={5000}
      pauseOnHover
      onSlideChange={(index, item) => console.log("Slide:", index, item.title)}
    />
  );
}`,
      },
      tabs: {
        title: "2. Auto-Tabs Carousel (Horizontal Underline Fill)",
        badge: "Tab Teks Horizontal",
        description:
          "Showcase fitur enterprise dengan kanvas interaktif utama dan tab teks navigasi horizontal di bawahnya. Garis bawah tipis terisi dari 0 hingga 100% dari lebar tab aktif sebelum bertransisi ke fitur berikutnya.",
        snippet: `import { AutoTabsCarousel } from "@needui/ui-kit";

const features = [
  {
    id: "tab-1",
    title: "High-Concurrency",
    tagline: "500k req/s throughput",
    badge: "WASM JIT",
    spec: "< 1.2ms latency",
    description: "Multi-threaded virtual machine running zero-overhead byte-code.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-2",
    title: "Zero Layout Shift",
    tagline: "Pre-evaluated bounds",
    badge: "CLS Guard",
    spec: "0.000 score",
    description: "Calculates bounding box constraints offscreen prior to repaint.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=80",
  },
];

export function FeatureSection() {
  return <AutoTabsCarousel items={features} interval={4500} pauseOnHover />;
}`,
      },
      pills: {
        title: "3. Dynamic Pill Carousel (Expanding Dot Fill)",
        badge: "Kapsul Kaca Dinamis",
        description:
          "Carousel panorama visual dengan dock kapsul kaca melayang. Slide non-aktif berbentuk titik melingkar, sedangkan slide aktif melebar menjadi kapsul dengan bilah gradien terisi otomatis.",
        snippet: `import { DynamicPillCarousel } from "@needui/ui-kit";

const projects = [
  {
    id: "pl-1",
    title: "The Glass Pavilion",
    tag: "Minimalist Habitat",
    location: "Lucerne, Switzerland",
    architect: "Studio Solis",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-2",
    title: "Nordic Obsidian Fjord",
    tag: "Sustainable Monolith",
    location: "Tromso, Norway",
    architect: "Aura Arkitekter",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
];

export function PortfolioGallery() {
  return <DynamicPillCarousel items={projects} interval={3500} />;
}`,
      },
      radial: {
        title: "4. Radial Progress Carousel (Circular Dial Timer)",
        badge: "Dial Melingkar SVG",
        description:
          "Tata letak rekayasa mewah dengan rincian spesifikasi di kiri dan visual produk di kanan. Dial melingkar SVG menghitung mundur 360 derajat secara presisi, memicu pergantian slide otomatis saat terisi penuh.",
        snippet: `import { RadialProgressCarousel } from "@needui/ui-kit";

const products = [
  {
    id: "rd-1",
    title: "ChronoSphere Chronograph",
    edition: "Ref. 904L Titanium",
    statPrimary: "28,800 vph",
    statLabel: "Balance Frequency",
    description: "Hand-finished skeleton movement with silicon escapement wheel.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-2",
    title: "Aura Acoustics Studio 1",
    edition: "Planar Magnetic Driver",
    statPrimary: "4Hz - 54kHz",
    statLabel: "Frequency Range",
    description: "Ultra-thin beryllium composite diaphragms offering natural transients.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  },
];

export function ProductShowcase() {
  return <RadialProgressCarousel items={products} interval={4000} />;
}`,
      },
    },
    propsTable: {
      title: "Referensi Props API",
      headers: {
        prop: "Prop",
        type: "Tipe",
        default: "Bawaan",
        description: "Deskripsi",
      },
      rows: [
        {
          prop: "items",
          type: "CarouselItem[]",
          default: "required",
          description: "Array data item dari database atau JSON manual (id, title, image, tagline, dll).",
        },
        {
          prop: "variant",
          type: '"epic" | "tabs" | "pills" | "radial"',
          default: '"epic"',
          description: "Gaya arsitektur layout dan progres visual carousel (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"full"',
          description: "Mengatur lebar maksimal kontainer carousel (CVA).",
        },
        {
          prop: "interval",
          type: "number",
          default: "5000",
          description: "Durasi timer per slide dalam milidetik sebelum otomatis berpindah.",
        },
        {
          prop: "autoPlay",
          type: "boolean",
          default: "true",
          description: "Mengaktifkan perputaran otomatis timer slide.",
        },
        {
          prop: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: "Menjeda timer otomatis saat kursor mouse berada di atas carousel.",
        },
        {
          prop: "onSlideChange",
          type: "(index: number, item: CarouselItem) => void",
          default: "undefined",
          description: "Callback saat slide aktif berpindah (berguna untuk analitik / event tracking).",
        },
        {
          prop: "onItemClick",
          type: "(item: CarouselItem, index: number) => void",
          default: "undefined",
          description: "Callback saat tombol navigasi / thumbnail item tertentu diklik oleh user.",
        },
        {
          prop: "progressClassName",
          type: "string",
          default: "undefined",
          description: "Class kustom untuk warna indikator progres load next (default: netral monokrom / abu-abu).",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Class kustom tambahan Tailwind CSS untuk elemen root.",
        },
      ],
    },
  },
};

// ============================================================================
// MOCK DATA (JSON / DB SCHEMA)
// ============================================================================

const epicSlides: CarouselItem[] = [
  {
    id: "epic-1",
    title: "Cyber Odyssey: 2088",
    tagline: "Explore a neon-drenched metropolis with neural implant abilities.",
    genre: "Action RPG • Cyberpunk",
    price: "$59.99",
    cta: "Pre-Purchase Now",
    badge: "Available Nov 12",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-2",
    title: "Chronicles of Aethelgard",
    tagline: "Command ancestral legions in a fractured high-fantasy realm.",
    genre: "Strategy • Isometric RPG",
    price: "$49.99",
    cta: "Play Open Beta",
    badge: "Early Access",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-3",
    title: "Solaris Deep Horizon",
    tagline: "Build self-sustaining orbital colonies around a dying star.",
    genre: "Simulation • Space Survival",
    price: "$39.99",
    cta: "Explore Tech Tree",
    badge: "Major Update v2.0",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-4",
    title: "Valkyrie: Mech Protocol",
    tagline: "Hyper-kinetic 6v6 aerial battles in customizable armored suits.",
    genre: "Team Combat • Sci-Fi",
    price: "Free to Play",
    cta: "Join The Squad",
    badge: "Season 4 Live",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-5",
    title: "Neon Drift: Tokyo Midnight",
    tagline: "Twin-turbo street racing powered by full hardware path tracing.",
    genre: "Arcade Racing • Simulation",
    price: "$29.99",
    cta: "Upgrade Garage",
    badge: "120 FPS Ray Tracing",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
];

const featureTabs: CarouselItem[] = [
  {
    id: "tab-1",
    title: "High-Concurrency",
    tagline: "500k req/s throughput",
    badge: "WASM JIT",
    spec: "< 1.2ms latency",
    description:
      "Multi-threaded virtual machine running zero-overhead byte-code compiled directly from modern React declarative trees.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-2",
    title: "Zero Layout Shift",
    tagline: "Pre-evaluated bounds",
    badge: "CLS Guard",
    spec: "0.000 score",
    description:
      "Calculates bounding box constraints offscreen prior to repaint, guaranteeing completely jitter-free DOM resizing across displays.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-3",
    title: "Universal Tokens",
    tagline: "WCAG AAA dark/light",
    badge: "Design System",
    spec: "WCAG 2.1 Compliant",
    description:
      "Synchronized dual-palette design tokens engineered with high-contrast neutral zinc and vibrant indigo highlight spectrums.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-4",
    title: "Edge Replication",
    tagline: "128 Global regions",
    badge: "Infrastructure",
    spec: "Sub-2ms TTFB",
    description:
      "Autonomous edge cache warmers proactively push critical UI chunks into local memory prior to pointer touchdown.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1100&q=80",
  },
];

const pillSlideItems: CarouselItem[] = [
  {
    id: "pl-1",
    title: "The Glass Pavilion",
    tag: "Minimalist Habitat",
    location: "Lucerne, Switzerland",
    architect: "Studio Solis",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-2",
    title: "Nordic Obsidian Fjord",
    tag: "Sustainable Monolith",
    location: "Tromso, Norway",
    architect: "Aura Arkitekter",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-3",
    title: "Kyoto Timber Sanctum",
    tag: "Zen Modernism",
    location: "Kyoto, Japan",
    architect: "Kengo Kobo",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-4",
    title: "Santorini Cliff Residence",
    tag: "Mediterranean Horizon",
    location: "Oia, Greece",
    architect: "Aegean Dynamics",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
  },
];

const radialProducts: CarouselItem[] = [
  {
    id: "rd-1",
    title: "ChronoSphere Chronograph",
    edition: "Ref. 904L Titanium",
    subtitle: "COSC-Certified Mechanical Precision",
    statPrimary: "28,800 vph",
    statLabel: "Balance Frequency",
    description:
      "Hand-finished skeleton movement with silicon escapement wheel delivering 72 hours of uninterrupted power reserve.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-2",
    title: "Aura Acoustics Studio 1",
    edition: "Planar Magnetic Driver",
    subtitle: "Spatial Audio Field Synthesizer",
    statPrimary: "4Hz - 54kHz",
    statLabel: "Frequency Range",
    description:
      "Ultra-thin beryllium composite diaphragms offering natural acoustic transients with zero total harmonic distortion.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-3",
    title: "Valkyrie Spatial Lens",
    edition: "Aspherical Fluorite Optics",
    subtitle: "Zero Chromatic Aberration",
    statPrimary: "f/1.2 Max",
    statLabel: "Lens Aperture",
    description:
      "Dual linear autofocus motors delivering lightning quick subject tracking under extreme low-light conditions.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export function AutoCarouselDemo() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const t = isId ? CAROUSEL_DICT.id : CAROUSEL_DICT.en;

  const carouselCards = [
    {
      id: "epic",
      title: t.variants.epic.title,
      badge: t.variants.epic.badge,
      desc: t.variants.epic.description,
      component: <EpicSidebarCarousel items={epicSlides} interval={5000} pauseOnHover />,
      snippet: t.variants.epic.snippet,
    },
    {
      id: "tabs",
      title: t.variants.tabs.title,
      badge: t.variants.tabs.badge,
      desc: t.variants.tabs.description,
      component: <AutoTabsCarousel items={featureTabs} interval={4500} pauseOnHover />,
      snippet: t.variants.tabs.snippet,
    },
    {
      id: "pills",
      title: t.variants.pills.title,
      badge: t.variants.pills.badge,
      desc: t.variants.pills.description,
      component: <DynamicPillCarousel items={pillSlideItems} interval={3500} pauseOnHover />,
      snippet: t.variants.pills.snippet,
    },
    {
      id: "radial",
      title: t.variants.radial.title,
      badge: t.variants.radial.badge,
      desc: t.variants.radial.description,
      component: <RadialProgressCarousel items={radialProducts} interval={4000} pauseOnHover />,
      snippet: t.variants.radial.snippet,
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

      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {carouselCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div className="space-y-2 mb-6">
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

            <div className="flex items-center justify-center p-3 sm:p-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
              {card.component}
            </div>

            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>

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
              {t.propsTable.rows.map((row) => (
                <tr key={row.prop}>
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">{row.prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">{row.type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{row.default}</td>
                  <td className="px-4 py-2.5">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AutoCarouselDemo;
