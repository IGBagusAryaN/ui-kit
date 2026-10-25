import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { SunIcon, MoonIcon, CheckIcon, CloseIcon } from "../../icons";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. CVA VARIANTS & BASE PROPS
 * ========================================================================= */

export const toggleVariants = cva(
  "relative inline-flex items-center rounded-full outline-none select-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border",
        "theme-morph": "border shadow-inner",
        "elastic-gooey": "border-none shadow-inner",
        "minimal-action": "border shadow-xs hover:shadow-md",
        outline: "border bg-transparent",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Standar interface terpadu untuk seluruh variasi Toggle di @needui/ui-kit.
 */
export interface BaseToggleProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onChange" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
    >,
    VariantProps<typeof toggleVariants> {
  /** Status aktif dalam mode terkontrol (controlled mode) */
  checked?: boolean;
  /** Status awal saat pertama kali dimuat (uncontrolled mode) */
  defaultChecked?: boolean;
  /** Callback saat saklar diklik dan mengalami perubahan status */
  onChange?: (checked: boolean) => void;
  /** Alias callback Radix UI / shadcn compatible */
  onCheckedChange?: (checked: boolean) => void;
}

/* =========================================================================
 * 2. THEME MORPH TOGGLE
 * ========================================================================= */

export interface ThemeMorphToggleProps extends BaseToggleProps {
  sunIcon?: React.ReactNode;
  moonIcon?: React.ReactNode;
}

const THEME_SIZE_CONFIGS = {
  sm: { track: "w-14 h-8 p-1", thumb: "w-6 h-6", travelX: 24, iconSize: 13 },
  default: { track: "w-20 h-11 p-1.5", thumb: "w-8 h-8", travelX: 36, iconSize: 16 },
  lg: { track: "w-24 h-13 p-1.5", thumb: "w-10 h-10", travelX: 44, iconSize: 20 },
} as const;

export const ThemeMorphToggle = forwardRef<HTMLButtonElement, ThemeMorphToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      onCheckedChange,
      size = "default",
      sunIcon,
      moonIcon,
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
    const isDark = isControlled ? controlledChecked : internalChecked;
    const config = THEME_SIZE_CONFIGS[size as keyof typeof THEME_SIZE_CONFIGS] || THEME_SIZE_CONFIGS.default;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const nextChecked = !isDark;
      if (!isControlled) setInternalChecked(nextChecked);
      onChange?.(nextChecked);
      onCheckedChange?.(nextChecked);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={props["aria-label"] || (isDark ? "Switch to light mode" : "Switch to dark mode")}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          toggleVariants({ variant: "theme-morph", size }),
          config.track,
          isDark
            ? "bg-indigo-950 border-indigo-700/60 shadow-indigo-950/60"
            : "bg-sky-200 border-sky-300 shadow-sky-300/40",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <motion.div
            initial={false}
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <span className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" />
            <span className="absolute bottom-2 left-5 w-1 h-1 bg-indigo-200 rounded-full opacity-50" />
            <span className="absolute top-3 left-7 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: isDark ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <span className="absolute top-2 right-3 w-3 h-1.5 bg-white/70 rounded-full" />
            <span className="absolute bottom-2 right-5 w-4 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>

        <motion.div
          animate={{ x: isDark ? config.travelX : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "relative z-10 rounded-full flex items-center justify-center shadow-md transition-colors",
            config.thumb,
            isDark
              ? "bg-indigo-600 text-indigo-100 shadow-indigo-950/60"
              : "bg-amber-400 text-amber-950 shadow-amber-500/40"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {moonIcon || <MoonIcon size={config.iconSize} />}
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {sunIcon || <SunIcon size={config.iconSize} />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    );
  }
);
ThemeMorphToggle.displayName = "ThemeMorphToggle";

/* =========================================================================
 * 3. ELASTIC GOOEY TOGGLE
 * ========================================================================= */

export interface ElasticGooeyToggleProps extends BaseToggleProps {}

const ELASTIC_SIZE_CONFIGS = {
  sm: { track: "w-14 h-8 p-1", thumb: "w-6 h-6", travelX: 24, dotSize: "w-2 h-2" },
  default: { track: "w-20 h-11 p-1.5", thumb: "w-8 h-8", travelX: 36, dotSize: "w-2.5 h-2.5" },
  lg: { track: "w-24 h-13 p-1.5", thumb: "w-10 h-10", travelX: 44, dotSize: "w-3 h-3" },
} as const;

export const ElasticGooeyToggle = forwardRef<HTMLButtonElement, ElasticGooeyToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      onCheckedChange,
      size = "default",
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isOn = isControlled ? controlledChecked : internalChecked;
    const config = ELASTIC_SIZE_CONFIGS[size as keyof typeof ELASTIC_SIZE_CONFIGS] || ELASTIC_SIZE_CONFIGS.default;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const next = !isOn;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
      onCheckedChange?.(next);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={props["aria-label"] || (isOn ? "Active" : "Inactive")}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          toggleVariants({ variant: "elastic-gooey", size }),
          config.track,
          isOn ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        <motion.div
          animate={{
            x: isOn ? config.travelX : 0,
            scaleX: [1, 1.45, 1],
            scaleY: [1, 0.72, 1],
          }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className={cn(
            "rounded-full shadow-md flex items-center justify-center transition-colors",
            config.thumb,
            isOn
              ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
              : "bg-white text-zinc-400 dark:bg-zinc-300 dark:text-zinc-700"
          )}
        >
          <motion.div
            animate={{ scale: isOn ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-full transition-colors",
              config.dotSize,
              isOn ? "bg-emerald-500" : "bg-zinc-400 dark:bg-zinc-500"
            )}
          />
        </motion.div>
      </button>
    );
  }
);
ElasticGooeyToggle.displayName = "ElasticGooeyToggle";

