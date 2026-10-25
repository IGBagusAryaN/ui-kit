import { useTranslation } from "react-i18next";
import { MarqueeDemo } from "./MarqueeDemo";

export function MarqueeAnimationPage() {
  const { t, i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.marqueeDemo.badge", "Looping Ticker")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.marqueeDemo.pageTitle", "Infinite Marquee")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.marqueeDemo.pageDesc",
            "Komponen ticker teks & badge bergerak tanpa batas (infinite looping) dengan akselerasi hardware 60fps, fitur pause-on-hover, pengaturan kecepatan, arah reversibel, serta gradient fade mask."
          )}
        </p>
      </div>

      <section className="space-y-6">
        <MarqueeDemo />
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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "default" | "draggable" | "scroll" | "counter" | "vertical" | "perspective" | "bordered" | "gradient"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Gaya visual dan jenis variasi gerak alur marquee berbasis CVA."
                    : "Visual presentation and motion architecture styling via CVA."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">items</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">any[]</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Array data item JSON terstruktur untuk rendering data-driven."
                    : "Array of structured JSON items for data-driven rendering."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">renderItem</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">(item: any, index: number) =&gt; ReactNode</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Fungsi render kustom untuk memetakan tiap item JSON menjadi elemen visual."
                    : "Custom render function mapping each JSON item to a visual element."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "none" | "xs" | "sm" | "default" | "lg" | "full"
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Dimensi ukuran vertikal padding dan container width ('none'=py-0, 'xs'=py-1)."
                    : "Vertical padding and container dimension constraint ('none'=py-0, 'xs'=py-1)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">children</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">ReactNode</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Elemen konten manual (opsional bila prop items diberikan)."
                    : "Manual child elements (optional when items prop is provided)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">orientation</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"horizontal" | "vertical"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"horizontal"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Orientasi arah jalur marquee: horizontal atau vertikal (kolom masonry)."
                    : "Scroll orientation axis: horizontal row or vertical column."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">direction</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"left" | "right" | "up" | "down"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"left" / "up"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Arah translasi pergerakan animasi ticker."
                    : "Translational animation movement direction."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">reverse</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">false</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Membalikkan arah pergerakan animasi (shorthand untuk arah berlawanan)."
                    : "Reverses the direction of movement."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">speed</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  "slow" | "normal" | "fast" | number
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">"normal"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Preset kecepatan animasi (slow: 50s, normal: 30s, fast: 15s) atau angka kustom dalam detik."
                    : "Speed preset (slow: 50s, normal: 30s, fast: 15s) or custom duration in seconds."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">pauseOnHover</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Menjeda animasi ketika kursor pointer melayang di atas marquee."
                    : "Pauses the animation when mouse pointer hovers over the track."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">fade</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Memberikan efek CSS mask gradien halus di kedua tepi container."
                    : "Applies smooth gradient fade masks at both container edges."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">gap</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number | string</td>
                <td className="px-4 py-2.5 font-mono text-xs">16</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Jarak celah antar elemen anak dalam pixel atau satuan CSS."
                    : "Gap spacing between child elements in pixels or CSS units."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">repeat</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs">2</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Jumlah duplikasi track konten untuk memastikan perputaran infinite tanpa jeda."
                    : "Number of track duplications to ensure seamless infinite looping."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class utilitas tambahan Tailwind CSS untuk container utama (cn)."
                    : "Additional Tailwind CSS classes merged via cn()."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">trackClassName</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Class kustom tambahan untuk track pembungkus konten internal."
                    : "Custom class for the internal track wrapper elements."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MarqueeAnimationPage;
