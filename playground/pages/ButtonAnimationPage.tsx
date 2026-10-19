import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonDemo } from "./ButtonDemo";
import { CodeBlock } from "../components/CodeBlock";

export function ButtonAnimationPage() {
  const { t } = useTranslation();
  const sampleUsage = `import { ButtonAnimation } from "@bgsaryzzz/ui";

export function ButtonGallery() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 1. Spring Bounce */}
      <ButtonAnimation animation="spring-bounce">
        Spring Bounce
      </ButtonAnimation>

      {/* 6. Glitch Cyberpunk */}
      <ButtonAnimation animation="glitch-cyberpunk">
        CYBERPUNK_SYS
      </ButtonAnimation>

      {/* 7. Particle Burst */}
      <ButtonAnimation animation="particle-burst" onClick={() => console.log("Boom!")}>
        Click for Boom! 💥
      </ButtonAnimation>

      {/* 8. Magnetic 3D Tilt */}
      <ButtonAnimation animation="magnetic-tilt">
        Magnetic 3D Tilt
      </ButtonAnimation>

      {/* 10. Neon Pulse */}
      <ButtonAnimation animation="neon-pulse">
        Neon Pulse
      </ButtonAnimation>

      {/* 11. Ripple Echo */}
      <ButtonAnimation animation="ripple-echo">
        Click Ripple 🌊
      </ButtonAnimation>

      {/* 12. Fold Out */}
      <ButtonAnimation animation="fold-out">
        Unfold 3D
      </ButtonAnimation>

      {/* 13. Pixelate Morph */}
      <ButtonAnimation animation="pixelate-morph">
        Pixelate Jitter
      </ButtonAnimation>

      {/* 14. Border Beam */}
      <ButtonAnimation animation="border-beam">
        Border Beam
      </ButtonAnimation>

      {/* 15. Elastic Snap */}
      <ButtonAnimation animation="elastic-snap">
        Snap Rebound
      </ButtonAnimation>
    </div>
  );
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title */}
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

      {/* All 18 Button Animations in 2-Column Grid */}
      <section className="space-y-6">
        <ButtonDemo />
      </section>

      {/* Usage Code */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Usage Example
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" filename="ButtonGallery.tsx" />
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Props
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
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">animation</td>
                <td className="p-3 text-neutral-500">
                  "spring-bounce" | "press-3d" | "slide-reveal" | "magnetic-glow" | "shimmer-sweep" | "glitch-cyberpunk" | "particle-burst" | "magnetic-tilt" | "liquid-gooey" | "neon-pulse" | "ripple-echo" | "fold-out" | "swipe-fill" | "pixelate-morph" | "jelly-wobble" | "border-beam" | "flip-3d" | "elastic-snap"
                </td>
                <td className="p-3 text-neutral-400">"spring-bounce"</td>
                <td className="p-3 font-sans">
                  Pilihan dari 18 interaksi fisika animasi Framer Motion tanpa kasta.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">variant</td>
                <td className="p-3 text-neutral-500">
                  "default" | "secondary" | "outline" | "ghost" 
                  {/* | "danger" */}
                </td>
                <td className="p-3 text-neutral-400">"default"</td>
                <td className="p-3 font-sans">
                  Gaya visual warna tombol (Tailwind utility).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">size</td>
                <td className="p-3 text-neutral-500">"sm" | "md" | "lg"</td>
                <td className="p-3 text-neutral-400">"md"</td>
                <td className="p-3 font-sans">Ukuran tinggi dan padding tombol.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">isLoading</td>
                <td className="p-3 text-neutral-500">boolean</td>
                <td className="p-3 text-neutral-400">false</td>
                <td className="p-3 font-sans">Menampilkan spinner loading bawaan dan mendisabel klik.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
