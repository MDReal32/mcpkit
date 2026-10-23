import type { AuthContext } from '../../auth';

export interface CallContext extends AuthContext {
  timeoutMs: number;
}
