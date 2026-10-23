import type { AuthSpec } from '../types/auth/auth-spec';
import { fillDomain } from './fill-domain';

export const applyAuthDomain = (auth: AuthSpec, domain: string) => {
  if (auth.type !== 'oauth') {
    return auth;
  }
  const resolved: AuthSpec = {
    ...auth,
    authorizationUrl: fillDomain(auth.authorizationUrl, domain),
    tokenUrl: fillDomain(auth.tokenUrl, domain),
  };
  return resolved;
};
