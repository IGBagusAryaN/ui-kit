import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  SunIcon,
  MoonIcon,
  ZapIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

const TOGGLE_DICT = {
  en: {
    pillTag1: "Micro-Interactions & Spring Physics",
    pillTag2: "4 Creative Toggle Variants",
    pageTitle: "Animated Toggle",
    pageDescription:
      "A curated suite of 4 distinct, production-ready Toggle (Switch) architectures engineered with Framer Motion and Tailwind CSS. Built with refined spring dynamics, rotating icon crossfades, sliding label animations, and theme-adaptive styling.",
    variants: {
      themeMorph: {
        title: "1. Theme Morph Toggle (Sun/Moon Icon Shift)",
        badge: "Light / Dark Specialist",
        description:
          "Dedicated theme switcher where the circular thumb glides between day and night modes. Inside the thumb, the Sun icon smoothly rotates, scales, and morphs into a glowing Moon with ambient background star embers.",
        snippet: `import { useState } from "react";
import { ThemeMorphToggle } from "@needui/ui-kit";

export function Example() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeMorphToggle
      checked={isDark}
      onChange={setIsDark}
    />
  );
}`,
      },
      elasticGooey: {
        title: "2. Elastic Gooey Toggle (Physics Stretch)",
        badge: "Squash & Stretch Dynamics",
        description:
          "Minimalist switch applying classic Disney animation principles. While traveling between states, the thumb elongates horizontally and compresses vertically to emulate fluid surface tension before snapping into a circle.",
        snippet: `import { useState } from "react";
import { ElasticGooeyToggle } from "@needui/ui-kit";

export function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <ElasticGooeyToggle
      checked={isOn}
      onChange={setIsOn}
    />
  );
}`,
      },
      minimalAction: {
        title: "3. Minimal Action Toggle (Rotating Icon & Slide-Fade Label)",
        badge: "Navbar & Control Bar Favorite",
        description:
          "Compact tactile pill button inspired by the documentation navbar theme switcher. Pairs a 90° rotating icon crossfade with a synchronized vertical text slide, micro-spring click feedback, and high-contrast border styling.",
        snippet: `import { useState } from "react";
import { MinimalActionToggle } from "@needui/ui-kit";

export function Example() {
  const [isDark, setIsDark] = useState(false);

  return (
    <MinimalActionToggle
      checked={isDark}
      onChange={setIsDark}
    />
  );
}`,
      },
      slidingText: {
        title: "4. Sliding Text Toggle (Segmented Pill)",
        badge: "Layout Projection (layoutId)",
        description:
          "Segmented pill switch with two dual status labels ('Monthly' and 'Annual'). A smooth background highlight pill glides behind the active option using Framer Motion's layout projection, shifting text contrast automatically.",
        snippet: `import { useState } from "react";
import { SlidingTextToggle } from "@needui/ui-kit";

export function Example() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <SlidingTextToggle
      value={plan}
      onChange={setPlan}
    />
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Mikro-Interaksi & Fisika Spring",
    pillTag2: "4 Variasi Toggle Kreatif",
    pageTitle: "Animated Toggle",
    pageDescription:
      "Koleksi 4 arsitektur Toggle (Switch) tingkat lanjut berbasis Framer Motion dan Tailwind CSS. Dibangun dengan fisika pegas, transisi rotasi ikon, animasi teks bersinkronisasi vertikal, dan adaptasi tema yang mulus.",
    variants: {
      themeMorph: {
        title: "1. Theme Morph Toggle (Pergeseran Ikon Sun/Moon)",
        badge: "Spesialis Terang / Gelap",
        description:
          "Saklar mode gelap khusus di mana thumb meluncur antara siang dan malam. Di dalam thumb, ikon Sun berputar halus, mengecil, lalu bertransformasi menjadi Moon bercahaya dengan partikel latar bintang.",
        snippet: `import { useState } from "react";
import { ThemeMorphToggle } from "@needui/ui-kit";

export function Example() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeMorphToggle
      checked={isDark}
      onChange={setIsDark}
    />
  );
}`,
      },
      elasticGooey: {
        title: "2. Elastic Gooey Toggle (Peregangan Fisika)",
        badge: "Dinamika Squash & Stretch",
        description:
          "Switch minimalis yang menerapkan prinsip animasi Disney. Saat berpindah, thumb memanjang secara horizontal dan memampat secara vertikal sebelum kembali bulat sempurna saat mencapai tujuan.",
        snippet: `import { useState } from "react";
import { ElasticGooeyToggle } from "@needui/ui-kit";

export function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <ElasticGooeyToggle
      checked={isOn}
      onChange={setIsOn}
    />
  );
}`,
      },
      minimalAction: {
        title: "3. Minimal Action Toggle (Rotasi Ikon & Teks Geser)",
        badge: "Gaya Navbar & Kontrol Bar",
        description:
          "Tombol kapsul taktil ringkas yang terinspirasi dari switcher tema navbar dokumentasi. Memadukan crossfade ikon berputar 90° dengan transisi teks geser vertikal dan efek haptic klik halus.",
        snippet: `import { useState } from "react";
import { MinimalActionToggle } from "@needui/ui-kit";

export function Example() {
  const [isDark, setIsDark] = useState(false);

  return (
    <MinimalActionToggle
      checked={isDark}
      onChange={setIsDark}
    />
  );
}`,
      },
      slidingText: {
        title: "4. Sliding Text Toggle (Segmented Pill)",
        badge: "Proyeksi Layout (layoutId)",
        description:
          "Switch kapsul tersegmentasi dengan label ganda ('Monthly' dan 'Annual'). Blok latar belakang bergeser halus di balik teks menggunakan layout projection Framer Motion.",
        snippet: `import { useState } from "react";
