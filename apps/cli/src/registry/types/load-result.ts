import type { Manifest } from '@usemcpkit/core';

export interface LoadResult {
  manifests: ReadonlyMap<string, Manifest>;
  warnings: readonly string[];
}
