import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloseIcon,
  AlertTriangleIcon,
  SettingsIcon,
  UserIcon,
  MailIcon,
} from "../../icons";
import { cn } from "../../utils/cn";

/* =========================================================================
 * 1. BASE MODAL INTERFACES & BACKDROP
 * ========================================================================= */

export interface BaseModalProps {
  /** Status keterbukaan modal */
  isOpen: boolean;
  /** Callback saat modal ditutup (klik backdrop, tombol X, atau tombol Escape) */
  onClose: () => void;
  /** Apakah tombol Escape dapat menutup modal (default: true) */
  closeOnEscape?: boolean;
  /** Apakah mengklik area backdrop transparan dapat menutup modal (default: true) */
  closeOnBackdropClick?: boolean;
  /** Class styling kustom untuk elemen backdrop */
  backdropClassName?: string;
}

/* =========================================================================
 * 2. BODY SCROLL LOCK & ESCAPE KEY HOOK
 * ========================================================================= */

function useModalAccessibility(
  isOpen: boolean,
  onClose: () => void,
  closeOnEscape: boolean = true
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
}

/* =========================================================================
 * 3. VARIANT 1: STANDARD CONFIRMATION (ModalConfirm)
 * Alert klasik di tengah layar dengan ikon peringatan, judul, deskripsi,
 * serta tombol Batal dan Konfirmasi.
 * Animasi: Fade in & subtle scale-up.
 * ========================================================================= */

export interface ModalConfirmProps extends BaseModalProps {
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** Varian warna tombol konfirmasi: 'danger' (merah rose) atau 'primary' (gelap/biru) */
  confirmVariant?: "danger" | "primary";
}

