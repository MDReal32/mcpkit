import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [dts({ include: ["src"], bundleTypes: true })],
  build: {
    ssr: true,
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
    },
    target: "node20",
    outDir: "build",
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        entryFileNames: "mcpkit.core.js",
      },
    },
  },
  test: {
    include: ["test/**/*.test.ts"],
  },
});
