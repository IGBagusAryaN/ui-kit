import { useTranslation } from "react-i18next";
import { ButtonDemo } from "./ButtonDemo";

export function ButtonAnimationPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.buttonDemo.badge", "Animations")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.buttonDemo.pageTitle", "Button Animation")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.buttonDemo.pageDesc",
            "Arsitektur komponen tombol dengan pemisahan Visual Style (Tailwind) dan Interactive Physics (Framer Motion), mendukung 18 variasi animasi interaktif dalam satu koleksi terpadu tanpa kasta/tab pemisah, dilengkapi fitur pencarian cepat."
          )}
        </p>
      </div>

      <section className="space-y-6">
        <ButtonDemo />
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">animation</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "spring-bounce" | "press-3d" | "slide-reveal" | "magnetic-glow" | "shimmer-sweep" | "glitch-cyberpunk" | "particle-burst" | "magnetic-tilt" | "liquid-gooey" | "neon-pulse" | "ripple-echo" | "fold-out" | "swipe-fill" | "pixelate-morph" | "jelly-wobble" | "border-beam" | "flip-3d" | "elastic-snap"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"spring-bounce"</td>
                <td className="px-4 py-2.5">
                  Pilihan dari 18 interaksi fisika animasi Framer Motion tanpa kasta.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "default" | "secondary" | "outline" | "ghost" 
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  Gaya visual warna tombol berbasis CVA.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"sm" | "md" | "lg"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"md"</td>
                <td className="px-4 py-2.5">Ukuran tinggi dan padding dimensi tombol.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">isLoading</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">Menampilkan spinner loading bawaan dan mendisabel interaksi klik.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class utilitas tambahan Tailwind CSS yang digabungkan aman via cn().</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
