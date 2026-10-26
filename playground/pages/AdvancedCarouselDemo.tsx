import React from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import { ZapIcon, LayersIcon } from "../../src/icons";
import {
  CoverflowCarousel,
  ParallaxImageCarousel,
  StackedSwipeCarousel,
  ExpandingActiveCarousel,
  SeamlessInfiniteCarousel,
} from "../../src/components/AdvancedCarousel";

const CAROUSEL_DICT = {
  en: {
    pillTag1: "Physics-Based Gesture Dynamics",
    pillTag2: "5 Advanced Variants",
    pageTitle: "Advanced Animated Carousels",
    pageDescription:
      "A premier collection of 5 fluid, physics-driven carousel architectures built with Framer Motion and Tailwind CSS. Featuring 3D depth coverflow perspectives, responsive internal parallax shifts, interactive gesture card swiping, horizontal accordion panel expansion, and continuous seamless infinite drag looping.",
    variants: {
      coverflow: {
        title: "1. Coverflow 3D Depth Slider",
        badge: "3D Perspective & Snap",
        description:
          "Three-dimensional spatial coverflow where the centered active item elevates with full scale and opacity, while flanking cards rotate in 3D space with subtle depth scaling. Includes auto-centering drag snaps and tactile click-to-activate interaction.",
        snippet: `import { CoverflowCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <CoverflowCarousel
      initialIndex={2}
      showControls
      showIndicators
    />
  );
}`,
      },
      parallax: {
        title: "2. Parallax Image Drag Carousel",
        badge: "Internal Velocity Parallax",
        description:
          "Dual-tier motion slider where horizontal drag gestures concurrently shift card containers and internal imagery at differential velocities, generating an immersive optical depth illusion without layout jitter.",
        snippet: `import { ParallaxImageCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <ParallaxImageCarousel />
  );
}`,
      },
      stacked: {
        title: "3. Stacked Swipe Carousel (Tinder Card Stack)",
        badge: "Physics Gesture Dismiss",
        description:
          "Physical card stack rendered in dynamic z-axis cascading layers. Dragging the top card evaluates horizontal velocity and offset thresholds, triggering organic exit rotations and promoting underlying cards seamlessly.",
        snippet: `import { StackedSwipeCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <StackedSwipeCarousel
      onSwipe={(direction, card) => {
        console.log("Card dismissed:", direction, card.name);
      }}
    />
  );
}`,
      },
      expanding: {
        title: "4. Expanding Active Carousel (Horizontal Accordion)",
        badge: "Fluid Layout Morphing",
        description:
          "Interactive horizontal accordion using Framer Motion's layout engine. Inactive panels collapse into sleek vertical identity pillars, while the active panel expands with spring damping to unveil full multimedia content.",
        snippet: `import { ExpandingActiveCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <ExpandingActiveCarousel />
  );
}`,
      },
      seamless: {
        title: "5. Seamless Infinite Draggable Carousel",
        badge: "Virtual Loop & Inertia",
        description:
          "Continuous cyclical carousel supporting unrestricted manual gesture dragging in either direction. Leverages modulo index calculations and velocity momentum to eliminate edge boundaries and abrupt restarts.",
        snippet: `import { SeamlessInfiniteCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <SeamlessInfiniteCarousel />
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Dinamika Gestur Berbasis Fisika",
    pillTag2: "5 Varian Lanjutan",
    pageTitle: "Advanced Animated Carousels",
    pageDescription:
      "Koleksi 5 arsitektur carousel tingkat lanjut berbasis Framer Motion dan Tailwind CSS. Menampilkan perspektif 3D coverflow spasial, parallax gambar internal responsif, tumpukan kartu swipe interaktif, akordeon horizontal ekspansif, dan perputaran loop virtual tanpa batas.",
    variants: {
      coverflow: {
        title: "1. Coverflow 3D Depth Slider",
        badge: "Perspektif 3D & Snap",
        description:
          "Coverflow spasial tiga dimensi di mana item tengah terangkat dengan skala dan opasitas penuh, sementara kartu di sisi samping berotasi dalam ruang 3D. Mendukung drag-snap otomatis dan navigasi klik taktil.",
        snippet: `import { CoverflowCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <CoverflowCarousel
      initialIndex={2}
      showControls
      showIndicators
    />
  );
}`,
      },
      parallax: {
        title: "2. Parallax Image Drag Carousel",
        badge: "Parallax Kecepatan Internal",
        description:
          "Slider dua tingkat di mana gestur geser horizontal menggeser wadah kartu dan gambar internal pada kecepatan berbeda, menciptakan ilusi kedalaman optik yang imersif tanpa getaran layout.",
        snippet: `import { ParallaxImageCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <ParallaxImageCarousel />
  );
}`,
      },
      stacked: {
        title: "3. Stacked Swipe Carousel (Tumpukan Kartu)",
        badge: "Fisika Gestur Dismiss",
        description:
          "Tumpukan kartu fisik berlapis dinamis pada sumbu Z. Menggeser kartu teratas mengevaluasi batas kecepatan dan jarak geser, memicu rotasi keluar natural dan memajukan kartu berikutnya secara mulus.",
        snippet: `import { StackedSwipeCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <StackedSwipeCarousel
      onSwipe={(direction, card) => {
        console.log("Kartu disapu:", direction, card.name);
      }}
    />
  );
}`,
      },
      expanding: {
        title: "4. Expanding Active Carousel (Akordeon Horizontal)",
        badge: "Morfi Layout Fluida",
        description:
          "Akordeon horizontal interaktif berbasis layout projection engine. Panel tidak aktif mengecil menjadi pilar vertikal ramping, sedangkan panel aktif mengembang dengan redaman pegas lembut.",
        snippet: `import { ExpandingActiveCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <ExpandingActiveCarousel />
  );
}`,
      },
      seamless: {
        title: "5. Seamless Infinite Draggable Carousel",
        badge: "Loop Virtual & Inersia",
        description:
          "Carousel siklis berkelanjutan yang mendukung gestur drag manual tanpa batas di kedua arah. Menggunakan kalkulasi indeks modulo dan momentum kecepatan untuk menghilangkan batasan tepi.",
        snippet: `import { SeamlessInfiniteCarousel } from "@needui/ui-kit";

