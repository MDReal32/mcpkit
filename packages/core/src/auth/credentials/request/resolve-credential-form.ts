import type { Manifest } from '../../../manifest';
import { applyDomain } from '../../../manifest';
import { AuthError } from '../../auth-error';
import type { AuthContext } from '../../types/auth-context';
import { resolveFormSignIn } from '../resolve/resolve-form-sign-in';
import { resolveFormToken } from '../resolve/resolve-form-token';
import { validateCredentialResponse } from '../response/validate-credential-response';
import { buildCredentialRequest } from './build-credential-request';
import { requestCredentialsOnce } from './request-credentials-once';

/** Asks the user for a domain and credentials, or to sign in; what they enter is saved once the API accepts it. */
export const resolveCredentialForm = async (manifest: Manifest, domain: string | undefined, context: AuthContext) => {
  const { requestCredentials } = context;
  if (!requestCredentials) {
    throw new AuthError(`${manifest.name}: asking for credentials needs a form, which this caller does not provide`);
  }
  const request = buildCredentialRequest(manifest, domain, context.env);
  const response = await requestCredentialsOnce(request, requestCredentials);
  const errors = validateCredentialResponse(request, response);
  if (errors.length > 0) {
    throw new AuthError(`${manifest.name}: invalid credentials form answer: ${errors.join('; ')}`);
  }
  const target = applyDomain(manifest, response.domain ?? domain);
  if (response.method === 'sign-in') {
    return resolveFormSignIn(target, response, context);
  }
  return resolveFormToken(target, response, context);
};
