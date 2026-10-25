import { forwardRef } from "react";
import type { IconProps } from "./types";
import { IconBase } from "./IconBase";

/** CloudRainIcon - Ikon awan hujan */
export const CloudRainIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </IconBase>
  )
);
CloudRainIcon.displayName = "CloudRainIcon";
export const CloudRain = CloudRainIcon;

/** CloudSnowIcon - Ikon awan bersalju */
export const CloudSnowIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M8 15h.01" />
      <path d="M8 19h.01" />
      <path d="M12 17h.01" />
      <path d="M12 21h.01" />
      <path d="M16 15h.01" />
      <path d="M16 19h.01" />
    </IconBase>
  )
);
CloudSnowIcon.displayName = "CloudSnowIcon";
export const CloudSnow = CloudSnowIcon;

/** CloudLightningIcon - Ikon awan petir / badai */
export const CloudLightningIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </IconBase>
  )
);
CloudLightningIcon.displayName = "CloudLightningIcon";
export const CloudLightning = CloudLightningIcon;

/** WindIcon - Ikon hembusan angin */
export const WindIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </IconBase>
  )
);
WindIcon.displayName = "WindIcon";
export const Wind = WindIcon;

/** UmbrellaIcon - Ikon payung perlindungan */
export const UmbrellaIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M22 12a10.06 10.06 0 0 0-20 0Z" />
      <path d="M12 12v8a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </IconBase>
  )
);
UmbrellaIcon.displayName = "UmbrellaIcon";
export const Umbrella = UmbrellaIcon;

/** DropletIcon - Ikon tetesan air / cairan */
export const DropletIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </IconBase>
  )
);
DropletIcon.displayName = "DropletIcon";
export const Droplet = DropletIcon;

/** SunsetIcon - Ikon matahari terbenam */
export const SunsetIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 10V2" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m16 6-4 4-4-4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </IconBase>
  )
);
SunsetIcon.displayName = "SunsetIcon";
export const Sunset = SunsetIcon;

/** SunriseIcon - Ikon matahari terbit */
export const SunriseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 2v8" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m8 6 4-4 4 4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </IconBase>
  )
);
SunriseIcon.displayName = "SunriseIcon";
export const Sunrise = SunriseIcon;

/** LeafIcon - Ikon daun / ramah lingkungan */
export const LeafIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </IconBase>
  )
);
LeafIcon.displayName = "LeafIcon";
export const Leaf = LeafIcon;

/** MouseIcon - Ikon tetikus komputer */
export const MouseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </IconBase>
  )
);
MouseIcon.displayName = "MouseIcon";
export const Mouse = MouseIcon;

/** KeyboardIcon - Ikon papan tombol ketik */
export const KeyboardIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
      <path d="M6 8h.001" />
      <path d="M10 8h.001" />
      <path d="M14 8h.001" />
      <path d="M18 8h.001" />
      <path d="M8 12h.001" />
      <path d="M12 12h.001" />
      <path d="M16 12h.001" />
      <path d="M7 16h10" />
    </IconBase>
  )
);
KeyboardIcon.displayName = "KeyboardIcon";
export const Keyboard = KeyboardIcon;

/** SpeakerIcon - Ikon pengeras suara / speaker box */
export const SpeakerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <circle cx="12" cy="14" r="4" />
      <line x1="12" x2="12.01" y1="6" y2="6" />
    </IconBase>
  )
);
SpeakerIcon.displayName = "SpeakerIcon";
export const Speaker = SpeakerIcon;

/** HeadsetIcon - Ikon headset customer support / gaming */
export const HeadsetIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </IconBase>
  )
);
HeadsetIcon.displayName = "HeadsetIcon";
export const Headset = HeadsetIcon;

/** Gamepad2Icon - Ikon gamepad controller game */
export const Gamepad2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="6" />
    </IconBase>
  )
);
Gamepad2Icon.displayName = "Gamepad2Icon";
export const Gamepad2 = Gamepad2Icon;

