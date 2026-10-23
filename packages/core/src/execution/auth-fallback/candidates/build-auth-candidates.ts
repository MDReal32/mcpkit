import type { Manifest } from '../../../manifest';
import { applyDomain } from '../../../manifest';
import type { CallContext } from '../../types/call-context';
import { listInteractiveCandidates } from './list-interactive-candidates';
import { listProvidedCandidates } from './list-provided-candidates';

/**
 * The `tokens.json` token first, then fallbacks whose credentials are set or saved,
 * and only when nothing else works the credentials form or the OAuth2 browser sign-in.
 */
export const buildAuthCandidates = (manifest: Manifest, domain: string | undefined, context: CallContext) => {
  const target = manifest.domain && domain === undefined ? undefined : applyDomain(manifest, domain);
  const provided = target ? listProvidedCandidates(target, context) : [];
  return [...provided, ...listInteractiveCandidates(manifest, target, domain, context)];
};
