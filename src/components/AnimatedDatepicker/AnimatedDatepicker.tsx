import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  RefreshCwIcon,
} from "../../icons";

// ============================================================================
// CVA VARIANTS
// ============================================================================

export const datepickerVariants = cva("w-full select-none", {
  variants: {
    variant: {
      fluid: "datepicker-fluid",
      wheel: "datepicker-wheel",
      timeline: "datepicker-timeline",
    },
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-xl",
      full: "w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "fluid",
    size: "md",
  },
});

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface BaseDatepickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  disabled?: boolean;
}

export interface AnimatedDatepickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof datepickerVariants>,
    BaseDatepickerProps {}

export interface FluidSwipeCalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    BaseDatepickerProps {
  size?: "sm" | "md" | "lg" | "full";
  showPresets?: boolean;
}

export interface CupertinoWheelDatepickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    BaseDatepickerProps {
  size?: "sm" | "md" | "lg" | "full";
  yearRange?: number[];
  showQuickStepper?: boolean;
}

export interface ElasticTimelineDatepickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    BaseDatepickerProps {
  size?: "sm" | "md" | "lg" | "full";
  daysSpan?: number;
}

// ============================================================================
// HELPER FUNCTIONS & HOOKS
// ============================================================================

function isSameDay(d1?: Date, d2?: Date): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function useControllableDate({
  value,
  defaultValue,
  onChange,
}: {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}) {
  const [internalDate, setInternalDate] = useState<Date>(
    () => value ?? defaultValue ?? new Date()
  );

  const isControlled = value !== undefined;
  const activeDate = isControlled ? (value as Date) : internalDate;

  const setDate = useCallback(
    (newDate: Date) => {
      if (!isControlled) {
        setInternalDate(newDate);
      }
      onChange?.(newDate);
    },
    [isControlled, onChange]
  );

  return [activeDate, setDate] as const;
}

// ============================================================================
// 1. FLUID SWIPE CALENDAR
// ============================================================================

