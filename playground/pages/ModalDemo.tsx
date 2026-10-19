import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ModalConfirm,
  ModalForm,
  ModalDrawer,
  ModalBottomSheet,
  ModalMedia,
} from "../../src/components/ModalAnimation";
import {
  SearchIcon,
  CloseIcon,
  CheckIcon,
  AlertTriangleIcon,
  SettingsIcon,
  ImageIcon,
  UserIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";
import { CodeSnippet } from "../components/CodeSnippet";

export function ModalDemo() {
  const { t } = useTranslation();

  // State untuk masing-masing varian modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // State pencarian & feedback interaktif
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // State simulasi data drawer & sheet
  const [drawerSettings, setDrawerSettings] = useState({
    darkMode: true,
    notifications: true,
    soundFx: false,
  });

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // Konfigurasi 5 variasi modal untuk dirender dalam grid presentasi
  const modalCards = useMemo(
    () => [
      {
        id: "confirm",
        title: t("content.modalDemo.items.confirm.title", "1. Standard Confirmation (ModalConfirm)"),
        badge: t("content.modalDemo.items.confirm.badge", "Alert Scale-Up"),
        physicsDescription: t(
          "content.modalDemo.items.confirm.desc",
          "Dialog konfirmasi klasik di tengah layar dengan ikon peringatan, judul, deskripsi, dan dua tombol aksi (Batal & Konfirmasi). Animasi fade-in dan scale-up halus."
        ),
        buttonLabel: t("content.modalDemo.items.confirm.buttonLabel", "Buka Modal Confirm"),
        accentClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-[0_4px_14px_rgba(244,63,94,0.25)]",
        icon: <AlertTriangleIcon size={16} />,
        onOpen: () => setIsConfirmOpen(true),
        snippet: `<ModalConfirm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Hapus Proyek Ini?"
  description="Tindakan ini tidak dapat dibatalkan..."
  onConfirm={() => handleDelete()}
/>`,
      },
      {
        id: "form",
        title: t("content.modalDemo.items.form.title", "2. Form Dialog (ModalForm)"),
        badge: t("content.modalDemo.items.form.badge", "Interactive Form"),
        physicsDescription: t(
          "content.modalDemo.items.form.desc",
          "Modal dialog interaktif untuk formulir input pengguna. Dilengkapi header dengan tombol silang 'X', body input nama & email, serta footer tombol aksi."
        ),
        buttonLabel: t("content.modalDemo.items.form.buttonLabel", "Buka Form Dialog"),
        accentClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)]",
        icon: <UserIcon size={16} />,
        onOpen: () => setIsFormOpen(true),
        snippet: `<ModalForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profil Pengguna"
  onSubmit={(values) => handleSave(values)}
/>`,
      },
      {
        id: "drawer",
        title: t("content.modalDemo.items.drawer.title", "3. Right Slide-over / Drawer (ModalDrawer)"),
        badge: t("content.modalDemo.items.drawer.badge", "Full-Height Drawer"),
        physicsDescription: t(
          "content.modalDemo.items.drawer.desc",
          "Panel modal yang meluncur masuk dari sisi kanan layar menutupi 100% tinggi viewport. Sangat ideal untuk menu pengaturan, filter, atau detail transaksi."
        ),
        buttonLabel: t("content.modalDemo.items.drawer.buttonLabel", "Buka Right Drawer"),
        accentClass: "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 shadow-xs",
        icon: <SettingsIcon size={16} />,
        onOpen: () => setIsDrawerOpen(true),
        snippet: `<ModalDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Pengaturan Tampilan"
  onSave={() => applySettings()}
>
  <SettingsContent />
</ModalDrawer>`,
      },
      {
        id: "bottomSheet",
        title: t("content.modalDemo.items.bottomSheet.title", "4. Bottom Sheet (ModalBottomSheet)"),
        badge: t("content.modalDemo.items.bottomSheet.badge", "Slide-Up Mobile Sheet"),
        physicsDescription: t(
          "content.modalDemo.items.bottomSheet.desc",
          "Modal yang meluncur naik dari dasar layar dengan sudut atas membulat (rounded-t-2xl). Dilengkapi drag indicator handle di bagian atas."
        ),
        buttonLabel: t("content.modalDemo.items.bottomSheet.buttonLabel", "Buka Bottom Sheet"),
        accentClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_14px_rgba(16,185,129,0.25)]",
        icon: <CheckIcon size={16} />,
        onOpen: () => setIsBottomSheetOpen(true),
        snippet: `<ModalBottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Opsi Berbagi & Ekspor"
>
  <ExportOptionsList />
</ModalBottomSheet>`,
      },
      {
        id: "media",
        title: t("content.modalDemo.items.media.title", "5. Media Lightbox (ModalMedia)"),
        badge: t("content.modalDemo.items.media.badge", "Spring Zoom Lightbox"),
        physicsDescription: t(
          "content.modalDemo.items.media.desc",
          "Modal khusus penampil media dengan latar belakang gelap pekat (bg-black/90). Gambar muncul dengan animasi spring zoom dinamis tanpa border mengganggu."
        ),
        buttonLabel: t("content.modalDemo.items.media.buttonLabel", "Buka Media Lightbox"),
        accentClass: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_14px_rgba(99,102,241,0.25)]",
        icon: <ImageIcon size={16} />,
        onOpen: () => setIsMediaOpen(true),
        snippet: `<ModalMedia
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  src="/assets/design-architecture.jpg"
  title="Design System Architecture"
  caption="High-resolution UI rendering"
/>`,
      },
    ],
    [t]
  );

  // Filter kartu berdasarkan query pencarian
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return modalCards;
    return modalCards.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.physicsDescription.toLowerCase().includes(q)
    );
  }, [modalCards, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Global Control Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "content.modalDemo.searchPlaceholder",
              "Cari variasi modal (contoh: 'confirm', 'form', 'drawer', 'sheet', 'media')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.modalDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        {/* Global Action & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t("content.modalDemo.quickTriggers", "Pemicu Cepat (Semua Variasi):")}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.modalDemo.showingCount", {
                count: filteredList.length,
                total: modalCards.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${modalCards.length} variasi Modal Dialog.`,
              })}
            </p>
          </div>

          {/* Tombol Pemicu Cepat */}
          <div className="flex flex-wrap items-center gap-1.5">
            {modalCards.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onOpen}
                title={`Open ${item.id}`}
                className="px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95 shadow-2xs"
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* Action Feedback Banner */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/70 text-xs font-medium shadow-xs"
            >
              <div className="flex items-center gap-2">
                <CheckIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>{feedbackMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackMessage(null)}
                className="p-1 rounded text-emerald-600 hover:bg-emerald-100/70 dark:text-emerald-400 dark:hover:bg-emerald-900/60 cursor-pointer"
              >
                <CloseIcon size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.modalDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan variasi modal dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.modalDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      {/* Unified 2-Column Grid of 5 Modal Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700",
              filteredList.length === 5 && item.id === "media" ? "md:col-span-2" : ""
            )}
          >
            {/* Header Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[44px]">
                {item.physicsDescription}
              </p>
            </div>

            {/* Interactive Preview Canvas with Trigger Button (flex-1 to absorb any vertical height) */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 min-h-[120px] overflow-visible">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={item.onOpen}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer",
                  item.accentClass
                )}
              >
                {item.icon}
                <span>{item.buttonLabel}</span>
              </motion.button>
              <span className="text-[11px] text-neutral-400 mt-2">
                * Klik untuk membuka dialog dengan animasi
              </span>
            </div>

            {/* Usage Code Snippet (Anchored at the bottom with mt-auto) */}
            <CodeSnippet code={item.snippet} className="mt-auto" />
          </div>
        ))}
      </div>

      {/* =========================================================================
       * 5 VARIANT MODALS RENDERING
       * ========================================================================= */}

      {/* 1. ModalConfirm */}
      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={t("content.modalDemo.items.confirm.modalTitle", "Hapus Proyek Ini?")}
        description={t(
          "content.modalDemo.items.confirm.modalDesc",
          "Tindakan ini tidak dapat dibatalkan. Seluruh berkas desain dan riwayat komponen akan dihapus secara permanen dari server."
        )}
        cancelLabel={t("content.modalDemo.items.confirm.cancelBtn", "Batal")}
        confirmLabel={t("content.modalDemo.items.confirm.confirmBtn", "Ya, Hapus Proyek")}
        confirmVariant="danger"
        onConfirm={() => {
          showFeedback(
            t("content.modalDemo.confirmFeedback", "Aksi dikonfirmasi! Proyek berhasil dihapus.")
          );
        }}
      />

      {/* 2. ModalForm */}
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={t("content.modalDemo.items.form.modalTitle", "Edit Profil Pengguna")}
        subtitle={t(
          "content.modalDemo.items.form.modalSubtitle",
          "Perbarui informasi profil dan kontak akun Anda di bawah ini."
        )}
        labels={{
          name: t("content.modalDemo.items.form.nameLabel", "Nama Lengkap"),
          email: t("content.modalDemo.items.form.emailLabel", "Alamat Email"),
          role: t("content.modalDemo.items.form.roleLabel", "Peran / Role"),
        }}
        placeholders={{
          name: t("content.modalDemo.items.form.namePlaceholder", "Masukkan nama Anda"),
          email: t("content.modalDemo.items.form.emailPlaceholder", "nama@perusahaan.com"),
        }}
        cancelLabel={t("content.modalDemo.items.form.cancelBtn", "Batal")}
        saveLabel={t("content.modalDemo.items.form.saveBtn", "Simpan Perubahan")}
        onSubmit={(values) => {
          showFeedback(
            t("content.modalDemo.formFeedback", {
              name: values.name,
              email: values.email,
              defaultValue: `Profil berhasil disimpan: ${values.name} (${values.email})`,
            })
          );
        }}
      />

      {/* 3. ModalDrawer */}
      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t("content.modalDemo.items.drawer.modalTitle", "Pengaturan Tampilan & Sistem")}
        subtitle={t(
          "content.modalDemo.items.drawer.modalSubtitle",
          "Konfigurasi preferensi UI dan tema aplikasi"
        )}
        closeLabel={t("content.modalDemo.items.drawer.closeBtn", "Tutup Panel")}
        saveLabel={t("content.modalDemo.items.drawer.saveBtn", "Terapkan Pengaturan")}
        onSave={() => {
          showFeedback(
            t("content.modalDemo.drawerFeedback", "Pengaturan berhasil diterapkan!")
          );
        }}
      >
        <div className="space-y-5">
          {/* Setting 1: Dark Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 dark:border-neutral-800/80 dark:bg-neutral-950/40">
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t("content.modalDemo.items.drawer.darkModeLabel", "Mode Gelap Otomatis")}
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t("content.modalDemo.items.drawer.darkModeDesc", "Menyesuaikan tema dengan preferensi OS")}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDrawerSettings({ ...drawerSettings, darkMode: !drawerSettings.darkMode })
              }
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                drawerSettings.darkMode ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                  drawerSettings.darkMode ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Setting 2: Push Notifications */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 dark:border-neutral-800/80 dark:bg-neutral-950/40">
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t("content.modalDemo.items.drawer.notificationsLabel", "Notifikasi Push")}
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t("content.modalDemo.items.drawer.notificationsDesc", "Terima peringatan saat ada aktivitas komponen baru")}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDrawerSettings({
                  ...drawerSettings,
                  notifications: !drawerSettings.notifications,
                })
              }
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                drawerSettings.notifications ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                  drawerSettings.notifications ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {/* Setting 3: Sound FX */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 dark:border-neutral-800/80 dark:bg-neutral-950/40">
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t("content.modalDemo.items.drawer.soundLabel", "Efek Suara Mikro")}
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t("content.modalDemo.items.drawer.soundDesc", "Bunyikan efek klik mikro saat menekan tombol")}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDrawerSettings({ ...drawerSettings, soundFx: !drawerSettings.soundFx })
              }
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                drawerSettings.soundFx ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                  drawerSettings.soundFx ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </ModalDrawer>

      {/* 4. ModalBottomSheet */}
      <ModalBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={t("content.modalDemo.items.bottomSheet.modalTitle", "Opsi Berbagi & Ekspor")}
        subtitle={t(
          "content.modalDemo.items.bottomSheet.modalSubtitle",
          "Pilih format berkas untuk mengekspor komponen UI"
        )}
        closeLabel={t("content.modalDemo.items.bottomSheet.closeBtn", "Tutup")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Option 1: PNG */}
          <div
            onClick={() => {
              showFeedback("Mengekspor gambar PNG resolusi tinggi...");
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-neutral-950/40 dark:hover:bg-neutral-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400 mb-2.5">
              <ImageIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {t("content.modalDemo.items.bottomSheet.optionPng", "Gambar PNG")}
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {t("content.modalDemo.items.bottomSheet.optionPngDesc", "Format raster presentasi")}
            </p>
          </div>

          {/* Option 2: SVG */}
          <div
            onClick={() => {
              showFeedback("Mengekspor berkas SVG vektor murni...");
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-neutral-950/40 dark:hover:bg-neutral-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 mb-2.5">
              <CheckIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {t("content.modalDemo.items.bottomSheet.optionSvg", "Vektor SVG")}
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {t("content.modalDemo.items.bottomSheet.optionSvgDesc", "Vektor murni skalabel")}
            </p>
          </div>

          {/* Option 3: JSON */}
          <div
            onClick={() => {
              showFeedback("Mengekspor skema token JSON...");
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-neutral-950/40 dark:hover:bg-neutral-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400 mb-2.5">
              <SettingsIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {t("content.modalDemo.items.bottomSheet.optionJson", "Token JSON")}
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {t("content.modalDemo.items.bottomSheet.optionJsonDesc", "Format data pengembang")}
            </p>
          </div>
        </div>
      </ModalBottomSheet>

      {/* 5. ModalMedia */}
      <ModalMedia
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
        alt={t("content.modalDemo.items.media.imageAlt", "Pratinjau Desain Arsitektur UI")}
        title={t(
          "content.modalDemo.items.media.imageCaptionTitle",
          "Design System Architecture v2.4"
        )}
        caption={t(
          "content.modalDemo.items.media.imageCaptionDesc",
          "Preview render komponen antarmuka modern dengan tata letak modular dan fisika mikro."
        )}
      />
    </div>
  );
}

