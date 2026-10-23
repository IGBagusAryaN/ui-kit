import { useTranslation } from "react-i18next";
import { TimelineDemo } from "./TimelineDemo";
import { CodeBlock } from "../components/CodeBlock";

export function TimelineAnimationPage() {
  const { t } = useTranslation();

  const sampleUsage = `import {
  VerticalTimeline,
  AlternatingTimeline,
  HorizontalStepper,
  AccordionTimeline,
  NeonGlowTimeline,
  TimelineItemData,
} from "@needui/ui-kit";

const milestoneData: TimelineItemData[] = [
  {
    id: 1,
    date: "Q1 2024",
    title: "System Architecture",
    subtitle: "Design Tokens & Foundation",
    description: "Built modular design system and accessible component architecture.",
    badge: "Foundation",
    badgeColor: "indigo",
    status: "completed",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    date: "Q2 2024",
    title: "Motion Physics",
    subtitle: "Fluid Framer Motion",
    status: "current",
  },
];

export function Roadmap() {
  return <VerticalTimeline items={milestoneData} animated />;
}`;

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.timelineDemo.badge", "Milestone & Progress")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.timelineDemo.pageTitle", "Animated Milestone / Timeline")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.timelineDemo.pageDesc",
            "Komponen alur linier, riwayat roadmap, dan progress milestone dengan animasi fluida Framer Motion, micro-interactions interaktif, serta dukungan Light/Dark mode penuh."
          )}
        </p>
      </div>

      <section className="space-y-6">
        <TimelineDemo />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.props", "Properti Komponen")}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50/75 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Prop</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Default</th>
                <th className="px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  items
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  TimelineItemData[]
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">required</td>
                <td className="px-4 py-3">
                  Array of timeline items with title, subtitle, date, description, badge, tags, and status.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  className
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">undefined</td>
                <td className="px-4 py-3">Additional Tailwind CSS classes for custom styling.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  animated
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">true</td>
                <td className="px-4 py-3">
                  Enables entrance spring/slide animations with Framer Motion when entering viewport.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  lineColor
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">
                  "bg-zinc-200 dark:bg-zinc-800"
                </td>
                <td className="px-4 py-3">Tailwind background classes for the connecting vertical rail.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  glowColor
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "cyan" | "violet" | "emerald" | "amber"
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">"cyan"</td>
                <td className="px-4 py-3">
                  Accent color theme for the animated laser beam and pulsating nodes in NeonGlowTimeline.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  currentStep
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  number
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">0</td>
                <td className="px-4 py-3">
                  0-indexed active step index for HorizontalStepper with animated progress bar fill.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  allowMultiple
                </td>
                <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">false</td>
                <td className="px-4 py-3">
                  Whether multiple accordion cards can remain open concurrently in AccordionTimeline.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

