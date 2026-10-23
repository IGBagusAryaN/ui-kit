import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloseIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

/** Target direct recipient email address */
export const RECIPIENT_EMAIL = "aryabagus453@gmail.com";

/** FormSubmit encrypted token provided upon activation */
export const FORMSUBMIT_TOKEN = "42bc2c28febe676825cd6cd0482f6a72";

export interface FloatingFeedbackPayload {
  rating: number;
  message: string;
  tags: string[];
  submittedAt: string;
  pageUrl: string;
  userAgent?: string;
  recipientEmail: string;
}

export interface FloatingFeedbackProps {
  /** Rata-rata rating awal yang ditampilkan di badge (default: 4.8) */
  averageRating?: number;
  /** Total pengunjung/ulasan yang ditampilkan di badge (default: 124) */
  totalReviews?: number;
  /** Custom async submit handler jika ingin override dispatch default */
  onSubmit?: (data: FloatingFeedbackPayload) => Promise<void> | void;
  /** Tag kategori cepat */
  availableTags?: string[];
  /** Custom class styling container */
  className?: string;
}

const DEFAULT_TAGS = [
  "⚡ Blazing Fast",
  "🎨 Beautiful UI",
  "💎 Great DX",
  "🐛 Found a Bug",
  "💡 Feature Idea",
];

const RATING_FEEDBACK_MAP: Record<number, { label: string; tone: string }> = {
  1: { label: "Needs a lot of work", tone: "text-rose-500 dark:text-rose-400" },
  2: { label: "Could be better", tone: "text-orange-500 dark:text-orange-400" },
  3: { label: "Good & functional", tone: "text-amber-500 dark:text-amber-400" },
  4: { label: "Very impressive!", tone: "text-emerald-500 dark:text-emerald-400" },
  5: { label: "Exceptional UI library!", tone: "text-indigo-500 dark:text-indigo-400" },
};

interface StarGlyphProps {
  filled: boolean;
  size?: number;
  className?: string;
}

