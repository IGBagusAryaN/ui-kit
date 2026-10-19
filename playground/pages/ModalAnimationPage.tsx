import { useTranslation } from "react-i18next";
import { ModalDemo } from "./ModalDemo";
import { CodeBlock } from "../components/CodeBlock";

export function ModalAnimationPage() {
  const { t } = useTranslation();

  const sampleUsage = `import { useState } from "react";
import {
  ModalConfirm,
  ModalForm,
  ModalDrawer,
  ModalBottomSheet,
  ModalMedia,
} from "@bgsaryzzz/ui";

export function DialogShowcase() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-4">
      {/* 1. Standard Confirmation Dialog */}
      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Hapus Proyek Ini?"
        description="Tindakan ini permanen dan tidak dapat dibatalkan."
        onConfirm={() => console.log("Proyek dihapus!")}
      />

      {/* 2. Interactive Form Dialog */}
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Edit Profil Pengguna"
        onSubmit={(values) => console.log("Form data:", values)}
      />

      {/* 3. Right Slide-Over Drawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Pengaturan Sistem"
        onSave={() => console.log("Pengaturan disimpan!")}
      >
        <p>Konten pengaturan scrollable...</p>
      </ModalDrawer>

      {/* 4. Bottom Sheet Dialog */}
      <ModalBottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Opsi Berbagi Berkas"
      >
        <p>Pilihan ekspor file...</p>
      </ModalBottomSheet>

      {/* 5. Media Lightbox Viewer */}
      <ModalMedia
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        src="/images/design-system.png"
        title="Design System Architecture"
        caption="High resolution preview"
      />
    </div>
  );
}`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title & Header */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.modalDemo.badge", "Dialog & Overlay")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.modalDemo.pageTitle", "Modal / Pop-up Dialog")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.modalDemo.pageDesc",
            "Koleksi 5 variasi komponen modal dialog interaktif dengan animasi fisika Framer Motion, efek backdrop blur, penutupan via klik backdrop & tombol Escape, serta tata letak responsif."
          )}
        </p>
      </div>

      {/* Interactive 5 Variants Grid */}
      <section className="space-y-6">
        <ModalDemo />
      </section>

      {/* Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {t("common.usage", "Cara Penggunaan")}
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" filename="ModalShowcase.tsx" />
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
                <th className="p-3">Komponen / Prop</th>
                <th className="p-3">Tipe Data</th>
                <th className="p-3">Default</th>
                <th className="p-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">ModalConfirm</td>
                <td className="p-3 text-neutral-500 font-sans">ModalConfirmProps</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Dialog konfirmasi alert klasik dengan animasi fade & scale, tombol Batal dan Konfirmasi.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">ModalForm</td>
                <td className="p-3 text-neutral-500 font-sans">ModalFormProps</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Modal formulir terstruktur dengan header tombol 'X', form body responsif, dan footer aksi simpan.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">ModalDrawer</td>
                <td className="p-3 text-neutral-500 font-sans">ModalDrawerProps</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Side panel kanan layar dengan tinggi 100% viewport, animasi spring x-slide halus.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">ModalBottomSheet</td>
                <td className="p-3 text-neutral-500 font-sans">ModalBottomSheetProps</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Modal slide-up dari bawah layar dengan rounded top dan drag indicator pill bar.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">ModalMedia</td>
                <td className="p-3 text-neutral-500 font-sans">ModalMediaProps</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">
                  Lightbox gambar/video dengan backdrop gelap pekat (bg-black/90) dan animasi spring zoom.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">closeOnBackdropClick</td>
                <td className="p-3 text-neutral-500">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup dialog saat area backdrop di luar modal diklik.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">closeOnEscape</td>
                <td className="p-3 text-neutral-500">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup dialog saat tombol Escape pada keyboard ditekan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

