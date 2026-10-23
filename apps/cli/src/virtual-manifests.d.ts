declare module 'virtual:mcpkit/manifests' {
  import type { Manifest } from '@mcpkit/core';

  /** Manifests compiled from src/servers by the mcpkit:manifests Vite plugin. */
  export const manifests: readonly Manifest[];
}
