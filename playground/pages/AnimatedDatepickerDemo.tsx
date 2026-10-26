import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import { ZapIcon, LayersIcon } from "../../src/icons";
import {
  AnimatedDatepicker,
  FluidSwipeCalendar,
  CupertinoWheelDatepicker,
  ElasticTimelineDatepicker,
} from "../../src/components/AnimatedDatepicker";

const DATEPICKER_DICT = {
  en: {
    pillTag1: "Physics & Layout Dynamics",
    pillTag2: "3 Creative Datepicker Variants",
    pageTitle: "Animated Datepickers",
    pageDescription:
      "A sophisticated suite of 3 gesture-driven date selection architectures crafted with Framer Motion and Tailwind CSS. Features directional fluid swipe transitions, a precision iOS-inspired Cupertino drum slot tumbler, and horizontal elastic strip timelines. Fully composable with CVA variants, forwardRef, and strict TypeScript types.",
    variants: {
      fluid: {
        title: "1. Fluid Swipe Calendar (Smooth Month Transition)",
        badge: "Directional Slide & Spring Pop",
        description:
          "Full 7x6 monthly grid where navigating next/prev months executes a directional horizontal swipe with scale and blur transitions powered by AnimatePresence popLayout mode. Selected days trigger a spring-physics circular badge bounce.",
        snippet: `import { useState } from "react";
import { FluidSwipeCalendar } from "@needui/ui-kit";

export function CalendarDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <FluidSwipeCalendar
      value={selected}
      onChange={setSelected}
      showPresets
    />
  );
}`,
      },
      wheel: {
        title: "2. Wheel Scroll Datepicker (iOS Cupertino Wheel)",
        badge: "Cupertino Drum Tumbler",
        description:
          "Pixel-perfect Cupertino 3D wheel picker featuring mathematical vertical slot alignment (40px rhythm), dual soft-gradient fade vignettes, illuminated center aperture highlight, and tactile mouse-wheel / click interaction.",
        snippet: `import { useState } from "react";
import { CupertinoWheelDatepicker } from "@needui/ui-kit";

export function WheelDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <CupertinoWheelDatepicker
      value={selected}
      onChange={setSelected}
      showQuickStepper
    />
  );
}`,
      },
      timeline: {
        title: "3. Elastic Timeline Datepicker (Horizontal Strip Snap)",
        badge: "Draggable Spring Strip",
        description:
          "Horizontal chronological timeline strip supporting smooth horizontal drag and cursor navigation. The active selected date elevates with an elastic spring pop, displaying weekday badges, month indices, and quick jump-to-today controls.",
        snippet: `import { useState } from "react";
import { ElasticTimelineDatepicker } from "@needui/ui-kit";

export function TimelineDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <ElasticTimelineDatepicker
      value={selected}
      onChange={setSelected}
      daysSpan={60}
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
          type: '"fluid" | "wheel" | "timeline"',
          default: '"fluid"',
          description: "Visual layout architecture and interaction mode (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"md"',
          description: "Max-width container constraint for responsive embeds.",
        },
        {
          prop: "value",
          type: "Date",
          default: "undefined",
          description: "Currently selected date object (controlled mode).",
        },
        {
          prop: "defaultValue",
          type: "Date",
          default: "new Date()",
          description: "Initial date if running in uncontrolled mode.",
        },
        {
          prop: "onChange",
          type: "(date: Date) => void",
          default: "undefined",
          description: "Callback invoked when a new date is selected.",
        },
        {
          prop: "minDate",
          type: "Date",
          default: "undefined",
          description: "Minimum selectable threshold date.",
        },
        {
          prop: "maxDate",
          type: "Date",
          default: "undefined",
          description: "Maximum selectable threshold date.",
        },
        {
          prop: "locale",
          type: "string",
          default: '"en-US"',
          description: "BCP 47 language code for month/weekday localization.",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables all user gestures and interactive date changes.",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Custom Tailwind CSS classes applied to root element.",
        },
      ],
    },
  },
  id: {
    pillTag1: "Animasi Fisika & Layout",
    pillTag2: "3 Varian Datepicker Kreatif",
    pageTitle: "Animated Datepickers",
    pageDescription:
      "Koleksi 3 arsitektur pemilihan tanggal berbasis gesture dan animasi fluid menggunakan Framer Motion dan Tailwind CSS. Dilengkapi transisi geser bulan terarah, tumbler roda silinder presisi ala iOS Cupertino, dan timeline horizontal elastis. Mendukung penuh varian CVA, forwardRef, dan type-safety TypeScript.",
    variants: {
      fluid: {
        title: "1. Fluid Swipe Calendar (Smooth Month Transition)",
        badge: "Directional Slide & Spring Pop",
        description:
          "Grid kalender 7x6 bulanan di mana perpindahan bulan berikutnya/sebelumnya memicu efek geser terarah dengan skala dan keburaman halus menggunakan AnimatePresence popLayout. Tanggal aktif memiliki badge melingkar dengan pantulan pegas.",
        snippet: `import { useState } from "react";
import { FluidSwipeCalendar } from "@needui/ui-kit";

export function CalendarDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <FluidSwipeCalendar
      value={selected}
      onChange={setSelected}
      showPresets
    />
  );
}`,
      },
      wheel: {
        title: "2. Wheel Scroll Datepicker (iOS Cupertino Wheel)",
        badge: "Cupertino Drum Tumbler",
        description:
          "Pemilih tanggal silinder presisi tinggi ala Cupertino. Menggunakan ritme vertikal 40px, gradien vignette ganda, aperture tengah beriluminasi, serta navigasi scroll roda mouse yang presisi.",
        snippet: `import { useState } from "react";
import { CupertinoWheelDatepicker } from "@needui/ui-kit";

export function WheelDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <CupertinoWheelDatepicker
      value={selected}
      onChange={setSelected}
      showQuickStepper
    />
  );
}`,
      },
      timeline: {
        title: "3. Elastic Timeline Datepicker (Horizontal Strip Snap)",
        badge: "Draggable Spring Strip",
        description:
          "Strip tanggal kronologis horizontal yang dapat di-drag dengan bebas. Tanggal yang aktif membesar elastis ke atas lengkap dengan nama hari dan penanda hari ini.",
        snippet: `import { useState } from "react";
