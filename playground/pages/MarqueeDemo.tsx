import React, { useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue } from "framer-motion";
import { Marquee } from "../../src/components/Marquee";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  SearchIcon,
  CheckCircleIcon,
  ZapIcon,
  GlobeIcon,
  LayersIcon,
  ShieldIcon,
  TerminalIcon,
  DatabaseIcon,
  CreditCardIcon,
  HardDriveIcon,
  CloudIcon,
  StarIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

interface TechPill {
  id: string;
  name: string;
  category: string;
  accentCircle: string;
  icon: (className?: string) => React.ReactNode;
}

const techPillsRow1: TechPill[] = [
  {
    id: "react",
    name: "React 19",
    category: "UI Library",
    accentCircle: "bg-cyan-500/10 text-cyan-600 border-cyan-500/25 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling",
    accentCircle: "bg-sky-500/10 text-sky-600 border-sky-500/25 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.287 1.624 1.177 1.194 2.538 2.576 5.513 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.974 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "Animation",
    accentCircle: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/25 dark:bg-fuchsia-500/20 dark:text-fuchsia-400 dark:border-fuchsia-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type-Safe",
    accentCircle: "bg-blue-500/10 text-blue-600 border-blue-500/25 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.7 13.6c.7.4 1.5.6 2.4.6 1.4 0 2.2-.6 2.2-1.6 0-.8-.5-1.3-1.8-1.8l-.8-.3c-1.9-.7-2.9-1.7-2.9-3.2 0-2 1.6-3.4 4.1-3.4 1.1 0 2 .2 2.8.6l-.6 1.7c-.6-.3-1.4-.5-2.2-.5-1.3 0-2.1.6-2.1 1.5 0 .8.5 1.2 1.8 1.7l.8.3c2.1.8 3 1.8 3 3.3 0 2.2-1.7 3.5-4.4 3.5-1.3 0-2.5-.3-3.3-.8l.6-1.7zm-6-6.8H10v8.6H8.2V9.8H6.1V8.2h5.7v1.6H9.7v8.6z" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Framework",
    accentCircle: "bg-zinc-500/10 text-zinc-900 border-zinc-400/30 dark:bg-zinc-700/30 dark:text-zinc-100 dark:border-zinc-600/40",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 14.5-4.9-6.9v6.9H9.4V7.5h1.7l4.8 6.8V7.5h1.5v9h-1.6z" />
      </svg>
    ),
  },
];

const techPillsRow2: TechPill[] = [
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend",
    accentCircle: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.36 15.42a1.7 1.7 0 0 1-1.38.72h-7.6l7.84-9.35a1.7 1.7 0 0 1 2.21 2.45l-1.07 6.18zM2.64 8.58a1.7 1.7 0 0 1 1.38-.72h7.6L3.78 17.21a1.7 1.7 0 0 1-2.21-2.45l1.07-6.18z" />
      </svg>
    ),
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Database",
    accentCircle: "bg-teal-500/10 text-teal-600 border-teal-500/25 dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 2 22 22 22" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    accentCircle: "bg-indigo-500/10 text-indigo-600 border-indigo-500/25 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.977 15.613.48 12.776.48c-6.176 0-10.22 3.197-10.22 8.542 0 6.643 9.155 5.549 9.155 9.068 0 .984-.82 1.488-2.27 1.488-2.644 0-5.694-1.282-7.51-2.348l-.946 5.584c2.25 1.07 5.48 1.696 8.784 1.696 6.398 0 10.596-2.923 10.596-8.528 0-7.234-9.356-5.834-9.356-9.15z" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    accentCircle: "bg-blue-500/10 text-blue-500 border-blue-500/25 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm6 6h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zM22 12c-.2-1.3-1.2-2.1-2.4-2.1-.4 0-.8.1-1.2.3-.6-.8-1.5-1.2-2.4-1.2h-.5c-.3-1.4-1.5-2.5-3-2.5h-1c-.3 0-.5.2-.5.5v7.5H2c-.6 0-1 .4-1 1 0 4.4 3.6 8 8 8 6.4 0 11.6-4.5 12.8-10.7.2-.2.2-.5.2-.8z" />
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory",
    accentCircle: "bg-rose-500/10 text-rose-600 border-rose-500/25 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

