import { extname, join } from 'node:path';
import type { Target } from '@mcpkit/binary';
import { BINARY_NAME, toBinaryFileName } from '@mcpkit/binary';

export const resolveBinaryFile = (outDir: string, target: Target) =>
  join(outDir, `${BINARY_NAME}-${target}${extname(toBinaryFileName(target))}`);
