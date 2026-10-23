import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast, ToastType, ToastPosition } from "../../src/components/ToastAnimation";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CloseIcon,
  SearchIcon,
} from "../../src/icons";
import { CodeSnippet } from "../components/CodeSnippet";

interface ToastCardInfo {
  type: ToastType;
  title: string;
  badge: string;
  physicsDescription: string;
  buttonLabel: string;
  snippet: string;
  trigger: () => void;
  accentColor: string;
}

const POSITION_OPTIONS: { id: ToastPosition; label: string }[] = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

export function ToastDemo() {
  const { toasts, toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<ToastPosition>("bottom-right");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const toastItems: ToastCardInfo[] = useMemo(
    () => [
      {
        type: "info",
        title: "1. Default / Info (ToastInfo)",
        badge: "Slide-in Spring",
        physicsDescription:
          "Standard notification with neutral colors and an informative icon. Smoothly slides into the configured viewport anchor using fluid spring physics.",
        buttonLabel: "Trigger Info Toast",
        accentColor: "blue",
        snippet: `toast.info("System updates have been synchronized.", {
  title: "System Notification",
  position: "${selectedPosition}",
  duration: 4000,
});`,
        trigger: () => {
          toast.info("System updates have been synchronized to the local server.", {
            title: "System Notification",
            position: selectedPosition,
            duration: 4000,
          });
        },
      },
      {
        type: "success",
        title: "2. Success (ToastSuccess)",
        badge: "Pop / Spring Bounce",
        physicsDescription:
          "Success feedback notification with an emerald accent and checkmark icon. Features an elastic pop scale-up entrance animation.",
        buttonLabel: "Trigger Success Toast",
        accentColor: "emerald",
        snippet: `toast.success("Profile changes have been saved.", {
  title: "Saved Successfully",
  position: "${selectedPosition}",
  duration: 4000,
});`,
        trigger: () => {
          toast.success("Your profile details have been successfully updated.", {
            title: "Saved Successfully",
            position: selectedPosition,
            duration: 4000,
          });
        },
      },
      {
        type: "error",
        title: "3. Error / Destructive (ToastError)",
        badge: "Rapid Shake Keyframes",
        physicsDescription:
          "Error alert notification with a rose red accent. Enters swiftly accompanied by a subtle horizontal micro-shake keyframe animation to draw immediate attention.",
        buttonLabel: "Trigger Error Toast",
        accentColor: "rose",
        snippet: `toast.error("Failed to connect to the payment gateway.", {
  title: "Payment Error",
  position: "${selectedPosition}",
  duration: 4500,
});`,
        trigger: () => {
          toast.error("Failed to connect to the payment gateway. Please try again.", {
            title: "Payment Error",
            position: selectedPosition,
            duration: 4500,
          });
        },
      },
      {
        type: "action",
        title: "4. Action / Undo (ToastAction)",
        badge: "Interactive Action Button",
        physicsDescription:
          "Notification equipped with a secondary tactile action button (e.g., 'Undo' or 'Retry') allowing users to quickly revert an operation.",
        buttonLabel: "Trigger Action Toast",
        accentColor: "amber",
        snippet: `toast.action("Item moved to trash.", {
  label: "Undo",
  onClick: (id) => handleUndo(id),
}, {
  title: "File Deleted",
  position: "${selectedPosition}",
  duration: 5000,
});`,
        trigger: () => {
          toast.action(
            "File 'design-system-v2.fig' has been moved to trash.",
            {
              label: "Undo",
              onClick: () => {
                const msg = "Action reverted: File successfully restored.";
                setActionFeedback(msg);
                toast.success(msg, {
                  title: "Undo Successful",
                  position: selectedPosition,
                  duration: 3000,
                });
              },
            },
            {
              title: "File Deleted",
              position: selectedPosition,
              duration: 5000,
            }
          );
        },
      },
      {
        type: "promise",
        title: "5. Promise / Loading (ToastPromise)",
        badge: "Dynamic State Morphing",
        physicsDescription:
          "Simulates an asynchronous background task. Displays a loading spinner state, then seamlessly morphs into a success state upon resolution.",
        buttonLabel: "Trigger Promise Toast",
        accentColor: "indigo",
        snippet: `toast.promise(uploadPromise, {
  loading: { title: "Uploading...", message: "Processing file upload..." },
  success: { title: "Upload Complete", message: "File uploaded successfully." },
  error: { title: "Upload Failed", message: "Failed to upload file." },
}, {
  position: "${selectedPosition}",
});`,
        trigger: () => {
          const fakeAsyncCall = new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });

          toast.promise(
            fakeAsyncCall,
            {
              loading: {
                title: "Uploading File...",
                message: "Processing file transfer to cloud storage...",
              },
              success: {
                title: "Upload Complete",
                message: "File (2.4 MB) uploaded and ready to share.",
              },
              error: {
                title: "Upload Failed",
                message: "An unexpected error occurred during upload.",
              },
            },
            {
              position: selectedPosition,
            }
          );
        },
      },
    ],
    [toast, selectedPosition]
  );

  // Filter based on search query
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return toastItems;
    return toastItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.physicsDescription.toLowerCase().includes(q)
    );
  }, [toastItems, searchQuery]);

  return (
    <div className="w-full space-y-10">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search toast variations (e.g. 'info', 'success', 'error', 'action', 'promise')..."
          className="w-full rounded-2xl border border-zinc-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            ✕ Clear
          </button>
        )}
      </div>

      <div className="sticky top-16 md:top-20 z-30 p-5 sm:p-6 rounded-3xl border border-zinc-200/80 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Global Position Configurator
              </h3>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">
                Anchor: {selectedPosition}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Select a screen position. All toast triggers and code snippets dynamically sync with this anchor.
            </p>
          </div>

          {toasts.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => toast.dismissAll()}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 transition cursor-pointer"
            >
              Dismiss All ({toasts.length})
            </motion.button>
          )}
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {POSITION_OPTIONS.map((pos) => {
            const isSelected = selectedPosition === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => setSelectedPosition(pos.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  isSelected
                    ? "bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:text-zinc-400 dark:border-zinc-700/70 dark:hover:bg-zinc-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isSelected ? "bg-emerald-400" : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                />
                <span>{pos.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/70 text-xs font-medium shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>{actionFeedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionFeedback(null)}
              className="p-1 rounded text-emerald-600 hover:bg-emerald-100/70 dark:text-emerald-400 dark:hover:bg-emerald-900/60 cursor-pointer"
            >
              <CloseIcon size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            No toast variations found matching "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            Reset search
          </button>
        </div>
      )}

      <div className="flex flex-col gap-10">
        {filteredList.map((item) => (
          <section
            key={item.type}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 w-full"
          >
            <div className="space-y-2 mb-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {item.title}
                </h2>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                  {item.badge}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {item.physicsDescription}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 min-h-[140px]">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={item.trigger}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer ${
                  item.type === "success"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.25)]"
                    : item.type === "error"
                    ? "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]"
                    : item.type === "promise"
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_14px_rgba(59,130,246,0.25)]"
                    : "bg-white text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-2xs"
                }`}
              >
                {item.type === "info" && <InfoIcon size={16} className="text-blue-500" />}
                {item.type === "success" && <CheckCircleIcon size={16} />}
                {item.type === "error" && <AlertTriangleIcon size={16} />}
                {item.type === "action" && <InfoIcon size={16} className="text-amber-500" />}
                {item.type === "promise" && (
                  <svg
                    className="w-4 h-4 animate-spin text-current"
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
                )}
                <span>{item.buttonLabel}</span>
              </motion.button>
              <span className="text-[11px] text-zinc-400 mt-2.5">
                * Click to trigger notification at <strong className="font-mono text-zinc-600 dark:text-zinc-300">{selectedPosition}</strong>
              </span>
            </div>

            <CodeSnippet code={item.snippet} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default ToastDemo;