/* =========================================================================
 * 4. MINIMAL ACTION TOGGLE
 * ========================================================================= */

export interface MinimalActionToggleProps extends BaseToggleProps {
  lightLabel?: string;
  darkLabel?: string;
}

const MINIMAL_SIZE_CONFIGS = {
  sm: "h-8 px-3 text-[11px] gap-2",
  default: "h-9 px-4 py-2 text-xs gap-2.5",
  lg: "h-11 px-6 text-sm gap-3",
} as const;

export const MinimalActionToggle = forwardRef<HTMLButtonElement, MinimalActionToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      onCheckedChange,
      lightLabel = "Light",
      darkLabel = "Dark",
      size = "default",
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isDark = isControlled ? controlledChecked : internalChecked;
    const sizeClass = MINIMAL_SIZE_CONFIGS[size as keyof typeof MINIMAL_SIZE_CONFIGS] || MINIMAL_SIZE_CONFIGS.default;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const next = !isDark;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
      onCheckedChange?.(next);
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          toggleVariants({ variant: "minimal-action", size }),
          sizeClass,
          "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0.35, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.35, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-amber-400"
              >
                <MoonIcon size={15} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0.35, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.35, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-amber-500"
              >
                <SunIcon size={15} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-4 overflow-hidden relative min-w-[38px] text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "Dark" : "Light"}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="block leading-4 font-bold"
            >
              {isDark ? darkLabel : lightLabel}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>
    );
  }
);
MinimalActionToggle.displayName = "MinimalActionToggle";

/* =========================================================================
 * 5. SLIDING TEXT TOGGLE
 * ========================================================================= */

export interface SlidingOption<T extends string = string> {
  value: T;
  label: string;
  badge?: string;
}

export interface SlidingTextToggleProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  value?: T;
  defaultValue?: T;
  options?: SlidingOption<T>[];
  onChange?: (value: T) => void;
}

const SLIDING_SIZE_CONFIGS = {
  sm: { container: "p-1", item: "px-3.5 py-1.5 text-[11px]" },
  default: { container: "p-1.5", item: "px-5 py-2 text-xs" },
  lg: { container: "p-2", item: "px-6 py-2.5 text-sm" },
} as const;

