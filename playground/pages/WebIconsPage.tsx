import React from "react";
import { IconDemo } from "./IconDemo";
import { CodeBlock } from "../components/CodeBlock";

export function WebIconsPage() {
  const importUsage = `import {
  SearchIcon,
  UserIcon,
  TrashIcon,
  SettingsIcon,
  CheckCircleIcon,
  DownloadIcon
} from "@bgsaryzzz/ui/icons";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Dynamic colors using Tailwind utilities */}
      <SearchIcon size={24} className="text-blue-500" />
      <UserIcon size={24} className="text-neutral-700 dark:text-neutral-200" />
      <TrashIcon size={24} className="text-rose-500 hover:text-rose-600 cursor-pointer" />
      <SettingsIcon size={24} className="text-neutral-600 animate-spin" />
      <CheckCircleIcon size={24} className="text-emerald-500" />
      <DownloadIcon size={24} className="text-indigo-500" />
    </div>
  );
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Interactive Icon Demo Gallery (contains Header, Filters, Grid, and Toasts) */}
      <IconDemo />

      {/* Usage Code */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Import & Usage
        </h2>
        <CodeBlock code={importUsage} language="tsx" filename="IconUsage.tsx" />
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Icon Props Interface
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 font-medium border-b border-neutral-200/80 dark:border-neutral-800/80 text-xs">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">size</td>
                <td className="p-3 text-neutral-500">number | string</td>
                <td className="p-3 text-neutral-400">24</td>
                <td className="p-3 font-sans">Ukuran lebar dan tinggi tag SVG dalam pixel atau unit CSS.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">className</td>
                <td className="p-3 text-neutral-500">string</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">Class utility Tailwind untuk warna teks (<code>text-*</code>), margin, rotasi, transisi, dll.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">...props</td>
                <td className="p-3 text-neutral-500">React.SVGAttributes&lt;SVGElement&gt;</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">Mendukung seluruh event dan atribut native SVG seperti <code>onClick</code>, <code>aria-label</code>, dll.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
