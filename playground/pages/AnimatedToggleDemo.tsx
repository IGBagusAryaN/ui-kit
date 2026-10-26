import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import { ZapIcon } from "../../src/icons";
import {
  ThemeMorphToggle,
  ElasticGooeyToggle,
  MinimalActionToggle,
  SlidingTextToggle,
  AnimatedToggle,
} from "../../src/components/AnimatedToggle";

const TOGGLE_DICT = {
  en: {
    pillTag1: "Micro-Interactions & Spring Physics",
    pillTag2: "4 Creative Toggle Variants",
    pageTitle: "Animated Toggle",
    pageDescription:
      "A curated suite of 4 distinct, production-ready Toggle (Switch) architectures engineered with Framer Motion and Tailwind CSS. Built with refined spring dynamics, rotating icon crossfades, sliding label animations, and theme-adaptive styling. Fully composable with CVA variants, forwardRef, and strict TypeScript types.",
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
      "Koleksi 4 arsitektur Toggle (Switch) tingkat lanjut berbasis Framer Motion dan Tailwind CSS. Dibangun dengan fisika pegas, transisi rotasi ikon, animasi teks bersinkronisasi vertikal, dan adaptasi tema yang mulus. Mengikuti standar komponen NeedUI dengan forwardRef, CVA, dan TypeScript penuh.",
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

export function AnimatedToggleDemo() {
  const { i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith("id") ? "id" : "en";
  const dict = TOGGLE_DICT[lang] || TOGGLE_DICT.en;

  // State untuk masing-masing demo
  const [themeDark, setThemeDark] = useState(false);
  const [elasticOn, setElasticOn] = useState(false);
  const [actionDark, setActionDark] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const [toggleSize, setToggleSize] = useState<"sm" | "default" | "lg">("default");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Header */}
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

        {/* Global Size Configurator */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {lang === "id" ? "Ukuran Pratinjau:" : "Preview Size:"}
          </span>
          <div className="inline-flex rounded-xl p-1 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700">
            {(["sm", "default", "lg"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setToggleSize(s)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  toggleSize === s
                    ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 shadow-xs font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {/* 1. Theme Morph Toggle */}
        <div className="flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {dict.variants.themeMorph.title}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {dict.variants.themeMorph.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                {dict.variants.themeMorph.description}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-50/40 to-white dark:from-zinc-900/20 dark:to-zinc-950/40 min-h-[180px] border-b border-zinc-100 dark:border-zinc-800">
            <ThemeMorphToggle
              checked={themeDark}
              onChange={setThemeDark}
              size={toggleSize}
            />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {lang === "id" ? "Status Saat Ini:" : "Current State:"}{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {themeDark
                  ? lang === "id" ? "Malam (Dark Mode)" : "Night (Dark Mode)"
                  : lang === "id" ? "Siang (Light Mode)" : "Day (Light Mode)"}
              </strong>
            </span>
          </div>

          <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <CodeSnippet code={dict.variants.themeMorph.snippet} />
          </div>
        </div>

        {/* 2. Elastic Gooey Toggle */}
        <div className="flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {dict.variants.elasticGooey.title}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {dict.variants.elasticGooey.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                {dict.variants.elasticGooey.description}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-50/40 to-white dark:from-zinc-900/20 dark:to-zinc-950/40 min-h-[180px] border-b border-zinc-100 dark:border-zinc-800">
            <ElasticGooeyToggle
              checked={elasticOn}
              onChange={setElasticOn}
              size={toggleSize}
            />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {lang === "id" ? "Status:" : "State:"}{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {elasticOn
                  ? lang === "id" ? "Aktif (ON)" : "Active (ON)"
                  : lang === "id" ? "Nonaktif (OFF)" : "Inactive (OFF)"}
              </strong>
            </span>
          </div>

          <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <CodeSnippet code={dict.variants.elasticGooey.snippet} />
          </div>
        </div>

        {/* 3. Minimal Action Toggle */}
        <div className="flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {dict.variants.minimalAction.title}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {dict.variants.minimalAction.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                {dict.variants.minimalAction.description}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-50/40 to-white dark:from-zinc-900/20 dark:to-zinc-950/40 min-h-[180px] border-b border-zinc-100 dark:border-zinc-800">
            <MinimalActionToggle
              checked={actionDark}
              onChange={setActionDark}
              size={toggleSize}
              lightLabel={lang === "id" ? "Terang" : "Light"}
              darkLabel={lang === "id" ? "Gelap" : "Dark"}
            />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {lang === "id" ? "Mode Terpilih:" : "Selected Mode:"}{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {actionDark ? "Dark Theme" : "Light Theme"}
              </strong>
            </span>
          </div>

          <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <CodeSnippet code={dict.variants.minimalAction.snippet} />
          </div>
        </div>

        {/* 4. Sliding Text Toggle */}
        <div className="flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {dict.variants.slidingText.title}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {dict.variants.slidingText.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                {dict.variants.slidingText.description}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-50/40 to-white dark:from-zinc-900/20 dark:to-zinc-950/40 min-h-[180px] border-b border-zinc-100 dark:border-zinc-800">
            <SlidingTextToggle
              value={selectedPlan}
              onChange={(val) => setSelectedPlan(val as "monthly" | "yearly")}
              size={toggleSize}
              options={[
                { value: "monthly", label: lang === "id" ? "Bulanan" : "Monthly" },
                { value: "yearly", label: lang === "id" ? "Tahunan" : "Annual", badge: "-20%" },
              ]}
            />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {lang === "id" ? "Interval Tagihan:" : "Billing Interval:"}{" "}
              <strong className="text-zinc-800 dark:text-zinc-200 capitalize">
                {selectedPlan === "yearly"
                  ? lang === "id" ? "Ditagih Tahunan (Hemat 20%)" : "Billed Annually (Save 20%)"
                  : lang === "id" ? "Ditagih Bulanan" : "Billed Monthly"}
              </strong>
            </span>
          </div>

          <div className="p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <CodeSnippet code={dict.variants.slidingText.snippet} />
          </div>
        </div>
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
                  "default" | "theme-morph" | "elastic-gooey" | "minimal-action" | "outline"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Pilihan varian animasi saklar toggle (berlaku seragam untuk seluruh varian)."
                    : "Visual motion style variant applied uniformly across toggle presentations."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">checked</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Status on/off atau aktif dalam mode terkontrol (controlled mode)."
                    : "Controlled boolean active/on state."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">defaultChecked</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Status awal saat saklar pertama kali dimuat (uncontrolled mode)."
                    : "Initial switch state on initial mount (uncontrolled mode)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onChange</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">(checked: boolean) =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Callback saat saklar diklik dan mengalami perubahan status."
                    : "Event handler fired when the toggle state changes."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"sm" | "default" | "lg"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Skala dimensi ukuran saklar track dan thumb (CVA)."
                    : "Dimension scaling for track and thumb via CVA."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">disabled</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
                    ? "Menonaktifkan interaksi saklar toggle."
                    : "Disables switch interaction."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {lang === "id"
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

export default AnimatedToggleDemo;
