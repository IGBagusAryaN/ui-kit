import { forwardRef } from "react";
import type { IconProps } from "./types";
import { IconBase } from "./IconBase";

/** FolderIcon - Ikon direktori / folder dokumen */
export const FolderIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
    </IconBase>
  )
);
FolderIcon.displayName = "FolderIcon";

/** FolderOpenIcon - Ikon folder terbuka */
export const FolderOpenIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
    </IconBase>
  )
);
FolderOpenIcon.displayName = "FolderOpenIcon";

/** FileIcon - Ikon lembar dokumen polos */
export const FileIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </IconBase>
  )
);
FileIcon.displayName = "FileIcon";

/** FilePlusIcon - Ikon tambah dokumen */
export const FilePlusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </IconBase>
  )
);
FilePlusIcon.displayName = "FilePlusIcon";

/** FileMinusIcon - Ikon kurangi/hapus dokumen */
export const FileMinusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </IconBase>
  )
);
FileMinusIcon.displayName = "FileMinusIcon";

/** PhoneCallIcon - Ikon panggilan telepon aktif */
export const PhoneCallIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  )
);
PhoneCallIcon.displayName = "PhoneCallIcon";

/** BellRingIcon - Ikon lonceng berdering */
export const BellRingIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
      <path d="M22 8c0-2.3-.8-4.3-2-6" />
    </IconBase>
  )
);
BellRingIcon.displayName = "BellRingIcon";

/** LockIcon - Ikon gembok terkunci */
export const LockIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconBase>
  )
);
LockIcon.displayName = "LockIcon";

/** UnlockIcon - Ikon gembok terbuka */
export const UnlockIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </IconBase>
  )
);
UnlockIcon.displayName = "UnlockIcon";

/** ShieldCheckIcon - Ikon perisai terverifikasi */
export const ShieldCheckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  )
);
ShieldCheckIcon.displayName = "ShieldCheckIcon";

/** KeyIcon - Ikon kunci akses */
export const KeyIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </IconBase>
  )
);
KeyIcon.displayName = "KeyIcon";

/** Share2Icon - Ikon bagikan jaringan simpul (nodes) */
export const Share2Icon = forwardRef<SVGSVGElement, IconProps>(
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
Share2Icon.displayName = "Share2Icon";

/** RefreshCwIcon - Ikon muat ulang / reload loop melingkar */
export const RefreshCwIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </IconBase>
  )
);
RefreshCwIcon.displayName = "RefreshCwIcon";

/** PowerIcon - Ikon tombol daya On/Off */
export const PowerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </IconBase>
  )
);
PowerIcon.displayName = "PowerIcon";

/** GridIcon - Ikon kisi layout kotak */
export const GridIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </IconBase>
  )
);
GridIcon.displayName = "GridIcon";

/** LayoutIcon - Ikon tata letak halaman / dashboard */
export const LayoutIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </IconBase>
  )
);
LayoutIcon.displayName = "LayoutIcon";

/** LayersIcon - Ikon tumpukan lapisan layer */
export const LayersIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </IconBase>
  )
);
LayersIcon.displayName = "LayersIcon";

/** MaximizeIcon - Ikon perbesar ke layar penuh */
export const MaximizeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </IconBase>
  )
);
MaximizeIcon.displayName = "MaximizeIcon";

/** MinimizeIcon - Ikon perkecil / keluar layar penuh */
export const MinimizeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </IconBase>
  )
);
MinimizeIcon.displayName = "MinimizeIcon";

/** ZapIcon - Ikon petir / kilat */
export const ZapIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </IconBase>
  )
);
ZapIcon.displayName = "ZapIcon";

/** AwardIcon - Ikon lencana penghargaan / medali pita */
export const AwardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </IconBase>
  )
);
AwardIcon.displayName = "AwardIcon";

/** StarIcon - Ikon bintang */
export const StarIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </IconBase>
  )
);
StarIcon.displayName = "StarIcon";

/** NavigationIcon - Ikon panah arah navigasi / kompas penunjuk */
export const NavigationIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </IconBase>
  )
);
NavigationIcon.displayName = "NavigationIcon";
export const Navigation = NavigationIcon;

