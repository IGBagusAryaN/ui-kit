import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ModalConfirm,
  ModalForm,
  ModalDrawer,
  ModalBottomSheet,
  ModalMedia,
  AnimatedModal,
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
import { CodeSnippet } from "../components/CodeSnippet";

const MODAL_DICT = {
  en: {
    searchPlaceholder:
      "Search modal variations (e.g. 'confirm', 'form', 'drawer', 'sheet', 'media')...",
    clear: "✕ Clear",
    quickTriggers: "Quick Triggers:",
    showingCount: (shown: number, total: number) =>
      `Showing ${shown} of ${total} Modal Dialog variations.`,
    clickToOpenHint: "* Click to open animated modal dialog",
    emptyState: (q: string) => `No modal variations found matching "${q}"`,
    resetSearch: "Reset search",
    cards: {
      confirm: {
        title: "1. Standard Confirmation (ModalConfirm)",
        badge: "Alert Scale-Up",
        desc: "Classic centered confirmation dialog featuring an alert icon, title, message, and action buttons. Enters smoothly with subtle fade and spring scale-up animation.",
        buttonLabel: "Open Confirm Modal",
        snippet: `<ModalConfirm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete this project?"
  description="This action cannot be undone. All project files will be permanently deleted."
  cancelLabel="Cancel"
  confirmLabel="Delete Project"
  confirmVariant="danger"
  onConfirm={() => handleDelete()}
/>`,
        modalTitle: "Delete this project?",
        modalDescription:
          "This action cannot be undone. All project files, design artifacts, and component history will be permanently deleted from the cloud server.",
        cancelLabel: "Cancel",
        confirmLabel: "Yes, Delete Project",
        feedbackMsg: "Action confirmed: Project successfully deleted.",
      },
      form: {
        title: "2. Form Dialog (ModalForm)",
        badge: "Interactive Form",
        desc: "Interactive dialog modal for user input forms. Features a clean header with close button, structured form fields for name & email, and action footer.",
        buttonLabel: "Open Form Dialog",
        snippet: `<ModalForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit User Profile"
  subtitle="Update your personal details and account information below."
  cancelLabel="Cancel"
  saveLabel="Save Changes"
  onSubmit={(values) => handleSave(values)}
/>`,
        modalTitle: "Edit User Profile",
        modalSubtitle: "Update your personal details and account settings below.",
        labels: {
          name: "Full Name",
          email: "Email Address",
          role: "Account Role",
        },
        placeholders: {
          name: "e.g. John Doe",
          email: "john.doe@company.com",
        },
        cancelLabel: "Cancel",
        saveLabel: "Save Changes",
        feedbackMsg: (name: string, email: string) =>
          `Profile saved successfully: ${name} (${email})`,
      },
      drawer: {
        title: "3. Right Slide-over / Drawer (ModalDrawer)",
        badge: "Full-Height Drawer",
        desc: "Slide-over drawer panel entering smoothly from the right side of the screen covering 100% viewport height. Ideal for system settings and deep configuration.",
        buttonLabel: "Open Right Drawer",
        snippet: `<ModalDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Display & System Settings"
  subtitle="Configure your application preferences"
  closeLabel="Close Panel"
  saveLabel="Apply Settings"
  onSave={() => applySettings()}
>
  <div className="space-y-5">
  </div>
</ModalDrawer>`,
        modalTitle: "Display & System Settings",
        modalSubtitle: "Configure application preferences and UI themes",
        closeLabel: "Close Panel",
        saveLabel: "Apply Settings",
        setting1Title: "Automatic Dark Theme",
        setting1Desc: "Automatically sync interface theme with your OS preference",
        setting2Title: "Push Notifications",
        setting2Desc: "Receive notifications when new component activity occurs",
        setting3Title: "Micro Sound Effects",
        setting3Desc: "Play subtle tactile audio cues on button presses",
        feedbackMsg: "Settings applied successfully!",
      },
      bottomSheet: {
        title: "4. Bottom Sheet (ModalBottomSheet)",
        badge: "Slide-Up Mobile Sheet",
        desc: "Mobile-optimized sheet sliding up from the bottom with rounded top corners and a tactile drag indicator handle for quick contextual actions.",
        buttonLabel: "Open Bottom Sheet",
        snippet: `<ModalBottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Share & Export Options"
  subtitle="Select an export file format"
  closeLabel="Close"
>
  <ExportOptionsList />
</ModalBottomSheet>`,
        modalTitle: "Share & Export Options",
        modalSubtitle: "Select a file format to export UI components",
        closeLabel: "Close",
        option1Title: "PNG Image",
        option1Desc: "Raster format for presentations",
        option1Feedback: "Exporting high-resolution PNG image...",
        option2Title: "SVG Vector",
        option2Desc: "Resolution-independent vector",
        option2Feedback: "Exporting scalable SVG vector file...",
        option3Title: "JSON Tokens",
        option3Desc: "Structured raw developer data",
        option3Feedback: "Exporting JSON design tokens schema...",
      },
      media: {
        title: "5. Media Lightbox (ModalMedia)",
        badge: "Spring Zoom Lightbox",
        desc: "Focused media viewer with an immersive dark backdrop (bg-black/90). Image enters with a dynamic spring zoom animation without distracting borders.",
        buttonLabel: "Open Media Lightbox",
        snippet: `<ModalMedia
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
  title="Design System Architecture"
  caption="High-resolution UI rendering preview"
/>`,
        alt: "UI Architecture Design Preview",
        mediaTitle: "Design System Architecture v2.4",
        caption:
          "High-resolution UI rendering preview featuring modular layouts and spring physics micro-interactions.",
      },
    },
  },
  id: {
    searchPlaceholder:
      "Cari variasi modal (contoh: 'confirm', 'form', 'drawer', 'sheet', 'media')...",
    clear: "✕ Hapus",
    quickTriggers: "Pemicu Cepat:",
    showingCount: (shown: number, total: number) =>
      `Menampilkan ${shown} dari ${total} variasi Dialog Modal.`,
    clickToOpenHint: "* Klik untuk membuka dialog modal beranimasi",
    emptyState: (q: string) => `Tidak ada variasi modal yang cocok dengan "${q}"`,
    resetSearch: "Reset pencarian",
    cards: {
      confirm: {
        title: "1. Konfirmasi Standar (ModalConfirm)",
        badge: "Alert Scale-Up",
        desc: "Dialog konfirmasi klasik di tengah layar dengan ikon alert, judul, pesan, dan tombol aksi. Muncul secara halus dengan animasi fade dan scale-up pegas.",
        buttonLabel: "Buka Modal Konfirmasi",
        snippet: `<ModalConfirm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Hapus proyek ini?"
  description="Tindakan ini tidak dapat dibatalkan. Semua berkas proyek akan dihapus permanen."
  cancelLabel="Batal"
  confirmLabel="Hapus Proyek"
  confirmVariant="danger"
  onConfirm={() => handleDelete()}
/>`,
        modalTitle: "Hapus proyek ini?",
        modalDescription:
          "Tindakan ini tidak dapat dibatalkan. Semua berkas proyek, artefak desain, dan riwayat komponen akan dihapus permanen dari server cloud.",
        cancelLabel: "Batal",
        confirmLabel: "Ya, Hapus Proyek",
        feedbackMsg: "Aksi terkonfirmasi: Proyek berhasil dihapus.",
      },
      form: {
        title: "2. Dialog Formulir (ModalForm)",
        badge: "Formulir Interaktif",
        desc: "Dialog modal interaktif untuk formulir input pengguna. Memiliki header rapi dengan tombol tutup, bidang input terstruktur untuk nama & email, serta footer aksi.",
        buttonLabel: "Buka Dialog Formulir",
        snippet: `<ModalForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profil Pengguna"
  subtitle="Perbarui data pribadi dan informasi akun Anda di bawah ini."
  cancelLabel="Batal"
  saveLabel="Simpan Perubahan"
  onSubmit={(values) => handleSave(values)}
/>`,
        modalTitle: "Edit Profil Pengguna",
        modalSubtitle: "Perbarui detail pribadi dan pengaturan akun Anda di bawah ini.",
        labels: {
          name: "Nama Lengkap",
          email: "Alamat Email",
          role: "Peran Akun",
        },
        placeholders: {
          name: "cth. John Doe",
          email: "john.doe@company.com",
        },
        cancelLabel: "Batal",
        saveLabel: "Simpan Perubahan",
        feedbackMsg: (name: string, email: string) =>
          `Profil berhasil disimpan: ${name} (${email})`,
      },
      drawer: {
        title: "3. Laci Kanan Layar (ModalDrawer)",
        badge: "Laci Tinggi Penuh",
        desc: "Panel laci (slide-over) yang meluncur mulus dari sisi kanan layar menutupi 100% tinggi viewport. Sangat ideal untuk pengaturan sistem dan konfigurasi mendalam.",
        buttonLabel: "Buka Laci Kanan",
        snippet: `<ModalDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Pengaturan Tampilan & Sistem"
  subtitle="Konfigurasi preferensi aplikasi dan tema antarmuka"
  closeLabel="Tutup Panel"
  saveLabel="Terapkan Pengaturan"
  onSave={() => applySettings()}
>
  <div className="space-y-5">
  </div>
</ModalDrawer>`,
        modalTitle: "Pengaturan Tampilan & Sistem",
        modalSubtitle: "Konfigurasi preferensi aplikasi dan tema antarmuka",
        closeLabel: "Tutup Panel",
        saveLabel: "Terapkan Pengaturan",
        setting1Title: "Tema Gelap Otomatis",
        setting1Desc: "Sinkronkan tema antarmuka secara otomatis dengan preferensi OS Anda",
        setting2Title: "Notifikasi Push",
        setting2Desc: "Terima pemberitahuan saat terjadi pembaruan aktivitas komponen",
        setting3Title: "Efek Suara Mikro",
        setting3Desc: "Putar isyarat audio taktil halus saat tombol ditekan",
        feedbackMsg: "Pengaturan berhasil diterapkan!",
      },
      bottomSheet: {
        title: "4. Lembar Bawah (ModalBottomSheet)",
        badge: "Lembar Geser Bawah",
        desc: "Lembar modal ramah perangkat seluler yang meluncur naik dari bawah dengan sudut atas melengkung dan indikator pegangan drag untuk aksi kontekstual cepat.",
        buttonLabel: "Buka Lembar Bawah",
        snippet: `<ModalBottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Opsi Berbagi & Ekspor"
  subtitle="Pilih format berkas untuk mengekspor komponen"
  closeLabel="Tutup"
>
  <ExportOptionsList />
</ModalBottomSheet>`,
        modalTitle: "Opsi Berbagi & Ekspor",
        modalSubtitle: "Pilih format berkas untuk mengekspor komponen UI",
        closeLabel: "Tutup",
        option1Title: "Gambar PNG",
        option1Desc: "Format raster untuk presentasi dan dokumen",
        option1Feedback: "Mengekspor gambar PNG resolusi tinggi...",
        option2Title: "Vektor SVG",
        option2Desc: "Grafik vektor tajam bebas batasan resolusi",
        option2Feedback: "Mengekspor berkas vektor SVG berskala...",
        option3Title: "Token JSON",
        option3Desc: "Data mentah terstruktur untuk developer",
        option3Feedback: "Mengekspor skema token desain JSON...",
      },
      media: {
        title: "5. Lightbox Media (ModalMedia)",
        badge: "Zoom Pegas Lightbox",
        desc: "Penampil media terfokus dengan latar belakang gelap pekat (bg-black/90). Gambar muncul dengan animasi pembesaran pegas dinamis tanpa border yang mengganggu.",
        buttonLabel: "Buka Lightbox Media",
        snippet: `<ModalMedia
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
  title="Arsitektur Sistem Desain"
  caption="Pratinjau rendering UI resolusi tinggi"
/>`,
        alt: "Pratinjau Desain Arsitektur UI",
        mediaTitle: "Arsitektur Sistem Desain v2.4",
        caption:
          "Pratinjau rendering UI resolusi tinggi yang menampilkan tata letak modular dan interaksi mikro fisika pegas.",
      },
    },
  },
};

