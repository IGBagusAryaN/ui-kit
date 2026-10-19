import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useToast, ToastType } from "../../src/components/ToastAnimation";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CloseIcon,
  SearchIcon,
} from "../../src/icons";
import { cn } from "../../src/utils/cn";

interface ToastCardInfo {
  type: ToastType;
  title: string;
  badge: string;
  physicsDescription: string;
  buttonLabel: string;
  snippet: string;
  trigger: () => void;
  accentColor: string;
}

export function ToastDemo() {
  const { t } = useTranslation();
  const { toasts, toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Definisi 5 variasi Toast
  const toastItems: ToastCardInfo[] = useMemo(
    () => [
      {
        type: "info",
        title: t("content.toastDemo.items.info.title", "1. Default / Info (ToastInfo)"),
        badge: t("content.toastDemo.items.info.badge", "Slide-in Bottom-Right"),
        physicsDescription: t(
          "content.toastDemo.items.info.desc",
          "Tampilan notifikasi standar dengan warna netral dan ikon informasi. Animasi meluncur masuk (slide-in) dari sisi kanan bawah layar dengan spring physics halus."
        ),
        buttonLabel: t("content.toastDemo.items.info.buttonLabel", "Picu Toast Info"),
        accentColor: "blue",
        snippet: `toast.info("Pembaruan data berhasil disinkronkan.", {
  title: "Pemberitahuan Sistem",
  duration: 4000,
});`,
        trigger: () => {
          toast.info(
            t(
              "content.toastDemo.items.info.toastMessage",
              "Pembaruan data berhasil disinkronkan ke server lokal."
            ),
            {
              title: t("content.toastDemo.items.info.toastTitle", "Pemberitahuan Sistem"),
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
          "Notifikasi sukses dengan aksen hijau emerald dan ikon centang. Menggunakan animasi Pop / Scale-up dengan sedikit pantulan elastis (spring physics)."
        ),
        buttonLabel: t("content.toastDemo.items.success.buttonLabel", "Picu Toast Success"),
        accentColor: "emerald",
        snippet: `toast.success("Perubahan profil Anda berhasil disimpan.", {
  title: "Berhasil Disimpan!",
  duration: 4000,
});`,
        trigger: () => {
          toast.success(
            t(
              "content.toastDemo.items.success.toastMessage",
              "Perubahan profil Anda telah berhasil diperbarui ke database."
            ),
            {
              title: t(
                "content.toastDemo.items.success.toastTitle",
                "Berhasil Disimpan!"
              ),
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
          "Notifikasi gagal/error dengan aksen merah rose. Masuk dengan cepat disertai efek bergetar (shake) horizontal mikro menggunakan keyframes Framer Motion."
        ),
        buttonLabel: t("content.toastDemo.items.error.buttonLabel", "Picu Toast Error"),
        accentColor: "rose",
        snippet: `toast.error("Koneksi ke gateway pembayaran terputus.", {
  title: "Gagal Memproses Data",
  duration: 4500,
});`,
        trigger: () => {
          toast.error(
            t(
              "content.toastDemo.items.error.toastMessage",
              "Koneksi ke gateway pembayaran terputus. Silakan coba lagi."
            ),
            {
              title: t(
                "content.toastDemo.items.error.toastTitle",
                "Gagal Memproses Data"
              ),
              duration: 4500,
            }
          );
        },
      },
      {
        type: "action",
        title: t("content.toastDemo.items.action.title", "4. Action / Undo (ToastAction)"),
        badge: t("content.toastDemo.items.action.badge", "Tombol Aksi Sekunder"),
        physicsDescription: t(
          "content.toastDemo.items.action.desc",
          "Notifikasi yang dilengkapi tombol aksi sekunder taktil (misal: tombol 'Undo' atau 'Retry') untuk membatalkan aksi pengguna secara cepat."
        ),
        buttonLabel: t("content.toastDemo.items.action.buttonLabel", "Picu Toast Action"),
        accentColor: "amber",
        snippet: `toast.action("Item dipindahkan ke kotak sampah.", {
  label: "Urungkan (Undo)",
  onClick: (id) => handleUndo(id),
}, {
  title: "Item Telah Dihapus",
  duration: 5000,
});`,
        trigger: () => {
          toast.action(
            t(
              "content.toastDemo.items.action.toastMessage",
              "Berkas 'design-system-v2.fig' dipindahkan ke kotak sampah."
            ),
            {
              label: t(
                "content.toastDemo.items.action.actionLabel",
                "Urungkan (Undo)"
              ),
              onClick: () => {
                const msg = t(
                  "content.toastDemo.items.action.actionFeedback",
                  "Aksi dibatalkan! Berkas berhasil dipulihkan."
                );
                setActionFeedback(msg);
                toast.success(msg, {
                  title: "Undo Berhasil",
                  duration: 3000,
                });
              },
            },
            {
              title: t(
                "content.toastDemo.items.action.toastTitle",
                "Item Telah Dihapus"
              ),
              duration: 5000,
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
          "Simulasi proses asinkron. Toast muncul dengan status 'Loading...' disertai spinner, lalu setelah 2 detik berubah wujud secara dinamis (morph) menjadi 'Success'."
        ),
        buttonLabel: t(
          "content.toastDemo.items.promise.buttonLabel",
          "Jalankan Simulasi Promise"
        ),
        accentColor: "indigo",
        snippet: `toast.promise(uploadPromise, {
  loading: { title: "Mengunggah...", message: "Memproses berkas..." },
  success: { title: "Upload Selesai!", message: "Berkas berhasil diunggah." },
  error: { title: "Upload Gagal", message: "Gagal mengunggah berkas." },
});`,
        trigger: () => {
          const fakeAsyncCall = new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });

          toast.promise(fakeAsyncCall, {
            loading: {
              title: t(
                "content.toastDemo.items.promise.loadingTitle",
                "Mengunggah Berkas..."
              ),
              message: t(
                "content.toastDemo.items.promise.loadingMessage",
                "Sedang memproses upload berkas ke cloud storage..."
              ),
            },
            success: {
              title: t(
                "content.toastDemo.items.promise.successTitle",
                "Upload Selesai!"
              ),
              message: t(
                "content.toastDemo.items.promise.successMessage",
                "Berkas 2.4 MB berhasil diunggah dan siap dibagikan."
              ),
            },
            error: {
              title: t(
                "content.toastDemo.items.promise.errorTitle",
                "Upload Gagal"
              ),
              message: t(
                "content.toastDemo.items.promise.errorMessage",
                "Terjadi kesalahan saat mengunggah berkas."
              ),
            },
          });
        },
      },
    ],
    [t, toast]
  );

  // Filter berdasarkan pencarian
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
              "content.toastDemo.searchPlaceholder",
              "Cari variasi toast (contoh: 'info', 'success', 'error', 'undo', 'promise')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.toastDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        {/* Global Action & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t("content.toastDemo.quickTriggers", "Pemicu Cepat (Semua Variasi):")}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">
                {t("content.toastDemo.activeCount", {
                  count: toasts.length,
                  defaultValue: `Toast Aktif: ${toasts.length}`,
                })}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.toastDemo.showingCount", {
                count: filteredList.length,
                total: toastItems.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${toastItems.length} variasi notifikasi Toast.`,
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {toasts.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => toast.dismissAll()}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 transition cursor-pointer"
              >
                {t("content.toastDemo.dismissAll", "Hapus Semua Toast")}
              </motion.button>
            )}

            {/* Quick Trigger Buttons */}
            <div className="flex items-center gap-1.5">
              {toastItems.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={item.trigger}
                  title={`Trigger ${item.type}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95 shadow-2xs"
                >
                  {item.type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action / Undo Feedback Banner */}
        <AnimatePresence>
          {actionFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/70 text-xs font-medium shadow-xs"
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
      </div>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.toastDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan variasi toast dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.toastDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      {/* Unified 2-Column Grid of Toast Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {filteredList.map((item) => (
          <div
            key={item.type}
            className={cn(
              "flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700",
              filteredList.length === 5 && item.type === "promise" ? "md:col-span-2" : ""
            )}
          >
            {/* Header Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[44px]">
                {item.physicsDescription}
              </p>
            </div>

            {/* Interactive Preview Canvas with Trigger Button (flex-1 to cleanly absorb any card height expansion) */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 min-h-[120px] overflow-visible">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={item.trigger}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer ${
                  item.type === "success"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.25)]"
                    : item.type === "error"
                    ? "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]"
                    : item.type === "action"
                    ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                    : item.type === "promise"
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-[0_4px_14px_rgba(59,130,246,0.25)]"
                    : "bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700"
                }`}
              >
                {item.type === "info" && <InfoIcon size={16} />}
                {item.type === "success" && <CheckCircleIcon size={16} />}
                {item.type === "error" && <AlertTriangleIcon size={16} />}
                {item.type === "action" && <InfoIcon size={16} />}
                {item.type === "promise" && (
                  <svg
                    className="w-4 h-4 animate-spin text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                <span>{item.buttonLabel}</span>
              </motion.button>
              <span className="text-[11px] text-neutral-400 mt-2">
                * Klik untuk memicu notifikasi di kanan bawah
              </span>
            </div>

            {/* Usage Code Snippet (Anchored at the bottom with mt-auto) */}
            <div className="mt-auto relative rounded-xl border border-neutral-200/80 bg-neutral-100/70 p-3 font-mono text-xs dark:border-neutral-800/80 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200">
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-sans text-neutral-500 dark:text-neutral-400">
                <span>{t("content.toastDemo.usageSnippet", "Usage Snippet")}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(item.type, item.snippet)}
                  className="hover:text-neutral-800 dark:hover:text-neutral-200 transition cursor-pointer"
                >
                  {copiedId === item.type ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Disalin
                    </span>
                  ) : (
                    "Salin"
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed p-1 m-0">
                <code>{item.snippet}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
