import type React from "react";

/**
 * Interface dasar untuk seluruh koleksi komponen ikon SVG NeedUI.
 * Menerima `size` (default: 24), `strokeWidth` (default: 2),
 * dan mewarisi seluruh atribut standar SVGElement.
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Ukuran lebar dan tinggi ikon dalam pixel atau unit CSS (default: 24) */
  size?: number | string;
  /** Ketebalan garis stroke ikon (default: 2) */
  strokeWidth?: number | string;
  /** Class utility Tailwind CSS untuk warna teks, margin, hover, dll */
  className?: string;
}
