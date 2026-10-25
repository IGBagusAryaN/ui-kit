import { forwardRef } from "react";
import type { IconProps } from "./types";
import { IconBase } from "./IconBase";

/** ArrowUpIcon - Ikon panah ke atas */
export const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </IconBase>
  )
);
ArrowUpIcon.displayName = "ArrowUpIcon";
export const ArrowUp = ArrowUpIcon;

/** ArrowDownIcon - Ikon panah ke bawah */
export const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </IconBase>
  )
);
ArrowDownIcon.displayName = "ArrowDownIcon";
export const ArrowDown = ArrowDownIcon;

/** ArrowUpRightIcon - Ikon panah diagonal ke kanan atas untuk external link / navigasi */
export const ArrowUpRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </IconBase>
  )
);
ArrowUpRightIcon.displayName = "ArrowUpRightIcon";
export const ArrowUpRight = ArrowUpRightIcon;

/** ArrowDownLeftIcon - Ikon panah diagonal ke kiri bawah */
export const ArrowDownLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17 7 7 17" />
      <path d="M17 17H7V7" />
    </IconBase>
  )
);
ArrowDownLeftIcon.displayName = "ArrowDownLeftIcon";
export const ArrowDownLeft = ArrowDownLeftIcon;

/** CornerDownLeftIcon - Ikon tombol Enter / Return */
export const CornerDownLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </IconBase>
  )
);
CornerDownLeftIcon.displayName = "CornerDownLeftIcon";
export const CornerDownLeft = CornerDownLeftIcon;

/** MoreHorizontalIcon - Tiga titik horizontal untuk menu opsi */
export const MoreHorizontalIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </IconBase>
  )
);
MoreHorizontalIcon.displayName = "MoreHorizontalIcon";
export const MoreHorizontal = MoreHorizontalIcon;

/** MoreVerticalIcon - Tiga titik vertikal untuk menu dropdown */
export const MoreVerticalIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </IconBase>
  )
);
MoreVerticalIcon.displayName = "MoreVerticalIcon";
export const MoreVertical = MoreVerticalIcon;

/** ChevronsLeftIcon - Ikon panah ganda ke kiri (fast rewind / first page) */
export const ChevronsLeftIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </IconBase>
  )
);
ChevronsLeftIcon.displayName = "ChevronsLeftIcon";
export const ChevronsLeft = ChevronsLeftIcon;

/** ChevronsRightIcon - Ikon panah ganda ke kanan (fast forward / last page) */
export const ChevronsRightIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </IconBase>
  )
);
ChevronsRightIcon.displayName = "ChevronsRightIcon";
export const ChevronsRight = ChevronsRightIcon;

/** ChevronsUpIcon - Ikon panah ganda ke atas */
export const ChevronsUpIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m17 11-5-5-5 5" />
      <path d="m17 18-5-5-5 5" />
    </IconBase>
  )
);
ChevronsUpIcon.displayName = "ChevronsUpIcon";
export const ChevronsUp = ChevronsUpIcon;

/** ChevronsDownIcon - Ikon panah ganda ke bawah */
export const ChevronsDownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m7 6 5 5 5-5" />
      <path d="m7 13 5 5 5-5" />
    </IconBase>
  )
);
ChevronsDownIcon.displayName = "ChevronsDownIcon";
export const ChevronsDown = ChevronsDownIcon;

/** RotateCcwIcon - Ikon putar balik / undo / histori */
export const RotateCcwIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </IconBase>
  )
);
RotateCcwIcon.displayName = "RotateCcwIcon";
export const RotateCcw = RotateCcwIcon;

/** MoveIcon - Ikon 4 arah panah untuk drag and drop */
export const MoveIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="5 9 2 12 5 15" />
      <polyline points="9 5 12 2 15 5" />
      <polyline points="15 19 12 22 9 19" />
      <polyline points="19 9 22 12 19 15" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </IconBase>
  )
);
MoveIcon.displayName = "MoveIcon";
export const Move = MoveIcon;

/** CheckCheckIcon - Ikon centang ganda / read receipt */
export const CheckCheckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-7.5 7.5L13 16" />
    </IconBase>
  )
);
CheckCheckIcon.displayName = "CheckCheckIcon";
export const CheckCheck = CheckCheckIcon;

