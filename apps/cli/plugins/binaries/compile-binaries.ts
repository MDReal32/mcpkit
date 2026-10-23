import type { Target } from '@usemcpkit/binary';
import { compileBinary } from './compile-binary';
import type { BinaryResult } from './types/binary-result';

/** Sequential on purpose: bun downloads per-target runtimes into a shared cache. */
export const compileBinaries = async (entryFile: string, outDir: string, targets: readonly Target[]) => {
  const results: BinaryResult[] = [];
  for (const target of targets) {
    results.push(await compileBinary(entryFile, outDir, target));
  }
  return results;
};
