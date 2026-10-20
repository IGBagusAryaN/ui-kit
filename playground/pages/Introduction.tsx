import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface IntroductionProps {
  onNavigate?: (pageId: string) => void;
}

export function Introduction({ onNavigate }: IntroductionProps) {
  const { t } = useTranslation();

  const handleNavigate = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
    }
  };

  return (
    <div className="w-full pb-16">
      {/* ---------------------------------------------------------------------
       * 1. COMPACT HIGH-END HERO BANNER
       * --------------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl py-8 md:py-12 px-6 sm:px-8 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xs">
        {/* Animated Moving Background Grid & Mesh Gradient */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        />

        {/* Ambient Glow Aura */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-purple-900/10 via-blue-900/10 to-transparent dark:from-purple-900/20 dark:via-blue-900/15 dark:to-transparent blur-3xl rounded-full"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 w-72 h-72 bg-blue-500/10 dark:bg-indigo-600/15 blur-3xl rounded-full"
          aria-hidden="true"
        />

        {/* Grid Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Copywriting & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* The Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-xs font-medium text-zinc-600 dark:text-zinc-300 relative group overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-indigo-400/60 dark:hover:border-indigo-500/60 shadow-2xs">
              {/* Shimmer light beam on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent transition-transform pointer-events-none" />
              <span>
                {t(
                  "content.introduction.badge",
                  "✨ @bgsaryzzz/ui v0.1.2 is now available"
                )}
              </span>
            </div>

            {/* Hero Main Headings (Compact sizing) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
              <span>
                {t(
                  "content.introduction.titleLine1",
                  "Animate Your Interfaces,"
                )}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {t(
                  "content.introduction.titleLine2",
                  "Modern React UI Kit"
                )}
              </span>
            </h1>

            {/* Introductory Paragraph */}
            <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3.5">
              {t(
                "content.introduction.desc",
                "A high-end collection of modern web components featuring silky Framer Motion micro-animations and zero-dependency Tailwind CSS styling. Built for copy-paste flexibility."
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => handleNavigate("button-animation")}
                className="group inline-flex items-center justify-center gap-2.5 h-10 px-5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all shadow-sm active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>
                  {t(
                    "content.introduction.browseComponents",
                    "Browse Components"
                  )}
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("installation")}
                className="inline-flex items-center justify-center gap-2.5 h-10 px-5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all shadow-2xs active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span>
                  {t(
                    "content.introduction.installationGuide",
                    "Installation Guide"
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Compact 3D Floating Showcase Canvas (h-[290px]) */}
          <div className="lg:col-span-5 relative h-[290px] w-full hidden md:block select-none">
            {/* Ambient Background Behind Cards */}
            <div className="absolute inset-0 bg-radial from-blue-500/10 via-indigo-500/5 to-transparent rounded-3xl" />

            {/* FLOATING CARD A: ButtonAnimation (Adaptive Light/Dark Hold to Deploy Mockup) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.2,
                ease: "easeInOut",
              }}
              className="absolute top-4 -left-8 z-20 w-56 sm:w-60 bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-3 shadow-lg dark:shadow-2xl backdrop-blur-md transition-shadow hover:shadow-indigo-500/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    ButtonAnimation
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  holdConfirm
                </span>
              </div>

              {/* Simulated Button Component with Adaptive Two-Layer Clip-Path Fill */}
              <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 select-none shadow-xs">
                {/* 1. Base Layer (Unfilled State) */}
                <div className="py-2 px-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                    Hold to Deploy
                  </span>
                  <div className="flex items-center text-zinc-400 dark:text-zinc-500">
                    <svg
                      className="w-3 h-3 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. Overlay Layer (Dynamic Progress with clipPath) */}
                <motion.div
                  animate={{
                    clipPath: [
                      "inset(0 82% 0 0)",
                      "inset(0 15% 0 0)",
                      "inset(0 82% 0 0)",
                    ],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 py-2 px-3 flex items-center justify-between text-white pointer-events-none"
                >
                  <span className="text-[11px] font-semibold tracking-wide text-white">
                    Hold to Deploy
                  </span>
                  <div className="flex items-center text-white/90">
                    <svg
                      className="w-3 h-3 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Realistic Miniature Mouse Cursor Pointer */}
              <div className="absolute bottom-1 right-7 pointer-events-none drop-shadow-md z-30">
                <svg
                  className="w-5 h-5 text-zinc-900 dark:text-white fill-current filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] opacity-90 transform -rotate-12"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3l7 18 3-7 7-3L3 3z" />
                </svg>
              </div>
            </motion.div>

            {/* FLOATING CARD B: Hierarchy Menu (Nested Directory Tree) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.8,
                delay: 1.2,
                ease: "easeInOut",
              }}
              className="absolute top-[82px] right-0 z-10 w-48 sm:w-52 bg-white/85 dark:bg-zinc-950/75 border border-zinc-200/80 dark:border-zinc-800/70 rounded-xl p-2.5 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                <svg
                  className="w-3 h-3 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-1.5V9a3 3 0 00-3-3h-3.379a3 3 0 01-2.12-.879l-.71-.707A3 3 0 006.671 3.5H4.5A3 3 0 001.5 6.5v12a3 3 0 003 3h15z" />
                </svg>
                <span>components</span>
                <span className="ml-auto text-[9px] font-mono text-zinc-400">
                  tree
                </span>
              </div>

              {/* Guiding Indent Lines */}
              <div className="border-l border-zinc-200 dark:border-zinc-800 ml-1.5 pl-2.5 space-y-1 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 py-0.5 px-1 rounded bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>Button.tsx</span>
                </div>
                <div className="flex items-center gap-1.5 py-0.5 px-1 text-zinc-500 dark:text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>Dropdown.tsx</span>
                </div>
                <div className="flex items-center gap-1.5 py-0.5 px-1 text-zinc-500 dark:text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>ToastProvider.tsx</span>
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARD C: Interactive Telemetry & Physics Switch */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                delay: 2.2,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-6 z-30 w-60 sm:w-64 bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  <span>Telemetry & Physics</span>
                </div>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  60 FPS
                </span>
              </div>

              {/* Physics Spec Bar */}
              <div className="space-y-1 mb-2">
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span>Spring Physics</span>
                  <span>stiffness: 300 • damping: 20</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                  <motion.div
                    animate={{ width: ["45%", "85%", "45%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
              </div>

              {/* Glowing Interactive Toggle Switch */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                  Micro-interactions: On
                </span>
                <div className="w-7 h-4 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-end px-0.5 shadow-xs cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
       * 2. ASYMMETRICAL BENTO CARDS (BOTTOM)
       * --------------------------------------------------------------------- */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10 md:mt-12">
        {/* CARD 1 (Wider, col-span-3): Zero Dependency Lock-in */}
        <div className="md:col-span-3 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden relative flex flex-col justify-between gap-4 shadow-xs group hover:border-zinc-300 dark:hover:border-zinc-700/80 transition">
          {/* Text Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 mb-1">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span>Pure Freedom</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t(
                "content.introduction.cards.card1Title",
                "Zero Dependency Lock-in"
              )}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              {t(
                "content.introduction.cards.card1Desc",
                "Copy the code, tweak the Tailwind classes, and make it your own."
              )}
            </p>
          </div>

          {/* Visual: Clean & Elegant JSX Code Block Mockup */}
          <div className="w-full rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
            {/* Mockup Header Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  CustomButton.tsx
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                React • JSX
              </span>
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200">
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  1
                </span>
                <span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    import
                  </span>{" "}
                  &#123; ButtonAnimation &#125;{" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    from
                  </span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    "@bgsaryzzz/ui"
                  </span>
                  ;
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  2
                </span>
                <span />
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  3
                </span>
                <span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    export function
                  </span>{" "}
                  <span className="text-sky-600 dark:text-sky-400">
                    ActionCTA
                  </span>
                  () &#123;
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  4
                </span>
                <span className="pl-3">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    return
                  </span>{" "}
                  (
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  5
                </span>
                <span className="pl-6">
                  &lt;
                  <span className="text-sky-600 dark:text-sky-400">
                    ButtonAnimation
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  6
                </span>
                <span className="pl-9">
                  <span className="text-amber-600 dark:text-amber-400">
                    variant
                  </span>
                  =
                  <span className="text-emerald-600 dark:text-emerald-400">
                    "springBounce"
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  7
                </span>
                <span className="pl-9">
                  <span className="text-amber-600 dark:text-amber-400">
                    className
                  </span>
                  =
                  <span className="text-emerald-600 dark:text-emerald-400">
                    "bg-blue-600 text-white rounded-xl"
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  8
                </span>
                <span className="pl-6">&gt;</span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  9
                </span>
                <span className="pl-9">Get Started Now</span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  10
                </span>
                <span className="pl-6">
                  &lt;/
                  <span className="text-sky-600 dark:text-sky-400">
                    ButtonAnimation
                  </span>
                  &gt;
                </span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  11
                </span>
                <span className="pl-3">);</span>
              </div>
              <div className="flex gap-3">
                <span className="select-none text-zinc-400 dark:text-zinc-600 shrink-0 text-right w-4">
                  12
                </span>
                <span>&#125;</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 (Narrower, col-span-2): Fluid Animations */}
        <div className="md:col-span-2 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden relative flex flex-col justify-between gap-4 shadow-xs group hover:border-zinc-300 dark:hover:border-zinc-700/80 transition">
          {/* Text Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50 mb-1">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span>Physics Driven</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t("content.introduction.cards.card2Title", "Fluid Animations")}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t(
                "content.introduction.cards.card2Desc",
                "Powered by Framer Motion for buttery smooth interactions."
              )}
            </p>
          </div>

          {/* Visual: 2-3 Stacked Transparent Layers with Subtle Borders */}
          <div className="w-full relative h-48 flex items-center justify-center p-3 select-none">
            {/* Background Layer 1 (Bottom stacked card) */}
            <div
              className="absolute w-[86%] h-24 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/40 bg-zinc-100/60 dark:bg-zinc-800/30 backdrop-blur-xs transform -rotate-6 translate-y-3 transition group-hover:-rotate-8 group-hover:translate-y-4 duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Background Layer 2 (Middle stacked card) */}
            <div
              className="absolute w-[92%] h-24 rounded-2xl border border-zinc-300/80 dark:border-zinc-700/60 bg-zinc-100/80 dark:bg-zinc-800/50 backdrop-blur-xs transform rotate-3 translate-y-1.5 transition group-hover:rotate-4 group-hover:translate-y-2 duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Foreground Layer 3 (Top interactive mockup card) */}
            <div className="relative z-10 w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-950/90 shadow-md backdrop-blur-md flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Spring Interpolation
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      stiffness: 350 • damping: 25
                    </div>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  60 FPS
                </span>
              </div>

              {/* Mini visual waveform bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                <div className="w-3/5 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Introduction;
