import {
  forwardRef,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { ArrowRightIcon } from "../../icons";

/** Visual Style Variants (Warna & Border) */
export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

/** Ukuran Tombol */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * 18 Pilihan Interactive Animation Physics:
 * 1. 'spring-bounce': Scale mengecil saat di-tap dengan efek pegas elastis.
 * 2. 'press-3d': Efek tombol fisik yang tertekan ke bawah (translateY).
 * 3. 'slide-reveal': Icon/teks tersembunyi meluncur masuk saat di-hover.
 * 4. 'magnetic-glow': Efek box-shadow aura bercahaya saat kursor mendekat.
 * 5. 'shimmer-sweep': Efek kilau cahaya (shimmer) yang menyapu miring melewati tombol.
 * 6. 'glitch-cyberpunk': Saat di-hover, geser x, y, skew asimetris cepat + chromatic aberration merah/cyan.
 * 7. 'particle-burst': Saat diklik, 12 partikel menyebar 360 derajat (-48px s/d 48px) tanpa terpotong overflow.
 * 8. 'magnetic-tilt': Efek 3D tilt (rotasi X dan Y) yang mengikuti posisi kursor mouse.
 * 9. 'liquid-gooey': Morphing border-radius secara organik/acak saat di-hover.
 * 10. 'neon-pulse': Box-shadow neon berdenyut infinite menggunakan keyframe Framer Motion.
 * 11. 'ripple-echo': Riak air melingkar memancar dari titik kursor mouse saat diklik.
 * 12. 'fold-out': Efek lipatan kertas 3D terbuka saat di-hover (rotateX & perspective 1000px).
 * 13. 'swipe-fill': Blok solid menyapu dari kiri ke kanan dengan mix-blend-difference pada teks.
 * 14. 'pixelate-morph': Efek blur/contrast ekstrim bergetar patah-patah sesaat saat di-hover.
 * 15. 'jelly-wobble': Tombol bergoyang lentur seperti jelly (scaleX membesar, scaleY mengecil) saat di-hover.
 * 16. 'border-beam': 2 layer absolut internal: layer bawah conic-gradient neon berputar & layer atas solid masking.
 * 17. 'flip-3d': Tombol berputar 180 derajat pada sumbu X ke belakang dengan transform-style: preserve-3d.
 * 18. 'elastic-snap': Tombol tersentak x: 15 dengan spring stiffness 400 damping 10 saat di-hover.
 */
export type ButtonAnimationType =
  | "spring-bounce"
  | "press-3d"
  | "slide-reveal"
  | "magnetic-glow"
  | "shimmer-sweep"
  | "glitch-cyberpunk"
  | "particle-burst"
  | "magnetic-tilt"
  | "liquid-gooey"
  | "neon-pulse"
  | "ripple-echo"
  | "fold-out"

  | "pixelate-morph"
  | "jelly-wobble"
  | "border-beam"
  | "flip-3d"
  | "elastic-snap";

export interface ButtonAnimationProps
  extends Omit<HTMLMotionProps<"button">, "children" | "onClick"> {
  children?: ReactNode;
  /** Gaya visual tampilan warna tombol */
  variant?: ButtonVariant;
  /** Ukuran tombol */
  size?: ButtonSize;
  /** 19 Pilihan variasi fisika animasi */
  animation?: ButtonAnimationType;
  /** Alias backward compatibility untuk animation */
  animationVariant?: ButtonAnimationType;
  /** Status loading manual dengan spinner bawaan */
  isLoading?: boolean;
  /** Icon di sebelah kiri teks */
  leftIcon?: ReactNode;
  /** Icon di sebelah kanan teks */
  rightIcon?: ReactNode;
  /** Efek shimmer kilau animasi manual */
  shimmer?: boolean;
  /** Handler klik tombol */
  onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  /** Teks/konten pada sisi belakang khusus variant 'flip-3d' */
  backContent?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 shadow-xs",
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 shadow-xs",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
  outline:
    "border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",

};

const variantBgMap: Record<ButtonVariant, string> = {
  default: "bg-neutral-900 dark:bg-neutral-950",
  primary: "bg-neutral-900 dark:bg-neutral-950",
  secondary: "bg-neutral-100 dark:bg-neutral-800",
  outline: "bg-white dark:bg-neutral-900",
  ghost: "bg-neutral-100 dark:bg-neutral-900",

};

const sizeStyles: Record<ButtonSize, { base: string; rounded: string }> = {
  sm: { base: "h-8 px-3 text-xs gap-1.5 rounded-lg", rounded: "rounded-lg" },
  md: { base: "h-10 px-4 text-sm gap-2 rounded-xl", rounded: "rounded-xl" },
  lg: { base: "h-12 px-6 text-base gap-2.5 rounded-2xl", rounded: "rounded-2xl" },
};

const BURST_PARTICLES = [
  { id: 0, x: 46, y: 0, color: "#3b82f6", size: 6 },
  { id: 1, x: 33, y: 33, color: "#ec4899", size: 5 },
  { id: 2, x: 0, y: 48, color: "#10b981", size: 7 },
  { id: 3, x: -33, y: 33, color: "#f59e0b", size: 5 },
  { id: 4, x: -46, y: 0, color: "#6366f1", size: 6 },
  { id: 5, x: -33, y: -33, color: "#06b6d4", size: 5 },
  { id: 6, x: 0, y: -48, color: "#ec4899", size: 7 },
  { id: 7, x: 33, y: -33, color: "#3b82f6", size: 5 },
  { id: 8, x: 22, y: 44, color: "#8b5cf6", size: 4 },
  { id: 9, x: -44, y: 22, color: "#10b981", size: 6 },
  { id: 10, x: -22, y: -44, color: "#f59e0b", size: 5 },
  { id: 11, x: 44, y: -22, color: "#06b6d4", size: 4 },
];

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export const ButtonAnimation = forwardRef<
  HTMLButtonElement,
  ButtonAnimationProps
>(
  (
    {
      children,
      variant = "default",
      size = "md",
      animation = "spring-bounce",
      animationVariant,
      isLoading = false,
      leftIcon,
      rightIcon,
      shimmer = false,
      className,
      disabled,
      onClick,
      backContent,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    const activeAnimation = animationVariant ?? animation;
    const internalBtnRef = useRef<HTMLButtonElement | null>(null);

    const isMagneticTilt = activeAnimation === "magnetic-tilt";
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 350 };
    const tiltX = useSpring(useTransform(mouseY, [-30, 30], [16, -16]), springConfig);
    const tiltY = useSpring(useTransform(mouseX, [-30, 30], [-16, 16]), springConfig);
    const magX = useSpring(useTransform(mouseX, [-30, 30], [-8, 8]), springConfig);
    const magY = useSpring(useTransform(mouseY, [-30, 30], [-8, 8]), springConfig);

    const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (!isMagneticTilt) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      if (isMagneticTilt) {
        mouseX.set(0);
        mouseY.set(0);
      }
      if (isGlitch) setIsGlitching(false);
    };

    const isGlitch = activeAnimation === "glitch-cyberpunk";
    const [isGlitching, setIsGlitching] = useState(false);

    const isParticleBurst = activeAnimation === "particle-burst";
    const [isBursting, setIsBursting] = useState(false);
    const burstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const triggerBurst = () => {
      setIsBursting(false);
      requestAnimationFrame(() => {
        setIsBursting(true);
        if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
        burstTimeoutRef.current = setTimeout(() => {
          setIsBursting(false);
        }, 650);
      });
    };

    const isRippleEcho = activeAnimation === "ripple-echo";
    const [ripples, setRipples] = useState<RippleItem[]>([]);

    const triggerRipple = (e: ReactMouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple: RippleItem = { id: Date.now() + Math.random(), x, y };

      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 750);
    };

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (isParticleBurst) triggerBurst();
      if (isRippleEcho) triggerRipple(e);
      onClick?.(e);
    };

    const isPress3D = activeAnimation === "press-3d";
    const isMagneticGlow = activeAnimation === "magnetic-glow";
    const isSlideReveal = activeAnimation === "slide-reveal";
    const isLiquid = activeAnimation === "liquid-gooey";
    const isNeonPulse = activeAnimation === "neon-pulse";
    const isFoldOut = activeAnimation === "fold-out";

    const isBorderBeam = activeAnimation === "border-beam";
    const isFlip3D = activeAnimation === "flip-3d";
    const showShimmer = shimmer || activeAnimation === "shimmer-sweep";

    const getMotionConfig = () => {
      if (disabled || isLoading) {
        return { whileHover: undefined, whileTap: undefined };
      }

      switch (activeAnimation) {

        case "spring-bounce":
          return {
            whileHover: whileHover ?? { scale: 1.04 },
            whileTap: whileTap ?? { scale: 0.92 },
            transition: { type: "spring", stiffness: 500, damping: 18 },
          };

        case "press-3d":
          return {
            whileHover: whileHover ?? { y: -2 },
            whileTap: whileTap ?? { y: 4 },
            transition: { type: "spring", stiffness: 600, damping: 25 },
          };

        case "slide-reveal":
          return {
            whileHover: whileHover ?? { scale: 1.01 },
            whileTap: whileTap ?? { scale: 0.98 },
            transition: { type: "spring", stiffness: 450, damping: 25 },
          };

        case "magnetic-glow":
          return {
            whileHover: whileHover ?? { y: -3, scale: 1.02 },
            whileTap: whileTap ?? { y: 0, scale: 0.98 },
            transition: { type: "spring", stiffness: 400, damping: 20 },
          };

        case "shimmer-sweep":
          return {
            whileHover: whileHover ?? { scale: 1.02 },
            whileTap: whileTap ?? { scale: 0.97 },
            transition: { type: "spring", stiffness: 450, damping: 25 },
          };

        case "glitch-cyberpunk":
          return {
            whileHover: whileHover ?? {
              x: [-2, 3, -3, 2, -1, 3, 0],
              y: [1, -2, 2, -1, 0],
              skewX: [0, 5, -5, 2, 0],
              transition: { repeat: Infinity, duration: 0.18, ease: "linear" },
            },
            whileTap: whileTap ?? { scale: 0.96 },
          };

        case "particle-burst":
          return {
            whileHover: whileHover ?? { scale: 1.03 },
            whileTap: whileTap ?? { scale: 0.92 },
            transition: { type: "spring", stiffness: 500, damping: 20 },
          };

        case "magnetic-tilt":
          return {
            whileHover: whileHover ?? { scale: 1.05 },
            whileTap: whileTap ?? { scale: 0.96 },
          };

        case "liquid-gooey":
          return {
            whileHover: whileHover ?? {
              scale: 1.05,
              borderRadius: [
                "24px 8px 24px 8px",
                "10px 24px 10px 24px",
                "24px 12px 20px 8px",
                "12px 24px 8px 20px",
                "24px 8px 24px 8px",
              ],
              transition: {
                borderRadius: {
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                },
                scale: { duration: 0.2 },
              },
            },
            whileTap: whileTap ?? { scale: 0.95 },
          };

        case "neon-pulse":
          return {
            whileHover: whileHover ?? { scale: 1.04 },
            whileTap: whileTap ?? { scale: 0.96 },
          };

        case "ripple-echo":
          return {
            whileHover: whileHover ?? { scale: 1.02 },
            whileTap: whileTap ?? { scale: 0.95 },
            transition: { type: "spring", stiffness: 500, damping: 20 },
          };

        case "fold-out":
          return {
            whileHover: whileHover ?? {
              rotateX: 22,
              y: -6,
              scale: 1.05,
              boxShadow: "0 22px 30px -8px rgba(0, 0, 0, 0.35)",
            },
            whileTap: whileTap ?? { rotateX: 0, y: 0, scale: 0.98 },
            transition: { type: "spring", stiffness: 400, damping: 20 },
          };

        case "pixelate-morph":
          return {
            whileHover: whileHover ?? {
              x: [0, -4, 4, -3, 3, -1, 1, 0],
              y: [0, 2, -3, 3, -2, 1, 0],
              filter: [
                "blur(0px) contrast(1)",
                "blur(3px) contrast(2.5)",
                "blur(1px) contrast(1.8)",
                "blur(2.5px) contrast(3)",
                "blur(0px) contrast(1)",
              ],
              transition: { duration: 0.45, ease: "linear" },
            },
            whileTap: whileTap ?? { scale: 0.95 },
          };

        case "jelly-wobble":
          return {
            whileHover: whileHover ?? {
              scaleX: [1, 1.25, 0.75, 1.15, 0.9, 1.05, 1],
              scaleY: [1, 0.75, 1.25, 0.85, 1.1, 0.95, 1],
              transition: { duration: 0.65, ease: "easeInOut" },
            },
            whileTap: whileTap ?? { scale: 0.92 },
          };

        case "border-beam":
          return {
            whileHover: whileHover ?? { scale: 1.03 },
            whileTap: whileTap ?? { scale: 0.97 },
            transition: { type: "spring", stiffness: 450, damping: 20 },
          };

        case "flip-3d":
          return {
            whileHover: whileHover ?? {
              rotateX: 180,
              transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
            },
            whileTap: whileTap ?? { scale: 0.94 },
          };

        case "elastic-snap":
          return {
            whileHover: whileHover ?? { x: 15 },
            whileTap: whileTap ?? { x: 0, scale: 0.95 },
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          };

        default:
          return {};
      }
    };

    const getCustomAnimationClasses = () => {
      if (isPress3D) {
        return "border-b-[4px] border-neutral-950/80 active:border-b-0 dark:border-neutral-900 active:translate-y-1 shadow-md";
      }
      if (isSlideReveal) {
        return "group pr-6";
      }
      if (isGlitch) {
        return "font-mono tracking-wider uppercase border border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.35)]";
      }
      if (isFoldOut) {
        return "origin-top [transform-style:preserve-3d]";
      }
      if (isFlip3D) {
        return "[transform-style:preserve-3d]";
      }

      if (isBorderBeam) {
        return cn(
          "relative overflow-hidden",
          (variant === "default" || variant === "primary") && "!text-white dark:!text-white"
        );
      }
      if (isNeonPulse) {
        return "border border-blue-400/80";
      }
      return "";
    };

    const hasOverflowHidden =
      activeAnimation !== "particle-burst" &&
      activeAnimation !== "ripple-echo";

    return (
      <div
        className={cn(
          "relative inline-block isolate",
          isMagneticGlow && "group",
          (isMagneticTilt || isFoldOut || isFlip3D) && "[perspective:1000px]"
        )}
      >
        {isMagneticGlow && !disabled && !isLoading && (
          <div className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-0 blur-lg transition-colors. duration-300 group-hover:opacity-80 group-hover:scale-105 -z-10" />
        )}

        {isParticleBurst && (
          <AnimatePresence>
            {isBursting && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                {BURST_PARTICLES.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      scale: [0, 1.4, 0.4],
                      opacity: [1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      backgroundColor: p.color,
                      width: p.size,
                      height: p.size,
                    }}
                    className="absolute rounded-full shadow-md"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        )}

        {isRippleEcho && (
          <div className="pointer-events-none absolute inset-0 overflow-visible z-20">
            {ripples.map((r) => (
              <motion.span
                key={r.id}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                style={{ left: r.x, top: r.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-blue-400 dark:border-cyan-400 bg-blue-400/25"
              />
            ))}
          </div>
        )}

        <motion.button
          ref={(node) => {
            internalBtnRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          disabled={disabled || isLoading}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => {
            if (isGlitch) setIsGlitching(true);
          }}
          style={
            isMagneticTilt
              ? {
                  rotateX: tiltX,
                  rotateY: tiltY,
                  x: magX,
                  y: magY,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
          animate={
            isNeonPulse
              ? {
                  boxShadow: [
                    "0px 0px 0px rgba(59,130,246,0)",
                    "0px 0px 20px rgba(59,130,246,0.85)",
                    "0px 0px 0px rgba(59,130,246,0)",
                  ],
                }
              : undefined
          }
          transition={
            isNeonPulse
              ? {
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }
              : undefined
          }
          {...getMotionConfig()}
          className={cn(
            "relative inline-flex items-center justify-center font-medium select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer z-10",
            hasOverflowHidden && "overflow-hidden",
            variantStyles[variant],
            sizeStyles[size].base,
            getCustomAnimationClasses(),
            className
          )}
          {...props}
        >
          {isBorderBeam && (
            <>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-neutral-300/80 dark:border-neutral-800 z-0" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] aspect-square flex items-center justify-center overflow-hidden z-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                  className="w-full h-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #38bdf8 300deg, #818cf8 330deg, #ec4899 355deg, transparent 360deg)",
                  }}
                />
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] aspect-square flex items-center justify-center overflow-hidden z-0 blur-[2px] opacity-75">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
                  className="w-full h-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #38bdf8 300deg, #818cf8 330deg, #ec4899 355deg, transparent 360deg)",
                  }}
                />
              </div>

              <div
                className={cn(
                  "pointer-events-none absolute inset-[1.5px] rounded-[inherit] z-0 transition-colors",
                  variantBgMap[variant]
                )}
              />
            </>
          )}

          {showShimmer && !disabled && !isLoading && (
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "250%" }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"
            />
          )}

          {isLiquid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.25, scale: 1.15 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 blur-sm -z-0"
            />
          )}

          {isFoldOut && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent -z-0" />
          )}

          {isFlip3D && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 [transform:rotateX(180deg)] [backface-visibility:hidden] z-20 font-bold text-blue-500 dark:text-cyan-400">
              {backContent ?? "✨ Hello Backside"}
            </div>
          )}

          {isGlitch && (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 flex items-center justify-center font-mono font-bold select-none text-cyan-400 opacity-0 transition-opacity",
                  isGlitching && "opacity-90 animate-pulse"
                )}
                style={{
                  textShadow: "2px 0 #00ffff",
                  clipPath: "polygon(0 15%, 100% 15%, 100% 55%, 0 55%)",
                  transform: isGlitching ? "translate(-2px, -1px)" : undefined,
                }}
              >
                {children}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 flex items-center justify-center font-mono font-bold select-none text-rose-500 opacity-0 transition-opacity",
                  isGlitching && "opacity-90 animate-pulse"
                )}
                style={{
                  textShadow: "-2px 0 #ff0055",
                  clipPath: "polygon(0 50%, 100% 50%, 100% 85%, 0 85%)",
                  transform: isGlitching ? "translate(2px, 1px)" : undefined,
                }}
              >
                {children}
              </span>

              {isGlitching && (
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "150%" }}
                  transition={{ repeat: Infinity, duration: 0.45, ease: "linear" }}
                  className="pointer-events-none absolute inset-x-0 h-1 bg-cyan-300 opacity-75 shadow-[0_0_8px_cyan]"
                />
              )}
            </>
          )}

          <div
            className={cn(
              "inline-flex items-center justify-center gap-2 relative z-10",
              isFlip3D && "[backface-visibility:hidden]",

              isBorderBeam && (variant === "default" || variant === "primary") && "!text-white dark:!text-white"
            )}
          >

            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 shrink-0 text-current mr-0.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}

            {!isLoading && leftIcon && (
              <span className="shrink-0 flex items-center justify-center">
                {leftIcon}
              </span>
            )}

            <span
              className={cn(
                "transition-transform duration-200",
                isSlideReveal && "group-hover:-translate-x-1.5"
              )}
            >
              {children}
            </span>

            {!isLoading && (
              <>
                {isSlideReveal ? (
                  <span className="absolute right-3.5 inline-flex items-center justify-center opacity-0 -translate-x-2 transition-colors. duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                    {rightIcon ?? <ArrowRightIcon size={15} />}
                  </span>
                ) : (
                  rightIcon && (
                    <span className="shrink-0 flex items-center justify-center">
                      {rightIcon}
                    </span>
                  )
                )}
              </>
            )}
          </div>
        </motion.button>
      </div>
    );
  }
);

ButtonAnimation.displayName = "ButtonAnimation";
