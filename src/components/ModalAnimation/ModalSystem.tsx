import React, { useEffect, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CloseIcon,
  AlertTriangleIcon,
  SettingsIcon,
  UserIcon,
  MailIcon,
} from "../../icons";
import { cn } from "../../utils/cn";
import { type DivMotionProps, ModalPortal } from "./Modal";

// ============================================================================
// CVA VARIANTS
// ============================================================================

export const backdropVariants = cva(
  "fixed inset-0 transition-opacity",
  {
    variants: {
      backdropVariant: {
        default: "bg-neutral-950/60 backdrop-blur-xs",
        dark: "bg-neutral-950/80 backdrop-blur-sm",
        blur: "bg-black/90 backdrop-blur-md",
        transparent: "bg-transparent",
      },
    },
    defaultVariants: {
      backdropVariant: "default",
    },
  }
);

export const modalContentVariants = cva(
  "relative w-full overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10 transition-colors",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
        full: "max-w-[95vw] sm:max-w-4xl",
      },
      variant: {
        default: "border-neutral-200/90 dark:border-neutral-800/90",
        danger: "border-rose-200 dark:border-rose-900/60",
        warning: "border-amber-200 dark:border-amber-900/60",
        clean: "border-transparent shadow-none bg-transparent dark:bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export const drawerVariants = cva(
  "relative flex h-full h-screen max-h-screen flex-col bg-white shadow-2xl dark:bg-neutral-900 z-10 overflow-hidden border-neutral-200/90 dark:border-neutral-800/90",
  {
    variants: {
      position: {
        right: "border-l",
        left: "border-r",
      },
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-xl",
        full: "w-screen max-w-screen",
      },
    },
    defaultVariants: {
      position: "right",
      size: "md",
    },
  }
);

export const bottomSheetVariants = cva(
  "relative flex flex-col w-full rounded-t-3xl border-t border-x border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10 overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-md max-h-[60vh]",
        md: "max-w-2xl max-h-[85vh]",
        lg: "max-w-4xl max-h-[90vh]",
        full: "max-w-full max-h-[95vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// BASE PROPS & ACCESSIBILITY HOOK
// ============================================================================

// Re-used from compound Modal

export interface BaseModalProps extends DivMotionProps {
  /** Status keterbukaan modal */
  isOpen: boolean;
  /** Callback saat modal ditutup (klik backdrop, tombol X, atau tombol Escape) */
  onClose: () => void;
  /** Apakah tombol Escape dapat menutup modal (default: true) */
  closeOnEscape?: boolean;
  /** Apakah mengklik area backdrop transparan dapat menutup modal (default: true) */
  closeOnBackdropClick?: boolean;
  /** Class styling kustom untuk elemen backdrop */
  backdropClassName?: string;
  /** Varian intensitas transparansi/blur backdrop */
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
  /** Class styling tambahan untuk container modal */
  className?: string;
}

export function useModalAccessibility(
  isOpen: boolean,
  onClose: () => void,
  closeOnEscape: boolean = true
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
}

// ============================================================================
// 1. MODAL CONFIRM
// ============================================================================

export interface ModalConfirmProps
  extends BaseModalProps,
    VariantProps<typeof modalContentVariants> {
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** Varian warna tombol konfirmasi: 'danger' (merah rose) atau 'primary' (gelap/biru) */
  confirmVariant?: "danger" | "primary" | "warning";
}

export const ModalConfirm = forwardRef<HTMLDivElement, ModalConfirmProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      cancelLabel = "Batal",
      confirmLabel = "Konfirmasi",
      onConfirm,
      confirmVariant = "danger",
      closeOnEscape = true,
      closeOnBackdropClick = true,
      backdropClassName,
      backdropVariant = "default",
      size = "md",
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    useModalAccessibility(isOpen, onClose, closeOnEscape);

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (closeOnBackdropClick) onClose();
                }}
                className={cn(backdropVariants({ backdropVariant }), backdropClassName)}
              />

              <motion.div
                ref={ref}
                role="alertdialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 14 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(modalContentVariants({ size, variant }), className)}
                {...props}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl",
                      confirmVariant === "danger"
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/60"
                        : confirmVariant === "warning"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/70 dark:border-amber-900/60"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/70 dark:border-blue-900/60"
                    )}
                  >
                    <AlertTriangleIcon size={22} />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Tutup modal"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/70">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition cursor-pointer active:scale-95",
                      confirmVariant === "danger"
                        ? "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]"
                        : confirmVariant === "warning"
                        ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                        : "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                    )}
                  >
                    {confirmLabel}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalConfirm.displayName = "ModalConfirm";

