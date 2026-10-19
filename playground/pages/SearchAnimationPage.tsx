import { Demo } from "./Demo";
import { CodeBlock } from "../components/CodeBlock";

export function SearchAnimationPage() {
  const sampleUsage = `import { SearchAnimation } from "@bgsaryzzz/ui";

export function SearchVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 1. Morph (Default) */}
      <SearchAnimation animationVariant="morph" placeholder="Morphing..." />

      {/* 2. Slide Down */}
      <SearchAnimation animationVariant="slide-down" placeholder="Slide down..." />

      {/* 3. Scale Fade */}
      <SearchAnimation animationVariant="scale-fade" placeholder="Scale fade..." />

      {/* 4. Glow Pulse */}
      <SearchAnimation animationVariant="glow-pulse" placeholder="Glow aura..." />

      {/* 5. Underline Expand */}
      <SearchAnimation animationVariant="underline-expand" placeholder="Underline..." />
    </div>
  );
}`;

  const customStyleUsage = `// Melakukan override style default via Tailwind className
<SearchAnimation
  animationVariant="glow-pulse"
  placeholder="Cari produk..."
  className="bg-indigo-50/70 border-indigo-200 hover:border-indigo-400 dark:bg-indigo-950/40 dark:border-indigo-800"
  iconClassName="text-indigo-600 dark:text-indigo-400"
  inputClassName="text-indigo-950 dark:text-indigo-100 font-medium"
/>`;

  return (
    <div className="space-y-12 pb-16">
      {/* Title */}
      <div className="space-y-3 border-b border-neutral-200/80 pb-6 dark:border-neutral-800/80">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 border border-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800">
          <span>Animations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
          Search Animation
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Search bar interaktif dengan <strong>5 variasi animasi unik</strong> yang didukung oleh spring physics Framer Motion dan class merging Tailwind CSS.
        </p>
      </div>

      {/* Interactive 5 Variants Preview Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            5 Interactive Animation Variants
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Klik masing-masing icon search di bawah untuk melihat perbedaan gaya animasinya secara langsung:
          </p>
        </div>

        <Demo />
      </section>

      {/* Code Examples */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Usage
        </h2>
        <CodeBlock code={sampleUsage} language="tsx" filename="SearchVariantsDemo.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Tailwind Override Example
        </h2>
        <CodeBlock code={customStyleUsage} language="tsx" filename="CustomSearch.tsx" />
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Props
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 font-medium border-b border-neutral-200/80 dark:border-neutral-800/80 text-xs">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">animationVariant</td>
                <td className="p-3 text-neutral-500">
                  "morph" | "slide-down" | "scale-fade" | "glow-pulse" | "underline-expand"
                </td>
                <td className="p-3 text-neutral-400">"morph"</td>
                <td className="p-3 font-sans">
                  Pilihan variasi animasi interaktif saat search bar dibuka/ditutup.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">placeholder</td>
                <td className="p-3 text-neutral-500">string</td>
                <td className="p-3 text-neutral-400">"Search..."</td>
                <td className="p-3 font-sans">Placeholder teks pada input field.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">onSearch</td>
                <td className="p-3 text-neutral-500">(query: string) =&gt; void</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">Callback saat form disubmit atau tombol search ditekan.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">className</td>
                <td className="p-3 text-neutral-500">string</td>
                <td className="p-3 text-neutral-400">-</td>
                <td className="p-3 font-sans">Class Tailwind untuk container pembungkus (di-merge via cn).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">closeOnClickOutside</td>
                <td className="p-3 text-neutral-500">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup input otomatis saat klik di luar container.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">closeOnEscape</td>
                <td className="p-3 text-neutral-500">boolean</td>
                <td className="p-3 text-neutral-400">true</td>
                <td className="p-3 font-sans">Menutup input otomatis saat tombol Escape ditekan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
