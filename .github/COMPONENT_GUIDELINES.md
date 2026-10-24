# 🛠️ NeedUI Component Development Guidelines

Dokumen ini adalah standar mutlak untuk merancang, membangun, dan mendokumentasikan komponen di dalam ekosistem `@needui/ui-kit`. Semua komponen baru atau hasil *refactor* harus mematuhi aturan berikut.

---

## 1. Arsitektur Komponen (Anatomy)
Setiap komponen harus dirancang agar *composable*, mudah ditimpa (*override*), dan aman dari bentrok CSS.

- **`forwardRef`:** Semua komponen UI dasar wajib dibungkus dengan `React.forwardRef` agar *end-user* dapat mengakses elemen DOM langsung (berguna untuk integrasi *library* animasi atau aksesibilitas).
- **TypeScript Interfaces:** Interface wajib meng-*extend* atribut HTML *native*.
- **Class Merging:** Selalu gunakan fungsi utilitas `cn()` (kombinasi `clsx` dan `tailwind-merge`) untuk menggabungkan `className` bawaan komponen dengan `className` yang dikirim oleh *user*.

---

## 2. Standardisasi Props (CVA)
Gunakan `class-variance-authority` (`cva`) untuk mengelola gaya visual komponen. Setiap komponen UI utama wajib memiliki props standar berikut:

* **`variant`**: Menentukan gaya warna/tema (contoh: `default`, `secondary`, `destructive`, `outline`, `ghost`).
* **`size`**: Menentukan dimensi, padding, dan font-size (contoh: `default`, `sm`, `lg`, `icon`).
* **`className`**: Wajib diekspos agar *user* bisa menyuntikkan class Tailwind kustom.

### Contoh Implementasi Standar:
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn"; // atau "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200",
        outline: "border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

---

## 3. Aturan Animasi
- **Framer Motion Only:** Jika komponen membutuhkan animasi kompleks interaktif, gunakan HANYA `framer-motion`.
- **Dilarang GSAP:** Jangan memasukkan library animasi eksternal lain agar ukuran bundle tetap efisien.
- **Hardware Acceleration:** Prioritaskan penganimasian `transform` (`x`, `y`, `scale`) dan `opacity` untuk menghindari *layout thrashing*.

---

## 4. Standar Dokumentasi (Props Table)
Setiap komponen wajib menyertakan tabel "Props API Reference" di bagian paling bawah halaman dokumentasinya. Tabel harus mengikuti format Markdown ini:

### Props API Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Menentukan gaya visual tombol. |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Mengatur dimensi ukuran tombol. |
| `className` | `string` | `undefined` | Class tambahan Tailwind CSS. |

---

## 5. Master Prompt AI (Untuk Membuat / Refactor Komponen Baru)

Gunakan *master prompt* berikut setiap kali Anda meminta AI (asisten di VS Code, Cursor, Windsurf, dsb.) untuk membuat atau merefaktor komponen apa pun di NeedUI:

```plaintext
[ROLE & SYSTEM INSTRUCTION]
Bertindaklah sebagai Senior Frontend Architect dan Core Maintainer dari UI Kit @needui/ui-kit. 
KRITIKAL: DILARANG MALAS. Berikan kode komponen secara utuh dan fungsional, jangan gunakan placeholder atau memotong kode.

[CURRENT TASK / PROBLEM]
Saya ingin membuat/merefactor komponen [NAMA KOMPONEN] ke dalam arsitektur @needui/ui-kit.
WAJIB patuhi standar arsitektur modular NeedUI yang terinspirasi dari shadcn/ui. Komponen harus sangat fleksibel, menggunakan cva untuk varian, dan tailwind-merge untuk penggabungan class.

[REQUIREMENTS - COMPONENT STANDARDS]
Terapkan spesifikasi mutlak berikut pada komponen:
1. Dependencies & Styling: Gunakan cva untuk mengatur state visual (variant, size). Gabungkan class menggunakan utilitas cn (clsx + tailwind-merge) pada elemen root.
2. Standard Props: Komponen wajib menerima prop className opsional, variant (default, outline, ghost, dll), dan size (sm, md, lg, icon).
3. React Patterns: Ekspor komponen menggunakan React.forwardRef lengkap dengan TypeScript interface yang meng-extend tipe HTML native (misal: React.ButtonHTMLAttributes<HTMLButtonElement>).
4. Framer Motion (Jika Ada Animasi): DILARANG menggunakan GSAP. Gunakan murni framer-motion (opsional: useMotionValue, useSpring, variants).

[EXPECTED OUTPUT]
1. COMPONENT SOURCE: Berikan kode sumber TypeScript/React secara utuh (src/components/[NamaKomponen]/[NamaKomponen].tsx).
2. DOCS (PROPS TABLE): Buatkan blok Markdown ### Props API Reference yang berisi tabel detail props (Prop, Type, Default, Description) untuk diletakkan di dokumentasi.
```
