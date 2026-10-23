import type { Manifest } from '@mcpkit/core';

export interface CompiledManifest {
  file: string;
  manifest: Manifest;
  json: string;
}
