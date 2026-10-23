import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  type Transition,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { SearchIcon, CloseIcon } from "../../icons";

/**
 * 5 Variasi Animasi Interaktif SearchAnimation:
 * 1. 'morph': Morphing bulat (circle) menjadi pill panjang secara elastis dengan spring physics.
 * 2. 'slide-down': Form input meluncur turun dari atas secara vertikal dengan transisi spring.
 * 3. 'scale-fade': Pop-in zoom mengembang dari pusat dengan transisi scale & opacity.
 * 4. 'glow-pulse': Memancarkan aura cahaya neon dinamis yang berdenyut saat search bar aktif.
 * 5. 'underline-expand': Efek minimalis dengan garis bawah aksen yang memanjang secara horizontal.
 */
export type SearchAnimationVariant =
  | "morph"
  | "slide-down"
  | "scale-fade"
  | "glow-pulse"
  | "underline-expand";

export interface SearchAnimationProps
  extends Omit<HTMLMotionProps<"div">, "onChange"> {
  /** Nilai input teks (controlled mode) */
  value?: string;
  /** Nilai default awal input teks (uncontrolled mode) */
  defaultValue?: string;
  /** Callback saat nilai input berubah */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Callback saat form disubmit atau tombol search ditekan */
  onSearch?: (query: string) => void;
  /** Status ekspansi search bar (controlled mode) */
  isOpen?: boolean;
  /** Status default saat komponen dimount */
  defaultOpen?: boolean;
  /** Callback saat status ekspansi berubah */
  onToggle?: (isOpen: boolean) => void;
  /** Placeholder untuk field input */
  placeholder?: string;
  /** Tutup otomatis saat klik di luar container */
  closeOnClickOutside?: boolean;
  /** Tutup otomatis saat menekan tombol Escape */
  closeOnEscape?: boolean;
  /** Variasi gaya animasi interaktif (5 pilihan gaya berbeda) */
  animationVariant?: SearchAnimationVariant;
  /** Class styling tambahan khusus elemen input */
  inputClassName?: string;
  /** Class styling tambahan khusus icon pencarian */
  iconClassName?: string;
  /** Class styling tambahan khusus icon close/clear */
  closeButtonClassName?: string;
  /** Kustom konfigurasi animasi Framer Motion */
  transition?: Transition;
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 35,
};

const formAnimationVariants: Record<
  SearchAnimationVariant,
  {
    initial: Record<string, number | string>;
    animate: Record<string, number | string>;
    exit: Record<string, number | string>;
    transition?: Transition;
  }
> = {
  morph: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: { duration: 0.18 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { type: "spring", stiffness: 450, damping: 30 },
  },
  "scale-fade": {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  "glow-pulse": {
    initial: { opacity: 0, x: -6 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -6 },
    transition: { duration: 0.2 },
  },
  "underline-expand": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
};

export const SearchAnimation = forwardRef<HTMLDivElement, SearchAnimationProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onSearch,
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onToggle,
      placeholder = "Search...",
      closeOnClickOutside = true,
      closeOnEscape = true,
      animationVariant = "morph",
      className,
      inputClassName,
      iconClassName,
      closeButtonClassName,
      transition = defaultTransition,
      ...motionProps
    },
    ref
  ) => {
    const isControlledOpen = controlledIsOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlledOpen ? controlledIsOpen : uncontrolledOpen;

    const isControlledValue = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const query = isControlledValue ? controlledValue : uncontrolledValue;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setOpen = (nextOpen: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(nextOpen);
      }
      onToggle?.(nextOpen);
    };

    const handleExpand = () => {
      if (!isOpen) {
        setOpen(true);
      }
    };

    const handleCollapse = () => {
      setOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlledValue) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSearch?.(query);
    };

    const handleClearOrClose = (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (query.length > 0) {
        if (!isControlledValue) {
          setUncontrolledValue("");
        }
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      } else {
        handleCollapse();
      }
    };

    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 80);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          handleCollapse();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, closeOnClickOutside]);

    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleCollapse();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, closeOnEscape]);

    return (
      <motion.div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        layout
        transition={transition}
        initial={false}
        animate={{
          width: isOpen ? "100%" : "2.75rem",
          maxWidth: isOpen ? "24rem" : "2.75rem",
        }}
        onClick={handleExpand}
        className={cn(
          "relative flex h-11 items-center overflow-hidden rounded-full border border-neutral-200 bg-white/90 p-1 shadow-sm backdrop-blur transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700",
          isOpen ? "cursor-default" : "cursor-pointer",
          className
        )}
        {...motionProps}
      >
        {animationVariant === "glow-pulse" && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="pointer-events-none absolute -inset-[2px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-60 blur-[3px] -z-10"
          />
        )}

        <button
          type="button"
          aria-label="Search"
          onClick={() => {
            if (isOpen) {
              onSearch?.(query);
            } else {
              handleExpand();
            }
          }}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100",
            iconClassName
          )}
        >
          <SearchIcon size={18} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.form
              key={`search-form-${animationVariant}`}
              onSubmit={handleSubmit}
              initial={formAnimationVariants[animationVariant].initial}
              animate={formAnimationVariants[animationVariant].animate}
              exit={formAnimationVariants[animationVariant].exit}
              transition={
                formAnimationVariants[animationVariant].transition ?? {
                  duration: 0.18,
                }
              }
              className="flex flex-1 items-center pr-1"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={cn(
                  "w-full bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500",
                  inputClassName
                )}
              />

              <button
                type="button"
                aria-label={query ? "Clear search" : "Close search"}
                onClick={handleClearOrClose}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
                  closeButtonClassName
                )}
              >
                <CloseIcon size={14} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {animationVariant === "underline-expand" && (
          <motion.div
            initial={false}
            animate={{ scaleX: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
          />
        )}
      </motion.div>
    );
  }
);

SearchAnimation.displayName = "SearchAnimation";
