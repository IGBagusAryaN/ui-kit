import { forwardRef } from "react";
import type { IconProps } from "./types";
import { IconBase } from "./IconBase";

/** SearchIcon - Ikon kaca pembesar untuk pencarian */
export const SearchIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </IconBase>
  )
);
SearchIcon.displayName = "SearchIcon";

/** MenuIcon - Ikon hamburger 3 garis untuk navigasi/sidebar */
export const MenuIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </IconBase>
  )
);
MenuIcon.displayName = "MenuIcon";

/** CloseIcon - Ikon silang (X) untuk tutup modal, drawer, atau clear input */
export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconBase>
  )
);
CloseIcon.displayName = "CloseIcon";

/** ChevronDownIcon - Ikon panah bawah untuk dropdown & accordion */
export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  )
);
ChevronDownIcon.displayName = "ChevronDownIcon";

/** ChevronUpIcon - Ikon panah atas untuk collapse dropdown & accordion */
export const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m18 15-6-6-6 6" />
    </IconBase>
  )
);
ChevronUpIcon.displayName = "ChevronUpIcon";

/** ChevronLeftIcon - Ikon panah kiri untuk pagination & back step */
export const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  )
);
ChevronLeftIcon.displayName = "ChevronLeftIcon";

/** ChevronRightIcon - Ikon panah kanan untuk pagination & next step */
export const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  )
);
ChevronRightIcon.displayName = "ChevronRightIcon";

/** ArrowRightIcon - Ikon panah panjang ke kanan untuk tombol aksi / link */
export const ArrowRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </IconBase>
  )
);
ArrowRightIcon.displayName = "ArrowRightIcon";

/** ArrowLeftIcon - Ikon panah panjang ke kiri untuk navigasi kembali */
export const ArrowLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </IconBase>
  )
);
ArrowLeftIcon.displayName = "ArrowLeftIcon";

/** UserIcon - Ikon profil pengguna tunggal */
export const UserIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  )
);
UserIcon.displayName = "UserIcon";

/** UsersIcon - Ikon grup pengguna / tim */
export const UsersIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  )
);
UsersIcon.displayName = "UsersIcon";

/** LoginIcon - Ikon masuk akun / sign-in (pintu dengan panah masuk) */
export const LoginIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </IconBase>
  )
);
LoginIcon.displayName = "LoginIcon";

/** LogoutIcon - Ikon keluar akun / sign-out (pintu dengan panah keluar) */
export const LogoutIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </IconBase>
  )
);
LogoutIcon.displayName = "LogoutIcon";

/** ShieldIcon - Ikon perisai keamanan dan privasi */
export const ShieldIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </IconBase>
  )
);
ShieldIcon.displayName = "ShieldIcon";

/** PlusIcon - Ikon tambah (plus) untuk create / add item */
export const PlusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </IconBase>
  )
);
PlusIcon.displayName = "PlusIcon";

/** MinusIcon - Ikon kurang (minus) untuk collapse atau decrement */
export const MinusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 12h14" />
    </IconBase>
  )
);
MinusIcon.displayName = "MinusIcon";

/** EditIcon - Ikon pensil untuk ubah atau edit konten */
export const EditIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </IconBase>
  )
);
EditIcon.displayName = "EditIcon";

/** TrashIcon - Ikon tempat sampah untuk hapus / delete */
export const TrashIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </IconBase>
  )
);
TrashIcon.displayName = "TrashIcon";

/** CheckIcon - Ikon centang tunggal untuk konfirmasi / status */
export const CheckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </IconBase>
  )
);
CheckIcon.displayName = "CheckIcon";

/** CopyIcon - Ikon salin dokumen/clipboard */
export const CopyIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </IconBase>
  )
);
CopyIcon.displayName = "CopyIcon";

/** ExternalLinkIcon - Ikon tautan keluar tab baru */
export const ExternalLinkIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </IconBase>
  )
);
ExternalLinkIcon.displayName = "ExternalLinkIcon";

/** SettingsIcon - Ikon roda gigi untuk pengaturan aplikasi */
export const SettingsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  )
);
SettingsIcon.displayName = "SettingsIcon";

/** BellIcon - Ikon lonceng notifikasi */
export const BellIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </IconBase>
  )
);
BellIcon.displayName = "BellIcon";

/** InfoIcon - Ikon tanda informasi dalam lingkaran */
export const InfoIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </IconBase>
  )
);
InfoIcon.displayName = "InfoIcon";

/** AlertTriangleIcon - Ikon segitiga peringatan (warning) */
export const AlertTriangleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </IconBase>
  )
);
AlertTriangleIcon.displayName = "AlertTriangleIcon";

