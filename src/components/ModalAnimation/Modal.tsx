import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useId,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { CloseIcon, AlertTriangleIcon } from "../../icons";

// ============================================================================
// MOTION PROPS TYPING HELPER
// ============================================================================

export type DivMotionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

// ============================================================================
// CVA VARIANTS
// ============================================================================

export const modalBackdropVariants = cva(
  "fixed inset-0 z-50 transition-opacity",
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

export const modalContainerVariants = cva(
  "relative w-full overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-50 text-neutral-900 dark:text-neutral-100 focus:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
        full: "max-w-[95vw] sm:max-w-5xl",
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

export const compoundDrawerVariants = cva(
  "fixed top-0 bottom-0 z-50 flex h-full max-h-screen flex-col bg-white shadow-2xl dark:bg-neutral-900 overflow-hidden border-neutral-200/90 dark:border-neutral-800/90 text-neutral-900 dark:text-neutral-100 focus:outline-none",
  {
    variants: {
      position: {
        right: "right-0 border-l",
        left: "left-0 border-r",
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

export const compoundBottomSheetVariants = cva(
  "fixed bottom-0 inset-x-0 z-50 mx-auto flex flex-col w-full rounded-t-3xl border-t border-x border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 overflow-hidden text-neutral-900 dark:text-neutral-100 focus:outline-none",
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
// 1. MODAL CONTEXT & HOOK
// ============================================================================

export interface ModalContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  dialogId: string;
  titleId: string;
  descriptionId: string;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal compound components must be used within a <Modal> Provider."
    );
  }
  return context;
}

// ============================================================================
// 2. ROOT MODAL PROVIDER (Zero-State Support)
// ============================================================================

export interface ModalProps {
  children: React.ReactNode;
  /**
   * Controlled open state. If omitted, Modal operates in zero-state mode
   * (uncontrolled) automatically.
   */
  open?: boolean;
  /**
   * Initial open state for uncontrolled mode (default: false).
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether clicking outside the dialog closes it (default: true).
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether pressing the Escape key closes it (default: true).
   */
  closeOnEscape?: boolean;
}

export function Modal({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const uniqueId = useId();
  const dialogId = `modal-dialog-${uniqueId}`;
  const titleId = `modal-title-${uniqueId}`;
  const descriptionId = `modal-desc-${uniqueId}`;

  const setIsOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        onClose,
        closeOnBackdropClick,
        closeOnEscape,
        dialogId,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// ============================================================================
// 3. MODAL TRIGGER
// ============================================================================

export interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When true, ModalTrigger will not render its own <button>, but instead clone
   * and inject onClick & ARIA handlers into its immediate child element.
   */
  asChild?: boolean;
  children: React.ReactNode;
}

export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ asChild = false, children, onClick, className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setIsOpen(true);
      }
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
        className?: string;
        "aria-haspopup"?: string;
        "aria-expanded"?: boolean;
      }>;

      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ModalTrigger.displayName = "ModalTrigger";

// ============================================================================
// 4. MODAL PORTAL
// ============================================================================

export interface ModalPortalProps {
  children: React.ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

// ============================================================================
// 5. MODAL OVERLAY (Backdrop)
// ============================================================================

export interface ModalOverlayProps
  extends DivMotionProps,
    VariantProps<typeof modalBackdropVariants> {
  className?: string;
}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ backdropVariant = "default", className, onClick, ...props }, ref) => {
    const { onClose, closeOnBackdropClick } = useModal();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (closeOnBackdropClick && !e.defaultPrevented) {
        onClose();
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        aria-hidden="true"
        className={cn(modalBackdropVariants({ backdropVariant }), className)}
        {...props}
      />
    );
  }
);
ModalOverlay.displayName = "ModalOverlay";

// ============================================================================
// 6. MODAL CONTENT
// ============================================================================

export interface ModalContentProps
  extends DivMotionProps,
    VariantProps<typeof modalContainerVariants> {
  children?: React.ReactNode;
  /** Shorthand title prop */
  title?: string;
  /** Shorthand description prop */
  description?: string;
  /** Show close X button in top right (default: true) */
  showCloseButton?: boolean;
  /** Custom wrapper backdrop variant */
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
  /** Custom className for backdrop overlay */
  backdropClassName?: string;
  /** Custom className for centering container */
  containerClassName?: string;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      children,
      title,
      description,
      size = "md",
      variant = "default",
      showCloseButton = true,
      backdropVariant = "default",
      backdropClassName,
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen, onClose, dialogId, titleId, descriptionId } = useModal();

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto",
                containerClassName
              )}
            >
              <ModalOverlay
                backdropVariant={backdropVariant}
                className={backdropClassName}
              />
              <motion.div
                ref={ref}
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{
                  type: "spring",
                  duration: 0.35,
                  bounce: 0.15,
                }}
                className={cn(
                  modalContainerVariants({ size, variant }),
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                )}

                {title && (
                  <ModalHeader>
                    <ModalTitle id={titleId}>{title}</ModalTitle>
                    {description && (
                      <ModalDescription id={descriptionId}>
                        {description}
                      </ModalDescription>
                    )}
                  </ModalHeader>
                )}

                {children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalContent.displayName = "ModalContent";

// ============================================================================
// 7. COMPOUND SUB-ELEMENTS (Header, Title, Description, Footer, Close)
// ============================================================================

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 text-left mb-4", className)}
      {...props}
    />
  )
);
ModalHeader.displayName = "ModalHeader";