interface ReviewItem {
  id: string;
  name: string;
  username: string;
  role: string;
  avatarGrad: string;
  stars: number;
  content: string;
}

const userReviews: ReviewItem[] = [
  {
    id: "r1",
    name: "Sarah Jenkins",
    username: "@sarah_dev",
    role: "Senior Frontend Lead",
    avatarGrad: "from-blue-500 to-cyan-500",
    stars: 5,
    content: "The hardware-accelerated animations in needui are butter smooth. Replaced three disparate packages with zero layout shift.",
  },
  {
    id: "r2",
    name: "Alex Rivera",
    username: "@alex_architect",
    role: "Staff Engineer",
    avatarGrad: "from-purple-500 to-pink-500",
    stars: 5,
    content: "The accessible keyboard navigation and dual-theme tokens reduced our product launch cycle by over three full sprints.",
  },
  {
    id: "r3",
    name: "David Chen",
    username: "@david_stack",
    role: "CTO @ CloudSync",
    avatarGrad: "from-amber-500 to-emerald-500",
    stars: 5,
    content: "True 60 FPS across both low-end mobile devices and high-refresh desktop monitors. Absolutely enterprise-grade UI design.",
  },
  {
    id: "r4",
    name: "Clara Oswald",
    username: "@clara_code",
    role: "Design Technologist",
    avatarGrad: "from-rose-500 to-orange-500",
    stars: 5,
    content: "The edge fade mask and spring physics make product showcases look like high-budget Apple promotional pages.",
  },
  {
    id: "r5",
    name: "Elena Rostova",
    username: "@elena_ux",
    role: "Head of Product Design",
    avatarGrad: "from-fuchsia-500 to-indigo-500",
    stars: 5,
    content: "Visual consistency from Buttons, Navbars, Tree Menus all the way to Marquees is an absolute delight to build with.",
  },
  {
    id: "r6",
    name: "Kenji Sato",
    username: "@kenji_cloud",
    role: "Infrastructure Architect",
    avatarGrad: "from-emerald-500 to-teal-500",
    stars: 5,
    content: "Complete TypeScript typing, automatic aria-hidden tags, and native i18n support make this our default library.",
  },
];

interface ActivityFeed {
  id: string;
  title: string;
  tag: string;
  badgeBg: string;
  time: string;
  icon: string;
}

