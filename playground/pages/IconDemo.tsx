import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconCard } from "../../src/components/IconCard";
import {

  SearchIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  NavigationIcon,
  FlagIcon,

  UserIcon,
  UsersIcon,
  LoginIcon,
  LogoutIcon,
  ShieldIcon,
  ShieldCheckIcon,
  LockIcon,
  UnlockIcon,
  KeyIcon,

  PlusIcon,
  MinusIcon,
  EditIcon,
  TrashIcon,
  Trash2Icon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  PowerIcon,
  ZapIcon,
  AwardIcon,
  StarIcon,

  SettingsIcon,
  BellIcon,
  BellRingIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CrosshairIcon,
  TargetIcon,
  ActivityIcon,

  ImageIcon,
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
  FilePlusIcon,
  FileMinusIcon,
  FileTextIcon,
  DownloadIcon,
  UploadIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  SkipForwardIcon,
  SkipBackIcon,
  VolumeXIcon,
  Volume2Icon,
  VideoIcon,
  MicIcon,
  MicOffIcon,
  HeadphonesIcon,
  MusicIcon,
  CastIcon,
  RadioIcon,

  ShoppingCartIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  WalletIcon,
  TagIcon,
  ReceiptIcon,
  BanknoteIcon,
  GiftIcon,
  BoxIcon,
  PackageIcon,

  MailIcon,
  PhoneIcon,
  PhoneCallIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  SendIcon,
  ShareIcon,
  Share2Icon,

  MonitorIcon,
  SmartphoneIcon,
  LaptopIcon,
  TabletIcon,
  HardDriveIcon,
  CameraIcon,
  DatabaseIcon,
  CloudIcon,
  TerminalIcon,
  CodeIcon,
  GridIcon,
  LayoutIcon,
  LayersIcon,
  MaximizeIcon,
  MinimizeIcon,
  BatteryIcon,
  BatteryChargingIcon,

  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  ScissorsIcon,
  ClipboardIcon,
  Edit2Icon,
  Edit3Icon,
  PenToolIcon,
  CropIcon,

  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  MapIcon,
  CompassIcon,
  SunIcon,
  MoonIcon,
  GlobeIcon,
  ThermometerIcon,

  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  BookmarkIcon,
  FilterIcon,
  SlidersIcon,
  HelpCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  CheckSquareIcon,
  SquareIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  PrinterIcon,
  ArchiveIcon,
  InboxIcon,
  PaperclipIcon,
  WifiIcon,
  WifiOffIcon,
  BluetoothIcon,
  CpuIcon,
  ServerIcon,
  ShuffleIcon,
  RepeatIcon,
  Volume1Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart2Icon,
  PieChartIcon,
  SparklesIcon,

  // Batch 3 Icons
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  CornerDownLeftIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  ChevronsDownIcon,
  RotateCcwIcon,
  MoveIcon,
  CheckCheckIcon,
  GitBranchIcon,
  GitCommitIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  BugIcon,
  TerminalSquareIcon,
  FlameIcon,
  LightbulbIcon,
  CrownIcon,
  DollarSignIcon,
  CoinsIcon,
  BriefcaseIcon,
  BuildingIcon,
  StoreIcon,
  TruckIcon,
  QrCodeIcon,
  BarcodeIcon,
  PaletteIcon,
  FilmIcon,
  ApertureIcon,
  EraserIcon,
  TypeIcon,
  AtSignIcon,
  HashIcon,
  RssIcon,
  SmileIcon,
  FrownIcon,
  PlugIcon,
  FingerprintIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  FolderPlusIcon,
  FolderMinusIcon,
  FileCodeIcon,
  FileCheckIcon,
  Globe2Icon,
  ShieldAlertIcon,
  ShieldXIcon,
  VerifiedIcon,
  SlidersHorizontalIcon,
  ScaleIcon,
  ShapesIcon,
  SignalIcon,
  Wand2Icon,

  // Batch 4 Icons
  CloudRainIcon,
  CloudSnowIcon,
  CloudLightningIcon,
  WindIcon,
  UmbrellaIcon,
  DropletIcon,
  SunsetIcon,
  SunriseIcon,
  LeafIcon,
  MouseIcon,
  KeyboardIcon,
  SpeakerIcon,
  HeadsetIcon,
  Gamepad2Icon,
  UsbIcon,
  WrenchIcon,
  HammerIcon,
  RulerIcon,
  GaugeIcon,
  HourglassIcon,
  TimerIcon,
  PinIcon,
  PinOffIcon,
  TableIcon,
  KanbanIcon,
  LineChartIcon,
  FileSpreadsheetIcon,
  GitForkIcon,
  HeartHandshakeIcon,
  PartyPopperIcon,
  HeartPulseIcon,
  CoffeeIcon,
  UtensilsIcon,
  PlaneIcon,
  CarIcon,
  BusIcon,
  TrainIcon,
  FuelIcon,
  Navigation2Icon,
  SparkleIcon,
  MessageSquarePlusIcon,
  RadioTowerIcon,
  PodcastIcon,
  VoicemailIcon,
  StethoscopeIcon,
  CupSodaIcon,
  FolderLockIcon,
  FileLockIcon,
  MagnetIcon,
  GlassesIcon,
  KeyRoundIcon,
  AppleIcon,
  UnplugIcon,
  NetworkIcon,

  IconProps,
} from "../../src/icons";

export type IconCategoryKey =
  | "all"
  | "navigation"
  | "userAccount"
  | "actionInteraction"
  | "systemFeedback"
  | "mediaDocument"
  | "ecommerceFinance"
  | "communication"
  | "deviceHardware"
  | "textEditor"
  | "timeLocation";

interface IconItem {
  name: string;
  categoryKey: Exclude<IconCategoryKey, "all">;
  Component: React.ComponentType<IconProps>;
  tags: string[];
}