/** UsbIcon - Ikon konektor flashdisk USB */
export const UsbIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="10" cy="14" r="1" />
      <circle cx="14" cy="6" r="1" />
      <path d="m4.7 19.3 1.4-1.4" />
      <path d="m14.7 9.3 1.4-1.4" />
      <path d="m9.3 14.7 1.4-1.4" />
      <path d="m9.3 4.7 1.4 1.4" />
      <path d="M9.3 14.7 2.3 21.7" />
      <path d="m10.7 3.3 2.8 2.8" />
      <path d="M14 6V2h4v4h-4" />
      <path d="m14 10 3-3" />
      <path d="M9 15h6" />
    </IconBase>
  )
);
UsbIcon.displayName = "UsbIcon";
export const Usb = UsbIcon;

/** WrenchIcon - Ikon kunci pas perkakas */
export const WrenchIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </IconBase>
  )
);
WrenchIcon.displayName = "WrenchIcon";
export const Wrench = WrenchIcon;

/** HammerIcon - Ikon palu konstruksi */
export const HammerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 3.26-1.55 1.55a1.5 1.5 0 0 0 0 2.12l1.55 1.55a1.5 1.5 0 0 0 2.12 0l1.55-1.55a1.5 1.5 0 0 0 0-2.12l-1.55-1.55a1.5 1.5 0 0 0-2.12 0Z" />
      <path d="m14 8 3 3" />
    </IconBase>
  )
);
HammerIcon.displayName = "HammerIcon";
export const Hammer = HammerIcon;

/** RulerIcon - Ikon penggaris dimensi */
export const RulerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </IconBase>
  )
);
RulerIcon.displayName = "RulerIcon";
export const Ruler = RulerIcon;

/** GaugeIcon - Ikon speedometer indikator performa */
export const GaugeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </IconBase>
  )
);
GaugeIcon.displayName = "GaugeIcon";
export const Gauge = GaugeIcon;

/** HourglassIcon - Ikon jam pasir */
export const HourglassIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </IconBase>
  )
);
HourglassIcon.displayName = "HourglassIcon";
export const Hourglass = HourglassIcon;

/** TimerIcon - Ikon stopwatch penghitung waktu */
export const TimerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </IconBase>
  )
);
TimerIcon.displayName = "TimerIcon";
export const Timer = TimerIcon;

/** PinIcon - Ikon sematkan / pin item */
export const PinIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </IconBase>
  )
);
PinIcon.displayName = "PinIcon";
export const Pin = PinIcon;

/** PinOffIcon - Ikon lepas sematan / unpin */
export const PinOffIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M12 17v5" />
      <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12" />
      <path d="M15 9.34V6h1a1 1 0 0 0 0-2H7.89" />
    </IconBase>
  )
);
PinOffIcon.displayName = "PinOffIcon";
export const PinOff = PinOffIcon;

/** TableIcon - Ikon tabel data */
export const TableIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
    </IconBase>
  )
);
TableIcon.displayName = "TableIcon";
export const Table = TableIcon;

/** KanbanIcon - Ikon papan kanban kolom tugas */
export const KanbanIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 5v11" />
      <path d="M12 5v6" />
      <path d="M18 5v14" />
    </IconBase>
  )
);
KanbanIcon.displayName = "KanbanIcon";
export const Kanban = KanbanIcon;

/** LineChartIcon - Ikon grafik garis analitik */
export const LineChartIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </IconBase>
  )
);
LineChartIcon.displayName = "LineChartIcon";
export const LineChart = LineChartIcon;

/** FileSpreadsheetIcon - Ikon dokumen spreadsheet / excel */
export const FileSpreadsheetIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </IconBase>
  )
);
FileSpreadsheetIcon.displayName = "FileSpreadsheetIcon";
export const FileSpreadsheet = FileSpreadsheetIcon;

/** GitForkIcon - Ikon percabangan repositori / fork */
export const GitForkIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
      <path d="M12 12v3" />
    </IconBase>
  )
);
GitForkIcon.displayName = "GitForkIcon";
export const GitFork = GitForkIcon;

/** HeartHandshakeIcon - Ikon jabat tangan kemitraan */
export const HeartHandshakeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </IconBase>
  )
);
HeartHandshakeIcon.displayName = "HeartHandshakeIcon";
export const HeartHandshake = HeartHandshakeIcon;