export const SlidingTextToggle = forwardRef<HTMLDivElement, SlidingTextToggleProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      options = [
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Annual", badge: "-20%" },
      ],
      onChange,
      size = "default",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue || options[0]?.value || ""
    );
    const activeValue = isControlled ? controlledValue : internalValue;
    const config = SLIDING_SIZE_CONFIGS[size as keyof typeof SLIDING_SIZE_CONFIGS] || SLIDING_SIZE_CONFIGS.default;

    const handleSelect = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val as any);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-inner",
          config.container,
          className
        )}
        {...props}
      >
        {options.map((option) => {
          const isActive = activeValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative font-semibold rounded-full transition-colors z-10 cursor-pointer select-none",
                config.item
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="slidingPlanHighlight"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-700"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 transition-colors duration-150 flex items-center gap-1.5",
                  isActive
                    ? "text-zinc-950 dark:text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {option.label}
                {option.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {option.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);
SlidingTextToggle.displayName = "SlidingTextToggle";

/* =========================================================================
 * 6. UNIFIED ANIMATED TOGGLE (MASTER SWITCH PRIMITIVE)
 * ========================================================================= */

export interface AnimatedToggleProps extends BaseToggleProps {
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
  sunIcon?: React.ReactNode;
  moonIcon?: React.ReactNode;
  lightLabel?: string;
  darkLabel?: string;
}

const DEFAULT_SIZE_CONFIGS = {
  sm: { track: "w-11 h-6 p-0.5", thumb: "w-5 h-5", travelX: 20, iconSize: 11 },
  default: { track: "w-14 h-8 p-1", thumb: "w-6 h-6", travelX: 24, iconSize: 13 },
  lg: { track: "w-20 h-11 p-1.5", thumb: "w-8 h-8", travelX: 36, iconSize: 16 },
} as const;

export const AnimatedToggle = forwardRef<HTMLButtonElement, AnimatedToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      onCheckedChange,
      variant = "default",
      size = "default",
      activeIcon,
      inactiveIcon,
      sunIcon,
      moonIcon,
      lightLabel,
      darkLabel,
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    // Jika dipanggil dengan varian spesifik, delegasikan langsung
    if (variant === "theme-morph") {
      return (
        <ThemeMorphToggle
          ref={ref}
          checked={controlledChecked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onCheckedChange={onCheckedChange}
          size={size}
          sunIcon={sunIcon}
          moonIcon={moonIcon}
          disabled={disabled}
          className={className}
          onClick={onClick}
          {...props}
        />
      );
    }

    if (variant === "elastic-gooey") {
      return (
        <ElasticGooeyToggle
          ref={ref}
          checked={controlledChecked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onCheckedChange={onCheckedChange}
          size={size}
          disabled={disabled}
          className={className}
          onClick={onClick}
          {...props}
        />
      );
    }

    if (variant === "minimal-action") {
      return (
        <MinimalActionToggle
          ref={ref}
          checked={controlledChecked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          onCheckedChange={onCheckedChange}
          size={size}
          lightLabel={lightLabel}
          darkLabel={darkLabel}
          disabled={disabled}
          className={className}
          onClick={onClick}
          {...(props as any)}
        />
      );
    }

    // Default: Modern fluid switch (iOS / NeedUI Signature Switch)
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isOn = isControlled ? controlledChecked : internalChecked;
    const config = DEFAULT_SIZE_CONFIGS[size as keyof typeof DEFAULT_SIZE_CONFIGS] || DEFAULT_SIZE_CONFIGS.default;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const next = !isOn;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
      onCheckedChange?.(next);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={props["aria-label"] || (isOn ? "Active" : "Inactive")}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          toggleVariants({ variant: "default", size }),
          config.track,
          isOn
            ? "bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100"
            : "bg-zinc-200 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        <motion.div
          animate={{ x: isOn ? config.travelX : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className={cn(
            "rounded-full shadow-md flex items-center justify-center transition-colors",
            config.thumb,
            isOn
              ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
              : "bg-white text-zinc-400 dark:bg-zinc-300 dark:text-zinc-700"
          )}
        >
          {isOn ? (
            activeIcon || <CheckIcon size={config.iconSize} />
          ) : (
            inactiveIcon || <CloseIcon size={config.iconSize} />
          )}
        </motion.div>
      </button>
    );
  }
);
AnimatedToggle.displayName = "AnimatedToggle";

/** Alias deklaratif untuk <AnimatedToggle /> */
export const Toggle = AnimatedToggle;
export const Switch = AnimatedToggle;
