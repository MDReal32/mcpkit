import { resolveStoredAuth } from '../../../auth';
import type { Manifest } from '../../../manifest';
import type { CallContext } from '../../types/call-context';
import type { AuthCandidate } from '../types/auth-candidate';

export const createStoredCandidate = (manifest: Manifest, context: CallContext) => {
  const candidate: AuthCandidate = {
    label: 'tokens.json',
    kind: 'stored',
    resolve: async () => ({ auth: await resolveStoredAuth(manifest.name, manifest.auth ?? [], context), manifest }),
  };
  return candidate;
};
