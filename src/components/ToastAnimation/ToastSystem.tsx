import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, CloseIcon } from "../../icons";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. CVA VARIANTS
 * ========================================================================= */

export const toastVariants = cva(
  "pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md dark:bg-neutral-900/95 transition-colors duration-300 border",
  {
    variants: {
      variant: {
        info: "border-neutral-200/90 dark:border-neutral-800/90 shadow-lg",
        success:
          "border-emerald-500/30 dark:border-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.12)]",
        error:
          "border-rose-500/35 dark:border-rose-500/35 shadow-[0_8px_30px_rgba(244,63,94,0.14)]",
        action: "border-neutral-200/90 dark:border-neutral-800/90 shadow-lg",
        promise:
          "border-blue-500/30 dark:border-blue-500/30 shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
      },
      size: {
        default: "p-4 text-sm",
        sm: "p-3 text-xs",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "default",
    },
  }
);

export const toastTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 shadow-xs",
        info: "bg-white text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs",
        success:
          "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.25)]",
        error:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]",
        action:
          "bg-amber-500 text-white hover:bg-amber-600 shadow-[0_4px_14px_rgba(245,158,11,0.25)]",
        promise:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_14px_rgba(59,130,246,0.25)]",
        outline:
          "border border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800",
        ghost:
          "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9 p-0",
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

export type ToastType = "info" | "success" | "error" | "action" | "promise";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastActionOptions {
  /** Label teks tombol aksi (contoh: "Undo", "Retry") */
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
  /** Posisi penempatan toast */
  position?: ToastPosition;
  /** Durasi auto-dismiss dalam milidetik (0 untuk manual) */
  duration?: number;
  /** Konfigurasi tombol aksi untuk ToastAction */
  action?: ToastActionOptions;
  /** Status khusus untuk ToastPromise */
  promiseState?: "loading" | "success" | "error";
  promiseSuccessData?: { title?: string; message: string };
  promiseErrorData?: { title?: string; message: string };
  createdAt: number;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  action?: ToastActionOptions;
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
 * 3. SPINNER COMPONENT
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
        strokeWidth="4"
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
 * 4. TOAST CONTEXT & PROVIDER
 * ========================================================================= */

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Posisi default seluruh notifikasi di viewport */
  position?: ToastPosition;
  /** Durasi default notifikasi dalam milidetik (default: 4000ms) */
  defaultDuration?: number;
  /** Ukuran default toast */
  size?: "default" | "sm" | "lg";
}

