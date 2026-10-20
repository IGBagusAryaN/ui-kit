import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, CloseIcon } from "../../icons";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. TYPES & INTERFACES
 * ========================================================================= */

export type ToastType = "info" | "success" | "error" | "action" | "promise";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastActionOptions {
  /** Teks label tombol aksi sekunder (contoh: "Undo", "Retry") */
  label: string;
  /** Callback saat tombol aksi diklik */
  onClick: (toastId: string) => void;
  /** Teks aksesibilitas alternatif */
  altText?: string;
}

export interface ToastItemData {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  /** Posisi penempatan toast khusus */
  position?: ToastPosition;
  /** Durasi tampilan sebelum auto-dismiss dalam milidetik (default: 4000ms, 0 untuk manual dismiss) */
  duration?: number;
  /** Konfigurasi tombol aksi untuk ToastAction */
  action?: ToastActionOptions;
  /** Status khusus untuk ToastPromise */
  promiseState?: "loading" | "success" | "error";
  promiseSuccessData?: { title?: string; message: string };
  promiseErrorData?: { title?: string; message: string };
  /** Timestamp pembuatan */
  createdAt: number;
}

export interface ToastOptions {
  /** Judul tebal di atas pesan toast */
  title?: string;
  /** Durasi tayang toast sebelum hilang otomatis (ms) */
  duration?: number;
  /** Posisi penempatan toast khusus (e.g. 'top-right', 'bottom-center') */
  position?: ToastPosition;
  /** Opsi tombol aksi sekunder */
  action?: ToastActionOptions;
  /** Kustom ID untuk toast */
  id?: string;
}

export interface ToastContextValue {
  toasts: ToastItemData[];
  toast: {
    info: (message: string, options?: ToastOptions) => string;
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
    action: (
      message: string,
      action: ToastActionOptions,
      options?: ToastOptions
    ) => string;
    promise: <T>(
      promiseOrFn: Promise<T> | (() => Promise<T>),
      messages: {
        loading: { title?: string; message: string };
        success:
          | { title?: string; message: string }
          | ((data: T) => { title?: string; message: string });
        error:
          | { title?: string; message: string }
          | ((err: any) => { title?: string; message: string });
      },
      options?: ToastOptions
    ) => Promise<T>;
    dismiss: (id: string) => void;
    dismissAll: () => void;
  };
}

/* =========================================================================
 * 2. SPINNER ICON COMPONENT
 * ========================================================================= */

