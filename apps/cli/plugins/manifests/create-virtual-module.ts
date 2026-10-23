import type { CompiledManifest } from './types/compiled-manifest';

export const createVirtualModule = (compiled: readonly CompiledManifest[]) =>
  `export const manifests = ${JSON.stringify(compiled.map(({ manifest }) => manifest))};`;