/** CheckCircleIcon - Ikon centang sukses dalam lingkaran */
export const CheckCircleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  )
);
CheckCircleIcon.displayName = "CheckCircleIcon";

/** ImageIcon - Ikon gambar foto / ilustrasi */
export const ImageIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </IconBase>
  )
);
ImageIcon.displayName = "ImageIcon";

/** FileTextIcon - Ikon lembar dokumen / file teks */
export const FileTextIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </IconBase>
  )
);
FileTextIcon.displayName = "FileTextIcon";

/** DownloadIcon - Ikon unduh file ke perangkat */
export const DownloadIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </IconBase>
  )
);
DownloadIcon.displayName = "DownloadIcon";

/** UploadIcon - Ikon unggah file ke server / cloud */
export const UploadIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </IconBase>
  )
);
UploadIcon.displayName = "UploadIcon";

/** ShoppingCartIcon - Ikon troli / keranjang belanja */
export const ShoppingCartIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </IconBase>
  )
);
ShoppingCartIcon.displayName = "ShoppingCartIcon";

/** ShoppingBagIcon - Ikon tas belanja / kantong checkout */
export const ShoppingBagIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </IconBase>
  )
);
ShoppingBagIcon.displayName = "ShoppingBagIcon";

/** CreditCardIcon - Ikon kartu kredit / debit / pembayaran */
export const CreditCardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </IconBase>
  )
);
CreditCardIcon.displayName = "CreditCardIcon";

/** WalletIcon - Ikon dompet digital / saldo e-wallet */
export const WalletIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
      <path d="M16 12h5v4h-5a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z" />
      <circle cx="18" cy="14" r="0.75" fill="currentColor" stroke="none" />
    </IconBase>
  )
);
WalletIcon.displayName = "WalletIcon";

/** TagIcon - Ikon label harga / diskon / promosi */
export const TagIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </IconBase>
  )
);
TagIcon.displayName = "TagIcon";

/** ReceiptIcon - Ikon struk / bukti transaksi / invoice */
export const ReceiptIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
    </IconBase>
  )
);
ReceiptIcon.displayName = "ReceiptIcon";

/** BanknoteIcon - Ikon uang kertas / cash */
export const BanknoteIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </IconBase>
  )
);
BanknoteIcon.displayName = "BanknoteIcon";

/** MailIcon - Ikon amplop / email */
export const MailIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </IconBase>
  )
);
MailIcon.displayName = "MailIcon";

/** PhoneIcon - Ikon telepon / panggilan suara */
export const PhoneIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  )
);
PhoneIcon.displayName = "PhoneIcon";

/** MessageCircleIcon - Ikon gelembung chat bulat */
export const MessageCircleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </IconBase>
  )
);
MessageCircleIcon.displayName = "MessageCircleIcon";

/** MessageSquareIcon - Ikon gelembung chat persegi */
export const MessageSquareIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
  )
);
MessageSquareIcon.displayName = "MessageSquareIcon";

/** SendIcon - Ikon pesawat kertas / kirim pesan */
export const SendIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconBase>
  )
);
SendIcon.displayName = "SendIcon";

/** ShareIcon - Ikon bagikan tautan / share konten */
export const ShareIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </IconBase>
  )
);
ShareIcon.displayName = "ShareIcon";

/** MonitorIcon - Ikon layar desktop / monitor PC */
export const MonitorIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </IconBase>
  )
);
MonitorIcon.displayName = "MonitorIcon";

/** SmartphoneIcon - Ikon smartphone / HP */
export const SmartphoneIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </IconBase>
  )
);
SmartphoneIcon.displayName = "SmartphoneIcon";

/** LaptopIcon - Ikon komputer jinjing / laptop */
export const LaptopIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M2 19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1l-2-3H4Z" />
    </IconBase>
  )
);
LaptopIcon.displayName = "LaptopIcon";

/** TabletIcon - Ikon gadget tablet / iPad */
export const TabletIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </IconBase>
  )
);
TabletIcon.displayName = "TabletIcon";

/** HardDriveIcon - Ikon penyimpanan internal / HDD / SSD */
export const HardDriveIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </IconBase>
  )
);
HardDriveIcon.displayName = "HardDriveIcon";

/** CameraIcon - Ikon kamera foto / tangkapan gambar */
export const CameraIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </IconBase>
  )
);
CameraIcon.displayName = "CameraIcon";

/** BoldIcon - Ikon format teks tebal (bold) */
export const BoldIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </IconBase>
  )
);
BoldIcon.displayName = "BoldIcon";

/** ItalicIcon - Ikon format teks miring (italic) */
export const ItalicIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </IconBase>
  )
);
ItalicIcon.displayName = "ItalicIcon";

