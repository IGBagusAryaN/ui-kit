import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "../../icons";

/* =========================================================================
 * 1. CONTEXT (UNTUK SHARING LAYOUT ID & PROPS ANTAR COMPOUND COMPONENTS)
 * ========================================================================= */

interface PaginationContextValue {
  layoutId: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const PaginationContext = React.createContext<PaginationContextValue>({
  layoutId: "pagination-active",
  size: "default",
});

export const usePaginationContext = () => React.useContext(PaginationContext);

/* =========================================================================
 * 2. ROOT: <Pagination />
 * ========================================================================= */

export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
  /**
   * Kunci unik Framer Motion layoutId untuk sinkronisasi animasi sliding active pill.
   * Default: "pagination-active"
   */
  layoutId?: string;
  /** Ukuran default yang akan diwariskan ke semua PaginationLink */
  size?: "default" | "sm" | "lg" | "icon";
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      layoutId = "pagination-active",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ layoutId, size }),
      [layoutId, size]
    );

    return (
      <PaginationContext.Provider value={contextValue}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="pagination"
          className={cn("mx-auto flex w-full justify-center", className)}
          {...props}
        >
          {children}
        </nav>
      </PaginationContext.Provider>
    );
  }
);
Pagination.displayName = "Pagination";

/* =========================================================================
 * 3. WRAPPER LIST: <PaginationContent />
 * ========================================================================= */

export interface PaginationContentProps
  extends React.ComponentPropsWithoutRef<"ul"> {}

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5 sm:gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

/* =========================================================================
 * 4. ITEM WRAPPER: <PaginationItem />
 * ========================================================================= */

export interface PaginationItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  PaginationItemProps
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative list-none", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/* =========================================================================
 * 5. CVA & INTERACTIVE: <PaginationLink />
 * ========================================================================= */

export const paginationLinkVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white",
        outline:
          "border border-neutral-200/90 dark:border-neutral-800 text-neutral-700 hover:bg-neutral-100/70 dark:text-neutral-300 dark:hover:bg-neutral-900/60",
        ghost:
          "hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300",
      },
      size: {
        default: "h-9 min-w-9 px-3.5 py-2 text-sm",
        sm: "h-8 min-w-8 px-2.5 py-1.5 text-xs rounded-md",
        lg: "h-10 min-w-10 px-4 py-2.5 text-base rounded-xl",
        icon: "h-9 w-9 p-0 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PaginationLinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
    >,
    VariantProps<typeof paginationLinkVariants> {
  /** Menandakan apakah halaman ini sedang aktif */
  isActive?: boolean;
  /**
   * Dukungan slot asChild agar kompatibel dengan Next.js <Link> atau React Router.
   */
  asChild?: boolean;
  /** Override layoutId khusus jika tidak ingin menggunakan layoutId bawaan root Pagination */
  layoutId?: string;
  /** Class tambahan khusus untuk active background pill */
  activeClassName?: string;
}

export const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(
  (
    {
      className,
      isActive = false,
      size,
      variant = "default",
      asChild = false,
      layoutId: customLayoutId,
      activeClassName,
      children,
      href,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = usePaginationContext();
    const resolvedSize = size ?? context.size ?? "default";
    const resolvedLayoutId = customLayoutId ?? context.layoutId ?? "pagination-active";

    // Konten Active Sliding Pill dari Framer Motion
    const activePill = isActive ? (
      <motion.div
        layoutId={resolvedLayoutId}
        className={cn(
          "absolute inset-0 rounded-lg bg-neutral-900 shadow-sm dark:bg-neutral-100 -z-0",
          activeClassName
        )}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 32,
        }}
      />
    ) : null;

    // Saat asChild = true (misal Next.js Link / Remix NavLink)
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
        "aria-current"?: "page" | undefined;
      }>;

      return React.cloneElement(child, {
        "aria-current": isActive ? "page" : undefined,
        className: cn(
          paginationLinkVariants({ variant, size: resolvedSize }),
          isActive
            ? "text-white dark:text-neutral-950 font-semibold"
            : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
          child.props.className,
          className
        ),
        children: (
          <>
            {activePill}
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              {child.props.children}
            </span>
          </>
        ),
      });
    }

    const commonMotionProps: HTMLMotionProps<any> = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 450, damping: 25 },
    };

    const linkClasses = cn(
      paginationLinkVariants({ variant, size: resolvedSize }),
      isActive
        ? "text-white dark:text-neutral-950 font-semibold"
        : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
      className
    );

    // Jika memiliki atribut href, render elemen <a>, jika tidak render <button>
    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={linkClasses}
          onClick={onClick}
          {...(commonMotionProps as HTMLMotionProps<"a">)}
          {...props}
        >
          {activePill}
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            {children}
          </span>
        </motion.a>
      );
    }

    return (
      <motion.button
        type="button"
        ref={ref as any}
        aria-current={isActive ? "page" : undefined}
        className={linkClasses}
        onClick={onClick as any}
        {...(commonMotionProps as HTMLMotionProps<"button">)}
        {...(props as any)}
      >
        {activePill}
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          {children}
        </span>
      </motion.button>
    );
  }
);
PaginationLink.displayName = "PaginationLink";

/* =========================================================================
 * 6. PREVIOUS & NEXT CONTROLS
 * ========================================================================= */

