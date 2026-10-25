import React, {
  useState,
  useEffect,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
} from "../../icons";

// ============================================================================
// CVA VARIANTS
// ============================================================================

export const timelineVariants = cva("w-full select-none", {
  variants: {
    variant: {
      "svg-draw": "timeline-svg-draw",
      "glowing-particle": "timeline-glowing-particle",
      accordion: "timeline-accordion",
      stepper: "timeline-stepper",
      alternating: "timeline-alternating",
    },
    size: {
      sm: "max-w-md mx-auto",
      md: "max-w-2xl mx-auto",
      lg: "max-w-4xl mx-auto",
      full: "w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "svg-draw",
    size: "md",
  },
});

// ============================================================================
// DATA MODELS & TYPES
// ============================================================================

export interface SVGTimelineItem {
  id: string | number;
  phase?: string;
  quarter?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  status?: "completed" | "in-progress" | "pending";
  tags?: string[];
}

export interface TelemetryNodeItem {
  id: string | number;
  code?: string;
  name: string;
  role?: string;
  status?: string;
  latency?: string;
  bandwidth?: string;
  encryption?: string;
}

export interface ExpandableStepItem {
  id: number | string;
  title: string;
  subtitle?: string;
  status?: "completed" | "active" | "pending";
  description?: string;
  checklist?: string[];
}

export interface HorizontalPhaseItem {
  id: number | string;
  label: string;
  tagline?: string;
  details?: string;
  deliverables?: string[];
}

export interface AlternateScrollItem {
  year: string | number;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  metrics?: string;
}

// ============================================================================
// DEFAULT SAMPLE DATA
// ============================================================================

export const DEFAULT_SVG_MILESTONES: SVGTimelineItem[] = [
  {
    id: "svg-1",
    phase: "Phase 01",
    quarter: "Q1 2025",
    badge: "Foundation Ready",
    title: "System Architecture & Foundation",
    subtitle: "Atomic Tokens & Layout Engines",
    description:
      "Drafted comprehensive design token specifications, semantic color mapping, and headless accessible primitives compliant with WCAG 2.2 AA standards.",
    tags: ["Design Tokens", "Accessibility", "TypeScript"],
    status: "completed",
  },
  {
    id: "svg-2",
    phase: "Phase 02",
    quarter: "Q2 2025",
    badge: "Physics Shipped",
    title: "Fluid Micro-Interactions Engine",
    subtitle: "Framer Motion Shared Layouts",
    description:
      "Engineered layoutId dynamics, responsive spring calibrations, and zero-jank GPU composite animations across modal, dropdown, and tab components.",
    tags: ["Framer Motion", "Spring Physics", "Micro-Interactions"],
    status: "completed",
  },
  {
    id: "svg-3",
    phase: "Phase 03",
    quarter: "Q3 2025",
    badge: "In Active Build",
    title: "Autonomous Agent Orchestration",
    subtitle: "Adaptive Layout Rebalancing",
    description:
      "Embedding client-side contextual AI assistance to recommend atomic theme variations, contrast recalculations, and accessibility score audits.",
    tags: ["AI Agents", "Self-Healing UI", "Contrast Audit"],
    status: "in-progress",
  },
  {
    id: "svg-4",
    phase: "Phase 04",
    quarter: "Q4 2025",
    badge: "Roadmap Scheduled",
    title: "Global Edge Sync & Distribution",
    subtitle: "Zero-Latency ESM Mesh",
    description:
      "Deploying distributed multi-region edge caches to stream pre-compiled component trees with zero hydration overhead to global users.",
    tags: ["Edge CDN", "Zero-Hydration", "WASM Mesh"],
    status: "pending",
  },
];

export const DEFAULT_TELEMETRY_NODES: TelemetryNodeItem[] = [
  {
    id: "node-1",
    code: "EDGE-SG01",
    name: "APAC Ingestion Gateway",
    role: "Receiving sensory telemetry data and running initial cryptographic envelope decapsulation.",
    latency: "0.82ms",
    bandwidth: "18.4 GB/s",
    encryption: "TLS 1.3 / Kyber-768",
    status: "Synchronized",
  },
  {
    id: "node-2",
    code: "CORE-FRA02",
    name: "European Central Consensus",
    role: "Byzantine fault-tolerant validation cluster processing global distributed state transitions.",
    latency: "1.45ms",
    bandwidth: "42.1 GB/s",
    encryption: "ECDSA + BLS-12",
    status: "Synchronized",
  },
  {
    id: "node-3",
    code: "NEO-US03",
    name: "North America Inference Engine",
    role: "Real-time transformer neural inference validating semantic payload legitimacy in sub-millisecond.",
    latency: "2.10ms",
    bandwidth: "28.9 GB/s",
    encryption: "Zero-Knowledge SNARK",
    status: "Active Stream",
  },
  {
    id: "node-4",
    code: "VAULT-TKO04",
    name: "Immutable Archival Ledger",
    role: "Permanent distributed append-only storage replicated across 12 sovereign secure enclaves.",
    latency: "0.95ms",
    bandwidth: "12.0 GB/s",
    encryption: "AES-256-GCM / Post-Quantum",
    status: "Synchronized",
  },
];

export const DEFAULT_STEP_WORKFLOW: ExpandableStepItem[] = [
  {
    id: 1,
    title: "Identity Verification & Enclave",
    subtitle: "Biometric & KYC Authentication",
    status: "completed",
    description:
      "Submit government credential tokens and facial liveness verification. Real-time neural matching completed in 320ms.",
    checklist: [
      "Passport cryptographic checksum verified",
      "3D depth facial mesh matched",
      "Zero-knowledge identity token generated",
    ],
  },
  {
    id: 2,
    title: "Hardware Security Key Pairing",
    subtitle: "FIDO2 / WebAuthn Physical Vault",
    status: "active",
    description:
      "Touch your physical security key (YubiKey or Titan) to bind hardware challenge signatures to your cryptographic profile.",
    checklist: [
      "Hardware enclave challenge broadcasted",
      "Biometric PIN validated on hardware token",
      "Backup recovery seed phrase minted to vault",
    ],
  },
  {
    id: 3,
    title: "Cluster Provisioning & Mesh",
    subtitle: "Kubernetes 1.30 & Cilium eBPF",
    status: "pending",
    description:
      "Spinning up worker node pools with autoscaling, mutual TLS mesh proxying, and automated TLS certificate rotations.",
    checklist: [
      "Cilium eBPF network policies enforced",
      "Ingress controllers bound to static IPs",
      "Prometheus & Grafana monitors subscribed",
    ],
  },
  {
    id: 4,
    title: "Production Traffic Cutover",
    subtitle: "Blue-Green Canary Routing",
    status: "pending",
    description:
      "Gradual weighted DNS traffic shifting from 5% canary testing to 100% stable global routing with real-time error budget tracking.",
    checklist: [
      "Health probes verified across 14 edge regions",
      "Error budget rate monitored at < 0.001%",
      "Legacy cluster drained and decommissioned",
    ],
  },
];

export const DEFAULT_HORIZONTAL_PHASES: HorizontalPhaseItem[] = [
  {
    id: 1,
    label: "Ideation",
    tagline: "Product Discovery",
    details:
      "Market validation, user persona interviews, and technical architecture feasibility study.",
    deliverables: ["Product Specs", "Competitive Matrix", "User Stories"],
  },
  {
    id: 2,
    label: "Prototypes",
    tagline: "Figma & Framer",
    details:
      "Interactive design systems, responsive layout guidelines, and WCAG accessibility audit.",
    deliverables: ["UI Token Kit", "Clickable Prototypes", "Design Handoff"],
  },
  {
    id: 3,
    label: "Core Audit",
    tagline: "Security & Fuzzing",
    details:
      "Static code analysis, penetration vulnerability tests, and SOC2 compliance validation.",
    deliverables: ["CVE Scan Clean", "Pen-Test Signoff", "GDPR Verification"],
  },
  {
    id: 4,
    label: "Deploy",
    tagline: "Canary Rollout",
    details:
      "Zero-downtime blue-green DNS cutovers across 18 multi-cloud distributed edge clusters.",
    deliverables: [
      "DNS Traffic Swapped",
      "Edge Caches Primed",
      "Latency < 12ms",
    ],
  },
  {
    id: 5,
    label: "Scale",
    tagline: "Autonomous Grid",
    details:
      "Self-healing Kubernetes worker pods with AI-driven dynamic cache warming and anomaly alerts.",
    deliverables: ["Auto-Scaling Online", "Global CDN Synced", "SLO: 99.999%"],
  },
];

export const DEFAULT_ZIGZAG_EVENTS: AlternateScrollItem[] = [
  {
    year: "2023",
    badge: "Genesis Engine",
    title: "Pioneering Motion Foundations",
    subtitle: "Pure Framer Motion Calibration",
    description:
      "Established foundational principles uniting atomic Tailwind styles with hardware-accelerated Framer Motion physics. Overhauled traditional CSS keyframes.",
    metrics: "Zero-Jank 60FPS",
  },
  {
    year: "2024",
    badge: "Modular Scale",
    title: "CVA Architecture Expansion",
    subtitle: "Enterprise Component Suite",
    description:
      "Transitioned entire library to class-variance-authority paradigms. Introduced headless composability and accessible ARIA standards.",
    metrics: "100% WCAG 2.2 AA",
  },
  {
    year: "2025",
    badge: "Interactive Ecosystem",
    title: "Next-Gen Component Primitives",
    subtitle: "Gesture Physics & Biometrics",
    description:
      "Launched advanced gesture-driven controls including Cupertino tumblers, fluid multi-step wizards, and automated timers.",
    metrics: "320+ Modular Assets",
  },
  {
    year: "2026",
    badge: "Autonomous Edge",
    title: "Agentic AI Micro-Frontends",
    subtitle: "Autonomous Self-Healing",
    description:
      "Integrated autonomous AI agent swarms capable of continuous performance self-healing, automated layout restructuring, and dynamic cache warming.",
    metrics: "Sub-5ms Global P99",
  },
];

// ============================================================================
// 1. SVG DRAW TIMELINE
// ============================================================================

export interface SVGDrawTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: SVGTimelineItem[];
  showRedrawButton?: boolean;
  strokeColor?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export const SVGDrawTimeline = forwardRef<HTMLDivElement, SVGDrawTimelineProps>(
  (
    {
      items = DEFAULT_SVG_MILESTONES,
      showRedrawButton = true,
      strokeColor = "text-indigo-600 dark:text-indigo-400",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const [redrawKey, setRedrawKey] = useState(0);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-4",
          size === "sm" && "max-w-md mx-auto",
          size === "md" && "max-w-2xl mx-auto",
          size === "lg" && "max-w-4xl mx-auto",
          size === "full" && "max-w-full",
          className
        )}
        {...props}
      >
        {showRedrawButton && (
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Path Drawing Engine
              </span>
            </div>
            <button
              type="button"
              onClick={() => setRedrawKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
            >
              <RefreshCwIcon size={12} />
              <span>Redraw Vector</span>
            </button>
          </div>
        )}

        <div key={redrawKey} className="relative pl-7 sm:pl-9 py-2">
          <svg className="absolute left-[13px] sm:left-[17px] top-6 bottom-6 w-[3px] h-[calc(100%-48px)] overflow-visible">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-800"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="currentColor"
              className={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="space-y-6 sm:space-y-8">
            {items.map((item, index) => {
              const isCompleted = item.status === "completed";
              const isInProgress = item.status === "in-progress";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.2 + 0.1 }}
                  className="relative group"
                >
                  <div
                    className={cn(
                      "absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white dark:bg-zinc-950",
                      isCompleted
                        ? "border-emerald-500 text-emerald-500 shadow-sm shadow-emerald-500/20"
                        : isInProgress
                        ? "border-indigo-600 text-indigo-600 shadow-md shadow-indigo-600/30 ring-4 ring-indigo-500/10"
                        : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon size={12} strokeWidth={3} />
                    ) : isInProgress ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    )}
                  </div>

                  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.phase && (
                          <span className="text-[11px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                            {item.phase}
                          </span>
                        )}
                        {item.phase && item.quarter && (
                          <span className="text-zinc-300 dark:text-zinc-700">
                            •
                          </span>
                        )}
                        {item.quarter && (
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            {item.quarter}
                          </span>
                        )}
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border",
                            isCompleted
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-300"
                              : isInProgress
                              ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-900 dark:text-indigo-300 animate-pulse"
                              : "bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
SVGDrawTimeline.displayName = "SVGDrawTimeline";

// ============================================================================
// 2. GLOWING PARTICLE TIMELINE
// ============================================================================

export interface GlowingParticleTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nodes?: TelemetryNodeItem[];
  autoPlay?: boolean;
  defaultSpeed?: number;
  size?: "sm" | "md" | "lg" | "full";
  onNodeClick?: (index: number, node: TelemetryNodeItem) => void;
}

export const GlowingParticleTimeline = forwardRef<
  HTMLDivElement,
  GlowingParticleTimelineProps
>(
  (
    {
      nodes = DEFAULT_TELEMETRY_NODES,
      autoPlay = true,
      defaultSpeed = 1,
      size = "md",
      onNodeClick,
      className,
      ...props
    },
    ref
  ) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [speed, setSpeed] = useState<number>(defaultSpeed);
    const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
    const [progressY, setProgressY] = useState(0);

    useEffect(() => {
      if (!isPlaying) return;

      const intervalTime = 20;
      const step = 0.4 * speed;

      const interval = setInterval(() => {
        setProgressY((prev) => {
          const next = prev + step;
          if (next >= 100) {
            return 0;
          }
          return next;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }, [isPlaying, speed]);

    useEffect(() => {
      const nodeIndex = Math.min(
        Math.floor((progressY / 100) * nodes.length),
        nodes.length - 1
      );
      setActiveNodeIndex(nodeIndex);
    }, [progressY, nodes.length]);

    const jumpToNode = (index: number) => {
      setActiveNodeIndex(index);
      setProgressY((index / (nodes.length - 1)) * 95);
      onNodeClick?.(index, nodes[index]);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-5",
          size === "sm" && "max-w-md mx-auto",
          size === "md" && "max-w-2xl mx-auto",
          size === "lg" && "max-w-4xl mx-auto",
          size === "full" && "max-w-full",
          className
        )}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 cursor-pointer"
            >
              {isPlaying ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
              <span>{isPlaying ? "Pause Stream" : "Resume Stream"}</span>
            </button>
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
              Pos: {Math.round(progressY)}%
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-800/80 p-0.5 rounded-lg text-xs font-mono">
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer",
                  speed === s
                    ? "bg-cyan-500 text-zinc-950 font-bold shadow-xs"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="relative pl-7 sm:pl-9 py-2">
          <div className="absolute left-[13px] sm:left-[17px] top-5 bottom-5 w-[2px] bg-zinc-200 dark:bg-zinc-800">
            <motion.div
              style={{ top: `${progressY}%` }}
              className="absolute -left-[5px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_5px_rgba(34,211,238,0.9)] -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-t from-cyan-400 to-transparent opacity-80" />
            </motion.div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {nodes.map((node, index) => {
              const isCurrentlyActive = activeNodeIndex === index;

              return (
                <div
                  key={node.id}
                  onClick={() => jumpToNode(index)}
                  className="relative cursor-pointer group"
                >
                  <div
                    className={cn(
                      "absolute -left-[27px] sm:-left-[35px] top-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white dark:bg-zinc-950 z-10",
                      isCurrentlyActive
                        ? "border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] scale-110"
                        : "border-zinc-300 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-400"
                    )}
                  >
                    <span className="text-[10px] font-mono font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl border p-4 sm:p-5 transition-all duration-300 space-y-2",
                      isCurrentlyActive
                        ? "border-cyan-500/60 bg-cyan-950/10 dark:bg-cyan-950/20 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/20"
                        : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      {node.code && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                          {node.code}
                        </span>
                      )}
                      {node.status && (
                        <span
                          className={cn(
                            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full",
                            isCurrentlyActive
                              ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                              : "text-zinc-400"
                          )}
                        >
                          {node.status}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {node.name}
                    </h4>

                    {node.role && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {node.role}
                      </p>
                    )}

                    {(node.latency || node.bandwidth || node.encryption) && (
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                        {node.latency && (
                          <div>
                            <span className="text-[9px] text-zinc-400 font-mono block">
                              Latency
                            </span>
                            <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                              {node.latency}
                            </p>
                          </div>
                        )}
                        {node.bandwidth && (
                          <div>
                            <span className="text-[9px] text-zinc-400 font-mono block">
                              Bandwidth
                            </span>
                            <p className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                              {node.bandwidth}
                            </p>
                          </div>
                        )}
                        {node.encryption && (
                          <div>
                            <span className="text-[9px] text-zinc-400 font-mono block">
                              Crypto
                            </span>
                            <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">
                              {node.encryption}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
GlowingParticleTimeline.displayName = "GlowingParticleTimeline";

// ============================================================================
// 3. EXPANDABLE STEP TIMELINE (ACCORDION MILESTONE)
// ============================================================================

export interface ExpandableStepTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps?: ExpandableStepItem[];
  defaultStep?: number;
  activeStep?: number;
  onStepChange?: (stepId: number) => void;
  size?: "sm" | "md" | "lg" | "full";
}

export const ExpandableStepTimeline = forwardRef<
  HTMLDivElement,
  ExpandableStepTimelineProps
>(
  (
    {
      steps = DEFAULT_STEP_WORKFLOW,
      defaultStep = 2,
      activeStep: controlledActiveStep,
      onStepChange,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledActiveStep !== undefined;
    const [internalStep, setInternalStep] = useState<number>(defaultStep);
    const activeStepId = isControlled ? controlledActiveStep : internalStep;

    const handleSelectStep = (id: number) => {
      if (!isControlled) setInternalStep(id);
      onStepChange?.(id);
    };

    const handleNext = () => {
      const next = Math.min(activeStepId + 1, steps.length);
      handleSelectStep(next);
    };

    const handlePrev = () => {
      const prev = Math.max(activeStepId - 1, 1);
      handleSelectStep(prev);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-5",
          size === "sm" && "max-w-md mx-auto",
          size === "md" && "max-w-2xl mx-auto",
          size === "lg" && "max-w-4xl mx-auto",
          size === "full" && "max-w-full",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
          <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
            Step {activeStepId} of {steps.length} Active
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeStepId === 1}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <ChevronLeftIcon size={14} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeStepId === steps.length}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <ChevronRightIcon size={14} />
            </button>
          </div>
        </div>

        <div className="relative pl-7 sm:pl-9 py-2">
          <div className="absolute left-[13px] sm:left-[17px] top-5 bottom-5 w-[2px] bg-zinc-200 dark:bg-zinc-800" />

          <div className="space-y-4">
            {steps.map((step) => {
              const numId = typeof step.id === "number" ? step.id : Number(step.id);
              const isActive = numId === activeStepId;
              const isCompleted = numId < activeStepId;

              return (
                <div key={step.id} className="relative group">
                  <motion.button
                    type="button"
                    layout
                    onClick={() => handleSelectStep(numId)}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 450, damping: 26 }}
                    className={cn(
                      "absolute -left-[27px] sm:-left-[35px] top-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-colors z-10 bg-white dark:bg-zinc-950 cursor-pointer",
                      isActive
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : isCompleted
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : "border-zinc-300 dark:border-zinc-700 text-zinc-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon size={12} strokeWidth={3} />
                    ) : (
                      step.id
                    )}
                  </motion.button>

                  <div
                    className={cn(
                      "rounded-2xl border transition-all duration-300 overflow-hidden",
                      isActive
                        ? "border-indigo-500/60 bg-white dark:bg-zinc-900 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20"
                        : "border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectStep(numId)}
                      className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left select-none cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-400">
                            0{step.id}
                          </span>
                          <h4
                            className={cn(
                              "text-sm sm:text-base font-bold transition-colors",
                              isActive
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-zinc-900 dark:text-zinc-100"
                            )}
                          >
                            {step.title}
                          </h4>
                        </div>
                        {step.subtitle && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {step.subtitle}
                          </p>
                        )}
                      </div>

                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0",
                          isActive
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                            : isCompleted
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "text-zinc-400"
                        )}
                      >
                        {isActive
                          ? "In Progress"
                          : isCompleted
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 sm:p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
                            {step.description && (
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {step.description}
                              </p>
                            )}

                            {step.checklist && step.checklist.length > 0 && (
                              <div className="space-y-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80">
                                <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block mb-1">
                                  Verification Checklist
                                </span>
                                {step.checklist.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                                  >
                                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                      <CheckIcon size={10} strokeWidth={3} />
                                    </span>
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
ExpandableStepTimeline.displayName = "ExpandableStepTimeline";

// ============================================================================
// 4. HORIZONTAL ELASTIC TIMELINE (PROGRESS STEPPER)
// ============================================================================

export interface HorizontalElasticTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  phases?: HorizontalPhaseItem[];
  defaultStep?: number;
  activeStep?: number;
  onStepChange?: (stepIndex: number) => void;
  size?: "sm" | "md" | "lg" | "full";
}

export const HorizontalElasticTimeline = forwardRef<
  HTMLDivElement,
  HorizontalElasticTimelineProps
>(
  (
    {
      phases = DEFAULT_HORIZONTAL_PHASES,
      defaultStep = 2,
      activeStep: controlledActiveStep,
      onStepChange,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledActiveStep !== undefined;
    const [internalStep, setInternalStep] = useState<number>(defaultStep);
    const activeStep = isControlled ? controlledActiveStep : internalStep;

    const handleSelectStep = (index: number) => {
      if (!isControlled) setInternalStep(index);
      onStepChange?.(index);
    };

    const currentPhase = phases[activeStep] || phases[0];
    const progressPercent = (activeStep / Math.max(1, phases.length - 1)) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-6",
          size === "sm" && "max-w-md mx-auto",
          size === "md" && "max-w-2xl mx-auto",
          size === "lg" && "max-w-4xl mx-auto",
          size === "full" && "max-w-full",
          className
        )}
        {...props}
      >
        <div className="w-full overflow-x-auto no-scrollbar py-3">
          <div className="relative min-w-[340px] px-4 sm:px-6">
            <div className="relative flex items-start justify-between">
              <div className="absolute left-[18px] right-[18px] top-[18px] -translate-y-1/2 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

              <div className="absolute left-[18px] right-[18px] top-[18px] -translate-y-1/2 h-1 overflow-hidden pointer-events-none rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              </div>

              {phases.map((phase, index) => {
                const isPassed = index < activeStep;
                const isCurrent = index === activeStep;

                return (
                  <div key={phase.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleSelectStep(index)}
                      className="relative z-10 focus:outline-hidden group cursor-pointer"
                    >
                      {isCurrent && (
                        <motion.div
                          animate={{
                            scale: [1, 1.45, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full bg-indigo-500/30 -z-10"
                        />
                      )}

                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.15 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 25,
                        }}
                        className={cn(
                          "w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors bg-white dark:bg-zinc-950",
                          isPassed
                            ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                            : isCurrent
                            ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-400"
                        )}
                      >
                        {isPassed ? (
                          <CheckIcon size={14} strokeWidth={3} />
                        ) : (
                          index + 1
                        )}
                      </motion.div>
                    </button>

                    <div className="mt-2 text-center select-none">
                      <span
                        className={cn(
                          "text-xs font-bold block transition-colors",
                          isCurrent
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-zinc-600 dark:text-zinc-300"
                        )}
                      >
                        {phase.label}
                      </span>
                      {phase.tagline && (
                        <span className="text-[10px] text-zinc-400 font-mono hidden sm:block">
                          {phase.tagline}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {currentPhase && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 sm:p-6 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    Phase 0{currentPhase.id}
                  </span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {currentPhase.label}: {currentPhase.tagline}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60">
                  Step {activeStep + 1} of {phases.length}
                </span>
              </div>

              {currentPhase.details && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {currentPhase.details}
                </p>
              )}

              {currentPhase.deliverables &&
                currentPhase.deliverables.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-2">
                      Key Deliverables
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentPhase.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }
);
HorizontalElasticTimeline.displayName = "HorizontalElasticTimeline";

// ============================================================================
// 5. ALTERNATE SCROLL TIMELINE
// ============================================================================

export interface AlternateScrollTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  events?: AlternateScrollItem[];
  size?: "sm" | "md" | "lg" | "full";
}

export const AlternateScrollTimeline = forwardRef<
  HTMLDivElement,
  AlternateScrollTimelineProps
>(
  (
    {
      events = DEFAULT_ZIGZAG_EVENTS,
      size = "lg",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full space-y-4",
          size === "sm" && "max-w-md mx-auto",
          size === "md" && "max-w-2xl mx-auto",
          size === "lg" && "max-w-3xl mx-auto",
          size === "full" && "max-w-full",
          className
        )}
        {...props}
      >
        <div className="relative py-4">
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[2px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={cn(
                    "relative flex flex-col sm:flex-row items-start",
                    isLeft ? "sm:flex-row-reverse" : "sm:flex-row"
                  )}
                >
                  <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-600 flex items-center justify-center z-10 shadow-md shadow-indigo-600/20">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -35 : 35, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={cn(
                      "w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0",
                      isLeft ? "sm:pr-0" : "sm:pl-0"
                    )}
                  >
                    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-4 sm:p-5 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-700 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                          {event.year}
                        </span>
                        {event.badge && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60">
                            {event.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {event.title}
                        </h4>
                        {event.subtitle && (
                          <p className="text-xs text-zinc-500 font-medium">
                            {event.subtitle}
                          </p>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      {event.metrics && (
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
                          <span>Telemetry Benchmark:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {event.metrics}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
AlternateScrollTimeline.displayName = "AlternateScrollTimeline";

// ============================================================================
// 6. MASTER UNIFIED ANIMATED TIMELINE COMPONENT (CVA)
// ============================================================================

export interface AnimatedTimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  svgItems?: SVGTimelineItem[];
  telemetryNodes?: TelemetryNodeItem[];
  stepWorkflow?: ExpandableStepItem[];
  horizontalPhases?: HorizontalPhaseItem[];
  scrollEvents?: AlternateScrollItem[];
}

export const AnimatedTimeline = forwardRef<HTMLDivElement, AnimatedTimelineProps>(
  (
    {
      variant = "svg-draw",
      size = "md",
      className,
      svgItems,
      telemetryNodes,
      stepWorkflow,
      horizontalPhases,
      scrollEvents,
      ...props
    },
    ref
  ) => {
    const rootClass = cn(timelineVariants({ variant, size }), className);

    if (variant === "glowing-particle") {
      return (
        <GlowingParticleTimeline
          ref={ref}
          nodes={telemetryNodes}
          size={size as any}
          className={rootClass}
          {...props}
        />
      );
    }

    if (variant === "accordion") {
      return (
        <ExpandableStepTimeline
          ref={ref}
          steps={stepWorkflow}
          size={size as any}
          className={rootClass}
          {...props}
        />
      );
    }

    if (variant === "stepper") {
      return (
        <HorizontalElasticTimeline
          ref={ref}
          phases={horizontalPhases}
          size={size as any}
          className={rootClass}
          {...props}
        />
      );
    }

    if (variant === "alternating") {
      return (
        <AlternateScrollTimeline
          ref={ref}
          events={scrollEvents}
          size={size as any}
          className={rootClass}
          {...props}
        />
      );
    }

    return (
      <SVGDrawTimeline
        ref={ref}
        items={svgItems}
        size={size as any}
        className={rootClass}
        {...props}
      />
    );
  }
);
AnimatedTimeline.displayName = "AnimatedTimeline";

// ============================================================================
// BACKWARDS-COMPATIBILITY ALIASES
// ============================================================================

export const VerticalTimeline = SVGDrawTimeline;
export const AlternatingTimeline = AlternateScrollTimeline;
export const HorizontalStepper = HorizontalElasticTimeline;
export const AccordionTimeline = ExpandableStepTimeline;
export const NeonGlowTimeline = GlowingParticleTimeline;
export const Timeline = AnimatedTimeline;
