import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackWidget, FeedbackData } from "../../src/components/FeedbackWidget";
import { CodeSnippet } from "../components/CodeSnippet";
import { ZapIcon, LayersIcon, CheckCircleIcon } from "../../src/icons";

const DEMO_DICT = {
  en: {
    pillTag1: "Micro-Interactions & Spring Physics",
    pillTag2: "Production Feedback Component",
    pageTitle: "Feedback Widget",
    pageDescription:
      "A complete, animated feedback collection widget for modern web apps. Combines real-time visitor rating statistics, animated 1-5 star selection with spring bounces, contextual descriptors, quick category tags, and an asynchronous submission state with smooth AnimatePresence transitions.",
    cardTitle: "Interactive Feedback & Review Widget",
    cardBadge: "All-in-One Community Pulse",
    cardDesc:
      "Hover over the stars to see dynamic color fills, click to trigger spring physics, select feedback tags, and submit with real-time loading and success states.",
    usageSnippet: `import { FeedbackWidget, FeedbackData } from "@needui/ui-kit";

export function FeedbackDemo() {
  const handleFeedbackSubmit = async (data: FeedbackData) => {
    // Post payload to your analytics or database endpoint
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <FeedbackWidget
      averageRating={4.8}
      totalReviews={124}
      availableTags={[
        "⚡ Super Fast",
        "🎨 Clean Aesthetics",
        "💎 Great DX",
        "🐛 Found a Bug",
        "💡 Feature Idea",
      ]}
      onSubmit={handleFeedbackSubmit}
    />
  );
}`,
  },
  id: {
    pillTag1: "Micro-Interactions & Fisika Pegas",
    pillTag2: "Komponen Feedback Produksi",
    pageTitle: "Feedback Widget",
    pageDescription:
      "Widget pengumpulan masukan interaktif lengkap untuk aplikasi web modern. Menggabungkan statistik ulasan pengunjung, sistem rating bintang 1-5 beranimasi, deskriptor kontekstual, tag kategori cepat, serta status pengiriman asinkron dengan transisi halus.",
    cardTitle: "Widget Feedback & Ulasan Interaktif",
    cardBadge: "All-in-One Community Pulse",
    cardDesc:
      "Arahkan kursor ke bintang untuk melihat efek warna dinamis, klik untuk memicu animasi pegas, pilih tag masukan, dan kirim dengan simulasi loading serta status sukses.",
    usageSnippet: `// Lihat kode varian FeedbackWidget di atas`,
  },
};

export function FeedbackWidgetDemo() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("id") ? "id" : "en";
  const t = DEMO_DICT[lang];

  const [receivedSubmissions, setReceivedSubmissions] = useState<FeedbackData[]>([]);

  const handleCustomSubmit = async (data: FeedbackData) => {

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setReceivedSubmissions((prev) => [data, ...prev]);
  };

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-mono font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <ZapIcon size={12} />
            {t.pillTag1}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-mono font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300">
            <LayersIcon size={12} />
            {t.pillTag2}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.pageTitle}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          {t.pageDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 sm:gap-14">
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <h2 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                {t.cardTitle}
              </h2>
              <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 font-semibold">
                {t.cardBadge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cardDesc}
            </p>
          </div>

          <div className="flex items-center justify-center p-4 sm:p-10 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 overflow-hidden">
            <FeedbackWidget onSubmit={handleCustomSubmit} />
          </div>

          {receivedSubmissions.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircleIcon size={14} />
                <span>Client Session Submissions Received ({receivedSubmissions.length})</span>
              </div>
              <div className="space-y-2">
                {receivedSubmissions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                      <span>Rating: {sub.rating} ★</span>
                      <span>{sub.createdAt.toLocaleTimeString()}</span>
                    </div>
                    {sub.tags.length > 0 && (
                      <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Tags: {sub.tags.join(", ")}
                      </p>
                    )}
                    {sub.message && (
                      <p className="text-zinc-500 dark:text-zinc-400 italic">
                        &quot;{sub.message}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <CodeSnippet code={t.usageSnippet} />
        </section>
      </div>
    </div>
  );
}

export default FeedbackWidgetDemo;