// ============================================================================
// 2. MODAL FORM
// ============================================================================

export interface ModalFormProps
  extends Omit<BaseModalProps, "onSubmit">,
    VariantProps<typeof modalContentVariants> {
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  saveLabel?: string;
  initialValues?: {
    name?: string;
    email?: string;
    role?: string;
  };
  labels?: {
    name?: string;
    email?: string;
    role?: string;
  };
  placeholders?: {
    name?: string;
    email?: string;
  };
  onSubmit: (values: { name: string; email: string; role: string }) => void;
  children?: React.ReactNode;
}

export const ModalForm = forwardRef<HTMLDivElement, ModalFormProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      cancelLabel = "Batal",
      saveLabel = "Simpan Perubahan",
      initialValues = { name: "John Doe", email: "arya@example.com", role: "Design Architect" },
      labels = { name: "Nama Lengkap", email: "Alamat Email", role: "Peran / Role" },
      placeholders = { name: "Masukkan nama Anda", email: "nama@perusahaan.com" },
      onSubmit,
      children,
      closeOnEscape = true,
      closeOnBackdropClick = true,
      backdropClassName,
      backdropVariant = "default",
      size = "lg",
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    useModalAccessibility(isOpen, onClose, closeOnEscape);

    const [formData, setFormData] = React.useState(initialValues);

    useEffect(() => {
      if (isOpen) {
        setFormData(initialValues);
      }
    }, [isOpen, initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData as { name: string; email: string; role: string });
      onClose();
    };

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (closeOnBackdropClick) onClose();
                }}
                className={cn(backdropVariants({ backdropVariant }), backdropClassName)}
              />

              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(modalContentVariants({ size, variant }), "p-0", className)}
                {...props}
              >
                <div className="flex items-start justify-between border-b border-neutral-200/80 px-6 py-5 dark:border-neutral-800/80">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Tutup form"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                {children ? (
                  <div className="p-6">{children}</div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 p-6">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          <UserIcon size={14} className="text-neutral-500" />
                          <span>{labels.name}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name || ""}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={placeholders.name}
                          className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          <MailIcon size={14} className="text-neutral-500" />
                          <span>{labels.email}</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email || ""}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={placeholders.email}
                          className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-2xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          <SettingsIcon size={14} className="text-neutral-500" />
                          <span>{labels.role}</span>
                        </label>
                        <select
                          value={formData.role || "Design Architect"}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 transition shadow-2xs cursor-pointer"
                        >
                          <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                          <option value="Design Architect">Design Architect</option>
                          <option value="Product Designer">Product Designer</option>
                          <option value="Full-stack Developer">Full-stack Developer</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-4 dark:border-neutral-800/80 dark:bg-neutral-950/40">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
                      >
                        {cancelLabel}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xs transition cursor-pointer active:scale-95"
                      >
                        {saveLabel}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalForm.displayName = "ModalForm";

// ============================================================================
// 3. MODAL DRAWER (SIDE OVER)
// ============================================================================

export interface ModalDrawerProps
  extends BaseModalProps,
    VariantProps<typeof drawerVariants> {
  title: string;
  subtitle?: string;
  closeLabel?: string;
  saveLabel?: string;
  onSave?: () => void;
  children?: React.ReactNode;
}

