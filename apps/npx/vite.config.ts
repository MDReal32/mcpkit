import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: { "usemcpkit.npx": "src/main.ts" },
      formats: ["es"],
    },
    outDir: "build",
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