function StarGlyph({ filled, size = 20, className = "" }: StarGlyphProps) {
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

/** Smooth, modern rounded chat bubble SVG icon for the FAB */
function ModernChatBubbleIcon({ size = 19, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function FloatingFeedback({
  averageRating = 4.8,
  totalReviews = 124,
  onSubmit,
  availableTags = DEFAULT_TAGS,
  className,
}: FloatingFeedbackProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeRating = hoveredRating !== null ? hoveredRating : selectedRating;
  const ratingDetails = activeRating > 0 ? RATING_FEEDBACK_MAP[activeRating] : null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) return;

    setSubmitStatus("loading");
    setErrorMessage("");

    const payload: FloatingFeedbackPayload = {
      rating: selectedRating,
      message: message.trim(),
      tags: selectedTags,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      recipientEmail: RECIPIENT_EMAIL,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
        setSubmitStatus("success");
      } else {

        const form = document.createElement("form");

        form.action = `https://formsubmit.co/${FORMSUBMIT_TOKEN || RECIPIENT_EMAIL}`;
        form.method = "POST";
        form.target = "hidden_feedback_iframe";

        const formData: Record<string, string> = {
          _subject: `⭐ New ${selectedRating}/5 Review on needui`,
          _template: "table",
          _captcha: "false",
          Rating: `${selectedRating} of 5 Stars (${ratingDetails?.label || "Rated"})`,
          Feedback_Message: message.trim() || "(No written message provided)",
          Tags: selectedTags.length > 0 ? selectedTags.join(", ") : "None",
          Page_URL: typeof window !== "undefined" ? window.location.href : "",
          Submitted_At: new Date().toLocaleString(),
        };

        for (const [key, value] of Object.entries(formData)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        // Allow 1.6s for browser to dispatch the POST payload to FormSubmit
        await new Promise((resolve) => setTimeout(resolve, 1600));
        setSubmitStatus("success");
      }

      // Auto-close popover after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setSelectedRating(0);
          setHoveredRating(null);
          setMessage("");
          setSelectedTags([]);
          setSubmitStatus("idle");
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Failed to send feedback:", error);
      setErrorMessage("Could not send feedback. Please check your network or try again.");
      setSubmitStatus("error");
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end select-none pointer-events-auto",
        className
      )}
    >
      <iframe
        ref={iframeRef}
        name="hidden_feedback_iframe"
        id="hidden_feedback_iframe"
        className="hidden"
        style={{ display: "none" }}
        title="feedback_delivery_frame"
        aria-hidden="true"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="floating-feedback-panel"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 28,
            }}
            className="mb-3 w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl shadow-zinc-900/15 dark:shadow-black/70 p-5 sm:p-6 text-zinc-900 dark:text-zinc-100 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900/60">
                  <SparklesIcon size={11} />
                  <span>Community Feedback</span>
                </div>
                <h4 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Share Your Feedback
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  We&apos;d love to hear your thoughts, feature ideas, or bug reports.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback panel"
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                /* =========================================================
                 * SUCCESS FEEDBACK VIEW
                 * ========================================================= */
                <motion.div
                  key="feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="py-5 flex flex-col items-center justify-center text-center space-y-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 18,
                    }}
                    className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25"
                  >
                    <CheckIcon size={26} />
                  </motion.div>

                  <div className="space-y-1">
                    <h5 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Feedback Sent Successfully!
                    </h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
                      Thank you for your review. Your feedback directly helps us improve needui.
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* =========================================================
                 * ACTIVE FEEDBACK FORM VIEW
                 * ========================================================= */
                <motion.form
                  key="feedback-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <div
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/70"
                      onMouseLeave={() => setHoveredRating(null)}
                    >
                      <div className="flex items-center gap-1.5">
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
                              whileHover={{ scale: 1.25 }}
                              whileTap={{ scale: 0.88 }}
                              animate={
                                isSelected
                                  ? { scale: [1, 1.28, 1] }
                                  : { scale: 1 }
                              }
                              transition={{
                                type: "spring",
                                stiffness: 450,
                                damping: 14,
                              }}
                              aria-label={`Select ${starIndex} stars`}
                              className={cn(
                                "p-1 rounded-lg transition-all duration-150 outline-none select-none",
                                isFilled
                                  ? "text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]"
                                  : "text-zinc-300 hover:text-amber-200 dark:text-zinc-700 dark:hover:text-zinc-500"
                              )}
                            >
                              <StarGlyph filled={isFilled} size={22} />
                            </motion.button>
                          );
                        })}
                      </div>

                      <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        {activeRating > 0 ? `${activeRating}/5` : "0/5"}
                      </span>
                    </div>

                    <div className="min-h-[18px]">
                      {ratingDetails && (
                        <motion.p
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "text-[11px] font-semibold text-right",
                            ratingDetails.tone
                          )}
                        >
                          {ratingDetails.label}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {availableTags.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                        Quick Tags:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {availableTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-lg border transition-all duration-150",
                                isSelected
                                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                                  : "bg-zinc-100/80 text-zinc-600 border-zinc-200/80 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                              )}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your experience, report an issue, or suggest a feature..."
                      disabled={submitStatus === "loading"}
                      className="w-full px-3 py-2 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all resize-none"
                    />
                  </div>

                  {submitStatus === "error" && errorMessage && (
                    <p className="text-[11px] text-rose-500 font-medium">
                      {errorMessage}
                    </p>
                  )}

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
                      "w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold shadow-xs transition-colors duration-200 outline-none select-none",
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
                          key="btn-loading"
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
                          <span>Sending feedback...</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="btn-idle"
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
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="h-11 px-3.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg shadow-zinc-900/5 flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 outline-none"
        >
          <StarGlyph filled={true} size={15} className="text-amber-400" />
          <span className="font-mono font-bold tracking-tight">{averageRating.toFixed(1)}</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-normal">
            ({totalReviews})
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? "Close feedback" : "Open feedback"}
          className="w-11 h-11 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xl shadow-zinc-900/25 dark:shadow-black/60 flex items-center justify-center border border-zinc-800/20 dark:border-zinc-200/20 outline-none shrink-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="fab-close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <CloseIcon size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="fab-open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <ModernChatBubbleIcon size={19} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

export default FloatingFeedback;
