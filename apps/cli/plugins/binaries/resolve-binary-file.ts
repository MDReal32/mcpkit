import { extname, join } from 'node:path';
import type { Target } from '@usemcpkit/binary';
import { BINARY_NAME, toBinaryFileName } from '@usemcpkit/binary';

export const resolveBinaryFile = (outDir: string, target: Target) =>
  join(outDir, `${BINARY_NAME}-${target}${extname(toBinaryFileName(target))}`);
