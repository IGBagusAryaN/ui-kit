import { Demo } from "./Demo";

export function SearchAnimationPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>Animations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          Search Animation
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Search bar interaktif dengan <strong>5 variasi animasi unik</strong> yang didukung oleh spring physics Framer Motion dan class merging Tailwind CSS.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            5 Interactive Animation Variants
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Klik masing-masing icon search di bawah untuk melihat perbedaan gaya animasinya secara langsung:
          </p>
        </div>

        <Demo />
      </section>

      {/* COMPONENT GUIDELINES STANDARD: PROPS API REFERENCE */}
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">animationVariant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "morph" | "slide-down" | "scale-fade" | "glow-pulse" | "underline-expand"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"morph"</td>
                <td className="px-4 py-2.5">
                  Pilihan variasi animasi interaktif saat search bar dibuka/ditutup.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">placeholder</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"Search..."</td>
                <td className="px-4 py-2.5">Placeholder teks pada input field pencarian.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">value</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Nilai input teks (controlled mode).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">defaultValue</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Nilai default awal input teks (uncontrolled mode).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">isOpen</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Status keterbukaan search bar secara eksplisit (controlled mode).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">defaultOpen</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">Status ekspansi awal saat komponen dimount (uncontrolled mode).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onSearch</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">(query: string) =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Callback saat form disubmit atau tombol search ditekan.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onToggle</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">(isOpen: boolean) =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Callback saat status ekspansi search bar berubah.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">closeOnClickOutside</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">Menutup input otomatis saat klik di luar area search bar.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">closeOnEscape</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">Menutup input otomatis saat tombol Escape ditekan.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class Tailwind untuk container pembungkus utama via cn().</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">inputClassName</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class utilitas Tailwind tambahan khusus elemen HTML input.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">iconClassName</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class utilitas Tailwind tambahan khusus ikon pencarian.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
