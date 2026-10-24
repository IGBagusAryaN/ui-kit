import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  CloseIcon,
  MessageSquareIcon,
  ActivityIcon,
} from "../../icons";

export interface FeedbackData {
  rating: number;
  message: string;
  tags: string[];
  createdAt: Date;
}

export interface RatingBreakdownItem {
  stars: number;
  count: number;
  percentage: number;
}

export interface FeedbackWidgetProps {
  /** Nilai rating rata-rata agregat (contoh: 4.8) */
  averageRating?: number;
  /** Total jumlah ulasan pengguna (contoh: 124) */
  totalReviews?: number;
  /** Data statistik pembagian bintang (5 hingga 1 star) */
  breakdown?: RatingBreakdownItem[];
  /** Callback asynchronous ketika feedback dikirim */
  onSubmit?: (data: FeedbackData) => Promise<void> | void;
  /** Callback opsional jika widget berada dalam modal/popover */
  onClose?: () => void;
  /** Tag cepat yang dapat dipilih oleh pengguna */
  availableTags?: string[];
  /** Judul utama widget */
  title?: string;
  /** Subtitle / deskripsi singkat */
  subtitle?: string;
  /** Custom class styling container */
  className?: string;
}

const DEFAULT_BREAKDOWN: RatingBreakdownItem[] = [
  { stars: 5, count: 97, percentage: 78 },
  { stars: 4, count: 18, percentage: 15 },
  { stars: 3, count: 6, percentage: 5 },
  { stars: 2, count: 2, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

const DEFAULT_TAGS: string[] = [
  "⚡ Super Fast",
  "🎨 Clean Aesthetics",
  "💎 Great DX",
  "🐛 Found a Bug",
  "💡 Feature Idea",
  "📱 Mobile Responsive",
];

const RATING_DESCRIPTORS: Record<number, { label: string; color: string; desc: string }> = {
  1: {
    label: "Poor",
    color: "text-rose-500 dark:text-rose-400",
    desc: "Disappointing experience with significant issues.",
  },
  2: {
    label: "Fair",
    color: "text-orange-500 dark:text-orange-400",
    desc: "Needs noticeable improvements to meet standards.",
  },
  3: {
    label: "Good",
    color: "text-amber-500 dark:text-amber-400",
    desc: "Satisfactory and covers essential requirements.",
  },
  4: {
    label: "Very Good",
    color: "text-emerald-500 dark:text-emerald-400",
    desc: "Great overall experience with smooth execution.",
  },
  5: {
    label: "Exceptional",
    color: "text-indigo-500 dark:text-indigo-400",
    desc: "Loved every detail! Outstanding performance.",
  },
};

interface StarGlyphProps {
  filled: boolean;
  size?: number;
  className?: string;
}

function StarGlyph({ filled, size = 22, className = "" }: StarGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "1.5" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-colors duration-150", className)}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function FeedbackWidget({
  averageRating = 4.8,
  totalReviews = 124,
  breakdown = DEFAULT_BREAKDOWN,
  onSubmit,
  onClose,
  availableTags = DEFAULT_TAGS,
  title = "Visitor Reviews & Feedback",
  subtitle = "Help us craft a better experience. Your feedback directly shapes upcoming releases.",
  className,
}: FeedbackWidgetProps) {

  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");
  const [lastSubmittedData, setLastSubmittedData] = useState<FeedbackData | null>(null);

  const activeRating = hoveredRating !== null ? hoveredRating : selectedRating;
  const currentDescriptor = activeRating > 0 ? RATING_DESCRIPTORS[activeRating] : null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) return;

    setSubmitStatus("loading");

    const feedbackPayload: FeedbackData = {
      rating: selectedRating,
      message: message.trim(),
      tags: selectedTags,
      createdAt: new Date(),
    };

    try {
      if (onSubmit) {
        await onSubmit(feedbackPayload);
      } else {

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setLastSubmittedData(feedbackPayload);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("idle");
    }
  };

  const handleReset = () => {
    setSelectedRating(0);
    setHoveredRating(null);
    setMessage("");
    setSelectedTags([]);
    setSubmitStatus("idle");
    setLastSubmittedData(null);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-xl shadow-zinc-200/40 dark:shadow-black/50 transition-colors",
        className
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close feedback widget"
          className="absolute right-5 top-5 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/80 transition-colors"
        >
          <CloseIcon size={16} />
        </button>
      )}

      <div className="space-y-1.5 pr-8 mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900/60">
          <SparklesIcon size={12} />
          <span>Interactive Community Pulse</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === "success" && lastSubmittedData ? (

          <motion.div
            key="success-view"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="py-6 space-y-6 text-center"
          >
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 18,
                  delay: 0.05,
                }}
                className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 dark:bg-emerald-600"
              >
                <CheckIcon size={32} />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.25, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Thank you for your feedback!
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your evaluation helps us continually elevate <span className="font-semibold text-zinc-800 dark:text-zinc-200">needui</span> for developers worldwide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 dark:text-zinc-500">
                  Your Rating
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <StarGlyph
                      key={idx}
                      filled={idx < lastSubmittedData.rating}
                      size={14}
                    />
                  ))}
                  <span className="ml-1 font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                    {lastSubmittedData.rating}.0
                  </span>
                </div>
              </div>

              {lastSubmittedData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lastSubmittedData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {lastSubmittedData.message && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 italic bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                  &quot;{lastSubmittedData.message}&quot;
                </p>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/80 transition"
              >
                <span>Submit Another Review</span>
                <ArrowRightIcon size={12} />
              </button>
            </div>
          </motion.div>
        ) : (

          <motion.div
            key="form-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <section className="p-4 sm:p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-50">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500">
                      / 5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarGlyph
                        key={idx}
                        filled={idx < Math.round(averageRating)}
                        size={16}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
                    Based on{" "}
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {totalReviews.toLocaleString()} visitor reviews
                    </span>
                  </p>
                </div>

                <div className="sm:col-span-7 space-y-1.5 border-t sm:border-t-0 sm:border-l border-zinc-200/80 dark:border-zinc-800/80 pt-4 sm:pt-0 sm:pl-5">
                  {breakdown.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400"
                    >
                      <span className="w-4 font-semibold text-right">{item.stars}★</span>
                      <div className="flex-1 h-2 rounded-full bg-zinc-200/70 dark:bg-zinc-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-amber-400"
                        />
                      </div>
                      <span className="w-8 text-right font-medium text-zinc-400 dark:text-zinc-500">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Rate your experience <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  {selectedRating > 0 ? `${selectedRating} of 5 selected` : "Click to rate"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60">
                <div
                  className="flex items-center gap-2"
                  onMouseLeave={() => setHoveredRating(null)}
                >
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFilled =
                      hoveredRating !== null
                        ? starIndex <= hoveredRating
                        : starIndex <= selectedRating;
                    const isSelected = starIndex === selectedRating;

                    return (
                      <motion.button
                        key={starIndex}
                        type="button"
                        onClick={() => setSelectedRating(starIndex)}
                        onMouseEnter={() => setHoveredRating(starIndex)}
                        whileHover={{ scale: 1.22 }}
                        whileTap={{ scale: 0.88 }}
                        animate={
                          isSelected
                            ? { scale: [1, 1.25, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 15,
                        }}
                        aria-label={`Rate ${starIndex} stars out of 5`}
                        className={cn(
                          "p-1.5 rounded-xl transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-amber-400",
                          isFilled
                            ? "text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
                            : "text-zinc-300 hover:text-amber-200 dark:text-zinc-700 dark:hover:text-zinc-500"
                        )}
                      >
                        <StarGlyph filled={isFilled} size={28} />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="min-h-[28px] flex items-center">
                  <AnimatePresence mode="wait">
                    {currentDescriptor ? (
                      <motion.div
                        key={currentDescriptor.label}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border",
                            currentDescriptor.color,
                            "border-current/20 bg-current/5"
                          )}
                        >
                          {currentDescriptor.label}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                          — {currentDescriptor.desc}
                        </span>
                      </motion.div>
                    ) : (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 italic">
                        Select a star to express your experience
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {availableTags.length > 0 && (
              <section className="space-y-2">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  What highlighted your experience?
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 rounded-xl text-xs font-medium transition-all duration-150 outline-none select-none border",
                          isSelected
                            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs"
                            : "bg-zinc-50 text-zinc-600 border-zinc-200/90 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800/80"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="feedback-message"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
                  >
                    <MessageSquareIcon size={13} />
                    <span>Detailed Message (Optional)</span>
                  </label>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                    {message.length} / 500
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    id="feedback-message"
                    rows={4}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                    disabled={submitStatus === "loading"}
                    className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                  <ActivityIcon size={13} />
                  <span>Verified feedback process</span>
                </div>

                <motion.button
                  type="submit"
                  disabled={selectedRating === 0 || submitStatus === "loading"}
                  whileHover={
                    selectedRating > 0 && submitStatus === "idle"
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    selectedRating > 0 && submitStatus === "idle"
                      ? { scale: 0.98 }
                      : {}
                  }
                  className={cn(
                    "relative min-w-[150px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors duration-200 outline-none select-none",
                    selectedRating === 0
                      ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed dark:bg-zinc-900 dark:text-zinc-600 dark:border-zinc-800"
                      : submitStatus === "loading"
                      ? "bg-indigo-600 text-white cursor-wait dark:bg-indigo-500"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {submitStatus === "loading" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-white"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        <span>Send Feedback</span>
                        <ArrowRightIcon size={12} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackWidget;
