import type { Target } from '@mcpkit/binary';

export interface BinaryResult {
  target: Target;
  outfile: string;
  error?: string;
}