import { SlidingTextToggle } from "@needui/ui-kit";

export function Example() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <SlidingTextToggle
      value={plan}
      onChange={setPlan}
    />
  );
}`,
      },
    },
  },
};

function ThemeMorphToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={() => setIsDark((prev) => !prev)}
        className={cn(
          "relative w-20 h-11 p-1.5 rounded-full transition-colors duration-300 outline-none flex items-center cursor-pointer select-none shadow-inner",
          isDark
            ? "bg-indigo-950 border border-indigo-700/60 shadow-indigo-950/50"
            : "bg-sky-200 border border-sky-300 shadow-sky-300/40"
        )}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <span className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" />
            <span className="absolute bottom-2.5 left-5 w-1 h-1 bg-indigo-200 rounded-full opacity-50" />
            <span className="absolute top-3 left-7 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
          </motion.div>
          <motion.div
            animate={{ opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <span className="absolute top-2.5 right-3 w-3 h-1.5 bg-white/70 rounded-full" />
            <span className="absolute bottom-2 right-5 w-4 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>

        <motion.div
          animate={{ x: isDark ? 36 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors",
            isDark
              ? "bg-indigo-600 text-indigo-100 shadow-indigo-900/60"
              : "bg-amber-400 text-amber-950 shadow-amber-500/40"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <MoonIcon size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <SunIcon size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Current: <strong className="text-zinc-800 dark:text-zinc-200">{isDark ? "Night (Dark)" : "Day (Light)"}</strong>
      </span>
    </div>
  );
}

function ElasticGooeyToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={() => setIsOn((prev) => !prev)}
        className={cn(
          "relative w-20 h-11 p-1.5 rounded-full transition-colors duration-300 outline-none flex items-center cursor-pointer select-none",
          isOn
            ? "bg-zinc-900 dark:bg-zinc-100"
            : "bg-zinc-200 dark:bg-zinc-800"
        )}
      >
        <motion.div
          animate={{
            x: isOn ? 36 : 0,
            scaleX: [1, 1.45, 1],
            scaleY: [1, 0.72, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 24,
          }}
          className={cn(
            "w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors",
            isOn
              ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
              : "bg-white text-zinc-400 dark:bg-zinc-300 dark:text-zinc-700"
          )}
        >
          <motion.div
            animate={{ scale: isOn ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              isOn ? "bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-500"
            )}
          />
        </motion.div>
      </button>

      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        State: <strong className="text-zinc-800 dark:text-zinc-200">{isOn ? "Active (Stretched)" : "Resting (Snap)"}</strong>
      </span>
    </div>
  );
}

function MinimalActionToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsDark((prev) => !prev)}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer select-none"
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0.35, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.35, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-amber-400"
              >
                <MoonIcon size={15} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0.35, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.35, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-amber-500"
              >
                <SunIcon size={15} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-4 overflow-hidden relative min-w-[38px] text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "Dark" : "Light"}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="block leading-4 font-bold"
            >
              {isDark ? "Dark" : "Light"}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>

      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Status: <strong className="text-zinc-800 dark:text-zinc-200">{isDark ? "Dark Mode Active" : "Light Mode Active"}</strong>
      </span>
    </div>
  );
}

function SlidingTextToggle() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-inner">
        {(["monthly", "yearly"] as const).map((plan) => {
          const isActive = selectedPlan === plan;
          return (
            <button
              key={plan}
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className="relative px-5 py-2 text-xs font-semibold rounded-full transition-colors z-10 cursor-pointer select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="slidingPlanHighlight"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-700"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 transition-colors duration-150 flex items-center gap-1.5",
                  isActive
                    ? "text-zinc-950 dark:text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {plan === "monthly" ? "Monthly" : "Annual"}
                {plan === "yearly" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    -20%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Billing interval:{" "}
        <strong className="text-zinc-800 dark:text-zinc-200 capitalize">
          {selectedPlan === "yearly" ? "Billed Annually" : "Billed Monthly"}
        </strong>
      </span>
    </div>
  );
}

export function AnimatedToggleDemo() {
  const { i18n } = useTranslation();
  const lang = (i18n.language && i18n.language.startsWith("id")) ? "id" : "en";
  const dict = TOGGLE_DICT[lang] || TOGGLE_DICT.en;

  const variantsList = [
    {
      id: "theme-morph",
      meta: dict.variants.themeMorph,
      component: <ThemeMorphToggle />,
      snippet: TOGGLE_DICT.en.variants.themeMorph.snippet,
    },
    {
      id: "elastic-gooey",
      meta: dict.variants.elasticGooey,
      component: <ElasticGooeyToggle />,
      snippet: TOGGLE_DICT.en.variants.elasticGooey.snippet,
    },
    {
      id: "minimal-action",
      meta: dict.variants.minimalAction,
      component: <MinimalActionToggle />,
      snippet: TOGGLE_DICT.en.variants.minimalAction.snippet,
    },
    {
      id: "sliding-text",
      meta: dict.variants.slidingText,
      component: <SlidingTextToggle />,
      snippet: TOGGLE_DICT.en.variants.slidingText.snippet,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
          <ZapIcon size={13} className="text-amber-500" />
          <span>{dict.pillTag1}</span>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <span>{dict.pillTag2}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {dict.pageTitle}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          {dict.pageDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {variantsList.map((v) => (
          <div
            key={v.id}
            className="flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {v.meta.title}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {v.meta.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                  {v.meta.description}
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 flex items-center justify-center bg-gradient-to-b from-zinc-50/40 to-white dark:from-zinc-900/20 dark:to-zinc-950/40 min-h-[180px] border-b border-zinc-100 dark:border-zinc-800">
              {v.component}
            </div>

            <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
              <CodeSnippet
                code={v.snippet}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimatedToggleDemo;
