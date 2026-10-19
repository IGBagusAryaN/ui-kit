import { useTranslation } from "react-i18next";
import { ToastDemo } from "./ToastDemo";
import { CodeBlock } from "../components/CodeBlock";

export function ToastAnimationPage() {
  const { t } = useTranslation();

  const sampleUsage = `import { ToastProvider, useToast } from "@a/ui";

// 1. Bungkus aplikasi Anda dengan ToastProvider di root
export function App() {
  return (
    <ToastProvider position="bottom-right" defaultDuration={4000}>
      <Dashboard />
    </ToastProvider>
  );
}

// 2. Panggil toast dari komponen mana pun menggunakan hook useToast()
export function Dashboard() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      {/* 1. Default / Info */}
      <button
        onClick={() =>
          toast.info("Pembaruan data berhasil disinkronkan.", {
            title: "Info Sistem",
          })
        }
      >
        Tampilkan Info
      </button>

      {/* 2. Success */}
      <button
        onClick={() =>
          toast.success("Profil Anda berhasil diperbarui!", {
            title: "Sukses Disimpan",
          })
        }
      >
        Tampilkan Success
      </button>

      {/* 3. Error */}
      <button
        onClick={() =>
          toast.error("Gagal menghubungkan ke server pembayaran.", {
            title: "Kesalahan Jaringan",
          })
        }
      >
        Tampilkan Error
      </button>

      {/* 4. Action / Undo */}
      <button
        onClick={() =>
          toast.action(
            "Berkas berhasil dihapus.",
            {
              label: "Urungkan (Undo)",
              onClick: (id) => console.log("Aksi dibatalkan untuk toast id:", id),
            },
            { title: "Item Dihapus", duration: 5000 }
          )
        }
      >
        Tampilkan Action
      </button>

      {/* 5. Promise / Loading */}
      <button
        onClick={() => {
          const asyncTask = new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(asyncTask, {
            loading: { title: "Mengunggah...", message: "Proses transfer file..." },
            success: { title: "Selesai!", message: "File berhasil diunggah." },
            error: { title: "Gagal", message: "File gagal diproses." },
          });
        }}
      >
        Jalankan Async Promise
      </button>
    </div>
  );
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title & Header */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.toastDemo.badge", "Notifikasi")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.toastDemo.pageTitle", "Toast / Snackbar Notification")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.toastDemo.pageDesc",
            "Sistem notifikasi Toast ringan berbasis React Context & Framer Motion dengan 5 variasi visual dan animasi dinamis, status timeout otomatis dengan jeda saat hover (pause on hover), tombol aksi interaktif, serta transisi asinkron terpadu."
          )}
        </p>
      </div>

      {/* Interactive 5 Variants Grid */}
      <section className="space-y-6">
        <ToastDemo />
      </section>

      {/* Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" filename="ToastExample.tsx" />
      </section>

      {/* Props & API Reference */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.props", "API & Properti")}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 font-medium border-b border-neutral-200/80 dark:border-neutral-800/80 text-xs">
              <tr>
                <th className="p-3">Metode / Prop</th>
                <th className="p-3">Tipe Data</th>
                <th className="p-3">Default</th>
                <th className="p-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">toast.info</td>
                <td className="p-3 text-neutral-500 font-sans">(message: string, options?: ToastOptions) =&gt; string</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Memunculkan notifikasi info standar dengan animasi slide-in dari kanan bawah layar.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">toast.success</td>
                <td className="p-3 text-neutral-500 font-sans">(message: string, options?: ToastOptions) =&gt; string</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Memunculkan notifikasi sukses dengan aksen hijau dan animasi Pop/Scale spring bounce.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">toast.error</td>
                <td className="p-3 text-neutral-500 font-sans">(message: string, options?: ToastOptions) =&gt; string</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Memunculkan notifikasi gagal dengan aksen merah dan efek shake horizontal keyframes.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">toast.action</td>
                <td className="p-3 text-neutral-500 font-sans">
                  (message: string, action: ToastActionOptions, options?: ToastOptions) =&gt; string
                </td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Memunculkan notifikasi interaktif yang dilengkapi tombol aksi sekunder (misal Undo).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">toast.promise</td>
                <td className="p-3 text-neutral-500 font-sans">
                  &lt;T&gt;(promise, &#123; loading, success, error &#125;, options?) =&gt; Promise&lt;T&gt;
                </td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Mengikat siklus hidup async Promise: memunculkan spinner dan bertransformasi morph ke success/error.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">position</td>
                <td className="p-3 text-neutral-500">
                  "bottom-right" | "bottom-left" | "top-right" | "top-left" | "top-center" | "bottom-center"
                </td>
                <td className="p-3 text-neutral-400">"bottom-right"</td>
                <td className="p-3 font-sans">Posisi viewport tempat berkumpulnya toast container di layar.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">defaultDuration</td>
                <td className="p-3 text-neutral-500">number (ms)</td>
                <td className="p-3 text-neutral-400">4000</td>
                <td className="p-3 font-sans">Durasi tampil otomatis sebelum toast menghilang (0 untuk nonaktif).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

