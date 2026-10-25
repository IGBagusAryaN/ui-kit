import React, { forwardRef, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. CVA VARIANTS
 * ========================================================================= */

export const marqueeVariants = cva(
  "group a-marquee-container relative flex overflow-hidden select-none",
  {
    variants: {
      variant: {
        default: "",
        draggable: "cursor-grab active:cursor-grabbing",
        scroll: "",
        counter: "flex-col",
        vertical: "flex-col h-full w-auto",
        perspective:
          "transform-gpu shadow-xl rounded-2xl border border-zinc-200/80 dark:border-zinc-800",
        bordered:
          "border border-zinc-200/80 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs",
        gradient:
          "bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
      },
      size: {
        none: "py-0",
        xs: "py-1",
        sm: "py-2",
        default: "py-4",
        lg: "py-8",
        full: "py-6 w-full max-w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* =========================================================================
 * 2. TYPES & INTERFACES
 * ========================================================================= */

export type MarqueeOrientation = "horizontal" | "vertical";
export type MarqueeDirection = "left" | "right" | "up" | "down";
export type MarqueeSpeed = "slow" | "normal" | "fast" | number;

export interface MarqueeItem {
  id?: string | number;
  title?: string;
  name?: string;
  tag?: string;
  category?: string;
  stat?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode | ((className?: string) => React.ReactNode);
  badge?: string;
  time?: string;
  [key: string]: any;
}

export interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  /** Array data item JSON terstruktur (seperti Carousel items) */
  items?: any[];
  /** Render function opsional untuk memetakan tiap item JSON ke elemen custom */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** Elemen konten yang akan digulirkan secara berulang */
  children?: React.ReactNode;
  /** Orientasi alur marquee: 'horizontal' (default) atau 'vertical' */
  orientation?: MarqueeOrientation;
  /** Arah pergerakan marquee: 'left' | 'right' (horizontal) atau 'up' | 'down' (vertical) */
  direction?: MarqueeDirection;
  /** Kecepatan animasi marquee: 'slow' (50s), 'normal' (30s), 'fast' (15s), atau angka dalam detik */
  speed?: MarqueeSpeed;
  /** Menjeda animasi saat kursor mouse berada di atas marquee (default: true) */
  pauseOnHover?: boolean;
  /** Efek gradient mask halus di kedua sisi agar konten memudar lembut (default: true) */
  fade?: boolean;
  /** Jarak celah antar elemen dalam pixel atau string CSS (default: 16) */
  gap?: number | string;
  /** Jumlah duplikasi track konten untuk memastikan perputaran infinite tanpa jeda (default: 2) */
  repeat?: number;
  /** Membalikkan arah laju translasi */
  reverse?: boolean;
  /** Class kustom untuk container utama */
  className?: string;
  /** Class kustom untuk setiap track pembungkus children */
  trackClassName?: string;
}

const SPEED_PRESETS: Record<"slow" | "normal" | "fast", number> = {
  slow: 50,
  normal: 30,
  fast: 15,
};

/* =========================================================================
 * 3. FALLBACK DATA (OOTB ZERO-CONFIG RENDERING)
 * ========================================================================= */

const DEFAULT_MARQUEE_ITEMS = [
  { id: "1", title: "Fluid Springs", tag: "Physics", stat: "120 FPS" },
  { id: "2", title: "Touch Drag Gesture", tag: "Gestures", stat: "< 2ms" },
  { id: "3", title: "Dynamic Scroll Velocity", tag: "Scroll", stat: "Adaptive" },
  { id: "4", title: "Zero Layout Shift", tag: "Core Web", stat: "0ms CLS" },
  { id: "5", title: "Accessible Primitives", tag: "A11y", stat: "WCAG AAA" },
  { id: "6", title: "Spatial Perspective", tag: "3D Motion", stat: "GPU Accel" },
];

/* =========================================================================
 * 4. DRAGGABLE MARQUEE (TOUCH & MOUSE DRAG PHYSICS)
 * ========================================================================= */

export interface DraggableMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  children?: React.ReactNode;
  /** Rentang batas drag kiri dalam pixel (default: -900) */
  dragLimit?: number;
  /** Elastisitas tarikan saat menyentuh batas (default: 0.15) */
  dragElastic?: number;
  /** Apakah auto-scroll tetap berjalan pelan saat tidak di-drag (default: true) */
  autoScroll?: boolean;
  /** Durasi satu putaran auto-scroll dalam detik (default: 32) */
  duration?: number;
  gap?: number | string;
}

export const DraggableMarquee = forwardRef<HTMLDivElement, DraggableMarqueeProps>(
  (
    {
      children,
      variant = "draggable",
      size = "default",
      dragLimit = -900,
      dragElastic = 0.15,
      autoScroll = true,
      duration = 32,
      gap = 16,
      className,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const gapValue = typeof gap === "number" ? `${gap}px` : gap;

    return (
      <div
        ref={ref}
        className={cn(
          marqueeVariants({ variant: "draggable", size }),
          "w-full overflow-hidden select-none",
          className
        )}
        {...props}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: dragLimit, right: 0 }}
          dragElastic={dragElastic}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          animate={
            autoScroll && !isDragging
              ? { x: [0, dragLimit * 0.7] }
              : undefined
          }
          transition={
            autoScroll
              ? {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: duration,
                    ease: "linear",
                  },
                }
              : undefined
          }
          className="flex w-max"
          style={{ gap: gapValue }}
        >
          {children ? (
            <>
              {children}
              {children}
            </>
          ) : (
            [...DEFAULT_MARQUEE_ITEMS, ...DEFAULT_MARQUEE_ITEMS].map(
              (item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-64 shrink-0 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs transition-transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {item.tag}
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                      {item.stat}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h4>
                </div>
              )
            )
          )}
        </motion.div>
      </div>
    );
  }
);
DraggableMarquee.displayName = "DraggableMarquee";

/** Alias deklaratif */
export const InteractiveMarquee = DraggableMarquee;

/* =========================================================================
 * 5. SCROLL VELOCITY MARQUEE (DYNAMIC SPEED DRIVEN BY PAGE SCROLL)
 * ========================================================================= */

export interface ScrollVelocityMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  children?: React.ReactNode;
  /** Kecepatan dasar marquee tanpa scroll (default: 3) */
  baseVelocity?: number;
  /** Multiplier akselerasi responsif saat user scroll (default: 4) */
  scrollMultiplier?: number;
  /** Mask gradient di kiri dan kanan (default: true) */
  fade?: boolean;
  gap?: number | string;
}

