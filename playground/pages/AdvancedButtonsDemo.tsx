import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  PanInfo,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import {
    StarIcon,
  ShieldCheckIcon,
  UnlockIcon,
  SendIcon,
  CopyIcon,
  CheckIcon,
  ZapIcon,
  SparklesIcon,
  GlobeIcon,
  CodeIcon,
} from "../../src/icons";

// ============================================================================
// I18N LOCALIZATION DICTIONARY (ALL 8 ADVANCED BUTTONS)
// ============================================================================
const BUTTONS_DICT = {
  en: {
    pillTag1: "State-Driven & Physics",
    pillTag2: "13 Components",
    pageTitle: "Advanced Animated Buttons",
    pageDescription:
      "A high-end collection of 13 state-driven and physics-powered button architectures engineered with Framer Motion and Tailwind CSS. Built with precision gesture detection, layout morphing, 3D flips, biometric scanning, confetti cannons, origami flight, and orbital action hubs.",
    cards: {
      hold: {
        title: "1. Hold to Confirm",
        badge: "Dual-Layer Clip-Path",
        desc: "Utilizes high-precision pointer events and requestAnimationFrame with a dual-layer clip-path approach to render an organic text color shift and progress fill without layout distortion.",
        snippet: `import { HoldButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <HoldButton
      label="Hold to Confirm"
      confirmedLabel="Confirmed"
      duration={1500}
      onConfirm={() => console.log("Action confirmed")}
    />
  );
}`,
      },
      swipe: {
        title: "2. Swipe to Action",
        badge: "Drag Gesture & Elastic Snap",
        desc: "Horizontal gesture drag slider with dynamic track constraints. Crossing the 80% threshold completes the state and snaps to the end, while releasing midway triggers an elastic spring return.",
        snippet: `import { SwipeButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <SwipeButton
      label="Swipe to Proceed"
      confirmedLabel="Action Completed"
      onConfirm={() => console.log("Transaction processed")}
    />
  );
}`,
      },
      morph: {
        title: "3. Morphing Async Button",
        badge: "Layout Morph & Spinner",
        desc: "Fluid multi-stage state transition (Idle ➔ Loading ➔ Success). The button organically compresses into a circular spinner while awaiting async resolution, then expands into a clean success badge.",
        snippet: `import { MorphingAsyncButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <MorphingAsyncButton
      idleText="Deploy App"
      loadingText="Deploying..."
      successText="Deployed Successfully!"
      onClick={async () => {
        await fetch("/api/deploy");
      }}
    />
  );
}`,
      },
      magnetic: {
        title: "4. Magnetic Cursor Tracking",
        badge: "Spring Physics Magnet",
        desc: "Tracks mouse cursor coordinates relative to the button's bounding box center, applying layered spring physics to both the container and inner typography for a responsive magnetic depth effect.",
        buttonText: "Hover Near Cursor",
        snippet: `import { MagneticButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <MagneticButton strength={0.35} innerStrength={0.2}>
      Hover Near Cursor
    </MagneticButton>
  );
}`,
      },
      pill: {
        title: "5. Expandable Action Pill",
        badge: "Staggered Pill Expand",
        desc: "A compact floating circular action button that smoothly unrolls into a linear pill capsule containing secondary actions with staggered entrance timing and rotation physics.",
        snippet: `import { ExpandableActionPill } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <ExpandableActionPill
      actions={[
        { id: "edit", label: "Edit", icon: <EditIcon /> },
        { id: "share", label: "Share", icon: <ShareIcon /> },
        { id: "bookmark", label: "Bookmark", icon: <BookmarkIcon /> },
        { id: "delete", label: "Delete", icon: <TrashIcon /> },
      ]}
    />
  );
}`,
      },
      doubleConfirm: {
        title: "6. Two-Step Double Confirm Button",
        badge: "Timeout Armed State",
        desc: "Defensive interaction architecture designed to prevent accidental triggers. First click arms a 3-second animated countdown bar; a second click verifies execution.",
        snippet: `import { DoubleConfirmButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <DoubleConfirmButton
      idleText="Delete Repository"
      armedText="Click again to confirm"
      confirmedText="Confirmed!"
      timeoutDuration={3000}
      onConfirm={() => console.log("Repository deleted")}
    />
  );
}`,
      },
      flip: {
        title: "7. 3D Reveal Flip Button",
        badge: "True 3D Spatial Rotation",
        desc: "Executes an authentic 3D card flip using CSS perspective and preserve-3d. Rotates 180 degrees along the X-axis upon interaction to reveal a confirmed state, automatically reverting after 2 seconds.",
        snippet: `import { FlipConfirmButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <FlipConfirmButton
      frontText="Copy Invitation Link"
      backText="Link Copied!"
      onFlip={() => navigator.clipboard.writeText("https://ui.bgsaryzzz.dev")}
    />
  );
}`,
      },
      download: {
        title: "8. Morphing Download Progress Button",
        badge: "Dynamic Progress Fill",
        desc: "Stateful progress button that transitions into an active downloading state, filling an internal horizontal progress layer with live percentage feedback before expanding into a success badge.",
        snippet: `import { DownloadProgressButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <DownloadProgressButton
      idleText="Download SDK Bundle"
      downloadingText="Downloading"
      successText="Download Complete!"
      onComplete={() => console.log("Bundle downloaded")}
    />
  );
}`,
      },
      star: {
        title: "9. Reaction Burst Upvote & Star Counter",
        badge: "Radial Spark & Rolling Counter",
        desc: "High-engagement social micro-interaction modeled after GitHub Star and Twitter/X Like. Clicking triggers a 360-degree radial explosion of 12 luminous sparks, an elastic star pop, and a rolling vertical numerical counter transition.",
        snippet: `import { ReactionBurstButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <ReactionBurstButton
      initialCount={1428}
      label="Star"
      activeLabel="Starred"
      onToggle={(isStarred, count) => console.log(isStarred, count)}
    />
  );
}`,
      },
      biometric: {
        title: "10. Biometric Passkey & Laser Scanner Button",
        badge: "Sonar Pulse & Laser Scanline",
        desc: "Futuristic security authorization button inspired by Apple TouchID/FaceID and WebAuthn passkeys. Displays an animated neon laser scanline traversing a biometric fingerprint icon accompanied by expanding radar sonar rings.",
        snippet: `import { BiometricAuthButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <BiometricAuthButton
      label="Authenticate Passkey"
      scanningLabel="Verifying Biometrics..."
      successLabel="Access Granted"
      onAuthSuccess={() => console.log("Passkey verified")}
    />
  );
}`,
      },
      confetti: {
        title: "11. Celebration Confetti Cannon Copy Button",
        badge: "Physics Particle Cannon",
        desc: "High-delight copy interaction for referral codes and API tokens. Alongside copying to the system clipboard, it fires a dynamic multi-colored confetti cannon using Framer Motion gravity and 3D rotational physics.",
        snippet: `import { CopyConfettiButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <CopyConfettiButton
      textToCopy="ARYA-UI-2026-VIP"
      idleLabel="Copy Referral Code"
      copiedLabel="Referral Code Copied!"
    />
  );
}`,
      },
      origami: {
        title: "12. Origami Paper Airplane Flight Button",
        badge: "3D Origami Fold & Flight Trajectory",
        desc: "Delightful feedback and messaging button. When triggered, the button body smoothly folds along 3D perspective creases into an origami paper airplane, tilts, and launches into the sky with trailing smoke puffs before stamping a confirmed delivery badge.",
        snippet: `import { OrigamiPaperPlaneButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <OrigamiPaperPlaneButton
      idleText="Send Message"
      onSend={() => console.log("Message dispatched")}
    />
  );
}`,
      },
      orbital: {
        title: "13. Gravitational Orbit Satellite Action Hub",
        badge: "Spatial Orbit & Proximity Magnet",
        desc: "Advanced multi-action spatial hub inspired by canvas toolbars (Figma and Linear). A central glowing AI core deploys 4 floating satellite badges (Summarize, Translate, Refactor, Optimize) that orbit around the button and attract toward cursor proximity.",
        snippet: `import { OrbitalActionHubButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <OrbitalActionHubButton
      mainLabel="AI Copilot"
      onSelectAction={(action) => console.log("Selected:", action.label)}
    />
  );
}`,
      },
    },
  },
  id: {
    pillTag1: "Berbasis State & Fisika",
    pillTag2: "13 Komponen",
    pageTitle: "Tombol Animasi Tingkat Lanjut",
    pageDescription:
      "Koleksi premium 13 arsitektur tombol berbasis state dan fisika yang dirancang dengan Framer Motion dan Tailwind CSS. Dibangun dengan deteksi gestur presisi tinggi, perubahan bentuk (morphing) tata letak, pemindaian biometrik, meriam confetti, pesawat origami, dan hub aksi satelit orbital.",
    cards: {
      hold: {
        title: "1. Tahan untuk Konfirmasi (Hold to Confirm)",
        badge: "Dual-Layer Clip-Path",
        desc: "Menggunakan event pointer presisi tinggi dan requestAnimationFrame dengan teknik dual-layer clip-path untuk menghasilkan perubahan warna teks dan pengisian progress secara organik tanpa distorsi tata letak.",
        snippet: `import { HoldButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <HoldButton
      label="Tahan untuk Konfirmasi"
      confirmedLabel="Terkonfirmasi"
      duration={1500}
      onConfirm={() => console.log("Aksi terkonfirmasi")}
    />
  );
}`,
      },
      swipe: {
        title: "2. Geser untuk Aksi (Swipe to Action)",
        badge: "Gestur Seret & Pegas Elastis",
        desc: "Slider gestur horizontal dengan batasan lintasan dinamis. Melewati ambang batas 80% akan menyelesaikan aksi dan mengunci posisi di ujung, sedangkan pelepasan di tengah jalan akan memicu pantulan pegas elastis ke posisi awal.",
        snippet: `import { SwipeButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <SwipeButton
      label="Geser untuk Melanjutkan"
      confirmedLabel="Aksi Selesai"
      onConfirm={() => console.log("Transaksi diproses")}
    />
  );
}`,
      },
      morph: {
        title: "3. Tombol Async Morphing (Morphing Async Button)",
        badge: "Morphing Tata Letak & Spinner",
        desc: "Transisi state multi-tahap yang sangat halus (Idle ➔ Loading ➔ Success). Tombol secara dinamis memadat menjadi lingkaran spinner saat menunggu proses asinkron, lalu melebar menjadi lencana sukses hijau yang elegan.",
        snippet: `import { MorphingAsyncButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <MorphingAsyncButton
      idleText="Deploy Aplikasi"
      loadingText="Mendeploy..."
      successText="Berhasil Dideploy!"
      onClick={async () => {
        await fetch("/api/deploy");
      }}
    />
  );
}`,
      },
      magnetic: {
        title: "4. Pelacak Kursor Magnetik (Magnetic Button)",
        badge: "Magnet Fisika Pegas",
        desc: "Melacak koordinat kursor mouse relatif terhadap pusat bounding box tombol, menerapkan fisika pegas bertingkat pada container dan tipografi di dalamnya untuk menciptakan efek kedalaman magnetik yang responsif.",
        buttonText: "Arahkan Kursor Mendekat",
        snippet: `import { MagneticButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <MagneticButton strength={0.35} innerStrength={0.2}>
      Arahkan Kursor Mendekat
    </MagneticButton>
  );
}`,
      },
      pill: {
        title: "5. Kapsul Aksi Ekspansif (Expandable Action Pill)",
        badge: "Ekspansi Kapsul Bertahap",
        desc: "Tombol aksi melayang berbentuk lingkaran ringkas yang membuka secara lembut menjadi kapsul horizontal berisi tombol aksi sekunder dengan pewaktuan bertahap (staggered) dan rotasi fisika.",
        snippet: `import { ExpandableActionPill } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <ExpandableActionPill
      actions={[
        { id: "edit", label: "Edit", icon: <EditIcon /> },
        { id: "share", label: "Bagikan", icon: <ShareIcon /> },
        { id: "bookmark", label: "Simpan", icon: <BookmarkIcon /> },
        { id: "delete", label: "Hapus", icon: <TrashIcon /> },
      ]}
    />
  );
}`,
      },
      doubleConfirm: {
        title: "6. Tombol Konfirmasi Ganda (Double Confirm Button)",
        badge: "Batas Waktu State Armed",
        desc: "Arsitektur interaksi defensif untuk mencegah klik yang tidak disengaja. Klik pertama mengaktifkan garis hitung mundur animasi 3 detik; klik kedua mengeksekusi aksi final.",
        snippet: `import { DoubleConfirmButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <DoubleConfirmButton
      idleText="Hapus Repositori"
      armedText="Klik lagi untuk konfirmasi"
      confirmedText="Terkonfirmasi!"
      timeoutDuration={3000}
      onConfirm={() => console.log("Repositori dihapus")}
    />
  );
}`,
      },
      flip: {
        title: "7. Tombol Balik 3D (3D Reveal Flip Button)",
        badge: "Rotasi Ruang 3D Asli",
        desc: "Menjalankan efek pembalikan kartu 3D otentik menggunakan CSS perspective dan preserve-3d. Berputar 180 derajat pada sumbu X untuk menampilkan state sukses, dan kembali otomatis setelah 2 detik.",
        snippet: `import { FlipConfirmButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <FlipConfirmButton
      frontText="Salin Tautan Undangan"
      backText="Tautan Disalin!"
      onFlip={() => navigator.clipboard.writeText("https://ui.bgsaryzzz.dev")}
    />
  );
}`,
      },
      download: {
        title: "8. Tombol Progres Unduhan (Download Progress Button)",
        badge: "Pengisian Progress Dinamis",
        desc: "Tombol berbasis state yang berubah menjadi mode proses pengunduhan, mengisi layer progres horizontal dengan persentase real-time sebelum bertransformasi menjadi lencana sukses hijau.",
        snippet: `import { DownloadProgressButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <DownloadProgressButton
      idleText="Unduh Paket SDK"
      downloadingText="Mengunduh"
      successText="Unduhan Selesai!"
      onComplete={() => console.log("Paket berhasil diunduh")}
    />
  );
}`,
      },
      star: {
        title: "9. Tombol Bintang / Upvote dengan Ledakan Partikel (Reaction Burst)",
        badge: "Percikan 360° & Counter Bergulir",
        desc: "Mikro-interaksi sosial tingkat tinggi ala GitHub Star dan Twitter/X Like. Saat diklik, tombol menembakkan 12 partikel percikan emas radial 360 derajat, memantulkan ikon bintang secara elastis, dan menggulirkan angka counter secara vertikal.",
        snippet: `import { ReactionBurstButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <ReactionBurstButton
      initialCount={1428}
      label="Bintang"
      activeLabel="Berbintang"
      onToggle={(isStarred, count) => console.log(isStarred, count)}
    />
  );
}`,
      },
      biometric: {
        title: "10. Pemindai Biometrik & Passkey Laser (Biometric Scanner)",
        badge: "Gelombang Sonar & Sinar Laser",
        desc: "Tombol otorisasi keamanan futuristik yang terinspirasi dari Apple TouchID/FaceID dan WebAuthn passkey. Menampilkan sinar laser neon yang menyapu ikon sidik jari secara vertikal disertai gelombang sonar radar melingkar.",
        snippet: `import { BiometricAuthButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <BiometricAuthButton
      label="Otentikasi Passkey"
      scanningLabel="Memindai Biometrik..."
      successLabel="Akses Diberikan!"
      onAuthSuccess={() => console.log("Passkey terverifikasi")}
    />
  );
}`,
      },
      confetti: {
        title: "11. Tombol Salin dengan Meriam Confetti Ceria (Confetti Cannon Copy)",
        badge: "Fisika Partikel Gravitasi 3D",
        desc: "Interaksi penyalinan penuh kepuasan (delight factor) untuk kode promo, token API, atau tautan undangan. Selain menyalin ke papan klip, tombol menembakkan puluhan keping confetti aneka warna yang melayang dengan simulasi gravitasi dan rotasi 3D.",
        snippet: `import { CopyConfettiButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <CopyConfettiButton
      textToCopy="ARYA-UI-2026-VIP"
      idleLabel="Salin Kode Undangan"
      copiedLabel="Kode Berhasil Disalin! 🎉"
    />
  );
}`,
      },
      origami: {
        title: "12. Tombol Pesawat Kertas Origami 3D (Origami Flight)",
        badge: "Lipatan 3D & Jejak Asap Meluncur",
        desc: "Tombol kirim pesan penuh kejutan visual. Saat diklik, bodi tombol melipat secara 3D menjadi pesawat kertas origami, memiringkan sayap, dan melesat terbang ke udara dengan partikel jejak asap sebelum memunculkan stempel sukses terkirim.",
        snippet: `import { OrigamiPaperPlaneButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <OrigamiPaperPlaneButton
      idleText="Kirim Pesan"
      onSend={() => console.log("Pesan diluncurkan")}
    />
  );
}`,
      },
      orbital: {
        title: "13. Hub Aksi Satelit Gravitasi Orbital (Orbital Action Hub)",
        badge: "Orbit Spasial & Magnet Proksimitas",
        desc: "Hub multi-aksi spasial yang terinspirasi dari kanvas desain modern (Figma & Linear). Inti tombol AI di tengah meluncurkan 4 lencana satelit (Ringkas, Terjemahkan, Refactor, Optimasi) yang mengorbit secara halus dan membesar saat didekati kursor.",
        snippet: `import { OrbitalActionHubButton } from "@bgsaryzzz/ui";

export function Example() {
  return (
    <OrbitalActionHubButton
      mainLabel="AI Copilot"
      onSelectAction={(action) => console.log("Dipilih:", action.label)}
    />
  );
}`,
      },
    },
  },
};

