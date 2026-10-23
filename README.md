# @needui/ui-kit

A modern, animated React UI Component Library powered by **Framer Motion** and **Tailwind CSS**. No separate CSS files required—styles are automatically detected and compiled by your project's Tailwind setup.

---

### 1. Installation

```bash
npm i @needui/ui-kit
```

---

### 2. Configure Tailwind CSS

Add the package path to your Tailwind scanning configuration so your project compiles all component classes:

- **Tailwind CSS v4** (in your main CSS file, e.g. `globals.css` / `index.css`):
  ```css
  @source "../node_modules/@needui/ui-kit/dist";
  ```

- **Tailwind CSS v3** (in your `tailwind.config.js`):
  ```js
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@needui/ui-kit/dist/**/*.{js,mjs}"
    ],
    // ...
  };
  ```

---

### 3. Usage

Import any component directly into your React application:

```tsx
import { useState } from "react";
import { ThemeMorphToggle, HoldButton } from "@needui/ui-kit";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex items-center gap-4 p-8">
      <ThemeMorphToggle
        checked={isDark}
        onChange={setIsDark}
        size="md"
      />

      <HoldButton
        label="Hold to Confirm"
        onConfirm={() => alert("Action confirmed!")}
      />
    </div>
  );
}
```
