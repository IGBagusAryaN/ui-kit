import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Marquee } from "../../src/components/Marquee";
import { CodeSnippet } from "../components/CodeSnippet";
import { SearchIcon } from "../../src/icons";
import { cn } from "../../src/utils/cn";

/* =========================================================================
 * DATA & DEFINISI UNTUK KE-5 VARIASI MARQUEE
 * ========================================================================= */

// 1. DATA: Tech Stack Pills (Trusted By / Ecosystem)
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
  {
    id: "vite",
    name: "Vite JS",
    category: "Bundler",
    accentCircle: "bg-purple-500/10 text-purple-600 border-purple-500/25 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="m20.2 3.6-7.8 14.5L9.6 11l-5.8 4.6 6.8 6.8 10-17.7a.8.8 0 0 0-.4-1.1zM9.4 3.8 3.8 4.7l6.8 12.8 1.7-3.1L9.4 3.8z" />
      </svg>
    ),
  },
  {
    id: "lucide",
    name: "Lucide Icons",
    category: "Web Icons",
    accentCircle: "bg-amber-500/10 text-amber-600 border-amber-500/25 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m4.93 19.07 4.24-4.24" />
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
    id: "graphql",
    name: "GraphQL",
    category: "API Query",
    accentCircle: "bg-pink-500/10 text-pink-600 border-pink-500/25 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3 6.5 3.8v7.8L12 19.7l-6.5-3.8V8.1L12 4.3z" />
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
  {
    id: "radix",
    name: "Radix UI",
    category: "Primitives",
    accentCircle: "bg-violet-500/10 text-violet-600 border-violet-500/25 dark:bg-violet-500/20 dark:text-violet-400 dark:border-violet-500/30",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    ),
  },
];

// 2. DATA: Testimoni Pengguna (Review Cards)
interface ReviewItem {
  id: string;
  name: string;
  username: string;
  avatarGrad: string;
  stars: number;
  content: string;
}

const userReviews: ReviewItem[] = [
  {
    id: "r1",
    name: "Sarah Jenkins",
    username: "@sarah_dev",
    avatarGrad: "from-blue-500 to-cyan-500",
    stars: 5,
    content: "Animasi fisika di @bgsaryzzz/ui benar-benar mulus. Kami mengganti 3 library animasi berbeda cukup dengan satu paket ini.",
  },
  {
    id: "r2",
    name: "Alex Rivera",
    username: "@alex_architect",
    avatarGrad: "from-purple-500 to-pink-500",
    stars: 5,
    content: "Sistem Toast & Modal-nya menghemat sprint kami selama 3 minggu. Strukturnya sangat bersih dan zero-config.",
  },
  {
    id: "r3",
    name: "David Chen",
    username: "@david_stack",
    avatarGrad: "from-amber-500 to-emerald-500",
    stars: 5,
    content: "Akhirnya ada UI kit React yang 60fps nyata tanpa layout shift dan mendukung mode gelap secara native.",
  },
  {
    id: "r4",
    name: "Clara Oswald",
    username: "@clara_code",
    avatarGrad: "from-rose-500 to-orange-500",
    stars: 5,
    content: "Marquee ticker-nya sangat stabil di browser mobile maupun desktop. Efek edge fade mask-nya elegan sekali.",
  },
  {
    id: "r5",
    name: "Marcus Brody",
    username: "@marcus_ui",
    avatarGrad: "from-teal-500 to-sky-500",
    stars: 5,
    content: "Spring physics Framer Motion terasa organik saat di-hover dan tap. Sangat layak untuk aplikasi enterprise SaaS.",
  },
  {
    id: "r6",
    name: "Elena Rostova",
    username: "@elena_ux",
    avatarGrad: "from-fuchsia-500 to-indigo-500",
    stars: 5,
    content: "Konsistensi visual dari Button, Navbar, hingga Marquee sangat memanjakan mata tim desainer dan engineer kami.",
  },
  {
    id: "r7",
    name: "Kenji Sato",
    username: "@kenji_cloud",
    avatarGrad: "from-emerald-500 to-cyan-500",
    stars: 5,
    content: "Type-safety lengkap, aksesibilitas dengan aria-hidden otomatis, dan integrasi i18n yang siap pakai.",
  },
  {
    id: "r8",
    name: "Maya Lin",
    username: "@maya_creative",
    avatarGrad: "from-violet-500 to-pink-500",
    stars: 5,
    content: "Fitur pause on hover dan kecepatan dinamis memudahkan kami membuat showcase produk yang sangat interaktif.",
  },
];

