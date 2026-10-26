import { useState } from "react";
import { SearchAnimation, SearchAnimationVariant } from "../../src";

export function Demo() {
  const [log, setLog] = useState("");

  const variants: {
    variant: SearchAnimationVariant;
    title: string;
    description: string;
  }[] = [
    {
      variant: "morph",
      title: "1. Morph (Default)",
      description: "Morphing elastis dari icon bulat menjadi input panjang dengan spring physics.",
    },
    {
      variant: "slide-down",
      title: "2. Slide Down",
      description: "Form input muncul meluncur turun dari atas secara vertikal dengan efek drop.",
    },
    {
      variant: "scale-fade",
      title: "3. Scale Fade",
      description: "Pop-in zoom mengembang membesar dari titik pusat dengan transisi scale & opacity.",
    },
    {
      variant: "glow-pulse",
      title: "4. Glow Pulse",
      description: "Memancarkan aura cahaya gradasi neon yang berdenyut dinamis saat search bar terbuka.",
    },
    {
      variant: "underline-expand",
      title: "5. Underline Expand",
      description: "Desain minimalis dengan aksen garis bawah yang memanjang halus secara horizontal.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {variants.map(({ variant, title, description }) => (
          <div
            key={variant}
            className="flex flex-col justify-between p-5 rounded-2xl border border-neutral-200/80 bg-white shadow-xs dark:border-neutral-800/80 dark:bg-neutral-950 transition hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className="space-y-1.5 mb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800">
                  {variant}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex items-center justify-center pt-2 pb-1 min-h-[52px]">
              <SearchAnimation
                animationVariant={variant}
                placeholder={`Search (${variant})...`}
                onSearch={(q) => setLog(`[${variant}]: "${q}"`)}
              />
            </div>
          </div>
        ))}
      </div>

      {log && (
        <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800">
          <strong>Search Event:</strong> {log}
        </div>
      )}
    </div>
  );
}