/** FlagIcon - Ikon bendera penanda / patok lokasi */
export const FlagIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </IconBase>
  )
);
FlagIcon.displayName = "FlagIcon";
export const Flag = FlagIcon;

/** ScissorsIcon - Ikon gunting pemotong teks / media */
export const ScissorsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </IconBase>
  )
);
ScissorsIcon.displayName = "ScissorsIcon";
export const Scissors = ScissorsIcon;

/** ClipboardIcon - Ikon papan klip dokumen */
export const ClipboardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </IconBase>
  )
);
ClipboardIcon.displayName = "ClipboardIcon";
export const Clipboard = ClipboardIcon;

/** Edit2Icon - Ikon pena standar untuk menulis / mengedit */
export const Edit2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </IconBase>
  )
);
Edit2Icon.displayName = "Edit2Icon";
export const Edit2 = Edit2Icon;

/** Edit3Icon - Ikon pensil menggaris */
export const Edit3Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </IconBase>
  )
);
Edit3Icon.displayName = "Edit3Icon";
export const Edit3 = Edit3Icon;

/** PenToolIcon - Ikon mata pena kurva vektor (Bezier Pen Tool) */
export const PenToolIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </IconBase>
  )
);
PenToolIcon.displayName = "PenToolIcon";
export const PenTool = PenToolIcon;

/** CropIcon - Ikon pangkas / potong bingkai gambar */
export const CropIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </IconBase>
  )
);
CropIcon.displayName = "CropIcon";
export const Crop = CropIcon;

/** MicIcon - Ikon mikrofon perekam suara */
export const MicIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </IconBase>
  )
);
MicIcon.displayName = "MicIcon";
export const Mic = MicIcon;

/** MicOffIcon - Ikon mikrofon dimatikan / bisu */
export const MicOffIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </IconBase>
  )
);
MicOffIcon.displayName = "MicOffIcon";
export const MicOff = MicOffIcon;

/** HeadphonesIcon - Ikon penyuara telinga / headset */
export const HeadphonesIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </IconBase>
  )
);
HeadphonesIcon.displayName = "HeadphonesIcon";
export const Headphones = HeadphonesIcon;

/** MusicIcon - Ikon not musik */
export const MusicIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </IconBase>
  )
);
MusicIcon.displayName = "MusicIcon";
export const Music = MusicIcon;

/** CastIcon - Ikon transmisi siaran / cast layar nirkabel */
export const CastIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
      <line x1="2" y1="20" x2="2.01" y2="20" />
    </IconBase>
  )
);
CastIcon.displayName = "CastIcon";
export const Cast = CastIcon;

/** RadioIcon - Ikon frekuensi radio gelombang nirkabel */
export const RadioIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
    </IconBase>
  )
);
RadioIcon.displayName = "RadioIcon";
export const Radio = RadioIcon;

/** GiftIcon - Ikon kotak hadiah kado dengan pita */
export const GiftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" rx="1" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </IconBase>
  )
);
GiftIcon.displayName = "GiftIcon";
export const Gift = GiftIcon;

/** BoxIcon - Ikon kotak kardus kemasan isometrik */
export const BoxIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </IconBase>
  )
);
BoxIcon.displayName = "BoxIcon";
export const Box = BoxIcon;

/** PackageIcon - Ikon paket pengiriman dengan lipatan segel */
export const PackageIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </IconBase>
  )
);
PackageIcon.displayName = "PackageIcon";
export const Package = PackageIcon;

/** Trash2Icon - Ikon tempat sampah alternatif dengan garis vertikal */
export const Trash2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </IconBase>
  )
);
Trash2Icon.displayName = "Trash2Icon";
export const Trash2 = Trash2Icon;

/** BatteryIcon - Ikon baterai daya perangkat */
export const BatteryIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" y1="11" x2="22" y2="13" />
    </IconBase>
  )
);
BatteryIcon.displayName = "BatteryIcon";
export const Battery = BatteryIcon;

