import { isDomainValue } from "../../../manifest";
import type { CredentialRequest } from "../../types/credentials/credential-request";

export const validateResponseDomain = (request: CredentialRequest, domain: unknown) => {
  if (!request.domain) {
    return domain === undefined ? [] : ["the domain of this server cannot be changed"];
  }
  if (!isDomainValue(domain)) {
    return [`${request.domain.label} must look like host[:port][/path]`];
  }
  return [];
};
