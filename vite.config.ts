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
        entry: resolve(__dirname, "src/index.ts"),
        name: "NeedUI",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "framer-motion",
        ],
        output: {
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "framer-motion": "framerMotion",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "styles.css";
            }
            return assetInfo.name || "[name].[ext]";
          },
        },
      },
    },
  };
});