/** BatteryChargingIcon - Ikon baterai dalam status pengisian daya (charging) */
export const BatteryChargingIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
      <line x1="22" y1="11" x2="22" y2="13" />
      <polyline points="11 6 7 12 13 12 9 18" />
    </IconBase>
  )
);
BatteryChargingIcon.displayName = "BatteryChargingIcon";
export const BatteryCharging = BatteryChargingIcon;

/** CrosshairIcon - Ikon bidikan retikel crosshair presisi */
export const CrosshairIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </IconBase>
  )
);
CrosshairIcon.displayName = "CrosshairIcon";
export const Crosshair = CrosshairIcon;

/** TargetIcon - Ikon lingkaran target sasaran (bullseye) */
export const TargetIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  )
);
TargetIcon.displayName = "TargetIcon";
export const Target = TargetIcon;

/** ActivityIcon - Ikon gelombang denyut nadi / aktivitas jantung (ECG) */
export const ActivityIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </IconBase>
  )
);
ActivityIcon.displayName = "ActivityIcon";
export const Activity = ActivityIcon;

/** ThermometerIcon - Ikon termometer pengukur suhu / temperatur */
export const ThermometerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </IconBase>
  )
);
ThermometerIcon.displayName = "ThermometerIcon";
export const Thermometer = ThermometerIcon;

/** EyeIcon - Ikon mata terbuka untuk melihat sandi / visibilitas */
export const EyeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  )
);
EyeIcon.displayName = "EyeIcon";
export const Eye = EyeIcon;

/** EyeOffIcon - Ikon mata tertutup/dicoret untuk menyembunyikan sandi */
export const EyeOffIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </IconBase>
  )
);
EyeOffIcon.displayName = "EyeOffIcon";
export const EyeOff = EyeOffIcon;

/** HeartIcon - Ikon hati untuk suka, favorit, atau apresiasi */
export const HeartIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </IconBase>
  )
);
HeartIcon.displayName = "HeartIcon";
export const Heart = HeartIcon;

/** BookmarkIcon - Ikon pita penanda buku untuk menyimpan konten */
export const BookmarkIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </IconBase>
  )
);
BookmarkIcon.displayName = "BookmarkIcon";
export const Bookmark = BookmarkIcon;

/** FilterIcon - Ikon corong penyaring data atau daftar */
export const FilterIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </IconBase>
  )
);
FilterIcon.displayName = "FilterIcon";
export const Filter = FilterIcon;

/** SlidersIcon - Ikon tuas pengatur tingkat lanjut / preferensi */
export const SlidersIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </IconBase>
  )
);
SlidersIcon.displayName = "SlidersIcon";
export const Sliders = SlidersIcon;

/** HelpCircleIcon - Ikon tanda tanya dalam lingkaran untuk bantuan */
export const HelpCircleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  )
);
HelpCircleIcon.displayName = "HelpCircleIcon";
export const HelpCircle = HelpCircleIcon;

/** AlertCircleIcon - Ikon tanda seru dalam lingkaran untuk peringatan sistem */
export const AlertCircleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </IconBase>
  )
);
AlertCircleIcon.displayName = "AlertCircleIcon";
export const AlertCircle = AlertCircleIcon;

/** XCircleIcon - Ikon silang dalam lingkaran untuk pembatalan atau error */
export const XCircleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </IconBase>
  )
);
XCircleIcon.displayName = "XCircleIcon";
export const XCircle = XCircleIcon;

/** CheckSquareIcon - Ikon kotak centang untuk daftar tugas atau form */
export const CheckSquareIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </IconBase>
  )
);
CheckSquareIcon.displayName = "CheckSquareIcon";
export const CheckSquare = CheckSquareIcon;

/** SquareIcon - Ikon kotak bersudut tumpul untuk checkbox belum tercentang */
export const SquareIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </IconBase>
  )
);
SquareIcon.displayName = "SquareIcon";
export const Square = SquareIcon;

/** ToggleLeftIcon - Ikon saklar beralih posisi nonaktif (off) */
export const ToggleLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
      <circle cx="8" cy="12" r="3" />
    </IconBase>
  )
);
ToggleLeftIcon.displayName = "ToggleLeftIcon";
export const ToggleLeft = ToggleLeftIcon;