/** UnderlineIcon - Ikon format garis bawah (underline) */
export const UnderlineIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </IconBase>
  )
);
UnderlineIcon.displayName = "UnderlineIcon";

/** AlignLeftIcon - Ikon perataan teks rata kiri */
export const AlignLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </IconBase>
  )
);
AlignLeftIcon.displayName = "AlignLeftIcon";

/** AlignCenterIcon - Ikon perataan teks rata tengah */
export const AlignCenterIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="18" y1="10" x2="6" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="18" y1="18" x2="6" y2="18" />
    </IconBase>
  )
);
AlignCenterIcon.displayName = "AlignCenterIcon";

/** AlignRightIcon - Ikon perataan teks rata kanan */
export const AlignRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="21" y1="10" x2="7" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </IconBase>
  )
);
AlignRightIcon.displayName = "AlignRightIcon";

/** ClockIcon - Ikon jam / waktu / durasi */
export const ClockIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </IconBase>
  )
);
ClockIcon.displayName = "ClockIcon";

/** CalendarIcon - Ikon kalender / agenda tanggal */
export const CalendarIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconBase>
  )
);
CalendarIcon.displayName = "CalendarIcon";

/** MapPinIcon - Ikon pin lokasi / titik peta */
export const MapPinIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  )
);
MapPinIcon.displayName = "MapPinIcon";

/** MapIcon - Ikon peta / navigasi rute */
export const MapIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </IconBase>
  )
);
MapIcon.displayName = "MapIcon";

/** CompassIcon - Ikon kompas arah */
export const CompassIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </IconBase>
  )
);
CompassIcon.displayName = "CompassIcon";

/** PlayIcon - Ikon pemutar media segitiga */
export const PlayIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </IconBase>
  )
);
PlayIcon.displayName = "PlayIcon";

/** PauseIcon - Ikon jeda pemutaran media */
export const PauseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </IconBase>
  )
);
PauseIcon.displayName = "PauseIcon";

/** StopIcon - Ikon henti media kotak */
export const StopIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </IconBase>
  )
);
StopIcon.displayName = "StopIcon";

/** SkipForwardIcon - Ikon lewati ke trek berikutnya */
export const SkipForwardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </IconBase>
  )
);
SkipForwardIcon.displayName = "SkipForwardIcon";

/** SkipBackIcon - Ikon kembali ke trek sebelumnya */
export const SkipBackIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" />
    </IconBase>
  )
);
SkipBackIcon.displayName = "SkipBackIcon";

/** VolumeXIcon - Ikon audio dibisukan (mute) */
export const VolumeXIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </IconBase>
  )
);
VolumeXIcon.displayName = "VolumeXIcon";

/** Volume2Icon - Ikon audio volume maksimal */
export const Volume2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </IconBase>
  )
);
Volume2Icon.displayName = "Volume2Icon";

/** VideoIcon - Ikon kamera video */
export const VideoIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </IconBase>
  )
);
VideoIcon.displayName = "VideoIcon";

/** LinkIcon - Ikon tautan / link */
export const LinkIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </IconBase>
  )
);
LinkIcon.displayName = "LinkIcon";

/** ListIcon - Ikon daftar berpoin / bullet list */
export const ListIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </IconBase>
  )
);
ListIcon.displayName = "ListIcon";

/** DatabaseIcon - Ikon server database */
export const DatabaseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </IconBase>
  )
);
DatabaseIcon.displayName = "DatabaseIcon";

/** CloudIcon - Ikon awan cloud */
export const CloudIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </IconBase>
  )
);
CloudIcon.displayName = "CloudIcon";

/** TerminalIcon - Ikon command prompt CLI */
export const TerminalIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </IconBase>
  )
);
TerminalIcon.displayName = "TerminalIcon";

/** CodeIcon - Ikon kurung siku kode (< >) */
export const CodeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </IconBase>
  )
);
CodeIcon.displayName = "CodeIcon";

/** SunIcon - Ikon matahari cerah */
export const SunIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </IconBase>
  )
);
SunIcon.displayName = "SunIcon";

/** MoonIcon - Ikon bulan sabit */
export const MoonIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </IconBase>
  )
);
MoonIcon.displayName = "MoonIcon";

/** GlobeIcon - Ikon bola dunia */
export const GlobeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconBase>
  )
);
GlobeIcon.displayName = "GlobeIcon";

export const Map = MapIcon;
export const MapPin = MapPinIcon;
export const Compass = CompassIcon;
export const Copy = CopyIcon;
export const ShoppingBag = ShoppingBagIcon;
export const ShoppingCart = ShoppingCartIcon;

