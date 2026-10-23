import type { Target } from '@usemcpkit/binary';

export interface BinaryResult {
  target: Target;
  outfile: string;
  error?: string;
}
