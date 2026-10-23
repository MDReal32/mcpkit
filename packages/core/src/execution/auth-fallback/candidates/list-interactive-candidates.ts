import type { Manifest } from '../../../manifest';
import { isInteractiveAuth } from '../../../manifest';
import type { CallContext } from '../../types/call-context';
import { createCredentialFormCandidate } from './create-credential-form-candidate';
import { createMissingDomainCandidate } from './create-missing-domain-candidate';
import { offersCredentialForm } from './offers-credential-form';
import { toSignInCandidate } from './to-sign-in-candidate';

/** The credentials form when there is one to show, else the OAuth2 browser sign-ins. */
export const listInteractiveCandidates = (
  manifest: Manifest,
  target: Manifest | undefined,
  domain: string | undefined,
  context: CallContext,
) => {
  if (offersCredentialForm(manifest, context)) {
    return [createCredentialFormCandidate(manifest, domain, context)];
  }
  if (!target) {
    return [createMissingDomainCandidate(manifest)];
  }
  return (target.auth ?? []).flatMap((auth, index) =>
    isInteractiveAuth(auth) ? [toSignInCandidate(auth, index, target, context)] : [],
  );
};
