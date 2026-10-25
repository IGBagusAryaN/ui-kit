import { useTranslation } from "react-i18next";
import { ToastDemo } from "./ToastDemo";

export function ToastAnimationPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-16">
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

      <section className="space-y-6">
        <ToastDemo />
      </section>
    </div>
  );
}

export default ToastAnimationPage;
