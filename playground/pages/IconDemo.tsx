import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  // 1. Navigasi Dasar (9)
  SearchIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  // 2. User & Akun (5)
  UserIcon,
  UsersIcon,
  LoginIcon,
  LogoutIcon,
  ShieldIcon,
  // 3. Aksi & Interaksi (7)
  PlusIcon,
  MinusIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  // 4. Sistem & Umpan Balik (5)
  SettingsIcon,
  BellIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  // 5. Media & Dokumen (12)
  ImageIcon,
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
  // 6. E-Commerce & Keuangan (7)
  ShoppingCartIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  WalletIcon,
  TagIcon,
  ReceiptIcon,
  BanknoteIcon,
  // 7. Komunikasi (6)
  MailIcon,
  PhoneIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  SendIcon,
  ShareIcon,
  // 8. Perangkat & Hardware (10)
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
  // 9. Editor Teks & Dokumen (8)
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  // 10. Waktu & Lokasi (8)
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  MapIcon,
  CompassIcon,
  SunIcon,
  MoonIcon,
  GlobeIcon,
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
  // 1. Navigasi Dasar (9)
  { name: "SearchIcon", categoryKey: "navigation", Component: SearchIcon, tags: ["cari", "search", "kaca pembesar", "find"] },
  { name: "MenuIcon", categoryKey: "navigation", Component: MenuIcon, tags: ["menu", "hamburger", "bars", "nav"] },
  { name: "CloseIcon", categoryKey: "navigation", Component: CloseIcon, tags: ["tutup", "close", "silang", "x", "cancel"] },
  { name: "ChevronDownIcon", categoryKey: "navigation", Component: ChevronDownIcon, tags: ["chevron", "down", "bawah", "dropdown"] },
  { name: "ChevronUpIcon", categoryKey: "navigation", Component: ChevronUpIcon, tags: ["chevron", "up", "atas", "collapse"] },
  { name: "ChevronLeftIcon", categoryKey: "navigation", Component: ChevronLeftIcon, tags: ["chevron", "left", "kiri", "back"] },
  { name: "ChevronRightIcon", categoryKey: "navigation", Component: ChevronRightIcon, tags: ["chevron", "right", "kanan", "next"] },
  { name: "ArrowRightIcon", categoryKey: "navigation", Component: ArrowRightIcon, tags: ["arrow", "right", "kanan", "forward"] },
  { name: "ArrowLeftIcon", categoryKey: "navigation", Component: ArrowLeftIcon, tags: ["arrow", "left", "kiri", "back"] },

  // 2. User & Akun (5)
  { name: "UserIcon", categoryKey: "userAccount", Component: UserIcon, tags: ["user", "pengguna", "profile", "account"] },
  { name: "UsersIcon", categoryKey: "userAccount", Component: UsersIcon, tags: ["users", "tim", "group", "people", "members"] },
  { name: "LoginIcon", categoryKey: "userAccount", Component: LoginIcon, tags: ["login", "masuk", "signin", "enter"] },
  { name: "LogoutIcon", categoryKey: "userAccount", Component: LogoutIcon, tags: ["logout", "keluar", "signout", "exit"] },
  { name: "ShieldIcon", categoryKey: "userAccount", Component: ShieldIcon, tags: ["shield", "security", "keamanan", "privasi", "protect"] },

  // 3. Aksi & Interaksi (7)
  { name: "PlusIcon", categoryKey: "actionInteraction", Component: PlusIcon, tags: ["plus", "tambah", "add", "create", "new"] },
  { name: "MinusIcon", categoryKey: "actionInteraction", Component: MinusIcon, tags: ["minus", "kurang", "remove", "decrease"] },
  { name: "EditIcon", categoryKey: "actionInteraction", Component: EditIcon, tags: ["edit", "pencil", "ubah", "tulis", "write"] },
  { name: "TrashIcon", categoryKey: "actionInteraction", Component: TrashIcon, tags: ["trash", "delete", "hapus", "bin", "remove"] },
  { name: "CheckIcon", categoryKey: "actionInteraction", Component: CheckIcon, tags: ["check", "centang", "done", "confirm", "yes"] },
  { name: "CopyIcon", categoryKey: "actionInteraction", Component: CopyIcon, tags: ["copy", "salin", "clipboard", "duplicate"] },
  { name: "ExternalLinkIcon", categoryKey: "actionInteraction", Component: ExternalLinkIcon, tags: ["external", "link", "tautan", "open", "new tab"] },

  // 4. Sistem & Umpan Balik (5)
  { name: "SettingsIcon", categoryKey: "systemFeedback", Component: SettingsIcon, tags: ["settings", "gear", "pengaturan", "config"] },
  { name: "BellIcon", categoryKey: "systemFeedback", Component: BellIcon, tags: ["bell", "notifikasi", "alert", "notification"] },
  { name: "InfoIcon", categoryKey: "systemFeedback", Component: InfoIcon, tags: ["info", "informasi", "detail", "help"] },
  { name: "AlertTriangleIcon", categoryKey: "systemFeedback", Component: AlertTriangleIcon, tags: ["warning", "alert", "peringatan", "danger", "triangle"] },
  { name: "CheckCircleIcon", categoryKey: "systemFeedback", Component: CheckCircleIcon, tags: ["success", "sukses", "check", "circle", "berhasil"] },

  // 5. Media & Dokumen (12)
  { name: "ImageIcon", categoryKey: "mediaDocument", Component: ImageIcon, tags: ["image", "gambar", "photo", "picture"] },
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

  // 6. E-Commerce & Keuangan (7)
  { name: "ShoppingCartIcon", categoryKey: "ecommerceFinance", Component: ShoppingCartIcon, tags: ["cart", "keranjang", "troli", "belanja", "ecommerce", "buy"] },
  { name: "ShoppingBagIcon", categoryKey: "ecommerceFinance", Component: ShoppingBagIcon, tags: ["bag", "tas", "belanja", "checkout", "store"] },
  { name: "CreditCardIcon", categoryKey: "ecommerceFinance", Component: CreditCardIcon, tags: ["card", "kartu", "kredit", "debit", "payment", "bayar"] },
  { name: "WalletIcon", categoryKey: "ecommerceFinance", Component: WalletIcon, tags: ["wallet", "dompet", "saldo", "money", "uang"] },
  { name: "TagIcon", categoryKey: "ecommerceFinance", Component: TagIcon, tags: ["tag", "price", "harga", "diskon", "promo", "label"] },
  { name: "ReceiptIcon", categoryKey: "ecommerceFinance", Component: ReceiptIcon, tags: ["receipt", "struk", "nota", "invoice", "tagihan"] },
  { name: "BanknoteIcon", categoryKey: "ecommerceFinance", Component: BanknoteIcon, tags: ["banknote", "cash", "uang", "tunai", "bill", "money"] },

  // 7. Komunikasi (6)
  { name: "MailIcon", categoryKey: "communication", Component: MailIcon, tags: ["mail", "email", "surat", "inbox", "pesan"] },
  { name: "PhoneIcon", categoryKey: "communication", Component: PhoneIcon, tags: ["phone", "telepon", "call", "panggilan", "kontak"] },
  { name: "MessageCircleIcon", categoryKey: "communication", Component: MessageCircleIcon, tags: ["chat", "pesan", "komentar", "bubble", "talk"] },
  { name: "MessageSquareIcon", categoryKey: "communication", Component: MessageSquareIcon, tags: ["chat", "square", "komentar", "diskusi"] },
  { name: "SendIcon", categoryKey: "communication", Component: SendIcon, tags: ["send", "kirim", "paperplane", "submit", "post"] },
  { name: "ShareIcon", categoryKey: "communication", Component: ShareIcon, tags: ["share", "bagikan", "sosmed", "link", "forward"] },

  // 8. Perangkat & Hardware (10)
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

  // 9. Editor Teks & Dokumen (8)
  { name: "BoldIcon", categoryKey: "textEditor", Component: BoldIcon, tags: ["bold", "tebal", "typography", "text"] },
  { name: "ItalicIcon", categoryKey: "textEditor", Component: ItalicIcon, tags: ["italic", "miring", "typography", "text"] },
  { name: "UnderlineIcon", categoryKey: "textEditor", Component: UnderlineIcon, tags: ["underline", "garis bawah", "typography", "text"] },
  { name: "LinkIcon", categoryKey: "textEditor", Component: LinkIcon, tags: ["link", "tautan", "url", "chain", "hyperlink"] },
  { name: "AlignLeftIcon", categoryKey: "textEditor", Component: AlignLeftIcon, tags: ["align", "left", "rata kiri", "paragraph", "text"] },
  { name: "AlignCenterIcon", categoryKey: "textEditor", Component: AlignCenterIcon, tags: ["align", "center", "rata tengah", "paragraph", "text"] },
  { name: "AlignRightIcon", categoryKey: "textEditor", Component: AlignRightIcon, tags: ["align", "right", "rata kanan", "paragraph", "text"] },
  { name: "ListIcon", categoryKey: "textEditor", Component: ListIcon, tags: ["list", "bullet", "daftar", "point", "todo"] },

  // 10. Waktu & Lokasi (8)
  { name: "ClockIcon", categoryKey: "timeLocation", Component: ClockIcon, tags: ["clock", "jam", "waktu", "time", "timer", "schedule"] },
  { name: "CalendarIcon", categoryKey: "timeLocation", Component: CalendarIcon, tags: ["calendar", "kalender", "tanggal", "date", "event"] },
  { name: "MapPinIcon", categoryKey: "timeLocation", Component: MapPinIcon, tags: ["pin", "map", "lokasi", "tempat", "gps", "marker"] },
  { name: "MapIcon", categoryKey: "timeLocation", Component: MapIcon, tags: ["map", "peta", "navigasi", "route", "arah"] },
  { name: "CompassIcon", categoryKey: "timeLocation", Component: CompassIcon, tags: ["compass", "kompas", "arah", "direction", "explore"] },
  { name: "SunIcon", categoryKey: "timeLocation", Component: SunIcon, tags: ["sun", "matahari", "light", "cerah", "day", "siang"] },
  { name: "MoonIcon", categoryKey: "timeLocation", Component: MoonIcon, tags: ["moon", "bulan", "dark", "night", "malam"] },
  { name: "GlobeIcon", categoryKey: "timeLocation", Component: GlobeIcon, tags: ["globe", "dunia", "earth", "bumi", "world", "international"] },
];

