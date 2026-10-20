import React from "react";
import { useTranslation } from "react-i18next";
import { TreeMenuDemo } from "./TreeMenuDemo";
import { CodeBlock } from "../components/CodeBlock";

export function TreeMenuPage() {
  const { t } = useTranslation();

  const sampleUsage = `import { AnimatedTreeMenu, TreeMenuItem } from "@bgsaryzzz/ui";

const navigationItems: TreeMenuItem[] = [
  {
    id: "departments",
    label: "DEPARTMENTS",
    defaultOpen: true,
    children: [
      { id: "docs", label: "Docs" },
      { id: "programmer-dev", label: "Programmer (Dev)", badge: 70 },
      { id: "web-master", label: "Web Master", badge: 21, isActive: true },
      { id: "infra-network", label: "Infra & Network", badge: 10 },
    ],
  },
];

export function AppSidebar() {
  return <AnimatedTreeMenu items={navigationItems} />;
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title & Header */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.treeMenuDemo.badge", "Navigasi")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.treeMenuDemo.pageTitle", "Animated Tree Menu")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.treeMenuDemo.pageDesc",
            "Komponen navigasi hierarkis modern terinspirasi Notion dan Linear. Dilengkapi garis panduan vertikal, animasi expand/collapse mulus Framer Motion, rotasi chevron otomatis, badge angka, dan rendering rekursif."
          )}
        </p>
      </div>

      {/* Interactive Presentation Demo */}
      <section className="space-y-6">
        <TreeMenuDemo />
      </section>

      {/* Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" />
      </section>

      {/* Props Table */}
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
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-200 font-bold">items</td>
                <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">TreeMenuItem[]</td>
                <td className="px-4 py-3 text-neutral-400">required</td>
                <td className="px-4 py-3 font-sans">
                  Daftar item pohon hierarki (label, icon, badge, isActive, children).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-200 font-bold">activeId</td>
                <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-3 text-neutral-400">undefined</td>
                <td className="px-4 py-3 font-sans">
                  ID item yang saat ini aktif untuk state kontrol eksternal.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-200 font-bold">onItemClick</td>
                <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">(item: TreeMenuItem) =&gt; void</td>
                <td className="px-4 py-3 text-neutral-400">undefined</td>
                <td className="px-4 py-3 font-sans">
                  Callback ketika salah satu item pohon diklik.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-200 font-bold">className</td>
                <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-3 text-neutral-400">""</td>
                <td className="px-4 py-3 font-sans">
                  Class kustom Tailwind tambahan untuk pembungkus nav terluar.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TreeMenuPage;

