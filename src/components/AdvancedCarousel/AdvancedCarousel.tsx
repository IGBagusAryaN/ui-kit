import React, {
  forwardRef,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  CloseIcon,
  RefreshCwIcon,
} from "../../icons";
import { cn } from "../../utils/cn";
import type { CarouselItem } from "../AutoCarousel/AutoCarousel";

export type AdvancedCarouselItem = CarouselItem;

/* =========================================================================
 * 1. CVA VARIANTS
 * ========================================================================= */

export const advancedCarouselVariants = cva("w-full select-none relative", {
  variants: {
    variant: {
      coverflow: "overflow-hidden py-4",
      parallax: "overflow-hidden py-2",
      stacked: "overflow-hidden py-6",
      expanding: "overflow-hidden py-2",
      seamless: "overflow-hidden py-4",
      cinematic: "overflow-hidden py-2",
    },
    size: {
      sm: "max-w-2xl mx-auto",
      default: "max-w-5xl mx-auto",
      lg: "max-w-7xl mx-auto",
      full: "w-full max-w-full mx-auto",
    },
  },
  defaultVariants: {
    variant: "coverflow",
    size: "default",
  },
});


/* =========================================================================
 * 2. COVERFLOW 3D DEPTH SLIDER
 * ========================================================================= */

export interface CoverflowItem {
  id: string | number;
  title: string;
  category?: string;
  tag?: string;
  rating?: string | number;
  year?: string | number;
  image: string;
  accent?: string;
  [key: string]: any;
}