export const FluidSwipeCalendar = forwardRef<HTMLDivElement, FluidSwipeCalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      locale = "en-US",
      disabled = false,
      size = "md",
      showPresets = true,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useControllableDate({
      value,
      defaultValue,
      onChange,
    });

    const [currentMonth, setCurrentMonth] = useState<Date>(
      () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    );
    const [direction, setDirection] = useState<number>(0);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const changeMonth = (offset: number) => {
      setDirection(offset);
      setCurrentMonth(new Date(year, month + offset, 1));
    };

    const handleSelect = (date: Date) => {
      if (disabled) return;
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;
      setSelectedDate(date);
    };

    const jumpTo = (daysOffset: number) => {
      if (disabled) return;
      const target = new Date();
      target.setDate(target.getDate() + daysOffset);
      setSelectedDate(target);
      setCurrentMonth(new Date(target.getFullYear(), target.getMonth(), 1));
      setDirection(target > currentMonth ? 1 : -1);
    };

    const monthName = useMemo(() => {
      return currentMonth.toLocaleString(locale, { month: "long" });
    }, [currentMonth, locale]);

    const weekdayHeaders = useMemo(() => {
      const base = new Date(2023, 0, 1); // Sunday
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        return d.toLocaleDateString(locale, { weekday: "narrow" });
      });
    }, [locale]);

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
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl shadow-zinc-200/30 dark:shadow-zinc-950/50",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-md",
          size === "lg" && "max-w-xl",
          size === "full" && "max-w-full",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span>{monthName}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                {year}
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Fluid directional swipe calendar
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => changeMonth(-1)}
              aria-label="Previous Month"
              className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xs transition cursor-pointer"
            >
              <ChevronLeftIcon size={16} />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => changeMonth(1)}
              aria-label="Next Month"
              className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xs transition cursor-pointer"
            >
              <ChevronRightIcon size={16} />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {weekdayHeaders.map((day, idx) => (
            <span
              key={idx}
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
                const isDisabledDate =
                  (minDate && cell.date < minDate) ||
                  (maxDate && cell.date > maxDate);

                return (
                  <button
                    key={cell.key}
                    type="button"
                    disabled={isDisabledDate}
                    onClick={() => handleSelect(cell.date)}
                    className={cn(
                      "relative flex flex-col items-center justify-center h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-medium transition-colors select-none cursor-pointer",
                      cell.isCurrentMonth
                        ? "text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white"
                        : "text-zinc-300 dark:text-zinc-600 hover:text-zinc-500",
                      selected && "text-white font-bold dark:text-white",
                      isDisabledDate && "opacity-30 cursor-not-allowed pointer-events-none"
                    )}
                  >
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

                    {isToday && !selected && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {showPresets && (
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => jumpTo(0)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => jumpTo(1)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => jumpTo(7)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
              >
                +7 Days
              </button>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              {selectedDate.toLocaleDateString(locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);
FluidSwipeCalendar.displayName = "FluidSwipeCalendar";

// ============================================================================
// 2. CUPERTINO WHEEL DATEPICKER
// ============================================================================

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
        if (Math.abs(offset) > 2) return null;

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

const DEFAULT_YEARS_LIST = [
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
];

export const CupertinoWheelDatepicker = forwardRef<
  HTMLDivElement,
  CupertinoWheelDatepickerProps
>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      locale = "en-US",
      disabled = false,
      size = "md",
      yearRange = DEFAULT_YEARS_LIST,
      showQuickStepper = true,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useControllableDate({
      value,
      defaultValue,
      onChange,
    });

    const monthsList = useMemo(() => {
      const base = new Date(2023, 0, 1);
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(base);
        d.setMonth(i);
        return d.toLocaleDateString(locale, { month: "short" });
      });
    }, [locale]);

    const initialYearIdx = Math.max(
      0,
      yearRange.indexOf(selectedDate.getFullYear())
    );
    const [monthIndex, setMonthIndex] = useState(selectedDate.getMonth());
    const [dayIndex, setDayIndex] = useState(selectedDate.getDate() - 1);
    const [yearIndex, setYearIndex] = useState(
      initialYearIdx !== -1 ? initialYearIdx : 0
    );

    const selectedYear = yearRange[yearIndex] ?? selectedDate.getFullYear();
    const maxDays = getDaysInMonth(selectedYear, monthIndex);
    const daysList = useMemo(
      () => Array.from({ length: maxDays }, (_, i) => i + 1),
      [maxDays]
    );

    // Keep state synced with prop value changes
    useEffect(() => {
      setMonthIndex(selectedDate.getMonth());
      setDayIndex(selectedDate.getDate() - 1);
      const yrIdx = yearRange.indexOf(selectedDate.getFullYear());
      if (yrIdx !== -1) setYearIndex(yrIdx);
    }, [selectedDate, yearRange]);

    // Guard against month changes shortening available days
    useEffect(() => {
      if (dayIndex >= maxDays) {
        setDayIndex(maxDays - 1);
      }
    }, [maxDays, dayIndex]);

    const commitDate = (mIdx: number, dIdx: number, yIdx: number) => {
      const yr = yearRange[yIdx] ?? selectedYear;
      const validDay = Math.min(dIdx + 1, getDaysInMonth(yr, mIdx));
      const newD = new Date(yr, mIdx, validDay);
      if (minDate && newD < minDate) return;
      if (maxDate && newD > maxDate) return;
      setSelectedDate(newD);
    };

    const handleSelectMonth = (mIdx: number) => {
      setMonthIndex(mIdx);
      commitDate(mIdx, dayIndex, yearIndex);
    };

    const handleSelectDay = (dIdx: number) => {
      setDayIndex(dIdx);
      commitDate(monthIndex, dIdx, yearIndex);
    };

    const handleSelectYear = (yIdx: number) => {
      setYearIndex(yIdx);
      commitDate(monthIndex, dayIndex, yIdx);
    };

    const resetToToday = () => {
      const today = new Date();
      setSelectedDate(today);
    };

    const stepSelection = (unit: "month" | "day" | "year", delta: number) => {
      if (unit === "month") {
        const next = Math.max(0, Math.min(monthsList.length - 1, monthIndex + delta));
        handleSelectMonth(next);
      } else if (unit === "day") {
        const next = Math.max(0, Math.min(daysList.length - 1, dayIndex + delta));
        handleSelectDay(next);
      } else if (unit === "year") {
        const next = Math.max(0, Math.min(yearRange.length - 1, yearIndex + delta));
        handleSelectYear(next);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-zinc-950/50",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-md",
          size === "lg" && "max-w-xl",
          size === "full" && "max-w-full",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ClockIcon size={16} />
            </div>
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Cupertino Drum Wheel
            </span>
          </div>

          <button
            type="button"
            onClick={resetToToday}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
          >
            <RefreshCwIcon size={13} />
            <span>Today</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800/80">
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

          <div className="relative h-[200px] overflow-hidden rounded-xl bg-white/40 dark:bg-zinc-900/30">
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-10 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 pointer-events-none z-0 shadow-xs" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-zinc-50 dark:from-zinc-950 via-zinc-50/70 dark:via-zinc-950/70 to-transparent z-20" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-zinc-50/70 dark:via-zinc-950/70 to-transparent z-20" />

            <div className="grid grid-cols-3 h-full relative z-10">
              <CupertinoDrumColumn
                items={monthsList}
                selectedIndex={monthIndex}
                onSelect={handleSelectMonth}
              />

              <CupertinoDrumColumn
                items={daysList}
                selectedIndex={dayIndex}
                onSelect={handleSelectDay}
              />

              <CupertinoDrumColumn
                items={yearRange}
                selectedIndex={yearIndex}
                onSelect={handleSelectYear}
              />
            </div>
          </div>

          {showQuickStepper && (
            <div className="mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 font-mono">Quick Stepper:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => stepSelection("day", -1)}
                  className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium cursor-pointer"
                >
                  - Day
                </button>
                <button
                  type="button"
                  onClick={() => stepSelection("day", 1)}
                  className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium cursor-pointer"
                >
                  + Day
                </button>
                <button
                  type="button"
                  onClick={() => stepSelection("month", 1)}
                  className="px-2 py-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium cursor-pointer"
                >
                  + Month
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-400 dark:text-zinc-500 font-mono">
            Selected:
          </span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/90 px-3 py-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
            {selectedDate.toLocaleDateString(locale, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    );
  }
);
CupertinoWheelDatepicker.displayName = "CupertinoWheelDatepicker";

// ============================================================================
// 3. ELASTIC TIMELINE DATEPICKER
// ============================================================================

export const ElasticTimelineDatepicker = forwardRef<
  HTMLDivElement,
  ElasticTimelineDatepickerProps
>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      locale = "en-US",
      disabled = false,
      size = "lg",
      daysSpan = 28,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useControllableDate({
      value,
      defaultValue,
      onChange,
    });

    const [anchorDate] = useState<Date>(
      () => new Date(defaultValue || value || new Date())
    );

    const timelineDates = useMemo(() => {
      const list: Date[] = [];
      const base = new Date(anchorDate);
      const span = Math.max(daysSpan, 60);
      const half = Math.floor(span / 2);
      for (let i = -half; i <= half; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        list.push(d);
      }
      return list;
    }, [anchorDate, daysSpan]);

    const stripRef = useRef<HTMLDivElement>(null);

    const scrollToDate = useCallback(
      (targetDate: Date, behavior: ScrollBehavior = "smooth") => {
        const container = stripRef.current;
        if (!container) return;

        const dateKey = `${targetDate.getFullYear()}-${targetDate.getMonth()}-${targetDate.getDate()}`;
        const btn = container.querySelector<HTMLButtonElement>(
          `[data-date-key="${dateKey}"]`
        );
        if (!btn) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const containerCenter = containerRect.left + containerRect.width / 2;
        const btnCenter = btnRect.left + btnRect.width / 2;
        const delta = btnCenter - containerCenter;

        if (Math.abs(delta) > 1) {
          container.scrollBy({
            left: delta,
            behavior,
          });
        }
      },
      []
    );

    // Center the initial selected date on mount
    useEffect(() => {
      const timer = setTimeout(() => {
        scrollToDate(selectedDate, "auto");
      }, 50);
      return () => clearTimeout(timer);
    }, []);

    // Smoothly scroll to center whenever selectedDate changes
    useEffect(() => {
      scrollToDate(selectedDate, "smooth");
    }, [selectedDate, scrollToDate]);

    const scrollByAmount = (amount: number) => {
      if (stripRef.current) {
        stripRef.current.scrollBy({ left: amount, behavior: "smooth" });
      }
    };

    const handleSelect = (date: Date) => {
      if (disabled) return;
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;
      setSelectedDate(date);
      scrollToDate(date, "smooth");
    };

    const jumpToToday = () => {
      if (disabled) return;
      const today = new Date();
      handleSelect(today);
    };

    const monthLabel = useMemo(() => {
      return selectedDate.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });
    }, [selectedDate, locale]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xl",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-md",
          size === "lg" && "max-w-xl",
          size === "full" && "max-w-full",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Chronological Strip
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {monthLabel}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={jumpToToday}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
            >
              Today
            </button>

            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => scrollByAmount(-210)}
                aria-label="Scroll Left"
                className="p-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <ChevronLeftIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(210)}
                aria-label="Scroll Right"
                className="p-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={stripRef}
          className="overflow-x-auto no-scrollbar py-2"
          style={{
            paddingLeft: "calc(50% - 35px)",
            paddingRight: "calc(50% - 35px)",
          }}
        >
          <div className="flex items-center gap-2.5 w-max">
            {timelineDates.map((date) => {
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              const dayOfWeek = date.toLocaleDateString(locale, {
                weekday: "short",
              });
              const monthShort = date.toLocaleDateString(locale, {
                month: "short",
              });
              const isDisabledDate =
                (minDate && date < minDate) || (maxDate && date > maxDate);

              return (
                <motion.button
                  key={date.toISOString()}
                  data-date-key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                  type="button"
                  disabled={isDisabledDate}
                  onClick={() => handleSelect(date)}
                  whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    scale: isSelected ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className={cn(
                    "relative flex flex-col items-center justify-center min-w-[64px] sm:min-w-[70px] py-3.5 px-2 rounded-2xl border transition-all duration-200 select-none cursor-pointer",
                    isSelected
                      ? "bg-indigo-600 dark:bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-600/35 ring-2 ring-indigo-400/50"
                      : "bg-zinc-50 dark:bg-zinc-950/70 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    isDisabledDate && "opacity-30 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-wider font-semibold",
                      isSelected
                        ? "text-indigo-100"
                        : "text-zinc-400 dark:text-zinc-500"
                    )}
                  >
                    {dayOfWeek}
                  </span>

                  <span
                    className={cn(
                      "text-xl sm:text-2xl font-extrabold my-1",
                      isSelected ? "text-white" : "text-zinc-900 dark:text-zinc-100"
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
                    {monthShort}
                  </span>

                  {isSelected && (
                    <motion.div
                      layoutId="timeline-indicator-pill"
                      className="w-4 h-1 rounded-full bg-white mt-1 shadow-xs"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {isToday && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              {selectedDate.getDate()}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {selectedDate.toLocaleDateString(locale, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
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
);
ElasticTimelineDatepicker.displayName = "ElasticTimelineDatepicker";

// ============================================================================
// 4. UNIFIED ANIMATED DATEPICKER COMPONENT
// ============================================================================

export const AnimatedDatepicker = forwardRef<HTMLDivElement, AnimatedDatepickerProps>(
  (
    {
      variant = "fluid",
      size = "md",
      className,
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      locale,
      disabled,
      ...props
    },
    ref
  ) => {
    const commonProps = {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      locale,
      disabled,
      size: (size as "sm" | "md" | "lg" | "full") || "md",
      className: cn(datepickerVariants({ variant, size }), className),
      ...props,
    };

    if (variant === "wheel") {
      return <CupertinoWheelDatepicker ref={ref} {...commonProps} />;
    }

    if (variant === "timeline") {
      return <ElasticTimelineDatepicker ref={ref} {...commonProps} />;
    }

    return <FluidSwipeCalendar ref={ref} {...commonProps} />;
  }
);
AnimatedDatepicker.displayName = "AnimatedDatepicker";