interface ModalCardInfo {
  id: string;
  title: string;
  badge: string;
  physicsDescription: string;
  buttonLabel: string;
  icon: React.ReactNode;
  onOpen: () => void;
  snippet: string;
}

export function ModalDemo() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";
  const t = MODAL_DICT[lang];

  // Modal visibility states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // Search & interaction feedback state
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Drawer settings demo state
  const [drawerSettings, setDrawerSettings] = useState({
    darkMode: true,
    notifications: true,
    soundFx: false,
  });

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // 5 Modal Variants Configuration with Dynamic i18n
  const modalCards: ModalCardInfo[] = useMemo(
    () => [
      {
        id: "confirm",
        title: t.cards.confirm.title,
        badge: t.cards.confirm.badge,
        physicsDescription: t.cards.confirm.desc,
        buttonLabel: t.cards.confirm.buttonLabel,
        icon: <AlertTriangleIcon size={16} />,
        onOpen: () => setIsConfirmOpen(true),
        snippet: t.cards.confirm.snippet,
      },
      {
        id: "form",
        title: t.cards.form.title,
        badge: t.cards.form.badge,
        physicsDescription: t.cards.form.desc,
        buttonLabel: t.cards.form.buttonLabel,
        icon: <UserIcon size={16} />,
        onOpen: () => setIsFormOpen(true),
        snippet: t.cards.form.snippet,
      },
      {
        id: "drawer",
        title: t.cards.drawer.title,
        badge: t.cards.drawer.badge,
        physicsDescription: t.cards.drawer.desc,
        buttonLabel: t.cards.drawer.buttonLabel,
        icon: <SettingsIcon size={16} />,
        onOpen: () => setIsDrawerOpen(true),
        snippet: t.cards.drawer.snippet,
      },
      {
        id: "bottomSheet",
        title: t.cards.bottomSheet.title,
        badge: t.cards.bottomSheet.badge,
        physicsDescription: t.cards.bottomSheet.desc,
        buttonLabel: t.cards.bottomSheet.buttonLabel,
        icon: <CheckIcon size={16} />,
        onOpen: () => setIsBottomSheetOpen(true),
        snippet: t.cards.bottomSheet.snippet,
      },
      {
        id: "media",
        title: t.cards.media.title,
        badge: t.cards.media.badge,
        physicsDescription: t.cards.media.desc,
        buttonLabel: t.cards.media.buttonLabel,
        icon: <ImageIcon size={16} />,
        onOpen: () => setIsMediaOpen(true),
        snippet: t.cards.media.snippet,
      },
    ],
    [t]
  );

  // Filter based on search query
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
    <div className="w-full space-y-10">
      <div className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-2xl border border-zinc-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              {t.clear}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-900/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {t.quickTriggers}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {t.showingCount(filteredList.length, modalCards.length)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {modalCards.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onOpen}
                title={`Open ${item.id}`}
                className="px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition cursor-pointer active:scale-95 shadow-2xs"
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

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

      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t.emptyState(searchQuery)}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t.resetSearch}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-10">
        {filteredList.map((item) => (
          <section
            key={item.id}
            className="flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-4 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 w-full"
          >
            <div className="space-y-2 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {item.title}
                </h2>
                <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                  {item.badge}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                {item.physicsDescription}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-10 px-4 sm:py-14 sm:px-6 rounded-xl sm:rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 min-h-[140px]">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={item.onOpen}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-zinc-800 dark:border-zinc-200"
              >
                {item.icon}
                <span>{item.buttonLabel}</span>
              </motion.button>
              <span className="text-[11px] text-zinc-400 mt-2.5">
                {t.clickToOpenHint}
              </span>
            </div>

            <CodeSnippet code={item.snippet} />
          </section>
        ))}
      </div>

      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={t.cards.confirm.modalTitle}
        description={t.cards.confirm.modalDescription}
        cancelLabel={t.cards.confirm.cancelLabel}
        confirmLabel={t.cards.confirm.confirmLabel}
        confirmVariant="danger"
        onConfirm={() => {
          showFeedback(t.cards.confirm.feedbackMsg);
        }}
      />

      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={t.cards.form.modalTitle}
        subtitle={t.cards.form.modalSubtitle}
        labels={t.cards.form.labels}
        placeholders={t.cards.form.placeholders}
        cancelLabel={t.cards.form.cancelLabel}
        saveLabel={t.cards.form.saveLabel}
        onSubmit={(values) => {
          showFeedback(t.cards.form.feedbackMsg(values.name, values.email));
        }}
      />

      <ModalDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t.cards.drawer.modalTitle}
        subtitle={t.cards.drawer.modalSubtitle}
        closeLabel={t.cards.drawer.closeLabel}
        saveLabel={t.cards.drawer.saveLabel}
        onSave={() => {
          showFeedback(t.cards.drawer.feedbackMsg);
        }}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {t.cards.drawer.setting1Title}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t.cards.drawer.setting1Desc}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDrawerSettings({ ...drawerSettings, darkMode: !drawerSettings.darkMode })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                drawerSettings.darkMode ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  drawerSettings.darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {t.cards.drawer.setting2Title}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t.cards.drawer.setting2Desc}
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
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                drawerSettings.notifications ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  drawerSettings.notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800/80 dark:bg-zinc-950/40">
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {t.cards.drawer.setting3Title}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t.cards.drawer.setting3Desc}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDrawerSettings({ ...drawerSettings, soundFx: !drawerSettings.soundFx })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                drawerSettings.soundFx ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  drawerSettings.soundFx ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </ModalDrawer>

      <ModalBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={t.cards.bottomSheet.modalTitle}
        subtitle={t.cards.bottomSheet.modalSubtitle}
        closeLabel={t.cards.bottomSheet.closeLabel}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => {
              showFeedback(t.cards.bottomSheet.option1Feedback);
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400 mb-2.5">
              <ImageIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {t.cards.bottomSheet.option1Title}
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              {t.cards.bottomSheet.option1Desc}
            </p>
          </div>

          <div
            onClick={() => {
              showFeedback(t.cards.bottomSheet.option2Feedback);
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 mb-2.5">
              <CheckIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {t.cards.bottomSheet.option2Title}
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              {t.cards.bottomSheet.option2Desc}
            </p>
          </div>

          <div
            onClick={() => {
              showFeedback(t.cards.bottomSheet.option3Feedback);
              setIsBottomSheetOpen(false);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 hover:bg-zinc-100 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-800/50 cursor-pointer transition active:scale-95 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400 mb-2.5">
              <SettingsIcon size={20} />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {t.cards.bottomSheet.option3Title}
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              {t.cards.bottomSheet.option3Desc}
            </p>
          </div>
        </div>
      </ModalBottomSheet>

      <ModalMedia
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
        alt={t.cards.media.alt}
        title={t.cards.media.mediaTitle}
        caption={t.cards.media.caption}
      />
    </div>
  );
}

export default ModalDemo;