export const defaultCoverflowItems: CoverflowItem[] = [
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

export interface CoverflowCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof advancedCarouselVariants> {
  items?: (CoverflowItem | CarouselItem)[];
  initialIndex?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
  showControls?: boolean;
  showIndicators?: boolean;
}

export const CoverflowCarousel = forwardRef<HTMLDivElement, CoverflowCarouselProps>(
  (
    {
      items = defaultCoverflowItems,
      initialIndex = 2,
      activeIndex: controlledIndex,
      onChange,
      showControls = true,
      showIndicators = true,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const isControlled = controlledIndex !== undefined;
    const [internalIndex, setInternalIndex] = useState(
      Math.min(initialIndex, Math.max(0, items.length - 1))
    );
    const active = isControlled ? controlledIndex : internalIndex;
    const total = items.length;

    const setIndex = (newIdx: number) => {
      const bounded = Math.max(0, Math.min(newIdx, total - 1));
      if (!isControlled) setInternalIndex(bounded);
      onChange?.(bounded);
    };

    const handleNext = () => {
      setIndex(active < total - 1 ? active + 1 : 0);
    };

    const handlePrev = () => {
      setIndex(active > 0 ? active - 1 : total - 1);
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
      if (info.offset.x < -45) {
        handleNext();
      } else if (info.offset.x > 45) {
        handlePrev();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          advancedCarouselVariants({ variant: "coverflow", size }),
          "flex flex-col items-center",
          className
        )}
        {...props}
      >
        <div
          className="relative w-full h-[380px] sm:h-[430px] flex items-center justify-center overflow-hidden"
          style={{ perspective: "1100px" }}
        >
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {items.map((item, idx) => {
              const offset = idx - active;
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setIndex(idx)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  animate={{
                    scale: isCenter ? 1 : Math.max(0.7, 0.84 - Math.abs(offset) * 0.05),
                    rotateY: isCenter ? 0 : offset > 0 ? -36 : 36,
                    x: offset * 160,
                    z: isCenter ? 80 : -120 * Math.min(Math.abs(offset), 3),
                    zIndex: isCenter ? 20 : 10 - Math.min(Math.abs(offset), 8),
                    opacity: isVisible
                      ? isCenter
                        ? 1
                        : Math.max(0.4, 0.75 - Math.abs(offset) * 0.18)
                      : 0,
                    pointerEvents: isVisible ? "auto" : "none",
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
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    {item.tag && (
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {item.tag}
                      </span>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-400 text-xs font-semibold border border-white/10">
                        <StarIcon size={12} className="fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-white">
                    {(item.category || item.year) && (
                      <span className="text-[11px] font-mono font-medium text-indigo-300">
                        {item.category} {item.year ? `• ${item.year}` : ""}
                      </span>
                    )}
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

        {showControls && (
          <div className="flex items-center justify-between w-full max-w-sm mt-3 px-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Coverflow Card"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeftIcon size={18} />
            </button>

            {showIndicators && (
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 cursor-pointer",
                      active === i
                        ? "w-7 bg-indigo-600 dark:bg-indigo-400"
                        : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                    )}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Coverflow Card"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
        )}

        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mt-2">
          Slide {active + 1} of {total} • Drag horizontal to snap
        </span>
      </div>
    );
  }
);
CoverflowCarousel.displayName = "CoverflowCarousel";
export const CoverflowSlider = CoverflowCarousel;

/* =========================================================================
 * 3. PARALLAX IMAGE DRAG CAROUSEL
 * ========================================================================= */

export interface ParallaxItem {
  id: string | number;
  title: string;
  location?: string;
  category?: string;
  elevation?: string;
  rating?: string | number;
  image: string;
  [key: string]: any;
}

export const defaultParallaxItems: ParallaxItem[] = [
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

export interface ParallaxImageCarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof advancedCarouselVariants> {
  items?: (ParallaxItem | CarouselItem)[];
}

export const ParallaxImageCarousel = forwardRef<HTMLDivElement, ParallaxImageCarouselProps>(
  ({ items = defaultParallaxItems, className, size = "default", ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragX = useMotionValue(0);
    const [maxScroll, setMaxScroll] = useState(600);

    useEffect(() => {
      if (containerRef.current) {
        const scrollable =
          containerRef.current.scrollWidth - containerRef.current.offsetWidth;
        setMaxScroll(Math.max(scrollable, 200));
      }
    }, [items]);

    return (
      <div
        ref={ref}
        className={cn(
          advancedCarouselVariants({ variant: "parallax", size }),
          "space-y-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            Interactive Parallax Field
          </span>
          <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
            Internal Velocity Parallax
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
            {items.map((item) => (
              <ParallaxInternalCard key={item.id} item={item} trackX={dragX} />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);
ParallaxImageCarousel.displayName = "ParallaxImageCarousel";
export const ParallaxCarousel = ParallaxImageCarousel;

function ParallaxInternalCard({
  item,
  trackX,
}: {
  item: ParallaxItem;
  trackX: ReturnType<typeof useMotionValue<number>>;
}) {
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
          {item.category && (
            <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md font-mono font-medium border border-white/10">
              {item.category}
            </span>
          )}
          {item.elevation && (
            <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md font-mono font-semibold">
              {item.elevation}
            </span>
          )}
        </div>

        {item.location && (
          <div className="absolute bottom-2.5 left-3 text-white">
            <span className="text-[11px] font-mono text-zinc-300">
              📍 {item.location}
            </span>
          </div>
        )}
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
        {item.rating && (
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono">
            <StarIcon size={13} className="fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
 * 4. STACKED SWIPE CAROUSEL (CARD STACK)
 * ========================================================================= */

export interface StackCard {
  id: string | number;
  name: string;
  tagline: string;
  badge?: string;
  category?: string;
  stars?: string;
  forks?: string;
  speed?: string;
  gradient?: string;
  tags?: string[];
  [key: string]: any;
}

export const defaultStackCards: StackCard[] = [
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

export interface StackedSwipeCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onReset" | "onChange">,
    VariantProps<typeof advancedCarouselVariants> {
  /** Daftar item/kartu standar (unified) */
  items?: CarouselItem[];
  /** Alias legacy */
  cards?: StackCard[];
  onSwipe?: (direction: "left" | "right", card: StackCard) => void;
  onChange?: (index: number, card: StackCard) => void;
  onReset?: () => void;
}

export const StackedSwipeCarousel = forwardRef<HTMLDivElement, StackedSwipeCarouselProps>(
  (
    {
      items,
      cards,
      onSwipe,
      onChange,
      onReset,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const initialCards: StackCard[] = useMemo(() => {
      const source = items || cards || defaultStackCards;
      return source.map((c, idx) => ({
        ...c,
        id: c.id ?? `stack-${idx}`,
        name: c.name || c.title || `Card ${idx + 1}`,
        tagline: c.tagline || c.description || c.subtitle || "",
        badge: c.badge || c.tag || c.category,
        category: c.category || c.badge,
        stars: c.stars || c.rating?.toString() || "5.0",
        forks: c.forks || "1.2k",
        speed: c.speed || c.stat || "120 FPS",
        gradient: c.gradient || c.accent || "from-indigo-600 via-blue-600 to-indigo-900",
        tags: c.tags || [c.tag || "Feature", "Interactive"],
      }));
    }, [items, cards]);

    const [deckCycle, setDeckCycle] = useState(0);
    const [stack, setStack] = useState<StackCard[]>(initialCards);
    const [historyCount, setHistoryCount] = useState(0);
    const topCardRef = useRef<{ dismiss: (dir: "left" | "right") => void } | null>(null);

    useEffect(() => {
      setStack(initialCards);
    }, [initialCards]);

    const handleDismiss = (direction: "left" | "right") => {
      if (stack.length === 0) return;
      const dismissedCard = stack[0];
      setStack((prev) => prev.slice(1));
      const nextCount = historyCount + 1;
      setHistoryCount(nextCount);
      onSwipe?.(direction, dismissedCard);
      onChange?.(nextCount, dismissedCard);
    };

    const handleReset = () => {
      setDeckCycle((c) => c + 1);
      setStack([...initialCards]);
      setHistoryCount(0);
      onReset?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          advancedCarouselVariants({ variant: "stacked", size }),
          "flex flex-col items-center justify-center select-none",
          className
        )}
        {...props}
      >
        <div className="relative w-72 sm:w-80 h-[380px] sm:h-[400px]">
          <AnimatePresence mode="wait">
            {stack.length > 0 ? (
              <div key={`deck-wrap-${deckCycle}`} className="contents">
                {stack
                  .slice(0, 3)
                  .map((card, idx) => (
                    <SwipeCardInternal
                      key={`card-${deckCycle}-${card.id}`}
                      card={card}
                      index={idx}
                      isTop={idx === 0}
                      topCardRef={idx === 0 ? topCardRef : undefined}
                      onSwipe={handleDismiss}
                    />
                  ))}
              </div>
            ) : (
              <motion.div
                key="empty-stack-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className="absolute inset-0 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-6 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
                  <CheckIcon size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                    All Stack Cards Evaluated
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    You reviewed all {historyCount} items in this queue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow-xs cursor-pointer z-30"
                >
                  <RefreshCwIcon size={14} />
                  <span>Reset Stack Deck</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stack.length > 0 ? (
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                if (topCardRef.current) {
                  topCardRef.current.dismiss("left");
                } else {
                  handleDismiss("left");
                }
              }}
              aria-label="Dismiss card"
              className="p-3 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 hover:scale-105 transition-transform shadow-xs cursor-pointer"
            >
              <CloseIcon size={20} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset queue"
              className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 hover:scale-105 transition-transform shadow-xs cursor-pointer"
            >
              <RefreshCwIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (topCardRef.current) {
                  topCardRef.current.dismiss("right");
                } else {
                  handleDismiss("right");
                }
              }}
              aria-label="Accept card"
              className="p-3 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 hover:scale-105 transition-transform shadow-xs cursor-pointer"
            >
              <CheckIcon size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCwIcon size={15} />
              <span>Restart Card Stack</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);
StackedSwipeCarousel.displayName = "StackedSwipeCarousel";
export const StackedSwipe = StackedSwipeCarousel;

function SwipeCardInternal({
  card,
  index,
  isTop,
  topCardRef,
  onSwipe,
}: {
  card: StackCard;
  index: number;
  isTop: boolean;
  topCardRef?: React.MutableRefObject<{ dismiss: (dir: "left" | "right") => void } | null>;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const isDismissing = useRef(false);
  const [exitTarget, setExitTarget] = useState<{ x: number; rotate: number } | null>(null);

  const likeOpacity = useTransform(x, [25, 80], [0, 1]);
  const passOpacity = useTransform(x, [-25, -80], [0, 1]);

  const triggerDismiss = (dir: "left" | "right") => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    const targetX = dir === "left" ? -800 : 800;
    const targetRotate = dir === "left" ? -35 : 35;
    setExitTarget({ x: targetX, rotate: targetRotate });
    setTimeout(() => {
      onSwipe(dir);
    }, 220);
  };

  useEffect(() => {
    if (isTop && topCardRef) {
      topCardRef.current = { dismiss: triggerDismiss };
    }
  }, [isTop]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -35 || info.velocity.x < -120) {
      triggerDismiss("left");
    } else if (info.offset.x > 35 || info.velocity.x > 120) {
      triggerDismiss("right");
    }
  };

  return (
    <motion.div
      drag={isTop && !exitTarget ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      style={isTop ? { x, rotate } : undefined}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={
        exitTarget
          ? {
              x: exitTarget.x,
              rotate: exitTarget.rotate,
              opacity: 0,
              transition: { duration: 0.22, ease: "easeOut" },
            }
          : {
              scale: 1 - index * 0.05,
              y: index * 14,
              zIndex: 10 - index,
              opacity: Math.max(0.65, 1 - index * 0.18),
              x: 0,
              rotate: 0,
            }
      }
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-xl select-none",
        "border border-white/20 text-white",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
        "bg-gradient-to-br",
        card.gradient || "from-indigo-600 to-indigo-900"
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
          {card.category && (
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {card.category}
            </span>
          )}
          {card.badge && (
            <span className="text-xs font-mono font-semibold text-white/80">
              {card.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-extrabold tracking-tight text-white mb-2">
          {card.name}
        </h3>
        <p className="text-xs text-white/80 leading-relaxed">
          {card.tagline}
        </p>
      </div>

      {card.tags && card.tags.length > 0 && (
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
      )}

      <div className="pt-3 border-t border-white/15 flex items-center justify-between font-mono text-xs text-white/90">
        <div>
          <span className="text-[10px] text-white/60 block">STARS</span>
          <span className="font-bold">{card.stars || "—"}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/60 block">FORKS</span>
          <span className="font-bold">{card.forks || "—"}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/60 block">PERF</span>
          <span className="font-bold text-emerald-300">{card.speed || "120 FPS"}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
 * 5. EXPANDING ACTIVE CAROUSEL (HORIZONTAL ACCORDION)
 * ========================================================================= */

export interface ExpandingPanel {
  id: string;
  number?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  stat?: string;
  statLabel?: string;
  image: string;
  [key: string]: any;
}

export const defaultExpandingPanels: ExpandingPanel[] = [
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
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
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

export interface ExpandingActiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof advancedCarouselVariants> {
  /** Daftar item/panel standar (unified) */
  items?: CarouselItem[];
  /** Alias legacy */
  panels?: ExpandingPanel[];
  activeIndex?: number;
  defaultIndex?: number;
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (idOrIndex: any, item?: CarouselItem) => void;
}

export const ExpandingActiveCarousel = forwardRef<HTMLDivElement, ExpandingActiveCarouselProps>(
  (
    {
      items,
      panels,
      activeIndex,
      defaultIndex,
      activeId: controlledId,
      defaultActiveId,
      onChange,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const rawPanels: ExpandingPanel[] = useMemo(() => {
      const source = items || panels || defaultExpandingPanels;
      return source.map((p, idx) => ({
        ...p,
        id: String(p.id ?? `panel-${idx}`),
        number: p.number || String(idx + 1).padStart(2, "0"),
        title: p.title || p.name || `Panel ${idx + 1}`,
        subtitle: p.subtitle || p.category || "",
        description: p.description || p.tagline || "",
        badge: p.badge || p.tag || "Feature",
        stat: p.stat || "100%",
        statLabel: p.statLabel || "Rating",
        image:
          p.image ||
          p.bgImage ||
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      }));
    }, [items, panels]);

    const isControlled =
      controlledId !== undefined || activeIndex !== undefined;
    const initialId =
      defaultActiveId ||
      (defaultIndex !== undefined ? rawPanels[defaultIndex]?.id : undefined) ||
      rawPanels[0]?.id ||
      "";

    const [internalId, setInternalId] = useState(initialId);

    const active = isControlled
      ? controlledId !== undefined
        ? controlledId
        : rawPanels[activeIndex ?? 0]?.id
      : internalId;

    const handleSelect = (id: string, idx: number) => {
      if (!isControlled) setInternalId(id);
      onChange?.(id, rawPanels[idx]);
    };

    return (
      <div
        ref={ref}
        className={cn(
          advancedCarouselVariants({ variant: "expanding", size }),
          "space-y-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
          <span>Click or hover panels to expand</span>
          <span className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
            layout • spring(320, 28)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row h-[520px] sm:h-[390px] gap-3 w-full overflow-hidden rounded-2xl select-none">
          {rawPanels.map((panel, idx) => {
            const isActive = active === String(panel.id);

            return (
              <motion.div
                key={panel.id}
                layout
                onClick={() => handleSelect(String(panel.id), idx)}
                onMouseEnter={() => handleSelect(String(panel.id), idx)}
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
                  decoding="async"
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
                      {panel.badge && (
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20">
                          {panel.badge}
                        </span>
                      )}
                      {panel.number && (
                        <span className="font-mono text-xl font-black text-indigo-400">
                          {panel.number}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {panel.subtitle && (
                        <span className="text-xs font-mono font-medium text-indigo-300">
                          {panel.subtitle}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                        {panel.title}
                      </h3>
                      {panel.description && (
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                          {panel.description}
                        </p>
                      )}

                      <div className="pt-3 flex items-center justify-between border-t border-white/15">
                        {panel.stat && (
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                              {panel.statLabel || "Metric"}
                            </span>
                            <span className="text-sm font-bold font-mono text-emerald-400">
                              {panel.stat}
                            </span>
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20">
                          <span>Expanded View</span>
                          <ArrowRightIcon size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-row sm:flex-col justify-between items-center text-white z-10 select-none">
                    <span className="font-mono text-xs font-bold text-zinc-300 dark:text-zinc-400">
                      {panel.number}
                    </span>
                    <div className="flex-1 flex items-center justify-center my-auto overflow-hidden">
                      <span className="sm:-rotate-90 whitespace-nowrap text-xs sm:text-sm font-bold tracking-wider text-zinc-200 dark:text-zinc-300">
                        {panel.title}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);
ExpandingActiveCarousel.displayName = "ExpandingActiveCarousel";
export const ExpandingAccordion = ExpandingActiveCarousel;

/* =========================================================================
 * 6. SEAMLESS INFINITE DRAGGABLE CAROUSEL
 * ========================================================================= */

export interface InfiniteCardItem {
  id: string | number;
  title: string;
  domain?: string;
  latency?: string;
  status?: string;
  description?: string;
  tag?: string;
  metric?: string;
  accent?: string;
  [key: string]: any;
}

export const defaultInfiniteItems: InfiniteCardItem[] = [
  {
    id: "ic-1",
    title: "Quantum Compiler Kernel",
    domain: "kernel.quantum.io",
    latency: "1.2ms",
    status: "Healthy",
    description:
      "JIT intermediate representation translator compiling React trees to zero-overhead WASM.",
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
    description:
      "Predictive memory layer auto-warming localized page chunks before pointer touchdown.",
    tag: "Predictive",
    metric: "99.98% Hit",
    accent:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
  },
  {
    id: "ic-3",
    title: "Vortex Edge Gateway",
    domain: "gw.vortex.dev",
    latency: "2.4ms",
    status: "Healthy",
    description:
      "Global ingress orchestrator load balancing high-concurrency micro-frontends with ease.",
    tag: "Gateway",
    metric: "128 Regions",
    accent:
      "border-purple-500/40 bg-purple-500/10 text-purple-500 dark:text-purple-400",
  },
  {
    id: "ic-4",
    title: "Chronos Audit Ledger",
    domain: "ledger.chronos.org",
    latency: "1.9ms",
    status: "Healthy",
    description:
      "Tamper-evident chronological event streaming pipeline recording telemetry changes.",
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
    description:
      "Low-level compute shader computing physical subsurface light scattering in real-time.",
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
    description:
      "Decentralized consensus actor model handling unexpected network partitions smoothly.",
    tag: "Raft Consensus",
    metric: "Zero Dropped",
    accent: "border-teal-500/40 bg-teal-500/10 text-teal-500 dark:text-teal-400",
  },
];

export interface SeamlessInfiniteCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof advancedCarouselVariants> {
  /** Daftar item carousel standar (unified) */
  items?: CarouselItem[];
  activeIndex?: number;
  defaultIndex?: number;
  /** Alias legacy */
  currentIndex?: number;
  onChange?: (index: number, item?: any) => void;
}

export const SeamlessInfiniteCarousel = forwardRef<HTMLDivElement, SeamlessInfiniteCarouselProps>(
  (
    {
      items,
      activeIndex,
      defaultIndex = 0,
      currentIndex,
      onChange,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const rawItems: InfiniteCardItem[] = useMemo(() => {
      const source = items || defaultInfiniteItems;
      return source.map((item, idx) => ({
        ...item,
        id: item.id ?? `inf-${idx}`,
        title: item.title || item.name || `Item ${idx + 1}`,
        domain: item.domain || item.subtitle || item.category || "needui.dev",
        latency: item.latency || item.speed || "1.2ms",
        status: item.status || (item.tag ? "Active" : "Operational"),
        description: item.description || item.tagline || "",
        tag: item.tag || item.badge || "Feature",
        metric: item.metric || item.stat || "100%",
        accent:
          item.accent ||
          item.gradient ||
          "border-blue-500/40 bg-blue-500/10 text-blue-500 dark:text-blue-400",
      }));
    }, [items]);

    const controlledIndex = activeIndex !== undefined ? activeIndex : currentIndex;
    const isControlled = controlledIndex !== undefined;
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const index = isControlled ? controlledIndex : internalIndex;
    const total = rawItems.length;

    const setIndex = (newIdx: number) => {
      const wrapped = (newIdx + total) % total;
      if (!isControlled) setInternalIndex(wrapped);
      onChange?.(wrapped, rawItems[wrapped]);
    };

    const handleNext = () => setIndex(index + 1);
    const handlePrev = () => setIndex(index - 1);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
      if (info.offset.x < -45) {
        handleNext();
      } else if (info.offset.x > 45) {
        handlePrev();
      }
    };

    const visibleCards = useMemo(() => {
      const list: { item: InfiniteCardItem; virtualIndex: number }[] = [];
      for (let i = 0; i < total; i++) {
        const targetIdx = (index + i) % total;
        list.push({ item: rawItems[targetIdx], virtualIndex: i });
      }
      return list;
    }, [index, total, rawItems]);

    return (
      <div
        ref={ref}
        className={cn(
          advancedCarouselVariants({ variant: "seamless", size }),
          "space-y-4 select-none",
          className
        )}
        {...props}
      >
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
                  {item.tag && (
                    <span
                      className={cn(
                        "text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border",
                        item.accent || "border-zinc-200 dark:border-zinc-700"
                      )}
                    >
                      {item.tag}
                    </span>
                  )}
                  {item.latency && (
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.latency}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {item.title}
                </h4>
                {item.domain && (
                  <span className="text-xs font-mono text-zinc-400 block mb-2">
                    {item.domain}
                  </span>
                )}
                {item.description && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {item.metric && (
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Throughput</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      {item.metric}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1">
          {rawItems.map((_, i) => (
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
);
SeamlessInfiniteCarousel.displayName = "SeamlessInfiniteCarousel";
export const SeamlessInfiniteLoop = SeamlessInfiniteCarousel;

/* =========================================================================
 * 7. CINEMATIC HERO SHOWCASE CAROUSEL (TRAVEL & SHOWCASE FULL-BLEED SLIDER)
 * ========================================================================= */

export const defaultShowcaseSlides: CarouselItem[] = [
  {
    id: "komodo",
    title: "Komodo",
    subtitle: "East Nusa Tenggara",
    country: "Indonesia",
    description:
      "Vast volcanic hills surrounded by crystal turquoise shores and vibrant coral reefs. Ancient sanctuaries where prehistoric dragons roam wild amidst breathtaking panoramic views.",
    image:
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
    bgImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    buttonText: "Explore",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    id: "kerala",
    title: "Kerala",
    subtitle: "God's Own Country",
    country: "India",
    description:
      "Emerald tea plantations rolling gently across mist-laden valleys, tranquil serpentine backwaters, and pristine palm-fringed coastal sanctuaries untouched by time.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    bgImage:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1800&q=80",
    buttonText: "Discover",
    accent: "from-emerald-600 to-teal-500",
  },
  {
    id: "matterhorn",
    title: "Matterhorn",
    subtitle: "Zermatt Alps",
    country: "Switzerland",
    description:
      "A monumental pyramid of eternal ice and granite soaring into star-studded alpine skies. Majestic snowfields and glistening glaciers under the northern celestial lights.",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    bgImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80",
    buttonText: "View Summit",
    accent: "from-indigo-600 to-purple-500",
  },
  {
    id: "dolomites",
    title: "Dolomites",
    subtitle: "South Tyrol",
    country: "Italy",
    description:
      "Dramatic sheer limestone pinnacles rising like cathedral spires above whispering pine forests and luminous alpine lakes that mirror the glowing twilight.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    bgImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80",
    buttonText: "Explore Trail",
    accent: "from-amber-600 to-orange-500",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    subtitle: "Arashiyama",
    country: "Japan",
    description:
      "Enchanted emerald bamboo groves swaying softly in morning breezes, vermilion torii gates winding through mountain paths, and ancient cedar zen sanctuaries.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    bgImage:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1800&q=80",
    buttonText: "Discover",
    accent: "from-rose-600 to-pink-500",
  },
];

export interface CinematicHeroCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof advancedCarouselVariants> {
  /** Standard unified items array */
  items?: CarouselItem[];
  /** Alias legacy */
  slides?: CarouselItem[];
  activeIndex?: number;
  defaultIndex?: number;
  initialIndex?: number;
  autoPlay?: boolean;
  interval?: number;
  onChange?: (index: number, item?: any) => void;
  onExplore?: (item?: CarouselItem) => void;
}

export const CinematicHeroCarousel = forwardRef<
  HTMLDivElement,
  CinematicHeroCarouselProps
>(
  (
    {
      items,
      slides,
      activeIndex: controlledIndex,
      defaultIndex = 0,
      initialIndex,
      autoPlay = false,
      interval = 6000,
      size = "full",
      onChange,
      onExplore,
      className,
      ...props
    },
    ref
  ) => {
    const rawSlides: CarouselItem[] = useMemo(() => {
      const source = items || slides || defaultShowcaseSlides;
      return source.map((s, idx) => ({
        ...s,
        id: s.id ?? `cinematic-${idx}`,
        title: s.title || s.name || `Slide ${idx + 1}`,
        subtitle: s.subtitle || s.country || "",
        country: s.country || s.subtitle || "",
        description: s.description || s.tagline || "",
        image:
          s.image ||
          s.bgImage ||
          "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
        bgImage: s.bgImage || s.image,
        buttonText: s.buttonText || "Explore",
        accent: s.accent || "from-blue-600 to-cyan-500",
      }));
    }, [items, slides]);

    const isControlled = controlledIndex !== undefined;
    const startIndex = initialIndex !== undefined ? initialIndex : defaultIndex;
    const [internalIndex, setInternalIndex] = useState(
      Math.max(0, Math.min(startIndex, rawSlides.length - 1))
    );
    const [isHovered, setIsHovered] = useState(false);

    const activeIndex = isControlled
      ? Math.max(0, Math.min(controlledIndex, rawSlides.length - 1))
      : internalIndex;

    const activeSlide = rawSlides[activeIndex] ?? rawSlides[0];

    const handleSelect = (index: number) => {
      const boundedIndex = (index + rawSlides.length) % rawSlides.length;
      if (!isControlled) setInternalIndex(boundedIndex);
      onChange?.(boundedIndex, rawSlides[boundedIndex]);
    };

    const handleNext = () => handleSelect(activeIndex + 1);
    const handlePrev = () => handleSelect(activeIndex - 1);

    // Auto-play timer
    useEffect(() => {
      if (!autoPlay || isHovered || rawSlides.length <= 1) return;
      const timer = setInterval(() => {
        handleNext();
      }, interval);
      return () => clearInterval(timer);
    }, [autoPlay, isHovered, activeIndex, interval, rawSlides.length]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex]);

    // Ordered cards: starting from activeIndex onwards in cyclical fashion
    const visibleCards = useMemo(() => {
      const result: { slide: CarouselItem; originalIndex: number }[] = [];
      for (let i = 0; i < rawSlides.length; i++) {
        const idx = (activeIndex + i) % rawSlides.length;
        result.push({ slide: rawSlides[idx], originalIndex: idx });
      }
      return result;
    }, [activeIndex, rawSlides]);

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          advancedCarouselVariants({ variant: "cinematic", size }),
          "relative w-full h-[580px] sm:h-[640px] md:h-[680px] rounded-3xl overflow-hidden select-none shadow-2xl bg-black border border-white/10",
          className
        )}
        {...props}
      >
        {/* 1. Full-Bleed Panoramic Background Image with Smooth Crossfade */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${activeSlide.bgImage || activeSlide.image})`,
            }}
          />
        </AnimatePresence>

        {/* 2. Cinematic Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25 pointer-events-none z-10" />

        {/* 3. Left Column: Vertical Timeline Indicator */}
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5 sm:gap-6">
          <div className="relative flex flex-col items-center gap-5 sm:gap-6 py-2">
            <div className="absolute top-2 bottom-2 w-[1px] bg-white/20 -z-10" />
            {rawSlides.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-label={`Go to ${s.title}`}
                  className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="cinematicActiveDot"
                      className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ring-4 ring-white/30"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                      }}
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-white/40 group-hover:bg-white/80 group-hover:scale-125 transition-all" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Left Column: Hero Content Block (Title, Country, Description, CTA) */}
        <div className="absolute left-14 sm:left-24 md:left-28 top-1/2 -translate-y-1/2 z-20 max-w-[85%] sm:max-w-md md:max-w-lg space-y-4 sm:space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Country Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-medium text-white/90 backdrop-blur-md shadow-xs">
                <span className="text-blue-400">✦</span>
                <span>
                  {activeSlide.country}
                  {activeSlide.subtitle ? ` • ${activeSlide.subtitle}` : ""}
                </span>
              </div>

              {/* Slide Title */}
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                {activeSlide.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-zinc-200/90 leading-relaxed drop-shadow-xs line-clamp-3 max-w-lg">
                {activeSlide.description}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    activeSlide.onExplore?.() || onExplore?.(activeSlide)
                  }
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{activeSlide.buttonText || "Explore"}</span>
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5. Right Column: Offset Floating Card Carousel Deck */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-8 sm:bottom-12 z-20 flex flex-col items-end gap-4">
          <div className="flex items-center gap-3 sm:gap-4 overflow-visible max-w-[90vw] sm:max-w-none">
            {visibleCards.slice(0, 4).map(({ slide: item, originalIndex: idx }, visualPos) => {
              const isLead = visualPos === 0;
              return (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "relative shrink-0 rounded-2xl overflow-hidden shadow-2xl transition-all cursor-pointer select-none group border",
                    isLead
                      ? "w-36 sm:w-48 md:w-56 h-52 sm:h-72 md:h-80 border-white/40 ring-2 ring-white/50 -translate-y-1 sm:-translate-y-2"
                      : "w-28 sm:w-40 md:w-48 h-44 sm:h-60 md:h-72 border-white/15 opacity-85 hover:opacity-100 hover:-translate-y-1"
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  {/* Card Label */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                    <h4 className="text-xs sm:text-sm md:text-base font-bold text-white drop-shadow-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-zinc-300 font-mono drop-shadow-2xs truncate">
                      {item.country || item.subtitle}
                    </p>
                  </div>

                  {isLead && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="flex h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 6. Navigation Controls & Index Counter */}
          <div className="flex items-center gap-3 pr-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-white/25 bg-black/40 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-white/25 bg-black/40 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg"
            >
              <ChevronRightIcon size={18} />
            </button>
            <span className="text-[11px] sm:text-xs font-mono font-medium text-white/80 ml-2 tracking-wider">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(rawSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
CinematicHeroCarousel.displayName = "CinematicHeroCarousel";

export const CinematicCarousel = CinematicHeroCarousel;
export const ShowcaseHeroCarousel = CinematicHeroCarousel;
export const TravelShowcaseCarousel = CinematicHeroCarousel;

/* =========================================================================
 * 8. UNIFIED ADVANCED CAROUSEL MASTER COMPONENT
 * ========================================================================= */

export interface AdvancedCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onReset">,
    VariantProps<typeof advancedCarouselVariants> {
  variant?:
    | "coverflow"
    | "parallax"
    | "stacked"
    | "expanding"
    | "seamless"
    | "cinematic";
  /** Standard unified items array for ALL variants */
  items?: CarouselItem[];
  activeIndex?: number;
  defaultIndex?: number;
  autoPlay?: boolean;
  interval?: number;
  onChange?: (index: number, item?: any) => void;
  onReset?: () => void;
  onExplore?: (item?: any) => void;

  // Legacy variant-specific aliases (backward compatibility):
  coverflowItems?: CarouselItem[];
  parallaxItems?: CarouselItem[];
  stackCards?: CarouselItem[];
  expandingPanels?: CarouselItem[];
  infiniteItems?: CarouselItem[];
  cinematicSlides?: CarouselItem[];
}

export const AdvancedCarousel = forwardRef<HTMLDivElement, AdvancedCarouselProps>(
  (
    {
      variant = "coverflow",
      size = "default",
      items,
      activeIndex,
      defaultIndex,
      autoPlay,
      interval,
      onChange,
      onReset,
      onExplore,
      coverflowItems,
      parallaxItems,
      stackCards,
      expandingPanels,
      infiniteItems,
      cinematicSlides,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedItems =
      items ||
      (variant === "coverflow" ? coverflowItems : undefined) ||
      (variant === "parallax" ? parallaxItems : undefined) ||
      (variant === "stacked" ? stackCards : undefined) ||
      (variant === "expanding" ? expandingPanels : undefined) ||
      (variant === "seamless" ? infiniteItems : undefined) ||
      (variant === "cinematic" ? cinematicSlides : undefined);

    switch (variant) {
      case "cinematic":
        return (
          <CinematicHeroCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            activeIndex={activeIndex}
            defaultIndex={defaultIndex}
            autoPlay={autoPlay}
            interval={interval}
            onChange={onChange}
            onExplore={onExplore}
            className={className}
            {...props}
          />
        );
      case "parallax":
        return (
          <ParallaxImageCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            className={className}
            {...props}
          />
        );
      case "stacked":
        return (
          <StackedSwipeCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            onChange={onChange}
            onReset={onReset}
            className={className}
            {...props}
          />
        );
      case "expanding":
        return (
          <ExpandingActiveCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            activeIndex={activeIndex}
            defaultIndex={defaultIndex}
            onChange={onChange}
            className={className}
            {...props}
          />
        );
      case "seamless":
        return (
          <SeamlessInfiniteCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            activeIndex={activeIndex}
            defaultIndex={defaultIndex}
            onChange={onChange}
            className={className}
            {...props}
          />
        );
      case "coverflow":
      default:
        return (
          <CoverflowCarousel
            ref={ref}
            size={size}
            items={resolvedItems}
            activeIndex={activeIndex}
            onChange={onChange}
            className={className}
            {...props}
          />
        );
    }
  }
);
AdvancedCarousel.displayName = "AdvancedCarousel";

export const Carousel = AdvancedCarousel;
