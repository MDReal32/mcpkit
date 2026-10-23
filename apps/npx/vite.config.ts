import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: 'src/main.ts',
    target: 'node20',
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      external: ['@mcpkit/cli'],
      output: {
        entryFileNames: 'mcpkit.npx.js',
        banner: '#!/usr/bin/env node',
      },
    },
  },
});
