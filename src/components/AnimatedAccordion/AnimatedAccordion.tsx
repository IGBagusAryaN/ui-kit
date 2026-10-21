import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  SparklesIcon,
  ShieldIcon,
  ZapIcon,
  CheckIcon,
} from "../../icons";

// ============================================================================
// COMMON INTERFACES
// ============================================================================
export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface StaggeredListItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  completed?: boolean;
}

export interface StaggeredAccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  steps: StaggeredListItem[];
}

// ============================================================================
// 1. <ClassicAccordion /> (Standard Connected)
// ============================================================================
export interface ClassicAccordionProps {
  items?: AccordionItem[];
  defaultOpenId?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function ClassicAccordion({
  items: customItems,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: ClassicAccordionProps) {
  const defaultItems: AccordionItem[] = [
    {
      id: "classic-1",
      title: "How does dynamic height transition work in Framer Motion?",
      badge: "Architecture",
      content:
        "By binding initial height to 0 and target height to 'auto' within an AnimatePresence wrapper, Framer Motion automatically measures the element's DOM bounding rect prior to execution, creating a perfectly frame-timed animation without layout shudder.",
    },
    {
      id: "classic-2",
      title: "Is virtual DOM recalculation suppressed during expansion?",
      badge: "Performance",
      content:
        "Yes. The content container encapsulates GPU-accelerated CSS transforms using transform-style preserve-3d and will-change hint attributes, preventing unnecessary parent paint cycles across 120Hz displays.",
    },
    {
      id: "classic-3",
      title: "Can I customize the active state colors and borders?",
      badge: "Customization",
      content:
        "All styles rely on Tailwind CSS semantic classes. You can override active backgrounds, divider lines, and text typography via standard utility classes or by passing custom JSX into the item content payload.",
    },
  ];

  const items = customItems || defaultItems;
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId) return [defaultOpenId];
    return [items[0]?.id || "classic-1"];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={`w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white overflow-hidden divide-y divide-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 dark:divide-zinc-800 ${className}`}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150 cursor-pointer select-none ${
                isOpen
                  ? "bg-zinc-50 dark:bg-zinc-900/50"
                  : "hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30"
              }`}
            >
              <div className="flex items-center gap-3 pr-4">
                {item.icon && (
                  <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
                    {item.icon}
                  </span>
                )}
                <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80">
                    {item.badge}
                  </span>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="shrink-0 text-zinc-400 dark:text-zinc-500"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100/80 dark:border-zinc-800/40">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 2. <FloatingCardAccordion /> (Separated Islands)
// ============================================================================
export interface FloatingCardAccordionProps {
  items?: AccordionItem[];
  defaultOpenId?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function FloatingCardAccordion({
  items: customItems,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: FloatingCardAccordionProps) {
  const defaultItems: AccordionItem[] = [
    {
      id: "island-1",
      title: "Multi-Region Global Edge Replicas",
      subtitle: "Latency Optimization",
      badge: "Active",
      content:
        "Static and serverless workloads are automatically replicated across 300+ Edge Points of Presence worldwide. Intelligent anycast DNS ensures client requests hit the closest edge node with sub-25ms response latencies.",
    },
    {
      id: "island-2",
      title: "Automated Canary Rollback Guard",
      subtitle: "Deployment Safety",
      badge: "Real-Time",
      content:
        "Real-time synthetic traffic monitors error rate spikes, HTTP 5xx occurrences, and memory leaks. If anomaly thresholds exceed 0.05%, traffic instantly diverts back to the previous stable release without manual intervention.",
    },
    {
      id: "island-3",
      title: "Zero-Downtime Schema Migrations",
      subtitle: "Database Engine",
      badge: "Enterprise",
      content:
        "Expand-and-contract pattern support allows non-destructive database migrations. Dual-write sync and schema versioning keep your services fully online during massive relational table transformations.",
    },
  ];

  const items = customItems || defaultItems;
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId) return [defaultOpenId];
    return [items[0]?.id || "island-1"];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`w-full max-w-2xl space-y-3.5 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-zinc-300 bg-white shadow-md shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none"
                : "border-zinc-200/80 bg-white shadow-xs hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 shrink-0 ${
                    isOpen
                      ? "bg-emerald-500 scale-100 shadow-sm shadow-emerald-500/50"
                      : "bg-zinc-300 dark:bg-zinc-700 scale-75"
                  }`}
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                  isOpen
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                }`}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`island-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 3. <MinimalistAccordion /> (Clean Line & Plus/Minus)
// ============================================================================
export interface MinimalistAccordionProps {
  items?: AccordionItem[];
  defaultOpenId?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function MinimalistAccordion({
  items: customItems,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: MinimalistAccordionProps) {
  const defaultItems: AccordionItem[] = [
    {
      id: "minimal-1",
      title: "Declarative Gesture Handling & Spring Dynamics",
      content:
        "By expressing UI state as continuous velocity variables rather than static keyframe intervals, transitions respond dynamically to interrupted touch inputs and mouse drag trajectories without jarring visual snaps.",
    },
    {
      id: "minimal-2",
      title: "Perceptual Latency and 16ms Frame Budgets",
      content:
        "Every layout mutation is scheduled within standard browser requestAnimationFrame phases. Calculations finish under 10ms to leave adequate breathing room for layout reflow and compositor thread flushing.",
    },
    {
      id: "minimal-3",
      title: "WCAG 2.2 AAA Contrast and Keyboard Navigation",
      content:
        "Fully keyboard navigable via Tab, Enter, Spacebar, and Arrow keys. High-contrast typography guarantees legibility under sunlight and OLED low-luminance ambient lighting environments.",
    },
  ];

  const items = customItems || defaultItems;
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId) return [defaultOpenId];
    return [items[0]?.id || "minimal-1"];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={`w-full max-w-2xl divide-y divide-zinc-200 dark:divide-zinc-800 ${className}`}
    >
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const indexStr = String(index + 1).padStart(2, "0");

        return (
          <div key={item.id} className="py-2">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full group flex items-center justify-between py-4 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-3.5 pr-4">
                <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {indexStr}
                </span>
                <span className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>

              {/* Morphing Plus / Minus Glyph */}
              <div className="relative w-7 h-7 flex items-center justify-center shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                {/* Horizontal bar */}
                <motion.span
                  className="absolute h-0.5 w-3 bg-current rounded-full"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                />
                {/* Vertical bar (morphs into minus by rotating and collapsing) */}
                <motion.span
                  className="absolute h-3 w-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isOpen ? 90 : 0,
                    scaleY: isOpen ? 0 : 1,
                    opacity: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.22 }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`minimal-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-7 pr-2 pb-5 pt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. <GlassmorphismAccordion /> (Translucent Blur)