export const ALL_ICONS: IconItem[] = [

  { name: "SearchIcon", categoryKey: "navigation", Component: SearchIcon, tags: ["cari", "search", "kaca pembesar", "find"] },
  { name: "MenuIcon", categoryKey: "navigation", Component: MenuIcon, tags: ["menu", "hamburger", "bars", "nav"] },
  { name: "CloseIcon", categoryKey: "navigation", Component: CloseIcon, tags: ["tutup", "close", "silang", "x", "cancel"] },
  { name: "ChevronDownIcon", categoryKey: "navigation", Component: ChevronDownIcon, tags: ["chevron", "down", "bawah", "dropdown"] },
  { name: "ChevronUpIcon", categoryKey: "navigation", Component: ChevronUpIcon, tags: ["chevron", "up", "atas", "collapse"] },
  { name: "ChevronLeftIcon", categoryKey: "navigation", Component: ChevronLeftIcon, tags: ["chevron", "left", "kiri", "back"] },
  { name: "ChevronRightIcon", categoryKey: "navigation", Component: ChevronRightIcon, tags: ["chevron", "right", "kanan", "next"] },
  { name: "ArrowRightIcon", categoryKey: "navigation", Component: ArrowRightIcon, tags: ["arrow", "right", "kanan", "forward"] },
  { name: "ArrowLeftIcon", categoryKey: "navigation", Component: ArrowLeftIcon, tags: ["arrow", "left", "kiri", "back"] },
  { name: "NavigationIcon", categoryKey: "navigation", Component: NavigationIcon, tags: ["navigation", "arah", "kompas", "peta", "navigasi", "gps"] },
  { name: "FlagIcon", categoryKey: "navigation", Component: FlagIcon, tags: ["flag", "bendera", "patok", "tanda", "marker", "finish"] },

  { name: "UserIcon", categoryKey: "userAccount", Component: UserIcon, tags: ["user", "pengguna", "profile", "account"] },
  { name: "UsersIcon", categoryKey: "userAccount", Component: UsersIcon, tags: ["users", "tim", "group", "people", "members"] },
  { name: "LoginIcon", categoryKey: "userAccount", Component: LoginIcon, tags: ["login", "masuk", "signin", "enter"] },
  { name: "LogoutIcon", categoryKey: "userAccount", Component: LogoutIcon, tags: ["logout", "keluar", "signout", "exit"] },
  { name: "ShieldIcon", categoryKey: "userAccount", Component: ShieldIcon, tags: ["shield", "security", "keamanan", "privasi", "protect"] },
  { name: "ShieldCheckIcon", categoryKey: "userAccount", Component: ShieldCheckIcon, tags: ["shield", "check", "verifikasi", "verified", "aman", "protection", "keamanan"] },
  { name: "LockIcon", categoryKey: "userAccount", Component: LockIcon, tags: ["lock", "kunci", "gembok", "security", "secure", "keamanan", "privasi"] },
  { name: "UnlockIcon", categoryKey: "userAccount", Component: UnlockIcon, tags: ["unlock", "buka kunci", "open", "access", "terbuka"] },
  { name: "KeyIcon", categoryKey: "userAccount", Component: KeyIcon, tags: ["key", "kunci", "access", "auth", "password", "token"] },

  { name: "PlusIcon", categoryKey: "actionInteraction", Component: PlusIcon, tags: ["plus", "tambah", "add", "create", "new"] },
  { name: "MinusIcon", categoryKey: "actionInteraction", Component: MinusIcon, tags: ["minus", "kurang", "remove", "decrease"] },
  { name: "EditIcon", categoryKey: "actionInteraction", Component: EditIcon, tags: ["edit", "pencil", "ubah", "tulis", "write"] },
  { name: "TrashIcon", categoryKey: "actionInteraction", Component: TrashIcon, tags: ["trash", "delete", "hapus", "bin", "remove"] },
  { name: "Trash2Icon", categoryKey: "actionInteraction", Component: Trash2Icon, tags: ["trash", "delete", "hapus", "bin", "tong sampah", "canister"] },
  { name: "CheckIcon", categoryKey: "actionInteraction", Component: CheckIcon, tags: ["check", "centang", "done", "confirm", "yes"] },
  { name: "CopyIcon", categoryKey: "actionInteraction", Component: CopyIcon, tags: ["copy", "salin", "clipboard", "duplicate"] },
  { name: "ExternalLinkIcon", categoryKey: "actionInteraction", Component: ExternalLinkIcon, tags: ["external", "link", "tautan", "open", "new tab"] },
  { name: "RefreshCwIcon", categoryKey: "actionInteraction", Component: RefreshCwIcon, tags: ["refresh", "reload", "sync", "sinkronisasi", "cw", "putar", "update"] },
  { name: "PowerIcon", categoryKey: "actionInteraction", Component: PowerIcon, tags: ["power", "shutdown", "turn off", "switch", "nyala", "mati", "on off"] },
  { name: "ZapIcon", categoryKey: "actionInteraction", Component: ZapIcon, tags: ["zap", "lightning", "petir", "kilat", "energi", "fast", "cepat", "listrik"] },
  { name: "AwardIcon", categoryKey: "actionInteraction", Component: AwardIcon, tags: ["award", "penghargaan", "badge", "prestasi", "medali", "juara"] },
  { name: "StarIcon", categoryKey: "actionInteraction", Component: StarIcon, tags: ["star", "bintang", "favorite", "favorit", "rating", "nilai"] },

  { name: "SettingsIcon", categoryKey: "systemFeedback", Component: SettingsIcon, tags: ["settings", "gear", "pengaturan", "config"] },
  { name: "BellIcon", categoryKey: "systemFeedback", Component: BellIcon, tags: ["bell", "notifikasi", "alert", "notification"] },
  { name: "BellRingIcon", categoryKey: "systemFeedback", Component: BellRingIcon, tags: ["bell", "ring", "notifikasi", "alarm", "lonceng", "alert", "dering"] },
  { name: "InfoIcon", categoryKey: "systemFeedback", Component: InfoIcon, tags: ["info", "informasi", "detail", "help"] },
  { name: "AlertTriangleIcon", categoryKey: "systemFeedback", Component: AlertTriangleIcon, tags: ["warning", "alert", "peringatan", "danger", "triangle"] },
  { name: "CheckCircleIcon", categoryKey: "systemFeedback", Component: CheckCircleIcon, tags: ["success", "sukses", "check", "circle", "berhasil"] },
  { name: "CrosshairIcon", categoryKey: "systemFeedback", Component: CrosshairIcon, tags: ["crosshair", "bidikan", "reticle", "target", "fokus", "sniper"] },
  { name: "TargetIcon", categoryKey: "systemFeedback", Component: TargetIcon, tags: ["target", "sasaran", "bullseye", "goal", "fokus", "tujuan"] },
  { name: "ActivityIcon", categoryKey: "systemFeedback", Component: ActivityIcon, tags: ["activity", "pulse", "jantung", "heartbeat", "ecg", "kesehatan", "monitoring"] },

  { name: "ImageIcon", categoryKey: "mediaDocument", Component: ImageIcon, tags: ["image", "gambar", "photo", "picture"] },
  { name: "FolderIcon", categoryKey: "mediaDocument", Component: FolderIcon, tags: ["folder", "direktori", "directory", "berkas", "arsip"] },
  { name: "FolderOpenIcon", categoryKey: "mediaDocument", Component: FolderOpenIcon, tags: ["folder", "open", "buka", "direktori", "directory", "berkas"] },
  { name: "FileIcon", categoryKey: "mediaDocument", Component: FileIcon, tags: ["file", "dokumen", "document", "berkas", "page"] },
  { name: "FilePlusIcon", categoryKey: "mediaDocument", Component: FilePlusIcon, tags: ["file", "add", "plus", "tambah file", "dokumen baru", "new"] },
  { name: "FileMinusIcon", categoryKey: "mediaDocument", Component: FileMinusIcon, tags: ["file", "remove", "minus", "hapus file", "kurang"] },
  { name: "FileTextIcon", categoryKey: "mediaDocument", Component: FileTextIcon, tags: ["file", "document", "dokumen", "text", "surat"] },
  { name: "DownloadIcon", categoryKey: "mediaDocument", Component: DownloadIcon, tags: ["download", "unduh", "save", "simpan"] },
  { name: "UploadIcon", categoryKey: "mediaDocument", Component: UploadIcon, tags: ["upload", "unggah", "send", "import"] },
  { name: "PlayIcon", categoryKey: "mediaDocument", Component: PlayIcon, tags: ["play", "putar", "start", "video", "audio"] },
  { name: "PauseIcon", categoryKey: "mediaDocument", Component: PauseIcon, tags: ["pause", "jeda", "stop", "freeze"] },
  { name: "StopIcon", categoryKey: "mediaDocument", Component: StopIcon, tags: ["stop", "berhenti", "square"] },
  { name: "SkipForwardIcon", categoryKey: "mediaDocument", Component: SkipForwardIcon, tags: ["skip", "forward", "next", "selanjutnya"] },
  { name: "SkipBackIcon", categoryKey: "mediaDocument", Component: SkipBackIcon, tags: ["skip", "back", "previous", "sebelumnya"] },
  { name: "VolumeXIcon", categoryKey: "mediaDocument", Component: VolumeXIcon, tags: ["volume", "mute", "silent", "sound", "suara"] },
  { name: "Volume2Icon", categoryKey: "mediaDocument", Component: Volume2Icon, tags: ["volume", "max", "loud", "sound", "audio"] },
  { name: "VideoIcon", categoryKey: "mediaDocument", Component: VideoIcon, tags: ["video", "record", "rekam", "movie", "film"] },
  { name: "MicIcon", categoryKey: "mediaDocument", Component: MicIcon, tags: ["mic", "microphone", "suara", "audio", "rekam", "voice"] },
  { name: "MicOffIcon", categoryKey: "mediaDocument", Component: MicOffIcon, tags: ["mic", "micoff", "bisu", "mute", "diam", "silent"] },
  { name: "HeadphonesIcon", categoryKey: "mediaDocument", Component: HeadphonesIcon, tags: ["headphones", "headset", "audio", "musik", "listen", "earphone"] },
  { name: "MusicIcon", categoryKey: "mediaDocument", Component: MusicIcon, tags: ["music", "musik", "lagu", "audio", "nada", "song"] },
  { name: "CastIcon", categoryKey: "mediaDocument", Component: CastIcon, tags: ["cast", "airplay", "streaming", "layar", "broadcast", "tv"] },
  { name: "RadioIcon", categoryKey: "mediaDocument", Component: RadioIcon, tags: ["radio", "frekuensi", "gelombang", "signal", "siaran", "broadcast"] },

  { name: "ShoppingCartIcon", categoryKey: "ecommerceFinance", Component: ShoppingCartIcon, tags: ["cart", "keranjang", "troli", "belanja", "ecommerce", "buy"] },
  { name: "ShoppingBagIcon", categoryKey: "ecommerceFinance", Component: ShoppingBagIcon, tags: ["bag", "tas", "belanja", "checkout", "store"] },
  { name: "CreditCardIcon", categoryKey: "ecommerceFinance", Component: CreditCardIcon, tags: ["card", "kartu", "kredit", "debit", "payment", "bayar"] },
  { name: "WalletIcon", categoryKey: "ecommerceFinance", Component: WalletIcon, tags: ["wallet", "dompet", "saldo", "money", "uang"] },
  { name: "TagIcon", categoryKey: "ecommerceFinance", Component: TagIcon, tags: ["tag", "price", "harga", "diskon", "promo", "label"] },
  { name: "ReceiptIcon", categoryKey: "ecommerceFinance", Component: ReceiptIcon, tags: ["receipt", "struk", "nota", "invoice", "tagihan"] },
  { name: "BanknoteIcon", categoryKey: "ecommerceFinance", Component: BanknoteIcon, tags: ["banknote", "cash", "uang", "tunai", "bill", "money"] },
  { name: "GiftIcon", categoryKey: "ecommerceFinance", Component: GiftIcon, tags: ["gift", "kado", "hadiah", "present", "voucher", "bonus"] },
  { name: "BoxIcon", categoryKey: "ecommerceFinance", Component: BoxIcon, tags: ["box", "kardus", "kotak", "kemasan", "isometric"] },
  { name: "PackageIcon", categoryKey: "ecommerceFinance", Component: PackageIcon, tags: ["package", "paket", "pengiriman", "kurir", "ekspedisi", "delivery"] },

  { name: "MailIcon", categoryKey: "communication", Component: MailIcon, tags: ["mail", "email", "surat", "inbox", "pesan"] },
  { name: "PhoneIcon", categoryKey: "communication", Component: PhoneIcon, tags: ["phone", "telepon", "call", "panggilan", "kontak"] },
  { name: "PhoneCallIcon", categoryKey: "communication", Component: PhoneCallIcon, tags: ["phone", "call", "panggilan", "telepon", "dering", "contact"] },
  { name: "MessageCircleIcon", categoryKey: "communication", Component: MessageCircleIcon, tags: ["chat", "pesan", "komentar", "bubble", "talk"] },
  { name: "MessageSquareIcon", categoryKey: "communication", Component: MessageSquareIcon, tags: ["chat", "square", "komentar", "diskusi"] },
  { name: "SendIcon", categoryKey: "communication", Component: SendIcon, tags: ["send", "kirim", "paperplane", "submit", "post"] },
  { name: "ShareIcon", categoryKey: "communication", Component: ShareIcon, tags: ["share", "bagikan", "sosmed", "link", "forward"] },
  { name: "Share2Icon", categoryKey: "communication", Component: Share2Icon, tags: ["share", "bagikan", "sosmed", "nodes", "social", "network"] },

  { name: "MonitorIcon", categoryKey: "deviceHardware", Component: MonitorIcon, tags: ["monitor", "desktop", "screen", "layar", "pc", "computer"] },
  { name: "SmartphoneIcon", categoryKey: "deviceHardware", Component: SmartphoneIcon, tags: ["smartphone", "hp", "mobile", "phone", "gadget"] },
  { name: "LaptopIcon", categoryKey: "deviceHardware", Component: LaptopIcon, tags: ["laptop", "notebook", "macbook", "komputer"] },
  { name: "TabletIcon", categoryKey: "deviceHardware", Component: TabletIcon, tags: ["tablet", "ipad", "gadget", "device"] },
  { name: "HardDriveIcon", categoryKey: "deviceHardware", Component: HardDriveIcon, tags: ["hdd", "ssd", "harddrive", "storage", "disk", "memory"] },
  { name: "CameraIcon", categoryKey: "deviceHardware", Component: CameraIcon, tags: ["camera", "kamera", "foto", "photo", "snapshot"] },
  { name: "DatabaseIcon", categoryKey: "deviceHardware", Component: DatabaseIcon, tags: ["database", "db", "sql", "storage", "server", "data"] },
  { name: "CloudIcon", categoryKey: "deviceHardware", Component: CloudIcon, tags: ["cloud", "awan", "server", "storage", "online"] },
  { name: "TerminalIcon", categoryKey: "deviceHardware", Component: TerminalIcon, tags: ["terminal", "bash", "cli", "command", "prompt", "shell"] },
  { name: "CodeIcon", categoryKey: "deviceHardware", Component: CodeIcon, tags: ["code", "coding", "developer", "html", "script", "kurung siku"] },
  { name: "GridIcon", categoryKey: "deviceHardware", Component: GridIcon, tags: ["grid", "layout", "tabel", "matrix", "dashboard"] },
  { name: "LayoutIcon", categoryKey: "deviceHardware", Component: LayoutIcon, tags: ["layout", "tampilan", "sidebar", "header", "grid", "wireframe"] },
  { name: "LayersIcon", categoryKey: "deviceHardware", Component: LayersIcon, tags: ["layers", "lapisan", "stack", "level", "tier"] },
  { name: "MaximizeIcon", categoryKey: "deviceHardware", Component: MaximizeIcon, tags: ["maximize", "fullscreen", "perbesar", "expand", "layar penuh"] },
  { name: "MinimizeIcon", categoryKey: "deviceHardware", Component: MinimizeIcon, tags: ["minimize", "perkecil", "shrink", "exit fullscreen", "tutup penuh"] },
  { name: "BatteryIcon", categoryKey: "deviceHardware", Component: BatteryIcon, tags: ["battery", "baterai", "daya", "power", "indikator"] },
  { name: "BatteryChargingIcon", categoryKey: "deviceHardware", Component: BatteryChargingIcon, tags: ["battery", "charging", "isi daya", "cas", "listrik", "baterai"] },

  { name: "BoldIcon", categoryKey: "textEditor", Component: BoldIcon, tags: ["bold", "tebal", "typography", "text"] },
  { name: "ItalicIcon", categoryKey: "textEditor", Component: ItalicIcon, tags: ["italic", "miring", "typography", "text"] },
  { name: "UnderlineIcon", categoryKey: "textEditor", Component: UnderlineIcon, tags: ["underline", "garis bawah", "typography", "text"] },
  { name: "LinkIcon", categoryKey: "textEditor", Component: LinkIcon, tags: ["link", "tautan", "url", "chain", "hyperlink"] },
  { name: "AlignLeftIcon", categoryKey: "textEditor", Component: AlignLeftIcon, tags: ["align", "left", "rata kiri", "paragraph", "text"] },
  { name: "AlignCenterIcon", categoryKey: "textEditor", Component: AlignCenterIcon, tags: ["align", "center", "rata tengah", "paragraph", "text"] },
  { name: "AlignRightIcon", categoryKey: "textEditor", Component: AlignRightIcon, tags: ["align", "right", "rata kanan", "paragraph", "text"] },
  { name: "ListIcon", categoryKey: "textEditor", Component: ListIcon, tags: ["list", "bullet", "daftar", "point", "todo"] },
  { name: "ScissorsIcon", categoryKey: "textEditor", Component: ScissorsIcon, tags: ["scissors", "gunting", "cut", "potong", "trim"] },
  { name: "ClipboardIcon", categoryKey: "textEditor", Component: ClipboardIcon, tags: ["clipboard", "papan klip", "paste", "dokumen", "catatan"] },
  { name: "Edit2Icon", categoryKey: "textEditor", Component: Edit2Icon, tags: ["edit", "pen", "pena", "tulis", "ubah", "editor"] },
  { name: "Edit3Icon", categoryKey: "textEditor", Component: Edit3Icon, tags: ["edit", "pencil", "pensil", "gambar", "garis", "draft"] },
  { name: "PenToolIcon", categoryKey: "textEditor", Component: PenToolIcon, tags: ["pentool", "vektor", "bezier", "kurva", "pen", "desain"] },
  { name: "CropIcon", categoryKey: "textEditor", Component: CropIcon, tags: ["crop", "potong", "pangkas", "bingkai", "frame", "aspect ratio"] },

  { name: "ClockIcon", categoryKey: "timeLocation", Component: ClockIcon, tags: ["clock", "jam", "waktu", "time", "timer", "schedule"] },
  { name: "CalendarIcon", categoryKey: "timeLocation", Component: CalendarIcon, tags: ["calendar", "kalender", "tanggal", "date", "event"] },
  { name: "MapPinIcon", categoryKey: "timeLocation", Component: MapPinIcon, tags: ["pin", "map", "lokasi", "tempat", "gps", "marker"] },
  { name: "MapIcon", categoryKey: "timeLocation", Component: MapIcon, tags: ["map", "peta", "navigasi", "route", "arah"] },
  { name: "CompassIcon", categoryKey: "timeLocation", Component: CompassIcon, tags: ["compass", "kompas", "arah", "direction", "explore"] },
  { name: "SunIcon", categoryKey: "timeLocation", Component: SunIcon, tags: ["sun", "matahari", "light", "cerah", "day", "siang"] },
  { name: "MoonIcon", categoryKey: "timeLocation", Component: MoonIcon, tags: ["moon", "bulan", "dark", "night", "malam"] },
  { name: "GlobeIcon", categoryKey: "timeLocation", Component: GlobeIcon, tags: ["globe", "dunia", "earth", "bumi", "world", "international"] },
  { name: "ThermometerIcon", categoryKey: "timeLocation", Component: ThermometerIcon, tags: ["thermometer", "termometer", "suhu", "cuaca", "temperatur", "panas", "dingin"] },

  { name: "EyeIcon", categoryKey: "userAccount", Component: EyeIcon, tags: ["eye", "mata", "lihat", "view", "show", "password", "buka"] },
  { name: "EyeOffIcon", categoryKey: "userAccount", Component: EyeOffIcon, tags: ["eye off", "mata tertutup", "hide", "sembunyi", "secret", "password"] },
  { name: "HeartIcon", categoryKey: "actionInteraction", Component: HeartIcon, tags: ["heart", "hati", "love", "suka", "favorite", "favorit", "like"] },
  { name: "BookmarkIcon", categoryKey: "actionInteraction", Component: BookmarkIcon, tags: ["bookmark", "mark", "penanda", "simpan", "save", "baca nanti"] },
  { name: "FilterIcon", categoryKey: "actionInteraction", Component: FilterIcon, tags: ["filter", "saring", "corong", "sort", "kategori", "funnel"] },
  { name: "SlidersIcon", categoryKey: "systemFeedback", Component: SlidersIcon, tags: ["sliders", "pengaturan", "controls", "preferensi", "eq", "adjust"] },
  { name: "HelpCircleIcon", categoryKey: "systemFeedback", Component: HelpCircleIcon, tags: ["help", "bantuan", "tanya", "faq", "question", "support"] },
  { name: "AlertCircleIcon", categoryKey: "systemFeedback", Component: AlertCircleIcon, tags: ["alert", "circle", "error", "peringatan", "danger", "warning"] },
  { name: "XCircleIcon", categoryKey: "systemFeedback", Component: XCircleIcon, tags: ["cancel", "silang", "x circle", "close", "batal", "stop", "failed"] },
  { name: "CheckSquareIcon", categoryKey: "actionInteraction", Component: CheckSquareIcon, tags: ["check", "centang", "kotak", "checkbox", "done", "selesai", "task"] },
  { name: "SquareIcon", categoryKey: "actionInteraction", Component: SquareIcon, tags: ["square", "kotak", "uncheck", "empty", "box"] },
  { name: "ToggleLeftIcon", categoryKey: "systemFeedback", Component: ToggleLeftIcon, tags: ["toggle", "left", "switch off", "mati", "nonaktif", "disable"] },
  { name: "ToggleRightIcon", categoryKey: "systemFeedback", Component: ToggleRightIcon, tags: ["toggle", "right", "switch on", "nyala", "aktif", "enable"] },
  { name: "PrinterIcon", categoryKey: "deviceHardware", Component: PrinterIcon, tags: ["printer", "cetak", "print", "dokumen", "hardcopy"] },
  { name: "ArchiveIcon", categoryKey: "mediaDocument", Component: ArchiveIcon, tags: ["archive", "arsip", "simpan", "storage", "box", "gudang"] },
  { name: "InboxIcon", categoryKey: "communication", Component: InboxIcon, tags: ["inbox", "kotak masuk", "surat", "mail", "pesan"] },
  { name: "PaperclipIcon", categoryKey: "communication", Component: PaperclipIcon, tags: ["paperclip", "lampiran", "attach", "attachment", "klip"] },
  { name: "WifiIcon", categoryKey: "deviceHardware", Component: WifiIcon, tags: ["wifi", "internet", "wireless", "jaringan", "sinyal", "online"] },
  { name: "WifiOffIcon", categoryKey: "deviceHardware", Component: WifiOffIcon, tags: ["wifi off", "no internet", "offline", "terputus", "sinyal hilang"] },
  { name: "BluetoothIcon", categoryKey: "deviceHardware", Component: BluetoothIcon, tags: ["bluetooth", "nirkabel", "pairing", "connect", "koneksi"] },
  { name: "CpuIcon", categoryKey: "deviceHardware", Component: CpuIcon, tags: ["cpu", "processor", "prosesor", "chip", "hardware", "kinerja"] },
  { name: "ServerIcon", categoryKey: "deviceHardware", Component: ServerIcon, tags: ["server", "hosting", "rack", "backend", "cloud", "database"] },
  { name: "ShuffleIcon", categoryKey: "mediaDocument", Component: ShuffleIcon, tags: ["shuffle", "acak", "random", "music", "lagu", "playlist"] },
  { name: "RepeatIcon", categoryKey: "mediaDocument", Component: RepeatIcon, tags: ["repeat", "ulang", "loop", "putar ulang", "music"] },
  { name: "Volume1Icon", categoryKey: "mediaDocument", Component: Volume1Icon, tags: ["volume", "audio", "suara rendah", "sound", "speaker"] },
  { name: "TrendingUpIcon", categoryKey: "ecommerceFinance", Component: TrendingUpIcon, tags: ["trending up", "naik", "profit", "untung", "growth", "saham", "bullish"] },
  { name: "TrendingDownIcon", categoryKey: "ecommerceFinance", Component: TrendingDownIcon, tags: ["trending down", "turun", "rugi", "drop", "loss", "bearish"] },
  { name: "BarChart2Icon", categoryKey: "ecommerceFinance", Component: BarChart2Icon, tags: ["chart", "grafik", "diagram", "statistik", "bar", "analytics"] },
  { name: "PieChartIcon", categoryKey: "ecommerceFinance", Component: PieChartIcon, tags: ["pie chart", "diagram lingkaran", "persentase", "statistik", "rasio"] },
  { name: "SparklesIcon", categoryKey: "actionInteraction", Component: SparklesIcon, tags: ["sparkles", "kilau", "bintang", "ai", "magic", "fitur baru", "clean"] },

  // Batch 3 Icons
  { name: "ArrowUpIcon", categoryKey: "navigation", Component: ArrowUpIcon, tags: ["arrow", "up", "atas", "naik"] },
  { name: "ArrowDownIcon", categoryKey: "navigation", Component: ArrowDownIcon, tags: ["arrow", "down", "bawah", "turun"] },
  { name: "ArrowUpRightIcon", categoryKey: "navigation", Component: ArrowUpRightIcon, tags: ["arrow", "up right", "diagonal", "external", "link"] },
  { name: "ArrowDownLeftIcon", categoryKey: "navigation", Component: ArrowDownLeftIcon, tags: ["arrow", "down left", "diagonal", "masuk"] },
  { name: "CornerDownLeftIcon", categoryKey: "actionInteraction", Component: CornerDownLeftIcon, tags: ["enter", "return", "submit", "keyboard"] },
  { name: "MoreHorizontalIcon", categoryKey: "actionInteraction", Component: MoreHorizontalIcon, tags: ["more", "options", "menu", "dots", "horizontal", "titik tiga"] },
  { name: "MoreVerticalIcon", categoryKey: "actionInteraction", Component: MoreVerticalIcon, tags: ["more", "options", "menu", "dots", "vertical", "titik tiga"] },
  { name: "ChevronsLeftIcon", categoryKey: "navigation", Component: ChevronsLeftIcon, tags: ["chevrons", "double arrow", "rewind", "first", "awal"] },
  { name: "ChevronsRightIcon", categoryKey: "navigation", Component: ChevronsRightIcon, tags: ["chevrons", "double arrow", "fast forward", "last", "akhir"] },
  { name: "ChevronsUpIcon", categoryKey: "navigation", Component: ChevronsUpIcon, tags: ["chevrons", "up", "top", "atas"] },
  { name: "ChevronsDownIcon", categoryKey: "navigation", Component: ChevronsDownIcon, tags: ["chevrons", "down", "bottom", "bawah"] },
  { name: "RotateCcwIcon", categoryKey: "actionInteraction", Component: RotateCcwIcon, tags: ["undo", "rotate", "counter clockwise", "histori", "balik"] },
  { name: "MoveIcon", categoryKey: "actionInteraction", Component: MoveIcon, tags: ["move", "drag", "geser", "panah 4 arah", "reorder"] },
  { name: "CheckCheckIcon", categoryKey: "communication", Component: CheckCheckIcon, tags: ["check", "double check", "read", "terbaca", "centang dua"] },
  { name: "GitBranchIcon", categoryKey: "actionInteraction", Component: GitBranchIcon, tags: ["git", "branch", "cabang", "code", "version control"] },
  { name: "GitCommitIcon", categoryKey: "actionInteraction", Component: GitCommitIcon, tags: ["git", "commit", "snapshot", "code"] },
  { name: "GitMergeIcon", categoryKey: "actionInteraction", Component: GitMergeIcon, tags: ["git", "merge", "gabung", "pr"] },
  { name: "GitPullRequestIcon", categoryKey: "actionInteraction", Component: GitPullRequestIcon, tags: ["git", "pr", "pull request", "kontribusi"] },
  { name: "BugIcon", categoryKey: "systemFeedback", Component: BugIcon, tags: ["bug", "error", "issue", "debug", "laporan"] },
  { name: "TerminalSquareIcon", categoryKey: "deviceHardware", Component: TerminalSquareIcon, tags: ["terminal", "console", "cmd", "bash", "cli"] },
  { name: "FlameIcon", categoryKey: "actionInteraction", Component: FlameIcon, tags: ["flame", "fire", "api", "hot", "trending", "streak"] },
  { name: "LightbulbIcon", categoryKey: "actionInteraction", Component: LightbulbIcon, tags: ["lightbulb", "lampu", "ide", "tips", "hint", "insight"] },
  { name: "CrownIcon", categoryKey: "userAccount", Component: CrownIcon, tags: ["crown", "mahkota", "vip", "premium", "admin", "owner"] },
  { name: "DollarSignIcon", categoryKey: "ecommerceFinance", Component: DollarSignIcon, tags: ["dollar", "usd", "uang", "money", "price", "harga"] },
  { name: "CoinsIcon", categoryKey: "ecommerceFinance", Component: CoinsIcon, tags: ["coins", "koin", "crypto", "token", "saldo", "balance"] },
  { name: "BriefcaseIcon", categoryKey: "ecommerceFinance", Component: BriefcaseIcon, tags: ["briefcase", "koper", "pekerjaan", "job", "career", "bisnis"] },
  { name: "BuildingIcon", categoryKey: "ecommerceFinance", Component: BuildingIcon, tags: ["building", "gedung", "kantor", "office", "company", "enterprise"] },
  { name: "StoreIcon", categoryKey: "ecommerceFinance", Component: StoreIcon, tags: ["store", "toko", "shop", "merchant", "outlet"] },
  { name: "TruckIcon", categoryKey: "ecommerceFinance", Component: TruckIcon, tags: ["truck", "truk", "delivery", "shipping", "ongkir", "ekspedisi"] },
  { name: "QrCodeIcon", categoryKey: "ecommerceFinance", Component: QrCodeIcon, tags: ["qr", "qrcode", "scan", "barcode 2d", "qris", "bayar"] },
  { name: "BarcodeIcon", categoryKey: "ecommerceFinance", Component: BarcodeIcon, tags: ["barcode", "kode batang", "sku", "produk"] },
  { name: "PaletteIcon", categoryKey: "actionInteraction", Component: PaletteIcon, tags: ["palette", "palet", "warna", "color", "theme", "design"] },
  { name: "FilmIcon", categoryKey: "mediaDocument", Component: FilmIcon, tags: ["film", "movie", "video", "bioskop", "cinema"] },
  { name: "ApertureIcon", categoryKey: "mediaDocument", Component: ApertureIcon, tags: ["aperture", "lens", "shutter", "kamera", "foto"] },
  { name: "EraserIcon", categoryKey: "textEditor", Component: EraserIcon, tags: ["eraser", "penghapus", "clear", "hapus", "reset"] },
  { name: "TypeIcon", categoryKey: "textEditor", Component: TypeIcon, tags: ["type", "font", "huruf", "text", "typography"] },
  { name: "AtSignIcon", categoryKey: "communication", Component: AtSignIcon, tags: ["at", "@", "mention", "tag", "email"] },
  { name: "HashIcon", categoryKey: "communication", Component: HashIcon, tags: ["hash", "#", "hashtag", "tagar", "channel", "number"] },
  { name: "RssIcon", categoryKey: "communication", Component: RssIcon, tags: ["rss", "feed", "sindikasi", "berita", "xml"] },
  { name: "SmileIcon", categoryKey: "communication", Component: SmileIcon, tags: ["smile", "senyum", "happy", "emoji", "reaksi"] },
  { name: "FrownIcon", categoryKey: "communication", Component: FrownIcon, tags: ["frown", "sedih", "cemberut", "bad", "emoji"] },
  { name: "PlugIcon", categoryKey: "deviceHardware", Component: PlugIcon, tags: ["plug", "colokan", "steker", "connect", "integration"] },
  { name: "FingerprintIcon", categoryKey: "userAccount", Component: FingerprintIcon, tags: ["fingerprint", "sidik jari", "biometrik", "touchid", "auth"] },
  { name: "UserPlusIcon", categoryKey: "userAccount", Component: UserPlusIcon, tags: ["user plus", "tambah teman", "add user", "register"] },
  { name: "UserMinusIcon", categoryKey: "userAccount", Component: UserMinusIcon, tags: ["user minus", "hapus teman", "remove user"] },
  { name: "UserCheckIcon", categoryKey: "userAccount", Component: UserCheckIcon, tags: ["user check", "verified user", "approved", "aktif"] },
  { name: "UserXIcon", categoryKey: "userAccount", Component: UserXIcon, tags: ["user x", "block user", "blokir", "banned"] },
  { name: "FolderPlusIcon", categoryKey: "mediaDocument", Component: FolderPlusIcon, tags: ["folder plus", "tambah folder", "folder baru", "directory"] },
  { name: "FolderMinusIcon", categoryKey: "mediaDocument", Component: FolderMinusIcon, tags: ["folder minus", "kurang folder", "hapus direktori"] },
  { name: "FileCodeIcon", categoryKey: "mediaDocument", Component: FileCodeIcon, tags: ["file code", "berkas kode", "script", "source"] },
  { name: "FileCheckIcon", categoryKey: "mediaDocument", Component: FileCheckIcon, tags: ["file check", "dokumen selesai", "valid", "approved"] },
  { name: "Globe2Icon", categoryKey: "communication", Component: Globe2Icon, tags: ["globe", "dunia", "meridian", "world", "network", "internet"] },
  { name: "ShieldAlertIcon", categoryKey: "systemFeedback", Component: ShieldAlertIcon, tags: ["shield alert", "keamanan", "peringatan", "warning", "security"] },
  { name: "ShieldXIcon", categoryKey: "systemFeedback", Component: ShieldXIcon, tags: ["shield x", "blokir", "ditolak", "forbidden", "firewall"] },
  { name: "VerifiedIcon", categoryKey: "actionInteraction", Component: VerifiedIcon, tags: ["verified", "lencana", "official", "centang resmi", "badge"] },
  { name: "SlidersHorizontalIcon", categoryKey: "actionInteraction", Component: SlidersHorizontalIcon, tags: ["sliders", "filter", "horizontal", "controls", "setting"] },
  { name: "ScaleIcon", categoryKey: "ecommerceFinance", Component: ScaleIcon, tags: ["scale", "timbangan", "legal", "hukum", "komparasi"] },
  { name: "ShapesIcon", categoryKey: "actionInteraction", Component: ShapesIcon, tags: ["shapes", "bentuk", "geometri", "vector", "desain"] },
  { name: "SignalIcon", categoryKey: "deviceHardware", Component: SignalIcon, tags: ["signal", "sinyal", "cellular", "reception", "jaringan"] },
  { name: "Wand2Icon", categoryKey: "actionInteraction", Component: Wand2Icon, tags: ["wand", "tongkat sihir", "ai", "generator", "magic", "special"] },

  // Batch 4 Icons
  { name: "CloudRainIcon", categoryKey: "timeLocation", Component: CloudRainIcon, tags: ["rain", "hujan", "weather", "cuaca", "gerimis", "cloud"] },
  { name: "CloudSnowIcon", categoryKey: "timeLocation", Component: CloudSnowIcon, tags: ["snow", "salju", "weather", "dingin", "winter", "es"] },
  { name: "CloudLightningIcon", categoryKey: "timeLocation", Component: CloudLightningIcon, tags: ["lightning", "petir", "badai", "storm", "thunder", "kilat"] },
  { name: "WindIcon", categoryKey: "timeLocation", Component: WindIcon, tags: ["wind", "angin", "breeze", "udara", "weather"] },
  { name: "UmbrellaIcon", categoryKey: "timeLocation", Component: UmbrellaIcon, tags: ["umbrella", "payung", "hujan", "protection", "protect"] },
  { name: "DropletIcon", categoryKey: "timeLocation", Component: DropletIcon, tags: ["droplet", "tetesan", "air", "water", "oil", "kelembapan"] },
  { name: "SunsetIcon", categoryKey: "timeLocation", Component: SunsetIcon, tags: ["sunset", "matahari terbenam", "senja", "sore", "dusk"] },
  { name: "SunriseIcon", categoryKey: "timeLocation", Component: SunriseIcon, tags: ["sunrise", "matahari terbit", "fajar", "pagi", "dawn"] },
  { name: "LeafIcon", categoryKey: "timeLocation", Component: LeafIcon, tags: ["leaf", "daun", "nature", "organik", "eco", "alam", "hijau"] },
  { name: "MouseIcon", categoryKey: "deviceHardware", Component: MouseIcon, tags: ["mouse", "kursor", "hardware", "click", "komputer"] },
  { name: "KeyboardIcon", categoryKey: "deviceHardware", Component: KeyboardIcon, tags: ["keyboard", "papan ketik", "typing", "input", "hardware"] },
  { name: "SpeakerIcon", categoryKey: "deviceHardware", Component: SpeakerIcon, tags: ["speaker", "audio", "sound", "musik", "suara", "loudspeaker"] },
  { name: "HeadsetIcon", categoryKey: "deviceHardware", Component: HeadsetIcon, tags: ["headset", "earphone", "call", "cs", "gaming", "operator"] },
  { name: "Gamepad2Icon", categoryKey: "deviceHardware", Component: Gamepad2Icon, tags: ["gamepad", "stick", "controller", "gaming", "game", "play"] },
  { name: "UsbIcon", categoryKey: "deviceHardware", Component: UsbIcon, tags: ["usb", "flashdisk", "cable", "port", "connect", "koneksi"] },
  { name: "WrenchIcon", categoryKey: "actionInteraction", Component: WrenchIcon, tags: ["wrench", "kunci inggris", "repair", "tools", "perbaikan", "bengkel"] },
  { name: "HammerIcon", categoryKey: "actionInteraction", Component: HammerIcon, tags: ["hammer", "palu", "alat", "tools", "build", "konstruksi"] },
  { name: "RulerIcon", categoryKey: "actionInteraction", Component: RulerIcon, tags: ["ruler", "penggaris", "measure", "ukuran", "dimensi", "desain"] },
  { name: "GaugeIcon", categoryKey: "systemFeedback", Component: GaugeIcon, tags: ["gauge", "speedometer", "meter", "performa", "speed", "dashboard"] },
  { name: "HourglassIcon", categoryKey: "timeLocation", Component: HourglassIcon, tags: ["hourglass", "jam pasir", "waiting", "loading", "waktu", "timer"] },
  { name: "TimerIcon", categoryKey: "timeLocation", Component: TimerIcon, tags: ["timer", "stopwatch", "countdown", "waktu", "hitung mundur"] },
  { name: "PinIcon", categoryKey: "actionInteraction", Component: PinIcon, tags: ["pin", "semat", "sticky", "tancap", "favorite", "bookmark"] },
  { name: "PinOffIcon", categoryKey: "actionInteraction", Component: PinOffIcon, tags: ["pin off", "lepas sematan", "unpin", "cabut pin"] },
  { name: "TableIcon", categoryKey: "mediaDocument", Component: TableIcon, tags: ["table", "tabel", "baris kolom", "grid", "data", "sheet"] },
  { name: "KanbanIcon", categoryKey: "mediaDocument", Component: KanbanIcon, tags: ["kanban", "board", "trello", "kolom", "agile", "scrum", "task"] },
  { name: "LineChartIcon", categoryKey: "ecommerceFinance", Component: LineChartIcon, tags: ["line chart", "grafik garis", "tren", "analytics", "data", "saham"] },
  { name: "FileSpreadsheetIcon", categoryKey: "mediaDocument", Component: FileSpreadsheetIcon, tags: ["excel", "spreadsheet", "csv", "data", "dokumen excel"] },
  { name: "GitForkIcon", categoryKey: "actionInteraction", Component: GitForkIcon, tags: ["git fork", "fork", "salin repo", "cabang", "repo"] },
  { name: "HeartHandshakeIcon", categoryKey: "actionInteraction", Component: HeartHandshakeIcon, tags: ["handshake", "jabat tangan", "kerja sama", "partnership", "charity", "peduli"] },
  { name: "PartyPopperIcon", categoryKey: "actionInteraction", Component: PartyPopperIcon, tags: ["party", "popper", "selamat", "congrats", "perayaan", "event"] },
  { name: "HeartPulseIcon", categoryKey: "systemFeedback", Component: HeartPulseIcon, tags: ["heartbeat", "pulse", "denyut jantung", "ecg", "kesehatan", "vital"] },
  { name: "CoffeeIcon", categoryKey: "actionInteraction", Component: CoffeeIcon, tags: ["coffee", "kopi", "cafe", "istirahat", "break", "minuman"] },
  { name: "UtensilsIcon", categoryKey: "actionInteraction", Component: UtensilsIcon, tags: ["utensils", "sendok garpu", "makan", "restoran", "food", "kuliner"] },
  { name: "PlaneIcon", categoryKey: "navigation", Component: PlaneIcon, tags: ["plane", "pesawat", "terbang", "flight", "tiket", "travel"] },
  { name: "CarIcon", categoryKey: "navigation", Component: CarIcon, tags: ["car", "mobil", "otomotif", "kendaraan", "transport"] },
  { name: "BusIcon", categoryKey: "navigation", Component: BusIcon, tags: ["bus", "bis", "transportasi umum", "transit"] },
  { name: "TrainIcon", categoryKey: "navigation", Component: TrainIcon, tags: ["train", "kereta", "railway", "commuter", "mrt", "lrt"] },
  { name: "FuelIcon", categoryKey: "navigation", Component: FuelIcon, tags: ["fuel", "bensin", "spbu", "pom", "gas station", "energi"] },
  { name: "Navigation2Icon", categoryKey: "navigation", Component: Navigation2Icon, tags: ["navigation", "gps", "arah", "lokasi", "pointer", "rute"] },
  { name: "SparkleIcon", categoryKey: "actionInteraction", Component: SparkleIcon, tags: ["sparkle", "bintang", "kilau", "bersih", "ai", "magic"] },
  { name: "MessageSquarePlusIcon", categoryKey: "communication", Component: MessageSquarePlusIcon, tags: ["message plus", "chat baru", "tambah pesan", "komentar baru"] },
  { name: "RadioTowerIcon", categoryKey: "communication", Component: RadioTowerIcon, tags: ["tower", "pemancar", "broadcast", "siaran", "antena", "radio"] },
  { name: "PodcastIcon", categoryKey: "communication", Component: PodcastIcon, tags: ["podcast", "siaran suara", "audio", "mic", "talk"] },
  { name: "VoicemailIcon", categoryKey: "communication", Component: VoicemailIcon, tags: ["voicemail", "pesan suara", "rekaman", "telepon"] },
  { name: "StethoscopeIcon", categoryKey: "systemFeedback", Component: StethoscopeIcon, tags: ["stethoscope", "stetoskop", "dokter", "medis", "klinik", "kesehatan"] },
  { name: "CupSodaIcon", categoryKey: "actionInteraction", Component: CupSodaIcon, tags: ["cup soda", "minuman", "soft drink", "jus", "fast food"] },
  { name: "FolderLockIcon", categoryKey: "systemFeedback", Component: FolderLockIcon, tags: ["folder lock", "folder terkunci", "private", "enkripsi", "aman"] },
  { name: "FileLockIcon", categoryKey: "systemFeedback", Component: FileLockIcon, tags: ["file lock", "dokumen terkunci", "rahasia", "enkripsi"] },
  { name: "MagnetIcon", categoryKey: "actionInteraction", Component: MagnetIcon, tags: ["magnet", "tarik", "leads", "attract", "daya tarik"] },
  { name: "GlassesIcon", categoryKey: "actionInteraction", Component: GlassesIcon, tags: ["glasses", "kacamata", "vision", "membaca", "mode baca", "optik"] },
  { name: "KeyRoundIcon", categoryKey: "systemFeedback", Component: KeyRoundIcon, tags: ["key round", "kunci bulat", "password", "akses", "token"] },
  { name: "AppleIcon", categoryKey: "actionInteraction", Component: AppleIcon, tags: ["apple", "apel", "buah", "fruit", "sehat", "diet", "nutrition"] },
  { name: "UnplugIcon", categoryKey: "deviceHardware", Component: UnplugIcon, tags: ["unplug", "cabut", "terputus", "disconnect", "colokan lepas"] },
  { name: "NetworkIcon", categoryKey: "deviceHardware", Component: NetworkIcon, tags: ["network", "jaringan", "lan", "nodes", "topologi", "server"] },
];

