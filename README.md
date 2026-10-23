# @needui/ui-kit

A modern, animated React UI Component Library powered by **Framer Motion** and **Tailwind CSS**. All component styles and animations are pre-compiled into a single stylesheet—no complex Tailwind configuration or `@source` directives required.

---

### 1. Installation

```bash
npm install @needui/ui-kit framer-motion
```

*(Or use `pnpm add`, `yarn add`, or `bun add`)*

---

### 2. Import Stylesheet

Import the stylesheet once in your application entry file (`main.tsx`, `App.tsx`, or `layout.tsx`):

```tsx
// src/main.tsx
import "@needui/ui-kit/styles.css";
```

*Alternatively, you can import it into your global CSS file (`index.css` or `globals.css`):*

```css
/* src/index.css */
@import "@needui/ui-kit/styles.css";
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
