import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonAnimation, ButtonAnimationType, ButtonVariant } from "../../src";
import { CodeSnippet } from "../components/CodeSnippet";

interface AnimationCardInfo {
  animation: ButtonAnimationType;
  title: string;
  badge: string;
  physicsDescription: string;
  buttonLabel: string;
  snippet: string;
}

export function ButtonDemo() {
  const { t } = useTranslation();
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>("default");
  const [searchQuery, setSearchQuery] = useState("");

  const animationsList: AnimationCardInfo[] = useMemo(
    () => [
      {
        animation: "spring-bounce",
        title: t("content.buttonDemo.items.springBounce.title", "1. Spring Bounce"),
        badge: t("content.buttonDemo.items.springBounce.badge", "Elastic Physics"),
        physicsDescription: t(
          "content.buttonDemo.items.springBounce.desc",
          "Framer Motion spring physics mikro: skala membesar halus saat hover (scale: 1.04) dan memantul elastis saat di-tap/klik (scale: 0.92)."
        ),
        buttonLabel: t("content.buttonDemo.items.springBounce.buttonLabel", "Spring Bounce"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="spring-bounce"
>
  ${t("content.buttonDemo.items.springBounce.buttonLabel", "Spring Bounce")}
</ButtonAnimation>`,
      },
      {
        animation: "press-3d",
        title: t("content.buttonDemo.items.press3d.title", "2. Press 3D (Tactile)"),
        badge: t("content.buttonDemo.items.press3d.badge", "Depth Extrusion"),
        physicsDescription: t(
          "content.buttonDemo.items.press3d.desc",
          "Struktur mekanikal 3D: memiliki ketebalan border bawah 4px yang nyata tertekan ke bawah (translateY: 4px) saat diklik layaknya tombol arcade fisik."
        ),
        buttonLabel: t("content.buttonDemo.items.press3d.buttonLabel", "Press 3D"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="press-3d"
>
  ${t("content.buttonDemo.items.press3d.buttonLabel", "Press 3D")}
</ButtonAnimation>`,
      },
      {
        animation: "slide-reveal",
        title: t("content.buttonDemo.items.slideReveal.title", "3. Slide & Wipe Reveal"),
        badge: t("content.buttonDemo.items.slideReveal.badge", "Directional Slide"),
        physicsDescription: t(
          "content.buttonDemo.items.slideReveal.desc",
          "Struktur overflow-hidden: saat hover, teks bergeser ke kiri dan icon panah meluncur masuk dari kanan luar secara mulus dengan transisi fade-in."
        ),
        buttonLabel: t("content.buttonDemo.items.slideReveal.buttonLabel", "Hover Me"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="slide-reveal"
>
  ${t("content.buttonDemo.items.slideReveal.buttonLabel", "Hover Me")}
</ButtonAnimation>`,
      },
      {
        animation: "magnetic-glow",
        title: t("content.buttonDemo.items.magneticGlow.title", "4. Magnetic Float Glow"),
        badge: t("content.buttonDemo.items.magneticGlow.badge", "Ambient Glow"),
        physicsDescription: t(
          "content.buttonDemo.items.magneticGlow.desc",
          "Tombol melayang terangkat ke atas (-3px) saat di-hover, disertai pancaran aura radial neon glow gradien dinamis yang membesar di belakangnya."
        ),
        buttonLabel: t("content.buttonDemo.items.magneticGlow.buttonLabel", "Floating Glow"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="magnetic-glow"
>
  ${t("content.buttonDemo.items.magneticGlow.buttonLabel", "Floating Glow")}
</ButtonAnimation>`,
      },
      {
        animation: "shimmer-sweep",
        title: t("content.buttonDemo.items.shimmerSweep.title", "5. Shimmer Sweep"),
        badge: t("content.buttonDemo.items.shimmerSweep.badge", "Specular Beam"),
        physicsDescription: t(
          "content.buttonDemo.items.shimmerSweep.desc",
          "Permukaan tombol disapu seberkas specular light beam kontinu dengan sudut miring 45 derajat yang memberikan efek kilau kristal modern."
        ),
        buttonLabel: t("content.buttonDemo.items.shimmerSweep.buttonLabel", "Shimmer Beam"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="shimmer-sweep"
>
  ${t("content.buttonDemo.items.shimmerSweep.buttonLabel", "Shimmer Beam")}
</ButtonAnimation>`,
      },
      {
        animation: "glitch-cyberpunk",
        title: t("content.buttonDemo.items.glitchCyberpunk.title", "6. Glitch Cyberpunk"),
        badge: t("content.buttonDemo.items.glitchCyberpunk.badge", "Chromatic Distortion"),
        physicsDescription: t(
          "content.buttonDemo.items.glitchCyberpunk.desc",
          "Saat di-hover, tombol bergetar brutal dengan pergeseran x, y, dan skew cepat asimetris, disertai klon cyan/merah dengan clip-path dan scanline laser."
        ),
        buttonLabel: t("content.buttonDemo.items.glitchCyberpunk.buttonLabel", "CYBERPUNK_SYS"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="glitch-cyberpunk"
>
  ${t("content.buttonDemo.items.glitchCyberpunk.buttonLabel", "CYBERPUNK_SYS")}
</ButtonAnimation>`,
      },
      {
        animation: "particle-burst",
        title: t("content.buttonDemo.items.particleBurst.title", "7. Particle Burst"),
        badge: t("content.buttonDemo.items.particleBurst.badge", "Radial Confetti"),
        physicsDescription: t(
          "content.buttonDemo.items.particleBurst.desc",
          "Saat diklik, 12 partikel neon meledak ke luar dalam radius 360 derajat (-48px s/d 48px) bebas melampaui batas tombol tanpa terpotong overflow-hidden."
        ),
        buttonLabel: t("content.buttonDemo.items.particleBurst.buttonLabel", "Click for Boom! 💥"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="particle-burst"
  onClick={() => console.log("Boom!")}
>
  ${t("content.buttonDemo.items.particleBurst.buttonLabel", "Click for Boom! 💥")}
</ButtonAnimation>`,
      },
      {
        animation: "magnetic-tilt",
        title: t("content.buttonDemo.items.magneticTilt.title", "8. Magnetic 3D Tilt"),
        badge: t("content.buttonDemo.items.magneticTilt.badge", "Cursor Tracking"),
        physicsDescription: t(
          "content.buttonDemo.items.magneticTilt.desc",
          "Mengikuti posisi kursor mouse secara presisi dengan rotasi 3D tilt (rotateX, rotateY) serta translasi pegas magnetik menggunakan useMotionValue dan useSpring."
        ),
        buttonLabel: t("content.buttonDemo.items.magneticTilt.buttonLabel", "Move Cursor Here"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="magnetic-tilt"
>
  ${t("content.buttonDemo.items.magneticTilt.buttonLabel", "Move Cursor Here")}
</ButtonAnimation>`,
      },
      {
        animation: "liquid-gooey",
        title: t("content.buttonDemo.items.liquidGooey.title", "9. Liquid Gooey"),
        badge: t("content.buttonDemo.items.liquidGooey.badge", "Organic Morph"),
        physicsDescription: t(
          "content.buttonDemo.items.liquidGooey.desc",
          "Batas tombol (border-radius) meliuk dan berubah bentuk secara dinamis dan organik saat disentuh kursor, menyerupai fluida cairan kental."
        ),
        buttonLabel: t("content.buttonDemo.items.liquidGooey.buttonLabel", "Liquid Gooey"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="liquid-gooey"
>
  ${t("content.buttonDemo.items.liquidGooey.buttonLabel", "Liquid Gooey")}
</ButtonAnimation>`,
      },
      {
        animation: "neon-pulse",
        title: t("content.buttonDemo.items.neonPulse.title", "10. Neon Pulse"),
        badge: t("content.buttonDemo.items.neonPulse.badge", "Infinite Glow Pulse"),
        physicsDescription: t(
          "content.buttonDemo.items.neonPulse.desc",
          "Animasi box-shadow Framer Motion berdenyut membesar dan memudar secara infinite dengan transisi berkala 1.8 detik."
        ),
        buttonLabel: t("content.buttonDemo.items.neonPulse.buttonLabel", "Neon Pulse"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="neon-pulse"
>
  ${t("content.buttonDemo.items.neonPulse.buttonLabel", "Neon Pulse")}
</ButtonAnimation>`,
      },
      {
        animation: "ripple-echo",
        title: t("content.buttonDemo.items.rippleEcho.title", "11. Ripple Echo (Water Ripple)"),
        badge: t("content.buttonDemo.items.rippleEcho.badge", "Cursor Coordinate Ripple"),
        physicsDescription: t(
          "content.buttonDemo.items.rippleEcho.desc",
          "Menggunakan state array ripples: saat diklik, riak air bundar memancar tepat dari titik sentuh kursor dan membesar (scale up) lalu memudar halus."
        ),
        buttonLabel: t("content.buttonDemo.items.rippleEcho.buttonLabel", "Click Anywhere on Me 🌊"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="ripple-echo"
  onClick={(e) => console.log("Ripple at", e.clientX, e.clientY)}
>
  ${t("content.buttonDemo.items.rippleEcho.buttonLabel", "Click Anywhere on Me 🌊")}
</ButtonAnimation>`,
      },
      {
        animation: "fold-out",
        title: t("content.buttonDemo.items.foldOut.title", "12. Fold Out (3D Origami)"),
        badge: t("content.buttonDemo.items.foldOut.badge", "Perspective Unfold"),
        physicsDescription: t(
          "content.buttonDemo.items.foldOut.desc",
          "Efek lipatan kertas 3D yang terbuka ke arah pandang pengguna dengan rotasi sumbu X (rotateX: 22deg), perspective 1000px, dan bayangan elevasi mendalam."
        ),
        buttonLabel: t("content.buttonDemo.items.foldOut.buttonLabel", "Unfold 3D"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="fold-out"
>
  ${t("content.buttonDemo.items.foldOut.buttonLabel", "Unfold 3D")}

</ButtonAnimation>`,
      },
      {
        animation: "pixelate-morph",
        title: t("content.buttonDemo.items.pixelateMorph.title", "13. Pixelate Morph"),
        badge: t("content.buttonDemo.items.pixelateMorph.badge", "Stepped Glitch Filter"),
        physicsDescription: t(
          "content.buttonDemo.items.pixelateMorph.desc",
          "Saat di-hover, tombol bergetar patah-patah dengan efek filter blur dan kontras ekstrim secara instan sesaat sebelum kembali tajam ke normal."
        ),
        buttonLabel: t("content.buttonDemo.items.pixelateMorph.buttonLabel", "Pixelate Jitter"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="pixelate-morph"
>
  ${t("content.buttonDemo.items.pixelateMorph.buttonLabel", "Pixelate Jitter")}
</ButtonAnimation>`,
      },
      {
        animation: "jelly-wobble",
        title: t("content.buttonDemo.items.jellyWobble.title", "14. Jelly Wobble"),
        badge: t("content.buttonDemo.items.jellyWobble.badge", "Squash & Stretch"),
        physicsDescription: t(
          "content.buttonDemo.items.jellyWobble.desc",
          "Tombol bergoyang lentur dan membal seperti jelly cair dengan deformasi scaleX dan scaleY bertahap yang elastis saat di-hover."
        ),
        buttonLabel: t("content.buttonDemo.items.jellyWobble.buttonLabel", "Jelly Wobble"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="jelly-wobble"
>
  ${t("content.buttonDemo.items.jellyWobble.buttonLabel", "Jelly Wobble")}
</ButtonAnimation>`,
      },
      {
        animation: "border-beam",
        title: t("content.buttonDemo.items.borderBeam.title", "15. Border Beam"),
        badge: t("content.buttonDemo.items.borderBeam.badge", "Orbiting Neon Beam"),
        physicsDescription: t(
          "content.buttonDemo.items.borderBeam.desc",
          "Streak cahaya neon gradient halus yang mengitari border tombol secara kontinu dengan masking latar belakang yang tetap mempertahankan kontras teks."
        ),
        buttonLabel: t("content.buttonDemo.items.borderBeam.buttonLabel", "Border Beam"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="border-beam"
>
  ${t("content.buttonDemo.items.borderBeam.buttonLabel", "Border Beam")}
</ButtonAnimation>`,
      },
      {
        animation: "flip-3d",
        title: t("content.buttonDemo.items.flip3d.title", "16. Flip 3D (X-Axis)"),
        badge: t("content.buttonDemo.items.flip3d.badge", "Preserve-3D Flip"),
        physicsDescription: t(
          "content.buttonDemo.items.flip3d.desc",
          "Tombol berputar 180 derajat ke belakang pada sumbu X dengan transform-style: preserve-3d, menampilkan sisi belakang yang elegan saat di-hover."
        ),
        buttonLabel: t("content.buttonDemo.items.flip3d.buttonLabel", "Hover to Flip"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="flip-3d"
  backContent="✨ Backside"
>
  ${t("content.buttonDemo.items.flip3d.buttonLabel", "Hover to Flip")}
</ButtonAnimation>`,
      },
      {
        animation: "elastic-snap",
        title: t("content.buttonDemo.items.elasticSnap.title", "17. Elastic Snap"),
        badge: t("content.buttonDemo.items.elasticSnap.badge", "Spring Stiffness 400"),
        physicsDescription: t(
          "content.buttonDemo.items.elasticSnap.desc",
          "Saat di-hover, tombol tersentak cepat x: 15 lalu memantul kembali secara pegas elastis berkecepatan tinggi (type: spring, stiffness: 400, damping: 10)."
        ),
        buttonLabel: t("content.buttonDemo.items.elasticSnap.buttonLabel", "Snap Rebound"),
        snippet: `<ButtonAnimation
  variant="${selectedVariant}"
  animation="elastic-snap"
>
  ${t("content.buttonDemo.items.elasticSnap.buttonLabel", "Snap Rebound")}
</ButtonAnimation>`,
      },
    ],
    [t, selectedVariant]
  );

  // Filtered by Search Query
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return animationsList;
    return animationsList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.animation.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.physicsDescription.toLowerCase().includes(q)
    );
  }, [animationsList, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "content.buttonDemo.searchPlaceholder",
              "Cari dari 18 animasi (contoh: 'ripple', 'beam', 'jelly', 'tilt', 'neon')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.buttonDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {t("content.buttonDemo.variantLabel", "Pilih Visual Variant (Style Warna):")}
            </span>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t("content.buttonDemo.showingCount", {
                count: filteredList.length,
                total: animationsList.length,
                defaultValue: `Menampilkan ${filteredList.length} dari ${animationsList.length} animasi tombol.`,
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(["default", "secondary", "outline", "ghost"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                  selectedVariant === v
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.buttonDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan animasi tombol dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.buttonDemo.resetSearch", "Reset pencarian")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredList.map((item) => (
          <div
            key={item.animation}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            <div className="space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[44px]">
                {item.physicsDescription}
              </p>
            </div>

            <div className="flex items-center justify-center py-8 px-4 rounded-xl border border-neutral-200/60 bg-neutral-50/50 dark:border-neutral-800/60 dark:bg-neutral-900/30 mb-4 overflow-visible">
              <ButtonAnimation
                variant={selectedVariant}
                animation={item.animation}
              >
                {item.buttonLabel}
              </ButtonAnimation>
            </div>

            <CodeSnippet code={item.snippet} />
          </div>
        ))}
      </div>
    </div>
  );
}
