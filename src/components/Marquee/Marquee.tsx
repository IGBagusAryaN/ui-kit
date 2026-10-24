import React from "react";
import { cn } from "../../utils/cn";

export type MarqueeOrientation = "horizontal" | "vertical";
export type MarqueeDirection = "left" | "right" | "up" | "down";
export type MarqueeSpeed = "slow" | "normal" | "fast" | number;

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elemen konten yang akan digulirkan secara berulang */
  children: React.ReactNode;
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

export function Marquee({
  children,
  orientation = "horizontal",
  direction,
  speed = "normal",
  pauseOnHover = true,
  fade = true,
  gap = 16,
  repeat = 2,
  className,
  trackClassName,
  style,
  ...props
}: MarqueeProps) {

  const isVertical = orientation === "vertical" || direction === "up" || direction === "down";

  const resolvedDirection: MarqueeDirection = isVertical
    ? direction === "down"
      ? "down"
      : "up"
    : direction === "right"
    ? "right"
    : "left";

  const duration = typeof speed === "number" ? speed : SPEED_PRESETS[speed] ?? 30;
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

  // Gradient mask tembus pandang otomatis (beradaptasi sempurna di Light maupun Dark mode)
  const maskGradient = fade
    ? isVertical
      ? "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)"
      : "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
    : undefined;

  return (
    <div
      className={cn(
        "group a-marquee-container relative flex overflow-hidden select-none",
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

      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 ? "true" : undefined}
          className={cn(
            "flex shrink-0",
            isVertical ? "flex-col items-center justify-around w-full" : "items-center justify-around",
            pauseOnHover && "a-marquee-pause group-hover:[animation-play-state:paused]",
            trackClassName
          )}
          style={{
            gap: gapValue,
            ...(isVertical ? { paddingBottom: gapValue } : { paddingRight: gapValue }),
            animation: `${animationName} ${duration}s linear infinite`,
            willChange: "transform",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