// ============================================================================
export interface GlassmorphismAccordionProps {
  items?: AccordionItem[];
  defaultOpenId?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function GlassmorphismAccordion({
  items: customItems,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: GlassmorphismAccordionProps) {
  const defaultItems: AccordionItem[] = [
    {
      id: "glass-1",
      title: "Spatial Matrix & 3D Perspective Projection",
      icon: <SparklesIcon className="w-4 h-4 text-emerald-500" />,
      badge: "GPU Accelerated",
      content:
        "Harnesses WebGL and CSS hardware transforms to calculate real-time depth offsets, depth-of-field blurs, and physics-driven spring inertia across spatial layouts.",
    },
    {
      id: "glass-2",
      title: "Zero-Knowledge Enclave Computation",
      icon: <ShieldIcon className="w-4 h-4 text-sky-500" />,
      badge: "End-to-End Encrypted",
      content:
        "Sensitive user cryptographic identities and authorization payloads remain strictly quarantined within client-side WebAssembly isolation boundaries.",
    },
    {
      id: "glass-3",
      title: "Sub-Millisecond Edge Serverless Invocation",
      icon: <ZapIcon className="w-4 h-4 text-amber-500" />,
      badge: "V8 Isolate",
      content:
        "Cold boot overhead drops to near zero thanks to pre-warmed snapshot memory isolates provisioned across geo-distributed cloud compute clusters.",
    },
  ];

  const items = customItems || defaultItems;
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId) return [defaultOpenId];
    return [items[0]?.id || "glass-1"];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`w-full max-w-2xl relative ${className}`}>
      {/* Decorative ambient gradient backdrop glow for glass illusion */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-sky-500/15 to-indigo-500/10 blur-xl opacity-75 pointer-events-none" />

      <div className="relative space-y-3">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-zinc-300/80 bg-white/80 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/70 dark:bg-zinc-900/70"
                  : "border-zinc-200/60 bg-white/50 hover:bg-white/70 hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/60"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 pr-4">
                  {item.icon && (
                    <div className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                      {item.icon}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                    {item.badge && (
                      <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {item.badge}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  className="p-1.5 rounded-xl bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50 shrink-0"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`glass-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 5. <StaggeredContentAccordion /> (Animated Internal Content)
// ============================================================================
export interface StaggeredContentAccordionProps {
  items?: StaggeredAccordionItem[];
  defaultOpenId?: string | null;
  allowMultiple?: boolean;
  className?: string;
}

export function StaggeredContentAccordion({
  items: customItems,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: StaggeredContentAccordionProps) {
  const defaultItems: StaggeredAccordionItem[] = [
    {
      id: "stagger-1",
      title: "Production Deployment Checklist",
      subtitle: "4 verification steps before shipping live",
      badge: "Release Pipeline",
      steps: [
        {
          id: "step-1",
          title: "Run Unit & E2E Test Suite",
          description: "All 142 Vitest and Playwright test specs passed (100% coverage).",
          tag: "Passed",
          completed: true,
        },
        {
          id: "step-2",
          title: "Bundle Size & Tree-Shaking Audit",
          description: "Core runtime footprint optimized to 18.4 kB gzipped.",
          tag: "18.4 kB",
          completed: true,
        },
        {
          id: "step-3",
          title: "WebAuthn Multi-Factor Authentication",
          description: "FIDO2 security token exchange verified across edge clusters.",
          tag: "Verified",
          completed: true,
        },
        {
          id: "step-4",
          title: "Anycast Edge CDN Cache Invalidation",
          description: "Purge stale surrogate keys across worldwide points of presence.",
          tag: "Ready",
          completed: false,
        },
      ],
    },
    {
      id: "stagger-2",
      title: "Zero-Trust API Webhook Pipeline",
      subtitle: "Real-time event dispatch and HMAC verification",
      badge: "Webhooks",
      steps: [
        {
          id: "step-2-1",
          title: "Generate HMAC-SHA256 Signing Secrets",
          description: "Unique per-tenant secret keys stored in hardware KMS vault.",
          tag: "Encrypted",
          completed: true,
        },
        {
          id: "step-2-2",
          title: "Configure Dead-Letter Queue (DLQ)",
          description: "Automatic exponential backoff with 5 retry intervals.",
          tag: "Enabled",
          completed: true,
        },
        {
          id: "step-2-3",
          title: "Stream Real-Time Audit Telemetry",
          description: "Payload event logs piped to Prometheus and OpenTelemetry.",
          tag: "Active",
          completed: true,
        },
      ],
    },
  ];

  const items = customItems || defaultItems;
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenId) return [defaultOpenId];
    return [items[0]?.id || "stagger-1"];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`w-full max-w-2xl space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-zinc-300 bg-white shadow-md shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none"
                : "border-zinc-200/80 bg-white shadow-xs hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="p-1.5 rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 shrink-0"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`stagger-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  {/* Staggered Children Container */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.05,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-2.5 px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800/60"
                  >
                    {item.steps.map((step) => (
                      <motion.div
                        key={step.id}
                        variants={{
                          hidden: { opacity: 0, y: 12, scale: 0.98 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 420,
                              damping: 26,
                            },
                          },
                        }}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 hover:bg-zinc-100/70 dark:border-zinc-800/80 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/60 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                              step.completed
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-transparent"
                            }`}
                          >
                            <CheckIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                              {step.title}
                            </span>
                            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {step.tag && (
                          <span
                            className={`shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-md border ${
                              step.completed
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50"
                                : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                            }`}
                          >
                            {step.tag}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// Unified Compound Export for ease of consumption
export const AnimatedAccordion = {
  Classic: ClassicAccordion,
  Floating: FloatingCardAccordion,
  Minimalist: MinimalistAccordion,
  Glassmorphism: GlassmorphismAccordion,
  Staggered: StaggeredContentAccordion,
};
