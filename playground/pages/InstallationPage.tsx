import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../components/CodeBlock";

export function InstallationPage() {
  const { t } = useTranslation();
  
  const [selectedPm, setSelectedPm] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [styleMethod, setStyleMethod] = useState<"standalone" | "tailwind">("standalone");
  const [frameworkTab, setFrameworkTab] = useState<"vite" | "nextApp" | "css">("vite");
  const [tailwindVersion, setTailwindVersion] = useState<"v4" | "v3">("v4");

  const installCommands: Record<string, string> = {
    npm: "npm install @needui/ui-kit framer-motion",
    pnpm: "pnpm add @needui/ui-kit framer-motion",
    yarn: "yarn add @needui/ui-kit framer-motion",
    bun: "bun add @needui/ui-kit framer-motion",
  };

  const viteEntryCode = `// src/main.tsx atau src/App.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import stylesheet NeedUI sekali di file entry aplikasi Anda
import "@needui/ui-kit/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const nextAppLayoutCode = `// app/layout.tsx (Next.js App Router)
import "@needui/ui-kit/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Application",
  description: "Built with @needui/ui-kit",
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

  const globalCssCode = `/* src/index.css atau src/globals.css */
@import "@needui/ui-kit/styles.css";

/* (Opsional) Jika project Anda juga menggunakan Tailwind CSS */
@import "tailwindcss";`;

  const tailwindV4Code = `/* src/index.css atau globals.css */
@import "tailwindcss";

/* Pindai kelas utilitas NeedUI langsung di Tailwind CSS v4 */
@source "../node_modules/@needui/ui-kit/dist";`;

  const tailwindV3Code = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Daftarkan distribusi NeedUI ke dalam content scanning:
    "./node_modules/@needui/ui-kit/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  const quickStartCode = `import { useState } from "react";
import { SwipeButton, HoldButton, MagneticButton } from "@needui/ui-kit";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold">Halo NeedUI</h1>

      <HoldButton 
        label="Tahan 1 Detik" 
        onConfirm={() => alert("Aksi Berhasil!")} 
      />

      <SwipeButton 
        label={confirmed ? "Terkonfirmasi" : "Geser Konfirmasi"} 
        onComplete={() => setConfirmed(true)} 
      />

      <MagneticButton>
        Tombol Magnetik
      </MagneticButton>
    </div>
  );
}`;

  const cdnCode = `<!-- 1. Muat Stylesheet Komponen Terkompilasi via CDN -->
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

      {/* LANGKAH 1: Install Package */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            1
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step1.title", "Install Package")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t("content.installation.step1.desc", "Pilih package manager yang Anda gunakan pada project:")}
        </p>

        {/* Tab Package Manager */}
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

      {/* LANGKAH 2: Hubungkan Stylesheet CSS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            2
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step2.title", "Hubungkan Stylesheet CSS")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t("content.installation.step2.desc", "Pilih metode styling yang sesuai dengan kebutuhan project Anda:")}
        </p>

        {/* Tab Pemilihan Metode (Standalone vs Tailwind) */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setStyleMethod("standalone")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              styleMethod === "standalone"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>Zero-Config CSS</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900">
              Rekomendasi
            </span>
          </button>
          <button
            type="button"
            onClick={() => setStyleMethod("tailwind")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              styleMethod === "tailwind"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>Native Tailwind</span>
          </button>
        </div>

        {/* Konten Metode Standalone */}
        {styleMethod === "standalone" && (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Import file <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs text-neutral-800 dark:text-neutral-200">@needui/ui-kit/styles.css</code> satu kali pada entry point utama aplikasi Anda:
            </p>

            <div className="flex items-center gap-1 border-b border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setFrameworkTab("vite")}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-[1px] cursor-pointer ${
                  frameworkTab === "vite"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                }`}
              >
                Vite / React SPA
              </button>
              <button
                type="button"
                onClick={() => setFrameworkTab("nextApp")}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-[1px] cursor-pointer ${
                  frameworkTab === "nextApp"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                }`}
              >
                Next.js App Router
              </button>
              <button
                type="button"
                onClick={() => setFrameworkTab("css")}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-[1px] cursor-pointer ${
                  frameworkTab === "css"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                }`}
              >
                Global CSS
              </button>
            </div>

            {frameworkTab === "vite" && (
              <CodeBlock code={viteEntryCode} language="tsx" filename="src/main.tsx" />
            )}
            {frameworkTab === "nextApp" && (
              <CodeBlock code={nextAppLayoutCode} language="tsx" filename="app/layout.tsx" />
            )}
            {frameworkTab === "css" && (
              <CodeBlock code={globalCssCode} language="css" filename="src/index.css" />
            )}
          </div>
        )}

        {/* Konten Metode Tailwind */}
        {styleMethod === "tailwind" && (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Jika project Anda telah menggunakan Tailwind CSS, daftarkan direktori distribusi NeedUI agar class utilitas dipindai secara otomatis:
            </p>

            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setTailwindVersion("v4")}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-[1px] cursor-pointer ${
                  tailwindVersion === "v4"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                }`}
              >
                Tailwind CSS v4
              </button>
              <button
                type="button"
                onClick={() => setTailwindVersion("v3")}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-[1px] cursor-pointer ${
                  tailwindVersion === "v3"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                }`}
              >
                Tailwind CSS v3
              </button>
            </div>

            {tailwindVersion === "v4" ? (
              <CodeBlock code={tailwindV4Code} language="css" filename="src/index.css" />
            ) : (
              <CodeBlock code={tailwindV3Code} language="javascript" filename="tailwind.config.js" />
            )}
          </div>
        )}
      </section>

      {/* LANGKAH 3: Mulai Gunakan Komponen */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            3
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step3.title", "Mulai Gunakan Komponen")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t("content.installation.step3.desc", "Import komponen yang Anda butuhkan langsung dari root package:")}
        </p>
        <CodeBlock code={quickStartCode} language="tsx" filename="App.tsx" />
      </section>

      {/* Opsi CDN Standalone */}
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
