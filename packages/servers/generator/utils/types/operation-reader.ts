import type { Operation } from './operation.ts';
import type { OperationCandidate } from './operation-candidate.ts';

export interface OperationReader<Result extends Operation> {
  /** Only paths this accepts are read; every path when absent. */
  acceptsPath?: (path: string) => boolean;
  toOperation: (candidate: OperationCandidate) => Result;
}