// 3. DATA: Kolom Vertikal (Masonry Waterfall)
interface ActivityFeed {
  id: string;
  title: string;
  tag: string;
  badgeBg: string;
  time: string;
  icon: string;
}

const columnFeed1: ActivityFeed[] = [
  { id: "c1-1", title: "Release v2.4.0 Deployed", tag: "Production", badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", time: "2m lalu", icon: "🚀" },
  { id: "c1-2", title: "Lighthouse Score: 100/100", tag: "Performance", badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20", time: "8m lalu", icon: "⚡" },
  { id: "c1-3", title: "Framer Physics Calibrated", tag: "Animation", badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20", time: "14m lalu", icon: "✦" },
  { id: "c1-4", title: "Database Query: 1.2ms", tag: "PostgreSQL", badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", time: "22m lalu", icon: "⌗" },
  { id: "c1-5", title: "Zero Layout Shift Verified", tag: "Core Web Vitals", badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20", time: "30m lalu", icon: "◈" },
];

const columnFeed2: ActivityFeed[] = [
  { id: "c2-1", title: "New 3D Perspective Preset", tag: "UI Library", badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20", time: "5m lalu", icon: "◫" },
  { id: "c2-2", title: "Bundle Size Reduced by 34%", tag: "Rollup / Vite", badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", time: "11m lalu", icon: "📦" },
  { id: "c2-3", title: "Dark & Light Token Synced", tag: "Design Token", badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20", time: "19m lalu", icon: "◐" },
  { id: "c2-4", title: "Test Suites: 100% Passed", tag: "CI / CD", badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", time: "27m lalu", icon: "✓" },
  { id: "c2-5", title: "WCAG AAA Accessible", tag: "A11y", badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20", time: "41m lalu", icon: "♿" },
];

// 5. DATA: 3D Perspective Cards
interface ProjectCard {
  id: string;
  title: string;
  category: string;
  metric: string;
  accentGradient: string;
}

const projectCards: ProjectCard[] = [
  {
    id: "p1",
    title: "Quantum Engine",
    category: "Physics Simulator",
    metric: "60 FPS",
    accentGradient:
      "from-blue-500/10 via-indigo-500/10 to-cyan-500/10 border-blue-500/20 dark:from-blue-950/60 dark:via-indigo-950/50 dark:to-cyan-950/40 dark:border-blue-500/30",
  },
  {
    id: "p2",
    title: "Neural Matrix",
    category: "AI Interface",
    metric: "99.9% Acc",
    accentGradient:
      "from-purple-500/10 via-pink-500/10 to-rose-500/10 border-purple-500/20 dark:from-purple-950/60 dark:via-pink-950/50 dark:to-rose-950/40 dark:border-purple-500/30",
  },
  {
    id: "p3",
    title: "Horizon Dashboard",
    category: "SaaS Analytics",
    metric: "3.2M Req",
    accentGradient:
      "from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-emerald-500/20 dark:from-emerald-950/60 dark:via-teal-950/50 dark:to-cyan-950/40 dark:border-emerald-500/30",
  },
  {
    id: "p4",
    title: "Aura Particles",
    category: "WebGL Shader",
    metric: "120 FPS",
    accentGradient:
      "from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-500/20 dark:from-amber-950/60 dark:via-orange-950/50 dark:to-rose-950/40 dark:border-amber-500/30",
  },
  {
    id: "p5",
    title: "Hyperdrive Flow",
    category: "Vector Graphics",
    metric: "Zero Shift",
    accentGradient:
      "from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 border-fuchsia-500/20 dark:from-fuchsia-950/60 dark:via-purple-950/50 dark:to-indigo-950/40 dark:border-fuchsia-500/30",
  },
  {
    id: "p6",
    title: "Starlight Mesh",
    category: "3D Canvas",
    metric: "GPU Ready",
    accentGradient:
      "from-cyan-500/10 via-sky-500/10 to-blue-500/10 border-cyan-500/20 dark:from-cyan-950/60 dark:via-sky-950/50 dark:to-blue-950/40 dark:border-cyan-500/30",
  },
];

/* =========================================================================
 * CODE SNIPPETS TEMPLATE UNTUK KE-5 VARIAN
 * ========================================================================= */
const codeBlocksVariant1 = {
  react: `<div className="space-y-4">
  {/* Baris 1: Arah Kiri */}
  <Marquee direction="left" speed="normal" pauseOnHover fade gap={20}>
    {techPillsRow1.map((tech) => (
      <TechPillItem key={tech.id} item={tech} />
    ))}
  </Marquee>

  {/* Baris 2: Arah Kanan */}
  <Marquee direction="right" speed="normal" pauseOnHover fade gap={20}>
    {techPillsRow2.map((tech) => (
      <TechPillItem key={tech.id} item={tech} />
    ))}
  </Marquee>
</div>`,
  vue: `<script setup lang="ts">
import { Marquee } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <div class="space-y-4">
    <!-- Baris 1: Arah Kiri -->
    <Marquee direction="left" speed="normal" pauseOnHover fade :gap="20">
      <TechPillItem v-for="tech in techPillsRow1" :key="tech.id" :item="tech" />
    </Marquee>

    <!-- Baris 2: Arah Kanan -->
    <Marquee direction="right" speed="normal" pauseOnHover fade :gap="20">
      <TechPillItem v-for="tech in techPillsRow2" :key="tech.id" :item="tech" />
    </Marquee>
  </div>
</template>`,
  laravel: `<div class="space-y-4">
  {{-- Baris 1: Arah Kiri --}}
  <x-arya-marquee direction="left" speed="normal" pause-on-hover fade :gap="20">
    @foreach($techPillsRow1 as $tech)
      <x-tech-pill :item="$tech" />
    @endforeach
  </x-arya-marquee>

  {{-- Baris 2: Arah Kanan --}}
  <x-arya-marquee direction="right" speed="normal" pause-on-hover fade :gap="20">
    @foreach($techPillsRow2 as $tech)
      <x-tech-pill :item="$tech" />
    @endforeach
  </x-arya-marquee>
</div>`
};

const codeBlocksVariant2 = {
  react: `<Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
  {reviews.map((review) => (
    <div
      key={review.id}
      className="w-80 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-900/90"
    >
      <div className="flex items-center gap-3">
        <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{review.name}</p>
          <p className="text-xs text-zinc-500">{review.handle}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{review.content}</p>
    </div>
  ))}
</Marquee>`,
  vue: `<script setup lang="ts">
import { Marquee } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <Marquee direction="left" speed="normal" pauseOnHover fade :gap="18">
    <div
      v-for="review in reviews"
      :key="review.id"
      class="w-80 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-900/90"
    >
      <div class="flex items-center gap-3">
        <img :src="review.avatar" :alt="review.name" class="h-10 w-10 rounded-full" />
        <div>
          <p class="font-semibold text-zinc-900 dark:text-zinc-100">{{ review.name }}</p>
          <p class="text-xs text-zinc-500">{{ review.handle }}</p>
        </div>
      </div>
      <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{{ review.content }}</p>
    </div>
  </Marquee>
</template>`,
  laravel: `<x-arya-marquee direction="left" speed="normal" pause-on-hover fade :gap="18">
  @foreach($reviews as $review)
    <div class="w-80 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-900/90">
      <div class="flex items-center gap-3">
        <img src="{{ $review['avatar'] }}" alt="{{ $review['name'] }}" class="h-10 w-10 rounded-full" />
        <div>
          <p class="font-semibold text-zinc-900 dark:text-zinc-100">{{ $review['name'] }}</p>
          <p class="text-xs text-zinc-500">{{ $review['handle'] }}</p>
        </div>
      </div>
      <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{{ $review['content'] }}</p>
    </div>
  @endforeach
</x-arya-marquee>`
};

const codeBlocksVariant3 = {
  react: `<div className="h-[430px] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Kolom 1: Bergerak Vertikal ke Atas */}
  <Marquee orientation="vertical" direction="up" speed="normal" pauseOnHover fade gap={14}>
    {testimonialsCol1.map((item) => (
      <FeedCard key={item.id} item={item} />
    ))}
  </Marquee>

  {/* Kolom 2: Bergerak Vertikal ke Bawah */}
  <Marquee orientation="vertical" direction="down" speed="normal" pauseOnHover fade gap={14}>
    {testimonialsCol2.map((item) => (
      <FeedCard key={item.id} item={item} />
    ))}
  </Marquee>
</div>`,
  vue: `<script setup lang="ts">
import { Marquee } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <div class="h-[430px] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
    <Marquee orientation="vertical" direction="up" speed="normal" pauseOnHover fade :gap="14">
      <FeedCard v-for="item in testimonialsCol1" :key="item.id" :item="item" />
    </Marquee>
    <Marquee orientation="vertical" direction="down" speed="normal" pauseOnHover fade :gap="14">
      <FeedCard v-for="item in testimonialsCol2" :key="item.id" :item="item" />
    </Marquee>
  </div>
</template>`,
  laravel: `<div class="h-[430px] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  <x-arya-marquee orientation="vertical" direction="up" speed="normal" pause-on-hover fade :gap="14">
    @foreach($testimonialsCol1 as $item)
      <x-feed-card :item="$item" />
    @endforeach
  </x-arya-marquee>

  <x-arya-marquee orientation="vertical" direction="down" speed="normal" pause-on-hover fade :gap="14">
    @foreach($testimonialsCol2 as $item)
      <x-feed-card :item="$item" />
    @endforeach
  </x-arya-marquee>
</div>`
};

const codeBlocksVariant4 = {
  react: `<Marquee direction="left" speed={45} fade gap={24} pauseOnHover>
  <div className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-600">
    NEXT-GEN UI SYSTEM • 60 FPS MOTION • ACCESSIBLE • TAILWIND READY •
  </div>
</Marquee>`,
  vue: `<script setup lang="ts">
import { Marquee } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <Marquee direction="left" :speed="45" fade :gap="24" pauseOnHover>
    <div class="text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-600">
      NEXT-GEN UI SYSTEM • 60 FPS MOTION • ACCESSIBLE • TAILWIND READY •
    </div>
  </Marquee>
</template>`,
  laravel: `<x-arya-marquee direction="left" :speed="45" fade :gap="24" pause-on-hover>
  <div class="text-7xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-600">
    NEXT-GEN UI SYSTEM • 60 FPS MOTION • ACCESSIBLE • TAILWIND READY •
  </div>
</x-arya-marquee>`
};

const codeBlocksVariant5 = {
  react: `<div className="relative overflow-hidden py-16" style={{ perspective: "1100px" }}>
  <div style={{ transform: "rotateX(22deg) rotateZ(-12deg) skewX(8deg)" }} className="space-y-6">
    <Marquee direction="left" speed="normal" pauseOnHover gap={24}>
      {cardsRow1.map((card) => (
        <ThreeDCard key={card.id} card={card} />
      ))}
    </Marquee>
    <Marquee direction="right" speed="normal" pauseOnHover gap={24}>
      {cardsRow2.map((card) => (
        <ThreeDCard key={card.id} card={card} />
      ))}
    </Marquee>
  </div>
</div>`,
  vue: `<script setup lang="ts">
import { Marquee } from "@bgsaryzzz/ui-vue";
</script>

<template>
  <div class="relative overflow-hidden py-16" style="perspective: 1100px">
    <div style="transform: rotateX(22deg) rotateZ(-12deg) skewX(8deg)" class="space-y-6">
      <Marquee direction="left" speed="normal" pauseOnHover :gap="24">
        <ThreeDCard v-for="card in cardsRow1" :key="card.id" :card="card" />
      </Marquee>
      <Marquee direction="right" speed="normal" pauseOnHover :gap="24">
        <ThreeDCard v-for="card in cardsRow2" :key="card.id" :card="card" />
      </Marquee>
    </div>
  </div>
</template>`,
  laravel: `<div class="relative overflow-hidden py-16" style="perspective: 1100px">
  <div style="transform: rotateX(22deg) rotateZ(-12deg) skewX(8deg)" class="space-y-6">
    <x-arya-marquee direction="left" speed="normal" pause-on-hover :gap="24">
      @foreach($cardsRow1 as $card)
        <x-three-d-card :card="$card" />
      @endforeach
    </x-arya-marquee>
    <x-arya-marquee direction="right" speed="normal" pause-on-hover :gap="24">
      @foreach($cardsRow2 as $card)
        <x-three-d-card :card="$card" />
      @endforeach
    </x-arya-marquee>
  </div>
</div>`
};

/* =========================================================================
 * KOMPONEN UTAMA: MARQUEE DEMO DENGAN 5 VARIASI DESAIN
 * ========================================================================= */

export function MarqueeDemo() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const marqueeList = useMemo(
    () => [
      {
        id: "trusted-by",
        title: t("content.marqueeDemo.variants.trustedBy.title", "1. Trusted By / Tech Stack (Pill Ticker)"),
        badge: t("content.marqueeDemo.variants.trustedBy.badge", "Tech Stack Pills"),
        description: t(
          "content.marqueeDemo.variants.trustedBy.desc",
          "Marquee interaktif berisi deretan teknologi modern dalam format kapsul (pill) adaptif, lengkap dengan ikon beraksen, nama teknologi, dan badge kategori."
        ),
        snippet: codeBlocksVariant1.react,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-50/80 py-6 dark:border-zinc-800/70 dark:bg-zinc-900/40 space-y-5">
            {/* Baris 1: Arah Kiri */}
            <Marquee direction="left" speed="normal" pauseOnHover fade gap={20}>
              {techPillsRow1.map((tech) => (
                <div
                  key={tech.id}
                  className="group/pill inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3.5 py-2 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-200/80 hover:border-zinc-300 hover:shadow-md dark:hover:bg-zinc-800 dark:hover:border-zinc-700 cursor-pointer select-none"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-2xs transition-transform duration-300 group-hover/pill:scale-110",
                      tech.accentCircle
                    )}
                  >
                    {tech.icon("h-4 w-4")}
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="rounded-md border border-zinc-200/80 bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-600 uppercase dark:border-zinc-700/60 dark:bg-zinc-800/80 dark:text-zinc-300 whitespace-nowrap">
                    {tech.category}
                  </span>
                </div>
              ))}
            </Marquee>

            {/* Baris 2: Arah Kanan (Counter-Flow) */}
            <Marquee direction="right" speed="slow" pauseOnHover fade gap={20}>
              {techPillsRow2.map((tech) => (
                <div
                  key={tech.id}
                  className="group/pill inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3.5 py-2 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-200/80 hover:border-zinc-300 hover:shadow-md dark:hover:bg-zinc-800 dark:hover:border-zinc-700 cursor-pointer select-none"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-2xs transition-transform duration-300 group-hover/pill:scale-110",
                      tech.accentCircle
                    )}
                  >
                    {tech.icon("h-4 w-4")}
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="rounded-md border border-zinc-200/80 bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-600 uppercase dark:border-zinc-700/60 dark:bg-zinc-800/80 dark:text-zinc-300 whitespace-nowrap">
                    {tech.category}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        ),
      },
      {
        id: "testimonials",
        title: t("content.marqueeDemo.variants.testimonials.title", "2. User Testimonials (Review Cards)"),
        badge: t("content.marqueeDemo.variants.testimonials.badge", "Social Proof"),
        description: t(
          "content.marqueeDemo.variants.testimonials.desc",
          "Marquee yang membungkus deretan kartu testimoni pengguna dengan avatar, nama, handle @, rating bintang 5, dan kutipan ulasan singkat."
        ),
        snippet: codeBlocksVariant2.react,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-50/80 py-6 dark:border-zinc-800/70 dark:bg-zinc-900/40 space-y-4">
            {/* Baris 1: Testimoni ke Kiri */}
            <Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
              {userReviews.slice(0, 4).map((review) => (
                <div
                  key={review.id}
                  className="w-80 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/90 dark:hover:border-zinc-700 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-white font-bold text-sm shadow-xs", review.avatarGrad)}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {review.name}
                        </h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          {review.username}
                        </span>
                      </div>
                    </div>
                    {/* Bintang Rating */}
                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    "{review.content}"
                  </p>
                </div>
              ))}
            </Marquee>

            {/* Baris 2: Testimoni ke Kanan (Counter-Flow) */}
            <Marquee direction="right" speed="slow" pauseOnHover fade gap={18}>
              {userReviews.slice(4, 8).map((review) => (
                <div
                  key={review.id}
                  className="w-80 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/90 dark:hover:border-zinc-700 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br text-white font-bold text-sm shadow-xs", review.avatarGrad)}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {review.name}
                        </h4>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          {review.username}
                        </span>
                      </div>
                    </div>
                    {/* Bintang Rating */}
                    <div className="flex items-center text-amber-400 text-xs gap-0.5">
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
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
      {
        id: "vertical-masonry",
        title: t("content.marqueeDemo.variants.vertical.title", "3. Vertical Column (Masonry Ticker)"),
        badge: t("content.marqueeDemo.variants.vertical.badge", "Dual Column Waterfall"),
        description: t(
          "content.marqueeDemo.variants.vertical.desc",
          "Dua marquee vertikal berdampingan bergerak secara simultan berlawanan arah (ke atas dan ke bawah), menciptakan efek air terjun dinamis."
        ),
        snippet: codeBlocksVariant3.react,
        render: () => (
          <div className="w-full relative h-[430px] overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Kolom 1: Bergerak Vertikal ke Atas (Up) */}
              <div className="h-full relative overflow-hidden">
                <Marquee
                  orientation="vertical"
                  direction="up"
                  speed={28}
                  pauseOnHover
                  fade
                  gap={14}
                  className="h-full"
                >
                  {columnFeed1.map((item) => (
                    <div
                      key={item.id}
                      className="w-full rounded-xl border border-zinc-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-zinc-900/90 dark:hover:border-zinc-700 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-base">
                          <span>{item.icon}</span>
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.title}
                          </span>
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold border", item.badgeBg)}>
                          {item.tag}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Pipeline synchronized successfully
                        </span>
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>

              {/* Kolom 2: Bergerak Vertikal ke Bawah (Down - Counter Flow) */}
              <div className="h-full relative overflow-hidden">
                <Marquee
                  orientation="vertical"
                  direction="down"
                  speed={32}
                  pauseOnHover
                  fade
                  gap={14}
                  className="h-full"
                >
                  {columnFeed2.map((item) => (
                    <div
                      key={item.id}
                      className="w-full rounded-xl border border-zinc-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-zinc-900/90 dark:hover:border-zinc-700 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-base">
                          <span>{item.icon}</span>
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.title}
                          </span>
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold border", item.badgeBg)}>
                          {item.tag}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Automated task completed
                        </span>
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "giant-typography",
        title: t("content.marqueeDemo.variants.giantTypography.title", "4. Giant Typography (Background Layer)"),
        badge: t("content.marqueeDemo.variants.giantTypography.badge", "Hero Outline Text"),
        description: t(
          "content.marqueeDemo.variants.giantTypography.desc",
          "Teks raksasa dengan tipografi outline transparan yang bergerak sangat lambat, ideal sebagai latar belakang dinamis hero section."
        ),
        snippet: codeBlocksVariant4.react,
        render: () => (
          <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50/80 py-12 dark:border-zinc-800/70 dark:bg-zinc-950 space-y-4">
            {/* Baris 1: Outline Teks Raksasa Kiri */}
            <Marquee direction="left" speed={45} fade gap={24} pauseOnHover>
              <div
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter select-none transition-colors duration-300"
                style={{
                  WebkitTextStroke: "1.5px currentColor",
                  color: "transparent",
                }}
              >
                <span className="text-zinc-300 hover:text-zinc-800 dark:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
                  CREATIVE ARCHITECTURE • 60 FPS MOTION • ZERO SHIFT •
                </span>
              </div>
            </Marquee>

            {/* Floating Hero Card di atas layer marquee */}
            <div className="relative z-10 flex justify-center py-2">
              <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white/90 px-6 py-2.5 shadow-lg backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/90">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Hero Layer Demo — Responsive Outline Typography
                </span>
              </div>
            </div>

            {/* Baris 2: Outline Teks Raksasa Kanan */}
            <Marquee direction="right" speed={55} fade gap={24} pauseOnHover>
              <div
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter select-none transition-colors duration-300"
                style={{
                  WebkitTextStroke: "1.5px currentColor",
                  color: "transparent",
                }}
              >
                <span className="text-zinc-300 hover:text-zinc-800 dark:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
                  DESIGN SYSTEM • TAILWIND CSS • FRAMER MOTION • ACCESSIBLE •
                </span>
              </div>
            </Marquee>
          </div>
        ),
      },
      {
        id: "perspective-3d",
        title: t("content.marqueeDemo.variants.perspective3d.title", "5. 3D Perspective Ticker"),
        badge: t("content.marqueeDemo.variants.perspective3d.badge", "CSS 3D Depth"),
        description: t(
          "content.marqueeDemo.variants.perspective3d.desc",
          "Marquee dalam kontainer dengan efek kedalaman CSS 3D Perspective, menciptakan ilusi deretan kartu bergerak masuk ke dalam ruang 3 dimensi."
        ),
        snippet: codeBlocksVariant5.react,
        render: () => (
          <div
            className="w-full relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-100/70 py-16 px-4 dark:border-zinc-800/70 dark:bg-zinc-950/90"
            style={{ perspective: "1100px" }}
          >
            <div
              className="space-y-6 transition-transform duration-500"
              style={{
                transform: "rotateX(22deg) rotateZ(-7deg) skewX(-7deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Row 1 dalam 3D Space */}
              <Marquee direction="left" speed="normal" pauseOnHover fade gap={18}>
                {projectCards.map((card) => (
                  <div
                    key={`p1-${card.id}`}
                    className="group w-72 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  >
                    <div
                      className={cn(
                        "h-24 w-full rounded-xl p-3.5 flex flex-col justify-between shadow-2xs mb-3 border bg-linear-to-br transition-colors",
                        card.accentGradient
                      )}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                        {card.category}
                      </span>
                      <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {card.metric}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {card.title}
                      </h4>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-500 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-100">
                        ↗
                      </span>
                    </div>
                  </div>
                ))}
              </Marquee>

              {/* Row 2 dalam 3D Space (Counter-Flow) */}
              <Marquee direction="right" speed="slow" pauseOnHover fade gap={18}>
                {projectCards.slice().reverse().map((card) => (
                  <div
                    key={`p2-${card.id}`}
                    className="group w-72 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  >
                    <div
                      className={cn(
                        "h-24 w-full rounded-xl p-3.5 flex flex-col justify-between shadow-2xs mb-3 border bg-linear-to-br transition-colors",
                        card.accentGradient
                      )}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                        {card.category}
                      </span>
                      <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {card.metric}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {card.title}
                      </h4>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-500 transition-colors group-hover:bg-zinc-200 group-hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-100">
                        ↗
                      </span>
                    </div>
                  </div>
                ))}
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
              "content.marqueeDemo.searchPlaceholder",
              "Cari variasi marquee (contoh: 'ticker', 'social proof', 'testimonials', '3d', 'typography')..."
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
              {t("content.marqueeDemo.collectionTitle", "Koleksi Variasi Marquee Animasi:")}
            </span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.marqueeDemo.showingCount", {
                count: filteredList.length,
                total: marqueeList.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${marqueeList.length} variasi marquee motion berkinerja tinggi.`,
              })}
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {t("content.marqueeDemo.statusBadge", "Smooth 60FPS Hardware Accelerated")}
          </span>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.marqueeDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan variasi marquee dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.marqueeDemo.resetSearch", "Reset pencarian")}
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