export function Example() {
  return (
    <SeamlessInfiniteCarousel />
  );
}`,
      },
    },
  },
};

export function AdvancedCarouselDemo() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const t = isId ? CAROUSEL_DICT.id : CAROUSEL_DICT.en;

  const carouselCards = [
    {
      id: "coverflow",
      title: t.variants.coverflow.title,
      badge: t.variants.coverflow.badge,
      desc: t.variants.coverflow.description,
      component: <CoverflowCarousel />,
      snippet: t.variants.coverflow.snippet,
    },
    {
      id: "parallax",
      title: t.variants.parallax.title,
      badge: t.variants.parallax.badge,
      desc: t.variants.parallax.description,
      component: <ParallaxImageCarousel />,
      snippet: t.variants.parallax.snippet,
    },
    {
      id: "stacked",
      title: t.variants.stacked.title,
      badge: t.variants.stacked.badge,
      desc: t.variants.stacked.description,
      component: <StackedSwipeCarousel />,
      snippet: t.variants.stacked.snippet,
    },
    {
      id: "expanding",
      title: t.variants.expanding.title,
      badge: t.variants.expanding.badge,
      desc: t.variants.expanding.description,
      component: <ExpandingActiveCarousel />,
      snippet: t.variants.expanding.snippet,
    },
    {
      id: "seamless",
      title: t.variants.seamless.title,
      badge: t.variants.seamless.badge,
      desc: t.variants.seamless.description,
      component: <SeamlessInfiniteCarousel />,
      snippet: t.variants.seamless.snippet,
    },
  ];

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* Header */}
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

      {/* Cards List */}
      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {carouselCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
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

            <div className="flex items-center justify-center p-2 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
              {card.component}
            </div>

            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>

      {/* Props API Reference */}
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "coverflow" | "parallax" | "stacked" | "expanding" | "seamless" | "cinematic"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"coverflow"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Pilihan varian animasi dan arsitektur gerak carousel."
                    : "Motion architecture and layout presentation variant."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">items</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">CarouselItem[]</td>
                <td className="px-4 py-2.5 font-mono text-xs">defaultItems</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Daftar data kartu/slide standar terpadu (berlaku seragam untuk seluruh varian)."
                    : "Unified standard array of slide/card items applied across all carousel variants."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">activeIndex</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Indeks kartu/slide yang sedang aktif (controlled mode)."
                    : "Active card/slide index in controlled mode."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">defaultIndex</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs">0</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Indeks awal saat komponen pertama kali dirender."
                    : "Initial index rendered on component mount."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">autoPlay</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Memutar pergantian slide/kartu secara otomatis berkala."
                    : "Automatically cycle slides on regular time intervals."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">interval</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs">5000</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Durasi jeda auto-play dalam milidetik (ms)."
                    : "Auto-play duration interval in milliseconds."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onChange</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  (index: number, item?: CarouselItem) =&gt; void
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Callback saat posisi slide aktif berubah (via klik, tombol, swipe, atau auto-play)."
                    : "Callback fired when the active slide index changes."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"sm" | "default" | "lg" | "full"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Batas lebar maksimal kontainer carousel berbasis CVA."
                    : "Max-width container bounding constraint via CVA."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class utilitas tambahan Tailwind CSS yang digabungkan via cn()."
                    : "Additional Tailwind CSS classes merged via cn()."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdvancedCarouselDemo;
