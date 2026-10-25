import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownDemo } from "./DropdownDemo";

export function DropdownPage() {
  const { t, i18n } = useTranslation();
  const isId = i18n.language === "id";

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.dropdownDemo.badge", isId ? "Overlay & Navigasi" : "Overlay & Navigation")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.dropdownDemo.pageTitle", "Animated Dropdown")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.dropdownDemo.pageDesc",
            isId
              ? "Koleksi komponen dropdown animasi modern dengan arsitektur CVA & Framer Motion: Context & Select Menu, Mega Menu 2-kolom Stripe-style, User Profile Menu GitHub-style, dan Command Palette Raycast-style. Dilengkapi ref forwarding, manajemen click-outside, dan dukungan standalone modular."
              : "A modern suite of fluid animated dropdown architectures powered by CVA & Framer Motion: Context & Select Menus, Stripe-inspired 2-column Mega Menus, GitHub-style User Profile Menus, and Raycast-style Command Palettes with forwardRef, click-outside handling, and standalone modular exports."
          )}
        </p>
      </div>

      <section className="space-y-6">
        <DropdownDemo />
      </section>

      {/* Props API Reference */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Props API Reference
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2.5">Prop</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Default</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  variant
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "context" | "mega" | "profile" | "command" | "tree"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"context"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Varian tata letak visual dan gaya interaksi dropdown."
                    : "Visual layout and interaction style variant of the dropdown."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  size
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "sm" | "default" | "lg"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Dimensi ukuran proporsional teks, padding, dan trigger tombol."
                    : "Proportional sizing preset for typography, padding, and trigger button."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  items
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  DropdownItem[]
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">DEFAULT_ITEMS</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Array item menu (id, label, subtitle, icon, badge, shortcut, children, dsb)."
                    : "Array of menu items (id, label, subtitle, icon, badge, shortcut, children, etc.)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  trigger
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  ReactNode
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Elemen React kustom sebagai pemicu pembuka dropdown."
                    : "Custom trigger ReactNode to toggle the dropdown popover."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  triggerLabel
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"Pilih Opsi"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Label teks pembuka bawaan jika prop trigger kustom tidak diberikan."
                    : "Fallback button label when a custom trigger is not provided."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  align
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "left" | "right" | "center"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"center"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Posisi perataan popover terhadap elemen trigger pembuka."
                    : "Popover alignment positioning relative to the trigger element."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  activeId
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "ID item yang sedang aktif/terpilih (controlled active state)."
                    : "ID of currently active/selected item (controlled active state)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  isOpen
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  boolean
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "State keterbukaan dropdown secara eksplisit (controlled mode)."
                    : "Controlled open state of the dropdown popover."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  defaultOpen
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  boolean
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "State terbuka awal untuk mode uncontrolled."
                    : "Initial open state for uncontrolled mode."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  onOpenChange
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  (isOpen: boolean) =&gt; void
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Callback saat dropdown dibuka atau ditutup."
                    : "Callback fired when open state toggles."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  onItemClick
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  (item: DropdownItem) =&gt; void
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Callback saat salah satu item menu diklik pengguna."
                    : "Callback executed when a menu item is clicked."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  profile
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  ProfileData
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">DEFAULT_PROFILE</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Data pengguna (name, email, avatarUrl, fallback, status) khusus varian profile."
                    : "User profile payload (name, email, avatarUrl, fallback, status) for profile variant."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  searchPlaceholder
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"Cari perintah..."</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Teks placeholder pada kotak pencarian khusus varian command."
                    : "Search input placeholder text for the command palette variant."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                  className
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  string
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class Tailwind CSS tambahan yang digabungkan aman via cn()."
                    : "Custom Tailwind CSS classes merged safely via cn()."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DropdownPage;
