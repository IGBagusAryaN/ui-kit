import { useTranslation } from "react-i18next";
import { MarqueeDemo } from "./MarqueeDemo";
import { CodeBlock } from "../components/CodeBlock";

export function MarqueeAnimationPage() {
  const { t } = useTranslation();

  const sampleUsage = `import { Marquee } from "@needui/ui-kit";

export function SponsorMarquee() {
  const partners = [
    { id: 1, name: "Antigravity", icon: "✦" },
    { id: 2, name: "Ballpit", icon: "●" },
    { id: 3, name: "Pixel Trail", icon: "▦" },
    { id: 4, name: "Magic Rings", icon: "◎" },
    { id: 5, name: "Splash Cursor", icon: "◈" },
  ];

  return (
    <div className="w-full py-8 bg-zinc-950">
      <Marquee direction="left" speed="normal" pauseOnHover fade gap={16}>
        {partners.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </Marquee>

      <Marquee direction="right" speed="slow" pauseOnHover fade gap={16} className="mt-4">
        {partners.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-200"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}`;

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
                  children
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  React.ReactNode
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">-</td>
                <td className="px-4 py-3 text-xs">
                  Elemen konten yang akan digulirkan secara terus-menerus (looping).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  orientation
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  "horizontal" | "vertical"
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">"horizontal"</td>
                <td className="px-4 py-3 text-xs">
                  Orientasi arah jalur marquee: horizontal atau vertikal (kolom masonry).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  direction
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  "left" | "right" | "up" | "down"
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">"left" / "up"</td>
                <td className="px-4 py-3 text-xs">
                  Arah pergerakan animasi ticker.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  speed
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  "slow" | "normal" | "fast" | number
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">"normal"</td>
                <td className="px-4 py-3 text-xs">
                  Preset kecepatan animasi atau durasi kustom dalam detik.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  pauseOnHover
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">true</td>
                <td className="px-4 py-3 text-xs">
                  Menghentikan animasi ketika pointer/mouse melayang di atas marquee.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  fade
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  boolean
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">true</td>
                <td className="px-4 py-3 text-xs">
                  Memberikan efek CSS mask gradien halus di tepi kiri & kanan container.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  gap
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  number | string
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">16</td>
                <td className="px-4 py-3 text-xs">
                  Jarak celah horizontal antar item anak (child elements).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-neutral-900 dark:text-neutral-200">
                  repeat
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                  number
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">2</td>
                <td className="px-4 py-3 text-xs">
                  Jumlah duplikasi track loop untuk memastikan perputaran mulus tanpa patah.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