/** PartyPopperIcon - Ikon perayaan konfeti */
export const PartyPopperIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.91 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </IconBase>
  )
);
PartyPopperIcon.displayName = "PartyPopperIcon";
export const PartyPopper = PartyPopperIcon;

/** HeartPulseIcon - Ikon detak jantung / kesehatan */
export const HeartPulseIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </IconBase>
  )
);
HeartPulseIcon.displayName = "HeartPulseIcon";
export const HeartPulse = HeartPulseIcon;

/** CoffeeIcon - Ikon secangkir kopi */
export const CoffeeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </IconBase>
  )
);
CoffeeIcon.displayName = "CoffeeIcon";
export const Coffee = CoffeeIcon;

/** UtensilsIcon - Ikon sendok dan garpu restoran */
export const UtensilsIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M15 2v18" />
      <path d="M6 2v7a4 4 0 0 0 4 4 4 4 0 0 0 4-4V2" />
      <path d="M10 2v18" />
    </IconBase>
  )
);
UtensilsIcon.displayName = "UtensilsIcon";
export const Utensils = UtensilsIcon;

/** PlaneIcon - Ikon pesawat terbang */
export const PlaneIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </IconBase>
  )
);
PlaneIcon.displayName = "PlaneIcon";
export const Plane = PlaneIcon;

/** CarIcon - Ikon mobil penumpang */
export const CarIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </IconBase>
  )
);
CarIcon.displayName = "CarIcon";
export const Car = CarIcon;

/** BusIcon - Ikon bus transportasi umum */
export const BusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8 6v6" />
      <path d="M16 6v6" />
      <path d="M2 12h20" />
      <path d="M18 18h2a2 2 0 0 0 2-2V8a5 5 0 0 0-5-5H7A5 5 0 0 0 2 8v8a2 2 0 0 0 2 2h2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h6" />
      <circle cx="17" cy="18" r="2" />
    </IconBase>
  )
);
BusIcon.displayName = "BusIcon";
export const Bus = BusIcon;

/** TrainIcon - Ikon kereta api */
export const TrainIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v8" />
      <path d="m8 19-2 3" />
      <path d="m18 22-2-3" />
      <circle cx="8" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
    </IconBase>
  )
);
TrainIcon.displayName = "TrainIcon";
export const Train = TrainIcon;

/** FuelIcon - Ikon stasiun pengisian bahan bakar */
export const FuelIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <line x1="3" x2="15" y1="22" y2="22" />
      <line x1="4" x2="14" y1="9" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </IconBase>
  )
);
FuelIcon.displayName = "FuelIcon";
export const Fuel = FuelIcon;

/** Navigation2Icon - Ikon panah penunjuk navigasi */
export const Navigation2Icon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </IconBase>
  )
);
Navigation2Icon.displayName = "Navigation2Icon";
export const Navigation2 = Navigation2Icon;

/** SparkleIcon - Ikon bintang tunggal berkilau */
export const SparkleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </IconBase>
  )
);
SparkleIcon.displayName = "SparkleIcon";
export const Sparkle = SparkleIcon;

/** MessageSquarePlusIcon - Ikon buat pesan / komentar baru */
export const MessageSquarePlusIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="12" x2="12" y1="7" y2="13" />
      <line x1="9" x2="15" y1="10" y2="10" />
    </IconBase>
  )
);
MessageSquarePlusIcon.displayName = "MessageSquarePlusIcon";
export const MessageSquarePlus = MessageSquarePlusIcon;

/** RadioTowerIcon - Ikon menara pemancar sinyal siaran */
export const RadioTowerIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
      <path d="M7.8 13.2a6 6 0 0 1 0-8.5" />
      <circle cx="12" cy="9" r="2" />
      <path d="M16.2 4.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 1.9a10 10 0 0 1 0 14.2" />
      <path d="M9.5 18h5" />
      <path d="m8 22 4-11 4 11" />
    </IconBase>
  )
);
RadioTowerIcon.displayName = "RadioTowerIcon";
export const RadioTower = RadioTowerIcon;

