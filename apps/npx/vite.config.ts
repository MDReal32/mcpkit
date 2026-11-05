import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: "src/main.ts",
    target: "node20",
    outDir: "build",
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        entryFileNames: "usemcpkit.npx.js",
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