// ============================================================================
// 1. <HoldButton /> (Hold to Confirm with Dual-Layer Clip-Path)
// ============================================================================
export interface HoldButtonProps {
  label?: string;
  confirmedLabel?: string;
  duration?: number;
  onConfirm?: () => void;
  className?: string;
}

export function HoldButton({
  label,
  confirmedLabel,
  duration = 1500,
  onConfirm,
  className = "",
}: HoldButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultLabel = lang === "id" ? "Tahan untuk Konfirmasi" : "Hold to Confirm";
  const defaultConfirmed = lang === "id" ? "Terkonfirmasi" : "Confirmed";
  const activeLabel = label ?? defaultLabel;
  const activeConfirmed = confirmedLabel ?? defaultConfirmed;

  const [isHolding, setIsHolding] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isHolding && !isConfirmed) {
      startTimeRef.current = performance.now();

      const updateProgress = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const currentProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(currentProgress);

        if (currentProgress < 100) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
          setIsConfirmed(true);
          setIsHolding(false);
          setProgress(100);
          if (onConfirm) onConfirm();
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (!isConfirmed) {
        setProgress(0);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHolding, isConfirmed, duration, onConfirm]);

  const handlePointerDown = () => {
    if (!isConfirmed) setIsHolding(true);
  };

  const handlePointerUp = () => {
    if (!isConfirmed) setIsHolding(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmed(false);
    setIsHolding(false);
    setProgress(0);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        whileHover={{ scale: isConfirmed ? 1 : 1.02 }}
        whileTap={{ scale: isConfirmed ? 1 : 0.98 }}
        className="relative overflow-hidden rounded-xl border select-none transition-shadow shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-500/40 cursor-pointer disabled:cursor-not-allowed border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex items-center gap-3 px-6 py-3.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-sm">
          <div className="flex items-center text-zinc-400 dark:text-zinc-500">
            {isHolding ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M4.5 10.5H2.25M6.341 6.257L4.75 4.666" />
              </svg>
            )}
          </div>
          <span>{isConfirmed ? activeConfirmed : activeLabel}</span>
        </div>

        <div
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          className={`absolute inset-0 flex items-center gap-3 px-6 py-3.5 font-medium text-sm text-white pointer-events-none transition-colors duration-150 ${
            isConfirmed ? "bg-emerald-500" : "bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900"
          }`}
        >
          <div className="flex items-center">
            {isConfirmed ? (
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4 animate-spin text-white dark:text-zinc-900" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
          </div>
          <span className="whitespace-nowrap">{isConfirmed ? activeConfirmed : activeLabel}</span>
        </div>
      </motion.button>

      <div className="flex items-center gap-2.5 text-xs">
        <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
          {isConfirmed
            ? (lang === "id" ? "Status: Terkonfirmasi" : "Status: Confirmed")
            : isHolding
            ? (lang === "id" ? `Menahan: ${Math.round(progress)}%` : `Holding: ${Math.round(progress)}%`)
            : (lang === "id" ? "Tekan dan tahan untuk konfirmasi" : "Press and hold to confirm")}
        </span>
        {isConfirmed && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 2. <SwipeButton /> (Swipe to Action / Slide to Confirm)
// ============================================================================
export interface SwipeButtonProps {
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
  className?: string;
}

export function SwipeButton({
  label,
  confirmedLabel,
  onConfirm,
  className = "",
}: SwipeButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultLabel = lang === "id" ? "Geser untuk Melanjutkan" : "Swipe to Proceed";
  const defaultConfirmed = lang === "id" ? "Aksi Selesai" : "Action Completed";
  const activeLabel = label ?? defaultLabel;
  const activeConfirmed = confirmedLabel ?? defaultConfirmed;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(200);
  const x = useMotionValue(0);

  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      setMaxDrag(Math.max(60, trackWidth - 44 - 10));
    }
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isConfirmed) return;
    const threshold = maxDrag * 0.8;
    if (info.offset.x >= threshold) {
      setIsConfirmed(true);
      x.set(maxDrag);
      if (onConfirm) onConfirm();
    } else {
      x.set(0);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmed(false);
    x.set(0);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 w-full max-w-sm ${className}`}>
      <div
        ref={trackRef}
        className={`relative w-full h-14 rounded-full p-1.5 overflow-hidden flex items-center select-none border transition-colors ${
          isConfirmed
            ? "bg-zinc-100 dark:bg-zinc-800 border-emerald-500/50"
            : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700/60"
        }`}
      >
        <motion.div
          style={{ width: isConfirmed ? "100%" : x }}
          className={`absolute left-0 top-0 bottom-0 rounded-full transition-colors ${
            isConfirmed ? "bg-emerald-500/20" : "bg-zinc-200/80 dark:bg-zinc-700/50"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
          <span
            className={`text-xs font-semibold tracking-wide transition-colors ${
              isConfirmed
                ? "text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {isConfirmed ? activeConfirmed : activeLabel}
          </span>
        </div>

        <motion.div
          drag={isConfirmed ? false : "x"}
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={{ x: isConfirmed ? maxDrag : 0 }}
          style={{ x }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing transition-colors ${
            isConfirmed
              ? "bg-emerald-500 text-white cursor-default"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          }`}
        >
          {isConfirmed ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          )}
        </motion.div>
      </div>

      {isConfirmed && (
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:underline cursor-pointer"
        >
          {lang === "id" ? "Reset Penggeser" : "Reset Slider"}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// 3. <MorphingAsyncButton /> (Click -> Loading -> Success)
// ============================================================================
export type AsyncButtonStatus = "idle" | "loading" | "success";

export interface MorphingAsyncButtonProps {
  idleText?: string;
  loadingText?: string;
  successText?: string;
  onClick?: () => Promise<void> | void;
  className?: string;
}

export function MorphingAsyncButton({
  idleText,
  loadingText,
  successText,
  onClick,
  className = "",
}: MorphingAsyncButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultIdle = lang === "id" ? "Deploy Aplikasi" : "Deploy App";
  const defaultLoading = lang === "id" ? "Mendeploy..." : "Deploying...";
  const defaultSuccess = lang === "id" ? "Berhasil Dideploy!" : "Deployed Successfully!";

  const activeIdle = idleText ?? defaultIdle;
  const activeLoading = loadingText ?? defaultLoading;
  const activeSuccess = successText ?? defaultSuccess;

  const [status, setStatus] = useState<AsyncButtonStatus>("idle");

  const handleClick = async () => {
    if (status !== "idle") return;

    setStatus("loading");
    if (onClick) {
      await onClick();
      setStatus("success");
    } else {
      setTimeout(() => {
        setStatus("success");
      }, 1800);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus("idle");
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        layout
        onClick={handleClick}
        disabled={status === "loading"}
        whileHover={status === "idle" ? { scale: 1.02 } : {}}
        whileTap={status === "idle" ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`h-11 overflow-hidden select-none font-medium text-sm transition-colors shadow-xs flex items-center justify-center cursor-pointer ${
          status === "loading"
            ? "w-11 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 p-0"
            : status === "success"
            ? "px-5 rounded-xl bg-emerald-500 text-white"
            : "px-6 rounded-xl bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        }`}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span>{activeIdle}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m0 0L2.25 12l2.45-2.45a15.08 15.08 0 012.448-2.448c.104-.02.208-.04.312-.06m0 0l2.45-2.45 2.45 2.45" />
              </svg>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
              title={activeLoading}
            >
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{activeSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "success" && (
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:underline cursor-pointer"
        >
          {lang === "id" ? "Reset Status Morph" : "Reset Morph State"}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// 4. <MagneticButton /> (Magnetic Cursor Tracking)
// ============================================================================
export interface MagneticButtonProps {
  children?: React.ReactNode;
  strength?: number;
  innerStrength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.35,
  innerStrength = 0.2,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultText = lang === "id" ? "Arahkan Kursor Mendekat" : "Hover Near Cursor";
  const activeContent = children ?? defaultText;

  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);

    textX.set(distanceX * innerStrength);
    textY.set(distanceY * innerStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 font-semibold text-sm shadow-md transition-shadow hover:shadow-xl active:shadow-sm cursor-pointer select-none border border-zinc-800 dark:border-zinc-200 ${className}`}
    >
      <motion.span
        style={{ x: smoothTextX, y: smoothTextY }}
        className="flex items-center gap-2.5 pointer-events-none"
      >
        <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <span>{activeContent}</span>
      </motion.span>
    </motion.button>
  );
}

// ============================================================================
// 5. <ExpandableActionPill /> (Radial/Linear Expandable Action Pill)
// ============================================================================
export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

export interface ExpandableActionPillProps {
  actions?: ActionItem[];
  className?: string;
}

export function ExpandableActionPill({
  actions: customActions,
  className = "",
}: ExpandableActionPillProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const defaultActions: ActionItem[] = [
    {
      id: "edit",
      label: lang === "id" ? "Edit" : "Edit",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      ),
      color: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    },
    {
      id: "share",
      label: lang === "id" ? "Bagikan" : "Share",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      ),
      color: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    },
    {
      id: "bookmark",
      label: lang === "id" ? "Simpan" : "Bookmark",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      ),
      color: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    },
    {
      id: "delete",
      label: lang === "id" ? "Hapus" : "Delete",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
      color: "hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400",
    },
  ];

  const actions = customActions || defaultActions;

  const handleActionClick = (action: ActionItem) => {
    setActiveMessage(lang === "id" ? `Dipicu: ${action.label}` : `Triggered: ${action.label}`);
    if (action.onClick) action.onClick();
    setTimeout(() => setActiveMessage(null), 2500);
  };

  const idleHint = lang === "id" ? "Klik '+' untuk membuka aksi" : "Click '+' to expand actions";
  const selectHint = lang === "id" ? "Pilih salah satu aksi" : "Select an action";

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="relative flex items-center rounded-full p-1 border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 shadow-md backdrop-blur-md"
      >
        <motion.button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative z-20 w-10 h-10 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
          title={isExpanded ? (lang === "id" ? "Tutup aksi" : "Close actions") : (lang === "id" ? "Buka aksi" : "Expand actions")}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="flex items-center overflow-hidden pl-1 pr-1.5 gap-0.5"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  type="button"
                  onClick={() => handleActionClick(action)}
                  initial={{ opacity: 0, scale: 0.4, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.4, x: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer ${action.color}`}
                  title={action.label}
                >
                  {action.icon}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="h-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        {activeMessage || (isExpanded ? selectHint : idleHint)}
      </div>
    </div>
  );
}

// ============================================================================
// 6. <DoubleConfirmButton /> (Timeout Two-Step Confirmation)
// ============================================================================
export type DoubleConfirmState = "idle" | "armed" | "confirmed";

export interface DoubleConfirmButtonProps {
  idleText?: string;
  armedText?: string;
  confirmedText?: string;
  onConfirm?: () => void;
  timeoutDuration?: number;
  className?: string;
}

export function DoubleConfirmButton({
  idleText,
  armedText,
  confirmedText,
  onConfirm,
  timeoutDuration = 3000,
  className = "",
}: DoubleConfirmButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultIdle = lang === "id" ? "Hapus Repositori" : "Delete Repository";
  const defaultArmed = lang === "id" ? "Klik lagi untuk konfirmasi" : "Click again to confirm";
  const defaultConfirmed = lang === "id" ? "Terkonfirmasi!" : "Confirmed!";

  const activeIdle = idleText ?? defaultIdle;
  const activeArmed = armedText ?? defaultArmed;
  const activeConfirmed = confirmedText ?? defaultConfirmed;

  const [state, setState] = useState<DoubleConfirmState>("idle");
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const armedStartRef = useRef<number>(0);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleClick = () => {
    if (state === "idle") {
      setState("armed");
      setProgress(100);
      armedStartRef.current = performance.now();

      const updateProgress = (now: number) => {
        const elapsed = now - armedStartRef.current;
        const remaining = Math.max(0, 100 - (elapsed / timeoutDuration) * 100);
        setProgress(remaining);

        if (remaining > 0) {
          animFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
          setState("idle");
          setProgress(100);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateProgress);

      timerRef.current = setTimeout(() => {
        setState("idle");
        setProgress(100);
      }, timeoutDuration);
    } else if (state === "armed") {
      clearTimers();
      setState("confirmed");
      if (onConfirm) onConfirm();
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearTimers();
    setState("idle");
    setProgress(100);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={state === "confirmed"}
        whileHover={state !== "confirmed" ? { scale: 1.02 } : {}}
        whileTap={state !== "confirmed" ? { scale: 0.98 } : {}}
        className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium text-sm transition-colors shadow-xs cursor-pointer select-none ${
          state === "idle"
            ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-zinc-800 dark:border-zinc-200"
            : state === "armed"
            ? "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-md border border-amber-600"
            : "bg-emerald-500 text-white cursor-default border border-emerald-500"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {state === "idle" && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          )}
          {state === "armed" && (
            <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
          {state === "confirmed" && (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <span>
            {state === "idle" ? activeIdle : state === "armed" ? activeArmed : activeConfirmed}
          </span>
        </span>

        {/* Shrinking bottom progress bar */}
        {state === "armed" && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-white/70 transition-all"
            style={{ width: `${progress}%` }}
          />
        )}
      </motion.button>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {state === "idle"
            ? (lang === "id" ? "Klik sekali untuk membuka konfirmasi" : "Click once to arm confirmation")
            : state === "armed"
            ? (lang === "id" ? `Batas waktu: ${Math.ceil((progress / 100) * (timeoutDuration / 1000))}d` : `Expires in ${Math.ceil((progress / 100) * (timeoutDuration / 1000))}s`)
            : (lang === "id" ? "Aksi telah diverifikasi" : "Action verified")}
        </span>
        {state === "confirmed" && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 7. <FlipConfirmButton /> (3D Reveal Flip)
// ============================================================================
export interface FlipConfirmButtonProps {
  frontText?: string;
  backText?: string;
  onFlip?: () => void;
  className?: string;
}

export function FlipConfirmButton({
  frontText,
  backText,
  onFlip,
  className = "",
}: FlipConfirmButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultFront = lang === "id" ? "Salin Tautan Undangan" : "Copy Invitation Link";
  const defaultBack = lang === "id" ? "Tautan Disalin!" : "Link Copied!";

  const activeFront = frontText ?? defaultFront;
  const activeBack = backText ?? defaultBack;

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isFlipped) return;
    setIsFlipped(true);
    if (onFlip) onFlip();

    setTimeout(() => {
      setIsFlipped(false);
    }, 2200);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`} style={{ perspective: "1000px" }}>
      <motion.button
        type="button"
        onClick={handleClick}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: isFlipped ? 1 : 1.02 }}
        whileTap={{ scale: isFlipped ? 1 : 0.98 }}
        className="relative h-12 w-64 rounded-xl cursor-pointer select-none shadow-xs focus:outline-none"
      >
        {/* Front Face (0 deg) */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex items-center justify-center gap-2 px-6 rounded-xl font-semibold text-sm bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-zinc-800 dark:border-zinc-200 transition-colors"
        >
          <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <span>{activeFront}</span>
        </div>

        {/* Back Face (180 deg) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 px-6 rounded-xl font-semibold text-sm bg-emerald-500 text-white shadow-md border border-emerald-500"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>{activeBack}</span>
        </div>
      </motion.button>

      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        {isFlipped
          ? (lang === "id" ? "Membalik kembali dalam 2 detik..." : "Flipping back in 2s...")
          : (lang === "id" ? "Klik untuk membalik 3D" : "Click for 3D flip effect")}
      </span>
    </div>
  );
}

// ============================================================================
// 8. <DownloadProgressButton /> (Morphing Progress Bar)
// ============================================================================
export type DownloadState = "idle" | "downloading" | "success";

export interface DownloadProgressButtonProps {
  idleText?: string;
  downloadingText?: string;
  successText?: string;
  onComplete?: () => void;
  className?: string;
}

export function DownloadProgressButton({
  idleText,
  downloadingText,
  successText,
  onComplete,
  className = "",
}: DownloadProgressButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultIdle = lang === "id" ? "Unduh Paket SDK" : "Download SDK Bundle";
  const defaultDownloading = lang === "id" ? "Mengunduh" : "Downloading";
  const defaultSuccess = lang === "id" ? "Unduhan Selesai!" : "Download Complete!";

  const activeIdle = idleText ?? defaultIdle;
  const activeDownloading = downloadingText ?? defaultDownloading;
  const activeSuccess = successText ?? defaultSuccess;

  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    if (state !== "idle") return;
    setState("downloading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState("success");
          if (onComplete) onComplete();
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 180);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
    setProgress(0);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        onClick={startDownload}
        disabled={state !== "idle"}
        whileHover={state === "idle" ? { scale: 1.02 } : {}}
        whileTap={state === "idle" ? { scale: 0.98 } : {}}
        className={`relative overflow-hidden inline-flex items-center justify-center h-12 w-64 rounded-xl font-medium text-sm transition-colors shadow-xs select-none border ${
          state === "idle"
            ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border-zinc-800 dark:border-zinc-200 cursor-pointer"
            : state === "downloading"
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 cursor-wait"
            : "bg-emerald-500 text-white border-emerald-500 cursor-default"
        }`}
      >
        {/* Progress Bar Fill Layer */}
        {state === "downloading" && (
          <motion.div
            style={{ width: `${Math.min(100, progress)}%` }}
            className="absolute left-0 top-0 bottom-0 bg-zinc-300 dark:bg-zinc-700 transition-all duration-150"
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {state === "idle" && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.5V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          )}
          {state === "downloading" && (
            <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          )}
          {state === "success" && (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <span>
            {state === "idle"
              ? activeIdle
              : state === "downloading"
              ? `${activeDownloading}... ${Math.min(100, progress)}%`
              : activeSuccess}
          </span>
        </span>
      </motion.button>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {state === "idle"
            ? (lang === "id" ? "Klik untuk memulai simulasi unduhan" : "Click to trigger simulated download")
            : state === "downloading"
            ? (lang === "id" ? `Kecepatan transfer: ${(progress * 1.4).toFixed(1)} MB/s` : `Transfer rate: ${(progress * 1.4).toFixed(1)} MB/s`)
            : (lang === "id" ? "Berkas tersimpan di disk lokal" : "File saved to local storage")}
        </span>
        {state === "success" && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
          >
            {lang === "id" ? "Unduh Ulang" : "Download Again"}
          </button>
        )}
      </div>
    </div>
  );
}


// ============================================================================
// 9. <ReactionBurstButton /> (Radial Spark & Rolling Counter Upvote)
// ============================================================================
interface SparkParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

export interface ReactionBurstButtonProps {
  initialCount?: number;
  label?: string;
  activeLabel?: string;
  onToggle?: (isStarred: boolean, count: number) => void;
  className?: string;
}

export function ReactionBurstButton({
  initialCount = 1428,
  label,
  activeLabel,
  onToggle,
  className = "",
}: ReactionBurstButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultLabel = lang === "id" ? "Bintang" : "Star";
  const defaultActive = lang === "id" ? "Berbintang" : "Starred";
  const activeDefaultLabel = label ?? defaultLabel;
  const activeActiveLabel = activeLabel ?? defaultActive;

  const [isStarred, setIsStarred] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);

  const colors = ["#f59e0b", "#fbbf24", "#fb923c", "#f43f5e", "#ec4899", "#8b5cf6"];

  const handleClick = () => {
    const nextState = !isStarred;
    setIsStarred(nextState);
    const nextCount = nextState ? count + 1 : count - 1;
    setCount(nextCount);
    if (onToggle) onToggle(nextState, nextCount);

    if (nextState) {
      const newSparks: SparkParticle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i * 30 * Math.PI) / 180,
        distance: Math.floor(Math.random() * 26) + 38,
        size: Math.floor(Math.random() * 4) + 4,
        color: colors[i % colors.length],
      }));
      setSparks(newSparks);
      setTimeout(() => setSparks([]), 850);
    } else {
      setSparks([]);
    }
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="relative">
        <AnimatePresence>
          {sparks.map((spark) => {
            const destX = Math.cos(spark.angle) * spark.distance;
            const destY = Math.sin(spark.angle) * spark.distance;
            return (
              <motion.div
                key={spark.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1.4, 0.2],
                  x: destX,
                  y: destY,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: "30%",
                  top: "50%",
                  width: spark.size,
                  height: spark.size,
                  borderRadius: "50%",
                  backgroundColor: spark.color,
                  boxShadow: `0 0 10px ${spark.color}`,
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              />
            );
          })}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className={`relative z-10 flex items-center gap-3 px-5 py-3 rounded-2xl border font-semibold text-sm transition-all shadow-xs cursor-pointer select-none ${
            isStarred
              ? "bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.25)]"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700"
          }`}
        >
          <motion.div
            animate={
              isStarred
                ? {
                    scale: [1, 1.45, 0.9, 1.1, 1],
                    rotate: [0, -28, 22, -10, 0],
                  }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <StarIcon
              className={`w-5 h-5 transition-colors ${
                isStarred
                  ? "text-amber-500 fill-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            />
          </motion.div>

          <span className="font-medium text-xs sm:text-sm">
            {isStarred ? activeActiveLabel : activeDefaultLabel}
          </span>

          <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="relative overflow-hidden h-5 min-w-[42px] flex items-center justify-center font-mono text-xs font-bold">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ y: isStarred ? 14 : -14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: isStarred ? -14 : 14, opacity: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className={isStarred ? "text-amber-600 dark:text-amber-400" : "text-zinc-600 dark:text-zinc-400"}
              >
                {count.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        {isStarred
          ? (lang === "id" ? "Bintang diberikan • Counter bertambah" : "Starred • Counter incremented with particle burst")
          : (lang === "id" ? "Klik bintang untuk memicu reaksi partikel" : "Click star to trigger reaction burst")}
      </span>
    </div>
  );
}

// ============================================================================
// 10. <BiometricAuthButton /> (Passkey & Biometric Laser Scanner)
// ============================================================================
export type BiometricState = "idle" | "scanning" | "success";

export interface BiometricAuthButtonProps {
  label?: string;
  scanningLabel?: string;
  successLabel?: string;
  onAuthSuccess?: () => void;
  className?: string;
}

export function BiometricAuthButton({
  label,
  scanningLabel,
  successLabel,
  onAuthSuccess,
  className = "",
}: BiometricAuthButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultLabel = lang === "id" ? "Otentikasi Passkey" : "Authenticate Passkey";
  const defaultScanning = lang === "id" ? "Memindai Biometrik..." : "Verifying Biometrics...";
  const defaultSuccess = lang === "id" ? "Akses Diberikan!" : "Access Granted!";

  const activeLabel = label ?? defaultLabel;
  const activeScanning = scanningLabel ?? defaultScanning;
  const activeSuccess = successLabel ?? defaultSuccess;

  const [state, setState] = useState<BiometricState>("idle");
  const [scanPercent, setScanPercent] = useState(0);

  const handleStartScan = () => {
    if (state !== "idle") return;
    setState("scanning");
    setScanPercent(0);

    const interval = setInterval(() => {
      setScanPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState("success");
          if (onAuthSuccess) onAuthSuccess();
          return 100;
        }
        return prev + 12;
      });
    }, 150);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
    setScanPercent(0);
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="relative">
        {state === "scanning" && (
          <>
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: [1, 1.45, 1.8], opacity: [0.8, 0.4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl bg-cyan-500/20 dark:bg-cyan-400/20 -z-10 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl bg-emerald-500/20 dark:bg-emerald-400/20 -z-10 pointer-events-none"
            />
          </>
        )}

        <motion.button
          type="button"
          onClick={handleStartScan}
          disabled={state !== "idle"}
          whileHover={state === "idle" ? { scale: 1.02 } : {}}
          whileTap={state === "idle" ? { scale: 0.98 } : {}}
          className={`relative overflow-hidden flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md select-none border ${
            state === "idle"
              ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border-zinc-800 dark:border-zinc-200 cursor-pointer"
              : state === "scanning"
              ? "bg-zinc-950 text-cyan-400 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.3)] cursor-wait"
              : "bg-emerald-500 text-white border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)] cursor-default"
          }`}
        >
          <div className="relative flex items-center justify-center w-6 h-6 overflow-hidden rounded-md">
            {state === "idle" && (
              <ShieldCheckIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            )}

            {state === "scanning" && (
              <>
                <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a5 5 0 00-5 5v3a5 5 0 0010 0V7a5 5 0 00-5-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" />
                </svg>
                <motion.div
                  animate={{ y: [-16, 16] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-[0_0_8px_#22d3ee]"
                />
              </>
            )}

            {state === "success" && (
              <motion.div
                initial={{ scale: 0.4, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
              >
                <UnlockIcon className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </div>

          <span>
            {state === "idle"
              ? activeLabel
              : state === "scanning"
              ? `${activeScanning} ${Math.min(100, scanPercent)}%`
              : activeSuccess}
          </span>
        </motion.button>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {state === "idle"
            ? (lang === "id" ? "Tekan untuk memulai pemindaian biometrik" : "Press to initiate biometric passkey scan")
            : state === "scanning"
            ? (lang === "id" ? "Memverifikasi enkripsi hardware enclave..." : "Verifying secure hardware enclave...")
            : (lang === "id" ? "Otentikasi berhasil • Token sesi diterbitkan" : "Authentication successful • Session token granted")}
        </span>
        {state === "success" && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 11. <CopyConfettiButton /> (Celebration Confetti Cannon Copy)
// ============================================================================
interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  color: string;
  shape: "circle" | "rect" | "strip";
  scale: number;
}

export interface CopyConfettiButtonProps {
  textToCopy?: string;
  idleLabel?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyConfettiButton({
  textToCopy = "ARYA-UI-2026-VIP",
  idleLabel,
  copiedLabel,
  className = "",
}: CopyConfettiButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultIdle = lang === "id" ? "Salin Kode Undangan" : "Copy Invite Code";
  const defaultCopied = lang === "id" ? "Kode Berhasil Disalin! 🎉" : "Code Copied to Clipboard! 🎉";

  const activeIdle = idleLabel ?? defaultIdle;
  const activeCopied = copiedLabel ?? defaultCopied;

  const [isCopied, setIsCopied] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
  const shapes: Array<"circle" | "rect" | "strip"> = ["circle", "rect", "strip"];

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);

    const pieces = Array.from({ length: 24 }, (_, i) => {
      const spreadX = (Math.random() - 0.5) * 220;
      const spreadY = -Math.floor(Math.random() * 90 + 70);
      return {
        id: Date.now() + i,
        x: spreadX,
        y: spreadY,
        rotateX: Math.random() * 720,
        rotateY: Math.random() * 720,
        rotateZ: Math.random() * 720,
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length],
        scale: Math.random() * 0.5 + 0.7,
      };
    });

    setConfetti(pieces);

    setTimeout(() => {
      setConfetti([]);
    }, 1200);

    setTimeout(() => {
      setIsCopied(false);
    }, 2600);
  };

  return (
    <div className={`relative inline-flex flex-col items-center gap-3 ${className}`}>
      <AnimatePresence>
        {confetti.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, item.scale, item.scale * 0.8],
              x: [0, item.x, item.x * 1.3],
              y: [0, item.y, item.y + 110],
              rotateX: item.rotateX,
              rotateY: item.rotateY,
              rotateZ: item.rotateZ,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              width: item.shape === "strip" ? "12px" : "8px",
              height: item.shape === "circle" ? "8px" : item.shape === "strip" ? "4px" : "8px",
              borderRadius: item.shape === "circle" ? "50%" : "2px",
              backgroundColor: item.color,
              boxShadow: `0 0 6px ${item.color}`,
              pointerEvents: "none",
              zIndex: 30,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={`relative z-10 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md select-none border cursor-pointer ${
          isCopied
            ? "bg-emerald-500 text-white border-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
            : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border-zinc-800 dark:border-zinc-200"
        }`}
      >
        <AnimatePresence mode="wait">
          {isCopied ? (
            <motion.div
              key="copied"
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5 }}
              className="flex items-center gap-2"
            >
              <CheckIcon className="w-4 h-4 text-white stroke-[2.5]" />
              <span>{activeCopied}</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <CopyIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <span>{activeIdle}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        {isCopied
          ? (lang === "id" ? `Tersalin: "${textToCopy}"` : `Copied to clipboard: "${textToCopy}"`)
          : (lang === "id" ? `Klik untuk menyalin "${textToCopy}" dengan ledakan confetti` : `Click to copy "${textToCopy}" with confetti cannon`)}
      </span>
    </div>
  );
}


// ============================================================================
// 12. <OrigamiPaperPlaneButton /> (3D Origami Fold & Flight Trajectory)
// ============================================================================
export interface OrigamiPaperPlaneButtonProps {
  idleText?: string;
  sendingText?: string;
  successText?: string;
  onSend?: () => void;
  className?: string;
}

export function OrigamiPaperPlaneButton({
  idleText,
  sendingText,
  successText,
  onSend,
  className = "",
}: OrigamiPaperPlaneButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultIdle = lang === "id" ? "Kirim Pesan" : "Send Message";
  const defaultSending = lang === "id" ? "Meluncur..." : "Launching...";
  const defaultSuccess = lang === "id" ? "Terkirim ke Cloud!" : "Dispatched to Cloud!";

  const activeIdle = idleText ?? defaultIdle;
  const activeSending = sendingText ?? defaultSending;
  const activeSuccess = successText ?? defaultSuccess;

  const [state, setState] = useState<"idle" | "launching" | "delivered">("idle");

  const handleLaunch = () => {
    if (state !== "idle") return;
    setState("launching");
    if (onSend) onSend();

    setTimeout(() => {
      setState("delivered");
    }, 1400);

    setTimeout(() => {
      setState("idle");
    }, 4200);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
  };

  return (
    <div className={`relative inline-flex flex-col items-center gap-3 ${className}`}>
      <motion.div layout className="relative overflow-visible">
        <AnimatePresence>
          {state === "launching" && (
            <motion.div
              initial={{ x: 0, y: 0, scale: 0.8, rotate: -25, opacity: 1 }}
              animate={{
                x: [0, 40, 160, 260],
                y: [0, -35, -120, -220],
                scale: [0.8, 1.2, 0.9, 0.3],
                rotate: [-25, -45, -35, -55],
                opacity: [1, 1, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 -ml-4 -mt-4 z-40 pointer-events-none text-sky-400"
            >
              <SendIcon className="w-8 h-8 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              <div className="absolute -left-3 top-4 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-300/60 animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.button
              key="idle"
              type="button"
              onClick={handleLaunch}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-zinc-800 dark:border-zinc-200 font-semibold text-sm transition-colors shadow-md cursor-pointer select-none"
            >
              <SendIcon className="w-4 h-4 text-sky-400" />
              <span>{activeIdle}</span>
            </motion.button>
          )}

          {state === "launching" && (
            <motion.div
              key="launching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-950 text-sky-400 border border-sky-500/40 font-semibold text-sm shadow-xl select-none"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>{activeSending}</span>
            </motion.div>
          )}

          {state === "delivered" && (
            <motion.div
              key="delivered"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 border border-emerald-400 select-none"
            >
              <CheckIcon className="w-4 h-4 stroke-[2.5]" />
              <span>{activeSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          {state === "idle"
            ? (lang === "id" ? "Klik untuk melipat dan menerbangkan pesawat kertas" : "Click to fold and launch paper airplane trajectory")
            : state === "launching"
            ? (lang === "id" ? "Pesawat sedang meluncur di angkasa..." : "Origami craft in supersonic transit...")
            : (lang === "id" ? "Pesan telah mendarat di server tujuan" : "Payload safely anchored in destination server")}
        </span>
        {state === "delivered" && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 13. <OrbitalActionHubButton /> (Spatial Orbit & Proximity Magnet Action Hub)
// ============================================================================
export interface SatelliteAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

export interface OrbitalActionHubButtonProps {
  mainLabel?: string;
  actions?: SatelliteAction[];
  className?: string;
}

export function OrbitalActionHubButton({
  mainLabel,
  actions: customActions,
  className = "",
}: OrbitalActionHubButtonProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";

  const defaultLabel = lang === "id" ? "AI Copilot Hub" : "AI Copilot Hub";
  const activeMainLabel = mainLabel ?? defaultLabel;

  const defaultActions: SatelliteAction[] = [
    {
      id: "summarize",
      label: lang === "id" ? "Ringkaskan" : "Summarize",
      icon: <SparklesIcon className="w-4 h-4" />,
      color: "bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white",
    },
    {
      id: "translate",
      label: lang === "id" ? "Terjemahkan" : "Translate",
      icon: <GlobeIcon className="w-4 h-4" />,
      color: "bg-purple-500/10 border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white",
    },
    {
      id: "refactor",
      label: lang === "id" ? "Refactor Kode" : "Refactor Code",
      icon: <CodeIcon className="w-4 h-4" />,
      color: "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white",
    },
    {
      id: "optimize",
      label: lang === "id" ? "Optimasi Kilat" : "Optimize",
      icon: <ZapIcon className="w-4 h-4" />,
      color: "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white",
    },
  ];

  const actions = customActions || defaultActions;
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSatellite, setHoveredSatellite] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const radius = 64;

  const handleSelect = (action: SatelliteAction) => {
    setSelectedMessage(lang === "id" ? `Mengeksekusi satelit: ${action.label}` : `Executing satellite: ${action.label}`);
    if (action.onClick) action.onClick();
    setTimeout(() => setSelectedMessage(null), 2500);
  };

  return (
    <div className={`relative inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="relative w-64 h-48 flex items-center justify-center select-none">
        <div
          className={`absolute rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
            isOpen
              ? "w-44 h-44 border-zinc-300 dark:border-zinc-700 opacity-80 scale-100"
              : "w-10 h-10 border-transparent opacity-0 scale-50"
          }`}
        />

        <AnimatePresence>
          {isOpen &&
            actions.map((sat, index) => {
              const angle = (index * (360 / actions.length) * Math.PI) / 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={sat.id}
                  type="button"
                  onClick={() => handleSelect(sat)}
                  onMouseEnter={() => setHoveredSatellite(sat.label)}
                  onMouseLeave={() => setHoveredSatellite(null)}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25, delay: index * 0.04 }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  className={`absolute z-30 w-10 h-10 rounded-full border flex items-center justify-center shadow-lg backdrop-blur-md transition-colors cursor-pointer ${sat.color}`}
                  title={sat.label}
                >
                  {sat.icon}
                </motion.button>
              );
            })}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-20 flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all border cursor-pointer ${
            isOpen
              ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-700 shadow-[0_0_25px_rgba(99,102,241,0.25)]"
              : "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border-zinc-800 dark:border-zinc-200"
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <SparklesIcon className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
          </motion.div>
          <span>{activeMainLabel}</span>
        </motion.button>
      </div>

      <div className="h-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        {selectedMessage ||
          hoveredSatellite ||
          (isOpen
            ? (lang === "id" ? "Pilih salah satu satelit aksi orbital" : "Select an orbital action satellite node")
            : (lang === "id" ? "Klik untuk mengorbitkan 4 satelit aksi" : "Click to deploy 4 gravitational action satellites"))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE: AdvancedButtonsDemo (Single Column Layout with All 14 Components)
// ============================================================================
export function AdvancedButtonsDemo() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "id").startsWith("id") ? "id" : "en";
  const t = BUTTONS_DICT[lang];

  return (
    <div className="w-full space-y-12 pb-20">
      {/* Page Header */}
      <div className="space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
          <span>{t.pillTag1}</span>
          <span>•</span>
          <span>{t.pillTag2}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="max-w-4xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.pageDescription}
        </p>
      </div>

      {/* Single Column Stack of All 8 Components */}
      <div className="grid grid-cols-1 gap-10">
        {/* 1. HOLD BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.hold.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.hold.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.hold.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <HoldButton />
          </div>

          <CodeSnippet code={t.cards.hold.snippet} />
        </section>

        {/* 2. SWIPE BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.swipe.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.swipe.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.swipe.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <SwipeButton />
          </div>

          <CodeSnippet code={t.cards.swipe.snippet} />
        </section>

        {/* 3. MORPHING ASYNC BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.morph.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.morph.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.morph.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <MorphingAsyncButton />
          </div>

          <CodeSnippet code={t.cards.morph.snippet} />
        </section>

        {/* 4. MAGNETIC BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.magnetic.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.magnetic.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.magnetic.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <MagneticButton>{t.cards.magnetic.buttonText}</MagneticButton>
          </div>

          <CodeSnippet code={t.cards.magnetic.snippet} />
        </section>

        {/* 5. EXPANDABLE ACTION PILL */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.pill.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.pill.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.pill.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <ExpandableActionPill />
          </div>

          <CodeSnippet code={t.cards.pill.snippet} />
        </section>

        {/* 6. DOUBLE CONFIRM BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.doubleConfirm.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.doubleConfirm.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.doubleConfirm.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <DoubleConfirmButton />
          </div>

          <CodeSnippet code={t.cards.doubleConfirm.snippet} />
        </section>

        {/* 7. FLIP CONFIRM BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.flip.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.flip.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.flip.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <FlipConfirmButton />
          </div>

          <CodeSnippet code={t.cards.flip.snippet} />
        </section>

        {/* 8. DOWNLOAD PROGRESS BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.download.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.download.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.download.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <DownloadProgressButton />
          </div>

          <CodeSnippet code={t.cards.download.snippet} />
        </section>

        {/* 9. REACTION BURST BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.star.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.star.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.star.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <ReactionBurstButton />
          </div>

          <CodeSnippet code={t.cards.star.snippet} />
        </section>

        {/* 10. BIOMETRIC AUTH BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.biometric.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.biometric.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.biometric.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <BiometricAuthButton />
          </div>

          <CodeSnippet code={t.cards.biometric.snippet} />
        </section>

        {/* 11. COPY CONFETTI BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.confetti.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.confetti.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.confetti.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <CopyConfettiButton />
          </div>

          <CodeSnippet code={t.cards.confetti.snippet} />
        </section>

        {/* 12. ORIGAMI PAPER PLANE BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.origami.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.origami.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.origami.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <OrigamiPaperPlaneButton />
          </div>

          <CodeSnippet code={t.cards.origami.snippet} />
        </section>

        {/* 13. ORBITAL ACTION HUB BUTTON */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700">
          <div className="space-y-2 mb-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {t.cards.orbital.title}
              </h2>
              <span className="shrink-0 font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800">
                {t.cards.orbital.badge}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {t.cards.orbital.desc}
            </p>
          </div>

          <div className="flex items-center justify-center py-14 px-6 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 dark:border-zinc-800/70 dark:bg-zinc-900/30 mb-6">
            <OrbitalActionHubButton />
          </div>

          <CodeSnippet code={t.cards.orbital.snippet} />
        </section>
      </div>
    </div>
  );
}

export default AdvancedButtonsDemo;
