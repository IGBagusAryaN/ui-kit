# @bgsaryzzz/ui

A modern, accessible, installable, and highly customizable React UI component library featuring smooth animations powered by **Framer Motion** and styled with **Tailwind CSS**.

---

## 📦 Features

- ⚡ **React 18+ & Next.js ready:** Includes `"use client"` directives for Server Component compatibility.
- 🎨 **100% Tailwind Mergeable:** Every component accepts `className` and merges with `cn()` (`clsx` + `tailwind-merge`) without CSS specificity conflicts.
- 🎬 **Fluid Framer Motion:** Micro-interactions, spring physics, and layout animations.
- 🧩 **Zero Unnecessary Dependencies:** `react`, `react-dom`, `tailwindcss`, and `framer-motion` are `peerDependencies`.
- 📁 **Organized Architecture:**
  - `src/components/`: Animated UI components (`SearchAnimation`, `ButtonAnimation`, `NavbarAnimation`).
  - `src/icons/`: Web SVG icons (`SearchIcon`, `CloseIcon`, `MenuIcon`, etc.).
  - `src/utils/cn.ts`: Class utility.

---

## 🚀 Installation

```bash
npm install @bgsaryzzz/ui
```

### Peer Dependencies
Make sure you have the required peer dependencies installed in your application:

```bash
npm install framer-motion tailwindcss react react-dom
```

### Tailwind CSS Setup
In your project's `tailwind.config.js`, include `@bgsaryzzz/ui` in the `content` array so Tailwind detects the classes:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@bgsaryzzz/ui/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 🛠️ Usage Examples

### 1. `SearchAnimation`
Expandable search bar with spring physics, click-outside handling, and escape key listener.

```tsx
import { SearchAnimation } from "@bgsaryzzz/ui";

export function HeaderSearch() {
  return (
    <SearchAnimation
      placeholder="Search documentation..."
      onSearch={(val) => console.log("Searching for:", val)}
      className="bg-neutral-50 hover:border-blue-400"
    />
  );
}
```

### 2. `ButtonAnimation`
Button with spring tap feedback, hover scale, loading spinner, and shimmering effects.

```tsx
import { ButtonAnimation } from "@bgsaryzzz/ui";
import { ArrowRightIcon } from "@bgsaryzzz/ui/icons";

export function ActionSection() {
  return (
    <div className="flex gap-4">
      <ButtonAnimation variant="primary" shimmer rightIcon={<ArrowRightIcon size={16} />}>
        Get Started
      </ButtonAnimation>

      <ButtonAnimation variant="outline" isLoading>
        Loading
      </ButtonAnimation>
    </div>
  );
}
```

### 3. `NavbarAnimation`
Floating or sticky navbar with auto-hide on scroll and animated mobile menu drawer.

```tsx
import { NavbarAnimation, SearchAnimation, ButtonAnimation } from "@bgsaryzzz/ui";

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function AppHeader() {
  return (
    <NavbarAnimation
      brand={<span className="font-bold text-xl">MyApp</span>}
      items={navItems}
      rightElement={
        <div className="flex items-center gap-2">
          <SearchAnimation placeholder="Cari..." />
          <ButtonAnimation size="sm" variant="primary">Sign In</ButtonAnimation>
        </div>
      }
    />
  );
}
```

---

## 📄 License
MIT