/** GitBranchIcon - Ikon cabang git (version control branch) */
export const GitBranchIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </IconBase>
  )
);
GitBranchIcon.displayName = "GitBranchIcon";
export const GitBranch = GitBranchIcon;

/** GitCommitIcon - Ikon commit snapshot git */
export const GitCommitIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="3" />
      <line x1="3" x2="9" y1="12" y2="12" />
      <line x1="15" x2="21" y1="12" y2="12" />
    </IconBase>
  )
);
GitCommitIcon.displayName = "GitCommitIcon";
export const GitCommit = GitCommitIcon;

/** GitMergeIcon - Ikon penggabungan cabang git (git merge) */
export const GitMergeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </IconBase>
  )
);
GitMergeIcon.displayName = "GitMergeIcon";
export const GitMerge = GitMergeIcon;

/** GitPullRequestIcon - Ikon PR / kontribusi kolaborasi kode */
export const GitPullRequestIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" x2="6" y1="9" y2="21" />
    </IconBase>
  )
);
GitPullRequestIcon.displayName = "GitPullRequestIcon";
export const GitPullRequest = GitPullRequestIcon;

/** BugIcon - Ikon serangga / debug issue tracker */
export const BugIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="8" height="14" x="8" y="6" rx="4" />
      <path d="m19 7-3 2" />
      <path d="m5 7 3 2" />
      <path d="m19 19-3-2" />
      <path d="m5 19 3-2" />
      <path d="M20 13h-4" />
      <path d="M4 13h4" />
      <path d="m10 4 1 2" />
      <path d="m14 4-1 2" />
    </IconBase>
  )
);
BugIcon.displayName = "BugIcon";
export const Bug = BugIcon;

/** TerminalSquareIcon - Ikon console terminal kotak */
export const TerminalSquareIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m7 11 2-2-2-2" />
      <path d="M11 13h4" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </IconBase>
  )
);
TerminalSquareIcon.displayName = "TerminalSquareIcon";
export const TerminalSquare = TerminalSquareIcon;

/** FlameIcon - Ikon api / trending / streak */
export const FlameIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </IconBase>
  )
);
FlameIcon.displayName = "FlameIcon";
export const Flame = FlameIcon;

/** LightbulbIcon - Ikon bohlam lampu / ide / tips inovasi */
export const LightbulbIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </IconBase>
  )
);
LightbulbIcon.displayName = "LightbulbIcon";
export const Lightbulb = LightbulbIcon;

/** CrownIcon - Ikon mahkota / status VIP / administrator / premium */
export const CrownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </IconBase>
  )
);
CrownIcon.displayName = "CrownIcon";
export const Crown = CrownIcon;

/** DollarSignIcon - Ikon simbol mata uang Dollar / tarif */
export const DollarSignIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </IconBase>
  )
);
DollarSignIcon.displayName = "DollarSignIcon";
export const DollarSign = DollarSignIcon;

/** CoinsIcon - Ikon koin tumpuk / saldo e-wallet */
export const CoinsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </IconBase>
  )
);
CoinsIcon.displayName = "CoinsIcon";
export const Coins = CoinsIcon;

/** BriefcaseIcon - Ikon koper kerja / portofolio bisnis */
export const BriefcaseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </IconBase>
  )
);
BriefcaseIcon.displayName = "BriefcaseIcon";
export const Briefcase = BriefcaseIcon;

/** BuildingIcon - Ikon gedung perkantoran / enterprise */
export const BuildingIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </IconBase>
  )
);
BuildingIcon.displayName = "BuildingIcon";
export const Building = BuildingIcon;

/** StoreIcon - Ikon toko ritel / merchant */
export const StoreIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0" />
    </IconBase>
  )
);
StoreIcon.displayName = "StoreIcon";
export const Store = StoreIcon;

/** TruckIcon - Ikon truk ekspedisi / pengiriman pesanan */
export const TruckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </IconBase>
  )
);
TruckIcon.displayName = "TruckIcon";
export const Truck = TruckIcon;

/** QrCodeIcon - Ikon barcode 2D QR Code untuk scan cepat */
export const QrCodeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </IconBase>
  )
);
QrCodeIcon.displayName = "QrCodeIcon";
export const QrCode = QrCodeIcon;

