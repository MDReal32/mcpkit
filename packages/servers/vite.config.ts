import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import { mcpkitManifests } from './plugins/manifests';
import { DEFAULT_REGISTRY_URL } from './src/const';

export default defineConfig({
  plugins: [
    dts({ include: ['src/main.ts', 'src/const.ts'], bundleTypes: true }),
    mcpkitManifests({ registryUrl: DEFAULT_REGISTRY_URL }),
  ],
  build: {
    ssr: true,
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
    },
    target: 'node20',
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'mcpkit.servers.js',
      },
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
});