export function IconDemo() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IconCategoryKey>("all");
  const [previewSize, setPreviewSize] = useState<number>(24);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Kategori filter dinamis dengan i18n
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
    ],
    [t]
  );

  // Handle copy snippet JSX ke clipboard
  const handleCopyJSX = (iconName: string) => {
    const snippet = `<${iconName} size={${previewSize}} />`;
    navigator.clipboard.writeText(snippet);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 1800);
  };

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

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>{t("content.iconDemo.badge", "Aset")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          {t("content.iconDemo.pageTitle", {
            total: ALL_ICONS.length,
            defaultValue: `Web Icons (${ALL_ICONS.length} Ikon Esensial)`,
          })}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {t("content.iconDemo.pageDesc", {
            total: ALL_ICONS.length,
            defaultValue: `Koleksi ${ALL_ICONS.length} ikon SVG web esensial bawaan pustaka @a/ui. Dibuat dengan gaya garis minimalis (stroke width 2, viewBox 24x24), modular, ringan, dan warna dapat dikustomisasi langsung melalui class utility Tailwind CSS (currentColor).`,
          })}
        </p>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "content.iconDemo.searchPlaceholder",
              `Cari dari ${ALL_ICONS.length} ikon (contoh: 'play', 'cloud', 'cart', 'phone', 'sun', 'code')...`
            )}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              {t("content.iconDemo.clearSearch", "✕ Hapus")}
            </button>
          )}
        </div>

        {/* Categories & Size Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-900/40">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
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

          {/* Icon Size Toggle */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
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

      {/* Info Status Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
        <span>
          {t("content.iconDemo.showingCount", {
            count: filteredIcons.length,
            total: ALL_ICONS.length,
            defaultValue: `Menampilkan ${filteredIcons.length} dari ${ALL_ICONS.length} ikon web esensial.`,
          })}
        </span>
        <span className="hidden sm:inline">
          {t("content.iconDemo.copyTip", "💡 Klik ikon apa saja untuk menyalin snippet JSX")}
        </span>
      </div>

      {/* Empty State jika pencarian tidak menemukan hasil */}
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
            }}
            className="mt-3 text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer"
          >
            {t("content.iconDemo.resetSearch", "Reset filter dan pencarian")}
          </button>
        </div>
      )}

      {/* Responsive Icons Grid: 2 cols di mobile, 3 di sm, 4 di md, 6 di lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredIcons.map(({ name, Component }) => (
          <button
            key={name}
            type="button"
            onClick={() => handleCopyJSX(name)}
            title={t("content.iconDemo.clickToCopy", {
              name,
              size: previewSize,
              defaultValue: `Klik untuk copy <${name} size={${previewSize}} />`,
            })}
            className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-neutral-200/80 bg-white shadow-xs transition hover:border-blue-400 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-950 dark:hover:border-blue-500 group cursor-pointer text-left"
          >
            {/* Visual Icon Preview */}
            <div className="flex h-12 w-12 items-center justify-center text-neutral-700 dark:text-neutral-300 transition duration-200 group-hover:scale-115 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              <Component size={previewSize} />
            </div>

            {/* Icon Name Label */}
            <span className="text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 text-center truncate max-w-full px-1">
              {name}
            </span>

            {/* Click-to-copy Success Overlay Toast */}
            {copiedIcon === name && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-neutral-900/95 text-white backdrop-blur-xs shadow-lg animate-in fade-in zoom-in-95 duration-150">
                <CheckIcon size={20} className="text-emerald-400" />
                <span className="text-[11px] font-medium tracking-wide">
                  {t("content.iconDemo.copied", "Copied!")}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