const ITEMS_PER_PAGE = 100;

export function IconDemo() {
  const { t, i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IconCategoryKey>("all");
  const [previewSize, setPreviewSize] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categoryFilters = useMemo(
    () => [
      { key: "all" as const, label: t("content.iconDemo.categories.all", "Semua") },
      { key: "navigation" as const, label: t("content.iconDemo.categories.navigation", "Navigasi") },
      { key: "userAccount" as const, label: t("content.iconDemo.categories.userAccount", "User & Akun") },
      { key: "actionInteraction" as const, label: t("content.iconDemo.categories.actionInteraction", "Aksi & Interaksi") },
      { key: "systemFeedback" as const, label: t("content.iconDemo.categories.systemFeedback", "Sistem & Umpan Balik") },
      { key: "mediaDocument" as const, label: t("content.iconDemo.categories.mediaDocument", "Media & Dokumen") },
      { key: "ecommerceFinance" as const, label: t("content.iconDemo.categories.ecommerceFinance", "E-Commerce & Keuangan") },
      { key: "communication" as const, label: t("content.iconDemo.categories.communication", "Komunikasi") },
      { key: "deviceHardware" as const, label: t("content.iconDemo.categories.deviceHardware", "Perangkat & Hardware") },
      { key: "textEditor" as const, label: t("content.iconDemo.categories.textEditor", "Editor Teks") },
      { key: "timeLocation" as const, label: t("content.iconDemo.categories.timeLocation", "Waktu & Lokasi") },
      { key: "brandTech" as const, label: t("content.iconDemo.categories.brandTech", "Brand & Tech") },
    ],
    [t]
  );

  // Filter daftar ikon berdasarkan search query dan kategori aktif
  const filteredIcons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_ICONS.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.categoryKey === selectedCategory;
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredIcons.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedIcons = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredIcons.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredIcons, safeCurrentPage]);

  const startIndex = filteredIcons.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredIcons.length);

  const handlePageChange = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
    const anchor = document.getElementById("icon-grid-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className="space-y-8">
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.iconDemo.badge", "Aset")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.iconDemo.pageTitle", {
            defaultValue: "Web Icons (Ikon Esensial)",
          })}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t("content.iconDemo.pageDesc", {
            defaultValue:
              "Koleksi ikon SVG web esensial bawaan pustaka needui. Dibuat dengan gaya garis minimalis (stroke width 2, viewBox 24x24), modular, ringan, dan warna dapat dikustomisasi langsung melalui class utility Tailwind CSS (currentColor).",
          })}
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t(
              "content.iconDemo.searchPlaceholder",
              "Cari ikon (contoh: 'play', 'cloud', 'cart', 'phone', 'sun', 'code')..."
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.iconDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            {/* Size Switcher */}
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {t("content.iconDemo.previewSize", "Ukuran Preview:")}
              </span>
              <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-0.5">
                {[18, 24, 32].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreviewSize(s)}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-medium cursor-pointer transition ${
                      previewSize === s
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-xs"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="icon-grid-anchor"
        className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400 px-1 scroll-mt-20"
      >
        <span>
          {filteredIcons.length > ITEMS_PER_PAGE
            ? t("content.iconDemo.showingCountPaginated", {
                start: startIndex,
                end: endIndex,
                count: filteredIcons.length,
                total: ALL_ICONS.length,
                defaultValue: `Menampilkan ${startIndex} - ${endIndex} dari ${filteredIcons.length} ikon esensial (total ${ALL_ICONS.length} ikon).`,
              })
            : t("content.iconDemo.showingCount", {
                count: filteredIcons.length,
                total: ALL_ICONS.length,
                defaultValue: `Menampilkan ${filteredIcons.length} dari ${ALL_ICONS.length} ikon web esensial.`,
              })}
        </span>
        <span className="hidden sm:inline">
          {t("content.iconDemo.copyTip", "💡 Klik ikon apa saja untuk menyalin snippet JSX")}
        </span>
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t("content.iconDemo.emptySearch", {
              query: searchQuery,
              defaultValue: `Tidak ditemukan ikon dengan kata kunci "${searchQuery}"`,
            })}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.iconDemo.resetSearch", "Reset filter dan pencarian")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {paginatedIcons.map(({ name, Component }) => (
          <IconCard
            key={name}
            name={name}
            icon={<Component size={previewSize} />}
            jsxContent={`<${name} size={${previewSize}} />`}
            className="p-5"
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {t("content.iconDemo.pagination.page", {
              current: safeCurrentPage,
              total: totalPages,
              defaultValue: `Halaman ${safeCurrentPage} dari ${totalPages}`,
            })}{" "}
            <span className="text-neutral-400 dark:text-neutral-500">
              ({startIndex}–{endIndex} dari {filteredIcons.length} ikon)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-xs"
              aria-label="Previous Page"
            >
              <ChevronLeftIcon size={14} />
              <span>{t("content.iconDemo.pagination.prev", "Sebelumnya")}</span>
            </button>

            <div className="flex items-center gap-1">
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    safeCurrentPage === p
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                      : "border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-xs"
              aria-label="Next Page"
            >
              <span>{t("content.iconDemo.pagination.next", "Berikutnya")}</span>
              <ChevronRightIcon size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