export function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 4000,
  size = "default",
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
      const id =
        options?.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const duration =
        options?.duration !== undefined ? options.duration : defaultDuration;

      const newToast: ToastItemData = {
        id,
        type,
        title: options?.title,
        message,
        position: options?.position || position,
        duration,
        action: options?.action,
        createdAt: Date.now(),
        ...extra,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    [defaultDuration, position]
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
        const id =
          options?.id ||
          `promise-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        addToast(
          "promise",
          messages.loading.message,
          {
            ...options,
            id,
            title: messages.loading.title,
            duration: 0,
          },
          {
            promiseState: "loading",
          }
        );

        try {
          const promise =
            typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
          const result = await promise;
          const resolved =
            typeof messages.success === "function"
              ? messages.success(result)
              : messages.success;

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
        const posToasts = toasts.filter(
          (t) => (t.position || position) === pos
        );
        if (posToasts.length === 0) return null;
        return (
          <ToastContainer
            key={pos}
            toasts={posToasts}
            position={pos}
            onDismiss={dismiss}
            size={size}
          />
        );
      })}
    </ToastContext.Provider>
  );
}

/** Hook untuk mengakses fungsi pemicu Toast */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus digunakan di dalam <ToastProvider>");
  }
  return context;
}

/* =========================================================================
 * 5. TOAST CONTAINER / VIEWPORT
 * ========================================================================= */

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-5 left-5 items-start",
  "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-5 right-5 items-end",
  "bottom-left": "bottom-5 left-5 items-start",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-5 right-5 items-end",
};

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  toasts: ToastItemData[];
  position?: ToastPosition;
  onDismiss: (id: string) => void;
  size?: "default" | "sm" | "lg";
}

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  (
    {
      toasts,
      position = "bottom-right",
      onDismiss,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-live="polite"
        className={cn(
          "fixed z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm sm:max-w-md px-4 sm:px-0 transition-all duration-300",
          POSITION_CLASSES[position],
          className
        )}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastItem
              key={item.id}
              toast={item}
              onDismiss={onDismiss}
              size={size}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }
);
ToastContainer.displayName = "ToastContainer";

/* =========================================================================
 * 6. TOAST ITEM & ANIMATION VARIANTS
 * ========================================================================= */

export interface ToastItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
  size?: "default" | "sm" | "lg";
}

export const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(
  ({ toast, onDismiss, size = "default", className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(100);
    const remainingTimeRef = useRef<number>(toast.duration || 0);

    const duration = toast.duration ?? 4000;
    const hasAutoDismiss = duration > 0;

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

    const getAnimationConfig = (): HTMLMotionProps<"div"> => {
      switch (toast.type) {
        case "info":
          return {
            initial: { opacity: 0, x: 80, y: 0, scale: 0.96 },
            animate: { opacity: 1, x: 0, y: 0, scale: 1 },
            exit: {
              opacity: 0,
              x: 80,
              scale: 0.95,
              transition: { duration: 0.22, ease: "easeIn" },
            },
            transition: { type: "spring", stiffness: 360, damping: 28 },
          };

        case "success":
          return {
            initial: { opacity: 0, scale: 0.65, y: 25 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: {
              opacity: 0,
              scale: 0.85,
              y: -10,
              transition: { duration: 0.2 },
            },
            transition: {
              type: "spring",
              stiffness: 450,
              damping: 20,
              mass: 0.85,
            },
          };

        case "error":
          return {
            initial: { opacity: 0, scale: 0.95, x: 30 },
            animate: {
              opacity: 1,
              scale: 1,
              x: [30, 0, -14, 12, -8, 6, -3, 0],
            },
            exit: {
              opacity: 0,
              x: 25,
              scale: 0.88,
              transition: { duration: 0.2 },
            },
            transition: {
              x: { duration: 0.55, ease: "easeOut" },
              opacity: { duration: 0.16 },
              scale: { duration: 0.2 },
            },
          };

        case "action":
          return {
            initial: { opacity: 0, y: 30, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: {
              opacity: 0,
              scale: 0.9,
              y: 15,
              transition: { duration: 0.2 },
            },
            transition: { type: "spring", stiffness: 380, damping: 25 },
          };

        case "promise":
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
                transition={{
                  delay: 0.08,
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                }}
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
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 20,
                    }}
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
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
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

    const variantKey =
      toast.type === "promise"
        ? toast.promiseState === "success"
          ? "success"
          : toast.promiseState === "error"
          ? "error"
          : "promise"
        : toast.type;

    return (
      <motion.div
        ref={ref}
        {...anim}
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={toast.type === "error" ? "alert" : "status"}
        aria-live="polite"
        className={cn(
          toastVariants({
            variant: variantKey,
            size,
          }),
          className
        )}
        {...(props as any)}
      >
        {renderVariantContent()}

        <button
          type="button"
          aria-label="Tutup notifikasi"
          onClick={() => onDismiss(toast.id)}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
        >
          <CloseIcon size={14} />
        </button>

        {hasAutoDismiss && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-75",
                toast.type === "success" ||
                  (toast.type === "promise" &&
                    toast.promiseState === "success")
                  ? "bg-emerald-500"
                  : toast.type === "error" ||
                    (toast.type === "promise" && toast.promiseState === "error")
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
);
ToastItem.displayName = "ToastItem";

/* =========================================================================
 * 7. REUSABLE TOAST TRIGGER BUTTON (<ToastTrigger /> & <ToastButton />)
 * ========================================================================= */

export interface ToastTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof toastTriggerVariants> {
  /** Tipe / varian toast yang akan dipicu */
  type?: ToastType;
  toastType?: ToastType;
  /** Judul toast */
  title?: string;
  toastTitle?: string;
  /** Pesan toast */
  message?: string;
  toastMessage?: string;
  /** Posisi khusus saat toast dipicu */
  position?: ToastPosition;
  toastPosition?: ToastPosition;
  /** Durasi tampil dalam milidetik (default: 4000ms) */
  duration?: number;
  toastDuration?: number;
  /** Konfigurasi aksi sekunder jika tipe 'action' */
  action?: ToastActionOptions;
  toastAction?: ToastActionOptions;
  /** Callback opsional saat toast berhasil dimasukkan ke antrean */
  onToastTrigger?: (id: string) => void;
  /** Tugas asinkron opsional untuk tipe 'promise' */
  toastPromiseTask?: () => Promise<any>;
  /** Pesan status dinamis untuk tipe 'promise' */
  toastPromiseMessages?: {
    loading: { title?: string; message: string };
    success: { title?: string; message: string };
    error: { title?: string; message: string };
  };
}

export const ToastTrigger = forwardRef<HTMLButtonElement, ToastTriggerProps>(
  (
    {
      className,
      variant,
      size,
      type,
      toastType = "info",
      title,
      toastTitle,
      message,
      toastMessage = "Notification triggered successfully.",
      position,
      toastPosition,
      duration,
      toastDuration,
      action,
      toastAction,
      onToastTrigger,
      toastPromiseTask,
      toastPromiseMessages,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const context = useContext(ToastContext);
    const resolvedType = type ?? toastType;
    const resolvedTitle = title ?? toastTitle;
    const resolvedMessage = message ?? toastMessage;
    const resolvedPosition = position ?? toastPosition;
    const resolvedDuration = duration ?? toastDuration;
    const resolvedAction = action ?? toastAction;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      if (!context) {
        console.warn(
          "<ToastTrigger /> must be used within a <ToastProvider /> to fire toasts."
        );
        return;
      }

      let generatedId = "";
      const options: ToastOptions = {
        title: resolvedTitle,
        position: resolvedPosition,
        duration: resolvedDuration,
        action: resolvedAction,
      };

      if (resolvedType === "promise") {
        const task =
          toastPromiseTask ??
          (() => new Promise((resolve) => setTimeout(resolve, 2000)));
        const messages = toastPromiseMessages ?? {
          loading: {
            title: resolvedTitle || "Processing...",
            message:
              resolvedMessage || "Please wait while we process your request.",
          },
          success: {
            title: "Completed!",
            message: "Operation completed successfully.",
          },
          error: {
            title: "Failed",
            message: "An unexpected error occurred.",
          },
        };
        context.toast.promise(task, messages, options);
      } else if (resolvedType === "action" && resolvedAction) {
        generatedId = context.toast.action(
          resolvedMessage,
          resolvedAction,
          options
        );
      } else if (resolvedType === "success") {
        generatedId = context.toast.success(resolvedMessage, options);
      } else if (resolvedType === "error") {
        generatedId = context.toast.error(resolvedMessage, options);
      } else {
        generatedId = context.toast.info(resolvedMessage, options);
      }

      if (generatedId) {
        onToastTrigger?.(generatedId);
      }
    };

    const computedVariant = variant || (toastType as any) || "default";

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          toastTriggerVariants({ variant: computedVariant, size }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToastTrigger.displayName = "ToastTrigger";

/** Alias deklaratif untuk <ToastTrigger /> */
export const ToastButton = ToastTrigger;

/* =========================================================================
 * 8. UNIFIED STANDALONE TOAST COMPONENT
 * ========================================================================= */

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  progress?: number;
  action?: React.ReactNode;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "info",
      size = "default",
      title,
      message,
      icon,
      onClose,
      progress,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcon = () => {
      if (icon) return icon;
      switch (variant) {
        case "success":
          return (
            <CheckCircleIcon
              size={18}
              className="text-emerald-600 dark:text-emerald-400"
            />
          );
        case "error":
          return (
            <AlertTriangleIcon
              size={18}
              className="text-rose-600 dark:text-rose-400"
            />
          );
        case "promise":
          return (
            <ToastSpinner className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          );
        case "action":
        case "info":
        default:
          return (
            <InfoIcon
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        role={variant === "error" ? "alert" : "status"}
        aria-live="polite"
        className={cn(toastVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800">
            {defaultIcon()}
          </div>
          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                {title}
              </h4>
            )}
            {message && (
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                {message}
              </p>
            )}
            {children}
          </div>
        </div>

        {action && <div className="mt-3 flex justify-end">{action}</div>}

        {onClose && (
          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}

        {typeof progress === "number" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-75",
                variant === "success"
                  ? "bg-emerald-500"
                  : variant === "error"
                  ? "bg-rose-500"
                  : variant === "promise"
                  ? "bg-blue-500"
                  : "bg-neutral-400 dark:bg-neutral-600"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

/* =========================================================================
 * 9. STANDALONE VARIANT COMPONENTS (DEKLARATIF)
 * ========================================================================= */

export interface StandaloneToastProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof toastVariants> {
  title?: string;
  message: string;
  onClose?: () => void;
}

export const ToastInfo = forwardRef<HTMLDivElement, StandaloneToastProps>(
  ({ title, message, onClose, className, size = "default", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        className={cn(
          toastVariants({ variant: "info", size }),
          className
        )}
        {...(props as any)}
      >
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
            <InfoIcon size={18} />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h4>
            )}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              {message}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </motion.div>
    );
  }
);
ToastInfo.displayName = "ToastInfo";

export const ToastSuccess = forwardRef<HTMLDivElement, StandaloneToastProps>(
  ({ title, message, onClose, className, size = "default", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.65, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -10 }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 20,
          mass: 0.85,
        }}
        className={cn(
          toastVariants({ variant: "success", size }),
          className
        )}
        {...(props as any)}
      >
        <div className="flex items-start gap-3.5">
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.08,
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/70"
          >
            <CheckCircleIcon size={18} />
          </motion.div>
          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h4>
            )}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              {message}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </motion.div>
    );
  }
);
ToastSuccess.displayName = "ToastSuccess";

export const ToastError = forwardRef<HTMLDivElement, StandaloneToastProps>(
  ({ title, message, onClose, className, size = "default", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: [30, 0, -14, 12, -8, 6, -3, 0] }}
        exit={{ opacity: 0, x: 25, scale: 0.88 }}
        transition={{
          x: { duration: 0.55, ease: "easeOut" },
          opacity: { duration: 0.16 },
          scale: { duration: 0.2 },
        }}
        className={cn(
          toastVariants({ variant: "error", size }),
          className
        )}
        {...(props as any)}
      >
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/70">
            <AlertTriangleIcon size={18} />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                {title}
              </h4>
            )}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              {message}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </motion.div>
    );
  }
);
ToastError.displayName = "ToastError";

export interface StandaloneToastActionProps extends StandaloneToastProps {
  actionLabel: string;
  onAction: () => void;
}

export const ToastAction = forwardRef<HTMLDivElement, StandaloneToastActionProps>(
  (
    {
      title,
      message,
      actionLabel,
      onAction,
      onClose,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: "spring", stiffness: 380, damping: 25 }}
        className={cn(
          toastVariants({ variant: "action", size }),
          className
        )}
        {...(props as any)}
      >
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            <InfoIcon size={18} />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            {title && (
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h4>
            )}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              {message}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pl-11 mt-3">
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
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </motion.div>
    );
  }
);
ToastAction.displayName = "ToastAction";

export interface StandaloneToastPromiseProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof toastVariants> {
  status: "loading" | "success" | "error";
  loadingTitle?: string;
  loadingMessage: string;
  successTitle?: string;
  successMessage: string;
  errorTitle?: string;
  errorMessage?: string;
  onClose?: () => void;
}

export const ToastPromise = forwardRef<HTMLDivElement, StandaloneToastPromiseProps>(
  (
    {
      status,
      loadingTitle,
      loadingMessage,
      successTitle,
      successMessage,
      errorTitle,
      errorMessage,
      onClose,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const isSuccess = status === "success";
    const isError = status === "error";

    const variantKey = isSuccess ? "success" : isError ? "error" : "promise";

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className={cn(
          toastVariants({ variant: variantKey, size }),
          className
        )}
        {...(props as any)}
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
                  {isSuccess
                    ? successTitle
                    : isError
                    ? errorTitle
                    : loadingTitle}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-0.5">
                  {isSuccess
                    ? successMessage
                    : isError
                    ? errorMessage
                    : loadingMessage}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </motion.div>
    );
  }
);
ToastPromise.displayName = "ToastPromise";