const columnFeed1: ActivityFeed[] = [
  { id: "c1-1", title: "Release v2.4.0 Deployed", tag: "Production", badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", time: "2m ago", icon: "🚀" },
  { id: "c1-2", title: "Lighthouse Score: 100/100", tag: "Performance", badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20", time: "8m ago", icon: "⚡" },
  { id: "c1-3", title: "Framer Physics Calibrated", tag: "Animation", badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20", time: "14m ago", icon: "✦" },
  { id: "c1-4", title: "Database Query: 1.2ms", tag: "PostgreSQL", badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", time: "22m ago", icon: "⌗" },
];

const columnFeed2: ActivityFeed[] = [
  { id: "c2-1", title: "New 3D Perspective Preset", tag: "UI Library", badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20", time: "5m ago", icon: "◫" },
  { id: "c2-2", title: "Bundle Size Reduced by 34%", tag: "Rollup / Vite", badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", time: "11m ago", icon: "📦" },
  { id: "c2-3", title: "Dark & Light Token Synced", tag: "Design Token", badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20", time: "19m ago", icon: "◐" },
  { id: "c2-4", title: "Test Suites: 100% Passed", tag: "CI / CD", badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", time: "27m ago", icon: "✓" },
];

interface ProjectCard {
  id: string;
  title: string;
  category: string;
  metric: string;
  accentGradient: string;
}

const projectCards: ProjectCard[] = [
  { id: "p1", title: "Quantum Engine", category: "Physics Simulator", metric: "60 FPS", accentGradient: "from-blue-500/10 via-indigo-500/10 to-cyan-500/10 border-blue-500/20 dark:from-blue-950/60 dark:via-indigo-950/50 dark:to-cyan-950/40 dark:border-blue-500/30" },
  { id: "p2", title: "Neural Matrix", category: "AI Interface", metric: "99.9% Acc", accentGradient: "from-purple-500/10 via-pink-500/10 to-rose-500/10 border-purple-500/20 dark:from-purple-950/60 dark:via-pink-950/50 dark:to-rose-950/40 dark:border-purple-500/30" },
  { id: "p3", title: "Horizon Dashboard", category: "SaaS Analytics", metric: "3.2M Req", accentGradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-emerald-500/20 dark:from-emerald-950/60 dark:via-teal-950/50 dark:to-cyan-950/40 dark:border-emerald-500/30" },
  { id: "p4", title: "Aura Particles", category: "WebGL Shader", metric: "120 FPS", accentGradient: "from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-500/20 dark:from-amber-950/60 dark:via-orange-950/50 dark:to-rose-950/40 dark:border-amber-500/30" },
];

interface DraggableCardItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  color: string;
  stat: string;
}

const draggableItems: DraggableCardItem[] = [
  { id: "d1", title: "Aurora Motion Engine", description: "Ultra-fluid spring physics with automatic inertia calculation.", tag: "Physics", color: "from-indigo-500 to-purple-600", stat: "120Hz" },
  { id: "d2", title: "Hyper-Responsive Grid", description: "Zero layout shift masonry layout designed for modern web apps.", tag: "Layout", color: "from-blue-500 to-cyan-500", stat: "0ms CLS" },
  { id: "d3", title: "Adaptive Color Tokens", description: "Seamless dark and light contrast transitions without page reload.", tag: "Theming", color: "from-emerald-500 to-teal-500", stat: "WCAG AAA" },
  { id: "d4", title: "Touch Gesture Handler", description: "Natural tactile swipe gestures optimized for mobile viewports.", tag: "Gestures", color: "from-rose-500 to-orange-500", stat: "< 2ms" },
  { id: "d5", title: "Accessible Primitives", description: "Compliant WAI-ARIA standards baked directly into DOM elements.", tag: "A11y", color: "from-fuchsia-500 to-indigo-500", stat: "100% Score" },
  { id: "d6", title: "Spatial Layering System", description: "Depth-aware z-index elevation with ambient backdrop filter.", tag: "Elevation", color: "from-amber-500 to-pink-500", stat: "3D Ready" },
];

function DraggableMarqueeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -1100, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={isDragging ? undefined : { x: [0, -700] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          },
        }}
        className="flex gap-4 w-max"
      >
        {[...draggableItems, ...draggableItems].map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-72 shrink-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700 pointer-events-auto"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {item.tag}
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {item.stat}
              </span>
            </div>

            <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${item.color} mb-3`} />

            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* =========================================================================
 * SUB-KOMPONEN KHUSUS: PARALLAX DUAL DIRECTION DENGAN SPEED SHIFT HOVER
 * ========================================================================= */
function ParallaxDualDirection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 py-10 space-y-3 cursor-pointer"
    >
      <Marquee
        direction="left"
        speed={isHovered ? 52 : 24}
        fade
        pauseOnHover={false}
        gap={28}
      >
        <span className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
          PARALLAX VELOCITY • NEXT-GEN INTERFACES • 60 FPS HARDWARE ACCELERATED •
        </span>
      </Marquee>

      <Marquee
        direction="right"
        speed={isHovered ? 14 : 36}
        fade
        pauseOnHover={false}
        gap={28}
      >
        <span className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 whitespace-nowrap">
          COUNTER DIRECTIONAL TRACKS • DYNAMIC HOVER SHIFT • SMOOTH MOTION •
        </span>
      </Marquee>

      <div className="text-center pt-2">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <span>💡 Hover State:</span>
          <span className={isHovered ? "text-emerald-500 font-bold" : "text-zinc-400"}>
            {isHovered ? "Track 1 Decelerated (52s) | Track 2 Accelerated (14s)" : "Normal Speeds (24s & 36s)"}
          </span>
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
 * KOMPONEN UTAMA: MARQUEE DEMO DENGAN 10 VARIASI DESAIN LENGKAP
 * ========================================================================= */

export function MarqueeDemo() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const marqueeList = useMemo(
    () => [
      // 1. TRUSTED BY / TECH STACK
      {
        id: "trusted-by",
        title: t("content.marqueeDemo.variants.trustedBy.title", "1. Trusted By / Tech Stack (Pill Ticker)"),
        badge: t("content.marqueeDemo.variants.trustedBy.badge", "Tech Stack Pills"),
        description:
          "Dual horizontal counter-flow marquee showcasing technology badges and client logos with interactive glow effects and category pills.",
        snippet: `<div className="space-y-4">
  <Marquee direction="left" speed="normal" pauseOnHover fade gap={20}>
    {techPillsRow1.map((tech) => <TechPill key={tech.id} item={tech} />)}
  </Marquee>
  <Marquee direction="right" speed="slow" pauseOnHover fade gap={20}>
    {techPillsRow2.map((tech) => <TechPill key={tech.id} item={tech} />)}
  </Marquee>
</div>`,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/80 py-6 dark:border-zinc-800/80 dark:bg-zinc-950 space-y-4">
            <Marquee direction="left" speed="normal" pauseOnHover fade gap={20}>
              {techPillsRow1.map((tech) => (
                <div
                  key={tech.id}
                  className="group/pill inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 shadow-xs transition-all hover:scale-105 cursor-pointer select-none"
                >
                  <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-2xs", tech.accentCircle)}>
                    {tech.icon("h-3.5 w-3.5")}
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    {tech.category}
                  </span>
                </div>
              ))}
            </Marquee>

            <Marquee direction="right" speed="slow" pauseOnHover fade gap={20}>
              {techPillsRow2.map((tech) => (
                <div
                  key={tech.id}
                  className="group/pill inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 shadow-xs transition-all hover:scale-105 cursor-pointer select-none"
                >
                  <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-2xs", tech.accentCircle)}>
                    {tech.icon("h-3.5 w-3.5")}
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    {tech.category}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },

      // 2. SOCIAL PROOF / REVIEWS
      {
        id: "testimonials",
        title: t("content.marqueeDemo.variants.testimonials.title", "2. Social Proof / Review Cards (Testimonial Loop)"),
        badge: t("content.marqueeDemo.variants.testimonials.badge", "Social Proof"),
        description:
          "High-conversion horizontal testimonial ticker rendering customer reviews, star ratings, user avatars, and feedback cards.",
        snippet: `<Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
  {userReviews.map((review) => (
    <ReviewCard key={review.id} review={review} />
  ))}
</Marquee>`,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/80 py-6 dark:border-zinc-800/80 dark:bg-zinc-950 space-y-4">
            <Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
              {userReviews.map((review) => (
                <div
                  key={review.id}
                  className="w-80 shrink-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-white font-bold text-xs shadow-xs", review.avatarGrad)}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {review.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                          {review.username}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(review.stars)}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    "{review.content}"
                  </p>
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },

      // 3. VERTICAL MASONRY WATERFALL
      {
        id: "vertical-masonry",
        title: t("content.marqueeDemo.variants.vertical.title", "3. Vertical Masonry Waterfall (Feed Stream)"),
        badge: t("content.marqueeDemo.variants.vertical.badge", "Dual Column Waterfall"),
        description:
          "Dual vertical marquee columns flowing in opposite directions simultaneously to create a live activity feed stream.",
        snippet: `<div className="h-[400px] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  <Marquee orientation="vertical" direction="up" speed={28} pauseOnHover fade gap={14}>
    {columnFeed1.map((item) => <ActivityCard key={item.id} item={item} />)}
  </Marquee>
  <Marquee orientation="vertical" direction="down" speed={32} pauseOnHover fade gap={14}>
    {columnFeed2.map((item) => <ActivityCard key={item.id} item={item} />)}
  </Marquee>
</div>`,
        render: () => (
          <div className="w-full relative h-[400px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 p-4 dark:bg-zinc-950">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <Marquee orientation="vertical" direction="up" speed={28} pauseOnHover fade gap={14} className="h-full">
                {columnFeed1.map((item) => (
                  <div key={item.id} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{item.icon}</span> {item.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">{item.time}</span>
                    </div>
                    <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold border", item.badgeBg)}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </Marquee>

              <Marquee orientation="vertical" direction="down" speed={32} pauseOnHover fade gap={14} className="h-full">
                {columnFeed2.map((item) => (
                  <div key={item.id} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{item.icon}</span> {item.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">{item.time}</span>
                    </div>
                    <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold border", item.badgeBg)}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ),
      },

      // 4. MASSIVE HEADLINE BANNER
      {
        id: "giant-typography",
        title: t("content.marqueeDemo.variants.giantTypography.title", "4. Massive Headline Banner (Hero Typography Ticker)"),
        badge: t("content.marqueeDemo.variants.giantTypography.badge", "Hero Outline Text"),
        description:
          "Ultra-large display typography banner with transparent outline gradient text that flows smoothly as an immersive hero background.",
        snippet: `<Marquee direction="left" speed={45} fade gap={24} pauseOnHover>
  <span className="text-7xl sm:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-600">
    CREATIVE ARCHITECTURE • 60 FPS MOTION • ZERO SHIFT •
  </span>
</Marquee>`,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 py-10 dark:bg-zinc-950 space-y-3">
            <Marquee direction="left" speed={45} fade gap={24} pauseOnHover>
              <span className="text-6xl sm:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-600 select-none">
                CREATIVE ARCHITECTURE • 60 FPS MOTION • ZERO RUNTIME •
              </span>
            </Marquee>
            <Marquee direction="right" speed={55} fade gap={24} pauseOnHover>
              <span className="text-6xl sm:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 select-none">
                DESIGN SYSTEM • TAILWIND CSS • FRAMER MOTION • ACCESSIBLE •
              </span>
            </Marquee>
          </div>
        ),
      },

      // 5. 3D PERSPECTIVE ISOMETRIC TICKER
      {
        id: "perspective-3d",
        title: t("content.marqueeDemo.variants.perspective3d.title", "5. 3D Perspective Isometric Marquee (Depth Presentation)"),
        badge: t("content.marqueeDemo.variants.perspective3d.badge", "CSS 3D Depth"),
        description:
          "Cards streaming within an inclined 3D perspective space (rotateX, rotateZ, skewX) creating an illusion of infinite depth.",
        snippet: `<div style={{ perspective: "1100px" }} className="overflow-hidden py-14">
  <div style={{ transform: "rotateX(22deg) rotateZ(-7deg) skewX(-7deg)", transformStyle: "preserve-3d" }}>
    <Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
      {projectCards.map((card) => <Card3D key={card.id} card={card} />)}
    </Marquee>
  </div>
</div>`,
        render: () => (
          <div
            className="w-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 py-14 px-4 dark:bg-zinc-950"
            style={{ perspective: "1100px" }}
          >
            <div
              className="space-y-4"
              style={{
                transform: "rotateX(22deg) rotateZ(-7deg) skewX(-7deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
                {projectCards.map((card) => (
                  <div
                    key={card.id}
                    className="w-64 shrink-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className={cn("h-20 w-full rounded-xl p-3 flex flex-col justify-between mb-2 border bg-gradient-to-br", card.accentGradient)}>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">{card.category}</span>
                      <span className="text-lg font-black text-zinc-900 dark:text-white">{card.metric}</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{card.title}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ),
      },

      // 6. VERTICAL INFINITE SCROLL (TESTIMONIAL COLUMN)
      {
        id: "vertical-testimonials",
        title: t("content.marqueeDemo.variants.verticalTestimonials.title", "6. Vertical Infinite Scroll (Testimonial Dual-Column)"),
        badge: t("content.marqueeDemo.variants.verticalTestimonials.badge", "Dual Vertical Flow"),
        description:
          "Two vertical columns side-by-side moving in counter-flow directions (up and down) masked with a top-to-bottom edge fade gradient.",
        snippet: `<div
  className="h-[460px] overflow-hidden grid grid-cols-2 gap-4"
  style={{
    maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
  }}
>
  <Marquee orientation="vertical" direction="up" speed={28} pauseOnHover gap={16}>
    {reviewsCol1.map((rev) => <TestimonialCard key={rev.id} review={rev} />)}
  </Marquee>
  <Marquee orientation="vertical" direction="down" speed={32} pauseOnHover gap={16}>
    {reviewsCol2.map((rev) => <TestimonialCard key={rev.id} review={rev} />)}
  </Marquee>
</div>`,
        render: () => (
          <div
            className="w-full relative h-[460px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 p-4"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <Marquee orientation="vertical" direction="up" speed={28} pauseOnHover fade={false} gap={16} className="h-full">
                {userReviews.slice(0, 3).map((rev) => (
                  <div
                    key={rev.id}
                    className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs bg-gradient-to-tr shadow-xs", rev.avatarGrad)}>
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{rev.name}</h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{rev.role}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2">"{rev.content}"</p>
                    <div className="flex text-amber-400 text-xs">{"★".repeat(rev.stars)}</div>
                  </div>
                ))}
              </Marquee>

              <Marquee orientation="vertical" direction="down" speed={32} pauseOnHover fade={false} gap={16} className="h-full">
                {userReviews.slice(3, 6).map((rev) => (
                  <div
                    key={rev.id}
                    className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs bg-gradient-to-tr shadow-xs", rev.avatarGrad)}>
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{rev.name}</h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{rev.role}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2">"{rev.content}"</p>
                    <div className="flex text-amber-400 text-xs">{"★".repeat(rev.stars)}</div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ),
      },

      // 7. PARALLAX DUAL-DIRECTION (OPPOSING TEXT TRACKS)
      {
        id: "parallax-dual",
        title: t("content.marqueeDemo.variants.parallaxDual.title", "7. Parallax Dual-Direction (Opposing Text Tracks)"),
        badge: t("content.marqueeDemo.variants.parallaxDual.badge", "Interactive Velocity"),
        description:
          "Two giant text tracks running in opposite directions with asymmetric velocities. Hovering over the container dynamically shifts speed for a parallax depth illusion.",
        snippet: `<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
  <Marquee direction="left" speed={isHovered ? 52 : 24} fade gap={28}>
    <span className="text-7xl font-black uppercase">PARALLAX VELOCITY • NEXT-GEN •</span>
  </Marquee>

  <Marquee direction="right" speed={isHovered ? 14 : 36} fade gap={28}>
    <span className="text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
      COUNTER DIRECTIONAL TRACKS • SPEED SHIFT •
    </span>
  </Marquee>
</div>`,
        render: () => <ParallaxDualDirection />,
      },

      // 8. DRAGGABLE CAROUSEL MARQUEE (FRAMER MOTION PHYSICS)
      {
        id: "draggable-carousel",
        title: t("content.marqueeDemo.variants.draggableCarousel.title", "8. Draggable Carousel Marquee (Framer Motion Physics)"),
        badge: t("content.marqueeDemo.variants.draggableCarousel.badge", "Interactive Drag Physics"),
        description:
          "Autonomous motion loop that empowers users to swipe and drag content horizontally using Framer Motion drag constraints, elastic bounds, and grab cursors.",
        snippet: `<motion.div
  drag="x"
  dragConstraints={{ left: -1100, right: 0 }}
  dragElastic={0.12}
  animate={{ x: [0, -700] }}
  transition={{ x: { repeat: Infinity, duration: 28, ease: "linear" } }}
  className="flex gap-4 cursor-grab active:cursor-grabbing"
>
  {cards.map((card) => <Card key={card.id} {...card} />)}
</motion.div>`,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 p-4">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 text-xs font-mono text-zinc-500">
              <span>Touch / Mouse Interactive Drag</span>
              <span className="text-[11px] bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                drag="x" • dragElastic=0.12
              </span>
            </div>
            <DraggableMarqueeCarousel />
          </div>
        ),
      },

      // 9. OUTLINE TO SOLID TYPOGRAPHY (STROKE FILL HOVER)
      {
        id: "stroke-fill",
        title: t("content.marqueeDemo.variants.strokeFill.title", "9. Outline to Solid Typography (Stroke Fill Hover)"),
        badge: t("content.marqueeDemo.variants.strokeFill.badge", "CSS Text-Stroke Transition"),
        description:
          "Hollow text using transparent fill with stroke borders that smoothly transitions into vibrant solid colors upon mouse hover with micro-scaling.",
        snippet: `<Marquee direction="left" speed={35} fade gap={32} pauseOnHover>
  {words.map((word) => (
    <span
      key={word}
      className="text-7xl font-black uppercase tracking-tight text-transparent transition-all duration-300 hover:text-zinc-900 dark:hover:text-white hover:scale-105"
      style={{ WebkitTextStroke: "1.5px currentColor" }}
    >
      {word} •
    </span>
  ))}
</Marquee>`,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 py-10 dark:bg-zinc-950 space-y-4">
            <Marquee direction="left" speed={32} fade gap={28} pauseOnHover>
              {[
                "HYPERDRIVE",
                "SPATIAL MOTION",
                "HARDWARE ACCELERATED",
                "ZERO RUNTIME",
                "IMMERSIVE DEPTH",
                "PURE AESTHETICS",
              ].map((word) => (
                <span
                  key={word}
                  className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-transparent transition-all duration-300 hover:text-zinc-900 dark:hover:text-white hover:scale-105 cursor-pointer select-none inline-block"
                  style={{
                    WebkitTextStroke: "1.5px currentColor",
                  }}
                >
                  <span className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-colors">
                    {word} •
                  </span>
                </span>
              ))}
            </Marquee>

            <div className="text-center">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                💡 Hover individual words to observe the stroke-to-solid color fill transition
              </span>
            </div>
          </div>
        ),
      },

      // 10. Z-INDEX LAYERING (SANDWICH IMAGE MARQUEE)
      {
        id: "sandwich-marquee",
        title: t("content.marqueeDemo.variants.sandwichMarquee.title", "10. Z-Index Layering (Sandwich Image Marquee)"),
        badge: t("content.marqueeDemo.variants.sandwichMarquee.badge", "Spatial Sandwich Depth"),
        description:
          "A floating 3D graphic anchored between two synchronized marquee streams: a solid backdrop layer underneath, and an outline wireframe layer in front.",
        snippet: `<div className="relative h-[380px] overflow-hidden flex items-center justify-center">
  <div className="absolute inset-0 z-10 flex items-center opacity-70">
    <Marquee direction="left" speed={22} fade gap={28}>
      <span className="text-8xl font-black text-zinc-700 dark:text-zinc-800">SPATIAL AUDIO • ACOUSTICS •</span>
    </Marquee>
  </div>

  <div className="relative z-20 drop-shadow-2xl animate-pulse">
    <HeadphoneImage />
  </div>

  <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
    <Marquee direction="left" speed={22} fade gap={28}>
      <span className="text-8xl font-black text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>
        SPATIAL AUDIO • ACOUSTICS •
      </span>
    </Marquee>
  </div>
</div>`,
        render: () => (
          <div className="w-full relative h-[380px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 flex items-center justify-center select-none">
            <div className="absolute w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div className="absolute inset-0 z-10 flex items-center opacity-75 pointer-events-none">
              <Marquee direction="left" speed={24} fade gap={28}>
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-zinc-800 dark:text-zinc-800 whitespace-nowrap">
                  SPATIAL SOUND • ACOUSTIC MATRIX • NEXT AESTHETICS •
                </span>
              </Marquee>
            </div>

            <div className="relative z-20 flex flex-col items-center justify-center p-6 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] pointer-events-none">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-zinc-900/90 to-zinc-800/80 border border-zinc-700/60 flex items-center justify-center p-6 shadow-2xl backdrop-blur-sm relative group">
                <svg
                  className="w-28 h-28 text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                </svg>

                <div className="absolute bottom-3 text-center">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-zinc-400">
                    Spatial Pro X-1
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
              <Marquee direction="left" speed={24} fade gap={28}>
                <span
                  className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent whitespace-nowrap"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.85)",
                  }}
                >
                  SPATIAL SOUND • ACOUSTIC MATRIX • NEXT AESTHETICS •
                </span>
              </Marquee>
            </div>
          </div>
        ),
      },
    ],
    [t]
  );

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return marqueeList;
    return marqueeList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [marqueeList, searchQuery]);

  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search marquee variants (e.g. 'parallax', 'draggable', 'sandwich', 'testimonials', '3d')..."
            className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Complete Animated Marquee Collection:
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Showing {filteredList.length} of {marqueeList.length} production-ready motion variants.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            60FPS Hardware Accelerated • Framer Motion Ready
          </span>
        </div>
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            No marquee variants matching "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-indigo-600 hover:underline dark:text-indigo-400 font-medium cursor-pointer"
          >
            Reset search query
          </button>
        </div>
      )}

      <div className="flex flex-col gap-14">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white p-5 sm:p-7 shadow-xs transition hover:border-zinc-300 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div className="space-y-1.5 mb-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900 font-semibold">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-4xl">
                {item.description}
              </p>
            </div>

            <div className="w-full flex items-center justify-center p-3 sm:p-5 rounded-xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-5 overflow-hidden">
              {item.render()}
            </div>

            <CodeSnippet code={item.snippet} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeDemo;