export function ToastSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={20}
      height={20}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/* =========================================================================
 * 3. CONTEXT & PROVIDER
 * ========================================================================= */

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Posisi penempatan toast container di layar (default: 'bottom-right') */
  position?: ToastPosition;
  /** Durasi default toast dalam milidetik (default: 4000) */
  defaultDuration?: number;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 4000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    (
      type: ToastType,
      message: string,
      options?: ToastOptions,
      extra?: Partial<ToastItemData>
    ): string => {
      const id = options?.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastItemData = {
        id,
        type,
        title: options?.title,
        message,
        duration: options?.duration ?? defaultDuration,
        position: options?.position,
        action: options?.action,
        createdAt: Date.now(),
        ...extra,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    [defaultDuration]
  );

  const toastMethods = {
    info: useCallback(
      (message: string, options?: ToastOptions) =>
        addToast("info", message, options),
      [addToast]
    ),
    success: useCallback(
      (message: string, options?: ToastOptions) =>
        addToast("success", message, options),
      [addToast]
    ),
    error: useCallback(
      (message: string, options?: ToastOptions) =>
        addToast("error", message, options),
      [addToast]
    ),
    action: useCallback(
      (
        message: string,
        action: ToastActionOptions,
        options?: ToastOptions
      ) => addToast("action", message, { ...options, action }),
      [addToast]
    ),
    promise: useCallback(
      async <T,>(
        promiseOrFn: Promise<T> | (() => Promise<T>),
        messages: {
          loading: { title?: string; message: string };
          success:
            | { title?: string; message: string }
            | ((data: T) => { title?: string; message: string });
          error:
            | { title?: string; message: string }
            | ((err: any) => { title?: string; message: string });
        },
        options?: ToastOptions
      ): Promise<T> => {
        const id = options?.id || `promise-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        
        // Buat toast awal dalam status 'loading' tanpa auto-dismiss
        addToast("promise", messages.loading.message, {
          ...options,
          id,
          title: messages.loading.title,
          duration: 0, // Jangan auto dismiss saat loading
        }, {
          promiseState: "loading",
        });

        try {
          const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
          const result = await promise;
          const resolved =
            typeof messages.success === "function"
              ? messages.success(result)
              : messages.success;

          // Perbarui status menjadi 'success'
          setToasts((prev) =>
            prev.map((t) => {
              if (t.id === id) {
                return {
                  ...t,
                  promiseState: "success",
                  title: resolved.title,
                  message: resolved.message,
                  duration: options?.duration ?? 3500,
                  createdAt: Date.now(),
                };
              }
              return t;
            })
          );

          return result;
        } catch (err) {
          const resolved =
            typeof messages.error === "function"
              ? messages.error(err)
              : messages.error;

          // Perbarui status menjadi 'error'
          setToasts((prev) =>
            prev.map((t) => {
              if (t.id === id) {
                return {
                  ...t,
                  promiseState: "error",
                  title: resolved.title,
                  message: resolved.message,
                  duration: options?.duration ?? 4500,
                  createdAt: Date.now(),
                };
              }
              return t;
            })
          );

          throw err;
        }
      },
      [addToast]
    ),
    dismiss,
    dismissAll,
  };

  const ALL_POSITIONS: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  return (
    <ToastContext.Provider value={{ toasts, toast: toastMethods }}>
      {children}
      {ALL_POSITIONS.map((pos) => {
        const posToasts = toasts.filter((t) => (t.position || position) === pos);
        if (posToasts.length === 0) return null;
        return (
          <ToastContainer
            key={pos}
            toasts={posToasts}
            position={pos}
            onDismiss={dismiss}
          />
        );
      })}
    </ToastContext.Provider>
  );
}

/** Hook untuk mengakses fungsi pemanggil Toast */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus digunakan di dalam <ToastProvider>");
  }
  return context;
}

/* =========================================================================
 * 4. TOAST CONTAINER / VIEWPORT
 * ========================================================================= */

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-5 left-5 items-start",
  "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-5 right-5 items-end",
  "bottom-left": "bottom-5 left-5 items-start",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-5 right-5 items-end",
};

export interface ToastContainerProps {
  toasts: ToastItemData[];
  position?: ToastPosition;
  onDismiss: (id: string) => void;
  className?: string;
}

export function ToastContainer({
  toasts,
  position = "bottom-right",
  onDismiss,
  className,
}: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm sm:max-w-md px-4 sm:px-0 transition-all duration-300",
        POSITION_CLASSES[position],
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================================
 * 5. TOAST ITEM & ANIMATION VARIANTS
 * ========================================================================= */

interface ToastItemProps {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);
  const remainingTimeRef = useRef<number>(toast.duration || 0);

  const duration = toast.duration ?? 4000;
  const hasAutoDismiss = duration > 0;

  // Auto-dismiss timer logic dengan pause on hover
  useEffect(() => {
    if (!hasAutoDismiss) return;

    remainingTimeRef.current = duration;

    const tickInterval = 50;
    const progressInterval = setInterval(() => {
      if (!isHovered) {
        remainingTimeRef.current -= tickInterval;
        const pct = Math.max(0, (remainingTimeRef.current / duration) * 100);
        setProgress(pct);

        if (remainingTimeRef.current <= 0) {
          clearInterval(progressInterval);
          onDismiss(toast.id);
        }
      }
    }, tickInterval);

    return () => {
      clearInterval(progressInterval);
    };
  }, [toast.id, duration, hasAutoDismiss, isHovered, onDismiss]);

  // Pilih animasi berdasarkan variasi Toast
  const getAnimationConfig = (): HTMLMotionProps<"div"> => {
    switch (toast.type) {
      case "info":
        // 1. Default / Info: Slide-in dari kanan bawah layar
        return {
          initial: { opacity: 0, x: 80, y: 0, scale: 0.96 },
          animate: { opacity: 1, x: 0, y: 0, scale: 1 },
          exit: { opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.22, ease: "easeIn" } },
          transition: { type: "spring", stiffness: 360, damping: 28 },
        };

      case "success":
        // 2. Success: Pop / Scale-up dengan sedikit pantulan (spring physics)
        return {
          initial: { opacity: 0, scale: 0.65, y: 25 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.85, y: -10, transition: { duration: 0.2 } },
          transition: {
            type: "spring",
            stiffness: 450,
            damping: 20,
            mass: 0.85,
          },
        };

      case "error":
        // 3. Error / Destructive: Masuk cepat dan efek bergetar (shake) horizontal keyframes
        return {
          initial: { opacity: 0, scale: 0.95, x: 30 },
          animate: {
            opacity: 1,
            scale: 1,
            x: [30, 0, -14, 12, -8, 6, -3, 0],
          },
          exit: { opacity: 0, x: 25, scale: 0.88, transition: { duration: 0.2 } },
          transition: {
            x: { duration: 0.55, ease: "easeOut" },
            opacity: { duration: 0.16 },
            scale: { duration: 0.2 },
          },
        };

      case "action":
        // 4. Action / Undo: Slide-up halus dengan elevasi taktil
        return {
          initial: { opacity: 0, y: 30, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.2 } },
          transition: { type: "spring", stiffness: 380, damping: 25 },
        };

      case "promise":
        // 5. Promise / Loading: Morphing dinamis layout
        return {
          layout: true,
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
          transition: { type: "spring", stiffness: 350, damping: 26 },
        };

      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 10 },
        };
    }
  };

  const anim = getAnimationConfig();

  // Helper render konten spesifik per varian
  const renderVariantContent = () => {
    switch (toast.type) {
      case "info":
        return (
          <div className="flex items-start gap-3.5">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
              <InfoIcon size={18} />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              {toast.title && (
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                {toast.message}
              </p>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex items-start gap-3.5">
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 18 }}
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/70"
            >
              <CheckCircleIcon size={18} />
            </motion.div>
            <div className="flex-1 min-w-0 pr-2">
              {toast.title && (
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                {toast.message}
              </p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="flex items-start gap-3.5">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/70">
              <AlertTriangleIcon size={18} />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              {toast.title && (
                <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-200 leading-snug">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                {toast.message}
              </p>
            </div>
          </div>
        );

      case "action":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3.5">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                <InfoIcon size={18} />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                {toast.title && (
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                  {toast.message}
                </p>
              </div>
            </div>

            {toast.action && (
              <div className="flex items-center justify-end gap-2 pl-11">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    toast.action?.onClick(toast.id);
                    onDismiss(toast.id);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer"
                >
                  {toast.action.label}
                </motion.button>
              </div>
            )}
          </div>
        );

      case "promise":
        const isPromiseLoading = toast.promiseState === "loading";
        const isPromiseSuccess = toast.promiseState === "success";
        const isPromiseError = toast.promiseState === "error";

        return (
          <motion.div layout className="flex items-start gap-3.5">
            <AnimatePresence mode="wait">
              {isPromiseLoading && (
                <motion.div
                  key="loading-spinner"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/70"
                >
                  <ToastSpinner className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
              )}

              {isPromiseSuccess && (
                <motion.div
                  key="success-icon"
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/70"
                >
                  <CheckCircleIcon size={18} />
                </motion.div>
              )}

              {isPromiseError && (
                <motion.div
                  key="error-icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/70"
                >
                  <AlertTriangleIcon size={18} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-w-0 pr-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={toast.promiseState + (toast.title || "")}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {toast.title && (
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {toast.title}
                    </h4>
                  )}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                    {toast.message}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Border & Glow Accent berdasarkan Varian
  const getBorderAndAccentClass = () => {
    switch (toast.type) {
      case "success":
        return "border-emerald-500/30 dark:border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.12)]";
      case "error":
        return "border-rose-500/35 dark:border-rose-500/35 shadow-[0_8px_30px_rgba(244,63,94,0.14)]";
      case "promise":
        if (toast.promiseState === "success") {
          return "border-emerald-500/30 dark:border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.12)]";
        }
        if (toast.promiseState === "error") {
          return "border-rose-500/35 dark:border-rose-500/35 shadow-[0_8px_30px_rgba(244,63,94,0.14)]";
        }
        return "border-blue-500/30 dark:border-blue-500/30 shadow-[0_8px_30px_rgba(59,130,246,0.12)]";
      case "action":
        return "border-neutral-200/90 dark:border-neutral-800/90 shadow-lg";
      case "info":
      default:
        return "border-neutral-200/90 dark:border-neutral-800/90 shadow-lg";
    }
  };

  return (
    <motion.div
      {...anim}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={toast.type === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-white/95 p-4 backdrop-blur-md dark:bg-neutral-900/95 transition-colors duration-300 border",
        getBorderAndAccentClass()
      )}
    >
      {/* Konten Utama Toast */}
      {renderVariantContent()}

      {/* Tombol Tutup Silang (Close) */}
      <button
        type="button"
        aria-label="Tutup notifikasi"
        onClick={() => onDismiss(toast.id)}
        className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
      >
        <CloseIcon size={14} />
      </button>

      {/* Progress Bar Timer (Auto-dismiss countdown indicator) */}
      {hasAutoDismiss && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-75",
              toast.type === "success" || (toast.type === "promise" && toast.promiseState === "success")
                ? "bg-emerald-500"
                : toast.type === "error" || (toast.type === "promise" && toast.promiseState === "error")
                ? "bg-rose-500"
                : toast.type === "promise"
                ? "bg-blue-500"
                : "bg-neutral-400 dark:bg-neutral-600"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}

/* =========================================================================
 * 6. STANDALONE VARIANT COMPONENTS
 * (Dapat dirender langsung secara deklaratif jika dibutuhkan)
 * ========================================================================= */

export interface StandaloneToastProps {
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ToastInfo({ title, message, onClose, className }: StandaloneToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={cn(
        "relative flex items-start gap-3.5 rounded-2xl border border-neutral-200/90 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-neutral-800/90 dark:bg-neutral-900/95",
        className
      )}
    >
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
        <InfoIcon size={18} />
      </div>
      <div className="flex-1 min-w-0 pr-6">
        {title && <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h4>}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </motion.div>
  );
}

export function ToastSuccess({ title, message, onClose, className }: StandaloneToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      transition={{ type: "spring", stiffness: 450, damping: 20, mass: 0.85 }}
      className={cn(
        "relative flex items-start gap-3.5 rounded-2xl border border-emerald-500/30 bg-white/95 p-4 shadow-[0_8px_30px_rgba(16,185,129,0.12)] backdrop-blur-md dark:border-emerald-500/30 dark:bg-neutral-900/95",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 18 }}
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/70"
      >
        <CheckCircleIcon size={18} />
      </motion.div>
      <div className="flex-1 min-w-0 pr-6">
        {title && <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h4>}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </motion.div>
  );
}

export function ToastError({ title, message, onClose, className }: StandaloneToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: [30, 0, -14, 12, -8, 6, -3, 0] }}
      exit={{ opacity: 0, x: 25, scale: 0.88 }}
      transition={{
        x: { duration: 0.55, ease: "easeOut" },
        opacity: { duration: 0.16 },
        scale: { duration: 0.2 },
      }}
      className={cn(
        "relative flex items-start gap-3.5 rounded-2xl border border-rose-500/35 bg-white/95 p-4 shadow-[0_8px_30px_rgba(244,63,94,0.14)] backdrop-blur-md dark:border-rose-500/35 dark:bg-neutral-900/95",
        className
      )}
    >
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/70">
        <AlertTriangleIcon size={18} />
      </div>
      <div className="flex-1 min-w-0 pr-6">
        {title && <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-200">{title}</h4>}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </motion.div>
  );
}

export interface StandaloneToastActionProps extends StandaloneToastProps {
  actionLabel: string;
  onAction: () => void;
}

export function ToastAction({
  title,
  message,
  actionLabel,
  onAction,
  onClose,
  className,
}: StandaloneToastActionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ type: "spring", stiffness: 380, damping: 25 }}
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-neutral-800/90 dark:bg-neutral-900/95",
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
          <InfoIcon size={18} />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          {title && <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</h4>}
          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pl-11">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onAction}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer"
        >
          {actionLabel}
        </motion.button>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </motion.div>
  );
}

export interface StandaloneToastPromiseProps {
  status: "loading" | "success" | "error";
  loadingTitle?: string;
  loadingMessage: string;
  successTitle?: string;
  successMessage: string;
  errorTitle?: string;
  errorMessage?: string;
  onClose?: () => void;
  className?: string;
}

export function ToastPromise({
  status,
  loadingTitle,
  loadingMessage,
  successTitle,
  successMessage,
  errorTitle,
  errorMessage,
  onClose,
  className,
}: StandaloneToastPromiseProps) {
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/95 p-4 backdrop-blur-md dark:bg-neutral-900/95 transition-colors duration-300 border",
        isSuccess
          ? "border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.12)]"
          : isError
          ? "border-rose-500/35 shadow-[0_8px_30px_rgba(244,63,94,0.14)]"
          : "border-blue-500/30 shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading-spinner"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/70"
            >
              <ToastSpinner className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="success-icon"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/70"
            >
              <CheckCircleIcon size={18} />
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/70"
            >
              <AlertTriangleIcon size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0 pr-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                {isSuccess ? successTitle : isError ? errorTitle : loadingTitle}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                {isSuccess ? successMessage : isError ? errorMessage : loadingMessage}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <CloseIcon size={14} />
        </button>
      )}
    </motion.div>
  );
}
