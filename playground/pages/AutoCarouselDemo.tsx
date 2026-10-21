import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  ZapIcon,
  LayersIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

/* =========================================================================
 * I18N DICTIONARY FOR AUTO CAROUSELS (BILINGUAL EN & ID - 4 VARIANTS)
 * ========================================================================= */
const CAROUSEL_DICT = {
  en: {
    pillTag1: "Time-Driven Progress Dynamics",
    pillTag2: "4 Auto-Progress Variants",
    pageTitle: "Auto-Progress Carousels",
    pageDescription:
      "A premier collection of 4 automated, progress-timed carousel architectures built with Framer Motion and Tailwind CSS. Featuring vertical linear list fills inspired by the Epic Games Store, horizontal underline tab progress, morphing glass capsule pills, and SVG circular countdown dials.",
    controls: {
      prev: "Previous Slide",
      next: "Next Slide",
      pause: "Pause Auto-play",
      resume: "Resume Auto-play",
      clickHint: "Click any item, tab, or indicator to jump immediately & restart timer",
      slide: "Slide",
      of: "of",
    },
    variants: {
      epic: {
        title: "1. Epic Store Vertical Progress Sidebar",
        badge: "Epic Games Store Style",
        description:
          "Split layout carousel where the 75% left hero viewport displays the featured showcase with title and CTA, while the 25% right vertical list item acts as an active timer, filling its background from left to right over 5 seconds before advancing.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EpicSidebarCarousel({ slides }) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-2xl overflow-hidden">
      {/* Left 75% Hero Viewport */}
      <div className="lg:col-span-3 relative h-96 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[active].id}
            src={slides[active].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Right 25% Vertical Progress List */}
      <div className="flex flex-col gap-2">
        {slides.map((slide, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={slide.id}
              onClick={() => setActive(idx)}
              className="relative p-3 rounded-xl overflow-hidden text-left bg-zinc-900 border"
            >
              {isActive && (
                <motion.div
                  key={idx}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={handleNext}
                  className="absolute inset-0 bg-white/15"
                />
              )}
              <span className="relative z-10 font-bold">{slide.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      tabs: {
        title: "2. Auto-Tabs Carousel (Horizontal Underline Fill)",
        badge: "Horizontal Text Tabs",
        description:
          "Enterprise feature showcase displaying a main interactive canvas with horizontal text navigation tabs underneath. A smooth underline progress line fills from 0 to 100% of the active tab width before transitioning to the next feature.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AutoTabsCarousel({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full space-y-6">
      <div className="relative h-80 rounded-2xl overflow-hidden border">
        <AnimatePresence mode="wait">
          <motion.img
            key={tabs[active].id}
            src={tabs[active].image}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActive(idx)}
            className="relative pb-3 text-left"
          >
            <h4 className="font-bold text-sm">{tab.title}</h4>
            <p className="text-xs text-zinc-500">{tab.tagline}</p>
            {active === idx && (
              <motion.div
                key={idx}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
                onAnimationComplete={() => setActive((active + 1) % tabs.length)}
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}`,
      },
      pills: {
        title: "3. Dynamic Pill Carousel (Expanding Dot Fill)",
        badge: "Morphing Glass Capsule",
        description:
          "Panoramic visual carousel featuring a floating glassmorphism pill capsule dock. Inactive slides appear as subtle circular dots, while the active slide expands into a capsule whose inner track fills with a glowing gradient over 3.5 seconds.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DynamicPillCarousel({ items }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative h-96 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={items[index].id}
          src={items[index].image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Floating Glassmorphism Pill Dock */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative cursor-pointer"
            >
              {index === i ? (
                <div className="w-14 h-2.5 rounded-full bg-white/20 overflow-hidden relative">
                  <motion.div
                    key={i}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    onAnimationComplete={() => setIndex((index + 1) % items.length)}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      },
      radial: {
        title: "4. Radial Progress Carousel (Circular Dial Timer)",
        badge: "SVG Stroke-Dashoffset Dial",
        description:
          "Luxury engineering layout with specs on the left and imagery on the right. An animated SVG circular dial counts down 360 degrees using synchronized stroke-dashoffset transitions, seamlessly triggering the next slide upon completion.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RadialProgressCarousel({ slides }) {
  const [active, setActive] = useState(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 border rounded-2xl">
      <div>
        <div className="flex items-center gap-3 mb-4">
          {/* Circular SVG Timer */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r={radius} className="stroke-zinc-800" strokeWidth="3" fill="none" />
              <motion.circle
                key={active}
                cx="22"
                cy="22"
                r={radius}
                stroke="currentColor"
                className="text-indigo-500"
                strokeWidth="3"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                onAnimationComplete={() => setActive((active + 1) % slides.length)}
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold">{active + 1}</span>
          </div>
          <span className="text-xs uppercase font-mono text-zinc-500">Auto-Cycle Dial</span>
        </div>
        <h3 className="text-2xl font-bold">{slides[active].title}</h3>
      </div>

      <div className="h-72 rounded-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[active].id}
            src={slides[active].image}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Dinamika Waktu Berbasis Progres",
    pillTag2: "4 Varian Progres Otomatis",
    pageTitle: "Carousel Progres Otomatis",
    pageDescription:
      "Rangkaian 4 arsitektur carousel otomatis dengan indikator progres waktu terpadu yang dibangun dengan Framer Motion dan Tailwind CSS. Menghadirkan bilah progres vertikal linier gaya Epic Games Store, garis tab horizontal, kapsul dot kaca melebar dinamis, dan dial penghitung waktu radial SVG melingkar.",
    controls: {
      prev: "Slide Sebelumnya",
      next: "Slide Berikutnya",
      pause: "Jeda Putar Otomatis",
      resume: "Lanjutkan Putar Otomatis",
      clickHint: "Klik item, tab, atau indikator untuk langsung berpindah & me-reset timer",
      slide: "Slide",
      of: "dari",
    },
    variants: {
      epic: {
        title: "1. Epic Store Vertical Progress Sidebar",
        badge: "Gaya Epic Games Store",
        description:
          "Layout terbagi di mana 75% hero sisi kiri menampilkan showcase utama lengkap dengan judul dan CTA, sementara daftar vertikal di sisi kanan 25% bertindak sebagai timer aktif yang mengisi latar belakangnya dari kiri ke kanan selama 5 detik sebelum berpindah.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EpicSidebarCarousel({ slides }) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-2xl overflow-hidden">
      {/* Left 75% Hero Viewport */}
      <div className="lg:col-span-3 relative h-96 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[active].id}
            src={slides[active].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Right 25% Vertical Progress List */}
      <div className="flex flex-col gap-2">
        {slides.map((slide, idx) => {
          const isActive = active === idx;
          return (
            <button
              key={slide.id}
              onClick={() => setActive(idx)}
              className="relative p-3 rounded-xl overflow-hidden text-left bg-zinc-900 border"
            >
              {isActive && (
                <motion.div
                  key={idx}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={handleNext}
                  className="absolute inset-0 bg-white/15"
                />
              )}
              <span className="relative z-10 font-bold">{slide.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      tabs: {
        title: "2. Auto-Tabs Carousel (Horizontal Underline Fill)",
        badge: "Tab Teks Horizontal",
        description:
          "Showcase fitur enterprise dengan kanvas interaktif utama dan tab teks navigasi horizontal di bawahnya. Garis bawah tipis terisi dari 0 hingga 100% dari lebar tab aktif sebelum bertransisi ke fitur berikutnya.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AutoTabsCarousel({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full space-y-6">
      <div className="relative h-80 rounded-2xl overflow-hidden border">
        <AnimatePresence mode="wait">
          <motion.img
            key={tabs[active].id}
            src={tabs[active].image}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActive(idx)}
            className="relative pb-3 text-left"
          >
            <h4 className="font-bold text-sm">{tab.title}</h4>
            <p className="text-xs text-zinc-500">{tab.tagline}</p>
            {active === idx && (
              <motion.div
                key={idx}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
                onAnimationComplete={() => setActive((active + 1) % tabs.length)}
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}`,
      },
      pills: {
        title: "3. Dynamic Pill Carousel (Expanding Dot Fill)",
        badge: "Kapsul Kaca Dinamis",
        description:
          "Carousel panorama visual dengan dock kapsul kaca melayang. Slide non-aktif berbentuk titik melingkar, sedangkan slide aktif melebar menjadi kapsul dengan bilah gradien terisi selama 3.5 detik.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DynamicPillCarousel({ items }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative h-96 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={items[index].id}
          src={items[index].image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Floating Glassmorphism Pill Dock */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative cursor-pointer"
            >
              {index === i ? (
                <div className="w-14 h-2.5 rounded-full bg-white/20 overflow-hidden relative border border-white/20">
                  <motion.div
                    key={i}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    onAnimationComplete={() => setIndex((index + 1) % items.length)}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      },
      radial: {
        title: "4. Radial Progress Carousel (Circular Dial Timer)",
        badge: "Dial Melingkar SVG",
        description:
          "Tata letak rekayasa mewah dengan rincian spesifikasi di kiri dan visual produk di kanan. Dial melingkar SVG menghitung mundur 360 derajat secara presisi, memicu pergantian slide otomatis saat terisi penuh.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RadialProgressCarousel({ slides }) {
  const [active, setActive] = useState(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 border rounded-2xl">
      <div>
        <div className="flex items-center gap-3 mb-4">
          {/* Circular SVG Timer */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r={radius} className="stroke-zinc-800" strokeWidth="3" fill="none" />
              <motion.circle
                key={active}
                cx="22"
                cy="22"
                r={radius}
                stroke="currentColor"
                className="text-indigo-500"
                strokeWidth="3"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                onAnimationComplete={() => setActive((active + 1) % slides.length)}
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold">{active + 1}</span>
          </div>
          <span className="text-xs uppercase font-mono text-zinc-500">Auto-Cycle Dial</span>
        </div>
        <h3 className="text-2xl font-bold">{slides[active].title}</h3>
      </div>

      <div className="h-72 rounded-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[active].id}
            src={slides[active].image}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}`,
      },
    },
  },
};

/* =========================================================================
 * 1. COMPONENT: EPIC SIDEBAR CAROUSEL (VERTICAL PROGRESS SIDEBAR)
 * ========================================================================= */
interface EpicGameSlide {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  price: string;
  cta: string;
  badge: string;
  image: string;
}

const epicSlides: EpicGameSlide[] = [
  {
    id: "epic-1",
    title: "Cyber Odyssey: 2088",
    tagline: "Explore a neon-drenched metropolis with neural implant abilities.",
    genre: "Action RPG • Cyberpunk",
    price: "$59.99",
    cta: "Pre-Purchase Now",
    badge: "Available Nov 12",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-2",
    title: "Chronicles of Aethelgard",
    tagline: "Command ancestral legions in a fractured high-fantasy realm.",
    genre: "Strategy • Isometric RPG",
    price: "$49.99",
    cta: "Play Open Beta",
    badge: "Early Access",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-3",
    title: "Solaris Deep Horizon",
    tagline: "Build self-sustaining orbital colonies around a dying star.",
    genre: "Simulation • Space Survival",
    price: "$39.99",
    cta: "Explore Tech Tree",
    badge: "Major Update v2.0",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-4",
    title: "Valkyrie: Mech Protocol",
    tagline: "Hyper-kinetic 6v6 aerial battles in customizable armored suits.",
    genre: "Team Combat • Sci-Fi",
    price: "Free to Play",
    cta: "Join The Squad",
    badge: "Season 4 Live",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "epic-5",
    title: "Neon Drift: Tokyo Midnight",
    tagline: "Twin-turbo street racing powered by full hardware path tracing.",
    genre: "Arcade Racing • Simulation",
    price: "$29.99",
    cta: "Upgrade Garage",
    badge: "120 FPS Ray Tracing",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
];

export function EpicSidebarCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = epicSlides.length;
  const currentSlide = epicSlides[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
        {/* Left 75% Hero Viewport Stage */}
        <div className="lg:col-span-3 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 shadow-xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent hidden sm:block" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white z-10">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                      {currentSlide.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-300">
                      {currentSlide.genre}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                    {currentSlide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed drop-shadow-sm max-w-md">
                    {currentSlide.tagline}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <span>{currentSlide.cta}</span>
                      <ArrowRightIcon size={14} />
                    </button>
                    <span className="font-mono text-sm font-black text-emerald-400 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-xs border border-white/10">
                      {currentSlide.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 right-4 z-20">
            <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-zinc-300">
              {isPaused ? "⏸ Timer Paused" : "▶ Auto 5s Fill"}
            </span>
          </div>
        </div>

        {/* Right 25% Vertical Progress List */}
        <div className="flex flex-col gap-2.5 justify-between">
          {epicSlides.map((slide, idx) => {
            const isActive = activeIndex === idx;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative flex items-center gap-3 p-3 rounded-2xl overflow-hidden text-left transition-all cursor-pointer border",
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 shadow-md ring-1 ring-indigo-500/30"
                    : "bg-white/60 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60"
                )}
              >
                {isActive && (
                  <motion.div
                    key={`epic-progress-${idx}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? undefined : "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    onAnimationComplete={() => {
                      if (!isPaused) handleNext();
                    }}
                    className="absolute inset-0 bg-indigo-500/15 dark:bg-indigo-500/25 pointer-events-none"
                  />
                )}

                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 dark:bg-indigo-400" />
                )}

                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1 relative z-10">
                  <h4
                    className={cn(
                      "text-xs font-bold truncate transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-800 dark:text-zinc-200"
                    )}
                  >
                    {slide.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block truncate">
                    {slide.genre.split("•")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 2. COMPONENT: AUTO TABS CAROUSEL (HORIZONTAL UNDERLINE PROGRESS FILL)
 * ========================================================================= */
interface FeatureTab {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  spec: string;
  description: string;
  image: string;
}

const featureTabs: FeatureTab[] = [
  {
    id: "tab-1",
    title: "High-Concurrency",
    tagline: "500k req/s throughput",
    badge: "WASM JIT",
    spec: "< 1.2ms latency",
    description: "Multi-threaded virtual machine running zero-overhead byte-code compiled directly from modern React declarative trees.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-2",
    title: "Zero Layout Shift",
    tagline: "Pre-evaluated bounds",
    badge: "CLS Guard",
    spec: "0.000 score",
    description: "Calculates bounding box constraints offscreen prior to repaint, guaranteeing completely jitter-free DOM resizing across displays.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-3",
    title: "Universal Tokens",
    tagline: "WCAG AAA dark/light",
    badge: "Design System",
    spec: "WCAG 2.1 Compliant",
    description: "Synchronized dual-palette design tokens engineered with high-contrast neutral zinc and vibrant indigo highlight spectrums.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "tab-4",
    title: "Edge Replication",
    tagline: "128 Global regions",
    badge: "Infrastructure",
    spec: "Sub-2ms TTFB",
    description: "Autonomous edge cache warmers proactively push critical UI chunks into local memory prior to pointer touchdown.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1100&q=80",
  },
];

export function AutoTabsCarousel() {
  const [active, setActive] = useState(0);
  const total = featureTabs.length;
  const currentTab = featureTabs[active];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % total);
  };

  return (
    <div className="w-full space-y-6 select-none py-2">
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img
              src={currentTab.image}
              alt={currentTab.title}
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/20">
                    {currentTab.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {currentTab.spec}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  {currentTab.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                  {currentTab.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {featureTabs.map((tab, idx) => {
          const isActive = active === idx;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative pb-4 pt-2 px-3 text-left rounded-xl transition-colors cursor-pointer",
                isActive
                  ? "bg-zinc-100/80 dark:bg-zinc-900/80"
                  : "hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40"
              )}
            >
              <h4
                className={cn(
                  "text-xs sm:text-sm font-bold transition-colors",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {tab.title}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate mt-0.5">
                {tab.tagline}
              </p>

              <div className="absolute bottom-0 inset-x-2 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                {isActive && (
                  <motion.div
                    key={`tab-line-${idx}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    onAnimationComplete={handleNext}
                    className="h-full bg-indigo-600 dark:bg-indigo-400"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
 * 3. COMPONENT: DYNAMIC PILL CAROUSEL (EXPANDING CAPSULE FILL)
 * ========================================================================= */
interface ArchitecturalConcept {
  id: string;
  title: string;
  tag: string;
  location: string;
  architect: string;
  image: string;
}

const pillSlideItems: ArchitecturalConcept[] = [
  {
    id: "pl-1",
    title: "The Glass Pavilion",
    tag: "Minimalist Habitat",
    location: "Lucerne, Switzerland",
    architect: "Studio Solis",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-2",
    title: "Nordic Obsidian Fjord",
    tag: "Sustainable Monolith",
    location: "Tromso, Norway",
    architect: "Aura Arkitekter",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-3",
    title: "Kyoto Timber Sanctum",
    tag: "Zen Modernism",
    location: "Kyoto, Japan",
    architect: "Kengo Kobo",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pl-4",
    title: "Santorini Cliff Residence",
    tag: "Mediterranean Horizon",
    location: "Oia, Greece",
    architect: "Aegean Dynamics",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
  },
];

export function DynamicPillCarousel() {
  const [index, setIndex] = useState(0);
  const total = pillSlideItems.length;
  const current = pillSlideItems[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="w-full select-none py-2">
      <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

            <div className="absolute top-5 left-5 z-10 text-white">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                {current.tag}
              </span>
            </div>

            <div className="absolute bottom-16 sm:bottom-18 left-5 sm:left-8 z-10 text-white">
              <span className="text-xs font-mono text-zinc-300">
                📍 {current.location} • {current.architect}
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                {current.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Glassmorphism Pill Dock */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-center z-20 pointer-events-auto">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/60 dark:bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl">
            {pillSlideItems.map((_, i) => {
              const isActive = index === i;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Jump to concept ${i + 1}`}
                  className="cursor-pointer focus:outline-none transition-all flex items-center"
                >
                  {isActive ? (
                    <div className="w-14 sm:w-16 h-2.5 rounded-full bg-white/20 overflow-hidden relative border border-white/20">
                      <motion.div
                        key={`pill-fill-${i}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        onAnimationComplete={handleNext}
                        className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 4. COMPONENT: RADIAL PROGRESS CAROUSEL (CIRCULAR SVG DIAL TIMER)
 * ========================================================================= */
interface SpecProduct {
  id: string;
  title: string;
  edition: string;
  subtitle: string;
  statPrimary: string;
  statLabel: string;
  description: string;
  image: string;
}

const radialProducts: SpecProduct[] = [
  {
    id: "rd-1",
    title: "ChronoSphere Chronograph",
    edition: "Ref. 904L Titanium",
    subtitle: "COSC-Certified Mechanical Precision",
    statPrimary: "28,800 vph",
    statLabel: "Balance Frequency",
    description: "Hand-finished skeleton movement with silicon escapement wheel delivering 72 hours of uninterrupted power reserve.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-2",
    title: "Aura Acoustics Studio 1",
    edition: "Planar Magnetic Driver",
    subtitle: "Spatial Audio Field Synthesizer",
    statPrimary: "4Hz - 54kHz",
    statLabel: "Frequency Range",
    description: "Ultra-thin beryllium composite diaphragms offering natural acoustic transients with zero total harmonic distortion.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "rd-3",
    title: "Valkyrie Spatial Lens",
    edition: "Aspherical Fluorite Optics",
    subtitle: "Zero Chromatic Aberration",
    statPrimary: "f/1.2 Max",
    statLabel: "Lens Aperture",
    description: "Dual linear autofocus motors delivering lightning quick subject tracking under extreme low-light conditions.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
  },
];

export function RadialProgressCarousel() {
  const [active, setActive] = useState(0);
  const total = radialProducts.length;
  const current = radialProducts[active];

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const handleNext = () => {
    setActive((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  return (
    <div className="w-full select-none py-2">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      className="stroke-zinc-200 dark:stroke-zinc-800"
                      strokeWidth="3"
                      fill="none"
                    />
                    <motion.circle
                      key={`radial-dial-${active}`}
                      cx="22"
                      cy="22"
                      r={radius}
                      stroke="currentColor"
                      className="text-indigo-600 dark:text-indigo-400"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 4, ease: "linear" }}
                      onAnimationComplete={handleNext}
                    />
                  </svg>
                  <span className="absolute font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {active + 1}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Circular Dial Timer
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    4.0s Auto Cycle • {active + 1} of {total}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  <ChevronLeftIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  {current.edition}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {current.description}
                </p>

                <div className="pt-3 flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      {current.statLabel}
                    </span>
                    <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      {current.statPrimary}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Quality Seal
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckIcon size={14} /> Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN EXPORT: AUTO CAROUSEL DEMO PAGE (SINGLE COLUMN LAYOUT - 4 VARIANTS)
 * ========================================================================= */
export function AutoCarouselDemo() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const t = isId ? CAROUSEL_DICT.id : CAROUSEL_DICT.en;

  const carouselCards = [
    {
      id: "epic",
      title: t.variants.epic.title,
      badge: t.variants.epic.badge,
      desc: t.variants.epic.description,
      component: <EpicSidebarCarousel />,
      snippet: t.variants.epic.snippet,
    },
    {
      id: "tabs",
      title: t.variants.tabs.title,
      badge: t.variants.tabs.badge,
      desc: t.variants.tabs.description,
      component: <AutoTabsCarousel />,
      snippet: t.variants.tabs.snippet,
    },
    {
      id: "pills",
      title: t.variants.pills.title,
      badge: t.variants.pills.badge,
      desc: t.variants.pills.description,
      component: <DynamicPillCarousel />,
      snippet: t.variants.pills.snippet,
    },
    {
      id: "radial",
      title: t.variants.radial.title,
      badge: t.variants.radial.badge,
      desc: t.variants.radial.description,
      component: <RadialProgressCarousel />,
      snippet: t.variants.radial.snippet,
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

      {/* Single Column Stack of All 4 Auto-Progress Variants */}
      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        {carouselCards.map((card) => (
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
            <div className="flex items-center justify-center p-3 sm:p-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
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

export default AutoCarouselDemo;