export function ModalConfirm({
  isOpen,
  onClose,
  title,
  description,
  cancelLabel = "Batal",
  confirmLabel = "Konfirmasi",
  onConfirm,
  confirmVariant = "danger",
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropClassName,
}: ModalConfirmProps) {
  useModalAccessibility(isOpen, onClose, closeOnEscape);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Transparan / Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (closeOnBackdropClick) onClose();
            }}
            className={cn(
              "fixed inset-0 bg-neutral-950/60 backdrop-blur-xs",
              backdropClassName
            )}
          />

          {/* Kotak Modal Dialog */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10"
          >
            {/* Ikon Peringatan & Judul */}
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl",
                  confirmVariant === "danger"
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/60"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/70 dark:border-amber-900/60"
                )}
              >
                <AlertTriangleIcon size={22} />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Tombol X Tutup */}
              <button
                type="button"
                aria-label="Tutup modal"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            {/* Tombol Aksi Bawah (Footer) */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/70">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition cursor-pointer active:scale-95",
                  confirmVariant === "danger"
                    ? "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 shadow-[0_4px_14px_rgba(244,63,94,0.25)]"
                    : "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================================
 * 4. VARIANT 2: FORM DIALOG (ModalForm)
 * Modal formulir interaktif dengan Header (tombol X), Form Body (Nama, Email, dsb),
 * dan Footer tombol Simpan / Batal.
 * ========================================================================= */

export interface ModalFormProps extends BaseModalProps {
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  saveLabel?: string;
  initialValues?: {
    name?: string;
    email?: string;
    role?: string;
  };
  labels?: {
    name?: string;
    email?: string;
    role?: string;
  };
  placeholders?: {
    name?: string;
    email?: string;
  };
  onSubmit: (values: { name: string; email: string; role: string }) => void;
}

export function ModalForm({
  isOpen,
  onClose,
  title,
  subtitle,
  cancelLabel = "Batal",
  saveLabel = "Simpan Perubahan",
  initialValues = { name: "Arya Wijaya", email: "arya@example.com", role: "Design Architect" },
  labels = { name: "Nama Lengkap", email: "Alamat Email", role: "Peran / Role" },
  placeholders = { name: "Masukkan nama Anda", email: "nama@perusahaan.com" },
  onSubmit,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropClassName,
}: ModalFormProps) {
  useModalAccessibility(isOpen, onClose, closeOnEscape);

  const [formData, setFormData] = React.useState(initialValues);

  // Reset form ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData(initialValues);
    }
  }, [isOpen, initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as { name: string; email: string; role: string });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Transparan / Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (closeOnBackdropClick) onClose();
            }}
            className={cn(
              "fixed inset-0 bg-neutral-950/60 backdrop-blur-xs",
              backdropClassName
            )}
          />

          {/* Kotak Modal Form */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10"
          >
            {/* Header Form */}
            <div className="flex items-start justify-between border-b border-neutral-200/80 px-6 py-5 dark:border-neutral-800/80">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Tutup form"
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            {/* Body Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 p-6">
                {/* Field Nama */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    <UserIcon size={14} className="text-neutral-500" />
                    <span>{labels.name}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={placeholders.name}
                    className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-2xs"
                  />
                </div>

                {/* Field Email */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    <MailIcon size={14} className="text-neutral-500" />
                    <span>{labels.email}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={placeholders.email}
                    className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-2xs"
                  />
                </div>

                {/* Field Role / Peran */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    <SettingsIcon size={14} className="text-neutral-500" />
                    <span>{labels.role}</span>
                  </label>
                  <select
                    value={formData.role || "Design Architect"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200/90 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-950 dark:text-neutral-100 transition shadow-2xs cursor-pointer"
                  >
                    <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                    <option value="Design Architect">Design Architect</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Full-stack Developer">Full-stack Developer</option>
                  </select>
                </div>
              </div>

              {/* Footer Form */}
              <div className="flex items-center justify-end gap-3 border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-4 dark:border-neutral-800/80 dark:bg-neutral-950/40">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
                >
                  {cancelLabel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xs transition cursor-pointer active:scale-95"
                >
                  {saveLabel}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================================
 * 5. VARIANT 3: RIGHT SLIDE-OVER / DRAWER (ModalDrawer)
 * Panel modal yang meluncur (slide in) dari sisi kanan layar menutupi 100%
 * tinggi layar (full height), biasa dipakai untuk menu Settings atau Filter.
 * ========================================================================= */

export interface ModalDrawerProps extends BaseModalProps {
  title: string;
  subtitle?: string;
  closeLabel?: string;
  saveLabel?: string;
  onSave?: () => void;
  children?: React.ReactNode;
}

export function ModalDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  closeLabel = "Tutup Panel",
  saveLabel = "Terapkan Pengaturan",
  onSave,
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropClassName,
}: ModalDrawerProps) {
  useModalAccessibility(isOpen, onClose, closeOnEscape);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Transparan / Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (closeOnBackdropClick) onClose();
            }}
            className={cn(
              "fixed inset-0 bg-neutral-950/60 backdrop-blur-xs",
              backdropClassName
            )}
          />

          {/* Drawer Sheet 100% Height */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-md flex-col border-l border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10"
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 px-6 py-5 dark:border-neutral-800/80">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <SettingsIcon size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup drawer"
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            {/* Scrollable Body Drawer */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {children}
            </div>

            {/* Footer Drawer */}
            <div className="flex items-center justify-end gap-3 border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-4 dark:border-neutral-800/80 dark:bg-neutral-950/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
              >
                {closeLabel}
              </button>
              {onSave && (
                <button
                  type="button"
                  onClick={() => {
                    onSave();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer active:scale-95"
                >
                  {saveLabel}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================================
 * 6. VARIANT 4: BOTTOM SHEET (ModalBottomSheet)
 * Modal yang meluncur naik dari BAWAH layar. Desain melengkung di bagian
 * atas (rounded-t-2xl / rounded-t-3xl) menempel di dasar layar dengan drag handle.
 * ========================================================================= */

export interface ModalBottomSheetProps extends BaseModalProps {
  title: string;
  subtitle?: string;
  closeLabel?: string;
  children?: React.ReactNode;
}

export function ModalBottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  closeLabel = "Tutup",
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropClassName,
}: ModalBottomSheetProps) {
  useModalAccessibility(isOpen, onClose, closeOnEscape);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop Transparan / Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (closeOnBackdropClick) onClose();
            }}
            className={cn(
              "fixed inset-0 bg-neutral-950/60 backdrop-blur-xs",
              backdropClassName
            )}
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-t-3xl border-t border-x border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800/90 dark:bg-neutral-900 z-10 overflow-hidden"
          >
            {/* Drag Handle Bar Indicator */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            {/* Header Sheet */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 px-6 py-4 dark:border-neutral-800/80">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Tutup sheet"
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            {/* Scrollable Body Sheet */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer Sheet */}
            <div className="flex items-center justify-end border-t border-neutral-200/80 bg-neutral-50/70 px-6 py-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition cursor-pointer active:scale-95"
              >
                {closeLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================================
 * 7. VARIANT 5: MEDIA LIGHTBOX (ModalMedia)
 * Modal khusus untuk menampilkan gambar atau video. Backdrop lebih gelap
 * pekat (bg-black/90), tanpa border tebal, gambar muncul dengan efek zoom/spring physics.
 * ========================================================================= */

export interface ModalMediaProps extends BaseModalProps {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export function ModalMedia({
  isOpen,
  onClose,
  src,
  alt = "Pratinjau Media",
  title,
  caption,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropClassName,
}: ModalMediaProps) {
  useModalAccessibility(isOpen, onClose, closeOnEscape);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop Sangat Gelap Khusus Media (bg-black/90) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (closeOnBackdropClick) onClose();
            }}
            className={cn("fixed inset-0 bg-black/90 backdrop-blur-md", backdropClassName)}
          />

          {/* Tombol Tutup Mengambang Top-Right */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            aria-label="Tutup lightbox"
            onClick={onClose}
            className="fixed top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/80 text-white backdrop-blur-md hover:bg-neutral-800 border border-neutral-700/60 shadow-lg transition cursor-pointer active:scale-95"
          >
            <CloseIcon size={20} />
          </motion.button>

          {/* Konten Lightbox Media */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.78, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex flex-col items-center max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl bg-neutral-950 flex items-center justify-center">
              <img
                src={src}
                alt={alt}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl select-none"
              />
            </div>

            {/* Caption & Title Keterangan Media */}
            {(title || caption) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-3 w-full rounded-xl bg-neutral-900/85 px-4 py-3 text-center backdrop-blur-md border border-neutral-800/80"
              >
                {title && (
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {title}
                  </h4>
                )}
                {caption && (
                  <p className="mt-0.5 text-xs text-neutral-400">
                    {caption}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
