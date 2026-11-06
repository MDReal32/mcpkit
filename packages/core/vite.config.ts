import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [dts({ include: ["src"], bundleTypes: true })],
  build: {
    ssr: true,
    lib: {
      entry: { "usemcpkit.core": "src/main.ts" },
      formats: ["es"],
    },
    outDir: "build",
    emptyOutDir: true,
  },
  test: {
    include: ["test/**/*.test.ts"],
  },
});
