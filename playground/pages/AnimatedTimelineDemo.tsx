import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  CheckIcon,
  CheckCircleIcon,
  ZapIcon,
  LayersIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ActivityIcon,
  ShieldIcon,
  SparklesIcon,
  TerminalIcon,
  CpuIcon,
  ServerIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

/* =========================================================================
 * I18N DICTIONARY FOR ANIMATED TIMELINES (BILINGUAL EN & ID - 5 VARIANTS)
 * ========================================================================= */
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
        snippet: `import { motion } from "framer-motion";
import { CheckIcon, SparklesIcon } from "@bgsaryzzz/ui/icons";

const MILESTONES = [
  { id: 1, phase: "Phase 01", title: "Architecture & Foundation", date: "Q1 2025" },
  { id: 2, phase: "Phase 02", title: "Fluid Interaction Engine", date: "Q2 2025" },
  { id: 3, phase: "Phase 03", title: "Autonomous AI Orchestration", date: "Q3 2025" },
];

export function SVGDrawTimeline() {
  return (
    <div className="relative pl-8 max-w-lg">
      <svg className="absolute left-[13px] top-4 bottom-4 w-[2px] h-[calc(100%-32px)] overflow-visible">
        <line x1="0" y1="0" x2="0" y2="100%" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="2" strokeDasharray="4 4" />
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          stroke="currentColor"
          className="text-indigo-600 dark:text-indigo-400"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
      {MILESTONES.map((item) => (
        <div key={item.id} className="relative mb-8 last:mb-0">
          <div className="absolute -left-[27px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-indigo-600" />
          </div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
          <span className="text-xs text-zinc-500">{item.date}</span>
        </div>
      ))}
    </div>
  );
}`,
      },
      glowingParticle: {
        title: "2. Glowing Particle Timeline (Moving Light Node)",
        badge: "Data Stream Photon Pulse",
        description:
          "High-tech telemetry timeline featuring an ambient glowing light particle that travels down a dimmed fiber-optic track. Emulates continuous distributed data flow with interactive velocity controls.",
        snippet: `import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: "01", name: "Edge Ingestion", metric: "0.8ms Latency" },
  { id: "02", name: "Stream Partitioning", metric: "3.2 GB/s" },
  { id: "03", name: "Zero-Knowledge Encryption", metric: "AES-256" },
  { id: "04", name: "Global Consensus", metric: "99.999% SLA" },
];

export function GlowingParticleTimeline() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pl-8 max-w-lg">
      <div className="absolute left-[13px] top-3 bottom-3 w-[2px] bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          style={{ top: \`\${progress}%\` }}
          className="absolute -left-[5px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_14px_4px_rgba(34,211,238,0.8)] -translate-y-1/2"
        />
      </div>
      {NODES.map((node, i) => (
        <div key={node.id} className="relative mb-7 last:mb-0">
          <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{node.id}</div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{node.name}</h4>
          <p className="text-xs text-zinc-500 font-mono">{node.metric}</p>
        </div>
      ))}
    </div>
  );
}`,
      },
      expandableStep: {
        title: "3. Expandable Step Timeline (Accordion Milestone)",
        badge: "Dynamic Layout Expansion",
        description:
          "Step-by-step workflow timeline where selecting any milestone fluidly expands its accompanying specification card via spring layout physics, while inactive nodes collapse to compact headers.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 1, title: "Identity Verification", desc: "Automated biometric and KYC authentication." },
  { id: 2, title: "Security Perimeter", desc: "Hardware security key pairing and enclave encryption." },
  { id: 3, title: "Production Deployment", desc: "Zero-downtime blue-green DNS traffic cutover." },
];

