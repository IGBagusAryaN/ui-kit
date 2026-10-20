import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../components/CodeBlock";

export function InstallationPage() {
  const { t } = useTranslation();
  const [selectedPm, setSelectedPm] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [tailwindVersion, setTailwindVersion] = useState<"v4" | "v3">("v4");

  const installCommands: Record<string, string> = {
    npm: "npm install @bgsaryzzz/ui",
    pnpm: "pnpm add @bgsaryzzz/ui",
    yarn: "yarn add @bgsaryzzz/ui",
    bun: "bun add @bgsaryzzz/ui",
  };

  const peerDepsCode = `npm install framer-motion tailwindcss react react-dom`;

  // Tailwind CSS v4 Snippet (Modern @source directive in global CSS)
  const tailwindV4Code = `@import "tailwindcss";
@source "../node_modules/@bgsaryzzz/ui";`;

  // Tailwind CSS v3 Snippet (Legacy tailwind.config.js content array)
  const tailwindV3Code = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...path proyek Anda
    "./node_modules/@bgsaryzzz/ui/dist/**/*.{js,ts,jsx,tsx,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  const quickStartCode = `import { SearchAnimation, ButtonAnimation } from "@bgsaryzzz/ui";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-bold">My Awesome App</h1>
      <div className="flex items-center gap-3">
        <SearchAnimation placeholder="Cari dokumentasi..." />
        <ButtonAnimation variant="primary">
          Get Started
        </ButtonAnimation>
      </div>
    </header>
  );
}`;

  const cdnCode = `<!-- Menggunakan CDN ESM modern (misal melalui esm.sh atau unpkg) -->
<script type="module">
  import { SearchAnimation } from "https://esm.sh/@bgsaryzzz/ui";
</script>`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title Section */}
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
            "Panduan langkah demi langkah untuk menginstal dan mengkonfigurasi UI Component Library @bgsaryzzz/ui pada project React, Vite, atau Next.js Anda."
          )}
        </p>
      </div>

      {/* Step 1: Package Manager Installation with Tabs */}
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

        {/* Tab switcher */}
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

      {/* Step 2: Peer Dependencies */}
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
            "Library ini membutuhkan framer-motion untuk animasi fluida dan tailwindcss untuk utility styling:"
          )}
        </p>
        <CodeBlock code={peerDepsCode} filename="terminal" />
      </section>

      {/* Step 3: Tailwind Config (Dual-Version: v4 & v3) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
            {t("content.installation.step3.badge", "3")}
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t("content.installation.step3.title", "Konfigurasi Tailwind CSS")}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t(
            "content.installation.step3.desc",
            "Pilih versi Tailwind CSS yang digunakan pada proyek Anda untuk instruksi konfigurasi yang sesuai:"
          )}
        </p>

        {/* Tailwind Version Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setTailwindVersion("v4")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              tailwindVersion === "v4"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>{t("content.installation.step3.v4Tab", "Tailwind CSS v4")}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900">
              {t("content.installation.step3.v4Badge", "Rekomendasi")}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTailwindVersion("v3")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] cursor-pointer ${
              tailwindVersion === "v3"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            <span>{t("content.installation.step3.v3Tab", "Tailwind CSS v3")}</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700">
              {t("content.installation.step3.v3Badge", "Legacy")}
            </span>
          </button>
        </div>

        {/* Dual Version Content */}
        {tailwindVersion === "v4" ? (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t(
                "content.installation.step3.v4Desc",
                "Pada Tailwind CSS v4, Anda tidak lagi memerlukan file tailwind.config.js. Cukup tambahkan direktif @source ke file CSS global utama Anda (misal: index.css atau globals.css) agar Tailwind memindai dan mengekstrak komponen library:"
              )}
            </p>
            <CodeBlock code={tailwindV4Code} language="css" filename="src/index.css" />
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t(
                "content.installation.step3.v3Desc",
                "Bagi pengguna Tailwind CSS v3, daftarkan path distribusi library ke dalam array content di file tailwind.config.js agar class utilitas komponen tidak terhapus saat proses purge/build:"
              )}
            </p>
            <CodeBlock code={tailwindV3Code} language="javascript" filename="tailwind.config.js" />
          </div>
        )}
      </section>

      {/* Step 4: Quick Start Example */}
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

      {/* Step 5: CDN Section */}
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
