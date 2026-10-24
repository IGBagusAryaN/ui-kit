import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DropdownDemo } from "./DropdownDemo";
import { CodeBlock } from "../components/CodeBlock";

export function DropdownPage() {
  const { t } = useTranslation();

  const sampleUsage = useMemo(
    () => `import { AnimatedDropdown, DropdownItem } from "@needui/ui-kit";

const items: DropdownItem[] = [
  { id: "1", label: "${t("content.dropdownDemo.data.context.items.prod.label", "Production (us-east-1)")}", badge: "${t("content.dropdownDemo.data.context.items.prod.badge", "Live")}" },
  { id: "2", label: "${t("content.dropdownDemo.data.context.items.staging.label", "Staging (eu-central-1)")}" },
  { id: "3", label: "${t("content.dropdownDemo.data.context.items.dev.label", "Development (ap-southeast-1)")}" },
];

export function App() {
  return (
    <AnimatedDropdown
      variant="context"
      items={items}
      triggerLabel="${t("content.dropdownDemo.data.context.triggerLabel", "Pilih Environment")}"
      align="center"
      onItemClick={(item) => console.log(item)}
    />
  );
}`,
    [t]
  );

  return (
    <div className="space-y-12 pb-16">
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
            "Koleksi 4 variasi dropdown modern dengan micro-animations fluida: Context & Select Menu (Floating Select dengan staggered entrance), Mega Menu (Stripe 2-column feature grid), User Profile Menu (GitHub/Linear user account & settings), dan Command Menu (Raycast keyboard-driven search menu)."
          )}
        </p>
      </div>

      <section className="space-y-6">
        <DropdownDemo />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.propsReference", "Props Reference")}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-4 py-3">{t("common.propHeader", "Prop")}</th>
                <th className="px-4 py-3">{t("common.typeHeader", "Type")}</th>
                <th className="px-4 py-3">{t("common.defaultHeader", "Default")}</th>
                <th className="px-4 py-3">{t("common.descHeader", "Description")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  variant
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  "context" | "mega" | "profile" | "command"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"context"</td>
                <td className="px-4 py-3">
                  {t(
                    "content.dropdownDemo.propsTable.variant",
                    "Pilihan 4 variasi tata letak dan animasi dropdown modern."
                  )}
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
                  {t(
                    "content.dropdownDemo.propsTable.items",
                    "Daftar elemen menu beserta properti label, icon, subtitle, badge, dan children."
                  )}
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
                  {t(
                    "content.dropdownDemo.propsTable.trigger",
                    "Elemen tombol pembuka kustom untuk varian floating dan mega."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  triggerLabel
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  "{t("content.dropdownDemo.data.context.triggerLabel", "Pilih Environment")}"
                </td>
                <td className="px-4 py-3">
                  {t(
                    "content.dropdownDemo.propsTable.triggerLabel",
                    "Teks tombol default jika prop trigger tidak disediakan."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  align
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  "left" | "right" | "center"
                </td>
                <td className="px-4 py-3 font-mono text-xs">"center"</td>
                <td className="px-4 py-3">
                  {t(
                    "content.dropdownDemo.propsTable.align",
                    "Alignment posisi popover terhadap tombol trigger."
                  )}
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
                  {t(
                    "content.dropdownDemo.propsTable.activeId",
                    "ID item yang sedang aktif (controlled active state)."
                  )}
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
                  {t(
                    "content.dropdownDemo.propsTable.onItemClick",
                    "Callback ketika salah satu item diklik oleh pengguna."
                  )}
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
                  {t(
                    "content.dropdownDemo.propsTable.profile",
                    "Data profil pengguna (name, email, avatarUrl, fallback) khusus varian profile."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200 font-semibold">
                  searchPlaceholder
                </td>
                <td className="px-4 py-3 font-mono text-xs text-amber-600 dark:text-amber-400">
                  string
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  "{t("content.dropdownDemo.data.command.searchPlaceholder", "Type a command...")}"
                </td>
                <td className="px-4 py-3">
                  {t(
                    "content.dropdownDemo.propsTable.searchPlaceholder",
                    "Placeholder input pencarian khusus untuk varian command palette."
                  )}
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