export interface ModalTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useModal();
    return (
      <h2
        ref={ref}
        id={props.id || titleId}
        className={cn(
          "text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100",
          className
        )}
        {...props}
      />
    );
  }
);
ModalTitle.displayName = "ModalTitle";

export interface ModalDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ModalDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useModal();
  return (
    <p
      ref={ref}
      id={props.id || descriptionId}
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed",
        className
      )}
      {...props}
    />
  );
});
ModalDescription.displayName = "ModalDescription";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-2 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800",
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = "ModalFooter";

export interface ModalCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ asChild = false, children, onClick, className, ...props }, ref) => {
    const { onClose } = useModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        onClose();
      }
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      }>;
      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400",
          className
        )}
        {...props}
      >
        {children || "Tutup"}
      </button>
    );
  }
);
ModalClose.displayName = "ModalClose";

// ============================================================================
// 8. COMPOUND VARIATION: CONFIRM MODAL (ModalConfirmContent)
// ============================================================================

export interface ModalConfirmContentProps
  extends DivMotionProps,
    VariantProps<typeof modalContainerVariants> {
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  confirmVariant?: "danger" | "primary" | "warning";
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
}

export const ModalConfirmContent = forwardRef<
  HTMLDivElement,
  ModalConfirmContentProps
>(
  (
    {
      title,
      description,
      cancelLabel = "Batal",
      confirmLabel = "Konfirmasi",
      onConfirm,
      confirmVariant = "danger",
      backdropVariant = "default",
      size = "sm",
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen, onClose, dialogId, titleId, descriptionId } = useModal();

    const handleConfirm = () => {
      onConfirm();
      onClose();
    };

    const confirmButtonStyles = {
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20 dark:bg-rose-600 dark:hover:bg-rose-700",
      primary:
        "bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg shadow-neutral-900/20 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
      warning:
        "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 dark:bg-amber-600 dark:hover:bg-amber-700",
    };

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <ModalOverlay backdropVariant={backdropVariant} />
              <motion.div
                ref={ref}
                id={dialogId}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{
                  type: "spring",
                  duration: 0.35,
                  bounce: 0.15,
                }}
                className={cn(
                  modalContainerVariants({ size, variant: "default" }),
                  "text-center sm:text-left",
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      confirmVariant === "danger"
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                        : confirmVariant === "warning"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                        : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                    )}
                  >
                    <AlertTriangleIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2
                      id={titleId}
                      className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    >
                      {title}
                    </h2>
                    <p
                      id={descriptionId}
                      className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed"
                    >
                      {description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className={cn(
                      "inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                      confirmButtonStyles[confirmVariant]
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
ModalConfirmContent.displayName = "ModalConfirmContent";

// ============================================================================
// 9. COMPOUND VARIATION: FORM MODAL (ModalFormContent)
// ============================================================================

export interface ModalFormContentProps
  extends Omit<DivMotionProps, "onSubmit">,
    VariantProps<typeof modalContainerVariants> {
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  saveLabel?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
}

export const ModalFormContent = forwardRef<
  HTMLDivElement,
  ModalFormContentProps
>(
  (
    {
      title,
      subtitle,
      cancelLabel = "Batal",
      saveLabel = "Simpan",
      onSubmit,
      children,
      size = "md",
      backdropVariant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen, onClose, dialogId, titleId, descriptionId } = useModal();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(e);
    };

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <ModalOverlay backdropVariant={backdropVariant} />
              <motion.div
                ref={ref}
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={subtitle ? descriptionId : undefined}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{
                  type: "spring",
                  duration: 0.35,
                  bounce: 0.15,
                }}
                className={cn(
                  modalContainerVariants({ size, variant: "default" }),
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                <div className="flex items-start justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
                  <div>
                    <h2
                      id={titleId}
                      className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    >
                      {title}
                    </h2>
                    {subtitle && (
                      <p
                        id={descriptionId}
                        className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5"
                      >
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup"
                    className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="space-y-4">{children}</div>

                  <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      {cancelLabel}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-all"
                    >
                      {saveLabel}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
ModalFormContent.displayName = "ModalFormContent";

// ============================================================================
// 10. COMPOUND DRAWER (Drawer, DrawerTrigger, DrawerContent, etc.)
// ============================================================================

export const Drawer = Modal;
export const DrawerTrigger = ModalTrigger;
export const DrawerClose = ModalClose;

export interface DrawerContentProps
  extends DivMotionProps,
    VariantProps<typeof compoundDrawerVariants> {
  children?: React.ReactNode;
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
  backdropClassName?: string;
  showCloseButton?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      children,
      position = "right",
      size = "md",
      backdropVariant = "default",
      backdropClassName,
      showCloseButton = true,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen, onClose, dialogId, titleId, descriptionId } = useModal();
    const isRight = position === "right";

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <ModalOverlay
                backdropVariant={backdropVariant}
                className={backdropClassName}
              />
              <motion.div
                ref={ref}
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                initial={{ x: isRight ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: isRight ? "100%" : "-100%" }}
                transition={{
                  type: "spring",
                  damping: 28,
                  stiffness: 280,
                }}
                className={cn(
                  compoundDrawerVariants({ position, size }),
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup drawer"
                    className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition-colors"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                )}
                {children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 border-b border-neutral-100 dark:border-neutral-800",
      className
    )}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

export const DrawerTitle = ModalTitle;
export const DrawerDescription = ModalDescription;

export const DrawerBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto p-6", className)}
    {...props}
  />
));
DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50",
      className
    )}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";

// ============================================================================
// 11. COMPOUND BOTTOM SHEET (BottomSheet, BottomSheetTrigger, etc.)
// ============================================================================

export const BottomSheet = Modal;
export const BottomSheetTrigger = ModalTrigger;
export const BottomSheetClose = ModalClose;

export interface BottomSheetContentProps
  extends DivMotionProps,
    VariantProps<typeof compoundBottomSheetVariants> {
  children?: React.ReactNode;
  backdropVariant?: "default" | "dark" | "blur" | "transparent";
  backdropClassName?: string;
  showHandle?: boolean;
}

export const BottomSheetContent = forwardRef<
  HTMLDivElement,
  BottomSheetContentProps
>(
  (
    {
      children,
      size = "md",
      backdropVariant = "default",
      backdropClassName,
      showHandle = true,
      className,
      ...props
    },
    ref
  ) => {
    const { isOpen, dialogId, titleId, descriptionId } = useModal();

    return (
      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end">
              <ModalOverlay
                backdropVariant={backdropVariant}
                className={backdropClassName}
              />
              <motion.div
                ref={ref}
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  type: "spring",
                  damping: 26,
                  stiffness: 260,
                }}
                className={cn(
                  compoundBottomSheetVariants({ size }),
                  className
                )}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                {showHandle && (
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                )}
                {children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ModalPortal>
    );
  }
);
BottomSheetContent.displayName = "BottomSheetContent";

export const BottomSheetHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800",
      className
    )}
    {...props}
  />
));
BottomSheetHeader.displayName = "BottomSheetHeader";

export const BottomSheetTitle = ModalTitle;
export const BottomSheetDescription = ModalDescription;

export const BottomSheetBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
    {...props}
  />
));
BottomSheetBody.displayName = "BottomSheetBody";

export const BottomSheetFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50",
      className
    )}
    {...props}
  />
));
BottomSheetFooter.displayName = "BottomSheetFooter";
