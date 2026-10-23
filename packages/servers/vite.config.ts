import { defineConfig } from 'vitest/config';
import { mcpkitManifests } from './plugins/manifests';
import { DEFAULT_REGISTRY_URL } from './src/const';

export default defineConfig({
  plugins: [mcpkitManifests({ registryUrl: DEFAULT_REGISTRY_URL })],
  build: {
    ssr: 'src/main.ts',
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
