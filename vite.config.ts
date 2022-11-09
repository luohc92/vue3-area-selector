import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "vue3-area-selector",
      fileName: (format) => `vue3-area-selector.${format}.ts`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
