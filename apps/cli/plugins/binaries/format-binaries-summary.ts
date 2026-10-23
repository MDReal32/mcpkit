import { relative } from 'node:path';
import type { BinaryResult } from './types/binary-result';

export const formatBinariesSummary = (results: readonly BinaryResult[], root: string) =>
  [`mcpkit: ${results.length} binary(ies)`, ...results.map(({ outfile }) => `  ${relative(root, outfile)}`)].join('\n');