/** BarcodeIcon - Ikon kode batang produk */
export const BarcodeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 5v14" />
      <path d="M8 5v14" />
      <path d="M12 5v14" />
      <path d="M17 5v14" />
      <path d="M21 5v14" />
    </IconBase>
  )
);
BarcodeIcon.displayName = "BarcodeIcon";
export const Barcode = BarcodeIcon;

/** PaletteIcon - Ikon palet warna tema / desain visual */
export const PaletteIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.562C22 6.5 17.5 2 12 2z" />
    </IconBase>
  )
);
PaletteIcon.displayName = "PaletteIcon";
export const Palette = PaletteIcon;

/** FilmIcon - Ikon pita film bioskop / video */
export const FilmIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="2" x2="7" y1="7" y2="7" />
      <line x1="2" x2="7" y1="17" y2="17" />
      <line x1="17" x2="22" y1="17" y2="17" />
      <line x1="17" x2="22" y1="7" y2="7" />
    </IconBase>
  )
);
FilmIcon.displayName = "FilmIcon";
export const Film = FilmIcon;

/** ApertureIcon - Ikon diafragma kamera fotografi */
export const ApertureIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="14.31" x2="20.05" y1="8" y2="17.94" />
      <line x1="9.69" x2="21.17" y1="8" y2="8" />
      <line x1="7.38" x2="13.12" y1="12" y2="2.06" />
      <line x1="9.69" x2="3.95" y1="16" y2="6.06" />
      <line x1="14.31" x2="2.83" y1="16" y2="16" />
      <line x1="16.62" x2="10.88" y1="12" y2="21.94" />
    </IconBase>
  )
);
ApertureIcon.displayName = "ApertureIcon";
export const Aperture = ApertureIcon;

/** EraserIcon - Ikon penghapus / reset canvas */
export const EraserIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 9 9" />
    </IconBase>
  )
);
EraserIcon.displayName = "EraserIcon";
export const Eraser = EraserIcon;

/** TypeIcon - Ikon typography / pengaturan font teks */
export const TypeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </IconBase>
  )
);
TypeIcon.displayName = "TypeIcon";
export const Type = TypeIcon;

/** AtSignIcon - Ikon simbol @ untuk sebutan username / surel */
export const AtSignIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </IconBase>
  )
);
AtSignIcon.displayName = "AtSignIcon";
export const AtSign = AtSignIcon;

/** HashIcon - Ikon tagar / channel / ID */
export const HashIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </IconBase>
  )
);
HashIcon.displayName = "HashIcon";
export const Hash = HashIcon;

/** RssIcon - Ikon sindikasi berita / RSS feed */
export const RssIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </IconBase>
  )
);
RssIcon.displayName = "RssIcon";
export const Rss = RssIcon;

/** SmileIcon - Ikon wajah senyum / emoji positif */
export const SmileIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </IconBase>
  )
);
SmileIcon.displayName = "SmileIcon";
export const Smile = SmileIcon;

/** FrownIcon - Ikon wajah cemberut / feedback negatif */
export const FrownIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </IconBase>
  )
);
FrownIcon.displayName = "FrownIcon";
export const Frown = FrownIcon;

/** PlugIcon - Ikon steker kabel / integrasi add-on */
export const PlugIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </IconBase>
  )
);
PlugIcon.displayName = "PlugIcon";
export const Plug = PlugIcon;

/** FingerprintIcon - Ikon sidik jari / otentikasi biometrik */
export const FingerprintIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 3" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </IconBase>
  )
);
FingerprintIcon.displayName = "FingerprintIcon";
export const Fingerprint = FingerprintIcon;

/** UserPlusIcon - Ikon tambah pengguna / add friend */
export const UserPlusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </IconBase>
  )
);
UserPlusIcon.displayName = "UserPlusIcon";
export const UserPlus = UserPlusIcon;

/** UserMinusIcon - Ikon kurangi / hapus pengguna */
export const UserMinusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </IconBase>
  )
);
UserMinusIcon.displayName = "UserMinusIcon";
export const UserMinus = UserMinusIcon;

/** UserCheckIcon - Ikon pengguna terverifikasi */
export const UserCheckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </IconBase>
  )
);
UserCheckIcon.displayName = "UserCheckIcon";
export const UserCheck = UserCheckIcon;

