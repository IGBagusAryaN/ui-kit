import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "translation";

export const resources = {
  id: {
    translation: {
      nav: {
        gettingStarted: "Memulai",
        installation: "Instalasi",
        components: "Komponen",
        button: "Tombol",
        navbar: "Navigasi",
        search: "Pencarian",
        icons: "Ikon",
        webIcons: "Ikon Web",
      },
      common: {
        copyCode: "Salin Kode",
        copied: "Disalin!",
        copy: "Salin",
        preview: "Pratinjau Interaktif",
        usage: "Cara Penggunaan",
        props: "Properti",
        searchPlaceholder: "Cari komponen atau ikon...",
        search: "Cari",
        close: "Tutup",
        reset: "Reset",
        all: "Semua",
        language: "Bahasa",
        version: "v0.1.0",
      },
      theme: {
        dark: "Gelap",
        light: "Terang",
        system: "Sistem",
        toggle: "Ganti Tema",
      },
      badge: {
        start: "mulai",
        new: "baru",
      },
      header: {
        docs: "dokumentasi",
      },
      content: {
        installation: {
          badge: "Memulai",
          title: "Instalasi",
          description: "Panduan langkah demi langkah untuk menginstal dan mengkonfigurasi UI Component Library @a/ui pada project React, Vite, atau Next.js Anda.",
          step1: {
            badge: "1",
            title: "Install Package",
            desc: "Pilih package manager yang Anda gunakan pada project:",
          },
          step2: {
            badge: "2",
            title: "Pastikan Peer Dependencies Terpasang",
            desc: "Library ini membutuhkan framer-motion untuk animasi fluida dan tailwindcss untuk utility styling:",
          },
          step3: {
            badge: "3",
            title: "Konfigurasi Tailwind CSS",
            desc: "Tambahkan path file bundle library pada konfigurasi content di tailwind.config.js agar class Tailwind yang digunakan oleh komponen tidak terhapus saat purge/build:",
          },
          step4: {
            badge: "4",
            title: "Mulai Gunakan Komponen",
            desc: "Import komponen yang Anda butuhkan langsung dari root package:",
          },
          cdn: {
            title: "🌐 Opsi CDN Standalone (HTML Biasa)",
            desc: "Jika Anda ingin mencoba langsung pada file HTML tanpa build step Node.js:",
          },
        },
        buttonDemo: {
          badge: "Animasi",
          pageTitle: "Button Animation",
          pageDesc: "Arsitektur komponen tombol dengan pemisahan Visual Style (Tailwind) dan Interactive Physics (Framer Motion), mendukung 18 variasi animasi interaktif dalam satu koleksi terpadu tanpa kasta/tab pemisah, dilengkapi fitur pencarian cepat.",
          searchPlaceholder: "Cari dari 18 animasi (contoh: 'ripple', 'beam', 'jelly', 'tilt', 'neon')...",
          clearSearch: "✕ Hapus",
          variantLabel: "Pilih Visual Variant (Style Warna):",
          showingCount: "Menampilkan {{count}} dari {{total}} animasi tombol.",
          emptySearch: "Tidak ditemukan animasi tombol dengan kata kunci \"{{query}}\"",
          resetSearch: "Reset pencarian",
          usageSnippet: "Usage Snippet",
          copy: "Salin",
          copied: "✓ Disalin",
          items: {
            springBounce: {
              title: "1. Spring Bounce",
              badge: "Elastic Physics",
              desc: "Framer Motion spring physics mikro: skala membesar halus saat hover (scale: 1.04) dan memantul elastis saat di-tap/klik (scale: 0.92).",
              buttonLabel: "Spring Bounce",
            },
            press3d: {
              title: "2. Press 3D (Tactile)",
              badge: "Depth Extrusion",
              desc: "Struktur mekanikal 3D: memiliki ketebalan border bawah 4px yang nyata tertekan ke bawah (translateY: 4px) saat diklik layaknya tombol arcade fisik.",
              buttonLabel: "Press 3D",
            },
            slideReveal: {
              title: "3. Slide & Wipe Reveal",
              badge: "Directional Slide",
              desc: "Struktur overflow-hidden: saat hover, teks bergeser ke kiri dan icon panah meluncur masuk dari kanan luar secara mulus dengan transisi fade-in.",
              buttonLabel: "Hover Me",
            },
            magneticGlow: {
              title: "4. Magnetic Float Glow",
              badge: "Ambient Glow",
              desc: "Tombol melayang terangkat ke atas (-3px) saat di-hover, disertai pancaran aura radial neon glow gradien dinamis yang membesar di belakangnya.",
              buttonLabel: "Floating Glow",
            },
            shimmerSweep: {
              title: "5. Shimmer Sweep",
              badge: "Specular Beam",
              desc: "Permukaan tombol disapu seberkas specular light beam kontinu dengan sudut miring 45 derajat yang memberikan efek kilau kristal modern.",
              buttonLabel: "Shimmer Beam",
            },
            glitchCyberpunk: {
              title: "6. Glitch Cyberpunk",
              badge: "Chromatic Distortion",
              desc: "Saat di-hover, tombol bergetar brutal dengan pergeseran x, y, dan skew cepat asimetris, disertai klon cyan/merah dengan clip-path dan scanline laser.",
              buttonLabel: "CYBERPUNK_SYS",
            },
            particleBurst: {
              title: "7. Particle Burst",
              badge: "Radial Confetti",
              desc: "Saat diklik, 12 partikel neon meledak ke luar dalam radius 360 derajat (-48px s/d 48px) bebas melampaui batas tombol tanpa terpotong overflow-hidden.",
              buttonLabel: "Click for Boom! 💥",
            },
            magneticTilt: {
              title: "8. Magnetic 3D Tilt",
              badge: "Cursor Tracking",
              desc: "Mengikuti posisi kursor mouse secara presisi dengan rotasi 3D tilt (rotateX, rotateY) serta translasi pegas magnetik menggunakan useMotionValue dan useSpring.",
              buttonLabel: "Move Cursor Here",
            },
            liquidGooey: {
              title: "9. Liquid Gooey",
              badge: "Organic Morph",
              desc: "Batas tombol (border-radius) meliuk dan berubah bentuk secara dinamis dan organik saat disentuh kursor, menyerupai fluida cairan kental.",
              buttonLabel: "Liquid Gooey",
            },
            neonPulse: {
              title: "10. Neon Pulse",
              badge: "Infinite Glow Pulse",
              desc: "Animasi box-shadow Framer Motion berdenyut membesar dan memudar secara infinite dengan transisi berkala 1.8 detik.",
              buttonLabel: "Neon Pulse",
            },
            rippleEcho: {
              title: "11. Ripple Echo (Water Ripple)",
              badge: "Cursor Coordinate Ripple",
              desc: "Menggunakan state array ripples: saat diklik, riak air bundar memancar tepat dari titik sentuh kursor dan membesar (scale up) lalu memudar halus.",
              buttonLabel: "Click Anywhere on Me 🌊",
            },
            foldOut: {
              title: "12. Fold Out (3D Origami)",
              badge: "Perspective Unfold",
              desc: "Efek lipatan kertas 3D yang terbuka ke arah pandang pengguna dengan rotasi sumbu X (rotateX: 22deg), perspective 1000px, dan bayangan elevasi mendalam.",
              buttonLabel: "Unfold 3D",
            },
            // swipeFill: {
            //   title: "13. Swipe Fill Curtain",
            //   badge: "Mix Blend Difference",
            //   desc: "Saat di-hover, tirai warna solid menyapu dari kiri ke kanan menutupi tombol, secara dinamis membalik kontras warna teks dengan mix-blend-difference.",
            //   buttonLabel: "Swipe Fill",
            // },
            pixelateMorph: {
              title: "14. Pixelate Morph",
              badge: "Stepped Glitch Filter",
              desc: "Saat di-hover, tombol bergetar patah-patah dengan efek filter blur dan kontras ekstrim secara instan sesaat sebelum kembali tajam ke normal.",
              buttonLabel: "Pixelate Jitter",
            },
            jellyWobble: {
              title: "15. Jelly Wobble",
              badge: "Squash & Stretch",
              desc: "Tombol bergoyang lentur dan membal seperti jelly cair dengan deformasi scaleX dan scaleY bertahap yang elastis saat di-hover.",
              buttonLabel: "Jelly Wobble",
            },
            borderBeam: {
              title: "16. Border Beam",
              badge: "Orbiting Neon Beam",
              desc: "Streak cahaya neon gradient halus yang mengitari border tombol secara kontinu dengan masking latar belakang yang tetap mempertahankan kontras teks.",
              buttonLabel: "Border Beam",
            },
            flip3d: {
              title: "17. Flip 3D (X-Axis)",
              badge: "Preserve-3D Flip",
              desc: "Tombol berputar 180 derajat ke belakang pada sumbu X dengan transform-style: preserve-3d, menampilkan sisi belakang yang elegan saat di-hover.",
              buttonLabel: "Hover to Flip",
            },
            elasticSnap: {
              title: "18. Elastic Snap",
              badge: "Spring Stiffness 400",
              desc: "Saat di-hover, tombol tersentak cepat x: 15 lalu memantul kembali secara pegas elastis berkecepatan tinggi (type: spring, stiffness: 400, damping: 10).",
              buttonLabel: "Snap Rebound",
            },
          },
        },
        navbarDemo: {
          badge: "Navigasi",
          pageTitle: "Navbar Animation",
          pageDesc: "Koleksi 5 variasi animasi navigasi dengan arsitektur, physics gesture, dan tata letak yang berbeda: mulai dari Floating Mac Dock, Magnetic Sliding Pill, Smart Glassmorphism, Morphing Circle, hingga Staggered Fullscreen.",
          searchPlaceholder: "Cari tata letak navbar (contoh: 'enterprise', 'glass', 'pill', 'dropdown', 'ecommerce')...",
          clearSearch: "✕ Hapus",
          collectionTitle: "Koleksi Tata Letak Web Header:",
          showingCount: "Menampilkan {{count}} dari {{total}} tata letak navigasi standar web modern.",
          statusBadge: "Responsif & Siap Pakai",
          emptySearch: "Tidak ditemukan layout navbar dengan kata kunci \"{{query}}\"",
          resetSearch: "Reset pencarian",
          usageSnippet: "Usage Snippet",
          copy: "Salin",
          copied: "✓ Disalin",
          items: {
            enterprise: {
              title: "1. SaaS Enterprise Header",
              badge: "Klasik Full-Width",
              desc: "Layout standar enterprise: Logo di sisi kiri ekstrim, link menu proporsional di tengah dengan animasi garis bawah (underline) mulus menggunakan layoutId Framer Motion saat di-hover, dan grup tombol CTA (Log in & Start Free Trial) di kanan ekstrim.",
            },
            glass: {
              title: "2. Sticky Glassmorphism",
              badge: "Menyusut & Efek Blur",
              desc: "Navbar transparan full-width yang menempel di atas dengan efek backdrop-blur-md halus. Saat di-scroll ke bawah lebih dari 50px (simulasikan tombol di bawah), tinggi navbar menyusut dari 74px ke 58px dan garis border bawah menjadi lebih tegas.",
              simulatorLabel: "Simulasi Status Scroll:",
              normalBtn: "Normal (74px)",
              scrolledBtn: "Scrolled (>50px / 58px)",
            },
            pill: {
              title: "3. Modern Floating Pill",
              badge: "Kapsul Melayang Tengah",
              desc: "Navbar bergaya kapsul melayang (floating pill) dengan margin elegan dari tepi layar dan elevasi shadow lembut. Logo, deretan menu link, icon user account, dan tombol aksi berjejer rapi di dalam satu wadah kapsul.",
            },
            dropdown: {
              title: "4. Stripe-Inspired Dropdown",
              badge: "Mega Popover Animasi",
              desc: "Layout header full-width yang bersih dan rapi. Arahkan kursor ke menu 'Products' atau 'Developers' untuk memunculkan kotak dropdown mega-menu yang memanjang dinamis dengan animasi fade & slide down Framer Motion yang anggun.",
              hint: "* Arahkan kursor (hover) pada menu Products atau Developers di atas.",
            },
            split: {
              title: "5. Split E-Commerce Header",
              badge: "Arsitektur Dua Baris",
              desc: "Header e-commerce profesional dua baris: Baris atas tipis untuk teks pengumuman bebas ongkir dan pilihan bahasa, serta baris bawah untuk Logo toko, Search Bar lebar di tengah, dan barisan icon aksi (Notifikasi, Cart dengan badge counter, dan Akun Saya).",
            },
          },
        },
        iconDemo: {
          badge: "Aset",
          pageTitle: "Web Icons ({{total}} Ikon Esensial)",
          pageDesc: "Koleksi {{total}} ikon SVG web esensial bawaan pustaka @a/ui. Dibuat dengan gaya garis minimalis (stroke width 2, viewBox 24x24), modular, ringan, dan warna dapat dikustomisasi langsung melalui class utility Tailwind CSS (currentColor).",
          searchPlaceholder: "Cari ikon (contoh: 'play', 'cloud', 'cart', 'phone', 'sun', 'code')...",
          clearSearch: "✕ Hapus",
          previewSize: "Ukuran Preview:",
          showingCount: "Menampilkan {{count}} dari {{total}} ikon web esensial.",
          copyTip: "💡 Klik ikon apa saja untuk menyalin snippet JSX",
          emptySearch: "Tidak ditemukan ikon dengan kata kunci \"{{query}}\"",
          resetSearch: "Reset filter dan pencarian",
          clickToCopy: "Klik untuk copy <{{name}} size={{{size}}} />",
          copied: "Copied!",
          categories: {
            all: "Semua",
            navigation: "Navigasi",
            userAccount: "User & Akun",
            actionInteraction: "Aksi & Interaksi",
            systemFeedback: "Sistem & Umpan Balik",
            mediaDocument: "Media & Dokumen",
            ecommerceFinance: "E-Commerce & Keuangan",
            communication: "Komunikasi",
            deviceHardware: "Perangkat & Hardware",
            textEditor: "Editor Teks",
            timeLocation: "Waktu & Lokasi",
          },
        },
      },
    },
  },
  en: {
    translation: {
      nav: {
        gettingStarted: "Getting Started",
        installation: "Installation",
        components: "Components",
        button: "Button",
        navbar: "Navbar",
        search: "Search Animation",
        icons: "Icons",
        webIcons: "Web Icons",
      },
      common: {
        copyCode: "Copy Code",
        copied: "Copied!",
        copy: "Copy",
        preview: "Interactive Preview",
        usage: "Usage",
        props: "Props",
        searchPlaceholder: "Search components or icons...",
        search: "Search",
        close: "Close",
        reset: "Reset",
        all: "All",
        language: "Language",
        version: "v0.1.0",
      },
      theme: {
        dark: "Dark",
        light: "Light",
        system: "System",
        toggle: "Toggle Theme",
      },
      badge: {
        start: "start",
        new: "new",
      },
      header: {
        docs: "docs",
      },
      content: {
        installation: {
          badge: "Getting Started",
          title: "Installation",
          description: "Step-by-step guide to installing and configuring the @a/ui UI Component Library in your React, Vite, or Next.js project.",
          step1: {
            badge: "1",
            title: "Install Package",
            desc: "Choose the package manager used in your project:",
          },
          step2: {
            badge: "2",
            title: "Ensure Peer Dependencies Are Installed",
            desc: "This library requires framer-motion for fluid animations and tailwindcss for utility styling:",
          },
          step3: {
            badge: "3",
            title: "Configure Tailwind CSS",
            desc: "Add the library bundle path to the content configuration in tailwind.config.js so Tailwind classes used by components are not removed during purge/build:",
          },
          step4: {
            badge: "4",
            title: "Start Using Components",
            desc: "Import the components you need directly from the root package:",
          },
          cdn: {
            title: "🌐 Standalone CDN Option (Plain HTML)",
            desc: "If you want to try it directly in an HTML file without a Node.js build step:",
          },
        },
        buttonDemo: {
          badge: "Animations",
          pageTitle: "Button Animation",
          pageDesc: "Button component architecture decoupling Visual Style (Tailwind) and Interactive Physics (Framer Motion), featuring 18 unified interactive animations without tier/tab boundaries, complete with fast search filtering.",
          searchPlaceholder: "Search across 18 animations (e.g., 'ripple', 'beam', 'jelly', 'tilt', 'neon')...",
          clearSearch: "✕ Clear",
          variantLabel: "Select Visual Variant (Color Style):",
          showingCount: "Showing {{count}} of {{total}} button animations.",
          emptySearch: "No button animations found matching \"{{query}}\"",
          resetSearch: "Reset search",
          usageSnippet: "Usage Snippet",
          copy: "Copy",
          copied: "✓ Copied",
          items: {
            springBounce: {
              title: "1. Spring Bounce",
              badge: "Elastic Physics",
              desc: "Framer Motion micro spring physics: subtly scales up on hover (scale: 1.04) and snaps back elastically on tap/click (scale: 0.92).",
              buttonLabel: "Spring Bounce",
            },
            press3d: {
              title: "2. Press 3D (Tactile)",
              badge: "Depth Extrusion",
              desc: "3D mechanical extrusion: physical 4px bottom border tactilely depresses downward (translateY: 4px) on click like an arcade cabinet button.",
              buttonLabel: "Press 3D",
            },
            slideReveal: {
              title: "3. Slide & Wipe Reveal",
              badge: "Directional Slide",
              desc: "Overflow-hidden slide: on hover, text shifts left while an arrow icon slides in from the right edge with a smooth fade transition.",
              buttonLabel: "Hover Me",
            },
            magneticGlow: {
              title: "4. Magnetic Float Glow",
              badge: "Ambient Glow",
              desc: "Button floats upward (-3px) on hover, accompanied by a dynamic radial gradient neon glow aura expanding behind it.",
              buttonLabel: "Floating Glow",
            },
            shimmerSweep: {
              title: "5. Shimmer Sweep",
              badge: "Specular Beam",
              desc: "A continuous 45-degree angled specular beam sweeps across the button surface, delivering a clean crystal sheen.",
              buttonLabel: "Shimmer Beam",
            },
            glitchCyberpunk: {
              title: "6. Glitch Cyberpunk",
              badge: "Chromatic Distortion",
              desc: "On hover, the button glitches aggressively with asymmetric rapid x/y offsets and cyan/magenta scanline chromatic aberration clones.",
              buttonLabel: "CYBERPUNK_SYS",
            },
            particleBurst: {
              title: "7. Particle Burst",
              badge: "Radial Confetti",
              desc: "On click, 12 neon particles burst in a 360-degree radius (-48px to 48px) radiating beyond button borders without overflow clipping.",
              buttonLabel: "Click for Boom! 💥",
            },
            magneticTilt: {
              title: "8. Magnetic 3D Tilt",
              badge: "Cursor Tracking",
              desc: "Accurately tracks cursor coordinates with 3D tilt rotation (rotateX, rotateY) and magnetic spring translation using useMotionValue and useSpring.",
              buttonLabel: "Move Cursor Here",
            },
            liquidGooey: {
              title: "9. Liquid Gooey",
              badge: "Organic Morph",
              desc: "Button borders dynamically undulate and morph into organic shapes when hovered, resembling viscous fluid liquid.",
              buttonLabel: "Liquid Gooey",
            },
            neonPulse: {
              title: "10. Neon Pulse",
              badge: "Infinite Glow Pulse",
              desc: "Rhythmic, continuous blue neon glow aura pulsating indefinitely using Framer Motion box-shadow keyframes.",
              buttonLabel: "Neon Pulse",
            },
            rippleEcho: {
              title: "11. Ripple Echo (Water Ripple)",
              badge: "Cursor Coordinate Ripple",
              desc: "Circular liquid ripple expanding outward from the exact click coordinates (clientX, clientY) before fading gracefully at the edges.",
              buttonLabel: "Click Anywhere on Me 🌊",
            },
            foldOut: {
              title: "12. Fold Out (3D Origami)",
              badge: "Perspective Unfold",
              desc: "Origami 3D perspective unfold: button opens forward along the X-axis (rotateX: 22deg) with 1000px perspective and realistic depth shadow.",
              buttonLabel: "Unfold 3D",
            },
            // swipeFill: {
            //   title: "13. Swipe Fill Curtain",
            //   badge: "Mix Blend Difference",
            //   desc: "On hover, a solid accent curtain sweeps from left to right covering the button, dynamically inverting text contrast with mix-blend-difference.",
            //   buttonLabel: "Swipe Fill",
            // },
            pixelateMorph: {
              title: "14. Pixelate Morph",
              badge: "Stepped Glitch Filter",
              desc: "On hover, button jitters with stepped blur and extreme contrast filter effects for a moment before snapping back sharp to normal.",
              buttonLabel: "Pixelate Jitter",
            },
            jellyWobble: {
              title: "15. Jelly Wobble",
              badge: "Squash & Stretch",
              desc: "Button flexes and wobbles like liquid jelly with stepped, elastic scaleX and scaleY deformations on hover.",
              buttonLabel: "Jelly Wobble",
            },
            borderBeam: {
              title: "16. Border Beam",
              badge: "Orbiting Neon Beam",
              desc: "Conic neon laser beam continuously traveling around the perimeter border of the button, leaving an illuminated dynamic trail.",
              buttonLabel: "Border Beam",
            },
            flip3d: {
              title: "17. Flip 3D (X-Axis)",
              badge: "Preserve-3D Flip",
              desc: "Button flips 180 degrees backwards on the X-axis with transform-style: preserve-3d, revealing an elegant reverse side on hover.",
              buttonLabel: "Hover to Flip",
            },
            elasticSnap: {
              title: "18. Elastic Snap",
              badge: "Spring Stiffness 400",
              desc: "On hover, button snaps abruptly to x: 15 and rebounds with high-velocity spring physics (type: spring, stiffness: 400, damping: 10).",
              buttonLabel: "Snap Rebound",
            },
          },
        },
        navbarDemo: {
          badge: "Navigation",
          pageTitle: "Navbar Animation",
          pageDesc: "A collection of 5 distinct navigation layouts and animations: from Floating Mac Dock, Magnetic Sliding Pill, Smart Glassmorphism, Morphing Circle, to Staggered Fullscreen.",
          searchPlaceholder: "Search navbar layouts (e.g., 'enterprise', 'glass', 'pill', 'dropdown', 'ecommerce')...",
          clearSearch: "✕ Clear",
          collectionTitle: "Web Header Layout Collection:",
          showingCount: "Showing {{count}} of {{total}} modern web navigation layouts.",
          statusBadge: "Responsive & Production Ready",
          emptySearch: "No navbar layouts found matching \"{{query}}\"",
          resetSearch: "Reset search",
          usageSnippet: "Usage Snippet",
          copy: "Copy",
          copied: "✓ Copied",
          items: {
            enterprise: {
              title: "1. SaaS Enterprise Header",
              badge: "Full-Width Classic",
              desc: "Enterprise standard layout: Leftmost logo, balanced center menu links with smooth layoutId underline hover animation, and rightmost CTA button group (Log in & Start Free Trial).",
            },
            glass: {
              title: "2. Sticky Glassmorphism",
              badge: "Shrink & Backdrop Blur",
              desc: "Sticky full-width translucent navbar with subtle backdrop blur. When scrolling down over 50px (simulated below), height shrinks from 74px to 58px and the bottom border crisps.",
              simulatorLabel: "Scroll Status Simulator:",
              normalBtn: "Normal (74px)",
              scrolledBtn: "Scrolled (>50px / 58px)",
            },
            pill: {
              title: "3. Modern Floating Pill",
              badge: "Centered Island Capsule",
              desc: "Floating pill capsule navbar with generous margins from the viewport edge and soft elevation shadow. Logo, navigation links, user avatar, and action button are neatly aligned inside a single capsule.",
            },
            dropdown: {
              title: "4. Stripe-Inspired Dropdown",
              badge: "Animated Mega Popover",
              desc: "Clean full-width layout. Hover over 'Products' or 'Developers' to reveal a dynamic mega-menu dropdown with graceful Framer Motion fade & slide down animation.",
              hint: "* Hover over Products or Developers in the navbar above.",
            },
            split: {
              title: "5. Split E-Commerce Header",
              badge: "Two-Tier Architecture",
              desc: "Professional two-tier e-commerce header: Ultra-slim top row for free shipping promo and localization, and bottom row for store logo, wide search bar, and action icons (Notifications, Cart with badge counter, and Account).",
            },
          },
        },
        iconDemo: {
          badge: "Assets",
          pageTitle: "Web Icons ({{total}} Essential Icons)",
          pageDesc: "Collection of {{total}} built-in essential web SVG icons in @a/ui. Designed with minimalist outline style (stroke width 2, viewBox 24x24), modular, lightweight, and fully styleable via Tailwind CSS utilities (currentColor).",
          searchPlaceholder: "Search icons (e.g. 'play', 'cloud', 'cart', 'phone', 'sun', 'code')...",
          clearSearch: "✕ Clear",
          previewSize: "Preview Size:",
          showingCount: "Showing {{count}} of {{total}} essential web icons.",
          copyTip: "💡 Click any icon to copy its JSX snippet",
          emptySearch: "No icons found matching \"{{query}}\"",
          resetSearch: "Reset filter and search",
          clickToCopy: "Click to copy <{{name}} size={{{size}}} />",
          copied: "Copied!",
          categories: {
            all: "All",
            navigation: "Navigation",
            userAccount: "User & Account",
            actionInteraction: "Actions & Interactions",
            systemFeedback: "System & Feedback",
            mediaDocument: "Media & Document",
            ecommerceFinance: "E-Commerce & Finance",
            communication: "Communication",
            deviceHardware: "Devices & Hardware",
            textEditor: "Text Editor",
            timeLocation: "Time & Location",
          },
        },
      },
    },
  },
} as const;

// Ambil preferensi bahasa tersimpan di localStorage, fallback ke browser atau default "id"
const getInitialLanguage = (): string => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("ui-language");
    if (saved === "id" || saved === "en") return saved;
    const browserLang = navigator.language?.slice(0, 2);
    if (browserLang === "en") return "en";
  }
  return "id";
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "id",
    defaultNS,
    interpolation: {
      escapeValue: false, // React sudah otomatis aman dari XSS
    },
  });

// Simpan ke localStorage setiap kali bahasa berubah
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ui-language", lng);
  }
});

export default i18n;