export function ExpandableStepTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="relative pl-8 max-w-lg">
      <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-zinc-200 dark:bg-zinc-800" />
      {STEPS.map((step) => {
        const isActive = step.id === activeStep;
        return (
          <div key={step.id} className="relative mb-5 last:mb-0">
            <button
              onClick={() => setActiveStep(step.id)}
              className="flex items-center gap-3 text-left w-full"
            >
              <motion.div
                animate={{ scale: isActive ? 1.25 : 1 }}
                className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold \${
                  isActive ? "border-indigo-600 bg-indigo-600 text-white" : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                }\`}
              >
                {step.id}
              </motion.div>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{step.title}</span>
            </button>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden pl-9 pt-2 text-xs text-zinc-500"
                >
                  {step.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}`,
      },
      horizontalElastic: {
        title: "4. Horizontal Elastic Timeline (Progress Stepper)",
        badge: "Spring Baseline Interpolation",
        description:
          "Horizontal sequential stepper where advancing between phases propels an elastic gradient fill across the connecting track, triggering bounce and pulse feedback on the target milestone.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

const PHASES = ["Concept", "Prototype", "Security Audit", "Production"];

export function HorizontalElasticTimeline() {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            animate={{ width: \`\${(active / (PHASES.length - 1)) * 100}%\` }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
        </div>
        {PHASES.map((phase, idx) => (
          <button
            key={phase}
            onClick={() => setActive(idx)}
            className="relative z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-600 text-xs font-bold flex items-center justify-center"
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}`,
      },
      alternateScroll: {
        title: "5. Alternate Scroll Timeline (Staggered Zig-Zag)",
        badge: "Bidirectional Viewport Reveal",
        description:
          "Balanced bidirectional timeline with a central baseline axis. Content cards glide in alternately from left and right upon scroll detection, adapting automatically to single-column on mobile viewports.",
        snippet: `import { motion } from "framer-motion";

const EVENTS = [
  { year: "2023", title: "Genesis & Seed Protocol", side: "left" },
  { year: "2024", title: "Developer Preview & CLI", side: "right" },
  { year: "2025", title: "Enterprise Sovereign Cloud", side: "left" },
  { year: "2026", title: "Autonomous Edge Swarms", side: "right" },
];

export function AlternateScrollTimeline() {
  return (
    <div className="relative max-w-2xl mx-auto py-6">
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />
      {EVENTS.map((event, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className={\`relative mb-8 flex \${isLeft ? "sm:justify-start" : "sm:justify-end"} pl-10 sm:pl-0\`}
          >
            <div className="w-full sm:w-[45%] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <span className="text-xs font-mono font-bold text-indigo-600">{event.year}</span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{event.title}</h4>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Fisika Framer Motion",
    pillTag2: "5 Varian Timeline Siap Produksi",
    pageTitle: "Animated Timeline",
    pageDescription:
      "Koleksi 5 antarmuka linier dan traceline modern yang dibangun dengan Framer Motion dan Tailwind CSS. Didasarkan pada filosofi 'Simple but Creative', menghadirkan penarikan garis vektor SVG dinamis, partikel cahaya aliran data, accordion langkah interaktif, stepper elastis horizontal, dan animasi zig-zag saat scroll.",
    variants: {
      svgDraw: {
        title: "1. SVG Draw Timeline (Animated Line Drawing)",
        badge: "Vector PathLength Interpolation",
        description:
          "Roadmap vertikal di mana garis penghubungnya menggunakan elemen SVG yang digambar otomatis mengikuti scroll viewport dengan animasi pathLength. Dilengkapi node milestone berpendar dan status pelaksanaan.",
        snippet: `// Timeline vertikal dengan garis SVG yang digambar dinamis menggunakan pathLength`,
      },
      glowingParticle: {
        title: "2. Glowing Particle Timeline (Moving Light Node)",
        badge: "Data Stream Photon Pulse",
        description:
          "Timeline telemetri canggih dengan titik partikel cahaya yang meluncur menelusuri lintasan serat optik redup. Meniru aliran paket data real-time dengan kendali kecepatan interaktif.",
        snippet: `// Timeline aliran data dengan partikel cahaya glowing yang meluncur terus-menerus`,
      },
      expandableStep: {
        title: "3. Expandable Step Timeline (Accordion Milestone)",
        badge: "Dynamic Layout Expansion",
        description:
          "Timeline bertahap langkah demi langkah di mana kartu deskripsi hanya terbuka pada langkah yang aktif. Node aktif membesar secara organik dengan pantulan pegas (spring bounce).",
        snippet: `// Stepper vertikal interaktif dengan ekspansi accordion halus dan spring physics`,
      },
      horizontalElastic: {
        title: "4. Horizontal Elastic Timeline (Progress Stepper)",
        badge: "Spring Baseline Interpolation",
        description:
          "Stepper linier horizontal dari kiri ke kanan. Garis progres terisi secara elastis mengikuti perpindahan fase, memicu animasi pantulan dan denyut saat menyentuh titik milestone.",
        snippet: `// Stepper horizontal dengan pengisian garis progres elastis dan animasi pulse`,
      },
      alternateScroll: {
        title: "5. Alternate Scroll Timeline (Staggered Zig-Zag)",
        badge: "Bidirectional Viewport Reveal",
        description:
          "Tata letak timeline klasik dengan poros di tengah dan kartu berselang-seling dari kiri dan kanan. Menggunakan animasi scroll reveal dan otomatis beradaptasi menjadi 1 kolom di layar ponsel.",
        snippet: `// Timeline zig-zag bergantian kiri-kanan dengan animasi slide in saat di-scroll`,
      },
    },
  },
};

/* =========================================================================
 * 1. SVG DRAW TIMELINE
 * ========================================================================= */
interface SVGMilestoneItem {
  id: number;
  phase: string;
  quarter: string;
  title: string;
  subtitle: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  badge: string;
  tags: string[];
}

const SVG_MILESTONES: SVGMilestoneItem[] = [
  {
    id: 1,
    phase: "Phase 01",
    quarter: "Q1 2025",
    title: "System Architecture & Foundation",
    subtitle: "Atomic Tokens & Layout Engines",
    description:
      "Drafted comprehensive design token specifications, semantic color mapping, and headless accessible primitives compliant with WCAG 2.2 AA standards.",
    status: "completed",
    badge: "Foundation Ready",
    tags: ["Design Tokens", "Accessibility", "TypeScript"],
  },
  {
    id: 2,
    phase: "Phase 02",
    quarter: "Q2 2025",
    title: "Fluid Micro-Interactions Engine",
    subtitle: "Framer Motion Shared Layouts",
    description:
      "Engineered layoutId dynamics, responsive spring calibrations, and zero-jank GPU composite animations across modal, dropdown, and tab components.",
    status: "completed",
    badge: "Physics Shipped",
    tags: ["Framer Motion", "Spring Physics", "Micro-Interactions"],
  },
  {
    id: 3,
    phase: "Phase 03",
    quarter: "Q3 2025",
    title: "Multi-Platform Synthesis",
    subtitle: "React 19 & Next.js App Router",
    description:
      "Unified design system distribution across React 19 server components, Next.js hydration boundaries, and framework-agnostic headless wrappers.",
    status: "in-progress",
    badge: "In Active Beta",
    tags: ["React 19", "Server Components", "Tailwind 4"],
  },
  {
    id: 4,
    phase: "Phase 04",
    quarter: "Q4 2025",
    title: "Autonomous AI Orchestration",
    subtitle: "Context-Aware Agentic UI",
    description:
      "Deploying generative micro-frontend layouts, predictive pre-fetching pipelines, and dynamic high-contrast accessibility auto-remediation.",
    status: "upcoming",
    badge: "Next Horizon",
    tags: ["Agentic AI", "Adaptive Theming", "Edge Compute"],
  },
];

export function SVGDrawTimeline() {
  const [redrawKey, setRedrawKey] = useState(0);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Interactive Controls Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
            Path Drawing Engine
          </span>
        </div>
        <button
          onClick={() => setRedrawKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
        >
          <RefreshCwIcon size={12} />
          <span>Redraw Vector</span>
        </button>
      </div>

      {/* Timeline Track with Animated SVG Path */}
      <div key={redrawKey} className="relative pl-7 sm:pl-9 py-2">
        {/* SVG Drawing Connecting Line */}
        <svg className="absolute left-[13px] sm:left-[17px] top-6 bottom-6 w-[3px] h-[calc(100%-48px)] overflow-visible">
          {/* Faint Background Track Line */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            className="text-zinc-200 dark:text-zinc-800"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated SVG Path with pathLength */}
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            className="text-indigo-600 dark:text-indigo-400"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Milestone Cards List */}
        <div className="space-y-6 sm:space-y-8">
          {SVG_MILESTONES.map((item, index) => {
            const isCompleted = item.status === "completed";
            const isInProgress = item.status === "in-progress";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.25 + 0.1 }}
                className="relative group"
              >
                {/* Node Milestone Circle */}
                <div
                  className={cn(
                    "absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white dark:bg-zinc-950",
                    isCompleted
                      ? "border-emerald-500 text-emerald-500 shadow-sm shadow-emerald-500/20"
                      : isInProgress
                      ? "border-indigo-600 text-indigo-600 shadow-md shadow-indigo-600/30 ring-4 ring-indigo-500/10"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon size={12} strokeWidth={3} />
                  ) : isInProgress ? (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  )}
                </div>

                {/* Milestone Detail Card */}
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                        {item.phase}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {item.quarter}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border",
                        isCompleted
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-300"
                          : isInProgress
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-900 dark:text-indigo-300 animate-pulse"
                          : "bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 2. GLOWING PARTICLE TIMELINE
 * ========================================================================= */
interface TelemetryNode {
  id: string;
  code: string;
  name: string;
  role: string;
  latency: string;
  bandwidth: string;
  encryption: string;
  status: string;
}

const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: "node-01",
    code: "EDGE_INGEST_01",
    name: "Telemetry Edge Ingestion",
    role: "Sub-millisecond event streaming gateway across 28 global edge regions.",
    latency: "0.8 ms",
    bandwidth: "85k req/s",
    encryption: "TLS 1.3 mTLS",
    status: "Healthy",
  },
  {
    id: "node-02",
    code: "STREAM_PARTITION_02",
    name: "Distributed Stream Processing",
    role: "Partitioned Kafka event router with zero-serialization backpressure tuning.",
    latency: "2.1 ms",
    bandwidth: "3.2 GB/s",
    encryption: "Zero-Knowledge",
    status: "Processing",
  },
  {
    id: "node-03",
    code: "ENVELOPE_ENCRYPT_03",
    name: "Hardware Security Enclave",
    role: "Field-level cryptographic masking powered by hardware HSM AES-256 keys.",
    latency: "1.4 ms",
    bandwidth: "100% Tokenized",
    encryption: "FIPS 140-3",
    status: "Secured",
  },
  {
    id: "node-04",
    code: "CONSENSUS_SYNC_04",
    name: "Multi-Cloud Raft Consensus",
    role: "Active-active multi-region database state replication with automated quarantine.",
    latency: "5.4 ms",
    bandwidth: "99.999% SLA",
    encryption: "Immutable Log",
    status: "Synchronized",
  },
];

export function GlowingParticleTimeline() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [progressY, setProgressY] = useState(0);

  // Animate the light particle continuously down the track
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 20;
    const step = 0.4 * speed;

    const interval = setInterval(() => {
      setProgressY((prev) => {
        const next = prev + step;
        if (next >= 100) {
          return 0;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Sync active node highlight based on particle coordinate percentage
  useEffect(() => {
    const nodeIndex = Math.min(
      Math.floor((progressY / 100) * TELEMETRY_NODES.length),
      TELEMETRY_NODES.length - 1
    );
    setActiveNodeIndex(nodeIndex);
  }, [progressY]);

  const jumpToNode = (index: number) => {
    setActiveNodeIndex(index);
    setProgressY((index / (TELEMETRY_NODES.length - 1)) * 95);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Control Console */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200"
          >
            {isPlaying ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
            <span>{isPlaying ? "Pause Stream" : "Resume Stream"}</span>
          </button>
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            Pos: {Math.round(progressY)}%
          </span>
        </div>

        {/* Speed Multiplier Pills */}
        <div className="flex items-center gap-1 bg-zinc-800/80 p-0.5 rounded-lg text-xs font-mono">
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={cn(
                "px-2 py-0.5 rounded-md transition-all font-semibold",
                speed === s
                  ? "bg-cyan-500 text-zinc-950 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Track with Luminous Flow */}
      <div className="relative pl-7 sm:pl-9 py-2">
        {/* Dimmed Background Fiber Line */}
        <div className="absolute left-[13px] sm:left-[17px] top-5 bottom-5 w-[2px] bg-zinc-200 dark:bg-zinc-800">
          {/* Glowing Photon Particle */}
          <motion.div
            style={{ top: `${progressY}%` }}
            className="absolute -left-[5px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_5px_rgba(34,211,238,0.9)] -translate-y-1/2 z-20 pointer-events-none"
          >
            {/* Trailing Tail Glow */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-t from-cyan-400 to-transparent opacity-80" />
          </motion.div>
        </div>

        {/* Pipeline Telemetry Nodes */}
        <div className="space-y-5 sm:space-y-6">
          {TELEMETRY_NODES.map((node, index) => {
            const isCurrentlyActive = activeNodeIndex === index;

            return (
              <div
                key={node.id}
                onClick={() => jumpToNode(index)}
                className="relative cursor-pointer group"
              >
                {/* Milestone Node Ring */}
                <div
                  className={cn(
                    "absolute -left-[27px] sm:-left-[35px] top-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white dark:bg-zinc-950 z-10",
                    isCurrentlyActive
                      ? "border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] scale-110"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-400"
                  )}
                >
                  <span className="text-[10px] font-mono font-bold">
                    0{index + 1}
                  </span>
                </div>

                {/* Node Card */}
                <div
                  className={cn(
                    "rounded-2xl border p-4 sm:p-5 transition-all duration-300 space-y-2",
                    isCurrentlyActive
                      ? "border-cyan-500/60 bg-cyan-950/10 dark:bg-cyan-950/20 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/20"
                      : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {node.code}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full",
                        isCurrentlyActive
                          ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                          : "text-zinc-400"
                      )}
                    >
                      {node.status}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {node.name}
                  </h4>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {node.role}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div>
                      <span className="text-[9px] text-zinc-400 font-mono block">Latency</span>
                      <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {node.latency}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-400 font-mono block">Bandwidth</span>
                      <p className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {node.bandwidth}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-400 font-mono block">Crypto</span>
                      <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">
                        {node.encryption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 3. EXPANDABLE STEP TIMELINE (ACCORDION MILESTONE)
 * ========================================================================= */
interface StepItemData {
  id: number;
  title: string;
  subtitle: string;
  status: "completed" | "active" | "pending";
  description: string;
  checklist: string[];
}

const STEP_WORKFLOW: StepItemData[] = [
  {
    id: 1,
    title: "Identity Verification & Enclave",
    subtitle: "Biometric & KYC Authentication",
    status: "completed",
    description:
      "Submit government credential tokens and facial liveness verification. Real-time neural matching completed in 320ms.",
    checklist: [
      "Passport cryptographic checksum verified",
      "3D depth facial mesh matched",
      "Zero-knowledge identity token generated",
    ],
  },
  {
    id: 2,
    title: "Hardware Security Key Pairing",
    subtitle: "FIDO2 / WebAuthn Physical Vault",
    status: "active",
    description:
      "Touch your physical security key (YubiKey or Titan) to bind hardware challenge signatures to your cryptographic profile.",
    checklist: [
      "Hardware enclave challenge broadcasted",
      "Biometric PIN validated on hardware token",
      "Backup recovery seed phrase minted to vault",
    ],
  },
  {
    id: 3,
    title: "Cluster Provisioning & Mesh",
    subtitle: "Kubernetes 1.30 & Cilium eBPF",
    status: "pending",
    description:
      "Spinning up worker node pools with autoscaling, mutual TLS mesh proxying, and automated TLS certificate rotations.",
    checklist: [
      "Cilium eBPF network policies enforced",
      "Ingress controllers bound to static IPs",
      "Prometheus & Grafana monitors subscribed",
    ],
  },
  {
    id: 4,
    title: "Production Traffic Cutover",
    subtitle: "Blue-Green Canary Routing",
    status: "pending",
    description:
      "Gradual weighted DNS traffic shifting from 5% canary testing to 100% stable global routing with real-time error budget tracking.",
    checklist: [
      "Health probes verified across 14 edge regions",
      "Error budget rate monitored at < 0.001%",
      "Legacy cluster drained and decommissioned",
    ],
  },
];

export function ExpandableStepTimeline() {
  const [activeStepId, setActiveStepId] = useState<number>(2);

  const handleNext = () => {
    setActiveStepId((prev) => Math.min(prev + 1, STEP_WORKFLOW.length));
  };

  const handlePrev = () => {
    setActiveStepId((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Workflow Navigation Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
          Step {activeStepId} of {STEP_WORKFLOW.length} Active
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={activeStepId === 1}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 transition"
          >
            <ChevronLeftIcon size={14} />
          </button>
          <button
            onClick={handleNext}
            disabled={activeStepId === STEP_WORKFLOW.length}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 transition"
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </div>

      {/* Stepper Vertical Axis */}
      <div className="relative pl-7 sm:pl-9 py-2">
        <div className="absolute left-[13px] sm:left-[17px] top-5 bottom-5 w-[2px] bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-4">
          {STEP_WORKFLOW.map((step) => {
            const isActive = step.id === activeStepId;
            const isCompleted = step.id < activeStepId;

            return (
              <div key={step.id} className="relative group">
                {/* Spring Bouncing Node Circle */}
                <motion.button
                  layout
                  onClick={() => setActiveStepId(step.id)}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 26 }}
                  className={cn(
                    "absolute -left-[27px] sm:-left-[35px] top-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-colors z-10 bg-white dark:bg-zinc-950",
                    isActive
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : isCompleted
                      ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                  )}
                >
                  {isCompleted ? <CheckIcon size={12} strokeWidth={3} /> : step.id}
                </motion.button>

                {/* Card Container with Expandable Accordion Animation */}
                <div
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden",
                    isActive
                      ? "border-indigo-500/60 bg-white dark:bg-zinc-900 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20"
                      : "border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-zinc-300"
                  )}
                >
                  {/* Clickable Step Header */}
                  <button
                    onClick={() => setActiveStepId(step.id)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left select-none"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-400">
                          0{step.id}
                        </span>
                        <h4
                          className={cn(
                            "text-sm sm:text-base font-bold transition-colors",
                            isActive
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-zinc-900 dark:text-zinc-100"
                          )}
                        >
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {step.subtitle}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0",
                        isActive
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "text-zinc-400"
                      )}
                    >
                      {isActive ? "In Progress" : isCompleted ? "Completed" : "Pending"}
                    </span>
                  </button>

                  {/* Expandable Body Panel with Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-3.5 sm:p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {step.description}
                          </p>

                          <div className="space-y-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80">
                            <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block mb-1">
                              Verification Checklist
                            </span>
                            {step.checklist.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                              >
                                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                  <CheckIcon size={10} strokeWidth={3} />
                                </span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 4. HORIZONTAL ELASTIC TIMELINE (PROGRESS STEPPER)
 * ========================================================================= */
interface HorizontalPhase {
  id: number;
  label: string;
  tagline: string;
  details: string;
  deliverables: string[];
}

const HORIZONTAL_PHASES: HorizontalPhase[] = [
  {
    id: 1,
    label: "Ideation",
    tagline: "Product Discovery",
    details: "Market validation, user persona interviews, and technical architecture feasibility study.",
    deliverables: ["Product Specs", "Competitive Matrix", "User Stories"],
  },
  {
    id: 2,
    label: "Prototypes",
    tagline: "Figma & Framer",
    details: "Interactive design systems, responsive layout guidelines, and WCAG accessibility audit.",
    deliverables: ["UI Token Kit", "Clickable Prototypes", "Design Handoff"],
  },
  {
    id: 3,
    label: "Core Audit",
    tagline: "Security & Fuzzing",
    details: "Static code analysis, penetration vulnerability tests, and SOC2 compliance validation.",
    deliverables: ["CVE Scan Clean", "Pen-Test Signoff", "GDPR Verification"],
  },
  {
    id: 4,
    label: "Deploy",
    tagline: "Canary Rollout",
    details: "Zero-downtime blue-green DNS cutovers across 18 multi-cloud distributed edge clusters.",
    deliverables: ["DNS Traffic Swapped", "Edge Caches Primed", "Latency < 12ms"],
  },
  {
    id: 5,
    label: "Scale",
    tagline: "Autonomous Grid",
    details: "Self-healing Kubernetes worker pods with AI-driven dynamic cache warming and anomaly alerts.",
    deliverables: ["Auto-Scaling Online", "Global CDN Synced", "SLO: 99.999%"],
  },
];

export function HorizontalElasticTimeline() {
  const [activeStep, setActiveStep] = useState<number>(2); // 0-indexed (0 to 4)

  const currentPhase = HORIZONTAL_PHASES[activeStep];
  const progressPercent = (activeStep / (HORIZONTAL_PHASES.length - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Horizontal Stepper Track */}
      <div className="w-full overflow-x-auto no-scrollbar py-3">
        <div className="relative min-w-[340px] px-4 sm:px-6">
          {/* Background Track Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

          {/* Elastic Active Gradient Fill Bar */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 overflow-hidden pointer-events-none">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>

          {/* Step Nodes */}
          <div className="relative flex items-center justify-between">
            {HORIZONTAL_PHASES.map((phase, index) => {
              const isPassed = index < activeStep;
              const isCurrent = index === activeStep;

              return (
                <div key={phase.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className="relative z-10 focus:outline-hidden group"
                  >
                    {/* Pulsing Aura for Active Node */}
                    {isCurrent && (
                      <motion.div
                        animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-indigo-500/30 -z-10"
                      />
                    )}

                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.15 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors bg-white dark:bg-zinc-950",
                        isPassed
                          ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                          : isCurrent
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "border-zinc-300 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-400"
                      )}
                    >
                      {isPassed ? (
                        <CheckIcon size={14} strokeWidth={3} />
                      ) : (
                        <span>0{phase.id}</span>
                      )}
                    </motion.div>
                  </button>

                  <span
                    className={cn(
                      "mt-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors",
                      isCurrent
                        ? "text-indigo-600 dark:text-indigo-400 font-bold"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {phase.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Phase Card with Spring Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-6 shadow-sm space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                Milestone 0{currentPhase.id} of 0{HORIZONTAL_PHASES.length}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {currentPhase.label} • {currentPhase.tagline}
              </h4>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
              Progress: {Math.round(progressPercent)}%
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {currentPhase.details}
          </p>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">
              Core Deliverables
            </span>
            <div className="flex flex-wrap gap-2">
              {currentPhase.deliverables.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition"
            >
              Previous Phase
            </button>
            <button
              onClick={() =>
                setActiveStep((prev) => Math.min(prev + 1, HORIZONTAL_PHASES.length - 1))
              }
              disabled={activeStep === HORIZONTAL_PHASES.length - 1}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
            >
              <span>Advance Phase</span>
              <ArrowRightIcon size={12} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
 * 5. ALTERNATE SCROLL TIMELINE (STAGGERED ZIG-ZAG)
 * ========================================================================= */
interface ZigZagEvent {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
}

const ZIGZAG_EVENTS: ZigZagEvent[] = [
  {
    year: "2023",
    badge: "Genesis Protocol",
    title: "Decentralized State Machine",
    subtitle: "Consensus Architecture",
    description:
      "Formulated peer-to-peer cryptographic state synchronization with zero-knowledge proof verification and sub-second block finality.",
    metrics: "12,000 TPS Benchmark",
  },
  {
    year: "2024",
    badge: "Open Source Launch",
    title: "Developer Preview & CLI",
    subtitle: "Public Beta Release",
    description:
      "Published open developer kits across 6 languages, command-line interface tools, and our accessible UI component repository.",
    metrics: "45k GitHub Stars",
  },
  {
    year: "2025",
    badge: "Enterprise Sovereign Cloud",
    title: "Global Compliance & Enclaves",
    subtitle: "SOC2 Type II & HIPAA",
    description:
      "Achieved zero-trust multi-cloud compliance with isolated tenant enclaves across 18 regional availability zones.",
    metrics: "18 Cloud Regions",
  },
  {
    year: "2026",
    badge: "Autonomous Edge Swarms",
    title: "Agentic AI Micro-Frontends",
    subtitle: "Autonomous Self-Healing",
    description:
      "Integrated autonomous AI agent swarms capable of continuous performance self-healing, automated layout restructuring, and dynamic cache warming.",
    metrics: "Sub-5ms Global P99",
  },
];

export function AlternateScrollTimeline() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Timeline Wrapper */}
      <div className="relative py-4">
        {/* Central Vertical Axis Line (Shifted to left on mobile, centered on sm:) */}
        <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[2px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

        <div className="space-y-8 sm:space-y-12">
          {ZIGZAG_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.year}
                className={cn(
                  "relative flex flex-col sm:flex-row items-start",
                  isLeft ? "sm:flex-row-reverse" : "sm:flex-row"
                )}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-600 flex items-center justify-center z-10 shadow-md shadow-indigo-600/20">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>

                {/* Content Card with Scroll Stagger Reveal */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -35 : 35, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0",
                    isLeft ? "sm:pr-0" : "sm:pl-0"
                  )}
                >
                  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base sm:text-lg font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                        {event.year}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60">
                        {event.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {event.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium">
                        {event.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span>Telemetry Benchmark:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {event.metrics}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN PAGE COMPONENT: ANIMATED TIMELINE DEMO (5 VARIANTS)
 * ========================================================================= */
export function AnimatedTimelineDemo() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("id") ? "id" : "en") as
    | "en"
    | "id";
  const t = TIMELINE_DICT[currentLang] || TIMELINE_DICT.en;

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
  ];

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* Page Header */}
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

      {/* Single Column Stack of All 5 Timeline Architectures */}
      <div className="grid grid-cols-1 gap-8 sm:gap-14">
        {timelineCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-6 md:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            {/* Header Info */}
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

            {/* Interactive Preview Canvas */}
            <div className="flex items-center justify-center p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-5 sm:mb-6 overflow-hidden">
              {card.component}
            </div>

            {/* Standardized Usage Snippet (No Framework Tabs) */}
            <CodeSnippet code={card.snippet} title="Usage Snippet" />
          </section>
        ))}
      </div>
    </div>
  );
}

export default AnimatedTimelineDemo;

