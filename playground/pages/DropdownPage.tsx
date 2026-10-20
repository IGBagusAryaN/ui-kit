import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownDemo } from "./DropdownDemo";
import { CodeBlock } from "../components/CodeBlock";

export function DropdownPage() {
  const { t } = useTranslation();

  const sampleUsage = `import { AnimatedDropdown, DropdownItem } from "@bgsaryzzz/ui";

const items: DropdownItem[] = [
  { id: "1", label: "Production", badge: "Live" },
  { id: "2", label: "Staging" },
  { id: "3", label: "Development" },
];

export function App() {
  return (
    <AnimatedDropdown
      variant="floating"
      items={items}
      triggerLabel="Pilih Environment"
      onItemClick={(item) => console.log(item)}
    />
  );
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title & Header */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.dropdownDemo.badge", "Overlay & Navigasi")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.dropdownDemo.pageTitle", "Animated Dropdown")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.dropdownDemo.pageDesc",
            "Komponen multi-varian dropdown modern dengan 5 variasi animasi: 1. Tree (Nested Explorer), 2. Context (Floating Select dengan staggered entrance), 3. Mega (Stripe 2-column grid dengan spring physics), 4. Profile (GitHub user menu dengan destructive logout), dan 5. Command (Raycast search menu dengan keyboard shortcuts)."
          )}
        </p>
      </div>

      {/* Interactive Presentation Demo */}
      <section className="space-y-6">
        <DropdownDemo />
      </section>

      {/* Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" />
      </section>

      {/* Props Reference Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Props Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  variant
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  "tree" | "context" | "mega" | "profile" | "command"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"tree"</td>
                <td className="px-4 py-3">
                  Pilihan 5 variasi tata letak dan animasi dropdown modern.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  items
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  DropdownItem[]
                </td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
                <td className="px-4 py-3">
                  Daftar elemen menu beserta properti label, icon, subtitle, badge, dan children.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  trigger
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  ReactNode
                </td>
                <td className="px-4 py-3 font-mono text-xs">undefined</td>
                <td className="px-4 py-3">
                  Elemen tombol pembuka kustom untuk varian floating dan mega.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  triggerLabel
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs">"Pilih Opsi"</td>
                <td className="px-4 py-3">
                  Teks tombol default jika prop trigger tidak disediakan.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  align
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  "left" | "right" | "center"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"left"</td>
                <td className="px-4 py-3">
                  Alignment posisi popover terhadap tombol trigger.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  activeId
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs">undefined</td>
                <td className="px-4 py-3">
                  ID item yang sedang aktif (controlled active state).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  onItemClick
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  (item: DropdownItem) =&gt; void
                </td>
                <td className="px-4 py-3 font-mono text-xs">undefined</td>
                <td className="px-4 py-3">
                  Callback ketika salah satu item diklik oleh pengguna.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  profile
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  ProfileData
                </td>
                <td className="px-4 py-3 font-mono text-xs">undefined</td>
                <td className="px-4 py-3">
                  Data profil pengguna (name, email, avatarUrl, fallback) khusus varian profile.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  searchPlaceholder
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs">"Type a command..."</td>
                <td className="px-4 py-3">
                  Placeholder input pencarian khusus untuk varian command palette.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DropdownPage;

