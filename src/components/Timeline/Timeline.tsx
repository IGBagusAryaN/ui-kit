import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons";

export type TimelineBadgeColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "cyan"
  | "violet"
  | "zinc";

export interface TimelineItemData {
  id: string | number;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: TimelineBadgeColor;
  status?: "completed" | "current" | "upcoming";
  tags?: string[];
  content?: React.ReactNode;
}

export interface StepItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
}

const badgeColorMap: Record<TimelineBadgeColor, string> = {
  indigo:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
  emerald:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  amber:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  rose:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  cyan:
    "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800",
  violet:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800",
  zinc:
    "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
};

export interface VerticalTimelineProps {
  items: TimelineItemData[];
  className?: string;
  lineColor?: string;
  animated?: boolean;
}

export function VerticalTimeline({
  items,
  className,
  lineColor = "bg-zinc-200 dark:bg-zinc-800",
  animated = true,
}: VerticalTimelineProps) {
  return (
    <div className={cn("relative py-2", className)}>
      <div
        className={cn(
          "absolute top-5 bottom-5 left-4 sm:left-5 w-[2px] -translate-x-1/2 z-0",
          lineColor
        )}
      />

      <div className="space-y-8 sm:space-y-10">
        {items.map((item, index) => {
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";

          const cardContent = (
            <div className="relative flex items-start pl-10 sm:pl-12 group">
              <div
                className={cn(
                  "absolute left-4 sm:left-5 top-5 -translate-x-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : isCurrent
                    ? "border-indigo-600 bg-white text-indigo-600 shadow-md ring-4 ring-indigo-500/20 dark:bg-zinc-950 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
                )}
              >
                {item.icon ? (
                  <span className="text-xs">{item.icon}</span>
                ) : isCompleted ? (
                  <CheckIcon size={14} className="stroke-[2.5]" />
                ) : (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isCurrent
                        ? "bg-indigo-600 dark:bg-indigo-400 animate-pulse"
                        : "bg-zinc-300 dark:bg-zinc-600"
                    )}
                  />
                )}
              </div>

              <div className="flex-1 rounded-xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {item.date && (
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        {item.date}
                      </span>
                    )}
                    {item.badge && (
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
                          badgeColorMap[item.badgeColor || "indigo"]
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                      In Progress
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.subtitle}
                  </p>
                )}

                {item.description && (
                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );

          if (!animated) {
            return <div key={item.id}>{cardContent}</div>;
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {cardContent}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export interface AlternatingTimelineProps {
  items: TimelineItemData[];
  className?: string;
  lineColor?: string;
}

export function AlternatingTimeline({
  items,
  className,
  lineColor = "bg-zinc-200 dark:bg-zinc-800",
}: AlternatingTimelineProps) {
  return (
    <div className={cn("relative py-4", className)}>
      <div
        className={cn(
          "absolute top-6 bottom-6 left-4 sm:left-5 md:left-1/2 w-[2px] -translate-x-1/2 z-0",
          lineColor
        )}
      />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";

          return (
            <div
              key={item.id}
              className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center",
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              <div className="w-full pl-10 sm:pl-12 md:pl-0 md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 36 : -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90",
                    isEven ? "md:mr-8 lg:mr-10" : "md:ml-8 lg:ml-10"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {item.date && (
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {item.date}
                        </span>
                      )}
                      {item.badge && (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
                            badgeColorMap[item.badgeColor || "indigo"]
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                        Aktif
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {item.subtitle}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.06,
                }}
                className={cn(
                  "absolute left-4 sm:left-5 md:left-1/2 top-5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : isCurrent
                    ? "border-indigo-600 bg-white text-indigo-600 shadow-md ring-4 ring-indigo-500/20 dark:bg-zinc-950 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
                )}
              >
                {item.icon ? (
                  <span className="text-xs">{item.icon}</span>
                ) : isCompleted ? (
                  <CheckIcon size={14} className="stroke-[2.5]" />
                ) : (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isCurrent
                        ? "bg-indigo-600 dark:bg-indigo-400 animate-pulse"
                        : "bg-zinc-300 dark:bg-zinc-600"
                    )}
                  />
                )}
              </motion.div>

              <div className="hidden md:block md:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface HorizontalStepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  showControls?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onReset?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  resetLabel?: string;
}

export function HorizontalStepper({
  steps,
  currentStep,
  onStepClick,
  className,
  showControls = true,
  onNext,
  onPrev,
  onReset,
  prevLabel = "Previous",
  nextLabel = "Next",
  resetLabel = "Reset",
}: HorizontalStepperProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="relative">
        <div className="relative flex items-center justify-between h-10 sm:h-11">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-zinc-200 dark:bg-zinc-800 z-0" />

          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] z-0 overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 dark:bg-indigo-500 origin-left"
              initial={false}
              animate={{
                width: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            const isClickable = !!onStepClick;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onStepClick && onStepClick(index)}
                  className={cn(
                    "relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 font-semibold text-xs sm:text-sm transition-all duration-300",
                    isClickable ? "cursor-pointer" : "cursor-default",
                    isDone
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                      : isActive
                      ? "border-indigo-600 bg-white text-indigo-600 shadow-lg ring-4 ring-indigo-500/25 dark:bg-zinc-950 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-500"
                  )}
                >
                  {step.icon ? (
                    <span>{step.icon}</span>
                  ) : isDone ? (
                    <motion.div
                      initial={{ scale: 0.5, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <CheckIcon size={16} className="stroke-[2.5]" />
                    </motion.div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="relative flex items-start justify-between mt-3 hidden sm:flex">
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={step.id} className="w-24 text-center -mx-6 first:ml-0 last:mr-0">
                <span
                  className={cn(
                    "block text-xs font-semibold truncate transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isDone
                      ? "text-zinc-900 dark:text-zinc-200"
                      : "text-zinc-400 dark:text-zinc-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 sm:pt-4">
        <AnimatePresence mode="wait">
          {steps[currentStep] && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Step {currentStep + 1} of {steps.length}
                </span>
                {steps[currentStep].subtitle && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    • {steps[currentStep].subtitle}
                  </span>
                )}
              </div>

              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {steps[currentStep].title}
              </h4>

              {steps[currentStep].description && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showControls && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={onPrev}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer",
              isFirst
                ? "border-zinc-200 text-zinc-400 opacity-50 cursor-not-allowed dark:border-zinc-800 dark:text-zinc-600"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            )}
          >
            <ChevronLeftIcon size={16} />
            <span>{prevLabel}</span>
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition active:scale-95 cursor-pointer"
            >
              <CheckIcon size={16} />
              <span>{resetLabel}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition active:scale-95 cursor-pointer"
            >
              <span>{nextLabel}</span>
              <ChevronRightIcon size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
 * 4. INTERACTIVE EXPANDABLE (ACCORDION TIMELINE - MASTER LINE STRATEGY)
 * ========================================================================= */

export interface AccordionTimelineProps {
  items: TimelineItemData[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpenIds?: Array<string | number>;
}

export function AccordionTimeline({
  items,
  className,
  allowMultiple = false,
  defaultOpenIds = [items[0]?.id],
}: AccordionTimelineProps) {
  const [openIds, setOpenIds] = useState<Array<string | number>>(defaultOpenIds);

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("relative py-2", className)}>
      <div className="absolute top-6 bottom-6 left-4 sm:left-5 w-[2px] -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800 z-0" />

      <div className="space-y-4 sm:space-y-5">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <div key={item.id} className="relative group pl-10 sm:pl-12">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "absolute left-4 sm:left-5 top-5 -translate-x-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer",
                  isOpen
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105"
                    : "border-zinc-300 bg-white text-zinc-400 hover:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-950"
                )}
              >
                {item.icon ? (
                  <span className="text-xs">{item.icon}</span>
                ) : (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      isOpen ? "bg-white" : "bg-zinc-400 dark:bg-zinc-500"
                    )}
                  />
                )}
              </button>

              <div
                className={cn(
                  "rounded-xl border transition-all duration-300 bg-white dark:bg-zinc-900/90 overflow-hidden",
                  isOpen
                    ? "border-indigo-500/60 shadow-md ring-2 ring-indigo-500/10 dark:border-indigo-400/50"
                    : "border-zinc-200/90 shadow-xs hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {item.date && (
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {item.date}
                        </span>
                      )}
                      {item.badge && (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
                            badgeColorMap[item.badgeColor || "indigo"]
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 text-zinc-400 dark:text-zinc-500"
                  >
                    <ChevronDownIcon size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-950/40"
                    >
                      <div className="p-4 sm:p-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item.description && <p>{item.description}</p>}
                        {item.content && <div className="mt-3">{item.content}</div>}

                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded-md bg-white border border-zinc-200 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
 * 5. NEON GLOW PATH (MASTER GLOWING CONDUIT STRATEGY)
 * ========================================================================= */

export interface NeonGlowTimelineProps {
  items: TimelineItemData[];
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber";
}

export function NeonGlowTimeline({
  items,
  className,
  glowColor = "cyan",
}: NeonGlowTimelineProps) {
  const colorStyles = {
    cyan: {
      line: "bg-cyan-500/25",
      glowAura: "bg-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.8)]",
      beam: "from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.9)]",
      nodeBorder: "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)]",
      nodePing: "bg-cyan-400/40",
      nodeDot: "bg-cyan-400",
      cardBorder: "border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]",
      tagText: "text-cyan-400 bg-cyan-950/60 border-cyan-800/60",
    },
    violet: {
      line: "bg-violet-500/25",
      glowAura: "bg-violet-400/40 shadow-[0_0_15px_rgba(167,139,250,0.8)]",
      beam: "from-transparent via-violet-400 to-transparent shadow-[0_0_20px_rgba(167,139,250,0.9)]",
      nodeBorder: "border-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.7)]",
      nodePing: "bg-violet-400/40",
      nodeDot: "bg-violet-400",
      cardBorder: "border-violet-500/20 hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]",
      tagText: "text-violet-400 bg-violet-950/60 border-violet-800/60",
    },
    emerald: {
      line: "bg-emerald-500/25",
      glowAura: "bg-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.8)]",
      beam: "from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(52,211,153,0.9)]",
      nodeBorder: "border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]",
      nodePing: "bg-emerald-400/40",
      nodeDot: "bg-emerald-400",
      cardBorder: "border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]",
      tagText: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
    },
    amber: {
      line: "bg-amber-500/25",
      glowAura: "bg-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.8)]",
      beam: "from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(251,191,36,0.9)]",
      nodeBorder: "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.7)]",
      nodePing: "bg-amber-400/40",
      nodeDot: "bg-amber-400",
      cardBorder: "border-amber-500/20 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]",
      tagText: "text-amber-400 bg-amber-950/60 border-amber-800/60",
    },
  }[glowColor];

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-zinc-950 p-6 sm:p-8 border border-zinc-800/80 text-zinc-100 overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative">
        <div
          className={cn(
            "absolute top-6 bottom-6 left-6 sm:left-7 w-[2px] -translate-x-1/2 rounded-full z-0",
            colorStyles.line
          )}
        />

        <div
          className={cn(
            "absolute top-6 bottom-6 left-6 sm:left-7 w-1 -translate-x-1/2 rounded-full blur-[2px] opacity-80 pointer-events-none z-0",
            colorStyles.glowAura
          )}
        />

        <div className="absolute top-6 bottom-6 left-6 sm:left-7 w-[2px] -translate-x-1/2 overflow-hidden pointer-events-none z-0">
          <motion.div
            className={cn(
              "w-full h-32 bg-gradient-to-b rounded-full",
              colorStyles.beam
            )}
            animate={{
              y: ["-100%", "350%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="space-y-8 sm:space-y-10">
          {items.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-start pl-12 sm:pl-14 group"
              >
                <div className="absolute left-6 sm:left-7 top-6 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                  <span
                    className={cn(
                      "absolute h-7 w-7 rounded-full animate-ping opacity-50",
                      colorStyles.nodePing
                    )}
                  />
                  <div
                    className={cn(
                      "relative z-10 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 bg-zinc-950 transition-transform duration-300 group-hover:scale-125 shadow-lg",
                      colorStyles.nodeBorder
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full",
                        colorStyles.nodeDot
                      )}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "flex-1 rounded-xl bg-zinc-900/90 backdrop-blur-md p-5 border transition-all duration-300",
                    colorStyles.cardBorder
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.date || `NODE 0${index + 1}`}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
                          colorStyles.tagText
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-400">
                      {item.subtitle}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80 font-mono text-[11px]">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-zinc-800/70 px-2 py-0.5 text-zinc-400 border border-zinc-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * 6. PRIMITIVE BUILDING BLOCKS (FLEXIBLE WRAPPERS)
 * ========================================================================= */

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItem({ children, className, ...props }: TimelineItemProps) {
  return (
    <div className={cn("relative flex items-start gap-4", className)} {...props}>
      {children}
    </div>
  );
}