/** PodcastIcon - Ikon siaran podcast audio */
export const PodcastIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
      <path d="M8 19a5 5 0 0 0 8 0" />
      <circle cx="12" cy="11" r="1" />
      <path d="M13 17a1 1 0 1 0-2 0l-.5 4.5a.5.5 0 0 0 1 .5h1a.5.5 0 0 0 1-.5Z" />
    </IconBase>
  )
);
PodcastIcon.displayName = "PodcastIcon";
export const Podcast = PodcastIcon;

/** VoicemailIcon - Ikon pesan suara voicemail */
export const VoicemailIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <line x1="6" x2="18" y1="16" y2="16" />
    </IconBase>
  )
);
VoicemailIcon.displayName = "VoicemailIcon";
export const Voicemail = VoicemailIcon;

/** StethoscopeIcon - Ikon stetoskop medis */
export const StethoscopeIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </IconBase>
  )
);
StethoscopeIcon.displayName = "StethoscopeIcon";
export const Stethoscope = StethoscopeIcon;

/** CupSodaIcon - Ikon gelas minuman bersoda */
export const CupSodaIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m6 8 1.75 12.28A2 2 0 0 0 9.74 22h4.52a2 2 0 0 0 1.99-1.72L18 8" />
      <path d="M5 8h14" />
      <path d="m7 15 10-4" />
      <path d="m11 2 1 6" />
    </IconBase>
  )
);
CupSodaIcon.displayName = "CupSodaIcon";
export const CupSoda = CupSodaIcon;

/** FolderLockIcon - Ikon folder terenkripsi aman */
export const FolderLockIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2.5" />
      <rect width="8" height="5" x="14" y="17" rx="1" />
      <path d="M16 17v-1.5a2 2 0 1 1 4 0V17" />
    </IconBase>
  )
);
FolderLockIcon.displayName = "FolderLockIcon";
export const FolderLock = FolderLockIcon;

/** FileLockIcon - Ikon dokumen terenkripsi */
export const FileLockIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="5" x="14" y="17" rx="1" />
      <path d="M16 17v-1.5a2 2 0 1 1 4 0V17" />
    </IconBase>
  )
);
FileLockIcon.displayName = "FileLockIcon";
export const FileLock = FileLockIcon;

/** MagnetIcon - Ikon magnet snap to grid */
export const MagnetIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m6 15-4-4 6.75-6.77a7.78 7.78 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15" />
      <path d="m5 8 4 4" />
      <path d="m12 15 4 4" />
    </IconBase>
  )
);
MagnetIcon.displayName = "MagnetIcon";
export const Magnet = MagnetIcon;

/** GlassesIcon - Ikon kacamata mode penyamaran / incognito */
export const GlassesIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="6" cy="15" r="4" />
      <circle cx="18" cy="15" r="4" />
      <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
      <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
      <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
    </IconBase>
  )
);
GlassesIcon.displayName = "GlassesIcon";
export const Glasses = GlassesIcon;

/** KeyRoundIcon - Ikon kunci bulat otentikasi */
export const KeyRoundIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </IconBase>
  )
);
KeyRoundIcon.displayName = "KeyRoundIcon";
export const KeyRound = KeyRoundIcon;

/** AppleIcon - Ikon apel gizi dan nutrisi */
export const AppleIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </IconBase>
  )
);
AppleIcon.displayName = "AppleIcon";
export const Apple = AppleIcon;

/** UnplugIcon - Ikon kabel tercabut / terputus */
export const UnplugIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="m19 5 3-3" />
      <path d="m2 22 3-3" />
      <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
      <path d="M7.5 13.5 10 11" />
      <path d="M10.5 16.5 13 14" />
      <path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
    </IconBase>
  )
);
UnplugIcon.displayName = "UnplugIcon";
export const Unplug = UnplugIcon;

/** NetworkIcon - Ikon topologi jaringan komputer / subnet */
export const NetworkIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </IconBase>
  )
);
NetworkIcon.displayName = "NetworkIcon";
export const Network = NetworkIcon;
