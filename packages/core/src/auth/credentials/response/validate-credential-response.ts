import { isJsonObject } from '../../../json';
import type { CredentialRequest } from '../../types/credentials/credential-request';
import { validateResponseDomain } from './validate-response-domain';
import { validateTokenResponse } from './validate-token-response';

/** The form answer comes over a local HTTP request, so it is checked against what was asked. */
export const validateCredentialResponse = (request: CredentialRequest, response: unknown) => {
  if (!isJsonObject(response)) {
    return ['the answer must be a JSON object'];
  }
  const domainErrors = validateResponseDomain(request, response.domain);
  if (response.method === 'sign-in') {
    return request.signIn ? domainErrors : ['this server has no sign-in', ...domainErrors];
  }
  if (response.method === 'token') {
    return [...domainErrors, ...validateTokenResponse(request, response)];
  }
  return ['method must be "token" or "sign-in"'];
};