/** UserXIcon - Ikon blokir pengguna */
export const UserXIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" x2="22" y1="8" y2="13" />
      <line x1="22" x2="17" y1="8" y2="13" />
    </IconBase>
  )
);
UserXIcon.displayName = "UserXIcon";
export const UserX = UserXIcon;

/** FolderPlusIcon - Ikon buat folder baru */
export const FolderPlusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 10v6" />
      <path d="M9 13h6" />
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </IconBase>
  )
);
FolderPlusIcon.displayName = "FolderPlusIcon";
export const FolderPlus = FolderPlusIcon;

/** FolderMinusIcon - Ikon kurangi folder */
export const FolderMinusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M9 13h6" />
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </IconBase>
  )
);
FolderMinusIcon.displayName = "FolderMinusIcon";
export const FolderMinus = FolderMinusIcon;

/** FileCodeIcon - Ikon file kode sumber */
export const FileCodeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M10 12.5 8 15l2 2.5" />
      <path d="m14 12.5 2 2.5-2 2.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4 22h16a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
      <path d="M4 14v8" />
    </IconBase>
  )
);
FileCodeIcon.displayName = "FileCodeIcon";
export const FileCode = FileCodeIcon;

/** FileCheckIcon - Ikon file dokumen selesai/valid */
export const FileCheckIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4 22h16a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
      <path d="m9 15 2 2 4-4" />
    </IconBase>
  )
);
FileCheckIcon.displayName = "FileCheckIcon";
export const FileCheck = FileCheckIcon;

/** Globe2Icon - Ikon bola dunia dengan meridian */
export const Globe2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </IconBase>
  )
);
Globe2Icon.displayName = "Globe2Icon";
export const Globe2 = Globe2Icon;

/** ShieldAlertIcon - Ikon perisai peringatan keamanan */
export const ShieldAlertIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </IconBase>
  )
);
ShieldAlertIcon.displayName = "ShieldAlertIcon";
export const ShieldAlert = ShieldAlertIcon;

/** ShieldXIcon - Ikon perisai blokir / akses ditolak */
export const ShieldXIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <line x1="9" x2="15" y1="9" y2="15" />
      <line x1="15" x2="9" y1="9" y2="15" />
    </IconBase>
  )
);
ShieldXIcon.displayName = "ShieldXIcon";
export const ShieldX = ShieldXIcon;

/** VerifiedIcon - Ikon lencana resmi terverifikasi (official badge) */
export const VerifiedIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2l2.4 2.4 3.4-.4 1.4 3.1 3.1 1.4-.4 3.4 2.4 2.4-2.4 2.4.4 3.4-3.1 1.4-1.4 3.1-3.4-.4L12 22l-2.4-2.4-3.4.4-1.4-3.1-3.1-1.4.4-3.4L-.3 9.7l2.4-2.4-.4-3.4 3.1-1.4 1.4-3.1 3.4.4L12 2z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  )
);
VerifiedIcon.displayName = "VerifiedIcon";
export const Verified = VerifiedIcon;

/** SlidersHorizontalIcon - Ikon filter pengaturan slider horizontal */
export const SlidersHorizontalIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </IconBase>
  )
);
SlidersHorizontalIcon.displayName = "SlidersHorizontalIcon";
export const SlidersHorizontal = SlidersHorizontalIcon;

/** ScaleIcon - Ikon timbangan keadilan / perbandingan spesifikasi */
export const ScaleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </IconBase>
  )
);
ScaleIcon.displayName = "ScaleIcon";
export const Scale = ScaleIcon;

/** ShapesIcon - Ikon bentuk-bentuk geometris abstrak */
export const ShapesIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8.3 10a.7.7 0 0 1-.626-.379L5.055 4.415A.7.7 0 0 1 5.68 3.447h5.24a.7.7 0 0 1 .626.968l-2.618 5.206A.7.7 0 0 1 8.3 10Z" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </IconBase>
  )
);
ShapesIcon.displayName = "ShapesIcon";
export const Shapes = ShapesIcon;

/** SignalIcon - Ikon indikator sinyal jaringan */
export const SignalIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </IconBase>
  )
);
SignalIcon.displayName = "SignalIcon";
export const Signal = SignalIcon;

/** Wand2Icon - Ikon tongkat sihir AI generator / efek spesial */
export const Wand2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </IconBase>
  )
);
Wand2Icon.displayName = "Wand2Icon";
export const Wand2 = Wand2Icon;
