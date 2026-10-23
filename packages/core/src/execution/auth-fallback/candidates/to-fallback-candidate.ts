import { resolveFallbackAuth } from '../../../auth';
import type { FallbackAuth, Manifest } from '../../../manifest';
import { describeAuthSpec } from '../../../manifest';
import type { CallContext } from '../../types/call-context';
import type { AuthCandidate } from '../types/auth-candidate';

export const toFallbackCandidate = (auth: FallbackAuth, index: number, manifest: Manifest, context: CallContext) => {
  const candidate: AuthCandidate = {
    label: `auth[${index}] ${describeAuthSpec(auth)}`,
    kind: 'provided',
    resolve: async () => ({ auth: await resolveFallbackAuth(auth, manifest, context), manifest }),
  };
  return candidate;
};