export const ModalDrawer = forwardRef<HTMLDivElement, ModalDrawerProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      closeLabel = "Tutup Panel",
      saveLabel = "Terapkan Pengaturan",
      onSave,
      children,
      position = "right",
      size = "md",
      closeOnEscape = true,
      closeOnBackdropClick = true,
      backdropClassName,
      backdropVariant = "default",
      className,
      ...props
    },
    ref
  ) => {
    useModalAccessibility(isOpen, onClose, closeOnEscape);

    const isLeft = position === "left";
    const initialOffset = isLeft ? "-100%" : "100%";

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              className={cn(
                "fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex overflow-hidden",
                isLeft ? "justify-start" : "justify-end"
              )}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  if (closeOnBackdropClick) onClose();
                }}
                className={cn(backdropVariants({ backdropVariant }), backdropClassName)}
              />

              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ x: initialOffset }}
                animate={{ x: 0 }}
                exit={{ x: initialOffset }}
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(drawerVariants({ position, size }), className)}
                {...props}
              >
                <div className="flex items-center justify-between border-b border-neutral-200/80 px-6 py-5 dark:border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      <SettingsIcon size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {title}
                      </h3>
                      {subtitle && (
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Tutup drawer"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {children}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-4 dark:border-neutral-800/80 dark:bg-neutral-950/40">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
                  >
                    {closeLabel}
                  </button>
                  {onSave && (
                    <button
                      type="button"
                      onClick={() => {
                        onSave();
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer active:scale-95"
                    >
                      {saveLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalDrawer.displayName = "ModalDrawer";

// ============================================================================
// 4. MODAL BOTTOM SHEET
// ============================================================================

export interface ModalBottomSheetProps
  extends BaseModalProps,
    VariantProps<typeof bottomSheetVariants> {
  title: string;
  subtitle?: string;
  closeLabel?: string;
  children?: React.ReactNode;
}

export const ModalBottomSheet = forwardRef<HTMLDivElement, ModalBottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      title,
      subtitle,
      closeLabel = "Tutup",
      children,
      size = "md",
      closeOnEscape = true,
      closeOnBackdropClick = true,
      backdropClassName,
      backdropVariant = "default",
      className,
      ...props
    },
    ref
  ) => {
    useModalAccessibility(isOpen, onClose, closeOnEscape);

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-end justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  if (closeOnBackdropClick) onClose();
                }}
                className={cn(backdropVariants({ backdropVariant }), backdropClassName)}
              />

              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(bottomSheetVariants({ size }), className)}
                {...props}
              >
                <div className="pt-3 pb-1 flex justify-center">
                  <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </div>

                <div className="flex items-center justify-between border-b border-neutral-200/80 px-6 py-4 dark:border-neutral-800/80">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Tutup sheet"
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">{children}</div>

                <div className="flex items-center justify-end border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/40">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
                  >
                    {closeLabel}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalBottomSheet.displayName = "ModalBottomSheet";

// ============================================================================
// 5. MODAL MEDIA LIGHTBOX
// ============================================================================

export interface ModalMediaProps extends BaseModalProps {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export const ModalMedia = forwardRef<HTMLDivElement, ModalMediaProps>(
  (
    {
      isOpen,
      onClose,
      src,
      alt = "Pratinjau Media",
      title,
      caption,
      closeOnEscape = true,
      closeOnBackdropClick = true,
      backdropClassName,
      backdropVariant = "blur",
      className,
      ...props
    },
    ref
  ) => {
    useModalAccessibility(isOpen, onClose, closeOnEscape);

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  if (closeOnBackdropClick) onClose();
                }}
                className={cn(backdropVariants({ backdropVariant }), backdropClassName)}
              />

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                aria-label="Tutup lightbox"
                onClick={onClose}
                className="fixed top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/80 text-white backdrop-blur-md hover:bg-neutral-800 border border-neutral-700/60 shadow-lg transition cursor-pointer active:scale-95"
              >
                <CloseIcon size={20} />
              </motion.button>

              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.78, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: 20 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative z-10 flex flex-col items-center max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl",
                  className
                )}
                {...props}
              >
                <div className="relative overflow-hidden rounded-2xl bg-neutral-950 flex items-center justify-center">
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl select-none"
                  />
                </div>

                {(title || caption) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-3 w-full rounded-xl bg-neutral-900/85 px-4 py-3 text-center backdrop-blur-md border border-neutral-800/80"
                  >
                    {title && (
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        {title}
                      </h4>
                    )}
                    {caption && (
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {caption}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalMedia.displayName = "ModalMedia";
