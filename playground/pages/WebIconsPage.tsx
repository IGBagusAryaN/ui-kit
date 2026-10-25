import React from "react";
import { useTranslation } from "react-i18next";
import { IconDemo } from "./IconDemo";

export function WebIconsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-16">
      <IconDemo />

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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number | string</td>
                <td className="px-4 py-2.5 font-mono text-xs">24</td>
                <td className="px-4 py-2.5">
                  {t(
                    "content.iconDemo.propsTable.sizeDesc",
                    "Lebar dan tinggi elemen SVG dalam piksel atau satuan CSS."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">strokeWidth</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number | string</td>
                <td className="px-4 py-2.5 font-mono text-xs">2</td>
                <td className="px-4 py-2.5">
                  {t(
                    "content.iconDemo.propsTable.strokeDesc",
                    "Ketebalan garis outline SVG (misal 1.5, 2, 2.5)."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {t(
                    "content.iconDemo.propsTable.classNameDesc",
                    "Class utilitas Tailwind CSS untuk warna teks (text-*), ukuran, transisi, dsb via cn()."
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">...props</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">React.SVGAttributes&lt;SVGElement&gt;</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {t(
                    "content.iconDemo.propsTable.propsDesc",
                    "Mendukung seluruh atribut native SVG HTML dan event handler (onClick, aria-hidden, dsb)."
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WebIconsPage;
