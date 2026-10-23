import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../components/CodeBlock";

export function InstallationPage() {
  const { t } = useTranslation();
  const [selectedPm, setSelectedPm] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [styleTab, setStyleTab] = useState<"entry" | "css" | "nextjs">("entry");

  const installCommands: Record<string, string> = {
    npm: "npm install @needui/ui-kit",
    pnpm: "pnpm add @needui/ui-kit",
    yarn: "yarn add @needui/ui-kit",
    bun: "bun add @needui/ui-kit",
  };

  const peerDepsCommands: Record<string, string> = {
    npm: "npm install framer-motion",
    pnpm: "pnpm add framer-motion",
    yarn: "yarn add framer-motion",
    bun: "bun add framer-motion",
  };

  const entryStyleCode = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import stylesheet NeedUI sekali di file entry aplikasi Anda
import "@needui/ui-kit/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const cssStyleCode = `/* src/index.css atau src/globals.css */
@import "@needui/ui-kit/styles.css";

/* (Opsional) Jika project Anda juga menggunakan Tailwind CSS */
@import "tailwindcss";`;

  const nextjsStyleCode = `// app/layout.tsx (Next.js App Router)
import "@needui/ui-kit/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Application",
  description: "Built with NeedUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

  const quickStartCode = `import { useState } from "react";
import { 
  SwipeButton, 
  HoldButton, 
  MagneticButton 
} from "@needui/ui-kit";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold">Halo NeedUI</h1>
      
      <SwipeButton 
        label="Geser untuk Konfirmasi" 
        onComplete={() => setConfirmed(true)} 
      />

      <HoldButton 
        label="Tahan 1 Detik" 
        onConfirm={() => alert("Tindakan Berhasil!")} 
      />

      <MagneticButton>
        Tombol Magnetik
      </MagneticButton>
    </div>
  );
}`;

  const cdnCode = `<!-- 1. Muat Stylesheet Komponen Terkompilasi -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@needui/ui-kit/dist/styles.css" />

<!-- 2. Import Komponen melalui ESM CDN -->
<script type="module">
  import { SwipeButton } from "https://esm.sh/@needui/ui-kit";
</script>`;

  return (
    <div className="space-y-12 pb-16">
      {/* Header Halaman */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.installation.badge", "Get Started")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.installation.title", "Installation")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.installation.description",
            "Panduan langkah demi langkah untuk menginstal dan mengkonfigurasi UI Component Library @needui/ui-kit pada project React, Vite, atau Next.js Anda."
          )}
        </p>
      </div>

      {/* Langkah 1: Install Package */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            {t("content.installation.step1.badge", "1")}
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step1.title", "Install Package")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t("content.installation.step1.desc", "Pilih package manager yang Anda gunakan pada project:")}
        </p>

        <div className="flex items-center gap-1 border-b border-neutral-200 dark:border-neutral-800">
          {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setSelectedPm(pm)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
                selectedPm === pm
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>

        <CodeBlock code={installCommands[selectedPm]} filename="terminal" />
      </section>

      {/* Langkah 2: Peer Dependencies */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            {t("content.installation.step2.badge", "2")}
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step2.title", "Pastikan Peer Dependencies Terpasang")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t(
            "content.installation.step2.desc",
            "Library ini membutuhkan framer-motion untuk animasi fluida dan micro-interactions:"
          )}
        </p>
        <CodeBlock code={peerDepsCommands[selectedPm]} filename="terminal" />
      </section>

      {/* Langkah 3: Import Stylesheet CSS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            {t("content.installation.step3.badge", "3")}
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step3.title", "Import Stylesheet CSS")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t(
            "content.installation.step3.desc",
            "Tambahkan file stylesheet @needui/ui-kit/styles.css ke root project Anda. Seluruh class utility dan animasi telah terkompilasi murni sehingga tidak memerlukan konfigurasi Tailwind manual:"
          )}
        </p>

        {/* Tab Pilihan Lokasi Import */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setStyleTab("entry")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              styleTab === "entry"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>{t("content.installation.step3.mainTab", "main.tsx / App.tsx")}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900">
              {t("content.installation.step3.mainBadge", "Rekomendasi")}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStyleTab("css")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              styleTab === "css"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>{t("content.installation.step3.cssTab", "index.css")}</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700">
              {t("content.installation.step3.cssBadge", "Alternatif")}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStyleTab("nextjs")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              styleTab === "nextjs"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>Next.js App Router</span>
          </button>
        </div>

        {styleTab === "entry" && (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t(
                "content.installation.step3.mainDesc",
                "Cukup import file styles.css satu kali pada file entry utama aplikasi Anda (React, Vite, Next.js, CRA, atau Remix):"
              )}
            </p>
            <CodeBlock code={entryStyleCode} language="tsx" filename="src/main.tsx" />
          </div>
        )}

        {styleTab === "css" && (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t(
                "content.installation.step3.cssDesc",
                "Atau jika Anda lebih suka mengimpor via file CSS global utama project Anda:"
              )}
            </p>
            <CodeBlock code={cssStyleCode} language="css" filename="src/index.css" />
          </div>
        )}

        {styleTab === "nextjs" && (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Pada Next.js App Router, tambahkan import stylesheet di dalam file layout root:
            </p>
            <CodeBlock code={nextjsStyleCode} language="tsx" filename="app/layout.tsx" />
          </div>
        )}

        {/* Callout Bebas Konfigurasi */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20 text-xs text-emerald-800 dark:text-emerald-300">
          <span className="text-base select-none">✨</span>
          <div className="space-y-1">
            <span className="font-bold text-xs block">Zero-Configuration Styling</span>
            <p className="text-emerald-700/90 dark:text-emerald-400/90 leading-relaxed text-xs">
              Seluruh class Tailwind dan animasi sudah terkompilasi murni ke dalam <code className="font-mono bg-emerald-100 dark:bg-emerald-900/50 px-1 py-0.5 rounded">styles.css</code>. Anda <strong>tidak perlu</strong> lagi menambahkan direktif <code className="font-mono">@source</code> pada Tailwind v4, mengatur array <code className="font-mono">content</code> di Tailwind v3, ataupun menginstal plugin khusus.
            </p>
          </div>
        </div>
      </section>

      {/* Langkah 4: Mulai Gunakan Komponen */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            {t("content.installation.step4.badge", "4")}
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step4.title", "Mulai Gunakan Komponen")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t("content.installation.step4.desc", "Import komponen yang Anda butuhkan langsung dari root package:")}
        </p>
        <CodeBlock code={quickStartCode} language="tsx" filename="App.tsx" />
      </section>

      {/* Opsi CDN */}
      <section className="space-y-3 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 dark:border-neutral-800/80 dark:bg-neutral-900/30">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          {t("content.installation.cdn.title", "🌐 Opsi CDN Standalone (HTML Biasa)")}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t(
            "content.installation.cdn.desc",
            "Jika Anda ingin mencoba langsung pada file HTML tanpa build step Node.js:"
          )}
        </p>
        <CodeBlock code={cdnCode} language="html" filename="index.html" />
      </section>
    </div>
  );
}

export default InstallationPage;