export const ScrollVelocityMarquee = forwardRef<
  HTMLDivElement,
  ScrollVelocityMarqueeProps
>(
  (
    {
      children,
      variant = "scroll",
      size = "default",
      baseVelocity = 3,
      scrollMultiplier = 4,
      fade = true,
      gap = 24,
      className,
      ...props
    },
    ref
  ) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      [0, 1000],
      [0, scrollMultiplier],
      { clamp: false }
    );

    const x = useTransform(baseX, (v) => `${(v % 50) - 25}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((_, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      const factor = velocityFactor.get();
      if (factor < 0) {
        directionFactor.current = -1;
      } else if (factor > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * Math.abs(factor);
      baseX.set(baseX.get() + moveBy);
    });

    const gapValue = typeof gap === "number" ? `${gap}px` : gap;
    const maskGradient = fade
      ? "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          marqueeVariants({ variant: "scroll", size }),
          "w-full overflow-hidden select-none",
          className
        )}
        style={{
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
        {...props}
      >
        <motion.div
          className="flex w-max shrink-0"
          style={{ x, gap: gapValue }}
        >
          {children ? (
            <>
              {children}
              {children}
              {children}
              {children}
            </>
          ) : (
            Array.from({ length: 4 }).map((_, repeatIdx) => (
              <React.Fragment key={repeatIdx}>
                <span className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 flex items-center gap-6">
                  <span>VELOCITY DRIVEN SCROLL</span>
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                    HARDWARE ACCELERATED
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                </span>
              </React.Fragment>
            ))
          )}
        </motion.div>
      </div>
    );
  }
);
ScrollVelocityMarquee.displayName = "ScrollVelocityMarquee";

/** Alias deklaratif */
export const ScrollMarquee = ScrollVelocityMarquee;

/* =========================================================================
 * 6. COUNTER FLOW MARQUEE (DUAL OPPOSING TRACKS)
 * ========================================================================= */

export interface CounterFlowMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  /** Konten track atas */
  topContent?: React.ReactNode;
  /** Konten track bawah */
  bottomContent?: React.ReactNode;
  /** Kecepatan track atas dalam detik (default: 26) */
  topSpeed?: number;
  /** Kecepatan track bawah dalam detik (default: 32) */
  bottomSpeed?: number;
  /** Jarak celah antar item (default: 20) */
  gap?: number | string;
  fade?: boolean;
}

export const CounterFlowMarquee = forwardRef<
  HTMLDivElement,
  CounterFlowMarqueeProps
>(
  (
    {
      topContent,
      bottomContent,
      topSpeed = 26,
      bottomSpeed = 32,
      gap = 20,
      fade = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full space-y-3 overflow-hidden", className)}
        {...props}
      >
        <Marquee
          direction="left"
          speed={topSpeed}
          gap={gap}
          fade={fade}
          pauseOnHover
        >
          {topContent ?? (
            <div className="flex gap-4">
              {DEFAULT_MARQUEE_ITEMS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs whitespace-nowrap"
                >
                  ⚡ {item.title} ({item.stat})
                </div>
              ))}
            </div>
          )}
        </Marquee>

        <Marquee
          direction="right"
          speed={bottomSpeed}
          gap={gap}
          fade={fade}
          pauseOnHover
        >
          {bottomContent ?? (
            <div className="flex gap-4">
              {DEFAULT_MARQUEE_ITEMS.slice(3, 6).map((item) => (
                <div
                  key={item.id}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs whitespace-nowrap"
                >
                  ✨ {item.title} ({item.stat})
                </div>
              ))}
            </div>
          )}
        </Marquee>
      </div>
    );
  }
);
CounterFlowMarquee.displayName = "CounterFlowMarquee";

/** Alias deklaratif */
export const DualCrossMarquee = CounterFlowMarquee;

/* =========================================================================
 * 7. VERTICAL & PERSPECTIVE MARQUEE
 * ========================================================================= */

export const VerticalMarquee = forwardRef<
  HTMLDivElement,
  Omit<MarqueeProps, "orientation">
>((props, ref) => (
  <Marquee ref={ref} orientation="vertical" variant="vertical" {...props} />
));
VerticalMarquee.displayName = "VerticalMarquee";

export const PerspectiveMarquee = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, ...props }, ref) => (
    <div className="overflow-hidden py-8 [perspective:1000px]">
      <div className="rotate-x-[25deg] rotate-y-[-10deg] rotate-z-[5deg] scale-105">
        <Marquee ref={ref} variant="perspective" className={className} {...props} />
      </div>
    </div>
  )
);
PerspectiveMarquee.displayName = "PerspectiveMarquee";

/** Alias deklaratif */
export const IsometricMarquee = PerspectiveMarquee;

/* =========================================================================
 * 8. MASTER MARQUEE COMPONENT
 * ========================================================================= */

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      items,
      renderItem,
      children,
      variant = "default",
      size = "default",
      orientation = "horizontal",
      direction,
      speed = "normal",
      pauseOnHover = true,
      fade = true,
      gap = 16,
      repeat = 2,
      reverse = false,
      className,
      trackClassName,
      style,
      ...props
    },
    ref
  ) => {
    // Route ke specialized variant jika user memanggil via prop variant
    if (variant === "draggable") {
      return (
        <DraggableMarquee
          ref={ref}
          size={size}
          gap={gap}
          className={className}
          {...props}
        >
          {children}
        </DraggableMarquee>
      );
    }

    if (variant === "scroll") {
      return (
        <ScrollVelocityMarquee
          ref={ref}
          size={size}
          fade={fade}
          gap={gap}
          className={className}
          {...props}
        >
          {children}
        </ScrollVelocityMarquee>
      );
    }

    if (variant === "counter") {
      return (
        <CounterFlowMarquee
          ref={ref}
          fade={fade}
          gap={gap}
          className={className}
          topContent={children}
          bottomContent={children}
          {...props}
        />
      );
    }

    const isVertical =
      variant === "vertical" ||
      orientation === "vertical" ||
      direction === "up" ||
      direction === "down";

    let resolvedDirection: MarqueeDirection = isVertical
      ? direction === "down"
        ? "down"
        : "up"
      : direction === "right"
      ? "right"
      : "left";

    // Dukungan reverse prop
    if (reverse) {
      if (resolvedDirection === "left") resolvedDirection = "right";
      else if (resolvedDirection === "right") resolvedDirection = "left";
      else if (resolvedDirection === "up") resolvedDirection = "down";
      else if (resolvedDirection === "down") resolvedDirection = "up";
    }

    const duration =
      typeof speed === "number" ? speed : SPEED_PRESETS[speed] ?? 30;
    const gapValue = typeof gap === "number" ? `${gap}px` : gap;

    // Nama keyframes CSS sesuai arah
    const animationName =
      resolvedDirection === "up"
        ? "a-marquee-scroll-up"
        : resolvedDirection === "down"
        ? "a-marquee-scroll-down"
        : resolvedDirection === "right"
        ? "a-marquee-scroll-right"
        : "a-marquee-scroll-left";

    // Gradient mask tembus pandang otomatis (beradaptasi di Light maupun Dark mode)
    const maskGradient = fade
      ? isVertical
        ? "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)"
        : "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
      : undefined;

    let content = children;

    if (!content && items && items.length > 0) {
      content = (
        <div className={cn("flex items-center", isVertical ? "flex-col gap-3" : "gap-4")}>
          {items.map((item, idx) =>
            renderItem ? (
              <React.Fragment key={item?.id ?? idx}>
                {renderItem(item, idx)}
              </React.Fragment>
            ) : (
              <div
                key={item?.id ?? idx}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-2xs whitespace-nowrap"
              >
                {item?.image && (
                  <img src={item.image} alt="" className="h-4 w-4 rounded-full object-cover" />
                )}
                {typeof item?.icon === "function" ? (
                  item.icon("h-3.5 w-3.5")
                ) : item?.icon ? (
                  item.icon
                ) : (
                  <span className="text-blue-500 font-mono">✦</span>
                )}
                <span>{item?.title ?? item?.name ?? String(item)}</span>
                {(item?.stat || item?.tag || item?.category || item?.badge) && (
                  <span className="text-[10px] text-zinc-400 font-mono">
                    [{item?.stat ?? item?.tag ?? item?.category ?? item?.badge}]
                  </span>
                )}
              </div>
            )
          )}
        </div>
      );
    } else if (!content) {
      content = (
        <div className="flex gap-4 items-center">
          {DEFAULT_MARQUEE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-2xs whitespace-nowrap"
            >
              <span className="text-blue-500 font-mono">✦</span>
              <span>{item.title}</span>
              <span className="text-[10px] text-zinc-400 font-mono">
                [{item.stat}]
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          marqueeVariants({ variant, size }),
          isVertical ? "flex-col h-full w-auto" : "flex-row w-full",
          className
        )}
        style={{
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
          ...style,
        }}
        {...props}
      >
        <style>{`
          @keyframes a-marquee-scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          @keyframes a-marquee-scroll-right {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes a-marquee-scroll-up {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
          }
          @keyframes a-marquee-scroll-down {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          .a-marquee-container:hover .a-marquee-pause {
            animation-play-state: paused !important;
          }
        `}</style>

        {Array.from({ length: Math.max(2, repeat) }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0 ? "true" : undefined}
            className={cn(
              "flex shrink-0",
              isVertical
                ? "flex-col items-center justify-around w-full"
                : "items-center justify-around",
              pauseOnHover &&
                "a-marquee-pause group-hover:[animation-play-state:paused]",
              trackClassName
            )}
            style={{
              gap: gapValue,
              ...(isVertical
                ? { paddingBottom: gapValue }
                : { paddingRight: gapValue }),
              animation: `${animationName} ${duration}s linear infinite`,
              willChange: "transform",
            }}
          >
            {content}
          </div>
        ))}
      </div>
    );
  }
);
Marquee.displayName = "Marquee";

/** Alias deklaratif untuk <Marquee /> */
export const InfiniteMarquee = Marquee;
