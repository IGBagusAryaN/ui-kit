import React, {
  useState,
  useCallback,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from "../../icons";

// ============================================================================
// DATA MODEL (Flexible for DB Records & JSON Schemas)
// ============================================================================

export interface CarouselItem {
  id: string | number;
  title: string;
  image: string;
  tagline?: string;
  description?: string;
  badge?: string;
  genre?: string;
  price?: string;
  cta?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  spec?: string;
  tag?: string;
  location?: string;
  architect?: string;
  edition?: string;
  subtitle?: string;
  statPrimary?: string;
  statLabel?: string;
  [key: string]: any;
}

// ============================================================================
// CVA VARIANTS
// ============================================================================

export const carouselVariants = cva("w-full select-none", {
  variants: {
    variant: {
      epic: "carousel-epic",
      tabs: "carousel-tabs",
      pills: "carousel-pills",
      radial: "carousel-radial",
    },
    size: {
      sm: "max-w-3xl mx-auto",
      md: "max-w-5xl mx-auto",
      lg: "max-w-7xl mx-auto",
      full: "w-full max-w-[1536px] mx-auto",
    },
  },
  defaultVariants: {
    variant: "epic",
    size: "full",
  },
});

// ============================================================================
// BASE PROPS
// ============================================================================

export interface AutoCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof carouselVariants> {
  /** Array of carousel items fetched from database or loaded from JSON */
  items: CarouselItem[];
  /** Duration in milliseconds before auto-advancing to the next slide (default: 5000) */
  interval?: number;
  /** Whether auto-play is enabled (default: true) */
  autoPlay?: boolean;
  /** Whether auto-play pauses when hovering the carousel (default: true) */
  pauseOnHover?: boolean;
  /** Initial slide index for uncontrolled mode (default: 0) */
  defaultIndex?: number;
  /** Controlled slide index (optional, zero-state by default) */
  activeIndex?: number;
  /** Callback fired when slide index changes */
  onSlideChange?: (index: number, item: CarouselItem) => void;
  /** Callback fired when an item thumbnail or tab is clicked */
  onItemClick?: (item: CarouselItem, index: number) => void;
  /** Custom className for the active progress load indicator (default: neutral white / monochrome) */
  progressClassName?: string;
}

// ============================================================================
// 1. EPIC SIDEBAR CAROUSEL RENDERER
// ============================================================================

interface VariantRendererProps {
  items: CarouselItem[];
  activeIndex: number;
  isPaused: boolean;
  interval: number;
  autoPlay: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onItemClick?: (item: CarouselItem, index: number) => void;
  progressClassName?: string;
}

function EpicSidebarRenderer({
  items,
  activeIndex,
  isPaused,
  interval,
  autoPlay,
  onSelect,
  onNext,
  onItemClick,
  progressClassName,
}: VariantRendererProps) {
  const current = items[activeIndex] || items[0];
  if (!current) return null;

  const durationSec = interval / 1000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px] gap-3.5 items-stretch w-full">
      {/* Hero Showcase (Refined sleek landscape proportion) */}
      <div className="relative w-full h-[270px] sm:h-[310px] lg:h-[335px] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 shadow-lg group">
        <AnimatePresence>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent hidden sm:block" />

            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white z-10">
              <div className="space-y-2 max-w-xl">
                {(current.badge || current.genre) && (
                  <div className="flex items-center gap-2">
                    {current.badge && (
                      <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {current.badge}
                      </span>
                    )}
                    {current.genre && (
                      <span className="text-[10px] font-mono text-zinc-300">
                        {current.genre}
                      </span>
                    )}
                  </div>
                )}

                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {current.title}
                </h3>

                {(current.tagline || current.description) && (
                  <p className="text-xs text-zinc-300 leading-relaxed drop-shadow-sm max-w-md line-clamp-2">
                    {current.tagline || current.description}
                  </p>
                )}

                <div className="pt-1 flex flex-wrap items-center gap-2">
                  {current.cta && (
                    <button
                      type="button"
                      onClick={() => {
                        if (current.onCtaClick) {
                          current.onCtaClick();
                        } else if (current.ctaLink) {
                          window.location.href = current.ctaLink;
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{current.cta}</span>
                      <ArrowRightIcon size={12} />
                    </button>
                  )}
                  {current.price && (
                    <span className="font-mono text-xs font-black text-emerald-400 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-xs border border-white/10">
                      {current.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {autoPlay && (
          <div className="absolute top-3.5 right-3.5 z-20">
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-zinc-300">
              {isPaused ? "⏸ Paused" : `▶ Auto ${durationSec}s`}
            </span>
          </div>
        )}
      </div>

      {/* Vertical Sidebar Tabs (Grey neutral theme, compact cards) */}
      <div className="flex flex-col gap-1.5 justify-start h-[270px] sm:h-[310px] lg:h-[335px] overflow-y-auto pr-0.5">
        {items.map((slide, idx) => {
          const isActive = activeIndex === idx;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                onSelect(idx);
                onItemClick?.(slide, idx);
              }}
              className={cn(
                "relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl overflow-hidden text-left transition-all cursor-pointer border shrink-0",
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-800/90 border-zinc-300 dark:border-zinc-700 shadow-xs ring-1 ring-zinc-400/30 dark:ring-zinc-600/30"
                  : "bg-white/60 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60"
              )}
            >
              {isActive && autoPlay && (
                <motion.div
                  key={`epic-progress-${idx}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? undefined : "100%" }}
                  transition={{ duration: durationSec, ease: "linear" }}
                  onAnimationComplete={() => {
                    if (!isPaused && autoPlay) onNext();
                  }}
                  className={cn(
                    "absolute inset-0 bg-zinc-200/80 dark:bg-zinc-700/60 pointer-events-none",
                    progressClassName
                  )}
                />
              )}

              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-700 dark:bg-zinc-300" />
              )}

              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 relative z-10">
                <h4
                  className={cn(
                    "text-[11px] sm:text-xs font-semibold truncate transition-colors",
                    isActive
                      ? "text-zinc-950 dark:text-zinc-100"
                      : "text-zinc-700 dark:text-zinc-300"
                  )}
                >
                  {slide.title}
                </h4>
                {(slide.genre || slide.tagline) && (
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block truncate mt-0.5">
                    {slide.genre ? slide.genre.split("•")[0].trim() : slide.tagline}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 2. AUTO TABS CAROUSEL RENDERER
// ============================================================================

function AutoTabsRenderer({
  items,
  activeIndex,
  isPaused,
  interval,
  autoPlay,
  onSelect,
  onNext,
  onItemClick,
  progressClassName,
}: VariantRendererProps) {
  const current = items[activeIndex] || items[0];
  if (!current) return null;

  const durationSec = interval / 1000;

  return (
    <div className="w-full space-y-6 select-none py-2">
      <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-lg">
        <AnimatePresence>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
              <div className="space-y-2 max-w-xl">
                {(current.badge || current.spec) && (
                  <div className="flex items-center gap-2">
                    {current.badge && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/20">
                        {current.badge}
                      </span>
                    )}
                    {current.spec && (
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {current.spec}
                      </span>
                    )}
                  </div>
                )}
                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  {current.title}
                </h3>
                {(current.description || current.tagline) && (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                    {current.description || current.tagline}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={cn(
          "grid gap-3",
          items.length <= 2
            ? "grid-cols-2"
            : items.length === 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {items.map((tab, idx) => {
          const isActive = activeIndex === idx;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onSelect(idx);
                onItemClick?.(tab, idx);
              }}
              className={cn(
                "relative pb-4 pt-2 px-3 text-left rounded-xl transition-colors cursor-pointer",
                isActive
                  ? "bg-zinc-100/80 dark:bg-zinc-900/80"
                  : "hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40"
              )}
            >
              <h4
                className={cn(
                  "text-xs sm:text-sm font-bold transition-colors truncate",
                  isActive
                    ? "text-zinc-950 dark:text-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {tab.title}
              </h4>
              {tab.tagline && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate mt-0.5">
                  {tab.tagline}
                </p>
              )}

              <div className="absolute bottom-0 inset-x-2 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                {isActive && autoPlay && (
                  <motion.div
                    key={`tab-line-${idx}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? undefined : "100%" }}
                    transition={{ duration: durationSec, ease: "linear" }}
                    onAnimationComplete={() => {
                      if (!isPaused && autoPlay) onNext();
                    }}
                    className={cn("h-full bg-zinc-800 dark:bg-zinc-200", progressClassName)}
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

// ============================================================================
// 3. DYNAMIC PILL CAROUSEL RENDERER
// ============================================================================

function DynamicPillRenderer({
  items,
  activeIndex,
  isPaused,
  interval,
  autoPlay,
  onSelect,
  onNext,
  onItemClick,
  progressClassName,
}: VariantRendererProps) {
  const current = items[activeIndex] || items[0];
  if (!current) return null;

  const durationSec = interval / 1000;

  return (
    <div className="w-full select-none py-2">
      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl">
        <AnimatePresence>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

            {current.tag && (
              <div className="absolute top-5 left-5 z-10 text-white">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                  {current.tag}
                </span>
              </div>
            )}

            <div className="absolute bottom-16 sm:bottom-18 left-5 sm:left-8 z-10 text-white">
              {(current.location || current.architect) && (
                <span className="text-xs font-mono text-zinc-300">
                  📍 {current.location} {current.architect && `• ${current.architect}`}
                </span>
              )}
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                {current.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Capsule Dock: Clean Neutral Monochrome (Tidak Hijau) */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-center z-20 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-xl">
            {items.map((slide, i) => {
              const isActive = activeIndex === i;

              return (
                <button
                  key={slide.id || i}
                  type="button"
                  onClick={() => {
                    onSelect(i);
                    onItemClick?.(slide, i);
                  }}
                  aria-label={`Jump to slide ${i + 1}`}
                  className="cursor-pointer focus:outline-none transition-all flex items-center"
                >
                  {isActive ? (
                    <div className="w-12 sm:w-14 h-2 rounded-full bg-white/25 overflow-hidden relative">
                      {autoPlay ? (
                        <motion.div
                          key={`pill-fill-${i}-${isPaused}`}
                          initial={{ width: "0%" }}
                          animate={{ width: isPaused ? undefined : "100%" }}
                          transition={{ duration: durationSec, ease: "linear" }}
                          onAnimationComplete={() => {
                            if (!isPaused && autoPlay) onNext();
                          }}
                          className={cn("h-full bg-white rounded-full", progressClassName)}
                        />
                      ) : (
                        <div className={cn("h-full w-full bg-white rounded-full", progressClassName)} />
                      )}
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
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

// ============================================================================
// 4. RADIAL PROGRESS CAROUSEL RENDERER
// ============================================================================

function RadialProgressRenderer({
  items,
  activeIndex,
  isPaused,
  interval,
  autoPlay,
  onSelect,
  onNext,
  onPrev,
  onItemClick,
  progressClassName,
}: VariantRendererProps) {
  const current = items[activeIndex] || items[0];
  if (!current) return null;

  const durationSec = interval / 1000;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-full select-none py-2">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[280px] sm:min-h-[310px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
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
                    {autoPlay && (
                      <motion.circle
                        key={`radial-dial-${activeIndex}-${isPaused}`}
                        cx="22"
                        cy="22"
                        r={radius}
                        stroke="currentColor"
                        className={cn("text-zinc-800 dark:text-zinc-200", progressClassName)}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{
                          strokeDashoffset: isPaused ? undefined : 0,
                        }}
                        transition={{ duration: durationSec, ease: "linear" }}
                        onAnimationComplete={() => {
                          if (!isPaused && autoPlay) onNext();
                        }}
                      />
                    )}
                  </svg>
                  <span className="absolute font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {activeIndex + 1}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
                    Circular Dial Timer
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {durationSec}s Cycle • {activeIndex + 1} of {items.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 mr-1">
                  {items.map((it, idx) => (
                    <button
                      key={it.id || idx}
                      type="button"
                      onClick={() => {
                        onSelect(idx);
                        onItemClick?.(it, idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all cursor-pointer",
                        activeIndex === idx
                          ? "w-4 bg-zinc-800 dark:bg-zinc-200"
                          : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous Slide"
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <ChevronLeftIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next Slide"
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <ChevronRightIcon size={14} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="min-h-[190px] sm:min-h-[210px] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 block min-h-[1.15rem]">
                    {current.edition || "\u00A0"}
                  </span>

                  {/* Locked 2-line title container so 1-line or 2-line titles never change card height */}
                  <div className="min-h-[3.75rem] sm:min-h-[4.5rem] flex items-center my-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight line-clamp-2">
                      {current.title}
                    </h3>
                  </div>

                  {/* Locked 2-line description container */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-h-[2.5rem] sm:min-h-[2.75rem] line-clamp-2">
                    {current.description || current.subtitle || "\u00A0"}
                  </p>
                </div>

                {(current.statPrimary || current.statLabel) && (
                  <div className="pt-3 flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                        {current.statLabel || "Metric"}
                      </span>
                      <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
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
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[290px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-md">
            <AnimatePresence>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
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

// ============================================================================
// MAIN COMPONENT: AUTOCAROUSEL (Zero-State Internal Timer)
// ============================================================================

export const AutoCarousel = forwardRef<HTMLDivElement, AutoCarouselProps>(
  (
    {
      items = [],
      variant = "epic",
      size = "full",
      interval = 5000,
      autoPlay = true,
      pauseOnHover = true,
      defaultIndex = 0,
      activeIndex: controlledIndex,
      onSlideChange,
      onItemClick,
      progressClassName,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
    const [isPaused, setIsPaused] = useState(false);

    const isControlled = controlledIndex !== undefined;
    const currentIndex = isControlled ? controlledIndex : uncontrolledIndex;
    const total = items.length;

    const setIndex = useCallback(
      (nextIdx: number) => {
        if (!isControlled) {
          setUncontrolledIndex(nextIdx);
        }
        if (items[nextIdx]) {
          onSlideChange?.(nextIdx, items[nextIdx]);
        }
      },
      [isControlled, items, onSlideChange]
    );

    const handleNext = useCallback(() => {
      if (total <= 1) return;
      setIndex((currentIndex + 1) % total);
    }, [currentIndex, total, setIndex]);

    const handlePrev = useCallback(() => {
      if (total <= 1) return;
      setIndex(currentIndex > 0 ? currentIndex - 1 : total - 1);
    }, [currentIndex, total, setIndex]);

    if (!items || items.length === 0) {
      return null;
    }

    const rendererProps: VariantRendererProps = {
      items,
      activeIndex: currentIndex,
      isPaused,
      interval,
      autoPlay,
      onSelect: setIndex,
      onNext: handleNext,
      onPrev: handlePrev,
      onItemClick,
      progressClassName,
    };

    return (
      <div
        ref={ref}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        className={cn(carouselVariants({ variant, size }), className)}
        {...props}
      >
        {variant === "epic" && <EpicSidebarRenderer {...rendererProps} />}
        {variant === "tabs" && <AutoTabsRenderer {...rendererProps} />}
        {variant === "pills" && <DynamicPillRenderer {...rendererProps} />}
        {variant === "radial" && <RadialProgressRenderer {...rendererProps} />}
      </div>
    );
  }
);

AutoCarousel.displayName = "AutoCarousel";

// ============================================================================
// CONVENIENCE STANDALONE EXPORTS
// ============================================================================

export interface SpecializedCarouselProps
  extends Omit<AutoCarouselProps, "variant"> {}

export const EpicSidebarCarousel = forwardRef<
  HTMLDivElement,
  SpecializedCarouselProps
>((props, ref) => <AutoCarousel ref={ref} variant="epic" {...props} />);
EpicSidebarCarousel.displayName = "EpicSidebarCarousel";

export const AutoTabsCarousel = forwardRef<
  HTMLDivElement,
  SpecializedCarouselProps
>((props, ref) => <AutoCarousel ref={ref} variant="tabs" {...props} />);
AutoTabsCarousel.displayName = "AutoTabsCarousel";

export const DynamicPillCarousel = forwardRef<
  HTMLDivElement,
  SpecializedCarouselProps
>((props, ref) => <AutoCarousel ref={ref} variant="pills" {...props} />);
DynamicPillCarousel.displayName = "DynamicPillCarousel";

export const RadialProgressCarousel = forwardRef<
  HTMLDivElement,
  SpecializedCarouselProps
>((props, ref) => <AutoCarousel ref={ref} variant="radial" {...props} />);
RadialProgressCarousel.displayName = "RadialProgressCarousel";
