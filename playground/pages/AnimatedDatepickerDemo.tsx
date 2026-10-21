import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RefreshCwIcon,
  ZapIcon,
  LayersIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

/* =========================================================================
 * I18N DICTIONARY FOR ANIMATED DATEPICKERS (BILINGUAL EN & ID - 3 VARIANTS)
 * ========================================================================= */
const DATEPICKER_DICT = {
  en: {
    pillTag1: "Physics & Layout Dynamics",
    pillTag2: "3 Creative Datepicker Variants",
    pageTitle: "Animated Datepickers",
    pageDescription:
      "A sophisticated suite of 3 advanced, gesture-driven date selection architectures crafted with Framer Motion and Tailwind CSS. Featuring directional fluid swipe transitions, a precision iOS-inspired Cupertino drum slot tumbler, and horizontal elastic strip timelines.",
    common: {
      selectedDate: "Selected Date",
      today: "Today",
      tomorrow: "Tomorrow",
      nextWeek: "Next Week",
      confirm: "Confirm Date",
      close: "Close",
      reset: "Reset to Today",
      month: "Month",
      day: "Day",
      year: "Year",
    },
    variants: {
      fluid: {
        title: "1. Fluid Swipe Calendar (Smooth Month Transition)",
        badge: "Directional Slide & Spring Pop",
        description:
          "Full 7x6 monthly grid where navigating next/prev months executes a directional horizontal swipe with scale and blur transitions powered by AnimatePresence popLayout mode. Selected days trigger a spring-physics circular badge bounce.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FluidSwipeCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 21));
  const [direction, setDirection] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 9, 21));

  const changeMonth = (offset: number) => {
    setDirection(offset);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 350, damping: 28 } },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, scale: 0.96, transition: { duration: 0.2 } }),
  };

  return (
    <div className="w-80 rounded-2xl p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <span className="font-bold">{currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="grid grid-cols-7 gap-1"
        >
          {/* Calendar Day Cells */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}`,
      },
      wheel: {
        title: "2. Wheel Scroll Datepicker (iOS Cupertino Wheel)",
        badge: "Cupertino Drum Tumbler",
        description:
          "Pixel-perfect Cupertino 3D wheel picker featuring mathematical vertical slot alignment (40px rhythm), dual soft-gradient fade vignettes, illuminated center aperture highlight, and tactile mouse-wheel / click interaction.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function CupertinoWheelDatepicker() {
  const [month, setMonth] = useState(7); // Aug
  const [day, setDay] = useState(24);
  const [year, setYear] = useState(2027);

  return (
    <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="relative h-[200px] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950">
        {/* Center Optical Aperture */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-10 rounded-xl bg-indigo-50/80 border border-indigo-200 pointer-events-none" />
        {/* Soft Vignette Gradients (Top & Bottom) */}
        {/* 3 Drum Columns: Month, Day, Year */}
      </div>
    </div>
  );
}`,
      },
      timeline: {
        title: "3. Elastic Timeline Datepicker (Horizontal Strip Snap)",
        badge: "Draggable Spring Strip",
        description:
          "Horizontal chronological timeline strip supporting smooth horizontal drag and cursor navigation. The active selected date elevates with an elastic spring pop, displaying weekday badges, month indices, and quick jump-to-today controls.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function ElasticTimelineDatepicker({ dates }) {
  const [activeDate, setActiveDate] = useState(dates[7]);

  return (
    <div className="overflow-hidden w-full max-w-xl">
      <motion.div drag="x" dragConstraints={{ left: -600, right: 0 }} className="flex gap-2">
        {dates.map((date) => {
          const isSelected = date.getTime() === activeDate.getTime();
          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => setActiveDate(date)}
              animate={{
                scale: isSelected ? 1.08 : 1,
                y: isSelected ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="flex flex-col items-center p-3 rounded-2xl min-w-[64px]"
            >
              <span className="text-xs uppercase">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Animasi Fisika & Layout",
    pillTag2: "3 Varian Datepicker Kreatif",
    pageTitle: "Animated Datepickers",
    pageDescription:
      "Koleksi 3 arsitektur pemilihan tanggal berbasis gesture dan animasi fluid menggunakan Framer Motion dan Tailwind CSS. Dilengkapi transisi geser bulan terarah, tumbler roda silinder presisi ala iOS Cupertino, dan timeline horizontal elastis.",
    common: {
      selectedDate: "Tanggal Terpilih",
      today: "Hari Ini",
      tomorrow: "Besok",
      nextWeek: "Minggu Depan",
      confirm: "Konfirmasi Tanggal",
      close: "Tutup",
      reset: "Kembali ke Hari Ini",
      month: "Bulan",
      day: "Hari",
      year: "Tahun",
    },
    variants: {
      fluid: {
        title: "1. Fluid Swipe Calendar (Smooth Month Transition)",
        badge: "Directional Slide & Spring Pop",
        description:
          "Grid kalender 7x6 bulanan di mana perpindahan bulan berikutnya/sebelumnya memicu efek geser terarah dengan skala dan keburaman halus menggunakan AnimatePresence popLayout. Tanggal aktif memiliki badge melingkar dengan pantulan pegas.",
        snippet: `// Gunakan mode popLayout pada AnimatePresence untuk transisi bulan yang halus`,
      },
      wheel: {
        title: "2. Wheel Scroll Datepicker (iOS Cupertino Wheel)",
        badge: "Cupertino Drum Tumbler",
        description:
          "Pemilih tanggal silinder presisi tinggi ala Cupertino. Menggunakan ritme vertikal 40px, gradien vignette ganda, aperture tengah beriluminasi, serta navigasi scroll roda mouse yang presisi.",
        snippet: `// Drum slot dengan ritme baris 40px dan gradien vignette halus`,
      },
      timeline: {
        title: "3. Elastic Timeline Datepicker (Horizontal Strip Snap)",
        badge: "Draggable Spring Strip",
        description:
          "Strip tanggal kronologis horizontal yang dapat di-drag dengan bebas. Tanggal yang aktif membesar elastis ke atas lengkap dengan nama hari dan penanda hari ini.",
        snippet: `// Gunakan drag="x" dengan batasan dragConstraints dan animasi spring skala`,
      },
    },
  },
};

/* =========================================================================
 * HELPER DATE UTILITIES
 * ========================================================================= */
const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatFullDate(d: Date): string {
  const dayName = WEEKDAY_NAMES_EN[d.getDay()];
  const monthName = MONTH_NAMES_EN[d.getMonth()];
  return `${dayName}, ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/* =========================================================================
 * 1. FLUID SWIPE CALENDAR
 * ========================================================================= */
function FluidSwipeCalendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(2026, 9, 1) // Oct 2026
  );
  const [direction, setDirection] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(2026, 9, 21) // Oct 21, 2026
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const changeMonth = (offset: number) => {
    setDirection(offset);
    setCurrentMonth(new Date(year, month + offset, 1));
  };

  const jumpTo = (daysOffset: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysOffset);
    setSelectedDate(target);
    setCurrentMonth(new Date(target.getFullYear(), target.getMonth(), 1));
    setDirection(target > currentMonth ? 1 : -1);
  };

  // Generate 42 calendar grid cells (6 rows x 7 days)
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(year, month);
    const prevMonthTotalDays = getDaysInMonth(year, month - 1);

    const cells: { date: Date; isCurrentMonth: boolean; key: string }[] = [];

    // Preceding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthTotalDays - i);
      cells.push({ date: d, isCurrentMonth: false, key: `prev-${d.getTime()}` });
    }

    // Days in current month
    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      cells.push({ date: d, isCurrentMonth: true, key: `cur-${day}` });
    }

    // Trailing days from next month to reach 42 cells
    const remaining = 42 - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const d = new Date(year, month + 1, day);
      cells.push({ date: d, isCurrentMonth: false, key: `next-${day}` });
    }

    return cells;
  }, [year, month]);

  const monthSlideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 30,
        mass: 0.8,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      transition: { duration: 0.2, ease: "easeInOut" },
    }),
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl shadow-zinc-200/30 dark:shadow-zinc-950/50">
      {/* Month Navigator Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span>{MONTH_NAMES_EN[month]}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
              {year}
            </span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Swipe left or right to navigate months
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => changeMonth(-1)}
            aria-label="Previous Month"
            className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xs transition"
          >
            <ChevronLeftIcon size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => changeMonth(1)}
            aria-label="Next Month"
            className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xs transition"
          >
            <ChevronRightIcon size={16} />
          </motion.button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
          <span
            key={day}
            className={cn(
              "text-[11px] font-mono font-semibold py-1",
              idx === 0 || idx === 6
                ? "text-rose-500/80 dark:text-rose-400/80"
                : "text-zinc-400 dark:text-zinc-500"
            )}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Fluid Animated Grid Viewport */}
      <div className="relative overflow-hidden min-h-[260px]">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={`${year}-${month}`}
            custom={direction}
            variants={monthSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-7 gap-1 sm:gap-1.5"
          >
            {calendarDays.map((cell) => {
              const selected = isSameDay(cell.date, selectedDate);
              const isToday = isSameDay(cell.date, new Date());

              return (
                <button
                  key={cell.key}
                  onClick={() => setSelectedDate(cell.date)}
                  className={cn(
                    "relative flex flex-col items-center justify-center h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-medium transition-colors select-none",
                    cell.isCurrentMonth
                      ? "text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white"
                      : "text-zinc-300 dark:text-zinc-600 hover:text-zinc-500",
                    selected && "text-white font-bold dark:text-white"
                  )}
                >
                  {/* Active Spring Bouncing Background Pill */}
                  {selected && (
                    <motion.div
                      layoutId="fluid-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-md shadow-indigo-500/30 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 28,
                      }}
                    />
                  )}

                  <span>{cell.date.getDate()}</span>

                  {/* Indicator Dot for Today */}
                  {isToday && !selected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Action Chips & Selection Readout */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => jumpTo(0)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
          >
            Today
          </button>
          <button
            onClick={() => jumpTo(1)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
          >
            Tomorrow
          </button>
          <button
            onClick={() => jumpTo(7)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
          >
            +7 Days
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {selectedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 2. WHEEL SCROLL DATEPICKER (iOS CUPERTINO WHEEL - PRECISE & CLEAN)
 * ========================================================================= */
const MONTHS_LIST = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const YEARS_LIST = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

interface CupertinoDrumColumnProps<T> {
  items: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  formatItem?: (item: T) => string;
}

function CupertinoDrumColumn<T>({
  items,
  selectedIndex,
  onSelect,
  formatItem = (item) => String(item),
}: CupertinoDrumColumnProps<T>) {
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 15 && selectedIndex < items.length - 1) {
      onSelect(selectedIndex + 1);
    } else if (e.deltaY < -15 && selectedIndex > 0) {
      onSelect(selectedIndex - 1);
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="relative h-full flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {items.map((item, idx) => {
        const offset = idx - selectedIndex;
        // Strictly show exactly 5 slots: -2, -1, 0, 1, 2
        if (Math.abs(offset) > 2) return null;

        // Exact 40px slot step ensures ZERO overlap with the 40px center aperture
        const y = offset * 40;
        const isCenter = offset === 0;

        return (
          <motion.div
            key={idx}
            onClick={() => onSelect(idx)}
            animate={{
              y,
              scale: isCenter ? 1 : Math.abs(offset) === 1 ? 0.92 : 0.82,
              opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.55 : 0.25,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className={cn(
              "absolute inset-x-0 h-10 flex items-center justify-center transition-colors text-center",
              isCenter
                ? "font-bold text-base sm:text-lg text-indigo-600 dark:text-indigo-400"
                : "font-medium text-sm text-zinc-500 dark:text-zinc-400"
            )}
          >
            {formatItem(item)}
          </motion.div>
        );
      })}
    </div>
  );
}

function WheelScrollDatepicker() {
  // Preset default: August 24, 2027
  const [monthIndex, setMonthIndex] = useState(7); // Aug (index 7)
  const [dayIndex, setDayIndex] = useState(23); // 24th (index 23)
  const [yearIndex, setYearIndex] = useState(4); // 2027 (index 4 in [2023..2031])

  const selectedYear = YEARS_LIST[yearIndex] ?? 2027;
  const maxDays = getDaysInMonth(selectedYear, monthIndex);
  const daysList = useMemo(
    () => Array.from({ length: maxDays }, (_, i) => i + 1),
    [maxDays]
  );

  // Guard against month changes shortening available days
  useEffect(() => {
    if (dayIndex >= maxDays) {
      setDayIndex(maxDays - 1);
    }
  }, [maxDays, dayIndex]);

  const selectedDate = new Date(
    selectedYear,
    monthIndex,
    daysList[dayIndex] || 1
  );

  const resetToToday = () => {
    const today = new Date();
    setMonthIndex(today.getMonth());
    setDayIndex(today.getDate() - 1);
    const yrIdx = YEARS_LIST.indexOf(today.getFullYear());
    if (yrIdx !== -1) setYearIndex(yrIdx);
  };

  const stepSelection = (unit: "month" | "day" | "year", delta: number) => {
    if (unit === "month") {
      const next = Math.max(0, Math.min(MONTHS_LIST.length - 1, monthIndex + delta));
      setMonthIndex(next);
    } else if (unit === "day") {
      const next = Math.max(0, Math.min(daysList.length - 1, dayIndex + delta));
      setDayIndex(next);
    } else if (unit === "year") {
      const next = Math.max(0, Math.min(YEARS_LIST.length - 1, yearIndex + delta));
      setYearIndex(next);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-zinc-950/50">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ClockIcon size={16} />
          </div>
          <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            iOS Cupertino Wheel
          </span>
        </div>

        <button
          onClick={resetToToday}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
        >
          <RefreshCwIcon size={13} />
          <span>Today</span>
        </button>
      </div>

      {/* Outer Chamber Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800/80">
        {/* Column Labels */}
        <div className="grid grid-cols-3 mb-2 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            MONTH
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            DAY
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            YEAR
          </span>
        </div>

        {/* 200px Unified Drum Viewport with Gradient Masks & Aperture */}
        <div className="relative h-[200px] overflow-hidden rounded-xl bg-white/40 dark:bg-zinc-900/30">
          {/* Exact Center Aperture Highlight (40px height matching row rhythm) */}
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-10 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 pointer-events-none z-0 shadow-xs" />

          {/* Top Vignette Fade Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-zinc-50 dark:from-zinc-950 via-zinc-50/70 dark:via-zinc-950/70 to-transparent z-20" />

          {/* Bottom Vignette Fade Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-zinc-50/70 dark:via-zinc-950/70 to-transparent z-20" />

          {/* 3 Drum Columns */}
          <div className="grid grid-cols-3 h-full relative z-10">
            <CupertinoDrumColumn
              items={MONTHS_LIST}
              selectedIndex={monthIndex}
              onSelect={setMonthIndex}
            />

            <CupertinoDrumColumn
              items={daysList}
              selectedIndex={dayIndex}
              onSelect={setDayIndex}
            />

            <CupertinoDrumColumn
              items={YEARS_LIST}
              selectedIndex={yearIndex}
              onSelect={setYearIndex}
            />
          </div>
        </div>

        {/* Tactile Stepper Quick Buttons */}
        <div className="mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-mono">Quick Stepper:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => stepSelection("day", -1)}
              className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium"
            >
              - Day
            </button>
            <button
              onClick={() => stepSelection("day", 1)}
              className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium"
            >
              + Day
            </button>
            <button
              onClick={() => stepSelection("month", 1)}
              className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium"
            >
              + Month
            </button>
          </div>
        </div>
      </div>

      {/* Output Value Bar */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="text-zinc-400 dark:text-zinc-500 font-mono">
          Output Value:
        </span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/90 px-3 py-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
          {formatFullDate(selectedDate)}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
 * 3. ELASTIC TIMELINE DATEPICKER (HORIZONTAL STRIP SNAP)
 * ========================================================================= */
function ElasticTimelineDatepicker() {
  const baseDate = useMemo(() => new Date(2026, 9, 21), []);
  const [selectedDate, setSelectedDate] = useState<Date>(baseDate);

  const timelineDates = useMemo(() => {
    const list: Date[] = [];
    for (let i = -7; i <= 20; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      list.push(d);
    }
    return list;
  }, [baseDate]);

  const stripRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const jumpToToday = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl">
      {/* Header with Month / Year and Navigation Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
            Chronological Strip
          </span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {MONTH_NAMES_EN[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={jumpToToday}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Today
          </button>

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => scrollByAmount(-180)}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition"
            >
              <ChevronLeftIcon size={16} />
            </button>
            <button
              onClick={() => scrollByAmount(180)}
              className="p-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable & Scrollable Horizontal Strip */}
      <div
        ref={stripRef}
        className="overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -400, right: 0 }}
          dragElastic={0.12}
          className="flex items-center gap-2.5 w-max"
        >
          {timelineDates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            const dayOfWeek = WEEKDAY_NAMES_EN[date.getDay()].slice(0, 3);

            return (
              <motion.button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  y: isSelected ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[62px] sm:min-w-[68px] py-3.5 px-2 rounded-2xl border transition select-none",
                  isSelected
                    ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                    : "bg-zinc-50 dark:bg-zinc-950/70 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                {/* Active Indicator Glow */}
                {isSelected && (
                  <motion.div
                    layoutId="timeline-glow"
                    className="absolute -top-1 w-2 h-2 rounded-full bg-white shadow-xs"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-wider",
                    isSelected
                      ? "text-indigo-100 font-bold"
                      : "text-zinc-400 dark:text-zinc-500"
                  )}
                >
                  {dayOfWeek}
                </span>

                <span
                  className={cn(
                    "text-xl sm:text-2xl font-extrabold my-1",
                    isSelected ? "text-white" : "text-zinc-800 dark:text-zinc-100"
                  )}
                >
                  {date.getDate()}
                </span>

                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isSelected
                      ? "text-indigo-200"
                      : "text-zinc-400 dark:text-zinc-500"
                  )}
                >
                  {MONTH_NAMES_EN[date.getMonth()].slice(0, 3)}
                </span>

                {isToday && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Selected Preview Card */}
      <div className="mt-5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {selectedDate.getDate()}
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {formatFullDate(selectedDate)}
            </h4>
            <p className="text-[11px] text-zinc-500">
              Elastic snap calibrated with fluid physics
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/60">
          Week {Math.ceil(selectedDate.getDate() / 7)}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN PAGE COMPONENT: ANIMATED DATEPICKER DEMO (3 CLEAN VARIANTS)
 * ========================================================================= */
export function AnimatedDatepickerDemo() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("id") ? "id" : "en") as
    | "en"
    | "id";
  const t = DATEPICKER_DICT[currentLang] || DATEPICKER_DICT.en;

  const datepickerCards = [
    {
      id: "fluid-swipe",
      title: t.variants.fluid.title,
      badge: t.variants.fluid.badge,
      desc: t.variants.fluid.description,
      snippet: t.variants.fluid.snippet,
      component: <FluidSwipeCalendar />,
    },
    {
      id: "wheel-scroll",
      title: t.variants.wheel.title,
      badge: t.variants.wheel.badge,
      desc: t.variants.wheel.description,
      snippet: t.variants.wheel.snippet,
      component: <WheelScrollDatepicker />,
    },
    {
      id: "elastic-timeline",
      title: t.variants.timeline.title,
      badge: t.variants.timeline.badge,
      desc: t.variants.timeline.description,
      snippet: t.variants.timeline.snippet,
      component: <ElasticTimelineDatepicker />,
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

      {/* Single Column Stack of All 3 Datepicker Architectures */}
      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {datepickerCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            {/* Header Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </h2>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 font-semibold">
                  {card.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {card.desc}
              </p>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="flex items-center justify-center p-4 sm:p-8 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
              {card.component}
            </div>

            {/* Standardized Usage Snippet (No Framework Tabs) */}
            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default AnimatedDatepickerDemo;
