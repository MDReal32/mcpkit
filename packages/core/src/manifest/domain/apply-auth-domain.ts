import type { AuthSpec } from "../types/auth/auth-spec";
import { fillDomainUrl } from "./fill-domain-url";

export const applyAuthDomain = (auth: AuthSpec, domain: string, loopbackHttp: boolean) => {
  if (auth.type !== "oauth") {
    return auth;
  }
  const resolved: AuthSpec = {
    ...auth,
    authorizationUrl: fillDomainUrl(auth.authorizationUrl, domain, loopbackHttp),
    tokenUrl: fillDomainUrl(auth.tokenUrl, domain, loopbackHttp),
  };
  return resolved;
};
