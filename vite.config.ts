import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  if (mode === "demo") {
    return {
      plugins: [react()],
      build: {
        outDir: "dist-demo",
      },
      server: {
        port: 5173,
        open: true,
      },
    };
  }

  return {
    plugins: [react()],
    publicDir: false,
    build: {
      outDir: "dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      lib: {
        entry: {
          index: resolve(__dirname, "src/index.ts"),
          "icons/index": resolve(__dirname, "src/icons/index.ts"),
        },
        formats: ["es", "cjs"],
        fileName: (format, entryName) =>
          `${entryName}.${format === "es" ? "mjs" : "js"}`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "framer-motion",
          "tailwindcss",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "framer-motion": "framerMotion",
          },
        },
      },
    },
  };
});
