import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeSnippet } from "../components/CodeSnippet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  AnimatedPagination,
  generatePaginationRange,
} from "../../src/components/Pagination";
import { ZapIcon, LayersIcon } from "../../src/icons";

export function AnimatedPaginationDemo() {
  const { t, i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");

  // State untuk Variasi 1: Standard Interactive Sliding Pill
  const [activePage, setActivePage] = useState<number>(2);
  const totalPages = 5;

  // State untuk Variasi 2: Dynamic Long Pagination with Ellipsis
  const [dynamicPage, setDynamicPage] = useState<number>(5);
  const totalDynamicPages = 12;

  // State untuk Variasi 3: Sizes (sm, default, lg)
  const [sizePage, setSizePage] = useState<number>(3);

  // State untuk Variasi 4: Outline Variant
  const [outlinePage, setOutlinePage] = useState<number>(1);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Halaman */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-mono font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <ZapIcon size={12} />
            Framer Motion layoutId
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100/80 px-3 py-1 text-xs font-mono font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            <LayersIcon size={12} />
            Compound Components
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          Animated Pagination
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          {isId
            ? "Komponen paginasi modern berbasis Compound Components dengan animasi sliding active background pill menggunakan layoutId dari Framer Motion, dilengkapi feedback spring pada hover & click."
            : "Modern Compound Component pagination architecture engineered with Framer Motion layoutId for buttery-smooth sliding active pill transitions and spring tactile feedback."}
        </p>
      </div>

      {/* 1. VARIANT: STANDARD INTERACTIVE SLIDING PILL */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex flex-wrap items-center gap-2">
              <span>1. Standard Interactive Sliding Pill</span>
              <span className="text-[11px] font-mono font-normal text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                Active State Morphing
              </span>
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              Page {activePage} of {totalPages}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isId
              ? "Klik nomor halaman untuk melihat latar belakang gelap meluncur (sliding pill) dengan mulus ke posisi tombol yang baru."
              : "Click any page number to observe the active dark background pill glide smoothly between positions via spring physics."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-10 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-950 gap-4 overflow-x-auto w-full no-scrollbar">
          <Pagination layoutId="interactive-demo-pill">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                  className={activePage === 1 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={activePage === page}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
                  className={activePage === totalPages ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            💡 Active Page: <span className="font-bold text-indigo-500">{activePage}</span> (Showing records {(activePage - 1) * 10 + 1}–{activePage * 10} of 50)
          </span>
        </div>

        <CodeSnippet
          code={`import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@needui/ui-kit";

export function StandardPagination() {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 5;

  return (
    <Pagination layoutId="my-pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>

        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={currentPage === totalPages ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`}
        />
      </section>

      {/* 2. VARIANT: REALISTIC RANGE WITH ELLIPSIS */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex flex-wrap items-center gap-2">
            <span>2. Dynamic Long Range with Ellipsis</span>
            <span className="text-[11px] font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              Truncated Pages
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isId
              ? "Struktur paginasi untuk data besar dengan pemisah titik-titik (PaginationEllipsis)."
              : "Large dataset pagination layout featuring decorative skip indicators (<PaginationEllipsis />)."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-10 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-950 gap-4 overflow-x-auto w-full no-scrollbar">
          <AnimatedPagination
            totalPages={totalDynamicPages}
            currentPage={dynamicPage}
            onChange={setDynamicPage}
            layoutId="dynamic-range-pill"
          />
          <div className="text-xs text-neutral-500 font-mono">
            {isId
              ? `Halaman saat ini: ${dynamicPage} dari ${totalDynamicPages}`
              : `Current page: ${dynamicPage} of ${totalDynamicPages}`}
          </div>
        </div>

        <CodeSnippet
          code={`// Rekomendasi 1: All-in-One Component (Otomatis & Sangat Efisien)
<AnimatedPagination
  totalPages={12}
  currentPage={page}
  onChange={setPage}
/>

// Rekomendasi 2: Compound Components + generatePaginationRange()
const pageRange = generatePaginationRange(page, 12);

<Pagination layoutId="dynamic-pill">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
    </PaginationItem>

    {pageRange.map((item, idx) => (
      <PaginationItem key={idx}>
        {item === "ellipsis" ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            isActive={page === item}
            onClick={() => setPage(item)}
          >
            {item}
          </PaginationLink>
        )}
      </PaginationItem>
    ))}

    <PaginationItem>
      <PaginationNext onClick={() => setPage(p => Math.min(12, p + 1))} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </section>

      {/* 3. VARIANT: SIZES (sm, default, lg) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex flex-wrap items-center gap-2">
            <span>3. Responsive Size Presets (sm, default, lg)</span>
            <span className="text-[11px] font-mono font-normal text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              CVA Sizing
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isId
              ? "Tiga pilihan ukuran (size='sm' untuk tabel ringkas, 'default', dan 'lg' untuk landing page)."
              : "Configurable dimension presets (size='sm' for compact data tables, 'default', and 'lg' for landing showcases)."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-10 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-950 gap-8 overflow-x-auto w-full no-scrollbar">
          {/* Small */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">size="sm" (Compact)</span>
            <Pagination size="sm" layoutId="size-sm-pill">
              <PaginationContent>
                <PaginationItem><PaginationPrevious onClick={() => setSizePage((p) => Math.max(1, p - 1))} compact /></PaginationItem>
                {[1, 2, 3, 4].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={sizePage === page} onClick={() => setSizePage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem><PaginationNext onClick={() => setSizePage((p) => Math.min(4, p + 1))} compact /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Default */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">size="default" (Standard)</span>
            <Pagination size="default" layoutId="size-default-pill">
              <PaginationContent>
                <PaginationItem><PaginationPrevious onClick={() => setSizePage((p) => Math.max(1, p - 1))} /></PaginationItem>
                {[1, 2, 3, 4].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={sizePage === page} onClick={() => setSizePage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem><PaginationNext onClick={() => setSizePage((p) => Math.min(4, p + 1))} /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Large */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">size="lg" (Hero Viewport)</span>
            <Pagination size="lg" layoutId="size-lg-pill">
              <PaginationContent>
                <PaginationItem><PaginationPrevious onClick={() => setSizePage((p) => Math.max(1, p - 1))} /></PaginationItem>
                {[1, 2, 3, 4].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={sizePage === page} onClick={() => setSizePage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem><PaginationNext onClick={() => setSizePage((p) => Math.min(4, p + 1))} /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* 4. VARIANT: OUTLINE BORDERED */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex flex-wrap items-center gap-2">
            <span>4. Outline Bordered Variant</span>
            <span className="text-[11px] font-mono font-normal text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
              Bordered Cards
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isId
              ? "Gaya bergaris tepi (variant='outline') dengan garis pembatas kontras tinggi di tiap tombol halaman."
              : "Bordered styling (variant='outline') rendering crisp outline borders around each pagination control."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-10 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-950 gap-4 overflow-x-auto w-full no-scrollbar">
          <Pagination layoutId="outline-demo-pill">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  variant="outline"
                  onClick={() => setOutlinePage((p) => Math.max(1, p - 1))}
                  className={outlinePage === 1 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>

              {[1, 2, 3, 4].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    variant="outline"
                    isActive={outlinePage === page}
                    onClick={() => setOutlinePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  variant="outline"
                  onClick={() => setOutlinePage((p) => Math.min(4, p + 1))}
                  className={outlinePage === 4 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <CodeSnippet
          code={`<Pagination layoutId="outline-pagination">
  <PaginationContent>
    <PaginationItem><PaginationPrevious variant="outline" /></PaginationItem>
    <PaginationItem><PaginationLink variant="outline" isActive={page === 1}>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink variant="outline" isActive={page === 2}>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink variant="outline" isActive={page === 3}>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext variant="outline" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </section>

      {/* 5. VARIANT: ROUTING FRAMEWORK SUPPORT (asChild) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>5. Next.js & Client Routing Support (`asChild`)</span>
            <span className="text-[11px] font-mono font-normal text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
              Next.js & Remix Compatible
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isId
              ? "Gunakan prop asChild untuk menyematkan komponen routing seperti Next.js <Link> atau Remix NavLink tanpa merusak animasi sliding."
              : "Pass asChild to seamlessly nest Next.js <Link> or React Router <NavLink> while preserving the full Framer Motion layoutId sliding pill."}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800/80 dark:bg-neutral-950 gap-4">
          <Pagination layoutId="aschild-demo-pill">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious asChild>
                  <a href="#page-prev" onClick={(e) => e.preventDefault()}>
                    Previous
                  </a>
                </PaginationPrevious>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink asChild isActive={true}>
                  <a href="#page-1" onClick={(e) => e.preventDefault()}>
                    1
                  </a>
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink asChild isActive={false}>
                  <a href="#page-2" onClick={(e) => e.preventDefault()}>
                    2
                  </a>
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext asChild>
                  <a href="#page-next" onClick={(e) => e.preventDefault()}>
                    Next
                  </a>
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <CodeSnippet
          code={`// Next.js App Router Example:
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@needui/ui-kit";

export function NextJsPagination({ currentPage }: { currentPage: number }) {
  return (
    <Pagination layoutId="next-pages">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink asChild isActive={currentPage === 1}>
            <Link href="/posts?page=1">1</Link>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild isActive={currentPage === 2}>
            <Link href="/posts?page=2">2</Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`}
        />
      </section>

      {/* COMPONENT GUIDELINES STANDARD: PROPS API REFERENCE */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Props API Reference
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-2.5">Prop</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Default</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">totalPages</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs text-rose-500 font-semibold">required</td>
                <td className="px-4 py-2.5">Jumlah keseluruhan halaman paginasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">currentPage</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs text-rose-500 font-semibold">required</td>
                <td className="px-4 py-2.5">Halaman aktif saat ini (1-indexed).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">onChange</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">(page: number) =&gt; void</td>
                <td className="px-4 py-2.5 font-mono text-xs text-rose-500 font-semibold">required</td>
                <td className="px-4 py-2.5">Callback saat pengguna mengklik nomor halaman atau tombol kontrol panah.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">siblingCount</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">number</td>
                <td className="px-4 py-2.5 font-mono text-xs">1</td>
                <td className="px-4 py-2.5">Jumlah nomor halaman pendamping di sisi kiri dan kanan halaman aktif.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">layoutId</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">"pagination-active"</td>
                <td className="px-4 py-2.5">Kunci sinkronisasi unik Framer Motion untuk transisi sliding active indicator.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">size</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"default" | "sm" | "lg" | "icon"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">Dimensi ukuran tinggi dan padding tombol paginasi berbasis CVA.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">"default" | "outline" | "ghost"</td>
                <td className="px-4 py-2.5 font-mono text-xs">"default"</td>
                <td className="px-4 py-2.5">Gaya visual tombol paginasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">className</td>
                <td className="px-4 py-2.5 font-mono text-xs text-indigo-600 dark:text-indigo-400">string</td>
                <td className="px-4 py-2.5 font-mono text-xs">undefined</td>
                <td className="px-4 py-2.5">Class utilitas tambahan Tailwind CSS yang digabungkan via cn().</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
