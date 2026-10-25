import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  useToast,
  ToastTrigger,
  ToastButton,
  ToastSpinner,
  ToastType,
  ToastPosition,
} from "../../src/components/ToastAnimation";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CloseIcon,
  SearchIcon,
} from "../../src/icons";
import { CodeSnippet } from "../components/CodeSnippet";

interface ToastCardInfo {
  type: ToastType;
  title: string;
  badge: string;
  physicsDescription: string;
  buttonLabel: string;
  snippet: string;
  defaultTitle: string;
  defaultMessage: string;
  trigger: () => void;
  accentColor: string;
}

const POSITION_OPTIONS: { id: ToastPosition; label: string }[] = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

export function ToastDemo() {
  const { t } = useTranslation();
  const { toasts, toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<ToastPosition>("bottom-right");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const toastItems: ToastCardInfo[] = useMemo(
    () => [
      {
        type: "info",
        title: t("content.toastDemo.items.info.title", "1. Default / Info (ToastInfo)"),
        badge: t("content.toastDemo.items.info.badge", "Slide-in Spring"),
        physicsDescription: t(
          "content.toastDemo.items.info.desc",
          "Notifikasi standar dengan palet warna netral dan ikon informatif. Meluncur mulus dari sudut anchor menggunakan spring physics fluida."
        ),
        buttonLabel: t("content.toastDemo.items.info.buttonLabel", "Trigger Info Toast"),
        defaultTitle: t("content.toastDemo.items.info.toastTitle", "System Notification"),
        defaultMessage: t(
          "content.toastDemo.items.info.toastMessage",
          "Data updates have been successfully synchronized to the local server."
        ),
        accentColor: "blue",
        snippet: `// Opsi 1: Panggil via Hook useToast()
const { toast } = useToast();
toast.info("Data updates have been successfully synchronized.", {
  title: "System Notification",
  position: "${selectedPosition}",
  duration: 4000,
});

// Opsi 2: Deklaratif via <ToastTrigger />
<ToastTrigger
  variant="info"
  toastType="info"
  toastTitle="System Notification"
  toastMessage="Data updates have been successfully synchronized."
  toastPosition="${selectedPosition}"
>
  Trigger Info
</ToastTrigger>`,
        trigger: () => {
          toast.info(
            t(
              "content.toastDemo.items.info.toastMessage",
              "Data updates have been successfully synchronized to the local server."
            ),
            {
              title: t("content.toastDemo.items.info.toastTitle", "System Notification"),
              position: selectedPosition,
              duration: 4000,
            }
          );
        },
      },
      {
        type: "success",
        title: t("content.toastDemo.items.success.title", "2. Success (ToastSuccess)"),
        badge: t("content.toastDemo.items.success.badge", "Pop / Spring Bounce"),
        physicsDescription: t(
          "content.toastDemo.items.success.desc",
          "Umpan balik keberhasilan dengan aksen hijau emerald dan ikon centang. Dilengkapi animasi Pop / Scale-up elastis berpegas (spring bounce)."
        ),
        buttonLabel: t("content.toastDemo.items.success.buttonLabel", "Trigger Success Toast"),
        defaultTitle: t("content.toastDemo.items.success.toastTitle", "Saved Successfully!"),
        defaultMessage: t(
          "content.toastDemo.items.success.toastMessage",
          "Your profile changes have been successfully updated to the database."
        ),
        accentColor: "emerald",
        snippet: `// Opsi 1: Panggil via Hook useToast()
const { toast } = useToast();
toast.success("Profile changes have been saved.", {
  title: "Saved Successfully!",
  position: "${selectedPosition}",
  duration: 4000,
});

// Opsi 2: Deklaratif via <ToastTrigger />
<ToastTrigger
  variant="success"
  toastType="success"
  toastTitle="Saved Successfully!"
  toastMessage="Profile changes have been saved."
  toastPosition="${selectedPosition}"
>
  Trigger Success
</ToastTrigger>`,
        trigger: () => {
          toast.success(
            t(
              "content.toastDemo.items.success.toastMessage",
              "Your profile changes have been successfully updated to the database."
            ),
            {
              title: t("content.toastDemo.items.success.toastTitle", "Saved Successfully!"),
              position: selectedPosition,
              duration: 4000,
            }
          );
        },
      },
      {
        type: "error",
        title: t("content.toastDemo.items.error.title", "3. Error / Destructive (ToastError)"),
        badge: t("content.toastDemo.items.error.badge", "Rapid Shake Keyframes"),
        physicsDescription: t(
          "content.toastDemo.items.error.desc",
          "Peringatan kesalahan dengan aksen merah rose. Masuk secara cepat diiringi efek getaran mikro horizontal (shake keyframes) untuk menarik fokus pengguna seketika."
        ),
        buttonLabel: t("content.toastDemo.items.error.buttonLabel", "Trigger Error Toast"),
        defaultTitle: t("content.toastDemo.items.error.toastTitle", "Processing Failed"),
        defaultMessage: t(
          "content.toastDemo.items.error.toastMessage",
          "Connection to the payment gateway timed out. Please try again."
        ),
        accentColor: "rose",
        snippet: `// Opsi 1: Panggil via Hook useToast()
const { toast } = useToast();
toast.error("Failed to connect to the payment gateway.", {
  title: "Payment Error",
  position: "${selectedPosition}",
  duration: 4500,
});

// Opsi 2: Deklaratif via <ToastTrigger />
<ToastTrigger
  variant="error"
  toastType="error"
  toastTitle="Payment Error"
  toastMessage="Failed to connect to the payment gateway."
  toastPosition="${selectedPosition}"
>
  Trigger Error
</ToastTrigger>`,
        trigger: () => {
          toast.error(
            t(
              "content.toastDemo.items.error.toastMessage",
              "Connection to the payment gateway timed out. Please try again."
            ),
            {
              title: t("content.toastDemo.items.error.toastTitle", "Processing Failed"),
              position: selectedPosition,
              duration: 4500,
            }
          );
        },
      },
      {
        type: "action",
        title: t("content.toastDemo.items.action.title", "4. Action / Undo (ToastAction)"),
        badge: t("content.toastDemo.items.action.badge", "Tactile Action Button"),
        physicsDescription: t(
          "content.toastDemo.items.action.desc",
          "Notifikasi interaktif berketinggian elevasi halus yang memuat tombol aksi sekunder taktil (misal 'Undo' atau 'Retry') untuk membatalkan operasi secara instan."
        ),
        buttonLabel: t("content.toastDemo.items.action.buttonLabel", "Trigger Action Toast"),
        defaultTitle: t("content.toastDemo.items.action.toastTitle", "Item Deleted"),
        defaultMessage: t(
          "content.toastDemo.items.action.toastMessage",
          "File 'design-system-v2.fig' was moved to the trash bin."
        ),
        accentColor: "amber",
        snippet: `// Opsi 1: Panggil via Hook useToast()
const { toast } = useToast();
toast.action(
  "File 'design-system-v2.fig' moved to trash.",
  {
    label: "Undo",
    onClick: (toastId) => {
      console.log("Action reversed for id:", toastId);
    },
  },
  {
    title: "Item Deleted",
    position: "${selectedPosition}",
    duration: 5500,
  }
);

// Opsi 2: Deklaratif via <ToastTrigger />
<ToastTrigger
  variant="action"
  toastType="action"
  toastTitle="Item Deleted"
  toastMessage="File moved to trash."
  toastPosition="${selectedPosition}"
  toastAction={{
    label: "Undo",
    onClick: (id) => console.log("Undo file delete", id),
  }}
>
  Trigger Action
</ToastTrigger>`,
        trigger: () => {
          toast.action(
            t(
              "content.toastDemo.items.action.toastMessage",
              "File 'design-system-v2.fig' was moved to the trash bin."
            ),
            {
              label: t("content.toastDemo.items.action.actionLabel", "Undo"),
              onClick: (toastId) => {
                const msg = t(
                  "content.toastDemo.items.action.actionFeedback",
                  "Action undone! File has been restored."
                );
                setActionFeedback(msg);
                toast.success(msg, {
                  title: t("common.success", "Restored"),
                  position: selectedPosition,
                  duration: 3000,
                });
              },
            },
            {
              title: t("content.toastDemo.items.action.toastTitle", "Item Deleted"),
              position: selectedPosition,
              duration: 5500,
            }
          );
        },
      },
      {
        type: "promise",
        title: t("content.toastDemo.items.promise.title", "5. Promise / Loading (ToastPromise)"),
        badge: t("content.toastDemo.items.promise.badge", "Dynamic State Morphing"),
        physicsDescription: t(
          "content.toastDemo.items.promise.desc",
          "Transisi siklus hidup asinkron seamless. Toast diawali status 'Loading' dengan spinner mikro, lalu secara dinamis bermutasi bentuk (morph) menjadi 'Success' saat Promise terselesaikan."
        ),
        buttonLabel: t("content.toastDemo.items.promise.buttonLabel", "Run Promise Simulation"),
        defaultTitle: t("content.toastDemo.items.promise.loadingTitle", "Uploading File..."),
        defaultMessage: t(
          "content.toastDemo.items.promise.loadingMessage",
          "Processing and transferring file to cloud storage..."
        ),
        accentColor: "blue",
        snippet: `// Opsi 1: Panggil via Hook useToast()
const { toast } = useToast();
const uploadTask = new Promise((resolve) => setTimeout(resolve, 2000));

toast.promise(
  uploadTask,
  {
    loading: { title: "Uploading...", message: "Sending 2.4 MB file..." },
    success: { title: "Success!", message: "File uploaded successfully." },
    error: { title: "Failed", message: "Network error occurred." },
  },
  { position: "${selectedPosition}" }
);

// Opsi 2: Deklaratif via <ToastTrigger />
<ToastTrigger
  variant="promise"
  toastType="promise"
  toastPosition="${selectedPosition}"
  toastPromiseTask={() => new Promise((resolve) => setTimeout(resolve, 2000))}
  toastPromiseMessages={{
    loading: { title: "Uploading...", message: "Sending file..." },
    success: { title: "Success!", message: "File uploaded." },
    error: { title: "Failed", message: "Network error." },
  }}
>
  Run Promise Task
</ToastTrigger>`,
        trigger: () => {
          const fakeUploadPromise = new Promise<{ fileName: string; size: string }>(
            (resolve) => {
              setTimeout(() => {
                resolve({ fileName: "brand-assets-v4.zip", size: "2.4 MB" });
              }, 2000);
            }
          );

          toast.promise(
            fakeUploadPromise,
            {
              loading: {
                title: t("content.toastDemo.items.promise.loadingTitle", "Uploading File..."),
                message: t(
                  "content.toastDemo.items.promise.loadingMessage",
                  "Processing and transferring file to cloud storage..."
                ),
              },
              success: (data) => ({
                title: t("content.toastDemo.items.promise.successTitle", "Upload Complete!"),
                message: t(
                  "content.toastDemo.items.promise.successMessage",
                  `File ${data.size} uploaded successfully and ready to share.`
                ),
              }),
              error: {
                title: t("content.toastDemo.items.promise.errorTitle", "Upload Failed"),
                message: t(
                  "content.toastDemo.items.promise.errorMessage",
                  "An error occurred while uploading the file."
                ),
              },
            },
            {
              position: selectedPosition,
            }
          );
        },
      },
    ],
    [t, toast, selectedPosition]
  );

  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return toastItems;
    return toastItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.physicsDescription.toLowerCase().includes(q)
    );
  }, [toastItems, searchQuery]);

  return (
    <div className="w-full space-y-10">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t(
            "content.toastDemo.searchPlaceholder",
            "Search toast variants (e.g. 'info', 'success', 'error', 'action', 'promise')..."
          )}
          className="w-full rounded-2xl border border-zinc-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            {t("content.toastDemo.clearSearch", "✕ Clear")}
          </button>
        )}
      </div>

      {/* Global Position Configurator */}
      <div className="sticky top-16 md:top-20 z-30 p-5 sm:p-6 rounded-3xl border border-zinc-200/80 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Global Position Configurator
              </h3>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100/70 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">
                Anchor: {selectedPosition}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Pilih posisi layar. Seluruh pemicu toast dan kode contoh akan otomatis tersinkronisasi ke titik koordinat ini.
            </p>
          </div>

          {toasts.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => toast.dismissAll()}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 transition cursor-pointer"
            >
              {t("content.toastDemo.dismissAll", "Dismiss All")} ({toasts.length})
            </motion.button>
          )}
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {POSITION_OPTIONS.map((pos) => {
            const isSelected = selectedPosition === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => setSelectedPosition(pos.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  isSelected
                    ? "bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:text-zinc-400 dark:border-zinc-700/70 dark:hover:bg-zinc-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isSelected ? "bg-emerald-400" : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                />
                <span>{pos.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      

      {/* Action feedback bar */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/70 text-xs font-medium shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>{actionFeedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionFeedback(null)}
              className="p-1 rounded text-emerald-600 hover:bg-emerald-100/70 dark:text-emerald-400 dark:hover:bg-emerald-900/60 cursor-pointer"
            >
              <CloseIcon size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t("content.toastDemo.emptySearch", 'No toast variants found matching "{{query}}"', {
              query: searchQuery,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.toastDemo.resetSearch", "Reset search")}
          </button>
        </div>
      )}

      {/* Cards list */}
      <div className="flex flex-col gap-10">
        {filteredList.map((item) => (
          <section
            key={item.type}
            className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 w-full"
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

            <div className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6 min-h-[140px]">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={item.trigger}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer ${
                  item.type === "success"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.25)]"
                    : item.type === "error"
                    ? "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]"
                    : item.type === "promise"
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_14px_rgba(59,130,246,0.25)]"
                    : "bg-white text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-2xs"
                }`}
              >
                {item.type === "info" && <InfoIcon size={16} className="text-blue-500" />}
                {item.type === "success" && <CheckCircleIcon size={16} />}
                {item.type === "error" && <AlertTriangleIcon size={16} />}
                {item.type === "action" && <InfoIcon size={16} className="text-amber-500" />}
                {item.type === "promise" && <ToastSpinner className="w-4 h-4 text-current" />}
                <span>{item.buttonLabel}</span>
              </motion.button>
              <span className="text-[11px] text-zinc-400 mt-2.5">
                * Click to trigger notification at{" "}
                <strong className="font-mono text-zinc-600 dark:text-zinc-300">
                  {selectedPosition}
                </strong>
              </span>
            </div>

            <CodeSnippet code={item.snippet} />
          </section>
        ))}
      </div>

      {/* Props API Reference */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Props API Reference
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2.5">Prop</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Default</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"info" | "success" | "error" | "action" | "promise"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"info"</td>
                <td className="px-4 py-2.5">Tema visual warna, status ikon, aksen border, dan feedback animasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">title</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Judul tebal yang disematkan di baris atas notifikasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">message</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"Notification triggered successfully."</td>
                <td className="px-4 py-2.5">Pesan deskripsi isi notifikasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">position</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"bottom-right"</td>
                <td className="px-4 py-2.5">Posisi anchor layar spesifik untuk notifikasi ini.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">duration</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number (ms)</td>
                <td className="px-4 py-2.5 font-mono text-xs">4000</td>
                <td className="px-4 py-2.5">Durasi tampil otomatis sebelum toast dismiss (0 untuk manual).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">action</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">&#123; label: string, onClick: () =&gt; void &#125;</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Konfigurasi label dan callback untuk tombol aksi sekunder interaktif.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class tambahan Tailwind CSS yang digabungkan via cn().</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToastDemo;