export interface PaginationPreviousProps extends PaginationLinkProps {
  /** Label teks untuk tombol previous. Default: "Previous" */
  label?: string;
  /** Tampilkan ikon saja (tanpa teks) pada layar kecil */
  compact?: boolean;
}

export const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(
  (
    {
      className,
      label = "Previous",
      compact = false,
      size,
      variant = "ghost",
      ...props
    },
    ref
  ) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size={size}
      variant={variant}
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
      <span className={cn(compact ? "hidden sm:inline" : "inline")}>
        {label}
      </span>
    </PaginationLink>
  )
);
PaginationPrevious.displayName = "PaginationPrevious";

export interface PaginationNextProps extends PaginationLinkProps {
  /** Label teks untuk tombol next. Default: "Next" */
  label?: string;
  /** Tampilkan ikon saja (tanpa teks) pada layar kecil */
  compact?: boolean;
}

export const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationNextProps
>(
  (
    {
      className,
      label = "Next",
      compact = false,
      size,
      variant = "ghost",
      ...props
    },
    ref
  ) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size={size}
      variant={variant}
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span className={cn(compact ? "hidden sm:inline" : "inline")}>
        {label}
      </span>
      <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </PaginationLink>
  )
);
PaginationNext.displayName = "PaginationNext";

/* =========================================================================
 * 7. ELLIPSIS: <PaginationEllipsis />
 * ========================================================================= */

export interface PaginationEllipsisProps
  extends React.ComponentPropsWithoutRef<"span"> {}

export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center text-neutral-400 dark:text-neutral-500 select-none",
      className
    )}
    {...props}
  >
    <MoreHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

/* =========================================================================
 * 8. UTILITY: generatePaginationRange
 * ========================================================================= */

/**
 * Menghitung rentang nomor halaman yang bersih dan dinamis dengan ellipsis.
 * Menghasilkan array angka dan string "ellipsis", contoh:
 * - Halaman 1 dari 12: [1, 2, 3, 4, 5, "ellipsis", 12]
 * - Halaman 6 dari 12: [1, "ellipsis", 5, 6, 7, "ellipsis", 12]
 * - Halaman 12 dari 12: [1, "ellipsis", 8, 9, 10, 11, 12]
 */
export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | "ellipsis")[] {
  const totalSlots = siblingCount * 2 + 5;

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, "ellipsis", ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

/* =========================================================================
 * 9. ALL-IN-ONE COMPONENT: <AnimatedPagination />
 * ========================================================================= */

export interface AnimatedPaginationProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  /** Jumlah total halaman */
  totalPages: number;
  /** Halaman aktif saat ini (1-indexed) */
  currentPage: number;
  /** Callback saat nomor halaman atau previous/next diklik */
  onChange: (page: number) => void;
  /** Jumlah nomor halaman pendamping di samping halaman aktif. Default: 1 */
  siblingCount?: number;
  /** Ukuran tombol paginasi */
  size?: "default" | "sm" | "lg" | "icon";
  /** Variasi visual tombol */
  variant?: "default" | "outline" | "ghost";
  /** Framer motion layoutId untuk sinkronisasi sliding active pill */
  layoutId?: string;
  /** Tampilkan tombol previous & next. Default: true */
  showControls?: boolean;
  /** Label tombol previous. Default: "Previous" */
  previousLabel?: string;
  /** Label tombol next. Default: "Next" */
  nextLabel?: string;
  /** Ringkas label navigasi menjadi ikon saja pada layar mobile */
  compact?: boolean;
  /** Custom class untuk active sliding pill background */
  activeClassName?: string;
}

export const AnimatedPagination = React.forwardRef<
  HTMLElement,
  AnimatedPaginationProps
>(
  (
    {
      totalPages,
      currentPage,
      onChange,
      siblingCount = 1,
      size = "default",
      variant = "default",
      layoutId = "animated-pagination-pill",
      showControls = true,
      previousLabel = "Previous",
      nextLabel = "Next",
      compact = false,
      activeClassName,
      className,
      ...props
    },
    ref
  ) => {
    const paginationRange = React.useMemo(
      () => generatePaginationRange(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount]
    );

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
      <Pagination
        ref={ref}
        layoutId={layoutId}
        size={size}
        className={className}
        {...props}
      >
        <PaginationContent>
          {showControls && (
            <PaginationItem>
              <PaginationPrevious
                size={size}
                variant={variant}
                label={previousLabel}
                compact={compact}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isFirstPage) onChange(currentPage - 1);
                }}
                className={isFirstPage ? "pointer-events-none opacity-40" : ""}
                aria-disabled={isFirstPage}
                tabIndex={isFirstPage ? -1 : 0}
              />
            </PaginationItem>
          )}

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isActive = pageNumber === currentPage;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  size={size}
                  variant={variant}
                  isActive={isActive}
                  activeClassName={activeClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    onChange(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {showControls && (
            <PaginationItem>
              <PaginationNext
                size={size}
                variant={variant}
                label={nextLabel}
                compact={compact}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLastPage) onChange(currentPage + 1);
                }}
                className={isLastPage ? "pointer-events-none opacity-40" : ""}
                aria-disabled={isLastPage}
                tabIndex={isLastPage ? -1 : 0}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  }
);
AnimatedPagination.displayName = "AnimatedPagination";
