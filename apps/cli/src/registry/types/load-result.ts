import type { Manifest } from '@mcpkit/core';

export interface LoadResult {
  manifests: ReadonlyMap<string, Manifest>;
  warnings: readonly string[];
}
