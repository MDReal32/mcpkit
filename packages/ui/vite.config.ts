import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: 'mcpkit.ui.html',
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
});