import { ElasticTimelineDatepicker } from "@needui/ui-kit";

export function TimelineDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <ElasticTimelineDatepicker
      value={selected}
      onChange={setSelected}
      daysSpan={60}
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
          type: '"fluid" | "wheel" | "timeline"',
          default: '"fluid"',
          description: "Gaya arsitektur tata letak dan interaksi animasi datepicker (CVA).",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg" | "full"',
          default: '"md"',
          description: "Batas lebar maksimal kontainer datepicker.",
        },
        {
          prop: "value",
          type: "Date",
          default: "undefined",
          description: "Nilai objek Date yang sedang aktif (controlled mode).",
        },
        {
          prop: "defaultValue",
          type: "Date",
          default: "new Date()",
          description: "Nilai tanggal awal jika digunakan dalam mode uncontrolled.",
        },
        {
          prop: "onChange",
          type: "(date: Date) => void",
          default: "undefined",
          description: "Callback saat pengguna memilih tanggal baru.",
        },
        {
          prop: "minDate",
          type: "Date",
          default: "undefined",
          description: "Batas tanggal minimum yang diizinkan untuk dipilih.",
        },
        {
          prop: "maxDate",
          type: "Date",
          default: "undefined",
          description: "Batas tanggal maksimum yang diizinkan untuk dipilih.",
        },
        {
          prop: "locale",
          type: "string",
          default: '"en-US"',
          description: "Kode bahasa BCP 47 untuk pelokalan nama bulan & hari (contoh 'id-ID').",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "Menonaktifkan seluruh interaksi dan klik pada tanggal.",
        },
        {
          prop: "className",
          type: "string",
          default: "undefined",
          description: "Class utility tambahan Tailwind CSS untuk elemen root.",
        },
      ],
    },
  },
};

export function AnimatedDatepickerDemo() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("id") ? "id" : "en") as
    | "en"
    | "id";
  const t = DATEPICKER_DICT[currentLang] || DATEPICKER_DICT.en;

  // Demo interactive states
  const [fluidDate, setFluidDate] = useState<Date>(new Date(2026, 9, 21));
  const [wheelDate, setWheelDate] = useState<Date>(new Date(2027, 7, 24));
  const [timelineDate, setTimelineDate] = useState<Date>(new Date(2026, 9, 21));

  const datepickerCards = [
    {
      id: "fluid-swipe",
      title: t.variants.fluid.title,
      badge: t.variants.fluid.badge,
      desc: t.variants.fluid.description,
      snippet: t.variants.fluid.snippet,
      component: (
        <FluidSwipeCalendar
          value={fluidDate}
          onChange={setFluidDate}
          showPresets
        />
      ),
    },
    {
      id: "wheel-scroll",
      title: t.variants.wheel.title,
      badge: t.variants.wheel.badge,
      desc: t.variants.wheel.description,
      snippet: t.variants.wheel.snippet,
      component: (
        <CupertinoWheelDatepicker
          value={wheelDate}
          onChange={setWheelDate}
          showQuickStepper
        />
      ),
    },
    {
      id: "elastic-timeline",
      title: t.variants.timeline.title,
      badge: t.variants.timeline.badge,
      desc: t.variants.timeline.description,
      snippet: t.variants.timeline.snippet,
      component: (
        <ElasticTimelineDatepicker
          value={timelineDate}
          onChange={setTimelineDate}
          daysSpan={60}
        />
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

      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {datepickerCards.map((card) => (
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

            <div className="flex items-center justify-center p-2 sm:p-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
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

export default AnimatedDatepickerDemo;
