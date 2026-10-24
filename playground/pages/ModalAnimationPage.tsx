import { useTranslation } from "react-i18next";
import { ModalDemo } from "./ModalDemo";
import { CodeBlock } from "../components/CodeBlock";

export function ModalAnimationPage() {
  const { t } = useTranslation();

  const compoundUsage = `import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  ModalConfirmContent,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from "@needui/ui-kit";

// 1. Zero-State Modal (Tanpa deklarasi useState!)
export function ZeroStateModalExample() {
  return (
    <Modal>
      <ModalTrigger className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800">
        Buka Dialog Proyek
      </ModalTrigger>
      
      <ModalContent size="md" title="Konfirmasi Perubahan" description="Apakah Anda yakin ingin menyimpan perubahan dokumen ini?">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Semua anggota tim akan menerima notifikasi pembaruan secara instan.
        </p>
        <ModalFooter>
          <ModalClose asChild>
            <button className="rounded-lg border px-3 py-1.5 text-sm">Batal</button>
          </ModalClose>
          <ModalClose asChild>
            <button className="rounded-lg bg-neutral-900 px-4 py-1.5 text-sm text-white">Simpan</button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// 2. Zero-State Confirm Modal (Preset Praktis)
export function ZeroStateConfirmExample() {
  return (
    <Modal>
      <ModalTrigger className="rounded-xl bg-rose-600 px-4 py-2 text-white hover:bg-rose-700">
        Hapus Repositori
      </ModalTrigger>
      <ModalConfirmContent
        title="Hapus Repositori Permanen?"
        description="Tindakan ini tidak dapat dibatalkan. Semua commit dan branch akan terhapus."
        confirmVariant="danger"
        confirmLabel="Ya, Hapus Sekarang"
        cancelLabel="Batal"
        onConfirm={() => console.log("Repo dihapus!")}
      />
    </Modal>
  );
}

// 3. Zero-State Slide Drawer
export function ZeroStateDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger className="rounded-xl border px-4 py-2 hover:bg-neutral-100">
        Buka Drawer Navigasi
      </DrawerTrigger>
      <DrawerContent position="right" size="md">
        <DrawerHeader>
          <DrawerTitle>Pengaturan Akun</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-neutral-600">Konten navigasi atau pengaturan scrollable...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}`;

  const controlledUsage = `import { useState } from "react";
import { ModalConfirm, ModalForm } from "@needui/ui-kit";

// Pemanggilan Klasik dengan State Terkontrol (Opsional)
export function ControlledDialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Buka Konfirmasi</button>
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Hapus Proyek Ini?"
        description="Tindakan ini permanen dan tidak dapat dibatalkan."
        onConfirm={() => console.log("Dihapus!")}
      />
    </>
  );
}`;

  return (
    <div className="space-y-12 pb-16">
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

      <section className="space-y-6">
        <ModalDemo />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Compound Component (Zero-State Declaration)
        </h2>
        <p className="text-sm text-neutral-500">
          Pola Compound Component Radix/shadcn-style: Cukup panggil komponen tanpa perlu mengelola <code>useState</code> secara manual.
        </p>
        <CodeBlock code={compoundUsage} language="tsx" filename="ZeroStateModal.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Controlled Usage (State Terkelola Manual)
        </h2>
        <CodeBlock code={controlledUsage} language="tsx" filename="ControlledModal.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Props API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 font-semibold border-b border-neutral-200/80 dark:border-neutral-800/80 text-[11px] uppercase">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">isOpen</td>
                <td className="p-3 text-neutral-500 font-mono">boolean</td>
                <td className="p-3 text-neutral-400">required</td>
                <td className="p-3 font-sans">Mengontrol status visibilitas modal (terbuka atau tertutup).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">onClose</td>
                <td className="p-3 text-neutral-500 font-mono">() =&gt; void</td>
                <td className="p-3 text-neutral-400">required</td>
                <td className="p-3 font-sans">Callback saat modal ditutup melalui klik backdrop, tombol X, atau tombol Escape.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">size</td>
                <td className="p-3 text-neutral-500 font-mono">"sm" | "md" | "lg" | "xl" | "full"</td>
                <td className="p-3 text-neutral-400">"md"</td>
                <td className="p-3 font-sans">Mengatur lebar dialog/panel menggunakan varian CVA.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">variant</td>
                <td className="p-3 text-neutral-500 font-mono">"default" | "danger" | "warning" | "clean"</td>
                <td className="p-3 text-neutral-400">"default"</td>
                <td className="p-3 font-sans">Menentukan gaya tema border/accent modal (CVA).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">title</td>
                <td className="p-3 text-neutral-500 font-mono">string</td>
                <td className="p-3 text-neutral-400">required</td>
                <td className="p-3 font-sans">Judul utama yang ditampilkan pada header dialog.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">description</td>
                <td className="p-3 text-neutral-500 font-mono">string</td>
                <td className="p-3 text-neutral-400">undefined</td>
                <td className="p-3 font-sans">Deskripsi atau penjelasan detail isi modal konfirmasi.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">backdropVariant</td>
                <td className="p-3 text-neutral-500 font-mono">"default" | "dark" | "blur" | "transparent"</td>
                <td className="p-3 text-neutral-400">"default"</td>
                <td className="p-3 font-sans">Intensitas transparansi dan efek blur pada latar belakang (backdrop).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">closeOnBackdropClick</td>
                <td className="p-3 text-neutral-500 font-mono">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup dialog saat area backdrop di luar modal diklik.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">closeOnEscape</td>
                <td className="p-3 text-neutral-500 font-mono">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup dialog secara otomatis saat tombol Escape ditekan.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">className</td>
                <td className="p-3 text-neutral-500 font-mono">string</td>
                <td className="p-3 text-neutral-400">undefined</td>
                <td className="p-3 font-sans">Class tambahan Tailwind CSS untuk elemen container modal.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

