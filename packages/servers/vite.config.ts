import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import { usemcpkitManifests } from "./plugins/manifests";
import { DEFAULT_REGISTRY_URL } from "./src/const";

const TEST_TIMEOUT_MS = 60_000;

export default defineConfig({
  plugins: [
    dts({ include: ["src/main.ts", "src/const.ts"], bundleTypes: true }),
    usemcpkitManifests({ registryUrl: DEFAULT_REGISTRY_URL }),
  ],
  build: {
    ssr: true,
    lib: {
      entry: { "usemcpkit.servers": "src/main.ts" },
      formats: ["es"],
    },
    outDir: "build",
    emptyOutDir: true,
  },
  test: {
    include: ["test/**/*.test.ts"],
    testTimeout: TEST_TIMEOUT_MS,
  },
});
