import { defineConfig } from "vitest/config";
import { version } from "./package.json";
import { usemcpkitBinaries } from "./plugins/binaries";

const PACKAGE_MODE = "package";

export default defineConfig(({ mode }) => ({
  plugins: [
    ...(mode === PACKAGE_MODE
      ? [usemcpkitBinaries({ version, targets: process.env.USEMCPKIT_TARGETS?.split(",").filter(Boolean) })]
      : []),
  ],
  build: {
    ssr: "src/main.ts",
    target: "node20",
    outDir: "build",
    emptyOutDir: true,
    minify: true,
    rolldownOptions: {
      external: ["bun:ffi", /^webview-bun\//],
      output: {
        entryFileNames: "usemcpkit.cli.js",
        banner: "#!/usr/bin/env node",
      },
    },
  },
  ssr: {
    noExternal: true,
  },
  test: {
    include: ["test/**/*.test.ts"],
  },
}));
