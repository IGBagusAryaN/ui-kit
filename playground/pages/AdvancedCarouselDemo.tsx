import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CloseIcon,
  HeartIcon,
  RefreshCwIcon,
  CheckIcon,
  StarIcon,
  ZapIcon,
  LayersIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

const CAROUSEL_DICT = {
  en: {
    pillTag1: "Physics-Based Gesture Dynamics",
    pillTag2: "5 Advanced Variants",
    pageTitle: "Advanced Animated Carousels",
    pageDescription:
      "A premier collection of 5 fluid, physics-driven carousel architectures built with Framer Motion and Tailwind CSS. Featuring 3D depth coverflow perspectives, responsive internal parallax shifts, interactive gesture card swiping, horizontal accordion panel expansion, and continuous seamless infinite drag looping.",
    controls: {
      prev: "Previous Slide",
      next: "Next Slide",
      reset: "Reset Stack",
      pass: "Pass / Dismiss",
      like: "Save / Like",
      dragHint: "Drag or swipe horizontally to navigate",
      activeSlide: "Slide",
      of: "of",
    },
    variants: {
      coverflow: {
        title: "1. Coverflow 3D Depth Slider",
        badge: "3D Perspective & Snap",
        description:
          "Three-dimensional spatial coverflow where the centered active item elevates with full scale and opacity, while flanking cards rotate in 3D space with subtle depth scaling. Includes auto-centering drag snaps and tactile click-to-activate interaction.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function CoverflowSlider({ items }) {
  const [active, setActive] = useState(2);

  return (
    <div className="relative overflow-hidden py-12" style={{ perspective: "1000px" }}>
      <div className="flex items-center justify-center min-h-[360px]">
        {items.map((item, idx) => {
          const offset = idx - active;
          return (
            <motion.div
              key={item.id}
              onClick={() => setActive(idx)}
              animate={{
                scale: offset === 0 ? 1 : 0.82,
                rotateY: offset === 0 ? 0 : offset > 0 ? -38 : 38,
                x: offset * 140,
                zIndex: 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.55,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="absolute w-72 rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img src={item.image} alt={item.title} className="h-80 w-full object-cover" />
              <div className="p-4 bg-zinc-900/90 text-white">
                <h4 className="font-bold text-sm">{item.title}</h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      parallax: {
        title: "2. Parallax Image Drag Carousel",
        badge: "Internal Velocity Parallax",
        description:
          "Dual-tier motion slider where horizontal drag gestures concurrently shift card containers and internal imagery at differential velocities, generating an immersive optical depth illusion without layout jitter.",
        snippet: `import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function ParallaxCarousel({ items }) {
  const x = useMotionValue(0);

  return (
    <div className="overflow-hidden py-6">
      <motion.div
        drag="x"
        dragConstraints={{ left: -600, right: 0 }}
        style={{ x }}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, idx) => {
          // Internal image shifts counter to drag for depth
          const imageX = useTransform(x, (v) => v * 0.15);
          return (
            <div key={item.id} className="w-80 shrink-0 rounded-2xl overflow-hidden border">
              <div className="h-56 overflow-hidden relative">
                <motion.img
                  style={{ x: imageX, scale: 1.15 }}
                  src={item.image}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{item.title}</h4>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}`,
      },
      stacked: {
        title: "3. Stacked Swipe Carousel (Tinder Card Stack)",
        badge: "Physics Gesture Dismiss",
        description:
          "Physical card stack rendered in dynamic z-axis cascading layers. Dragging the top card evaluates horizontal velocity and offset thresholds, triggering organic exit rotations and promoting underlying cards seamlessly.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export function StackedSwipe({ cards, onDismiss }) {
  const [stack, setStack] = useState(cards);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 400) {
      setStack((prev) => prev.slice(1));
    }
  };

  return (
    <div className="relative h-96 w-80 mx-auto">
      <AnimatePresence>
        {stack.slice(0, 3).map((card, idx) => (
          <motion.div
            key={card.id}
            drag={idx === 0 ? "x" : false}
            style={idx === 0 ? { x, rotate } : undefined}
            onDragEnd={idx === 0 ? handleDragEnd : undefined}
            animate={{
              scale: 1 - idx * 0.06,
              y: idx * 16,
              zIndex: 10 - idx,
            }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 rounded-3xl p-6 shadow-xl"
          >
            {card.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`,
      },
      expanding: {
        title: "4. Expanding Active Carousel (Horizontal Accordion)",
        badge: "Fluid Layout Morphing",
        description:
          "Interactive horizontal accordion using Framer Motion's layout engine. Inactive panels collapse into sleek vertical identity pillars, while the active panel expands with spring damping to unveil full multimedia content.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function ExpandingAccordion({ panels }) {
  const [activeId, setActiveId] = useState(panels[0].id);

  return (
    <div className="flex h-96 gap-3 overflow-hidden rounded-2xl">
      {panels.map((panel) => {
        const isActive = activeId === panel.id;
        return (
          <motion.div
            key={panel.id}
            layout
            onClick={() => setActiveId(panel.id)}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={\`relative overflow-hidden rounded-xl cursor-pointer \${
              isActive ? "flex-[3.5]" : "flex-1 hover:flex-[1.2]"
            }\`}
          >
            <img src={panel.image} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="font-bold text-lg">{panel.title}</h3>
              {isActive && <p className="text-xs text-zinc-300 mt-2">{panel.description}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}`,
      },
      seamless: {
        title: "5. Seamless Infinite Draggable Carousel",
        badge: "Virtual Loop & Inertia",
        description:
          "Continuous cyclical carousel supporting unrestricted manual gesture dragging in either direction. Leverages modulo index calculations and velocity momentum to eliminate edge boundaries and abrupt restarts.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SeamlessInfiniteLoop({ items }) {
  const [index, setIndex] = useState(0);

  const paginate = (newDirection) => {
    setIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -40) paginate(1);
          else if (info.offset.x > 40) paginate(-1);
        }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <div key={item.id} className="w-72 shrink-0 p-5 rounded-2xl border">
            <h4>{item.title}</h4>
          </div>
        ))}
      </motion.div>
    </div>
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Dinamika Gestur Berbasis Fisika",
    pillTag2: "5 Varian Lanjutan",
    pageTitle: "Carousel Animasi Tingkat Lanjut",
    pageDescription:
      "Koleksi 5 arsitektur carousel berbasis fisika fluida tingkat tinggi yang dibangun dengan Framer Motion dan Tailwind CSS. Menghadirkan perspektif coverflow kedalaman 3D, pergeseran paralaks internal responsif, tumpukan kartu swipe interaktif, ekspansi akordeon horizontal, dan putaran drag tak terbatas tanpa batas ujung.",
    controls: {
      prev: "Slide Sebelumnya",
      next: "Slide Berikutnya",
      reset: "Atur Ulang Tumpukan",
      pass: "Lewati / Abaikan",
      like: "Simpan / Suka",
      dragHint: "Geser atau drag horizontal untuk bernavigasi",
      activeSlide: "Slide",
      of: "dari",
    },
    variants: {
      coverflow: {
        title: "1. Coverflow 3D Depth Slider",
        badge: "Perspektif 3D & Snap",
        description:
          "Coverflow spasial tiga dimensi di mana item aktif di tengah terangkat dengan skala dan opasitas penuh, sementara kartu di sisi kiri dan kanan berotasi dalam ruang 3D dengan pengurangan kedalaman halus.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function CoverflowSlider({ items }) {
  const [active, setActive] = useState(2);

  return (
    <div className="relative overflow-hidden py-12" style={{ perspective: "1000px" }}>
      <div className="flex items-center justify-center min-h-[360px]">
        {items.map((item, idx) => {
          const offset = idx - active;
          return (
            <motion.div
              key={item.id}
              onClick={() => setActive(idx)}
              animate={{
                scale: offset === 0 ? 1 : 0.82,
                rotateY: offset === 0 ? 0 : offset > 0 ? -38 : 38,
                x: offset * 140,
                zIndex: 10 - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.55,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="absolute w-72 rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img src={item.image} alt={item.title} className="h-80 w-full object-cover" />
              <div className="p-4 bg-zinc-900/90 text-white">
                <h4 className="font-bold text-sm">{item.title}</h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`,
      },
      parallax: {
        title: "2. Parallax Image Drag Carousel",
        badge: "Paralaks Kecepatan Internal",
        description:
          "Slider gerakan dua tingkat di mana gestur drag horizontal secara bersamaan menggeser kontainer kartu dan gambar di dalamnya dengan kecepatan berbeda, menciptakan ilusi kedalaman optik nyata.",
        snippet: `import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function ParallaxCarousel({ items }) {
  const x = useMotionValue(0);

  return (
    <div className="overflow-hidden py-6">
      <motion.div
        drag="x"
        dragConstraints={{ left: -600, right: 0 }}
        style={{ x }}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, idx) => {
          const imageX = useTransform(x, (v) => v * 0.15);
          return (
            <div key={item.id} className="w-80 shrink-0 rounded-2xl overflow-hidden border">
              <div className="h-56 overflow-hidden relative">
                <motion.img
                  style={{ x: imageX, scale: 1.15 }}
                  src={item.image}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{item.title}</h4>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}`,
      },
      stacked: {
        title: "3. Stacked Swipe Carousel (Tinder Card Stack)",
        badge: "Gestur Fisika Terlempar",
        description:
          "Tumpukan kartu fisik yang dirender dalam lapisan bertingkat sumbu-Z dinamis. Men-drag kartu teratas mengevaluasi batas kecepatan dan pergeseran horizontal, memicu rotasi keluar yang alami.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export function StackedSwipe({ cards, onDismiss }) {
  const [stack, setStack] = useState(cards);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 400) {
      setStack((prev) => prev.slice(1));
    }
  };

  return (
    <div className="relative h-96 w-80 mx-auto">
      <AnimatePresence>
        {stack.slice(0, 3).map((card, idx) => (
          <motion.div
            key={card.id}
            drag={idx === 0 ? "x" : false}
            style={idx === 0 ? { x, rotate } : undefined}
            onDragEnd={idx === 0 ? handleDragEnd : undefined}
            animate={{
              scale: 1 - idx * 0.06,
              y: idx * 16,
              zIndex: 10 - idx,
            }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 rounded-3xl p-6 shadow-xl"
          >
            {card.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`,
      },
      expanding: {
        title: "4. Expanding Active Carousel (Horizontal Accordion)",
        badge: "Perubahan Tata Letak Fluida",
        description:
          "Akordeon horizontal interaktif dengan engine tata letak Framer Motion. Panel yang tidak aktif menyusut menjadi pilar identitas vertikal, sementara panel aktif melebar dengan redaman pegas untuk menampilkan detail penuh.",
        snippet: `import { useState } from "react";
import { motion } from "framer-motion";

export function ExpandingAccordion({ panels }) {
  const [activeId, setActiveId] = useState(panels[0].id);

  return (
    <div className="flex h-96 gap-3 overflow-hidden rounded-2xl">
      {panels.map((panel) => {
        const isActive = activeId === panel.id;
        return (
          <motion.div
            key={panel.id}
            layout
            onClick={() => setActiveId(panel.id)}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={\`relative overflow-hidden rounded-xl cursor-pointer \${
              isActive ? "flex-[3.5]" : "flex-1 hover:flex-[1.2]"
            }\`}
          >
            <img src={panel.image} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <h3 className="font-bold text-lg">{panel.title}</h3>
              {isActive && <p className="text-xs text-zinc-300 mt-2">{panel.description}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}`,
      },
      seamless: {
        title: "5. Seamless Infinite Draggable Carousel",
        badge: "Putaran Virtual & Inersia",
        description:
          "Carousel siklikal berkelanjutan yang mendukung gestur drag manual tanpa batas di kedua arah. Menggunakan perhitungan indeks modulo dan momentum kecepatan untuk menghilangkan batasan tepi.",
        snippet: `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SeamlessInfiniteLoop({ items }) {
  const [index, setIndex] = useState(0);

  const paginate = (newDirection) => {
    setIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -40) paginate(1);
          else if (info.offset.x > 40) paginate(-1);
        }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <div key={item.id} className="w-72 shrink-0 p-5 rounded-2xl border">
            <h4>{item.title}</h4>
          </div>
        ))}
      </motion.div>
    </div>
  );
}`,
      },
    },
  },
};

interface CoverflowItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  rating: string;
  year: string;
  image: string;
  accent: string;
}

const coverflowItems: CoverflowItem[] = [
  {
    id: "cf-1",
    title: "Apex Horizon Villa",
    category: "Spatial Architecture",
    tag: "Minimalist",
    rating: "4.98",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    accent: "from-blue-600 to-indigo-900",
  },
  {
    id: "cf-2",
    title: "Cybernetic Obsidian",
    category: "Industrial Hardware",
    tag: "Pro Prototype",
    rating: "4.92",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    accent: "from-emerald-600 to-teal-900",
  },
  {
    id: "cf-3",
    title: "Quantum Core Terminal",
    category: "Neural Compute",
    tag: "Enterprise",
    rating: "5.00",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    accent: "from-purple-600 to-indigo-950",
  },
  {
    id: "cf-4",
    title: "Celestial Pavilion",
    category: "Urban Landmark",
    tag: "Atmospheric",
    rating: "4.95",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-600 to-rose-900",
  },
  {
    id: "cf-5",
    title: "Aura Hydrofoil Craft",
    category: "Aeronautics",
    tag: "Electric Zero",
    rating: "4.89",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    accent: "from-cyan-600 to-blue-900",
  },
];

export function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const total = coverflowItems.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -45) {
      handleNext();
    } else if (info.offset.x > 45) {
      handlePrev();
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-4">
      <div
        className="relative w-full h-[380px] sm:h-[430px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1100px" }}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {coverflowItems.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  scale: isCenter ? 1 : 0.82 - Math.abs(offset) * 0.04,
                  rotateY: isCenter ? 0 : offset > 0 ? -36 : 36,
                  x: offset * 150,
                  z: isCenter ? 80 : -130 * Math.abs(offset),
                  zIndex: 10 - Math.abs(offset),
                  opacity: isCenter ? 1 : Math.max(0.45, 0.7 - Math.abs(offset) * 0.2),
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                }}
                className={cn(
                  "absolute w-64 sm:w-72 h-[320px] sm:h-[360px] rounded-2xl overflow-hidden cursor-pointer",
                  "border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-900 shadow-2xl transition-shadow",
                  isCenter
                    ? "ring-2 ring-indigo-500/60 shadow-indigo-500/20 shadow-2xl cursor-grab active:cursor-grabbing"
                    : "hover:border-zinc-400 dark:hover:border-zinc-500"
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-95"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-400 text-xs font-semibold border border-white/10">
                    <StarIcon size={12} className="fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-mono font-medium text-indigo-300">
                    {item.category} • {item.year}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                    {item.title}
                  </h4>
                  {isCenter && (
                    <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Center View
                      </span>
                      <span className="font-mono text-zinc-400">Tap or Drag</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-sm mt-3 px-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Coverflow Card"
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
        >
          <ChevronLeftIcon size={18} />
        </button>

        <div className="flex items-center gap-2">
          {coverflowItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === i
                  ? "w-7 bg-indigo-600 dark:bg-indigo-400"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Coverflow Card"
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>

      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mt-2">
        Slide {activeIndex + 1} of {total} • Drag horizontal to snap
      </span>
    </div>
  );
}

/* =========================================================================
 * 2. COMPONENT: PARALLAX IMAGE DRAG CAROUSEL
 * ========================================================================= */
interface ParallaxItem {
  id: string;
  title: string;
  location: string;
  category: string;
  elevation: string;
  rating: string;
  image: string;
}

const parallaxItems: ParallaxItem[] = [
  {
    id: "px-1",
    title: "Dolomites Alpine Ridge",
    location: "South Tyrol, Italy",
    category: "Peak Expedition",
    elevation: "2,840m",
    rating: "4.97",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "px-2",
    title: "Kyoto Bamboo Sanctuary",
    location: "Arashiyama, Japan",
    category: "Serenity Walk",
    elevation: "180m",
    rating: "4.99",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "px-3",
    title: "Reykjavik Basalt Coast",
    location: "Vik I Myrdal, Iceland",
    category: "Nordic Wonders",
    elevation: "45m",
    rating: "4.94",
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "px-4",
    title: "Santorini Caldera Terraces",
    location: "Cyclades, Greece",
    category: "Aegean Escape",
    elevation: "300m",
    rating: "4.96",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "px-5",
    title: "Banff Glacial Basin",
    location: "Alberta, Canada",
    category: "Alpine Haven",
    elevation: "1,880m",
    rating: "4.98",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=900&q=80",
  },
];

export function ParallaxImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(600);

  useEffect(() => {
    if (containerRef.current) {
      const scrollable =
        containerRef.current.scrollWidth - containerRef.current.offsetWidth;
      setMaxScroll(Math.max(scrollable, 200));
    }
  }, []);

  return (
    <div className="w-full space-y-3 py-2">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          Interactive Parallax Field
        </span>
        <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
          useTransform(x, v =&gt; -v * 0.18)
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 p-4 sm:p-6 cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -maxScroll - 40, right: 0 }}
          dragElastic={0.15}
          style={{ x: dragX }}
          className="flex gap-5 w-max"
        >
          {parallaxItems.map((item) => (
            <ParallaxCard key={item.id} item={item} trackX={dragX} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ParallaxCard({
  item,
  trackX,
}: {
  item: ParallaxItem;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
  // Compute internal image offset opposite to drag movement
  const imgX = useTransform(trackX, [-800, 0], [40, -40]);

  return (
    <div className="w-72 sm:w-80 shrink-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-950">
        <motion.img
          style={{ x: imgX, scale: 1.25 }}
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md font-mono font-medium border border-white/10">
            {item.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md font-mono font-semibold">
            {item.elevation}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-3 text-white">
          <span className="text-[11px] font-mono text-zinc-300">
            📍 {item.location}
          </span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {item.title}
          </h4>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Certified Scenic Route
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono">
          <StarIcon size={13} className="fill-amber-400 text-amber-400" />
          <span>{item.rating}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 3. COMPONENT: STACKED SWIPE CAROUSEL (CARD STACK / TINDER SWIPE)
 * ========================================================================= */
interface StackCard {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  category: string;
  stars: string;
  forks: string;
  speed: string;
  gradient: string;
  tags: string[];
}

const initialStackData: StackCard[] = [
  {
    id: "sc-1",
    name: "Aether UI Framework",
    tagline: "Ultra-fluid spring physics components with zero layout shift.",
    badge: "Featured Core",
    category: "Motion Engine",
    stars: "14.2k",
    forks: "1.8k",
    speed: "120 FPS",
    gradient: "from-indigo-600 via-blue-600 to-indigo-900",
    tags: ["React 19", "Tailwind v4", "Spring Physics"],
  },
  {
    id: "sc-2",
    name: "Hyperion Design System",
    tagline: "WCAG AAA compliant accessible primitives for global SaaS.",
    badge: "Enterprise",
    category: "Design System",
    stars: "9.8k",
    forks: "940",
    speed: "0ms CLS",
    gradient: "from-emerald-600 via-teal-600 to-emerald-950",
    tags: ["Radix UI", "Tokens", "Dark Mode"],
  },
  {
    id: "sc-3",
    name: "Nebula 3D Viewport",
    tagline: "WebGL spatial layer renderer with ambient lighting physics.",
    badge: "Experimental",
    category: "Spatial 3D",
    stars: "22.1k",
    forks: "3.4k",
    speed: "60 FPS 4K",
    gradient: "from-purple-600 via-pink-600 to-purple-950",
    tags: ["Three.js", "Shader", "Metal Engine"],
  },
  {
    id: "sc-4",
    name: "Vortex Edge Cache",
    tagline: "Autonomous distributed state engine with optimistic mutations.",
    badge: "Infra",
    category: "Cloud Runtime",
    stars: "11.5k",
    forks: "1.2k",
    speed: "< 2ms TTFB",
    gradient: "from-amber-600 via-rose-600 to-amber-950",
    tags: ["Edge CDN", "Redis", "Zero Cold Start"],
  },
  {
    id: "sc-5",
    name: "Chronos Timeline Sync",
    tagline: "Microsecond precision audit logger with stepped branch diffs.",
    badge: "Data Stream",
    category: "DevTools",
    stars: "8.3k",
    forks: "710",
    speed: "Real-time",
    gradient: "from-cyan-600 via-blue-700 to-cyan-950",
    tags: ["WebSocket", "CRDT", "Protobuf"],
  },
];

export function StackedSwipeCarousel() {
  const [cards, setCards] = useState<StackCard[]>(initialStackData);
  const [historyCount, setHistoryCount] = useState(0);

  const handleDismiss = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    setCards((prev) => prev.slice(1));
    setHistoryCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCards(initialStackData);
    setHistoryCount(0);
  };

  return (
    <div className="w-full flex flex-col items-center py-6 select-none">
      <div className="flex items-center justify-between w-full max-w-sm mb-4 px-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <span>Cards in Stack: {cards.length}</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
          Swiped: {historyCount}
        </span>
      </div>

      <div className="relative w-80 sm:w-88 h-[370px]">
        <AnimatePresence mode="popLayout">
          {cards.length > 0 ? (
            cards.slice(0, 3).map((card, idx) => (
              <SwipeableCard
                key={card.id}
                card={card}
                index={idx}
                isTop={idx === 0}
                onSwipe={handleDismiss}
              />
            ))
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center p-6 text-center"
            >
              <CheckIcon size={32} className="text-emerald-500 mb-2" />
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Stack Completed
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs">
                You have evaluated all cards in this series. Reset below to inspect them again.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <RefreshCwIcon size={14} />
                <span>Reset Card Stack</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cards.length > 0 && (
        <div className="flex items-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => handleDismiss("left")}
            aria-label="Swipe Left / Dismiss"
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-zinc-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <CloseIcon size={20} className="stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset Stack"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCwIcon size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleDismiss("right")}
            aria-label="Swipe Right / Save"
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-zinc-900 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <HeartIcon size={20} className="fill-emerald-500/20 stroke-[2.2]" />
          </button>
        </div>
      )}

      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mt-3">
        Drag left to Pass • Drag right to Save • Or use quick action buttons
      </span>
    </div>
  );
}

function SwipeableCard({
  card,
  index,
  isTop,
  onSwipe,
}: {
  card: StackCard;
  index: number;
  isTop: boolean;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  // Indicator Opacity stamps
  const likeOpacity = useTransform(x, [30, 100], [0, 1]);
  const passOpacity = useTransform(x, [-30, -100], [0, 1]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 110 || info.velocity.x > 450) {
      onSwipe("right");
    } else if (info.offset.x < -110 || info.velocity.x < -450) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      style={isTop ? { x, rotate } : undefined}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 14,
        zIndex: 10 - index,
        opacity: Math.max(0.65, 1 - index * 0.18),
      }}
      exit={{
        x: x.get() >= 0 ? 500 : -500,
        opacity: 0,
        rotate: x.get() >= 0 ? 30 : -30,
        transition: { duration: 0.28 },
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-xl",
        "border border-white/20 text-white cursor-grab active:cursor-grabbing",
        "bg-gradient-to-br",
        card.gradient
      )}
    >
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-6 left-6 z-30 px-3.5 py-1 rounded-lg border-2 border-emerald-400 bg-emerald-950/70 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider rotate-[-12deg]"
          >
            ACCEPT / LIKE
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-6 right-6 z-30 px-3.5 py-1 rounded-lg border-2 border-rose-400 bg-rose-950/70 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider rotate-[12deg]"
          >
            DISMISS / PASS
          </motion.div>
        </>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            {card.category}
          </span>
          <span className="text-xs font-mono font-semibold text-white/80">
            {card.badge}
          </span>
        </div>

        <h3 className="text-xl font-extrabold tracking-tight text-white mb-2">
          {card.name}
        </h3>
        <p className="text-xs text-white/80 leading-relaxed">
          {card.tagline}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 my-3">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/25 backdrop-blur-xs text-white/90 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-white/15 flex items-center justify-between font-mono text-xs text-white/90">
        <div>
          <span className="text-[10px] text-white/60 block">STARS</span>
          <span className="font-bold">{card.stars}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/60 block">FORKS</span>
          <span className="font-bold">{card.forks}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/60 block">PERF</span>
          <span className="font-bold text-emerald-300">{card.speed}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
 * 4. COMPONENT: EXPANDING ACTIVE CAROUSEL (HORIZONTAL ACCORDION SLIDER)
 * ========================================================================= */
interface ExpandingPanel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  stat: string;
  statLabel: string;
  image: string;
}

const expandingPanels: ExpandingPanel[] = [
  {
    id: "ep-1",
    number: "01",
    title: "Spatial Motion Engine",
    subtitle: "Adaptive Spring Physics",
    description:
      "Frame-rate adaptive physics calculation providing organic inertia and zero input lag across high-refresh desktop and mobile viewports.",
    badge: "Core Physics",
    stat: "120 FPS",
    statLabel: "Target Render",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ep-2",
    number: "02",
    title: "Zero Layout Shift",
    subtitle: "Pre-measured Dimensions",
    description:
      "Dynamic DOM bounding box evaluation guarantees zero cumulative layout shift during synchronous layout transitions.",
    badge: "CLS Guard",
    stat: "0.000",
    statLabel: "Cumulative Shift",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ep-3",
    number: "03",
    title: "Real-Time 3D Shaders",
    subtitle: "Hardware GPU Rendering",
    description:
      "Seamless integration with modern WebGL pipelines rendering metallic surface reflections with ambient lighting diffusion.",
    badge: "GPU Accelerated",
    stat: "4K UHD",
    statLabel: "Fidelity",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ep-4",
    number: "04",
    title: "Unified Dark & Light Tokens",
    subtitle: "Contrast Optimized Palettes",
    description:
      "Engineered neutral color tokens complying strictly with WCAG AAA contrast ratios across zinc, emerald, and slate spectrums.",
    badge: "WCAG AAA",
    stat: "100%",
    statLabel: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  },
];

export function ExpandingActiveCarousel() {
  const [activeId, setActiveId] = useState("ep-1");

  return (
    <div className="w-full space-y-3 py-2">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
        <span>Click or hover panels to expand</span>
        <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
          layout • spring(320, 28)
        </span>
      </div>

      <div className="flex flex-col sm:flex-row h-[520px] sm:h-[390px] gap-3 w-full overflow-hidden rounded-2xl select-none">
        {expandingPanels.map((panel) => {
          const isActive = activeId === panel.id;

          return (
            <motion.div
              key={panel.id}
              layout
              onClick={() => setActiveId(panel.id)}
              onMouseEnter={() => setActiveId(panel.id)}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={cn(
                "relative overflow-hidden rounded-2xl cursor-pointer border transition-colors",
                isActive
                  ? "flex-[4] sm:flex-[3.5] border-indigo-500/80 shadow-lg ring-1 ring-indigo-500/30"
                  : "flex-1 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 opacity-80 hover:opacity-100"
              )}
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-90"
                loading="lazy"
              />

              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-300 pointer-events-none",
                  isActive
                    ? "bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/20"
                    : "bg-zinc-950/60"
                )}
              />

              {isActive ? (
                <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20">
                      {panel.badge}
                    </span>
                    <span className="font-mono text-xl font-black text-indigo-400">
                      {panel.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-medium text-indigo-300">
                      {panel.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      {panel.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                      {panel.description}
                    </p>

                    <div className="pt-3 flex items-center justify-between border-t border-white/15">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                          {panel.statLabel}
                        </span>
                        <span className="text-sm font-bold font-mono text-emerald-400">
                          {panel.stat}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20">
                        <span>Expanded View</span>
                        <ArrowRightIcon size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Collapsed Pillar View */
                <div className="absolute inset-0 p-4 flex flex-col justify-between items-center text-white z-10">
                  <span className="font-mono text-xs font-bold text-zinc-400">
                    {panel.number}
                  </span>
                  <div className="writing-mode-vertical rotate-180 text-xs sm:text-sm font-bold tracking-wider text-zinc-300 whitespace-nowrap">
                    {panel.title}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
 * 5. COMPONENT: SEAMLESS INFINITE DRAGGABLE CAROUSEL
 * ========================================================================= */
interface InfiniteCardItem {
  id: string;
  title: string;
  domain: string;
  latency: string;
  status: string;
  description: string;
  tag: string;
  metric: string;
  accent: string;
}

const infiniteCardItems: InfiniteCardItem[] = [
  {
    id: "ic-1",
    title: "Quantum Compiler Kernel",
    domain: "kernel.quantum.io",
    latency: "1.2ms",
    status: "Healthy",
    description: "JIT intermediate representation translator compiling React trees to zero-overhead WASM.",
    tag: "WASM JIT",
    metric: "4.8M ops/sec",
    accent: "border-blue-500/40 bg-blue-500/10 text-blue-500 dark:text-blue-400",
  },
  {
    id: "ic-2",
    title: "Aura Neural Cache",
    domain: "cache.aura.net",
    latency: "0.8ms",
    status: "Operational",
    description: "Predictive memory layer auto-warming localized page chunks before pointer touchdown.",
    tag: "Predictive",
    metric: "99.98% Hit",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
  },
  {
    id: "ic-3",
    title: "Vortex Edge Gateway",
    domain: "gw.vortex.dev",
    latency: "2.4ms",
    status: "Healthy",
    description: "Global ingress orchestrator load balancing high-concurrency micro-frontends with ease.",
    tag: "Gateway",
    metric: "128 Regions",
    accent: "border-purple-500/40 bg-purple-500/10 text-purple-500 dark:text-purple-400",
  },
  {
    id: "ic-4",
    title: "Chronos Audit Ledger",
    domain: "ledger.chronos.org",
    latency: "1.9ms",
    status: "Healthy",
    description: "Tamper-evident chronological event streaming pipeline recording telemetry changes.",
    tag: "Telemetry",
    metric: "500k req/s",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-500 dark:text-amber-400",
  },
  {
    id: "ic-5",
    title: "Helios Shader Pipeline",
    domain: "helios.render.app",
    latency: "0.4ms",
    status: "Active",
    description: "Low-level compute shader computing physical subsurface light scattering in real-time.",
    tag: "WebGL 2",
    metric: "120 FPS",
    accent: "border-rose-500/40 bg-rose-500/10 text-rose-500 dark:text-rose-400",
  },
  {
    id: "ic-6",
    title: "Titan Fault Tolerant Bus",
    domain: "bus.titan.cloud",
    latency: "3.1ms",
    status: "Active",
    description: "Decentralized consensus actor model handling unexpected network partitions smoothly.",
    tag: "Raft Consensus",
    metric: "Zero Dropped",
    accent: "border-teal-500/40 bg-teal-500/10 text-teal-500 dark:text-teal-400",
  },
];

export function SeamlessInfiniteCarousel() {
  const [index, setIndex] = useState(0);
  const total = infiniteCardItems.length;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -45) {
      handleNext();
    } else if (info.offset.x > 45) {
      handlePrev();
    }
  };

  // Reorder list cyclically starting from current index
  const visibleCards = useMemo(() => {
    const list: { item: InfiniteCardItem; virtualIndex: number }[] = [];
    for (let i = 0; i < total; i++) {
      const targetIdx = (index + i) % total;
      list.push({ item: infiniteCardItems[targetIdx], virtualIndex: i });
    }
    return list;
  }, [index, total]);

  return (
    <div className="w-full space-y-4 py-2 select-none">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
        <span>Continuous Virtual Ring Loop</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Loop Card"
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronLeftIcon size={14} />
          </button>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Loop Card"
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 p-4 sm:p-5">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
        >
          {visibleCards.map(({ item, virtualIndex }) => (
            <motion.div
              key={`${item.id}-${virtualIndex}`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={cn(
                "w-72 sm:w-80 shrink-0 rounded-2xl p-5 border bg-white dark:bg-zinc-900 shadow-xs transition-all",
                virtualIndex === 0
                  ? "border-indigo-500/80 ring-2 ring-indigo-500/20 shadow-md"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border",
                    item.accent
                  )}
                >
                  {item.tag}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {item.latency}
                </span>
              </div>

              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {item.title}
              </h4>
              <span className="text-xs font-mono text-zinc-400 block mb-2">
                {item.domain}
              </span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Throughput</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  {item.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-1">
        {infiniteCardItems.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Jump to loop item ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              index === i
                ? "w-6 bg-indigo-600 dark:bg-indigo-400"
                : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
 * MAIN EXPORT: ADVANCED CAROUSEL DEMO PAGE (SINGLE COLUMN LAYOUT)
 * ========================================================================= */
export function AdvancedCarouselDemo() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const t = isId ? CAROUSEL_DICT.id : CAROUSEL_DICT.en;

  const carouselCards = [
    {
      id: "coverflow",
      title: t.variants.coverflow.title,
      badge: t.variants.coverflow.badge,
      desc: t.variants.coverflow.description,
      component: <CoverflowCarousel />,
      snippet: t.variants.coverflow.snippet,
    },
    {
      id: "parallax",
      title: t.variants.parallax.title,
      badge: t.variants.parallax.badge,
      desc: t.variants.parallax.description,
      component: <ParallaxImageCarousel />,
      snippet: t.variants.parallax.snippet,
    },
    {
      id: "stacked",
      title: t.variants.stacked.title,
      badge: t.variants.stacked.badge,
      desc: t.variants.stacked.description,
      component: <StackedSwipeCarousel />,
      snippet: t.variants.stacked.snippet,
    },
    {
      id: "expanding",
      title: t.variants.expanding.title,
      badge: t.variants.expanding.badge,
      desc: t.variants.expanding.description,
      component: <ExpandingActiveCarousel />,
      snippet: t.variants.expanding.snippet,
    },
    {
      id: "seamless",
      title: t.variants.seamless.title,
      badge: t.variants.seamless.badge,
      desc: t.variants.seamless.description,
      component: <SeamlessInfiniteCarousel />,
      snippet: t.variants.seamless.snippet,
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
        {carouselCards.map((card) => (
          <section
            key={card.id}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
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

            <div className="flex items-center justify-center p-3 sm:p-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
              {card.component}
            </div>

            <CodeSnippet code={card.snippet} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default AdvancedCarouselDemo;
