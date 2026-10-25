import { useTranslation } from "react-i18next";
import { ModalDemo } from "./ModalDemo";

export function ModalAnimationPage() {
  const { t, i18n } = useTranslation();
  const isId = i18n.language === "id";

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.modalDemo.badge", isId ? "Dialog & Overlay" : "Dialog & Overlay")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.modalDemo.pageTitle", "Modal / Pop-up Dialog")}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t(
            "content.modalDemo.pageDesc",
            isId
              ? "Koleksi komponen modal dialog interaktif dengan animasi fisika Framer Motion, efek backdrop blur, penutupan via klik backdrop & tombol Escape, serta dukungan arsitektur CVA modular."
              : "An interactive modal dialog component architecture powered by Framer Motion spring physics, blur backdrop effects, dismiss on backdrop click & Escape key, with modular CVA support."
          )}
        </p>
      </div>

      {/* Component & Usage Snippets */}
      <section className="space-y-6">
        <ModalDemo />
      </section>

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
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">isOpen</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs text-rose-500 font-semibold">required</td>
                <td className="px-4 py-2.5">
                  {isId ? "Mengontrol status visibilitas dialog modal." : "Controls modal visibility state (open or closed)."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onClose</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">() =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs text-rose-500 font-semibold">required</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Callback saat modal ditutup melalui klik backdrop, tombol X, atau tombol Escape."
                    : "Callback invoked when modal closes via backdrop click, close button, or Escape key."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"confirm" | "form" | "drawer" | "sheet" | "media" | "default"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"confirm"</td>
                <td className="px-4 py-2.5">
                  {isId
                    ? "Varian jenis modal yang dirender pada komponen AnimatedModal."
                    : "Modal architecture layout variant rendered by AnimatedModal."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"sm" | "md" | "lg" | "xl" | "full"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"md"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Mengatur batas lebar maksimal dialog panel (CVA)." : "Sets maximum width threshold for the modal panel."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">title</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"Konfirmasi Tindakan"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Judul utama yang ditampilkan pada header dialog." : "Header title text for the dialog."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">description</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId ? "Deskripsi atau pesan penjelasan detail isi modal." : "Body description text explaining the modal action."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">confirmVariant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"danger" | "primary" | "warning"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"danger"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Aksen warna tombol konfirmasi utama." : "Accent styling theme of the primary confirmation button."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">confirmLabel</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"Konfirmasi"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Teks label pada tombol aksi konfirmasi." : "Label text for the confirmation action button."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">cancelLabel</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"Batal"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Teks label pada tombol batal/tutup sekunder." : "Label text for the secondary cancel/dismiss button."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onConfirm</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">() =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId ? "Callback yang dieksekusi saat tombol konfirmasi diklik." : "Callback fired when the user clicks confirm."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">backdropVariant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"default" | "dark" | "blur" | "transparent"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">
                  {isId ? "Gaya intensitas transparansi dan blur latar belakang." : "Translucency and blur effect preset for the backdrop overlay."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">closeOnBackdropClick</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">
                  {isId ? "Menutup modal saat area latar belakang diklik." : "Dismisses dialog when user clicks outside on the backdrop."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">closeOnEscape</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">true</td>
                <td className="px-4 py-2.5">
                  {isId ? "Menutup modal saat tombol keyboard Escape ditekan." : "Closes dialog automatically when Escape key is pressed."}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">
                  {isId ? "Class utilitas Tailwind CSS tambahan (cn)." : "Additional Tailwind CSS classes merged via cn()."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModalAnimationPage;
