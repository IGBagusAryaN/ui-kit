import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import { ZapIcon, LayersIcon } from "../../src/icons";
import {
  AnimatedTimeline,
  SVGDrawTimeline,
  GlowingParticleTimeline,
  ExpandableStepTimeline,
  HorizontalElasticTimeline,
  AlternateScrollTimeline,
} from "../../src/components/Timeline";

const TIMELINE_DICT = {
  en: {
    pillTag1: "Framer Motion Physics",
    pillTag2: "5 Production Timeline Architectures",
    pageTitle: "Animated Timeline",
    pageDescription:
      "A premier suite of 5 minimalist yet creative timeline and traceline interfaces engineered with Framer Motion and Tailwind CSS. Built on the philosophy of 'Simple but Creative', offering SVG drawing paths, luminous particle data-streams, spring-based milestone accordions, elastic steppers, and staggered alternating scroll reveals.",
    variants: {
      svgDraw: {
        title: "1. SVG Draw Timeline (Animated Line Drawing)",
        badge: "Vector PathLength Interpolation",
        description:
          "Vertical milestone roadmap where the connecting line is an SVG vector drawn dynamically with Framer Motion's pathLength as it enters the viewport. Features pulsating milestone nodes and contextual execution badges.",
        snippet: `import { SVGDrawTimeline } from "@needui/ui-kit";

// Custom milestone items (or omit to use built-in defaults)
const milestones = [
  { id: 1, phase: "Phase 01", quarter: "Q1 2025", title: "System Architecture", status: "completed" },
  { id: 2, phase: "Phase 02", quarter: "Q2 2025", title: "Fluid Interaction Engine", status: "in-progress" },
  { id: 3, phase: "Phase 03", quarter: "Q3 2025", title: "Autonomous Orchestration", status: "pending" },
];

export function RoadmapDemo() {
  return (
    <SVGDrawTimeline
      items={milestones}
      showRedrawButton
      size="md"
    />
  );
}`,
      },
      glowingParticle: {
        title: "2. Glowing Particle Timeline (Moving Light Node)",
        badge: "Data Stream Photon Pulse",
        description:
          "High-tech telemetry timeline featuring an ambient glowing light particle that travels down a dimmed fiber-optic track. Emulates continuous distributed data flow with interactive velocity controls.",
        snippet: `import { GlowingParticleTimeline } from "@needui/ui-kit";

export function TelemetryDemo() {
  return (
    <GlowingParticleTimeline
      autoPlay
      defaultSpeed={1}
      size="md"
      onNodeClick={(index, node) => console.log("Selected Node:", node.name)}
    />
  );
}`,
      },
      expandableStep: {
        title: "3. Expandable Step Timeline (Accordion Milestone)",
        badge: "Spring-Physics Accordion",
        description:
          "Interactive workflow checklist where only the active step expands with spring-damped ease, revealing sub-task verification checklists, action buttons, and status tokens.",
        snippet: `import { ExpandableStepTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <ExpandableStepTimeline
      activeStep={activeStep}
      onStepChange={setActiveStep}
      size="md"
    />
  );
}`,
      },
      horizontalElastic: {
        title: "4. Horizontal Elastic Timeline (Progress Stepper)",
        badge: "Elastic Track Stepper",
        description:
          "Horizontal chronological stepper featuring a spring-interpolated progress line, glowing milestone node indicators, and tabbed phase deliverables for onboarding wizards and release roadmaps.",
        snippet: `import { HorizontalElasticTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <HorizontalElasticTimeline
      activeStep={currentStep}
      onStepChange={setCurrentStep}
      size="md"
    />
  );
}`,
      },
      alternateScroll: {
        title: "5. Alternate Scroll Timeline (Staggered Reveals)",
        badge: "Viewport Staggered Left/Right",
        description:
          "Classic zigzag alternating timeline where milestone cards glide in from left and right as they scroll into view, connected by a center vertical spine with telemetry metrics.",
        snippet: `import { AlternateScrollTimeline } from "@needui/ui-kit";

export function HistoryDemo() {
  return (
    <AlternateScrollTimeline size="lg" />
  );
}`,
      },
      unified: {
        title: "6. Unified AnimatedTimeline (Master CVA Component)",
        badge: "Composable CVA Architecture",
        description:
          "Single composable component supporting all 5 timeline layout modes ('svg-draw' | 'glowing-particle' | 'accordion' | 'stepper' | 'alternating') with unified sizing ('sm' | 'md' | 'lg' | 'full') and zero boilerplate.",
        snippet: `import { AnimatedTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function MasterTimelineDemo() {
  const [variant, setVariant] = useState<"svg-draw" | "glowing-particle" | "accordion" | "stepper" | "alternating">("svg-draw");

  return (
    <AnimatedTimeline
      variant={variant}
      size="md"
    />
  );
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
          prop: "variant",
          type: '"svg-draw" | "glowing-particle" | "accordion" | "stepper" | "alternating"',
          default: '"svg-draw"',
          description: "Layout architecture and interaction physics style (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"md"',
          description: "Max-width container constraint for responsive layouts.",
        },
        {
          prop: "svgItems",
          type: "SVGTimelineItem[]",
          default: "DEFAULT_SVG_MILESTONES",
          description: "Array of roadmap milestone objects for SVG draw timeline.",
        },
        {
          prop: "telemetryNodes",
          type: "TelemetryNodeItem[]",
          default: "DEFAULT_TELEMETRY_NODES",
          description: "Array of data telemetry nodes for glowing particle stream.",
        },
        {
          prop: "stepWorkflow",
          type: "ExpandableStepItem[]",
          default: "DEFAULT_STEP_WORKFLOW",
          description: "Array of step items with checklists for accordion timeline.",
        },
        {
          prop: "horizontalPhases",
          type: "HorizontalPhaseItem[]",
          default: "DEFAULT_HORIZONTAL_PHASES",
          description: "Array of phases with deliverables for horizontal stepper.",
        },
        {
          prop: "scrollEvents",
          type: "AlternateScrollItem[]",
          default: "DEFAULT_ZIGZAG_EVENTS",
          description: "Array of chronological events for alternating zigzag view.",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Tailwind CSS utility classes for root container override.",
        },
      ],
    },
  },
  id: {
    pillTag1: "Fisika Framer Motion",
    pillTag2: "5 Arsitektur Timeline Produksi",
    pageTitle: "Animated Timeline",
    pageDescription:
      "Koleksi 5 arsitektur timeline dan trace line minimalis berkinerja tinggi yang dibangun dengan Framer Motion dan Tailwind CSS. Mengusung filosofi 'Simple but Creative': jalur gambar vektor SVG dinamis, data-stream foton bercahaya, akordeon milestone berpegas, stepper horizontal elastis, dan reveal bolak-balik saat scroll.",
    variants: {
      svgDraw: {
        title: "1. SVG Draw Timeline (Animated Line Drawing)",
        badge: "Vector PathLength Interpolation",
        description:
          "Roadmap pencapaian vertikal di mana garis penghubung digambar secara dinamis dengan vektor SVG saat masuk ke layar (viewport). Dilengkapi node berdenyut dan lencana status eksekusi.",
        snippet: `import { SVGDrawTimeline } from "@needui/ui-kit";

export function RoadmapDemo() {
  return (
    <SVGDrawTimeline
      showRedrawButton
      size="md"
    />
  );
}`,
      },
      glowingParticle: {
        title: "2. Glowing Particle Timeline (Moving Light Node)",
        badge: "Data Stream Photon Pulse",
        description:
          "Timeline telemetri berteknologi tinggi dengan partikel cahaya berjalan di atas rel fiber optik. Merefleksikan aliran data terdistribusi dengan kontrol kecepatan interaktif.",
        snippet: `import { GlowingParticleTimeline } from "@needui/ui-kit";

export function TelemetryDemo() {
  return (
    <GlowingParticleTimeline
      autoPlay
      defaultSpeed={1}
      size="md"
    />
  );
}`,
      },
      expandableStep: {
        title: "3. Expandable Step Timeline (Accordion Milestone)",
        badge: "Spring-Physics Accordion",
        description:
          "Daftar periksa alur kerja interaktif di mana hanya langkah aktif yang melebar halus secara elastis, menampilkan verifikasi checklist dan tombol navigasi langkah.",
        snippet: `import { ExpandableStepTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <ExpandableStepTimeline
      activeStep={activeStep}
      onStepChange={setActiveStep}
      size="md"
    />
  );
}`,
      },
      horizontalElastic: {
        title: "4. Horizontal Elastic Timeline (Progress Stepper)",
        badge: "Elastic Track Stepper",
        description:
          "Stepper kronologis horizontal dengan garis progres pegas yang terisi halus, cincin pendar aktif, dan rincian deliverable per fase untuk wizard onboarding atau roadmap.",
        snippet: `import { HorizontalElasticTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <HorizontalElasticTimeline
      activeStep={currentStep}
      onStepChange={setCurrentStep}
      size="md"
    />
  );
}`,
      },
      alternateScroll: {
        title: "5. Alternate Scroll Timeline (Staggered Reveals)",
        badge: "Viewport Staggered Left/Right",
        description:
          "Timeline zigzag bergantian di mana kartu pencapaian meluncur masuk dari kiri dan kanan secara bertahap saat di-scroll, dihubungkan oleh garis vertikal pusat dan metrik benchmark.",
        snippet: `import { AlternateScrollTimeline } from "@needui/ui-kit";

export function HistoryDemo() {
  return (
    <AlternateScrollTimeline size="lg" />
  );
}`,
      },
      unified: {
        title: "6. Unified AnimatedTimeline (Master CVA Component)",
        badge: "Komponen Master CVA",
        description:
          "Komponen tunggal composable yang mendukung kelima mode tata letak timeline ('svg-draw' | 'glowing-particle' | 'accordion' | 'stepper' | 'alternating') melalui prop variant dengan ukuran responsif ('sm' | 'md' | 'lg' | 'full').",
        snippet: `import { AnimatedTimeline } from "@needui/ui-kit";
import { useState } from "react";

export function MasterTimelineDemo() {
  const [variant, setVariant] = useState<"svg-draw" | "glowing-particle" | "accordion" | "stepper" | "alternating">("svg-draw");

  return (
    <AnimatedTimeline
      variant={variant}
      size="md"
    />
  );
}`,
      },
    },
    propsTable: {
      title: "Props API Reference",
      headers: {
        prop: "Prop",
        type: "Tipe",
        default: "Bawaan",
        description: "Deskripsi",
      },
      rows: [
        {
          prop: "variant",
          type: '"svg-draw" | "glowing-particle" | "accordion" | "stepper" | "alternating"',
          default: '"svg-draw"',
          description: "Gaya arsitektur tata letak dan fisika animasi timeline (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"md"',
          description: "Batas lebar maksimal kontainer timeline responsif.",
        },
        {
          prop: "svgItems",
          type: "SVGTimelineItem[]",
          default: "DEFAULT_SVG_MILESTONES",
          description: "Array item roadmap pencapaian untuk varian SVG draw.",
        },
        {
          prop: "telemetryNodes",
          type: "TelemetryNodeItem[]",
          default: "DEFAULT_TELEMETRY_NODES",
          description: "Array node telemetri data untuk varian glowing particle.",
        },
        {
          prop: "stepWorkflow",
          type: "ExpandableStepItem[]",
          default: "DEFAULT_STEP_WORKFLOW",
          description: "Array langkah alur kerja dengan checklist untuk varian akordeon.",
        },
        {
          prop: "horizontalPhases",
          type: "HorizontalPhaseItem[]",
          default: "DEFAULT_HORIZONTAL_PHASES",
          description: "Array fase deliverable untuk varian stepper horizontal.",
        },
        {
          prop: "scrollEvents",
          type: "AlternateScrollItem[]",
          default: "DEFAULT_ZIGZAG_EVENTS",
          description: "Array riwayat kronologis untuk varian zigzag kiri-kanan.",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Class utility tambahan Tailwind CSS untuk elemen kontainer root.",
        },
      ],
    },
  },
};

export function AnimatedTimelineDemo() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("id") ? "id" : "en") as
    | "en"
    | "id";
  const t = TIMELINE_DICT[currentLang] || TIMELINE_DICT.en;

  const [unifiedVariant, setUnifiedVariant] = useState<
    "svg-draw" | "glowing-particle" | "accordion" | "stepper" | "alternating"
  >("svg-draw");

  const timelineCards = [
    {
      id: "svg-draw",
      title: t.variants.svgDraw.title,
      badge: t.variants.svgDraw.badge,
      desc: t.variants.svgDraw.description,
      snippet: t.variants.svgDraw.snippet,
      component: <SVGDrawTimeline />,
    },
    {
      id: "glowing-particle",
      title: t.variants.glowingParticle.title,
      badge: t.variants.glowingParticle.badge,
      desc: t.variants.glowingParticle.description,
      snippet: t.variants.glowingParticle.snippet,
      component: <GlowingParticleTimeline />,
    },
    {
      id: "expandable-step",
      title: t.variants.expandableStep.title,
      badge: t.variants.expandableStep.badge,
      desc: t.variants.expandableStep.description,
      snippet: t.variants.expandableStep.snippet,
      component: <ExpandableStepTimeline />,
    },
    {
      id: "horizontal-elastic",
      title: t.variants.horizontalElastic.title,
      badge: t.variants.horizontalElastic.badge,
      desc: t.variants.horizontalElastic.description,
      snippet: t.variants.horizontalElastic.snippet,
      component: <HorizontalElasticTimeline />,
    },
    {
      id: "alternate-scroll",
      title: t.variants.alternateScroll.title,
      badge: t.variants.alternateScroll.badge,
      desc: t.variants.alternateScroll.description,
      snippet: t.variants.alternateScroll.snippet,
      component: <AlternateScrollTimeline />,
    },
    {
      id: "unified-timeline",
      title: t.variants.unified.title,
      badge: t.variants.unified.badge,
      desc: t.variants.unified.description,
      snippet: t.variants.unified.snippet,
      component: (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            {(
              [
                "svg-draw",
                "glowing-particle",
                "accordion",
                "stepper",
                "alternating",
              ] as const
            ).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setUnifiedVariant(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  unifiedVariant === v
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <AnimatedTimeline variant={unifiedVariant} size="md" />
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
        {timelineCards.map((card) => (
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

            <CodeSnippet code={card.snippet} title="Usage Snippet" />
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
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                    {row.prop}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    {row.type}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs">
                    {row.default}
                  </td>
                  <td className="px-4 py-2.5">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnimatedTimelineDemo;
