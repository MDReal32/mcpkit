import { describeAuth } from '@usemcpkit/core';
import { formatKilobytes } from './format-kilobytes';
import { formatTable } from './format-table';
import type { CompiledManifest } from './types/compiled-manifest';

export const formatBuildSummary = (compiled: readonly CompiledManifest[], outDir: string) => {
  const rows = compiled.map(({ manifest, json }) => [
    manifest.name,
    manifest.version,
    `${manifest.tools.length} tools`,
    describeAuth(manifest.auth),
    formatKilobytes(json),
  ]);
  return [`mcpkit: ${compiled.length} manifest(s) → ${outDir}`, ...formatTable(rows)].join('\n');
};