/** ToggleRightIcon - Ikon saklar beralih posisi aktif (on) */
export const ToggleRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
      <circle cx="16" cy="12" r="3" />
    </IconBase>
  )
);
ToggleRightIcon.displayName = "ToggleRightIcon";
export const ToggleRight = ToggleRightIcon;

/** PrinterIcon - Ikon mesin cetak dokumen fisik */
export const PrinterIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </IconBase>
  )
);
PrinterIcon.displayName = "PrinterIcon";
export const Printer = PrinterIcon;

/** ArchiveIcon - Ikon kotak penyimpanan arsip */
export const ArchiveIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </IconBase>
  )
);
ArchiveIcon.displayName = "ArchiveIcon";
export const Archive = ArchiveIcon;

/** InboxIcon - Ikon kotak surat masuk */
export const InboxIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </IconBase>
  )
);
InboxIcon.displayName = "InboxIcon";
export const Inbox = InboxIcon;

/** PaperclipIcon - Ikon klip kertas untuk melampirkan file */
export const PaperclipIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </IconBase>
  )
);
PaperclipIcon.displayName = "PaperclipIcon";
export const Paperclip = PaperclipIcon;

/** WifiIcon - Ikon sinyal jaringan nirkabel (Wi-Fi) aktif */
export const WifiIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </IconBase>
  )
);
WifiIcon.displayName = "WifiIcon";
export const Wifi = WifiIcon;

/** WifiOffIcon - Ikon sinyal Wi-Fi terputus atau mode offline */
export const WifiOffIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </IconBase>
  )
);
WifiOffIcon.displayName = "WifiOffIcon";
export const WifiOff = WifiOffIcon;

/** BluetoothIcon - Ikon konektivitas Bluetooth */
export const BluetoothIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </IconBase>
  )
);
BluetoothIcon.displayName = "BluetoothIcon";
export const Bluetooth = BluetoothIcon;

/** CpuIcon - Ikon mikroprosesor / chip komputer */
export const CpuIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </IconBase>
  )
);
CpuIcon.displayName = "CpuIcon";
export const Cpu = CpuIcon;

/** ServerIcon - Ikon rak server backend dan basis data */
export const ServerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </IconBase>
  )
);
ServerIcon.displayName = "ServerIcon";
export const Server = ServerIcon;

/** ShuffleIcon - Ikon pemutar acak lagu atau playlist */
export const ShuffleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </IconBase>
  )
);
ShuffleIcon.displayName = "ShuffleIcon";
export const Shuffle = ShuffleIcon;

/** RepeatIcon - Ikon pengulangan lagu atau siklus */
export const RepeatIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </IconBase>
  )
);
RepeatIcon.displayName = "RepeatIcon";
export const Repeat = RepeatIcon;

/** Volume1Icon - Ikon volume suara rendah / sedang (1 gelombang) */
export const Volume1Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </IconBase>
  )
);
Volume1Icon.displayName = "Volume1Icon";
export const Volume1 = Volume1Icon;

/** TrendingUpIcon - Ikon grafik tren meningkat / kenaikan performa */
export const TrendingUpIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </IconBase>
  )
);
TrendingUpIcon.displayName = "TrendingUpIcon";
export const TrendingUp = TrendingUpIcon;

/** TrendingDownIcon - Ikon grafik tren menurun / penurunan performa */
export const TrendingDownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </IconBase>
  )
);
TrendingDownIcon.displayName = "TrendingDownIcon";
export const TrendingDown = TrendingDownIcon;

/** BarChart2Icon - Ikon diagram batang vertikal untuk statistik */
export const BarChart2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </IconBase>
  )
);
BarChart2Icon.displayName = "BarChart2Icon";
export const BarChart2 = BarChart2Icon;

/** PieChartIcon - Ikon diagram lingkaran (pie chart) untuk rasio data */
export const PieChartIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </IconBase>
  )
);
PieChartIcon.displayName = "PieChartIcon";
export const PieChart = PieChartIcon;

/** SparklesIcon - Ikon bintang kilauan / efek AI, keajaiban, atau fitur baru */
export const SparklesIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </IconBase>
  )
);
SparklesIcon.displayName = "SparklesIcon";
export const Sparkles = SparklesIcon;

